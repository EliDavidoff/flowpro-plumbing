import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useIsMobile } from "../hooks/useMediaQuery";
import PlumbingScene from "./PlumbingScene";
import SceneBackgroundFade from "./SceneBackgroundFade";
import SceneCamera from "./SceneCamera";
import ScrollLighting from "./ScrollLighting";

type HeroCanvasProps = {
  reducedMotion?: boolean;
};

export default function HeroCanvas({ reducedMotion = false }: HeroCanvasProps) {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0.9, isMobile ? 6.5 : 5.8], fov: isMobile ? 54 : 48 }}
      dpr={[1, 2]}
      performance={{ min: isMobile ? 0.55 : 0.5 }}
      shadows={!isMobile}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
      }}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <SceneBackgroundFade reducedMotion={reducedMotion} />
      <ScrollLighting mobile={isMobile} reducedMotion={reducedMotion} />
      {!isMobile && (
        <Environment preset="warehouse" environmentIntensity={0.35} />
      )}
      <SceneCamera />
      <PlumbingScene mobile={isMobile} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
