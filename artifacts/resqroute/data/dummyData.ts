export interface ServiceLocation {
  id: string;
  name: string;
  phone: string;
  distance: string;
  distanceKm: number;
  eta: string;
  etaMin: number;
  status: 'open' | 'closed';
  address: string;
}

export const hospitals: ServiceLocation[] = [
  { id: 'h1', name: 'Neon Genesis Medical Center', phone: '+1 (555) 240-1001', distance: '2.3 km', distanceKm: 2.3, eta: '5 mins', etaMin: 5, status: 'open', address: '47 Cyber Plaza, Zone A' },
  { id: 'h2', name: 'Apex Cybernetic Hospital', phone: '+1 (555) 240-2002', distance: '4.1 km', distanceKm: 4.1, eta: '10 mins', etaMin: 10, status: 'open', address: '12 Neural Ave, Zone B' },
  { id: 'h3', name: 'City Care Medical Center', phone: '+1 (555) 240-3003', distance: '5.7 km', distanceKm: 5.7, eta: '14 mins', etaMin: 14, status: 'open', address: '88 Grid Street, Zone C' },
  { id: 'h4', name: 'Quantum Emergency Hospital', phone: '+1 (555) 240-4004', distance: '7.2 km', distanceKm: 7.2, eta: '18 mins', etaMin: 18, status: 'closed', address: '33 Photon Blvd, Zone D' },
];

export const policeStations: ServiceLocation[] = [
  { id: 'p1', name: 'CyberNet Police Station Alpha', phone: '+1 (555) 911-1001', distance: '1.8 km', distanceKm: 1.8, eta: '4 mins', etaMin: 4, status: 'open', address: '10 Security Blvd, Zone A' },
  { id: 'p2', name: 'Metro Grid Police HQ', phone: '+1 (555) 911-2002', distance: '3.4 km', distanceKm: 3.4, eta: '8 mins', etaMin: 8, status: 'open', address: '55 Shield Ave, Zone B' },
  { id: 'p3', name: 'North Sector Police Precinct', phone: '+1 (555) 911-3003', distance: '6.1 km', distanceKm: 6.1, eta: '15 mins', etaMin: 15, status: 'closed', address: '22 Order St, Zone C' },
  { id: 'p4', name: 'Delta Force Station', phone: '+1 (555) 911-4004', distance: '8.0 km', distanceKm: 8.0, eta: '20 mins', etaMin: 20, status: 'open', address: '77 Patrol Lane, Zone D' },
];

export const petrolPumps: ServiceLocation[] = [
  { id: 'f1', name: 'NeonFuel Station Prime', phone: '+1 (555) 300-1001', distance: '0.9 km', distanceKm: 0.9, eta: '2 mins', etaMin: 2, status: 'open', address: '5 Fuel Grid, Zone A' },
  { id: 'f2', name: 'CyberGas Express', phone: '+1 (555) 300-2002', distance: '2.6 km', distanceKm: 2.6, eta: '6 mins', etaMin: 6, status: 'open', address: '18 Energy Ave, Zone B' },
  { id: 'f3', name: 'Quantum Petrol Hub', phone: '+1 (555) 300-3003', distance: '4.4 km', distanceKm: 4.4, eta: '11 mins', etaMin: 11, status: 'open', address: '63 Power Blvd, Zone C' },
  { id: 'f4', name: 'MegaFuel Central', phone: '+1 (555) 300-4004', distance: '6.8 km', distanceKm: 6.8, eta: '17 mins', etaMin: 17, status: 'closed', address: '91 Volt St, Zone D' },
];

export const punctureCenters: ServiceLocation[] = [
  { id: 't1', name: 'GridTire Rapid Fix', phone: '+1 (555) 400-1001', distance: '1.2 km', distanceKm: 1.2, eta: '3 mins', etaMin: 3, status: 'open', address: '7 Wheel Lane, Zone A' },
  { id: 't2', name: 'CyberTread Service', phone: '+1 (555) 400-2002', distance: '3.0 km', distanceKm: 3.0, eta: '7 mins', etaMin: 7, status: 'open', address: '29 Rubber Ave, Zone B' },
  { id: 't3', name: 'Apex Auto Tire Center', phone: '+1 (555) 400-3003', distance: '4.9 km', distanceKm: 4.9, eta: '12 mins', etaMin: 12, status: 'open', address: '44 Track Blvd, Zone C' },
  { id: 't4', name: 'NeonPatch Emergency Tires', phone: '+1 (555) 400-4004', distance: '7.5 km', distanceKm: 7.5, eta: '19 mins', etaMin: 19, status: 'closed', address: '60 Patch Rd, Zone D' },
];

export const nearbyCount = {
  hospitals: hospitals.filter(h => h.status === 'open').length,
  police: policeStations.filter(p => p.status === 'open').length,
  petrol: petrolPumps.filter(p => p.status === 'open').length,
  puncture: punctureCenters.filter(p => p.status === 'open').length,
};
