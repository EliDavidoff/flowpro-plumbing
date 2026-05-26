import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type GlowOrbProps = {
  position: [number, number, number];
  mobile?: boolean;
};

export default function GlowOrb({
  position,
  mobile = false,
}: GlowOrbProps) {
  const orb = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.2) * 0.08;
    if (orb.current) orb.current.scale.setScalar(pulse);
    if (outer.current) outer.current.scale.setScalar(pulse * 1.15);
  });

  const segs = mobile ? 16 : 24;

  return (
    <group position={position}>
      <mesh ref={outer}>
        <sphereGeometry args={[0.28, segs, segs]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.25}
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh ref={orb}>
        <sphereGeometry args={[0.2, segs, segs]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.75}
          metalness={0.35}
          roughness={0.1}
          transparent
          opacity={0.92}
        />
      </mesh>
    </group>
  );
}
