import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Phone,
  MessageSquare,
  AlertCircle,
  Play,
  RotateCcw,
  Star,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Booking, BookingStatus } from '../types';

const STEP_DEFINITIONS: {
  status: BookingStatus;
  label: string;
  description: string;
}[] = [
  {
    status: 'requested',
    label: 'Requested',
    description: 'Booking initiated & queued in cooperative dispatch',
  },
  {
    status: 'assigned',
    label: 'Assigned',
    description: 'Matched with certified cooperative technician',
  },
  {
    status: 'in_progress',
    label: 'In Progress',
    description: 'Technician on-site executing services',
  },
  {
    status: 'completed',
    label: 'Completed',
    description: 'Work verified & cleared in cooperative escrow',
  },
];

export const MyBookingsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { bookings, advanceBookingStatus, rateBooking } = useApp();

  const highlightId = searchParams.get('highlight');
  const [expandedIds, setExpandedIds] = useState<string[]>(() => {
    if (highlightId && bookings.some((b) => b.id === highlightId)) {
      return [highlightId];
    }
    // Expand the first one by default if exists
    return bookings.length > 0 ? [bookings[0].id] : [];
  });

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [contactModalBooking, setContactModalBooking] = useState<Booking | null>(null);
  const [ratingInput, setRatingInput] = useState<{ id: string; stars: number; note: string } | null>(null);

  // If highlightId changes, expand it
  useEffect(() => {
    if (highlightId && !expandedIds.includes(highlightId)) {
      setExpandedIds((prev) => [highlightId, ...prev]);
    }
  }, [highlightId]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'active') return b.status !== 'completed';
    if (activeTab === 'completed') return b.status === 'completed';
    return true;
  });

  const getStepState = (
    stepStatus: BookingStatus,
    currentStatus: BookingStatus
  ): 'completed' | 'current' | 'pending' => {
    const order: BookingStatus[] = ['requested', 'assigned', 'in_progress', 'completed'];
    const stepIdx = order.indexOf(stepStatus);
    const currentIdx = order.indexOf(currentStatus);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'current';
    return 'pending';
  };

  const getNextStatusName = (status: BookingStatus): string | null => {
    switch (status) {
      case 'requested':
        return 'Assign Technician';
      case 'assigned':
        return 'Start Service (In Progress)';
      case 'in_progress':
        return 'Mark Completed';
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#596780] mb-1">
            <span>SAHAY Household Portal</span> / <span className="text-[#0B2A5C] font-semibold">Track Requests</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2A5C]">
            My Service Bookings
          </h1>
          <p className="text-xs text-[#596780] mt-0.5">
            Monitor real-time progress, dispatch verification, and simulated job updates
          </p>
        </div>

        {/* Hackathon Demo Tip Pill */}
        <div className="bg-[#F0F2F5] border border-[#E2E5EA] px-3.5 py-2 text-xs flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#F5821F]"></span>
          <span className="text-[#0B2A5C] font-semibold">
            SIH Evaluator Demo: Click "Simulate Update" inside any card to advance the live tracker.
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E5EA] mb-6">
        <button
          id="tab-all-bookings"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer relative ${
            activeTab === 'all'
              ? 'text-[#F5821F] border-b-2 border-[#F5821F]'
              : 'text-[#596780] hover:text-[#0B2A5C]'
          }`}
        >
          All Requests ({bookings.length})
        </button>
        <button
          id="tab-active-bookings"
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer relative ${
            activeTab === 'active'
              ? 'text-[#F5821F] border-b-2 border-[#F5821F]'
              : 'text-[#596780] hover:text-[#0B2A5C]'
          }`}
        >
          Active ({bookings.filter((b) => b.status !== 'completed').length})
        </button>
        <button
          id="tab-completed-bookings"
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2.5 text-xs font-bold transition-colors cursor-pointer relative ${
            activeTab === 'completed'
              ? 'text-[#F5821F] border-b-2 border-[#F5821F]'
              : 'text-[#596780] hover:text-[#0B2A5C]'
          }`}
        >
          Completed ({bookings.filter((b) => b.status === 'completed').length})
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-[#E2E5EA] p-12 text-center">
          <div className="w-12 h-12 mx-auto bg-[#F8F9FA] border border-[#E2E5EA] text-[#596780] flex items-center justify-center mb-3">
            <Clock className="w-6 h-6 text-[#0B2A5C]" />
          </div>
          <h3 className="text-base font-bold text-[#0B2A5C]">No Bookings In This View</h3>
          <p className="text-xs text-[#596780] max-w-sm mx-auto mt-1 mb-5">
            {activeTab === 'completed'
              ? 'You have not marked any service bookings as completed yet.'
              : 'You have no active bookings in the queue.'}
          </p>
          <Link
            to="/services"
            id="empty-view-browse-btn"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#F5821F] hover:bg-[#e07519] transition-colors"
          >
            <span>Book a Cooperative Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredBookings.map((booking) => {
            const isExpanded = expandedIds.includes(booking.id);
            const nextStatusLabel = getNextStatusName(booking.status);

            return (
              <div
                key={booking.id}
                id={`booking-card-${booking.id}`}
                className={`bg-white border transition-all ${
                  isExpanded ? 'border-[#0B2A5C] shadow-none' : 'border-[#E2E5EA] hover:border-gray-400'
                }`}
              >
                {/* Clickable Card Header Strip */}
                <div
                  id={`toggle-booking-${booking.id}`}
                  onClick={() => toggleExpand(booking.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer bg-white select-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-11 h-11 bg-[#0B2A5C] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {booking.provider.category.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-[#596780]">
                          {booking.bookingNumber}
                        </span>
                        <span className="text-xs text-gray-300">•</span>
                        <h3 className="text-base font-bold text-[#0B2A5C]">
                          {booking.serviceCategory} Service
                        </h3>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-[#0F0F0F] font-medium">
                          {booking.provider.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#596780] mt-0.5">
                        Scheduled: <strong>{booking.scheduledDate}</strong> ({booking.scheduledTime})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        {booking.status === 'requested' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 bg-blue-50 text-[#0B2A5C] border border-[#0B2A5C]/20">
                            Requested
                          </span>
                        )}
                        {booking.status === 'assigned' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 bg-amber-50 text-[#F5821F] border border-[#F5821F]/30">
                            Assigned
                          </span>
                        )}
                        {booking.status === 'in_progress' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 bg-[#2E9E4F]/10 text-[#2E9E4F] border border-[#2E9E4F]/30">
                            <span className="w-2 h-2 rounded-full bg-[#2E9E4F] animate-pulse"></span>
                            In Progress
                          </span>
                        )}
                        {booking.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 bg-[#2E9E4F] text-white">
                            <Check className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-[#0B2A5C] mt-1">
                        ₹{booking.estimatedPrice} Est.
                      </p>
                    </div>

                    <button
                      className="p-1 text-[#596780] hover:text-[#0B2A5C]"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable Tracker & Detail Body */}
                {isExpanded && (
                  <div className="border-t border-[#E2E5EA] p-5 sm:p-6 bg-[#FAFAFB] space-y-6">
                    {/* Horizontal 4-Step Progress Tracker */}
                    <div className="bg-white border border-[#E2E5EA] p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-[#E2E5EA]">
                        <div>
                          <h4 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider">
                            Live Service Progress Tracker
                          </h4>
                          <p className="text-[11px] text-[#596780]">
                            Cooperative dispatcher telemetry & event audit log
                          </p>
                        </div>

                        {/* Simulate Update Button */}
                        {nextStatusLabel ? (
                          <div className="flex items-center gap-2">
                            <button
                              id={`simulate-update-btn-${booking.id}`}
                              onClick={() => advanceBookingStatus(booking.id)}
                              className="px-3.5 py-1.5 bg-[#F5821F] hover:bg-[#e07519] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Advances the status to next stage for hackathon demonstration"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Simulate Update &rarr; {nextStatusLabel}</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-[#2E9E4F] flex items-center gap-1 bg-[#2E9E4F]/10 px-2.5 py-1 border border-[#2E9E4F]/20">
                            <CheckCircle2 className="w-4 h-4" />
                            All Stages Successfully Completed
                          </span>
                        )}
                      </div>

                      {/* 4 Steps Row */}
                      <div className="relative">
                        {/* Connecting bar for desktop */}
                        <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-[#E2E5EA] -z-0" />

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                          {STEP_DEFINITIONS.map((step, idx) => {
                            const state = getStepState(step.status, booking.status);

                            // Colors per requirements:
                            // navy (#0B2A5C) for completed steps
                            // orange (#F5821F) for current step
                            // gray (#E2E5EA) for pending
                            let nodeBg = 'bg-[#E2E5EA] text-[#596780] border-[#E2E5EA]';
                            let titleColor = 'text-[#596780]';
                            let badgeLabel = 'Pending';

                            if (state === 'completed') {
                              nodeBg = 'bg-[#0B2A5C] text-white border-[#0B2A5C]';
                              titleColor = 'text-[#0B2A5C]';
                              badgeLabel = 'Passed';
                            } else if (state === 'current') {
                              nodeBg = 'bg-[#F5821F] text-white border-[#F5821F] ring-4 ring-[#F5821F]/20';
                              titleColor = 'text-[#F5821F] font-bold';
                              badgeLabel = 'Current Step';
                            }

                            return (
                              <div
                                key={step.status}
                                className="flex sm:flex-col items-start gap-3 sm:gap-2"
                              >
                                <div
                                  className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-xs border ${nodeBg} flex-shrink-0 transition-colors`}
                                >
                                  {state === 'completed' ? (
                                    <Check className="w-4 h-4 text-white" />
                                  ) : (
                                    <span>{idx + 1}</span>
                                  )}
                                </div>
                                <div className="space-y-0.5 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className={`text-xs font-bold ${titleColor}`}>
                                      {step.label}
                                    </span>
                                    {state === 'current' && (
                                      <span className="text-[10px] bg-[#F5821F] text-white px-1 font-bold">
                                        Active
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[#596780] leading-snug">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Status History Logs */}
                      <div className="mt-6 pt-4 border-t border-[#E2E5EA] bg-[#F8F9FA] p-3 text-xs">
                        <span className="font-bold text-[#0B2A5C] text-[11px] uppercase tracking-wider block mb-2">
                          Audit Trail & Timestamps:
                        </span>
                        <div className="space-y-1.5">
                          {booking.statusHistory.map((hist, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-[11px]">
                              <span className="font-mono text-[#596780] min-w-28 flex-shrink-0">
                                {hist.timestamp}
                              </span>
                              <span className="font-semibold text-[#0B2A5C] uppercase min-w-20 flex-shrink-0">
                                [{hist.status}]
                              </span>
                              <span className="text-[#0F0F0F]">{hist.note}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Provider Details & Job Summary Two-Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Provider Card */}
                      <div className="bg-white border border-[#E2E5EA] p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#E2E5EA] mb-3">
                            <h4 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider">
                              Assigned Provider Details
                            </h4>
                            <span className="text-[11px] bg-[#2E9E4F]/10 text-[#2E9E4F] font-semibold px-2 py-0.5 border border-[#2E9E4F]/20 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              Coop Verified
                            </span>
                          </div>

                          <div className="flex items-start gap-3.5 mb-3">
                            <div className="w-12 h-12 bg-[#0B2A5C] text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                              {booking.provider.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)}
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-[#0F0F0F]">
                                {booking.provider.name}
                              </h5>
                              <p className="text-xs text-[#596780]">
                                {booking.provider.cooperativeName}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1 text-xs">
                                <Star className="w-3.5 h-3.5 fill-[#F5821F] text-[#F5821F]" />
                                <span className="font-bold">{booking.provider.rating}</span>
                                <span className="text-[#596780]">
                                  ({booking.provider.reviewCount} reviews)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1 text-xs text-[#596780] bg-[#F8F9FA] p-3 border border-[#E2E5EA]">
                            <p>
                              <strong className="text-[#0F0F0F]">Trade Experience:</strong>{' '}
                              {booking.provider.experienceYears} Years
                            </p>
                            <p>
                              <strong className="text-[#0F0F0F]">Official Contact:</strong>{' '}
                              {booking.provider.phone}
                            </p>
                            <p>
                              <strong className="text-[#0F0F0F]">Cooperative Reg No:</strong>{' '}
                              {booking.provider.cooperativeRegNo}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-[#E2E5EA] flex items-center gap-2">
                          <button
                            id={`contact-provider-btn-${booking.id}`}
                            onClick={() => setContactModalBooking(booking)}
                            className="flex-1 py-2 text-xs font-bold text-[#0B2A5C] bg-[#F0F2F5] hover:bg-[#e2e5ea] border border-[#E2E5EA] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#0B2A5C]" />
                            <span>Contact Provider</span>
                          </button>
                        </div>
                      </div>

                      {/* Job Summary */}
                      <div className="bg-white border border-[#E2E5EA] p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-[#E2E5EA] mb-3">
                            <h4 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider">
                              Job Summary
                            </h4>
                            <span className="text-xs font-mono font-semibold text-[#596780]">
                              {booking.bookingNumber}
                            </span>
                          </div>

                          <div className="space-y-3 text-xs">
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 text-[#0B2A5C] flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-[#596780] block text-[11px]">Scheduled Slot</span>
                                <span className="font-semibold text-[#0F0F0F]">
                                  {booking.scheduledDate} • {booking.scheduledTime}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-[#0B2A5C] flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-[#596780] block text-[11px]">Service Location</span>
                                <span className="font-semibold text-[#0F0F0F]">
                                  {booking.address}
                                </span>
                              </div>
                            </div>

                            {booking.notes && (
                              <div className="p-2.5 bg-[#F8F9FA] border border-[#E2E5EA] text-[11px]">
                                <span className="font-bold text-[#0B2A5C] block mb-0.5">Notes:</span>
                                <span className="text-[#596780]">{booking.notes}</span>
                              </div>
                            )}

                            <div className="pt-2 border-t border-[#E2E5EA] flex items-center justify-between">
                              <span className="text-xs text-[#596780]">Estimated Tariff</span>
                              <span className="text-sm font-bold text-[#0B2A5C]">
                                ₹{booking.estimatedPrice}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Rating for completed jobs */}
                        {booking.status === 'completed' && (
                          <div className="pt-4 mt-4 border-t border-[#E2E5EA]">
                            {booking.ratingGiven ? (
                              <div className="bg-[#2E9E4F]/10 border border-[#2E9E4F]/20 p-2.5 text-xs text-[#0F0F0F]">
                                <div className="flex items-center gap-1 text-[#2E9E4F] font-bold">
                                  <Star className="w-3.5 h-3.5 fill-[#2E9E4F]" />
                                  <span>Rating Given: {booking.ratingGiven} / 5 Stars</span>
                                </div>
                                {booking.reviewFeedback && (
                                  <p className="text-[11px] text-[#596780] mt-1 italic">
                                    "{booking.reviewFeedback}"
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="bg-[#F8F9FA] p-3 border border-[#E2E5EA]">
                                <span className="text-xs font-bold text-[#0B2A5C] block mb-1">
                                  Rate this completed service:
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      id={`rate-star-${booking.id}-${star}`}
                                      onClick={() => rateBooking(booking.id, star, 'Verified customer satisfaction.')}
                                      className="p-1 text-gray-300 hover:text-[#F5821F] cursor-pointer"
                                      title={`Rate ${star} Stars`}
                                    >
                                      <Star className="w-5 h-5 hover:fill-[#F5821F]" />
                                    </button>
                                  ))}
                                  <span className="text-[11px] text-[#596780] ml-2">Click star to submit</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Contact Provider Modal */}
      {contactModalBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E5EA] w-full max-w-md p-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E5EA] mb-4">
              <h3 className="text-base font-bold text-[#0B2A5C]">
                Contact Cooperative Professional
              </h3>
              <button
                onClick={() => setContactModalBooking(null)}
                className="text-gray-400 hover:text-black cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#F8F9FA] border border-[#E2E5EA] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0B2A5C] text-white font-bold flex items-center justify-center">
                  {contactModalBooking.provider.name.slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F0F0F]">
                    {contactModalBooking.provider.name}
                  </h4>
                  <p className="text-[11px] text-[#596780]">
                    {contactModalBooking.provider.cooperativeName}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${contactModalBooking.provider.phone}`}
                  className="w-full py-2.5 px-4 bg-[#0B2A5C] hover:bg-[#153a77] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Provider ({contactModalBooking.provider.phone})</span>
                </a>
                <a
                  href="tel:18002667242"
                  className="w-full py-2 px-4 bg-white hover:bg-gray-50 border border-[#E2E5EA] text-[#596780] font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4 text-[#F5821F]" />
                  <span>Contact Cooperative Helpline (1800-266-7242)</span>
                </a>
              </div>

              <p className="text-[11px] text-[#596780] text-center pt-2">
                Calls are masked through the cooperative telecom gateway for privacy.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E2E5EA] text-right">
              <button
                onClick={() => setContactModalBooking(null)}
                className="px-4 py-1.5 text-xs font-bold text-[#596780] hover:text-black border border-[#E2E5EA] bg-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
