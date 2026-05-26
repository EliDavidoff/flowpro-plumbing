/**
 * Paste your Google Business Profile details here when you send the card.
 * Replace placeholder values with your real listing info.
 */
export type BusinessProfile = {
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone: string;
  website: string;
  hours: string;
  status: "Open" | "Closed";
  mapsUrl: string;
  photoUrl?: string;
};

export const businessProfile: BusinessProfile = {
  name: "FlowPro Plumbing",
  category: "Plumber",
  rating: 4.9,
  reviewCount: 128,
  address: "123 Main Street",
  city: "Your City, ST 12345",
  phone: "+15551234567",
  website: "https://flowpro.example.com",
  hours: "Open 24 hours",
  status: "Open",
  mapsUrl: "https://maps.google.com",
};
