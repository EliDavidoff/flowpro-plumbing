import { Canvas } from "@react-three/fiber";
import { useIsMobile } from "../hooks/useMediaQuery";
import PlumbingScene from "./PlumbingScene";
import SceneCamera from "./SceneCamera";

export default function HeroCanvas() {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0.8, isMobile ? 6.2 : 5.5], fov: isMobile ? 56 : 52 }}
      dpr={isMobile ? 1 : [1, 2]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: isMobile ? "low-power" : "high-performance",
      }}
      style={{ background: "transparent", touchAction: "pan-y" }}
    >
      <color attach="background" args={["#0d2847"]} />
      <ambientLight intensity={isMobile ? 1.2 : 1.1} />
      <hemisphereLight args={["#a5f3fc", "#0f172a", 1.2]} />
      <directionalLight position={[5, 6, 4]} intensity={2} color="#ffffff" />
      {!isMobile && (
        <directionalLight position={[-2, 4, 6]} intensity={0.8} color="#67e8f9" />
      )}
      <pointLight position={[2.5, 1.5, 3]} intensity={2} color="#22d3ee" distance={12} />
      <SceneCamera />
      <PlumbingScene mobile={isMobile} />
    </Canvas>
  );
}
