import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  accentMaterial,
  chromeMaterial,
  darkMetalMaterial,
} from "../materials/plumbingMaterials";

type FaucetProps = {
  position?: [number, number, number];
  mobile?: boolean;
};

export default function FaucetAssembly({
  position = [0, 0, 0],
  mobile = false,
}: FaucetProps) {
  const spout = useRef<THREE.Group>(null);
  const chrome = chromeMaterial;
  const segs = mobile ? 24 : 32;

  useFrame((state) => {
    if (!spout.current) return;
    spout.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.025;
  });

  return (
    <group position={position}>
      <mesh position={[0, -0.22, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.32, 0.1, segs]} />
        <meshStandardMaterial {...darkMetalMaterial} />
      </mesh>
      <mesh position={[0, -0.12, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.28, segs]} />
        <meshStandardMaterial {...chrome} />
      </mesh>

      <group ref={spout} position={[0, 0.38, 0.04]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0.08]} castShadow>
          <cylinderGeometry args={[0.045, 0.05, 0.22, segs]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh rotation={[0.55, 0, 0]} position={[0, 0.32, 0.2]} castShadow>
          <cylinderGeometry args={[0.04, 0.045, 0.42, segs]} />
          <meshStandardMaterial {...chrome} />
        </mesh>
        <mesh position={[0, 0.08, 0.48]} rotation={[0.4, 0, 0]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial {...accentMaterial} />
        </mesh>
        <mesh position={[0, -0.02, 0.52]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.03, 0.06, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {(["left", "right"] as const).map((side) => (
        <group
          key={side}
          position={[side === "left" ? -0.26 : 0.26, 0.08, 0]}
          rotation={[0, 0, side === "left" ? Math.PI / 4 : -Math.PI / 4]}
        >
          <mesh castShadow>
            <torusGeometry args={[0.1, 0.022, 12, 24, Math.PI * 1.1]} />
            <meshStandardMaterial {...chrome} />
          </mesh>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.04, 0.08, 12]} />
            <meshStandardMaterial {...accentMaterial} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
