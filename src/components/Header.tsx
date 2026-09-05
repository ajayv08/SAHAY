import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SahayLogo } from './SahayLogo';

export const Header: React.FC = () => {
  const { activeBookings, resetDemoData } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E5EA]">
      {/* Official Government / Hackathon Top Strip */}
      <div className="bg-[#0B2A5C] text-white text-xs px-4 py-1.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2E9E4F]"></span>
            <span className="font-medium tracking-wide">
              Smart India Hackathon • Public Digital Goods for Cooperative Gig Economy
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-gray-300">Ministry of Cooperation, Govt. of India</span>
            <button
              id="reset-demo-state-btn"
              onClick={resetDemoData}
              title="Reset sample data to initial hackathon state"
              className="flex items-center gap-1 text-[11px] text-gray-200 hover:text-white bg-[#153a77] px-2 py-0.5 rounded cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Persistent Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Left: Official SAHAY Brand Logo & Subtitle */}
          <Link to="/" id="brand-logo-link" className="flex items-center group focus:outline-none py-1">
            <SahayLogo variant="horizontal" size="md" />
          </Link>

          {/* Center / Right Nav Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/"
              id="nav-link-home"
              end
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 text-sm font-semibold transition-colors rounded-sm relative ${
                  isActive
                    ? 'text-[#F5821F] border-b-2 border-[#F5821F]'
                    : 'text-[#0B2A5C] hover:text-[#F5821F]'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              id="nav-link-services"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 text-sm font-semibold transition-colors rounded-sm relative ${
                  isActive
                    ? 'text-[#F5821F] border-b-2 border-[#F5821F]'
                    : 'text-[#0B2A5C] hover:text-[#F5821F]'
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/bookings"
              id="nav-link-bookings"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 text-sm font-semibold transition-colors rounded-sm relative flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#F5821F] border-b-2 border-[#F5821F]'
                    : 'text-[#0B2A5C] hover:text-[#F5821F]'
                }`
              }
            >
              <span>My Bookings</span>
              {activeBookings.length > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-[#F5821F] rounded-full min-w-5 h-5">
                  {activeBookings.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/profile"
              id="nav-link-profile"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 text-sm font-semibold transition-colors rounded-sm relative ${
                  isActive
                    ? 'text-[#F5821F] border-b-2 border-[#F5821F]'
                    : 'text-[#0B2A5C] hover:text-[#F5821F]'
                }`
              }
            >
              Profile
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
