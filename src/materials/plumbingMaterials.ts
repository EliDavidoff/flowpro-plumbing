import * as THREE from "three";

export const chromeMaterial = new THREE.MeshStandardMaterial({
  color: "#f1f5f9",
  metalness: 0.95,
  roughness: 0.12,
  emissive: "#64748b",
  emissiveIntensity: 0.08,
});

export const pipeMaterial = new THREE.MeshStandardMaterial({
  color: "#f8fafc",
  metalness: 0.82,
  roughness: 0.14,
  emissive: "#38bdf8",
  emissiveIntensity: 0.35,
});

export const accentMaterial = new THREE.MeshStandardMaterial({
  color: "#22d3ee",
  metalness: 0.65,
  roughness: 0.2,
  emissive: "#0891b2",
  emissiveIntensity: 0.55,
});

export const waterMaterial = new THREE.MeshPhysicalMaterial({
  color: "#a5f3fc",
  metalness: 0.05,
  roughness: 0.02,
  transmission: 0.55,
  thickness: 0.35,
  transparent: true,
  opacity: 0.88,
  emissive: "#0e7490",
  emissiveIntensity: 0.25,
});

export const waterStreamMaterial = new THREE.MeshPhysicalMaterial({
  color: "#67e8f9",
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.7,
  thickness: 0.2,
  transparent: true,
  opacity: 0.75,
  emissive: "#22d3ee",
  emissiveIntensity: 0.4,
});

export const darkMetalMaterial = new THREE.MeshStandardMaterial({
  color: "#94a3b8",
  metalness: 0.9,
  roughness: 0.22,
});
