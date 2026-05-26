import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { chromeMaterial, accentMaterial } from "../materials/plumbingMaterials";

type PipeWrenchProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  mobile?: boolean;
};

export default function PipeWrench({
  position = [1.5, 0, 0],
  rotation = [0.5, -0.4, 0.6],
  mobile = false,
}: PipeWrenchProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.set(
      rotation[0],
      rotation[1],
      rotation[2] + Math.sin(state.clock.elapsedTime * 0.35) * 0.04
    );
  });

  const chrome = chromeMaterial;
  const scale = mobile ? 0.85 : 1;

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.045, mobile ? 12 : 20, 32]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.55, 0.08, 0.12]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
      <mesh position={[0.68, 0, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>
      <mesh position={[-0.38, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.5, 0.09, 0.11]} />
        <meshStandardMaterial {...chrome} />
      </mesh>
    </group>
  );
}
