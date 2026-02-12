"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, AdaptiveDpr, AdaptiveEvents, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { MotionValue, useTransform } from "framer-motion";

function BackgroundBlobs() {
  return (
    <>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-5, 3, -5]}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshBasicMaterial color="#f5f5dc" transparent opacity={0.03} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[5, -3, -4]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="#dfd4b8" transparent opacity={0.03} />
        </mesh>
      </Float>
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#fdf5e6" transparent opacity={0.02} />
      </mesh>
    </>
  );
}



function MorphingModel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const mainGroup = useRef<THREE.Group>(null);
  const crystalGroup = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const crystalMat = useRef<any>(null);
  const sphereGroup = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sphereMat = useRef<any>(null);
  const alchemyGroup = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const alchemyMat = useRef<any>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Spatial & Scale Transforms (MotionValues)
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const xPos = useTransform(scrollYProgress, [0, 0.25, 0.45, 0.65, 0.85, 1], [2, 2, -2, -2, 2, 2]);

  // Transition Transforms
  const crystalOp = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const crystalS = useTransform(scrollYProgress, [0, 0.2, 0.35], [1.1, 1.1, 0]);

  const sphereOp = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
  const sphereS = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 1.0, 1.0, 0]);

  const alchemyOp = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);
  const alchemyS = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1.4, 1.4]);

  useFrame((state) => {
    if (!mainGroup.current) return;

    // 1. Spatial Movement
    const targetX = (mouse.x * 0.3) + xPos.get();
    const targetY = mouse.y * 0.3;
    mainGroup.current.position.x += (targetX - mainGroup.current.position.x) * 0.05;
    mainGroup.current.position.y += (targetY - mainGroup.current.position.y) * 0.05;
    mainGroup.current.rotation.y = rotationY.get() + state.clock.getElapsedTime() * 0.2;

    // 2. Crystal State Updates
    const cOp = crystalOp.get();
    const cS = crystalS.get();
    if (crystalGroup.current) {
      crystalGroup.current.visible = cOp > 0.005;
      crystalGroup.current.scale.setScalar(cS);
      if (crystalMat.current) {
        crystalMat.current.opacity = cOp;
      }
    }

    // 3. Sphere State Updates
    const sOp = sphereOp.get();
    const sS = sphereS.get();
    if (sphereGroup.current) {
      sphereGroup.current.visible = sOp > 0.005;
      sphereGroup.current.scale.setScalar(sS);
      if (sphereMat.current) {
        sphereMat.current.opacity = sOp;
      }
    }

    // 4. Alchemy State Updates
    const aOp = alchemyOp.get();
    const aS = alchemyS.get();
    if (alchemyGroup.current) {
      alchemyGroup.current.visible = aOp > 0.005;
      alchemyGroup.current.scale.setScalar(aS);
      if (alchemyMat.current) {
        alchemyMat.current.opacity = aOp;
      }
    }
  });

  return (
    <group ref={mainGroup}>
      {/* State 1: Crystal */}
      <group ref={crystalGroup}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial
              ref={crystalMat}
              color="#ff9f43"
              speed={3}
              distort={0.4}
              radius={1}
              metalness={0.8}
              roughness={0.2}
              emissive="#ff9f43"
              emissiveIntensity={0.2}
              transparent
            />
          </mesh>
        </Float>
      </group>

      {/* State 2: Liquid Sphere */}
      <group ref={sphereGroup}>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              ref={sphereMat}
              color="#3b82f6"
              speed={2}
              distort={0.3}
              radius={1}
              metalness={0.9}
              roughness={0.1}
              emissive="#3b82f6"
              emissiveIntensity={0.2}
              transparent
            />
          </mesh>
        </Float>
      </group>

      {/* State 3: Alchemy Coil */}
      <group ref={alchemyGroup}>
        <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
          <mesh>
            <torusKnotGeometry args={[0.5, 0.15, 128, 32]} />
            <MeshDistortMaterial
              ref={alchemyMat}
              color="#ff9f43"
              speed={4}
              distort={0.5}
              radius={1}
              metalness={1}
              roughness={0.1}
              emissive="#ff9f43"
              emissiveIntensity={0.2}
              transparent
            />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

export default function FloatingCrystal({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
      >
        <color attach="background" args={["#050505"]} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        {/* Blue/Orange Rim Light for colored shadow effect */}
        <pointLight position={[-10, 0, -5]} intensity={5} color="#3b82f6" distance={20} />
        <spotLight position={[0, -5, 5]} angle={0.5} penumbra={1} intensity={10} color="#ff9f43" distance={15} />
        <Environment preset="city" />

        <BackgroundBlobs />
        <MorphingModel scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
