import { useState } from 'react';
import {
  Menu,
  X,
  MapPin,
  Clock,
} from 'lucide-react';
import { UserLocationInfo, PrayerCountdownInfo } from '../types';

interface NavbarProps {
  logoUrl: string;
  activeSection: string;
  onSelectSection: (section: string) => void;
  currentLocation?: UserLocationInfo | null;
  prayerCountdown?: PrayerCountdownInfo | null;
}

export default function Navbar({
  logoUrl,
  activeSection,
  onSelectSection,
  currentLocation,
  prayerCountdown,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'packages', label: 'Paket Umroh & Haji' },
    { id: 'hotels', label: 'Info Hotel' },
    { id: 'prayer', label: 'Jadwal Shalat' },
    { id: 'documentation', label: 'Dokumentasi' },
    { id: 'contact', label: 'Lokasi & Kontak' },
  ];

  const handleNavClick = (id: string) => {
    onSelectSection(id);
    setIsMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    onSelectSection('hero');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs"
    >
      {/* Ultra-minimal Herobar Info Strip: Guaranteed 1 single line on mobile */}
      <div
        id="prayer-herobar-strip"
        onClick={() => handleNavClick('prayer')}
        className="bg-slate-950 text-slate-300 border-b border-slate-800/80 px-3 sm:px-6 h-7.5 flex items-center cursor-pointer hover:bg-slate-900 transition-colors select-none"
        title="Klik untuk melihat Jadwal Shalat lengkap"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 overflow-hidden whitespace-nowrap text-[10px] sm:text-xs">
          {/* Left: Location Pin */}
          <div className="flex items-center gap-1.5 min-w-0 shrink-0 text-emerald-400 font-medium">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[110px] xs:max-w-[170px] sm:max-w-none">
              {currentLocation?.cityName || 'Palembang'}
            </span>
            <span className="hidden md:inline text-slate-500 font-normal">
              (Koordinat Otomatis)
            </span>
          </div>

          {/* Right: Next Prayer & Countdown */}
          <div className="flex items-center gap-1.5 shrink-0 font-semibold text-slate-200">
            <Clock className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="text-slate-400 hidden xs:inline">Shalat:</span>
            <span className="text-amber-400 font-bold">
              {prayerCountdown?.nextPrayerName || '...'}
            </span>
            <span className="text-slate-300">
              {prayerCountdown?.nextPrayerTimeStr || ''}
            </span>
            {prayerCountdown && (
              <span className="text-sky-300 font-mono text-[9px] sm:text-[11px] bg-slate-800/90 px-1.5 py-0.5 rounded border border-slate-700">
                -{prayerCountdown.timeRemainingStr}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            id="brand-logo-container"
            onClick={handleScrollToTop}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none py-1 min-w-0 group"
            title="Klik untuk kembali ke paling atas"
          >
            {logoUrl ? (
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <img
                  id="brand-logo-image"
                  src={logoUrl}
                  alt="Zafa Tour Umrah & Hajj Services"
                  className="h-10 sm:h-14 w-auto object-contain max-w-[110px] xs:max-w-[140px] sm:max-w-[200px] shrink-0 group-hover:opacity-90 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col border-l border-blue-200 pl-2 sm:pl-3 min-w-0">
                  <span
                    id="brand-text-perwakilan-cgc"
                    className="text-[11px] sm:text-xs font-black text-blue-950 uppercase tracking-tight leading-tight truncate group-hover:text-sky-600 transition-colors"
                  >
                    Perwakilan CGC
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold leading-tight whitespace-nowrap">
                    CitraGrand City Palembang
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white font-black text-lg sm:text-xl shrink-0 group-hover:bg-blue-800 transition-colors">
                  Z
                </div>
                <div className="min-w-0">
                  <div className="text-blue-950 font-black tracking-tight text-base sm:text-lg leading-tight">
                    ZAFA<span className="text-sky-600">TOUR</span>
                  </div>
                  <div className="flex flex-col">
                    <span
                      id="brand-text-perwakilan-cgc-fallback"
                      className="text-[10px] font-black text-blue-900 uppercase leading-none group-hover:text-sky-600 transition-colors"
                    >
                      Perwakilan CGC
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      CitraGrand City Palembang
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav Items */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Tombol Shalat (Mode Mobile) */}
            <button
              id="btn-nav-prayer-mobile"
              onClick={() => handleNavClick('prayer')}
              className="flex sm:hidden items-center gap-1 px-2.5 py-2 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-xl transition-all active:scale-95 shrink-0 whitespace-nowrap"
              title="Lihat Jadwal Shalat"
            >
              <svg
                className="w-3.5 h-3.5 text-emerald-700 shrink-0 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2a.5.5 0 0 1 .5.5v1.07A5.5 5.5 0 0 1 17 9v1h-1V9a4.5 4.5 0 0 0-3.5-4.4V5a.5.5 0 0 1-1 0v-.4A4.5 4.5 0 0 0 8 9v1H7V9a5.5 5.5 0 0 1 4.5-5.43V2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M12 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                <path d="M6 10h12v11H6V10zm6 3a2.5 2.5 0 0 0-2.5 2.5V21h5v-5.5A2.5 2.5 0 0 0 12 13z" />
                <path d="M2.5 8.5a1.5 1.5 0 0 1 2.5-1.12V5.5a.5.5 0 0 1 1 0v2.03A1.5 1.5 0 0 1 5.5 10H5v11H3V10h-.5a1.5 1.5 0 0 1-1.5-1.5h1.5z" />
                <path d="M19 10h-.5V7.53a.5.5 0 0 1 1 0v1.88A1.5 1.5 0 0 1 21 10h-.5v11h-2V10h.5z" />
              </svg>
              <span>Shalat</span>
            </button>

            {/* Mobile menu trigger */}
            <div className="flex lg:hidden items-center">
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-blue-900 hover:bg-slate-100 rounded-xl"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden border-t border-blue-100 bg-white px-4 pt-2 pb-5 space-y-2 shadow-lg animate-in fade-in"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 text-sm font-semibold rounded-xl ${
                activeSection === item.id
                  ? 'text-blue-700 bg-blue-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
