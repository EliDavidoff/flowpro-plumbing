import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PedestalProps = {
  mobile?: boolean;
};

export default function Pedestal({ mobile = false }: PedestalProps) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <group position={[0, -1.45, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.35, 1.5, 0.12, mobile ? 32 : 48]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.4}
          roughness={0.65}
          emissive="#0c4a6e"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <ringGeometry args={[1.05, 1.25, mobile ? 32 : 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}
