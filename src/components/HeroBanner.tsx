import { ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onExplorePackages?: () => void;
  onExplorePrayer?: () => void;
}

export default function HeroBanner({}: HeroBannerProps) {
  const whyUsItems = [
    {
      id: 'berizin-resmi',
      title: 'Berizin Resmi',
      description:
        'Memiliki izin resmi PPIU dan PIHK dari Kemenag RI sesuai dengan peraturan yang berlaku',
      icon: (
        <svg
          className="w-6 h-6 sm:w-10 md:w-12 sm:h-10 md:h-12 text-[#0c1b40]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield with check */}
          <path
            d="M12 2L4 5V11C4 16.55 7.42 21.74 12 23C16.58 21.74 20 16.55 20 11V5L12 2Z"
            fill="currentColor"
          />
          <path
            d="M9 11.8L11.2 14L15.5 9.5"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'jaminan-kualitas',
      title: 'Jaminan Kualitas',
      description:
        'Memiliki standar pelayanan yang tinggi dan telah tersertifikasi oleh Lembaga Sertifikasi yang kredibel',
      icon: (
        <svg
          className="w-6 h-6 sm:w-10 md:w-12 sm:h-10 md:h-12 text-[#0c1b40]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rosette award with letter A */}
          <circle cx="12" cy="10" r="7" fill="currentColor" />
          <path
            d="M8.5 15.5L7 22L12 19.5L17 22L15.5 15.5"
            fill="currentColor"
          />
          <text
            x="12"
            y="13"
            textAnchor="middle"
            fill="white"
            fontSize="8"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            A
          </text>
        </svg>
      ),
    },
    {
      id: 'kompeten-berpengalaman',
      title: 'Kompeten dan Berpengalaman',
      description:
        'Memberangkatkan lebih dari 30.000 jamaah umrah selama lebih dari 10 tahun melayani',
      icon: (
        <svg
          className="w-6 h-6 sm:w-10 md:w-12 sm:h-10 md:h-12 text-[#0c1b40]"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 3 users team icon */}
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
          <path d="M19 8C19 9.38 18.27 10.59 17.18 11.27C17.68 11.45 18.23 11.58 18.8 11.75C19.78 12.04 21 12.82 21 14V16H23V14C23 12.67 20.33 11.67 19 8Z" opacity="0.8" />
          <path d="M5 8C5 9.38 5.73 10.59 6.82 11.27C6.32 11.45 5.77 11.58 5.2 11.75C4.22 12.04 3 12.82 3 14V16H1V14C1 12.67 3.67 11.67 5 8Z" opacity="0.8" />
        </svg>
      ),
    },
    {
      id: 'fasilitas-nyaman',
      title: 'Fasilitas Nyaman',
      description:
        'Mengutamakan kenyamanan dalam fasilitas dan pelayanan, mulai dari hotel, transportasi, hingga konsumsi',
      icon: (
        <svg
          className="w-6 h-6 sm:w-10 md:w-12 sm:h-10 md:h-12 text-[#0c1b40]"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hotel building with stars */}
          <path d="M7 2L7.6 3.5L9.2 3.6L8 4.6L8.4 6.2L7 5.3L5.6 6.2L6 4.6L4.8 3.6L6.4 3.5L7 2Z" />
          <path d="M12 1L12.6 2.5L14.2 2.6L13 3.6L13.4 5.2L12 4.3L10.6 5.2L11 3.6L9.8 2.6L11.4 2.5L12 1Z" />
          <path d="M17 2L17.6 3.5L19.2 3.6L18 4.6L18.4 6.2L17 5.3L15.6 6.2L16 4.6L14.8 3.6L16.4 3.5L17 2Z" />
          <path d="M5 7H19C19.55 7 20 7.45 20 8V21H4V8C4 7.45 4.45 7 5 7ZM7 10V12H9V10H7ZM11 10V12H13V10H11ZM15 10V12H17V10H15ZM7 14V16H9V14H7ZM11 14V16H13V14H11ZM15 14V16H17V14H15ZM10 18V21H14V18H10Z" />
        </svg>
      ),
    },
    {
      id: 'spiritual-journey',
      title: 'Spiritual Journey',
      description:
        'Menghadirkan pengalaman spiritual yang tak terlupakan, dengan bimbingan sesuai tuntunan syariat Islam',
      icon: (
        <svg
          className="w-6 h-6 sm:w-10 md:w-12 sm:h-10 md:h-12 text-[#0c1b40]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crescent moon + night / book container */}
          <rect x="4" y="3" width="16" height="18" rx="3" fill="currentColor" />
          <path
            d="M14 7.5C12.5 8 11.5 9.5 11.5 11.2C11.5 13.3 13.2 15 15.3 15C16.1 15 16.8 14.7 17.4 14.3C16.8 16 15.1 17.2 13.2 17.2C10.7 17.2 8.7 15.2 8.7 12.7C8.7 10.3 10.5 8.4 12.8 8.1C13.2 8 13.6 8 14 8.1V7.5Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      id: 'full-service',
      title: 'Full Service',
      description:
        'Menyediakan layanan lengkap mulai dari persiapan dokumen, tiket pesawat, akomodasi, hingga bimbingan ibadah',
      icon: (
        <svg
          className="w-6 h-6 sm:w-10 md:w-12 sm:h-10 md:h-12 text-[#0c1b40]"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Two caring / supportive hands */}
          <path d="M21.7 14.3L15.3 8.7C14.9 8.3 14.3 8.3 13.9 8.7L12.5 10.1C13.5 11.2 14.7 12.2 16.1 13H11.5C10.7 13 10 13.7 10 14.5C10 15.3 10.7 16 11.5 16H17.8L20.3 18.2C20.7 18.5 21.2 18.5 21.6 18.1C22 17.7 22.1 17.1 21.7 16.7L21.7 14.3Z" />
          <path d="M2.3 9.7L8.7 15.3C9.1 15.7 9.7 15.7 10.1 15.3L11.5 13.9C10.5 12.8 9.3 11.8 7.9 11H12.5C13.3 11 14 10.3 14 9.5C14 8.7 13.3 8 12.5 8H6.2L3.7 5.8C3.3 5.5 2.8 5.5 2.4 5.9C2 6.3 1.9 6.9 2.3 7.3L2.3 9.7Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Primary Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-b from-[#0a1931] via-[#0d254c] to-[#0a1931] text-white pt-8 pb-12 sm:pt-10 sm:pb-16"
      >
        {/* Decorative Islamic Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-semibold mb-5 backdrop-blur-sm shadow-sm animate-in fade-in duration-700">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>ZafaTour Perwakilan CitraGrand City Palembang</span>
            </div>

            {/* Main Headline (Perkecil) */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
              Wujudkan Niat Suci ke Baitullah Bersama{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-sky-300">
                Zafa Tour CGC
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Biro perjalanan Haji & Umroh resmi berizin Kemenag RI. Kami melayani dengan amanah,
              bimbingan ibadah intensif sesuai Sunnah, fasilitas hotel dekat pelataran, dan
              penerbangan direct Palembang & CGK.
            </p>
          </div>
        </div>
      </section>

      {/* "Mengapa Zafa Tour" Section - Optimized for compact mobile scroll */}
      <section
        id="why-us"
        className="py-8 sm:py-16 md:py-20 bg-white border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Main Title */}
          <div className="text-center mb-6 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#1e293b] tracking-tight">
              Mengapa Zafa Tour
            </h2>
          </div>

          {/* 6 Features Grid - 2 columns on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
            {whyUsItems.map((item) => (
              <div
                key={item.id}
                id={`feature-${item.id}`}
                className="flex flex-col items-center text-center p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50/70 sm:bg-transparent border border-slate-100/90 sm:border-0 hover:bg-slate-100/80 sm:hover:bg-transparent transition-all duration-200 group"
              >
                {/* Dark Navy Icon */}
                <div className="mb-2 sm:mb-4 w-9 h-9 sm:w-14 sm:h-14 rounded-lg sm:rounded-none bg-blue-50/80 sm:bg-transparent flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shrink-0">
                  {item.icon}
                </div>

                {/* Feature Title */}
                <h3 className="text-xs sm:text-base lg:text-lg font-bold text-[#0c1b40] mb-1 sm:mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Feature Description */}
                <p className="text-[10.5px] sm:text-xs md:text-sm text-slate-600 font-normal leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
