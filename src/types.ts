export type ServiceCategory =
  | 'Plumbing'
  | 'Electrical'
  | 'Cleaning'
  | 'Tutoring'
  | 'Elder Care'
  | 'Repairs';

export interface Provider {
  id: string;
  name: string;
  category: ServiceCategory;
  cooperativeName: string;
  cooperativeRegNo: string;
  rating: number;
  reviewCount: number;
  priceHourly: number;
  priceRange: string;
  distanceKm: number;
  availability: 'Available Today' | 'Available Tomorrow' | 'Weekend Only';
  bio: string;
  experienceYears: number;
  phone: string;
  verifiedBadges: string[];
}

export type BookingStatus = 'requested' | 'assigned' | 'in_progress' | 'completed';

export interface StatusHistoryItem {
  status: BookingStatus;
  timestamp: string;
  note: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  serviceCategory: ServiceCategory;
  provider: Provider;
  status: BookingStatus;
  requestedAt: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  notes?: string;
  estimatedPrice: number;
  statusHistory: StatusHistoryItem[];
  ratingGiven?: number;
  reviewFeedback?: string;
}

export interface SavedAddress {
  id: string;
  tag: 'Home' | 'Work' | 'Parents' | 'Other';
  label: string;
  streetAddress: string;
  area: string;
  pincode: string;
  isDefault?: boolean;
}

export interface User {
  name: string;
  phone: string;
  email: string;
  savedAddresses: SavedAddress[];
}

export interface ServiceRequestPayload {
  providerId: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  notes: string;
}
