export type BusinessProfile = {
  name: string;
  shortName: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  phone: string;
  hours: string;
  hoursDetail: string;
  status: "Open" | "Closed";
  mapsUrl: string;
  serviceArea: string;
  website?: string;
};

export type BusinessReview = {
  name: string;
  text: string;
  stars: number;
};

export type BusinessPhoto = {
  src: string;
  alt: string;
};

export const businessProfile: BusinessProfile = {
  name: "True Line Plumbing Services",
  shortName: "True Line",
  category: "Plumber",
  rating: 4.8,
  reviewCount: 38,
  address: "2204 W Clarendon Dr",
  city: "Dallas, TX 75208",
  phone: "+19452628339",
  hours: "Open · Closes 5 PM",
  hoursDetail: "Mon–Sat 8:00 AM – 5:00 PM",
  status: "Open",
  mapsUrl:
    "https://www.google.com/maps/place/True+Line+Plumbing+Services/@32.7344561,-96.8545919,17z/data=!3m1!4b1!4m6!3m5!1s0x864e9a3fdaefa67f:0x8b6c5c67020a4afd!8m2!3d32.7344561!4d-96.8545919!16s%2Fg%2F1wb8v2xw",
  serviceArea: "Dallas & the greater metro",
};

export const businessPhotos: BusinessPhoto[] = [
  {
    src: "/images/business/featured.jpg",
    alt: "True Line Plumbing Services — Google Business photo",
  },
  {
    src: "/images/business/work-1.jpg",
    alt: "True Line Plumbing Services — pipe and fixture repair",
  },
];

export const businessReviews: BusinessReview[] = [
  {
    name: "Mckinley Elam",
    text: "I had a great experience with this plumber. He fixed several plumbing problems in one visit, including blocked drains, leaking taps, and replacing damaged pipes. He was very professional, arrived on time, and completed the work quickly and efficiently. What I appreciated most was how clearly he explained everything.",
    stars: 5,
  },
  {
    name: "Quinton Ronin",
    text: "The shower repair was necessary because of a leak dripping into the kitchen ceiling below. They located the failed gasket during the evaluation and fixed it without having to tear out any tile. It was a huge relief and the service was worth every penny for the peace of mind.",
    stars: 5,
  },
  {
    name: "Janessa Jazmyn",
    text: "I called for a shower repair because the handle was getting very difficult to turn. The technician diagnosed a worn out cartridge and had the replacement part ready in his truck. It was a quick transaction and the shower works like new again without any struggle.",
    stars: 5,
  },
];

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}
