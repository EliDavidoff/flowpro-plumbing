import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const TARGET = new THREE.Vector3(0, 0.35, 0.1);

export default function SceneCamera() {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(TARGET);
  });

  return null;
}
