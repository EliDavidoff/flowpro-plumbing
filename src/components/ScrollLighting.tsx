import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHeroScroll } from "../context/HeroScrollContext";

type ScrollLightingProps = {
  mobile?: boolean;
  reducedMotion?: boolean;
};

export default function ScrollLighting({
  mobile = false,
  reducedMotion = false,
}: ScrollLightingProps) {
  const scroll = useHeroScroll();
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const dirMainRef = useRef<THREE.DirectionalLight>(null);
  const dirFillRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const pointRef = useRef<THREE.PointLight>(null);
  const accentRef = useRef<THREE.PointLight>(null);

  const base = {
    ambient: mobile ? 1.15 : 1,
    hemi: mobile ? 1.15 : 1.25,
    dirMain: mobile ? 1.8 : 2.2,
    dirFill: mobile ? 0.55 : 0.75,
    rim: mobile ? 0.6 : 1.1,
    point: mobile ? 1.6 : 2.2,
    accent: mobile ? 0.8 : 1.4,
  };

  useFrame(() => {
    const scrollMul = mobile ? 0.55 : 1;
    const fade = reducedMotion
      ? 1
      : THREE.MathUtils.lerp(1, 0.2, THREE.MathUtils.clamp(scroll * scrollMul * 1.1, 0, 1));

    if (ambientRef.current) ambientRef.current.intensity = base.ambient * fade;
    if (hemiRef.current) hemiRef.current.intensity = base.hemi * fade;
    if (dirMainRef.current) dirMainRef.current.intensity = base.dirMain * fade;
    if (dirFillRef.current) dirFillRef.current.intensity = base.dirFill * fade;
    if (rimRef.current) rimRef.current.intensity = base.rim * fade;
    if (pointRef.current) pointRef.current.intensity = base.point * fade;
    if (accentRef.current) accentRef.current.intensity = base.accent * fade;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={base.ambient} />
      <hemisphereLight
        ref={hemiRef}
        args={["#a5f3fc", "#0f172a", base.hemi]}
        position={[0, 10, 0]}
      />
      <directionalLight
        ref={dirMainRef}
        position={[5, 8, 5]}
        intensity={base.dirMain}
        color="#ffffff"
        castShadow={!mobile}
        shadow-mapSize={mobile ? 512 : 1024}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight
        ref={dirFillRef}
        position={[-4, 3, 2]}
        intensity={base.dirFill}
        color="#67e8f9"
      />
      <directionalLight
        ref={rimRef}
        position={[-2, 4, -6]}
        intensity={base.rim}
        color="#22d3ee"
      />
      <pointLight
        ref={pointRef}
        position={[2.5, 2, 3]}
        intensity={base.point}
        color="#67e8f9"
        distance={14}
      />
      <pointLight
        ref={accentRef}
        position={[0, 1.5, 2]}
        intensity={base.accent}
        color="#22d3ee"
        distance={8}
      />
    </>
  );
}
