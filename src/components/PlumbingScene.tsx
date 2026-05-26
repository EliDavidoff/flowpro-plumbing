import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHeroScroll } from "../context/HeroScrollContext";
import PipeNetwork from "./PipeNetwork";
import WaterDroplets from "./WaterDroplets";
import FaucetAssembly from "./FaucetAssembly";

type PlumbingSceneProps = {
  mobile?: boolean;
};

export default function PlumbingScene({ mobile = false }: PlumbingSceneProps) {
  const group = useRef<THREE.Group>(null);
  const scroll = useHeroScroll();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const drift = Math.sin(t * 0.2) * (mobile ? 0.08 : 0.12);
    const scrollMul = mobile ? 0.5 : 1;
    group.current.rotation.y = drift + 0.3 + scroll * 0.85 * scrollMul;
    group.current.rotation.x = scroll * 0.12 * scrollMul;
    group.current.position.y = 0.1 - scroll * 0.6 * scrollMul;
    group.current.position.x = scroll * 0.2 * scrollMul;
    const baseScale = mobile ? 1.35 : 1.65;
    group.current.scale.setScalar(baseScale - scroll * 0.2 * scrollMul);
  });

  return (
    <group ref={group} position={[0, mobile ? 0.2 : 0.1, 0]}>
      {!mobile && (
        <mesh position={[0, -0.5, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.45, 32]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
      <PipeNetwork mobile={mobile} />
      <FaucetAssembly position={[0, 1.8, 0.3]} />
      <WaterDroplets
        origin={[0, 1.55, 0.35]}
        count={mobile ? 12 : 28}
      />
      {!mobile && (
        <>
          <mesh position={[-1.8, -1.2, 0.5]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[0.5, 0.12, 0.35]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[1.6, 0.2, -0.2]} rotation={[0.8, -0.3, 0.5]}>
            <torusGeometry args={[0.35, 0.07, 16, 32, Math.PI * 1.2]} />
            <meshStandardMaterial
              color="#e2e8f0"
              metalness={0.92}
              roughness={0.15}
              emissive="#0891b2"
              emissiveIntensity={0.35}
            />
          </mesh>
        </>
      )}
      <mesh position={[-0.5, 0.8, -0.6]}>
        <sphereGeometry args={[0.22, mobile ? 16 : 24, mobile ? 16 : 24]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
