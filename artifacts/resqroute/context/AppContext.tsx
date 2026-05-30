import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Role = 'user' | 'driver';
export type ServiceType = 'hospital' | 'police' | 'petrol' | 'puncture';

export interface HistoryEntry {
  id: string;
  hospitalName: string;
  distance: string;
  completedAt: string;
  duration: string;
}

interface AppContextValue {
  role: Role;
  setRole: (r: Role) => void;
  selectedService: ServiceType | null;
  setSelectedService: (s: ServiceType | null) => void;
  driverLoggedIn: boolean;
  setDriverLoggedIn: (v: boolean) => void;
  driverName: string;
  setDriverName: (n: string) => void;
  ambulanceNumber: string;
  setAmbulanceNumber: (n: string) => void;
  isAvailable: boolean;
  setIsAvailable: (v: boolean) => void;
  completedPatients: number;
  addCompletedPatient: (entry: HistoryEntry) => void;
  history: HistoryEntry[];
}

const AppContext = createContext<AppContextValue>({} as AppContextValue);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('user');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [driverLoggedIn, setDriverLoggedIn] = useState(false);
  const [driverName, setDriverName] = useState('Alex Rivera');
  const [ambulanceNumber, setAmbulanceNumber] = useState('AMB-4821');
  const [isAvailable, setIsAvailable] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [completedPatients, setCompletedPatients] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('resq_history');
        const storedCount = await AsyncStorage.getItem('resq_count');
        if (stored) setHistory(JSON.parse(stored));
        if (storedCount) setCompletedPatients(Number(storedCount));
      } catch {}
    })();
  }, []);

  const addCompletedPatient = (entry: HistoryEntry) => {
    const newHistory = [entry, ...history];
    const newCount = completedPatients + 1;
    setHistory(newHistory);
    setCompletedPatients(newCount);
    AsyncStorage.setItem('resq_history', JSON.stringify(newHistory)).catch(() => {});
    AsyncStorage.setItem('resq_count', String(newCount)).catch(() => {});
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      selectedService, setSelectedService,
      driverLoggedIn, setDriverLoggedIn,
      driverName, setDriverName,
      ambulanceNumber, setAmbulanceNumber,
      isAvailable, setIsAvailable,
      completedPatients, addCompletedPatient,
      history,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
