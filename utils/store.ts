import { create } from "zustand";
import { Vehicle, FilterState } from "./types";

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Royal Enfield Classic 350",
    type: "2-wheel",
    price: 1200,
    location: "Delhi",
    image: "https://tse2.mm.bing.net/th?id=OIP.vFRidzE5GfMwZSOsfetrzgAAAA&pid=Api&P=0&h=180",
    available: true,
    description: "Iconic cruiser bike, perfect for long rides and city commutes.",
  },
  {
    id: "2",
    name: "Maruti Suzuki Swift",
    type: "4-wheel",
    price: 2500,
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a3?auto=format&fit=crop&q=80",
    available: true,
    description: "Popular hatchback with great mileage and comfort.",
  },
  {
    id: "3",
    name: "Honda Activa 6G",
    type: "2-wheel",
    price: 600,
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1626497764742-8d1cb39b4d3b?auto=format&fit=crop&q=80",
    available: false,
    description: "Reliable scooter, ideal for city commuting.",
  },
  {
    id: "4",
    name: "Tata Nexon EV",
    type: "4-wheel",
    price: 3500,
    location: "Noida",
    image: "https://images.unsplash.com/photo-1619410283996-e044b0b1431b?auto=format&fit=crop&q=80",
    available: true,
    description: "Premium electric SUV with advanced features.",
  },
  {
    id: "5",
    name: "Bajaj Pulsar 220F",
    type: "2-wheel",
    price: 1000,
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1619410283996-e044b0b1431b?auto=format&fit=crop&q=80",
    available: false,
    description: "Sporty and powerful motorcycle for thrill seekers.",
  },
  {
    id: "6",
    name: "Hyundai Creta",
    type: "4-wheel",
    price: 4000,
    location: "Kolkata",
    image: "https://images.unsplash.com/photo-1578561455211-90d636170f9e?auto=format&fit=crop&q=80",
    available: true,
    description: "Compact SUV with premium features and comfort.",
  },
];

interface StoreState {
  vehicles: Vehicle[];
  filters: FilterState;
  isMobileFiltersOpen: boolean;
  filteredVehicles: Vehicle[];
  setFilters: (filters: Partial<FilterState>) => void;
  setMobileFiltersOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  vehicles: mockVehicles,
  filters: {
    type: null,
    minPrice: null,
    maxPrice: null,
    location: null,
    showAvailableOnly: false,
  },
  isMobileFiltersOpen: false,
  
  // ✅ Compute filtered vehicles reactively
  filteredVehicles: mockVehicles,

  setFilters: (newFilters) => {
    set((state) => {
      const updatedFilters = { ...state.filters, ...newFilters };
      return {
        filters: updatedFilters,
        filteredVehicles: state.vehicles.filter((vehicle) => {
          if (updatedFilters.type && vehicle.type !== updatedFilters.type) return false;
          if (updatedFilters.minPrice && vehicle.price < updatedFilters.minPrice) return false;
          if (updatedFilters.maxPrice && vehicle.price > updatedFilters.maxPrice) return false;
          if (updatedFilters.location && vehicle.location !== updatedFilters.location) return false;
          if (updatedFilters.showAvailableOnly && !vehicle.available) return false;
          return true;
        }),
      };
    });
  },

  setMobileFiltersOpen: (isOpen) => {
    set({ isMobileFiltersOpen: isOpen });
  },
}));
