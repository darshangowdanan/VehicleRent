export interface Vehicle {
    id: string;
    name: string;
    type: '2-wheel' | '4-wheel';
    price: number;
    location: string;
    image: string;
    available: boolean;
    description: string;
  }
  
  export interface FilterState {
    type: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    location: string | null;
    showAvailableOnly: boolean;
  }