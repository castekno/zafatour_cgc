import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import PackageSection from './components/PackageSection';
import HotelMasterSection from './components/HotelMasterSection';
import PrayerScheduleSection from './components/PrayerScheduleSection';
import DocumentationSection from './components/DocumentationSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import {
  Hotel,
  UmrahPackage,
  DocumentationItem,
  AppSettings,
  UserLocationInfo,
  PrayerCountdownInfo,
} from './types';
import {
  getSavedLocation,
  getNextPrayerCountdown,
  DEFAULT_LOCATION,
} from './services/prayerService';
import {
  getHotels,
  getPackages,
  subscribePackages,
  getDocumentations,
  getSettings,
  DEFAULT_APP_SETTINGS,
  testConnection,
} from './firebase/service';

export default function App() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [documentations, setDocumentations] = useState<DocumentationItem[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_APP_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Prayer and Location state
  const [currentLocation, setCurrentLocation] = useState<UserLocationInfo>(DEFAULT_LOCATION);
  const [prayerCountdown, setPrayerCountdown] = useState<PrayerCountdownInfo | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Load data directly from Firebase Firestore Database (dbzafatourcgc)
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [pList, hList, dList, sData] = await Promise.all([
        getPackages(),
        getHotels(),
        getDocumentations(),
        getSettings(),
      ]);

      setPackages(pList);
      setHotels(hList);
      setDocumentations(dList);
      setSettings(sData);
    } catch (err) {
      console.error('Error loading data from database:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
    loadAllData();

    // Subscribe to live package updates directly from database
    const unsubscribe = subscribePackages((livePkgs) => {
      if (livePkgs && livePkgs.length > 0) {
        setPackages(livePkgs);
      }
    });

    // Load initial saved/default location and countdown for Herobar
    getSavedLocation().then((loc) => {
      setCurrentLocation(loc);
      setPrayerCountdown(getNextPrayerCountdown(loc, new Date()));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Live countdown ticker for Herobar
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLocation) {
        setPrayerCountdown(getNextPrayerCountdown(currentLocation, new Date()));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [currentLocation]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-sky-500 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        logoUrl={settings.logoUrl}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        currentLocation={currentLocation}
        prayerCountdown={prayerCountdown}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* Hero Section & Mengapa Zafa Tour */}
        <HeroBanner
          onExplorePackages={() => scrollToSection('packages')}
          onExplorePrayer={() => scrollToSection('prayer')}
        />

        {/* Packages Section (Read-only from Database) */}
        <PackageSection
          packages={packages}
          hotels={hotels}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* Master Hotel Section (Read-only hotel showcase) */}
        <HotelMasterSection
          hotels={hotels}
          isAdmin={false}
          onSaveHotel={async () => {}}
          onDeleteHotel={async () => {}}
        />

        {/* Jadwal Shalat & Kompas Kiblat */}
        <PrayerScheduleSection />

        {/* Dokumentasi Jamaah */}
        <DocumentationSection
          documentations={documentations}
          isAdmin={false}
          onSaveDoc={async () => {}}
          onDeleteDoc={async () => {}}
        />
      </main>

      {/* Footer / Lokasi & Kontak */}
      <Footer settings={settings} />

      {/* Floating WhatsApp Button (Fixed bottom-right corner, stays while scrolling) */}
      <FloatingWhatsApp whatsappNumber="62811715608" />
    </div>
  );
}
