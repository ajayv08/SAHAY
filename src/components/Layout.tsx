import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Header } from './Header';
import { Shield, Users, Landmark, PhoneCall } from 'lucide-react';
import { SahayLogo } from './SahayLogo';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#0F0F0F]">
      <Header />

      <main className="flex-1 w-full bg-[#FAFAFB]">
        <Outlet />
      </main>

      {/* Institutional Footer */}
      <footer className="bg-[#FFFFFF] border-t border-[#E2E5EA] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
            <div className="space-y-3">
              <SahayLogo variant="horizontal" size="sm" />
              <p className="text-xs text-[#596780] leading-relaxed">
                National Cooperative Platform for Household & Community Gig Services. Ensuring equitable worker ownership, fair wages, and verified household reliability.
              </p>
              <div className="text-[11px] text-[#2E9E4F] font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                100% Cooperative Surplus Reinvestment
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#0B2A5C] mb-3 text-xs uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2 text-xs text-[#596780]">
                <li><Link to="/services?category=Plumbing" className="hover:text-[#0B2A5C]">Plumbing & Pipe Fittings</Link></li>
                <li><Link to="/services?category=Electrical" className="hover:text-[#0B2A5C]">Electrical & Wiring</Link></li>
                <li><Link to="/services?category=Cleaning" className="hover:text-[#0B2A5C]">Deep Home Cleaning</Link></li>
                <li><Link to="/services?category=Tutoring" className="hover:text-[#0B2A5C]">Academic Tutoring</Link></li>
                <li><Link to="/services?category=Elder%20Care" className="hover:text-[#0B2A5C]">Elder Care & Companion</Link></li>
                <li><Link to="/services?category=Repairs" className="hover:text-[#0B2A5C]">Carpentry & Repairs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0B2A5C] mb-3 text-xs uppercase tracking-wider">
                Cooperative Framework
              </h4>
              <ul className="space-y-2 text-xs text-[#596780]">
                <li className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#2E9E4F]" />
                  <span>Member-Governed Unions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#2E9E4F]" />
                  <span>Police Verified Registry</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-[#2E9E4F]" />
                  <span>Transparent Public Escrow</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0B2A5C] mb-3 text-xs uppercase tracking-wider">
                Toll-Free Support
              </h4>
              <div className="bg-[#F8F9FA] p-3 rounded border border-[#E2E5EA] space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B2A5C]">
                  <PhoneCall className="w-3.5 h-3.5 text-[#F5821F]" />
                  <span>1800-266-7242 (SAHAY)</span>
                </div>
                <p className="text-[11px] text-[#596780]">
                  Mon-Sat 8:00 AM - 8:00 PM IST
                </p>
                <span className="inline-block text-[10px] bg-[#2E9E4F]/10 text-[#2E9E4F] font-semibold px-2 py-0.5 rounded">
                  Official Consumer Protection
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2E5EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#596780]">
            <p>© 2026 SAHAY — Developed for Smart India Hackathon (SIH). Public Prototype.</p>
            <p className="font-mono text-[11px] text-[#0B2A5C]">
              Discover. Pilot. Validate. Scale.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
