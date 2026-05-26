import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type WaterDropletsProps = {
  origin: [number, number, number];
  count?: number;
};

export default function WaterDroplets({
  origin,
  count = 28,
}: WaterDropletsProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 8, 8), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#67e8f9",
        emissive: "#0891b2",
        emissiveIntensity: 0.5,
        metalness: 0.2,
        roughness: 0.3,
      }),
    []
  );

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.25,
      speed: 0.4 + Math.random() * 0.8,
      scale: 0.02 + Math.random() * 0.03,
      phase: Math.random() * Math.PI * 2,
      z: (Math.random() - 0.5) * 0.15,
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      const fall = ((t * p.speed + p.phase) % 2.2) - 1;
      dummy.position.set(
        origin[0] + p.x,
        origin[1] - fall,
        origin[2] + p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, count]}
      frustumCulled={false}
    />
  );
}
