import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wrench,
  Zap,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  Hammer,
  ShieldCheck,
  Users2,
  Building2,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';
import { SahayLogo } from '../components/SahayLogo';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, activeBookings, setSelectedCategoryFilter } = useApp();

  const categories: {
    category: ServiceCategory;
    title: string;
    description: string;
    icon: React.ReactNode;
    count: string;
  }[] = [
    {
      category: 'Plumbing',
      title: 'Plumbing',
      description: 'Leak repairs, pipeline fittings, drainage & sanitary care',
      icon: <Wrench className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />,
      count: '18 Cooperative Members',
    },
    {
      category: 'Electrical',
      title: 'Electrical',
      description: 'Wiring safety, MCB diagnostics, switches & appliance setups',
      icon: <Zap className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />,
      count: '24 Certified Electricians',
    },
    {
      category: 'Cleaning',
      title: 'Cleaning',
      description: 'Deep home sanitization, kitchen degreasing & water tanks',
      icon: <Sparkles className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />,
      count: '32 Women Coop Crews',
    },
    {
      category: 'Tutoring',
      title: 'Tutoring',
      description: 'Curriculum-aligned K-12 STEM & humanities educators',
      icon: <GraduationCap className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />,
      count: '15 Academic Fellows',
    },
    {
      category: 'Elder Care',
      title: 'Elder Care',
      description: 'Geriatric assistance, vitals checks & compassionate support',
      icon: <HeartHandshake className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />,
      count: '12 Hospital-Trained Aides',
    },
    {
      category: 'Repairs',
      title: 'Repairs',
      description: 'Carpentry, fixtures, door-lock alignment & masonry',
      icon: <Hammer className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />,
      count: '21 Skilled Artisans',
    },
  ];

  const handleCategoryClick = (cat: ServiceCategory) => {
    setSelectedCategoryFilter(cat);
    navigate(`/services?category=${encodeURIComponent(cat)}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'requested':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-[#0B2A5C] border border-[#0B2A5C]/20">
            <Clock className="w-3 h-3" />
            Requested
          </span>
        );
      case 'assigned':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-amber-50 text-[#F5821F] border border-[#F5821F]/30">
            <Users2 className="w-3 h-3" />
            Assigned
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-[#2E9E4F]/10 text-[#2E9E4F] border border-[#2E9E4F]/30">
            <span className="w-2 h-2 rounded-full bg-[#2E9E4F] animate-pulse"></span>
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 bg-gray-100 text-gray-700">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
    }
  };

  return (
    <div className="w-full pb-16">
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-[#E2E5EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0F2F5] border border-[#E2E5EA] text-[#0B2A5C] text-xs font-semibold uppercase tracking-wider mb-5">
                <span>National Cooperative Gig Platform</span>
                <span className="text-gray-300">•</span>
                <span className="text-[#2E9E4F]">Smart India Hackathon</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2A5C] tracking-tight leading-tight mb-4">
                Equitable Household Services, Powered by Cooperative Unions.
              </h1>

              <p className="text-base sm:text-lg text-[#596780] leading-relaxed mb-8 max-w-2xl">
                Welcome back, <strong className="text-[#0F0F0F] font-semibold">{user.name}</strong>. Access vetted, certified local service professionals governed by member-owned cooperative societies. Transparent rates, zero predatory commissions.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/services"
                  id="hero-find-service-cta"
                  className="px-6 py-3.5 bg-[#F5821F] hover:bg-[#e07519] text-white text-sm font-bold tracking-wide transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Find a Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/bookings"
                  id="hero-view-bookings-btn"
                  className="px-6 py-3.5 bg-white hover:bg-[#F8F9FA] text-[#0B2A5C] border border-[#0B2A5C] text-sm font-bold tracking-wide transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Track Active Bookings ({activeBookings.length})</span>
                </Link>
              </div>
            </div>

            {/* Right: Official SAHAY Logo Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md">
                <SahayLogo variant="full" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Trust Strip (3 Columns) */}
      <section className="bg-[#FFFFFF] border-b border-[#E2E5EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trust Col 1 */}
            <div className="p-4 border border-[#E2E5EA] bg-[#F8F9FA] flex items-start gap-3.5">
              <div className="w-10 h-10 bg-white border border-[#E2E5EA] flex items-center justify-center flex-shrink-0 text-[#2E9E4F]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A5C] uppercase tracking-wide">
                  Verified Providers
                </h3>
                <p className="text-xs text-[#596780] mt-1 leading-relaxed">
                  Every gig worker undergoes municipal identity verification, police background audit, and certified trade assessment.
                </p>
              </div>
            </div>

            {/* Trust Col 2 */}
            <div className="p-4 border border-[#E2E5EA] bg-[#F8F9FA] flex items-start gap-3.5">
              <div className="w-10 h-10 bg-white border border-[#E2E5EA] flex items-center justify-center flex-shrink-0 text-[#2E9E4F]">
                <Users2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A5C] uppercase tracking-wide">
                  Cooperative-Owned
                </h3>
                <p className="text-xs text-[#596780] mt-1 leading-relaxed">
                  Workers own their digital union platform. 0% private middleman commission ensures fair wages and dedicated craftsmanship.
                </p>
              </div>
            </div>

            {/* Trust Col 3 */}
            <div className="p-4 border border-[#E2E5EA] bg-[#F8F9FA] flex items-start gap-3.5">
              <div className="w-10 h-10 bg-white border border-[#E2E5EA] flex items-center justify-center flex-shrink-0 text-[#2E9E4F]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A5C] uppercase tracking-wide">
                  Government Backed
                </h3>
                <p className="text-xs text-[#596780] mt-1 leading-relaxed">
                  Incubated under Smart India Hackathon public goods mandate with standardized tariffs and grievance arbitration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* 3. Your Active Bookings Section */}
        <section id="active-bookings-section">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#0B2A5C]">Your Active Bookings</h2>
              <p className="text-xs text-[#596780]">
                Real-time status updates from cooperative service dispatch
              </p>
            </div>
            {activeBookings.length > 0 && (
              <Link
                to="/bookings"
                id="view-all-bookings-link"
                className="text-xs font-bold text-[#0B2A5C] hover:text-[#F5821F] flex items-center gap-1"
              >
                <span>View All Bookings ({activeBookings.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {activeBookings.length === 0 ? (
            <div className="bg-white border border-[#E2E5EA] p-8 text-center">
              <div className="w-12 h-12 mx-auto bg-[#F8F9FA] border border-[#E2E5EA] text-[#596780] flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-[#0B2A5C]" />
              </div>
              <h3 className="text-sm font-bold text-[#0B2A5C]">No Active Bookings</h3>
              <p className="text-xs text-[#596780] max-w-sm mx-auto mt-1 mb-4">
                You currently have no service requests in progress. Explore our cooperative providers below to schedule a service.
              </p>
              <Link
                to="/services"
                id="empty-state-browse-services-btn"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#F5821F] hover:bg-[#e07519] transition-colors"
              >
                <span>Browse Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeBookings.map((booking) => (
                <div
                  key={booking.id}
                  id={`home-booking-card-${booking.id}`}
                  className="bg-white border border-[#E2E5EA] p-5 flex flex-col justify-between hover:border-[#0B2A5C] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-semibold text-[#596780]">
                        {booking.bookingNumber}
                      </span>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-[#0B2A5C]">
                          {booking.serviceCategory} Service
                        </h4>
                        <p className="text-xs font-medium text-[#0F0F0F] mt-0.5">
                          {booking.provider.name}
                        </p>
                        <p className="text-[11px] text-[#596780]">
                          {booking.provider.cooperativeName}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[#E2E5EA] pt-3 mt-3 space-y-1.5 text-xs text-[#596780]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#0B2A5C]" />
                        <span>{booking.scheduledDate} ({booking.scheduledTime})</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#0B2A5C] flex-shrink-0" />
                        <span className="truncate">{booking.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E2E5EA] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B2A5C]">
                      Est. ₹{booking.estimatedPrice}
                    </span>
                    <Link
                      to={`/bookings?highlight=${booking.id}`}
                      id={`track-booking-${booking.id}`}
                      className="text-xs font-bold text-white bg-[#0B2A5C] hover:bg-[#153a77] px-3 py-1.5 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Track Status</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. Service Category Grid (6 Cards) */}
        <section id="service-categories-section">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#0B2A5C]">Service Categories</h2>
              <p className="text-xs text-[#596780]">
                Select a category to view registered cooperative professionals in your locality
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.category}
                id={`category-card-${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleCategoryClick(cat.category)}
                className="text-left bg-white border border-[#E2E5EA] p-5 hover:border-[#0B2A5C] hover:shadow-sm transition-all duration-200 group cursor-pointer relative overflow-hidden"
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#F5821F] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="flex items-start justify-between mb-3.5">
                  <div className="w-12 h-12 bg-[#F0F2F5] text-[#0B2A5C] border border-[#E2E5EA] group-hover:bg-[#0B2A5C] group-hover:text-white group-hover:border-[#0B2A5C] flex items-center justify-center transition-all duration-200 shadow-none">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-[#2E9E4F] bg-[#2E9E4F]/10 px-2 py-0.5 border border-[#2E9E4F]/20 group-hover:bg-[#2E9E4F] group-hover:text-white transition-colors duration-200">
                    {cat.count}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0B2A5C] group-hover:text-[#F5821F] transition-colors duration-200 flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#F5821F] transition-all duration-200 group-hover:translate-x-1" />
                </h3>

                <p className="text-xs text-[#596780] mt-1.5 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#E2E5EA] flex items-center justify-between text-[11px]">
                  <span className="text-[#0B2A5C] font-semibold">Standard Cooperative Tariff</span>
                  <span className="text-[#F5821F] font-bold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200">
                    Request Service &rarr;
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Hackathon Cooperative Mission Banner */}
        <section className="bg-[#0B2A5C] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold text-[#F5821F] uppercase tracking-wider">
              Smart India Hackathon Public Infrastructure
            </span>
            <h3 className="text-xl font-bold">
              Why SAHAY Outperforms Conventional Gig Aggregators
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Commercial platforms extract 20-35% commissions from daily earners while offering zero social security. SAHAY operates on open cooperative protocols where 100% of tariff payments directly empower worker collectives.
            </p>
          </div>
          <Link
            to="/services"
            id="banner-request-service-btn"
            className="px-6 py-3 bg-[#F5821F] hover:bg-[#e07519] text-white text-xs font-bold tracking-wide uppercase transition-colors flex-shrink-0 cursor-pointer"
          >
            Explore All Providers
          </Link>
        </section>
      </div>
    </div>
  );
};
