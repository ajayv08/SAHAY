import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Star,
  Shield,
  Save,
  Clock,
  ArrowRight,
  Building,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SavedAddress } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, addAddress, deleteAddress, completedBookings, rateBooking } = useApp();

  // Local state for profile form
  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user.phone);
  const [email, setEmail] = useState<string>(user.email);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Address modal / form state
  const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<'Home' | 'Work' | 'Parents' | 'Other'>('Home');
  const [newLabel, setNewLabel] = useState<string>('');
  const [newStreet, setNewStreet] = useState<string>('');
  const [newArea, setNewArea] = useState<string>('');
  const [newPincode, setNewPincode] = useState<string>('');

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newArea.trim() || !newPincode.trim()) return;

    addAddress({
      tag: newTag,
      label: newLabel.trim() || `${newTag} Address`,
      streetAddress: newStreet.trim(),
      area: newArea.trim(),
      pincode: newPincode.trim(),
      isDefault: false,
    });

    // Reset form
    setNewLabel('');
    setNewStreet('');
    setNewArea('');
    setNewPincode('');
    setIsAddingAddress(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs text-[#596780] mb-1">
          <span>SAHAY Portal</span> / <span className="text-[#0B2A5C] font-semibold">User Profile & Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2A5C]">
          Household Requester Profile
        </h1>
        <p className="text-xs text-[#596780] mt-0.5">
          Manage your verified contact details, saved service delivery addresses, and completed service history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Info & Cooperative Membership Note */}
        <div className="lg:col-span-1 space-y-6">
          {/* Section 1: Basic Account Info */}
          <div className="bg-white border border-[#E2E5EA] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E5EA] mb-4">
              <h2 className="text-xs font-bold text-[#0B2A5C] uppercase tracking-wider flex items-center gap-1.5">
                <UserIcon className="w-4 h-4 text-[#0B2A5C]" />
                <span>Account Information</span>
              </h2>
              <span className="text-[10px] font-mono bg-blue-50 text-[#0B2A5C] px-2 py-0.5 border border-[#0B2A5C]/20">
                Aadhaar e-KYC Verified
              </span>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#596780] uppercase tracking-wide mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="profile-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full text-xs px-3 py-2 border border-[#E2E5EA] bg-[#F8F9FA] focus:bg-white focus:outline-none focus:border-[#0B2A5C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#596780] uppercase tracking-wide mb-1">
                  Mobile Number (SMS OTP)
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-[#596780] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    id="profile-phone-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full text-xs pl-8 pr-3 py-2 border border-[#E2E5EA] bg-[#F8F9FA] focus:bg-white focus:outline-none focus:border-[#0B2A5C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#596780] uppercase tracking-wide mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#596780] absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    id="profile-email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-xs pl-8 pr-3 py-2 border border-[#E2E5EA] bg-[#F8F9FA] focus:bg-white focus:outline-none focus:border-[#0B2A5C]"
                  />
                </div>
              </div>

              {saveSuccess && (
                <div className="p-2.5 bg-[#2E9E4F]/10 border border-[#2E9E4F]/20 text-[#2E9E4F] text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully in local session.</span>
                </div>
              )}

              <button
                type="submit"
                id="save-profile-btn"
                className="w-full py-2 text-xs font-bold text-white bg-[#0B2A5C] hover:bg-[#153a77] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>

          {/* Institutional Cooperative Impact Card */}
          <div className="bg-[#0B2A5C] text-white p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#F5821F]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Cooperative Patron Benefits
              </h3>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed">
              By hiring through SAHAY, 100% of your service fee reaches cooperative trade workers. You have contributed to <strong>0% middleman exploitation</strong>.
            </p>
            <div className="pt-2 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-gray-300 block">Jobs Booked</span>
                <span className="text-base font-bold text-white">
                  {completedBookings.length + 2} Total
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-300 block">Surplus Retained</span>
                <span className="text-base font-bold text-[#2E9E4F]">₹940 Saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Saved Addresses & Booking History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 2: Saved Addresses List */}
          <div className="bg-white border border-[#E2E5EA] p-5 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E5EA] mb-4">
              <div>
                <h2 className="text-sm font-bold text-[#0B2A5C] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0B2A5C]" />
                  <span>Saved Delivery Addresses</span>
                </h2>
                <p className="text-xs text-[#596780]">
                  Addresses pre-loaded for rapid one-click dispatch verification
                </p>
              </div>

              {!isAddingAddress && (
                <button
                  id="add-new-address-btn"
                  onClick={() => setIsAddingAddress(true)}
                  className="px-3 py-1.5 text-xs font-bold text-[#0B2A5C] hover:text-white bg-[#F0F2F5] hover:bg-[#0B2A5C] border border-[#E2E5EA] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Address</span>
                </button>
              )}
            </div>

            {/* Inline Add Address Form */}
            {isAddingAddress && (
              <form
                onSubmit={handleAddAddressSubmit}
                className="mb-5 p-4 bg-[#F8F9FA] border border-[#0B2A5C] space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E5EA]">
                  <span className="text-xs font-bold text-[#0B2A5C] uppercase">
                    Add New Service Address
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="text-xs text-[#596780] hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#596780] mb-1">
                      Tag Type
                    </label>
                    <select
                      id="new-address-tag-select"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value as any)}
                      className="w-full text-xs p-2 bg-white border border-[#E2E5EA]"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Parents">Parents' Residence</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#596780] mb-1">
                      Label / Description
                    </label>
                    <input
                      type="text"
                      id="new-address-label-input"
                      placeholder="e.g., Downtown Flat / Shop"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full text-xs p-2 bg-white border border-[#E2E5EA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#596780] mb-1">
                    Building, Street & House No.
                  </label>
                  <input
                    type="text"
                    id="new-address-street-input"
                    placeholder="e.g., Flat 204, Surya Towers, Main Road"
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    required
                    className="w-full text-xs p-2 bg-white border border-[#E2E5EA]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#596780] mb-1">
                      Area, Locality & City
                    </label>
                    <input
                      type="text"
                      id="new-address-area-input"
                      placeholder="e.g., Vasant Kunj, New Delhi"
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-white border border-[#E2E5EA]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#596780] mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="new-address-pincode-input"
                      placeholder="e.g., 110070"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      required
                      className="w-full text-xs p-2 bg-white border border-[#E2E5EA]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(false)}
                    className="px-3 py-1.5 text-xs text-[#596780] border border-[#E2E5EA] bg-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    id="save-new-address-submit-btn"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-[#0B2A5C] hover:bg-[#153a77] cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* List of Saved Addresses */}
            <div className="space-y-3">
              {user.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  id={`saved-address-item-${addr.id}`}
                  className="p-3.5 border border-[#E2E5EA] bg-white flex items-start justify-between gap-4 hover:border-gray-400 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#F0F2F5] text-[#0B2A5C] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      <Building className="w-4 h-4 text-[#0B2A5C]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#0B2A5C]">{addr.tag}</span>
                        {addr.label && (
                          <span className="text-[11px] text-[#596780]">({addr.label})</span>
                        )}
                        {addr.isDefault && (
                          <span className="text-[10px] bg-[#2E9E4F]/10 text-[#2E9E4F] font-semibold px-1.5 py-0.2 border border-[#2E9E4F]/20">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#0F0F0F] mt-1">
                        {addr.streetAddress}, {addr.area} - {addr.pincode}
                      </p>
                    </div>
                  </div>

                  {user.savedAddresses.length > 1 && (
                    <button
                      id={`delete-address-btn-${addr.id}`}
                      onClick={() => deleteAddress(addr.id)}
                      title="Remove address"
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Booking History (Past Completed Bookings) */}
          <div className="bg-white border border-[#E2E5EA] p-5 sm:p-6">
            <div className="pb-3 border-b border-[#E2E5EA] mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0B2A5C] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0B2A5C]" />
                  <span>Completed Service History</span>
                </h2>
                <p className="text-xs text-[#596780]">
                  Archived records of successfully fulfilled household service requests
                </p>
              </div>
              <span className="text-xs font-bold text-[#0B2A5C]">
                {completedBookings.length} Completed
              </span>
            </div>

            {completedBookings.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#596780]">
                <p>No completed jobs archived in your history yet.</p>
                <Link
                  to="/services"
                  className="mt-2 inline-flex items-center gap-1 text-[#F5821F] font-bold hover:underline"
                >
                  <span>Book a service to get started &rarr;</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {completedBookings.map((b) => (
                  <div
                    key={b.id}
                    id={`history-item-${b.id}`}
                    className="p-4 border border-[#E2E5EA] bg-[#F8F9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0B2A5C]">
                          {b.serviceCategory} Service
                        </span>
                        <span className="text-[10px] font-mono text-[#596780]">
                          ({b.bookingNumber})
                        </span>
                      </div>
                      <p className="text-xs text-[#0F0F0F] mt-0.5">
                        Fulfilled by: <strong>{b.provider.name}</strong> ({b.provider.cooperativeName})
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-[#596780] mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {b.scheduledDate}
                        </span>
                        <span>•</span>
                        <span>Amount Cleared: ₹{b.estimatedPrice}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E2E5EA]">
                      {b.ratingGiven ? (
                        <div className="flex items-center gap-1 text-xs text-[#2E9E4F] font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#2E9E4F]" />
                          <span>Rated {b.ratingGiven} / 5</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-[11px] text-[#596780]">Rate:</span>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              onClick={() => rateBooking(b.id, s, 'Verified completion')}
                              className="text-gray-400 hover:text-[#F5821F] p-0.5 cursor-pointer"
                              title={`Rate ${s} Stars`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      )}
                      <Link
                        to={`/bookings?highlight=${b.id}`}
                        className="text-[11px] text-[#0B2A5C] hover:text-[#F5821F] font-semibold mt-1 inline-block"
                      >
                        View Full Details &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
