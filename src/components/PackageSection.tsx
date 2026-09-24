import { useState, useId } from 'react';
import {
  Calendar,
  Plane,
  Building2,
  MapPin,
  Compass,
  Maximize2,
  ChevronDown,
  Filter,
  X,
  MessageCircle,
} from 'lucide-react';
import { UmrahPackage, Hotel, PackageCategoryType } from '../types';
import { formatCurrencyIDR, getDistanceToKaaba, getDistanceToNabawi } from '../utils/distance';

interface PackageSectionProps {
  packages: UmrahPackage[];
  hotels: Hotel[];
  whatsappNumber?: string;
}

function getPackageDepartureDates(pkg: UmrahPackage): string[] {
  const dates: string[] = [];
  const seen = new Set<string>();

  const add = (val?: string) => {
    if (!val || typeof val !== 'string') return;
    const clean = val.trim();
    if (!clean) return;
    if (clean.includes(';') || clean.includes('\n')) {
      clean.split(/[;\n]+/).forEach(add);
      return;
    }
    if (!seen.has(clean)) {
      seen.add(clean);
      dates.push(clean);
    }
  };

  if (Array.isArray(pkg.departureDates) && pkg.departureDates.length > 0) {
    pkg.departureDates.forEach(add);
  }

  if (Array.isArray(pkg.seatSchedules) && pkg.seatSchedules.length > 0) {
    pkg.seatSchedules.forEach((s) => add(s.departureDate));
  }

  if (dates.length === 0 && pkg.departureDate) {
    add(pkg.departureDate);
  }

  return dates;
}

function formatWaNumber(num?: string): string {
  if (!num) return '62811715608';
  const digits = num.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '62' + digits.substring(1);
  }
  if (digits.startsWith('62')) {
    return digits;
  }
  return digits || '62811715608';
}

