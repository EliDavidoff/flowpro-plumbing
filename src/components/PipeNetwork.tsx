import { useMemo } from "react";
import * as THREE from "three";

const PIPE_COLOR = "#f8fafc";
const PIPE_METAL = {
  metalness: 0.75,
  roughness: 0.15,
  emissive: "#38bdf8",
  emissiveIntensity: 0.45,
};

function Pipe({
  start,
  end,
  radius = 0.14,
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
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, length, segments]} />
      <meshStandardMaterial color={PIPE_COLOR} {...PIPE_METAL} />
    </mesh>
  );
}

function Elbow({
  position,
  rotation,
  radius = 0.14,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  radius?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <torusGeometry args={[0.35, radius, 16, 32, Math.PI / 2]} />
      <meshStandardMaterial color={PIPE_COLOR} {...PIPE_METAL} />
    </mesh>
  );
}

function Valve({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 24]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.35, 12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function PipeNetwork({ mobile = false }: { mobile?: boolean }) {
  const pipeSegs = mobile ? 12 : 24;
  const segments = useMemo(() => {
    const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    return [
      { start: v(0, -1.5, 0), end: v(0, 0.5, 0) },
      { start: v(0, 0.5, 0), end: v(1.2, 0.5, 0) },
      { start: v(1.2, 0.5, 0), end: v(1.2, 1.2, 0) },
      { start: v(-1.2, -0.3, 0.2), end: v(0, -0.3, 0.2) },
      { start: v(-1.2, -0.3, 0.2), end: v(-1.2, 0.8, 0.2) },
      { start: v(0, 0.5, 0), end: v(0, 0.5, 0.8) },
      { start: v(0, 0.5, 0.8), end: v(-0.8, 0.5, 0.8) },
    ];
  }, []);

  return (
    <group>
      {segments.map((seg, i) => (
        <Pipe key={i} start={seg.start} end={seg.end} segments={pipeSegs} />
      ))}
      <Elbow position={[1.2, 0.85, 0]} rotation={[0, 0, -Math.PI / 2]} />
      <Elbow position={[-1.2, 0.25, 0.2]} rotation={[Math.PI / 2, 0, 0]} />
      <Valve position={[0.6, 0.5, 0]} />
      <Valve position={[-0.6, 0.5, 0.8]} />
    </group>
  );
}
