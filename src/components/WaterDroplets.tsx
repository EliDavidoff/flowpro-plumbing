import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type WaterDropletsProps = {
  origin: [number, number, number];
  count?: number;
  mobile?: boolean;
};

export default function WaterDroplets({
  origin,
  count = 28,
  mobile = false,
}: WaterDropletsProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const dropletSegs = mobile ? 12 : 16;
  const geometry = useMemo(
    () => new THREE.SphereGeometry(1, dropletSegs, dropletSegs),
    [dropletSegs]
  );
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#a5f3fc",
        emissive: "#22d3ee",
        emissiveIntensity: 0.55,
        metalness: 0.15,
        roughness: 0.08,
        transmission: 0.4,
        thickness: 0.3,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.35,
      speed: 0.5 + Math.random() * 0.9,
      scale: 0.018 + Math.random() * 0.038,
      phase: Math.random() * Math.PI * 2,
      z: (Math.random() - 0.5) * 0.2,
      wobble: 0.02 + Math.random() * 0.04,
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      const fall = ((t * p.speed + p.phase) % 2.4) - 1.1;
      dummy.position.set(
        origin[0] + p.x + Math.sin(t * 3 + p.phase) * p.wobble,
        origin[1] - fall,
        origin[2] + p.z
      );
      const stretch = 1 + Math.sin(t * 8 + i) * 0.2;
      dummy.scale.set(p.scale * stretch, p.scale * 1.35, p.scale * stretch);
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
