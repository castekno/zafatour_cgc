import { MapPin, Phone, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { AppSettings } from '../types';
import { WHATSAPP_LINK } from '../data/constants';

interface FooterProps {
  settings?: AppSettings;
  logoUrl?: string;
}

export default function Footer({ settings, logoUrl }: FooterProps) {
  const currentLogo = settings?.logoUrl || logoUrl || '/zafa_logo.jpg';
  const branchName = settings?.branchName || 'ZafaTour Perwakilan Citragrand City Palembang';
  const address =
    settings?.address ||
    'Ruko CitraGrand City Blok A No. 12, Jl. Bypass Alang-Alang Lebar, Palembang, Sumatera Selatan';
  const phone = settings?.phone || '0811-715-608';

  return (
    <footer id="contact" className="bg-[#09152a] text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand & Summary */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={currentLogo}
                alt="Zafa Tour Umrah & Hajj Services"
                className="h-12 w-auto object-contain bg-white/5 p-1 rounded-lg"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-sm font-black text-white uppercase tracking-tight">
                  Perwakilan CGC
                </span>
                <span className="text-[11px] text-sky-400 font-semibold">
                  CitraGrand City Palembang
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Biro Penyelenggara Perjalanan Ibadah Umrah (PPIU) dan Haji Khusus (PIHK) resmi
              terpercaya di Sumatera Selatan. Melayani tamu Allah dengan sepenuh hati.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-900/60 border border-blue-700/50 text-[11px] font-semibold text-sky-300">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Izin Resmi Kemenag RI • Akreditasi A</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#hero" className="hover:text-sky-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-sky-400 transition-colors">
                  Paket Umroh & Haji
                </a>
              </li>
              <li>
                <a href="#hotels" className="hover:text-sky-400 transition-colors">
                  Info Hotel
                </a>
              </li>
              <li>
                <a href="#prayer" className="hover:text-sky-400 transition-colors">
                  Jadwal Shalat Palembang
                </a>
              </li>
              <li>
                <a href="#documentation" className="hover:text-sky-400 transition-colors">
                  Dokumentasi Jamaah
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Kontak & Layanan
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Telepon / WhatsApp:</span>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Jam Operasional Kantor:</span>
                  <span className="font-semibold text-slate-200">
                    Senin - Sabtu: 08.30 - 17.00 WIB
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Office Location */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Lokasi Kantor
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-300 font-medium">
                  {address}
                </span>
              </div>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=CitraGrand+City+Palembang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 text-xs font-semibold"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {branchName}. Hak Cipta Dilindungi.
          </div>
          <div className="text-slate-400 font-medium flex items-center gap-2">
            <span>Palembang</span>
            <span>•</span>
            <span>Jeddah</span>
            <span>•</span>
            <span>Makkah</span>
            <span>•</span>
            <span>Madinah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
