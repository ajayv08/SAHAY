import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Clock, MapPin, FileText, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Provider } from '../types';
import { useApp } from '../context/AppContext';

interface RequestModalProps {
  provider: Provider | null;
  onClose: () => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({ provider, onClose }) => {
  const navigate = useNavigate();
  const { user, createBooking } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const [date, setDate] = useState<string>(todayStr);
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    user.savedAddresses[0]?.id || 'custom'
  );
  const [customAddress, setCustomAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!provider) return null;

  const currentAddressText =
    selectedAddressId === 'custom'
      ? customAddress
      : user.savedAddresses.find((a) => a.id === selectedAddressId)
      ? `${user.savedAddresses.find((a) => a.id === selectedAddressId)!.streetAddress}, ${
          user.savedAddresses.find((a) => a.id === selectedAddressId)!.area
        } - ${user.savedAddresses.find((a) => a.id === selectedAddressId)!.pincode}`
      : 'Registered Address';

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddressId === 'custom' && !customAddress.trim()) {
      setErrorMsg('Please enter your service address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const created = createBooking({
        providerId: provider.id,
        scheduledDate: date,
        scheduledTime: timeSlot,
        address: currentAddressText,
        notes: notes.trim(),
      });

      // Close modal and navigate directly to My Bookings with the new booking expanded
      onClose();
      navigate(`/bookings?highlight=${created.id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to create booking. Please retry.');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="request-service-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4 backdrop-blur-none"
    >
      <div className="bg-white rounded-none border border-[#E2E5EA] w-full max-w-xl shadow-xl overflow-hidden animate-in fade-in duration-150">
        {/* Modal Header */}
        <div className="bg-[#0B2A5C] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-300 font-semibold">
              Cooperative Service Request
            </span>
            <h2 className="text-lg font-bold">Request {provider.category} Service</h2>
          </div>
          <button
            id="close-request-modal-btn"
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Provider Brief Summary Card */}
        <div className="bg-[#F8F9FA] px-6 py-3 border-b border-[#E2E5EA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0B2A5C] text-white font-bold flex items-center justify-center text-sm">
              {provider.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0F0F0F]">{provider.name}</span>
                <span className="text-[11px] bg-[#2E9E4F]/10 text-[#2E9E4F] font-semibold px-1.5 py-0.5 rounded border border-[#2E9E4F]/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-[#596780]">{provider.cooperativeName}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-[#0B2A5C]">{provider.priceRange}</span>
            <p className="text-[10px] text-[#596780]">Govt. Regulated Tariff</p>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleConfirm} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0B2A5C] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0B2A5C]" />
                Select Date
              </label>
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  id="date-btn-today"
                  onClick={() => setDate(todayStr)}
                  className={`text-xs px-2.5 py-1 font-medium border rounded-none cursor-pointer ${
                    date === todayStr
                      ? 'bg-[#0B2A5C] text-white border-[#0B2A5C]'
                      : 'bg-white text-[#0F0F0F] border-[#E2E5EA] hover:bg-gray-50'
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  id="date-btn-tomorrow"
                  onClick={() => setDate(tomorrowStr)}
                  className={`text-xs px-2.5 py-1 font-medium border rounded-none cursor-pointer ${
                    date === tomorrowStr
                      ? 'bg-[#0B2A5C] text-white border-[#0B2A5C]'
                      : 'bg-white text-[#0F0F0F] border-[#E2E5EA] hover:bg-gray-50'
                  }`}
                >
                  Tomorrow
                </button>
              </div>
              <input
                type="date"
                id="booking-date-input"
                value={date}
                min={todayStr}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full text-xs px-3 py-2 border border-[#E2E5EA] rounded-none focus:outline-none focus:border-[#0B2A5C] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B2A5C] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0B2A5C]" />
                Preferred Time Slot
              </label>
              <select
                id="booking-time-select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-[#E2E5EA] rounded-none focus:outline-none focus:border-[#0B2A5C] bg-white h-[38px] mt-7"
              >
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM (Morning)</option>
                <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM (Noon)</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon)</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Late Afternoon)</option>
                <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM (Evening)</option>
              </select>
            </div>
          </div>

          {/* Address Selection */}
          <div>
            <label className="block text-xs font-bold text-[#0B2A5C] uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0B2A5C]" />
              Service Address
            </label>
            <div className="space-y-2 mb-2">
              {user.savedAddresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`flex items-start gap-2.5 p-2.5 border cursor-pointer text-xs transition-colors ${
                    selectedAddressId === addr.id
                      ? 'border-[#0B2A5C] bg-[#F0F2F5]'
                      : 'border-[#E2E5EA] bg-white hover:bg-[#F8F9FA]'
                  }`}
                >
                  <input
                    type="radio"
                    name="selectedAddress"
                    id={`address-radio-${addr.id}`}
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-0.5 accent-[#0B2A5C]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0B2A5C]">{addr.tag}</span>
                      <span className="text-[11px] text-[#596780]">({addr.label})</span>
                    </div>
                    <p className="text-[#0F0F0F] mt-0.5">
                      {addr.streetAddress}, {addr.area} - {addr.pincode}
                    </p>
                  </div>
                </label>
              ))}

              <label
                className={`flex items-start gap-2.5 p-2.5 border cursor-pointer text-xs ${
                  selectedAddressId === 'custom'
                    ? 'border-[#0B2A5C] bg-[#F0F2F5]'
                    : 'border-[#E2E5EA] bg-white hover:bg-[#F8F9FA]'
                }`}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  id="address-radio-custom"
                  value="custom"
                  checked={selectedAddressId === 'custom'}
                  onChange={() => setSelectedAddressId('custom')}
                  className="mt-0.5 accent-[#0B2A5C]"
                />
                <span className="font-bold text-[#0B2A5C]">Different / New Address</span>
              </label>
            </div>

            {selectedAddressId === 'custom' && (
              <textarea
                id="custom-address-input"
                rows={2}
                placeholder="Enter complete building, street, landmark, area and pincode..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#E2E5EA] rounded-none focus:outline-none focus:border-[#0B2A5C] bg-white"
              />
            )}
          </div>

          {/* Notes / Special Instructions */}
          <div>
            <label className="block text-xs font-bold text-[#0B2A5C] uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#0B2A5C]" />
              Work Description / Notes (Optional)
            </label>
            <textarea
              id="booking-notes-input"
              rows={2}
              placeholder="e.g., Kitchen sink valve leaking; spare washer may be required. Main gate intercom code is 402."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 border border-[#E2E5EA] rounded-none focus:outline-none focus:border-[#0B2A5C] bg-white"
            />
          </div>

          {/* Institutional Trust Notice */}
          <div className="bg-[#2E9E4F]/10 border border-[#2E9E4F]/20 p-3 flex items-start gap-2 text-xs text-[#0F0F0F]">
            <CheckCircle2 className="w-4 h-4 text-[#2E9E4F] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#2E9E4F]">Zero Platform Commissions Guarantee</p>
              <p className="text-[#596780] text-[11px] leading-relaxed">
                Your payment goes 100% to the verified cooperative union member account. Standardized base rate estimated at ₹{provider.priceHourly} / hr. No surge fees.
              </p>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E5EA]">
            <button
              type="button"
              id="cancel-request-btn"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs font-semibold text-[#596780] hover:text-[#0F0F0F] border border-[#E2E5EA] bg-white hover:bg-gray-50 rounded-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-booking-submit-btn"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#F5821F] hover:bg-[#e07519] rounded-none cursor-pointer transition-colors shadow-none flex items-center gap-1.5"
            >
              {isSubmitting ? 'Submitting Request...' : 'Confirm Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
