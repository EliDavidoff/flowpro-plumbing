export type SiteSection = {
  id: string;
  label: string;
};

export const siteSections: SiteSection[] = [
  { id: "hero", label: "Meet" },
  { id: "services", label: "Services" },
  { id: "about", label: "Trust" },
  { id: "reviews", label: "Proof" },
  { id: "contact", label: "Contact" },
];