function getPackageWhatsAppLink(pkg: UmrahPackage, waNumber?: string): string {
  const phone = formatWaNumber(waNumber);
  const message = `Assalamu'alaikum ZafaTour Perwakilan CGC Palembang, Saya ingin bertanya informasi mengenai paket ini: ${pkg.title}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function PackageSection({
  packages,
  hotels,
  whatsappNumber,
}: PackageSectionProps) {
  const pkgCategoryFilterId = useId();
  const pkgSelectFilterId = useId();

  const [categoryFilter, setCategoryFilter] = useState<'All' | PackageCategoryType>('All');
  const [selectedPackageTitle, setSelectedPackageTitle] = useState<string>('All');
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  // Available unique package titles for filter picklist
  const availablePackageTitles = Array.from(
    new Set(
      packages
        .map((p) => (p.title || '').trim())
        .filter((t) => Boolean(t))
    )
  ).sort((a, b) => a.localeCompare(b, 'id'));

  // Filter packages based on category & title
  const filteredPackages = packages.filter((pkg) => {
    // 1. Category Filter
    if (categoryFilter !== 'All') {
      const pCat = (pkg.category || '').toUpperCase();
      if (categoryFilter === 'HAJI KHUSUS') {
        if (!pCat.includes('HAJI KHUSUS') && !pCat.includes('HAJI PLUS')) return false;
      } else if (categoryFilter === 'HAJI') {
        if (!pCat.startsWith('HAJI') || pCat.includes('KHUSUS') || pCat.includes('PLUS')) return false;
      } else if (categoryFilter === 'UMRAH') {
        if (!pCat.startsWith('UMR')) return false;
      }
    }

    // 2. Title Filter Picklist
    if (selectedPackageTitle !== 'All') {
      if ((pkg.title || '').trim() !== selectedPackageTitle) {
        return false;
      }
    }

    return true;
  });

  return (
    <section id="packages" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-blue-700" />
                Group Database Paket
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <Plane className="w-3 h-3 text-emerald-600" />
                Khusus Keberangkatan PLM & CGK
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Paket Haji & Umroh <br /> <span className="text-emerald-600 block sm:inline">Zafatour CGC</span>
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Data paket tersinkronisasi otomatis dari database Zafa Tour (khusus rute PLM & CGK).
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
              <label htmlFor={pkgCategoryFilterId} className="sr-only">Filter Kategori</label>
              {(['All', 'UMRAH', 'HAJI', 'HAJI KHUSUS'] as const).map((c) => (
                <button
                  key={c}
                  id={c === 'All' ? pkgCategoryFilterId : undefined}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    categoryFilter === c
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-blue-900'
                  }`}
                >
                  {c === 'All' ? 'Semua Paket' : c}
                </button>
              ))}
            </div>

            {/* Filter by Package Title (Picklist) */}
            <div className="flex items-center gap-1">
              <label htmlFor={pkgSelectFilterId} className="sr-only">Pilih Paket</label>
              <div className="relative flex items-center">
                <Filter className="pointer-events-none absolute left-3 w-3.5 h-3.5 text-slate-400" />
                <select
                  id={pkgSelectFilterId}
                  value={selectedPackageTitle}
                  onChange={(e) => setSelectedPackageTitle(e.target.value)}
                  className={`appearance-none text-xs font-bold py-2 pl-8 pr-8 rounded-xl border shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer max-w-[200px] sm:max-w-[240px] truncate transition-all ${
                    selectedPackageTitle !== 'All'
                      ? 'bg-blue-50 text-blue-950 border-blue-300 ring-1 ring-blue-300'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                  title="Pilih dan filter paket berdasarkan Nama Paket"
                >
                  <option value="All">Pilih Paket ({availablePackageTitles.length})</option>
                  {availablePackageTitles.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>

              {selectedPackageTitle !== 'All' && (
                <button
                  type="button"
                  onClick={() => setSelectedPackageTitle('All')}
                  className="p-2 text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-xl border border-slate-200 transition-all text-xs"
                  title="Reset filter paket"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <Plane className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <h3 className="text-base font-bold text-slate-800">Tidak Ditemukan Paket</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Tidak ada paket yang sesuai dengan kategori atau filter yang Anda pilih.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedPackageTitle('All');
                  setCategoryFilter('All');
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Tampilkan Semua Paket
              </button>
            </div>
          ) : (
            filteredPackages.map((pkg) => {
              const makkahHotel = hotels.find((h) => h.id === pkg.makkahHotelId);
              const makkahHotel2 = pkg.makkahHotel2Id ? hotels.find((h) => h.id === pkg.makkahHotel2Id) : null;
              const madinahHotel = hotels.find((h) => h.id === pkg.madinahHotelId);
              const madinahHotel2 = pkg.madinahHotel2Id ? hotels.find((h) => h.id === pkg.madinahHotel2Id) : null;

              const distanceKaaba =
                pkg.distanceToKaaba ||
                (makkahHotel
                  ? getDistanceToKaaba(makkahHotel.mapUrl, makkahHotel.distanceToCenterMeters)
                  : '');

              const distanceKaaba2 =
                pkg.distanceToKaaba2 ||
                (makkahHotel2
                  ? getDistanceToKaaba(makkahHotel2.mapUrl, makkahHotel2.distanceToCenterMeters)
                  : '');

              const distanceNabawi =
                pkg.distanceToNabawi ||
                (madinahHotel
                  ? getDistanceToNabawi(madinahHotel.mapUrl, madinahHotel.distanceToCenterMeters)
                  : '');

              const distanceNabawi2 =
                pkg.distanceToNabawi2 ||
                (madinahHotel2
                  ? getDistanceToNabawi(madinahHotel2.mapUrl, madinahHotel2.distanceToCenterMeters)
                  : '');

              return (
                <div
                  key={pkg.id}
                  id={`card-package-${pkg.id}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
                >
                  {/* Image & Badges */}
                  <div
                    className={`relative h-52 w-full bg-slate-800 overflow-hidden ${
                      pkg.packagePhoto ? 'cursor-pointer group/photo' : ''
                    }`}
                    onClick={() => {
                      if (pkg.packagePhoto) {
                        setPreviewImage({ url: pkg.packagePhoto, title: pkg.title });
                      }
                    }}
                    title={pkg.packagePhoto ? 'Klik untuk melihat foto penuh' : undefined}
                  >
                    {pkg.packagePhoto ? (
                      <>
                        <img
                          src={pkg.packagePhoto}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                            <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
                            <span>Lihat Foto Penuh</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-blue-950 text-white">
                        <Plane className="w-10 h-10 text-slate-500 mb-2" />
                        <span className="text-xs text-slate-400 font-medium">Foto Paket Belum Diatur</span>
                        <h4 className="text-xs font-bold text-white line-clamp-2 mt-1 px-4">
                          {pkg.title}
                        </h4>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-black tracking-wider uppercase bg-blue-900/90 text-white backdrop-blur-xs shadow-xs pointer-events-none">
                      {pkg.category}
                    </div>

                    {/* Duration badge if set */}
                    {pkg.durationDays > 0 && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-900 shadow-xs pointer-events-none">
                        {pkg.durationDays} Hari
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Package Title */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                        {pkg.title}
                      </h3>

                      {/* Departure Date & Schedules */}
                      {(() => {
                        const dates = getPackageDepartureDates(pkg);
                        const hasDates = dates.length > 0;

                        return (
                          <div className="mt-2.5">
                            {/* Keberangkatan Info Bar */}
                            <div className="flex items-center justify-between gap-1.5 text-xs font-bold">
                              <div className="flex items-center gap-1.5">
                                <Calendar className={`w-3.5 h-3.5 shrink-0 ${hasDates ? 'text-amber-700' : 'text-rose-600'}`} />
                                <span className="text-slate-800">
                                  Keberangkatan :{' '}
                                  {hasDates ? (
                                    <span className="text-slate-900 font-extrabold">{dates.length} Jadwal</span>
                                  ) : (
                                    <span className="text-rose-600 font-extrabold">Seat Habis</span>
                                  )}
                                </span>
                              </div>
                              {!hasDates && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                                  Seat Habis
                                </span>
                              )}
                            </div>

                            {/* Tanggal Keberangkatan List (Kuning Gelap Muda) */}
                            {hasDates ? (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {dates.map((d, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100/90 text-amber-950 text-[11px] font-bold border border-amber-300 shadow-2xs"
                                  >
                                    <Calendar className="w-3 h-3 text-amber-800 shrink-0" />
                                    <span>{d}</span>
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <div className="mt-2 px-2.5 py-1.5 bg-rose-50 border border-rose-200/80 rounded-xl text-[11px] text-rose-700 font-medium">
                                Jadwal keberangkatan belum tersedia / seat telah penuh.
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Airline & Route */}
                      <div className="mt-3 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Plane className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                          <span>{pkg.airline || 'Maskapai Reguler'}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 pl-5">
                          <span>{pkg.departureAirport || 'PLM'}</span>
                          {pkg.arrivalAirport && <span> → {pkg.arrivalAirport}</span>}
                        </div>
                      </div>

                      {/* Hotels & Distance Views */}
                      <div className="mt-3 space-y-2 text-xs">
                        {/* Hotel Makkah */}
                        {(pkg.makkahHotelName || makkahHotel) ? (
                          <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                            <div>
                              <div className="flex items-center gap-1.5 font-bold text-blue-950">
                                <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                                <span>Makkah 1: {pkg.makkahHotelName || makkahHotel?.name}</span>
                              </div>
                              {distanceKaaba && (
                                <div className="text-[11px] text-blue-700 font-semibold pl-5 mt-0.5 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 shrink-0" />
                                  <span>Jarak ke Ka&apos;bah: {distanceKaaba}</span>
                                </div>
                              )}
                            </div>

                            {(pkg.makkahHotel2Name || makkahHotel2) && (
                              <div className="pt-1.5 border-t border-blue-200/60 mt-1">
                                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                                  <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  <span>Makkah 2: {pkg.makkahHotel2Name || makkahHotel2?.name}</span>
                                </div>
                                {distanceKaaba2 && (
                                  <div className="text-[11px] text-blue-700 font-semibold pl-5 mt-0.5 flex items-center gap-1">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span>Jarak ke Ka&apos;bah: {distanceKaaba2}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : null}

                        {/* Hotel Madinah */}
                        {(pkg.madinahHotelName || madinahHotel) ? (
                          <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
                            <div>
                              <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                                <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                                <span>Madinah 1: {pkg.madinahHotelName || madinahHotel?.name}</span>
                              </div>
                              {distanceNabawi && (
                                <div className="text-[11px] text-emerald-700 font-semibold pl-5 mt-0.5 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 shrink-0" />
                                  <span>Jarak ke Masjid Madinah: {distanceNabawi}</span>
                                </div>
                              )}
                            </div>

                            {(pkg.madinahHotel2Name || madinahHotel2) && (
                              <div className="pt-1.5 border-t border-emerald-200/60 mt-1">
                                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                                  <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>Madinah 2: {pkg.madinahHotel2Name || madinahHotel2?.name}</span>
                                </div>
                                {distanceNabawi2 && (
                                  <div className="text-[11px] text-emerald-700 font-semibold pl-5 mt-0.5 flex items-center gap-1">
                                    <MapPin className="w-3 h-3 shrink-0" />
                                    <span>Jarak ke Masjid Madinah: {distanceNabawi2}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>

                      {/* Notes if available */}
                      {pkg.notes && (
                        <p className="mt-2 text-xs text-slate-500 line-clamp-2 italic">
                          &quot;{pkg.notes}&quot;
                        </p>
                      )}
                    </div>

                    {/* Price & Action */}
                    <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          Harga Mulai
                        </div>
                        <div className="text-lg font-black text-blue-900 leading-tight">
                          {pkg.price > 0 ? formatCurrencyIDR(pkg.price) : 'Hubungi Kami'}
                        </div>
                      </div>

                      {/* Tombol Tanya WhatsApp */}
                      <a
                        href={getPackageWhatsAppLink(pkg, whatsappNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 shrink-0 group/wa hover:scale-[1.03]"
                        aria-label={`Tanya paket ${pkg.title} melalui WhatsApp`}
                        title={`Tanya informasi paket ${pkg.title} via WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4 fill-white/20 transition-transform group-hover/wa:rotate-12" />
                        <span>Tanya</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Full Photo Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-900/90 text-white flex items-center justify-between border-b border-slate-800">
              <span className="font-bold text-sm truncate pr-4">{previewImage.title}</span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all text-xs"
                title="Tutup foto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[80vh] flex items-center justify-center p-2 bg-slate-950">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
