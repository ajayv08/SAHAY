import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingStatus, Provider, SavedAddress, ServiceCategory, ServiceRequestPayload, User } from '../types';
import { INITIAL_BOOKINGS, INITIAL_PROVIDERS, INITIAL_USER } from '../data/mockData';

interface AppContextType {
  user: User;
  providers: Provider[];
  bookings: Booking[];
  activeBookings: Booking[];
  completedBookings: Booking[];
  createBooking: (payload: ServiceRequestPayload) => Booking;
  advanceBookingStatus: (bookingId: string) => void;
  updateUser: (updatedUser: Partial<User>) => void;
  addAddress: (newAddress: Omit<SavedAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  rateBooking: (bookingId: string, rating: number, feedback?: string) => void;
  resetDemoData: () => void;
  selectedCategoryFilter: ServiceCategory | null;
  setSelectedCategoryFilter: (cat: ServiceCategory | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sahay_prototype_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_USER;
  });

  const [providers] = useState<Provider[]>(INITIAL_PROVIDERS);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_bookings`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_BOOKINGS;
  });

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ServiceCategory | null>(null);

  // Sync to local storage for persistence across reloads during demo
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_bookings`, JSON.stringify(bookings));
  }, [bookings]);

  const activeBookings = bookings.filter((b) => b.status !== 'completed');
  const completedBookings = bookings.filter((b) => b.status === 'completed');

  const createBooking = (payload: ServiceRequestPayload): Booking => {
    const provider = providers.find((p) => p.id === payload.providerId) || providers[0];
    const now = new Date();
    const formattedNow = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}, Today`;

    const newBookingNumber = `SHY-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingNumber: newBookingNumber,
      serviceCategory: provider.category,
      provider,
      status: 'requested',
      requestedAt: `${now.toISOString().split('T')[0]} ${formattedNow}`,
      scheduledDate: payload.scheduledDate || now.toISOString().split('T')[0],
      scheduledTime: payload.scheduledTime || '10:00 AM - 12:00 PM',
      address: payload.address || user.savedAddresses[0]?.streetAddress || 'Registered Household Address',
      notes: payload.notes || 'Standard household service requested under cooperative rate.',
      estimatedPrice: provider.priceHourly,
      statusHistory: [
        {
          status: 'requested',
          timestamp: formattedNow,
          note: 'Request submitted. Cooperative dispatch queue notified.',
        },
      ],
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const advanceBookingStatus = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) => {
        if (booking.id !== bookingId) return booking;

        const nextStatusMap: Record<BookingStatus, BookingStatus | null> = {
          requested: 'assigned',
          assigned: 'in_progress',
          in_progress: 'completed',
          completed: null,
        };

        const nextStatus = nextStatusMap[booking.status];
        if (!nextStatus) return booking;

        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}, Just now`;

        const notesMap: Record<BookingStatus, string> = {
          requested: 'Booking placed.',
          assigned: `Assigned to verified cooperative technician ${booking.provider.name} (${booking.provider.cooperativeName}).`,
          in_progress: `Technician arrived at premises. Service operations initiated.`,
          completed: `Service concluded satisfactorily. Digital receipt archived in cooperative ledger.`,
        };

        const newHistory = [
          ...booking.statusHistory,
          {
            status: nextStatus,
            timestamp: timeString,
            note: notesMap[nextStatus],
          },
        ];

        return {
          ...booking,
          status: nextStatus,
          statusHistory: newHistory,
        };
      })
    );
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const addAddress = (newAddrData: Omit<SavedAddress, 'id'>) => {
    const newAddress: SavedAddress = {
      ...newAddrData,
      id: `addr-${Date.now()}`,
    };
    setUser((prev) => ({
      ...prev,
      savedAddresses: [...prev.savedAddresses, newAddress],
    }));
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => ({
      ...prev,
      savedAddresses: prev.savedAddresses.filter((a) => a.id !== id),
    }));
  };

  const rateBooking = (bookingId: string, rating: number, feedback?: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, ratingGiven: rating, reviewFeedback: feedback } : b))
    );
  };

  const resetDemoData = () => {
    setUser(INITIAL_USER);
    setBookings(INITIAL_BOOKINGS);
    setSelectedCategoryFilter(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_bookings`);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        providers,
        bookings,
        activeBookings,
        completedBookings,
        createBooking,
        advanceBookingStatus,
        updateUser,
        addAddress,
        deleteAddress,
        rateBooking,
        resetDemoData,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
