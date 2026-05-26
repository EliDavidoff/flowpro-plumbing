import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useHeroScroll } from "../context/HeroScrollContext";

type SceneBackgroundFadeProps = {
  reducedMotion?: boolean;
};

const BG = new THREE.Color("#0d2847");
const FADE_TO = new THREE.Color("#061018");

export default function SceneBackgroundFade({
  reducedMotion = false,
}: SceneBackgroundFadeProps) {
  const { scene } = useThree();
  const scroll = useHeroScroll();
  const color = useRef(BG.clone());

  useFrame(() => {
    if (!scene.background || !(scene.background instanceof THREE.Color)) return;
    if (reducedMotion) {
      scene.background.copy(BG);
      return;
    }
    const t = THREE.MathUtils.clamp(scroll * 1.1, 0, 1);
    color.current.copy(BG).lerp(FADE_TO, t * 0.85);
    scene.background.copy(color.current);
  });

  return <color attach="background" args={["#0d2847"]} />;
}
