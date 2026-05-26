import { createContext, useContext } from "react";

export const HeroScrollContext = createContext(0);

export function useHeroScroll() {
  return useContext(HeroScrollContext);
}
