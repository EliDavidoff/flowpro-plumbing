import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { waterStreamMaterial } from "../materials/plumbingMaterials";

type WaterStreamProps = {
  origin: [number, number, number];
  mobile?: boolean;
};

export default function WaterStream({
  origin,
  mobile = false,
}: WaterStreamProps) {
  const stream = useRef<THREE.Mesh>(null);
  const mat = useRef(waterStreamMaterial.clone());

  useFrame((state) => {
    if (!stream.current) return;
    const t = state.clock.elapsedTime;
    mat.current.opacity = 0.65 + Math.sin(t * 4) * 0.12;
    stream.current.scale.y = 1 + Math.sin(t * 3) * 0.06;
  });

  return (
    <group position={origin}>
      <mesh ref={stream} position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.035, 0.055, 0.7, mobile ? 12 : 16]} />
        <primitive object={mat.current} attach="material" />
      </mesh>
      <mesh position={[0, -0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, mobile ? 20 : 24]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}
