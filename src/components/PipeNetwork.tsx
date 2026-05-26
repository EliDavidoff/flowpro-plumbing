import { useMemo } from "react";
import * as THREE from "three";
import { pipeMaterial, chromeMaterial } from "../materials/plumbingMaterials";

function Pipe({
  start,
  end,
  radius = 0.15,
  segments = 24,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  radius?: number;
  segments?: number;
}) {
  const { position, rotation, length } = useMemo(() => {
    const dir = new THREE.Vector3().subVectors(end, start);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.normalize()
    );
    const euler = new THREE.Euler().setFromQuaternion(quat);
    return {
      position: mid,
      rotation: [euler.x, euler.y, euler.z] as [number, number, number],
      length: len,
    };
  }, [start, end]);

  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={[radius, radius, length, segments]} />
      <meshStandardMaterial {...pipeMaterial} />
    </mesh>
  );
}

function Elbow({
  position,
  rotation,
  radius = 0.15,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  radius?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <torusGeometry args={[0.32, radius, 16, 32, Math.PI / 2]} />
      <meshStandardMaterial {...pipeMaterial} />
    </mesh>
  );
}

function Flange({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.22, 0.22, 0.05, 20]} />
      <meshStandardMaterial {...chromeMaterial} />
    </mesh>
  );
}

function Valve({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 24]} />
        <meshStandardMaterial {...chromeMaterial} />
      </mesh>
      <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.4, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.38, 0]} castShadow>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function TJunction({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial {...pipeMaterial} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial {...pipeMaterial} />
      </mesh>
    </group>
  );
}

export default function PipeNetwork({ mobile = false }: { mobile?: boolean }) {
  const pipeSegs = mobile ? 18 : 28;
  const segments = useMemo(() => {
    const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    return [
      { start: v(0, -1.35, 0), end: v(0, 0.55, 0) },
      { start: v(0, 0.55, 0), end: v(1.15, 0.55, 0) },
      { start: v(1.15, 0.55, 0), end: v(1.15, 1.15, 0) },
      { start: v(-1.15, -0.25, 0.15), end: v(0, -0.25, 0.15) },
      { start: v(-1.15, -0.25, 0.15), end: v(-1.15, 0.75, 0.15) },
      { start: v(0, 0.55, 0), end: v(0, 0.55, 0.75) },
      { start: v(0, 0.55, 0.75), end: v(-0.85, 0.55, 0.75) },
      { start: v(1.15, 0.55, 0), end: v(1.15, 0.55, -0.55) },
      { start: v(1.15, 0.55, -0.55), end: v(0.5, 0.55, -0.55) },
    ];
  }, []);

  return (
    <group>
      {segments.map((seg, i) => (
        <Pipe key={i} start={seg.start} end={seg.end} segments={pipeSegs} />
      ))}
      <Elbow position={[1.15, 0.9, 0]} rotation={[0, 0, -Math.PI / 2]} />
      <Elbow position={[-1.15, 0.2, 0.15]} rotation={[Math.PI / 2, 0, 0]} />
      <Elbow position={[1.15, 0.55, -0.55]} rotation={[0, Math.PI / 2, 0]} />
      <Flange position={[0, -1.35, 0]} />
      <Flange position={[0, 0.55, 0]} />
      <Flange position={[1.15, 0.55, 0]} />
      <TJunction position={[0, 0.55, 0]} />
      <Valve position={[0.65, 0.55, 0]} />
      <Valve position={[-0.65, 0.55, 0.75]} />
    </group>
  );
}
