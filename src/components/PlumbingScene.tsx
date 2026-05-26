import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useHeroScroll } from "../context/HeroScrollContext";
import PipeNetwork from "./PipeNetwork";
import WaterDroplets from "./WaterDroplets";
import FaucetAssembly from "./FaucetAssembly";
import WaterStream from "./WaterStream";
import Pedestal from "./Pedestal";
import PipeWrench from "./PipeWrench";
import GlowOrb from "./GlowOrb";

type PlumbingSceneProps = {
  mobile?: boolean;
  reducedMotion?: boolean;
};

type FadeState = {
  ready: boolean;
  materials: THREE.Material[];
  baseOpacities: number[];
};

function collectMaterials(root: THREE.Object3D) {
  const materials: THREE.Material[] = [];
  const baseOpacities: number[] = [];

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    const meshMaterials = Array.isArray(obj.material)
      ? obj.material
      : [obj.material];
    meshMaterials.forEach((mat) => {
      materials.push(mat);
      baseOpacities.push(mat.opacity);
      mat.transparent = true;
    });
  });

  return { materials, baseOpacities };
}

export default function PlumbingScene({
  mobile = false,
  reducedMotion = false,
}: PlumbingSceneProps) {
  const group = useRef<THREE.Group>(null);
  const scroll = useHeroScroll();
  const fadeState = useRef<FadeState>({
    ready: false,
    materials: [],
    baseOpacities: [],
  });

  useFrame((state) => {
    if (!group.current) return;

    if (!fadeState.current.ready) {
      const { materials, baseOpacities } = collectMaterials(group.current);
      if (materials.length > 0) {
        fadeState.current = { ready: true, materials, baseOpacities };
      }
    }

    const t = state.clock.elapsedTime;
    const drift = Math.sin(t * 0.18) * (mobile ? 0.06 : 0.1);
    const scrollMul = mobile ? 0.55 : 1;
    const effectiveScroll = THREE.MathUtils.clamp(scroll * scrollMul, 0, 1);

    group.current.rotation.y = drift + 0.28 + effectiveScroll * 0.85;
    group.current.rotation.x = effectiveScroll * 0.1;
    group.current.position.y = 0.15 - effectiveScroll * 0.55;
    group.current.position.x = effectiveScroll * 0.18;
    const baseScale = mobile ? 1.3 : 1.55;
    group.current.scale.setScalar(baseScale - effectiveScroll * 0.18);

    if (!fadeState.current.ready || reducedMotion) return;

    const fade = THREE.MathUtils.lerp(1, 0.08, effectiveScroll);
    fadeState.current.materials.forEach((mat, i) => {
      mat.opacity = fadeState.current.baseOpacities[i] * fade;
    });
  });

  const faucetPos: [number, number, number] = [0, 1.75, 0.25];
  const streamOrigin: [number, number, number] = [0, 1.42, 0.62];

  return (
    <>
      <group ref={group} position={[0, mobile ? 0.15 : 0.1, 0]}>
        <Pedestal mobile={mobile} />
        <PipeNetwork mobile={mobile} />
        <FaucetAssembly position={faucetPos} mobile={mobile} />
        <WaterStream origin={streamOrigin} mobile={mobile} />
        <WaterDroplets
          origin={[streamOrigin[0], streamOrigin[1] - 0.15, streamOrigin[2]]}
          count={mobile ? 16 : 36}
          mobile={mobile}
        />
        <GlowOrb position={[-0.55, 0.65, -0.45]} mobile={mobile} />
        {!mobile && (
          <>
            <PipeWrench
              position={[1.55, -0.15, 0.35]}
              rotation={[0.6, -0.35, 0.55]}
            />
            <mesh position={[-1.7, -0.85, 0.4]} rotation={[0, 0.5, 0.15]} castShadow>
              <boxGeometry args={[0.45, 0.1, 0.3]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          </>
        )}
      </group>
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={mobile ? 0.35 : 0.5}
        scale={12}
        blur={2.5}
        far={4}
        color="#020617"
      />
    </>
  );
}
