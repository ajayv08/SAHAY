import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  X,
  Phone,
  RotateCcw,
  Wrench,
  Zap,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  Hammer,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Provider, ServiceCategory } from '../types';
import { RequestModal } from '../components/RequestModal';

const ALL_CATEGORIES: ServiceCategory[] = [
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Tutoring',
  'Elder Care',
  'Repairs',
];

const getCategoryIcon = (category: ServiceCategory, className = 'w-4 h-4') => {
  switch (category) {
    case 'Plumbing':
      return <Wrench className={className} />;
    case 'Electrical':
      return <Zap className={className} />;
    case 'Cleaning':
      return <Sparkles className={className} />;
    case 'Tutoring':
      return <GraduationCap className={className} />;
    case 'Elder Care':
      return <HeartHandshake className={className} />;
    case 'Repairs':
      return <Hammer className={className} />;
  }
};

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { providers, selectedCategoryFilter, setSelectedCategoryFilter } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>(() => {
    const catParam = searchParams.get('category') as ServiceCategory;
    if (catParam && ALL_CATEGORIES.includes(catParam)) {
      return [catParam];
    }
    if (selectedCategoryFilter) {
      return [selectedCategoryFilter];
    }
    return [];
  });

  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);

  // Selected provider for request modal
  const [activeRequestProvider, setActiveRequestProvider] = useState<Provider | null>(null);

  // Sync with URL query parameter
  useEffect(() => {
    const catParam = searchParams.get('category') as ServiceCategory;
    if (catParam && ALL_CATEGORIES.includes(catParam)) {
      setSelectedCategories([catParam]);
    }
  }, [searchParams]);

  const handleCategoryToggle = (category: ServiceCategory) => {
    setSelectedCategories((prev) => {
      let updated: ServiceCategory[];
      if (prev.includes(category)) {
        updated = prev.filter((c) => c !== category);
      } else {
        updated = [...prev, category];
      }
      // update URL
      if (updated.length === 1) {
        setSearchParams({ category: updated[0] });
      } else {
        setSearchParams({});
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setMaxDistance(25);
    setAvailabilityFilter('All');
    setMinRating(0);
    setSelectedCategoryFilter(null);
    setSearchParams({});
  };

  // Filtered providers
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesCoop = p.cooperativeName.toLowerCase().includes(q);
        const matchesBio = p.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesCoop && !matchesBio) {
          return false;
        }
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      // Distance
      if (p.distanceKm > maxDistance) {
        return false;
      }

      // Availability
      if (availabilityFilter !== 'All' && p.availability !== availabilityFilter) {
        return false;
      }

      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [providers, searchQuery, selectedCategories, maxDistance, availabilityFilter, minRating]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Breadcrumb & Title */}
      <div className="mb-6">
        <div className="text-xs text-[#596780] mb-1">
          <span>SAHAY Directory</span> / <span className="text-[#0B2A5C] font-semibold">Verified Providers</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2A5C]">
              Cooperative Service Providers
            </h1>
            <p className="text-xs text-[#596780] mt-0.5">
              Certified, police-cleared members of authorized district service cooperatives
            </p>
          </div>
          <div className="text-xs font-semibold text-[#2E9E4F] bg-[#2E9E4F]/10 px-3 py-1.5 border border-[#2E9E4F]/20 inline-flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Fair Standard Pricing Regulated by Union By-laws</span>
          </div>
        </div>
      </div>

      {/* Top Search Bar */}
      <div className="bg-white border border-[#E2E5EA] p-3 mb-6">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#0B2A5C] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            id="provider-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by service type, provider name, cooperative union, or specific skill (e.g. MCB, plumbing, tutoring)..."
            className="w-full text-xs sm:text-sm pl-11 pr-24 py-2.5 bg-[#F8F9FA] border border-[#E2E5EA] focus:outline-none focus:border-[#0B2A5C] rounded-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-[#596780] hover:text-[#0F0F0F] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Layout: Sidebar Filters + Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-[#E2E5EA] p-5 sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E5EA]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B2A5C] uppercase tracking-wide">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </div>
              {(selectedCategories.length > 0 ||
                maxDistance < 25 ||
                availabilityFilter !== 'All' ||
                minRating > 0 ||
                searchQuery) && (
                <button
                  id="reset-filters-btn"
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-[#F5821F] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Filter 1: Categories Checkboxes */}
            <div>
              <h3 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider mb-2.5">
                Category
              </h3>
              <div className="space-y-1.5">
                {ALL_CATEGORIES.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className={`group flex items-center justify-between p-2 text-xs cursor-pointer select-none transition-all duration-150 border ${
                        isChecked
                          ? 'bg-[#0B2A5C]/5 border-[#0B2A5C] text-[#0B2A5C] font-semibold'
                          : 'bg-white border-[#E2E5EA] text-[#0F0F0F] hover:border-[#0B2A5C] hover:bg-[#F8F9FA]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(cat)}
                          className="w-4 h-4 accent-[#0B2A5C] rounded-none cursor-pointer"
                        />
                        <span>{cat}</span>
                      </div>
                      <div
                        className={`w-6 h-6 flex items-center justify-center transition-colors ${
                          isChecked
                            ? 'text-[#0B2A5C]'
                            : 'text-[#596780] group-hover:text-[#F5821F]'
                        }`}
                      >
                        {getCategoryIcon(cat, 'w-3.5 h-3.5 transition-transform duration-150 group-hover:scale-115')}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter 2: Distance Slider */}
            <div className="pt-4 border-t border-[#E2E5EA]">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider">
                  Distance
                </h3>
                <span className="text-xs font-mono font-bold text-[#0B2A5C]">
                  &le; {maxDistance} km
                </span>
              </div>
              <input
                type="range"
                id="filter-distance-slider"
                min="1"
                max="25"
                step="1"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-[#0B2A5C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#596780] mt-1">
                <span>1 km (Local)</span>
                <span>25 km (Regional)</span>
              </div>
            </div>

            {/* Filter 3: Availability Dropdown */}
            <div className="pt-4 border-t border-[#E2E5EA]">
              <h3 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider mb-2">
                Availability
              </h3>
              <select
                id="filter-availability-select"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-[#E2E5EA] rounded-none focus:outline-none focus:border-[#0B2A5C]"
              >
                <option value="All">All Schedules</option>
                <option value="Available Today">Available Today</option>
                <option value="Available Tomorrow">Available Tomorrow</option>
                <option value="Weekend Only">Weekend Only</option>
              </select>
            </div>

            {/* Filter 4: Cooperative Rating */}
            <div className="pt-4 border-t border-[#E2E5EA]">
              <h3 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider mb-2">
                Cooperative Rating
              </h3>
              <div className="space-y-1.5">
                {[
                  { label: 'All Ratings', value: 0 },
                  { label: '4.5 & above ★', value: 4.5 },
                  { label: '4.8 & above ★', value: 4.8 },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 text-xs cursor-pointer hover:text-[#0B2A5C]"
                  >
                    <input
                      type="radio"
                      name="ratingFilter"
                      id={`filter-rating-${opt.value}`}
                      checked={minRating === opt.value}
                      onChange={() => setMinRating(opt.value)}
                      className="accent-[#0B2A5C]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Public Service Guarantee note */}
            <div className="p-3 bg-[#F8F9FA] border border-[#E2E5EA] text-[11px] text-[#596780] space-y-1">
              <p className="font-bold text-[#0B2A5C]">Public Ombudsman Protocol</p>
              <p>In case of service disputes, local cooperative arbiters ensure direct resolution within 24 hours.</p>
            </div>
          </div>
        </aside>

        {/* Main Grid of Provider Cards */}
        <main className="lg:col-span-3 space-y-4">
          {/* Active filter badges indicator */}
          <div className="flex items-center justify-between text-xs text-[#596780]">
            <span>
              Showing <strong className="text-[#0B2A5C]">{filteredProviders.length}</strong> of{' '}
              {providers.length} registered cooperative providers
            </span>
            {selectedCategories.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedCategories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 text-[11px] bg-[#0B2A5C] text-white px-2 py-0.5"
                  >
                    {c}
                    <button
                      onClick={() => handleCategoryToggle(c)}
                      className="hover:text-red-300 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {filteredProviders.length === 0 ? (
            <div className="bg-white border border-[#E2E5EA] p-12 text-center">
              <div className="w-12 h-12 mx-auto bg-[#F8F9FA] border border-[#E2E5EA] text-[#596780] flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-[#0B2A5C]" />
              </div>
              <h3 className="text-base font-bold text-[#0B2A5C]">No Providers Match Your Filter</h3>
              <p className="text-xs text-[#596780] max-w-md mx-auto mt-1 mb-5 leading-relaxed">
                Try loosening your distance limit or clearing selected categories to view all registered technicians in the metropolitan grid.
              </p>
              <button
                id="clear-search-empty-btn"
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0B2A5C] hover:bg-[#153a77] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  id={`provider-card-${provider.id}`}
                  className="bg-white border border-[#E2E5EA] p-5 flex flex-col justify-between hover:border-[#0B2A5C] hover:shadow-sm transition-all duration-150 group"
                >
                  <div>
                    {/* Top Row: Avatar placeholder, Name, Category badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#0B2A5C] text-white flex items-center justify-center font-bold text-base flex-shrink-0 group-hover:bg-[#F5821F] transition-colors duration-150">
                          {provider.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-base font-bold text-[#0B2A5C] group-hover:text-[#F5821F] transition-colors duration-150">{provider.name}</h3>
                            <span
                              title="Verified Cooperative Member"
                              className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#2E9E4F]/10 text-[#2E9E4F] px-1.5 py-0.5 border border-[#2E9E4F]/20"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              Verified
                            </span>
                          </div>
                          <p className="text-xs text-[#596780] mt-0.5">{provider.cooperativeName}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{provider.cooperativeRegNo}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-[#F0F2F5] text-[#0B2A5C] px-2 py-1 border border-[#E2E5EA] flex items-center gap-1.5 transition-colors duration-150 group-hover:bg-[#0B2A5C] group-hover:text-white group-hover:border-[#0B2A5C]">
                        {getCategoryIcon(provider.category, 'w-3 h-3')}
                        <span>{provider.category}</span>
                      </span>
                    </div>

                    {/* Rating & Distance & Price Strip */}
                    <div className="flex items-center justify-between py-2 border-y border-[#E2E5EA] text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#F5821F] text-[#F5821F]" />
                        <span className="font-bold text-[#0F0F0F]">{provider.rating}</span>
                        <span className="text-[#596780]">({provider.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#596780]">
                        <MapPin className="w-3.5 h-3.5 text-[#0B2A5C]" />
                        <span>{provider.distanceKm} km away</span>
                      </div>
                      <div className="font-bold text-[#0B2A5C]">
                        {provider.priceRange}
                      </div>
                    </div>

                    {/* Short Bio Line */}
                    <p className="text-xs text-[#596780] leading-relaxed mb-4 line-clamp-2">
                      {provider.bio}
                    </p>

                    {/* Verified Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-4">
                      {provider.verifiedBadges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-[#F8F9FA] border border-[#E2E5EA] text-[#596780] px-2 py-0.5"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Row */}
                  <div className="pt-3 border-t border-[#E2E5EA] flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-[#2E9E4F] font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{provider.availability}</span>
                    </div>

                    <button
                      id={`request-provider-btn-${provider.id}`}
                      onClick={() => setActiveRequestProvider(provider)}
                      className="px-5 py-2 text-xs font-bold text-white bg-[#F5821F] hover:bg-[#e07519] transition-colors rounded-none cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Request</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Booking Confirmation Modal */}
      {activeRequestProvider && (
        <RequestModal
          provider={activeRequestProvider}
          onClose={() => setActiveRequestProvider(null)}
        />
      )}
    </div>
  );
};
