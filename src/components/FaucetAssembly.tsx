import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type FaucetProps = {
  position?: [number, number, number];
};

export default function FaucetAssembly({ position = [0, 0, 0] }: FaucetProps) {
  const spout = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!spout.current) return;
    spout.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
  });

  const chrome = { metalness: 0.92, roughness: 0.18, color: "#e2e8f0" };

  return (
    <group position={position}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.2, 32]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <group ref={spout} position={[0, 0.35, 0.05]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.25, 0.15]}>
          <cylinderGeometry args={[0.05, 0.055, 0.55, 24]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0, 0.02, 0.42]} rotation={[0.35, 0, 0]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshStandardMaterial color="#22d3ee" metalness={0.7} roughness={0.2} />
        </mesh>
      </group>
      <mesh position={[0.28, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[0.12, 0.025, 12, 24, Math.PI]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[-0.28, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.12, 0.025, 12, 24, Math.PI]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
    </group>
  );
}
