import { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '../../shaders/discoBallVertex.glsl?raw';
import fragmentShader from '../../shaders/discoBallFragment.glsl?raw';

/* ─── Light Reflection Particles ─── */
function ReflectionParticles({ count = 80, scrollProgress = 0 }) {
  const pointsRef = useRef();
  const timeRef = useRef(0);

  const { positions, colors, sizes, speeds, phases, orbits } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const orbits = new Float32Array(count * 3);

    const palette = [
      [0.83, 0.69, 0.22],  // gold
      [0.75, 0.75, 0.80],  // silver
      [1.0, 0.42, 0.62],   // pink
      [1.0, 0.95, 0.90],   // warm white
      [0.85, 0.75, 0.55],  // champagne
      [0.70, 0.60, 0.90],  // lavender
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3.0 + Math.random() * 4.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      positions[i3] = Math.cos(theta) * Math.cos(phi) * radius;
      positions[i3 + 1] = Math.sin(phi) * radius;
      positions[i3 + 2] = Math.sin(theta) * Math.cos(phi) * radius;

      orbits[i3] = radius;
      orbits[i3 + 1] = theta;
      orbits[i3 + 2] = phi;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];

      sizes[i] = 0.02 + Math.random() * 0.06;
      speeds[i] = 0.1 + Math.random() * 0.4;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, speeds, phases, orbits };
  }, [count]);

  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;
    const geo = pointsRef.current.geometry;
    const posArr = geo.attributes.position.array;
    const sizeArr = geo.attributes.size.array;
    const spread = 1.0 + scrollProgress * 2.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = orbits[i3] * spread;
      const theta = orbits[i3 + 1] + t * speeds[i];
      const phi = orbits[i3 + 2] + Math.sin(t * 0.3 + phases[i]) * 0.15;

      posArr[i3] = Math.cos(theta) * Math.cos(phi) * radius;
      posArr[i3 + 1] = Math.sin(phi) * radius;
      posArr[i3 + 2] = Math.sin(theta) * Math.cos(phi) * radius;

      const pulse = 0.5 + 0.5 * Math.sin(t * 3.0 + phases[i]);
      const twinkle = Math.pow(Math.max(Math.sin(t * 5.0 + phases[i] * 10.0), 0.0), 8.0);
      sizeArr[i] = sizes[i] * (0.6 + 0.4 * pulse + twinkle * 1.5) * (1.0 + scrollProgress * 0.8);
    }

    geo.attributes.position.needsUpdate = true;
    geo.attributes.size.needsUpdate = true;

    const mat = pointsRef.current.material;
    mat.opacity = 0.7 + scrollProgress * 0.3;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.7}
        vertexColors
        map={particleTexture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Light Beam Rays ─── */
function LightBeams({ scrollProgress = 0 }) {
  const groupRef = useRef();
  const beamCount = 6;

  const beams = useMemo(() => {
    return Array.from({ length: beamCount }, (_, i) => ({
      angle: (i / beamCount) * Math.PI * 2,
      length: 8 + Math.random() * 4,
      width: 0.02 + Math.random() * 0.03,
      speed: 0.15 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      color: [
        new THREE.Color(0.83, 0.69, 0.22),
        new THREE.Color(0.78, 0.78, 0.85),
        new THREE.Color(1.0, 0.42, 0.62),
        new THREE.Color(1.0, 0.9, 0.7),
        new THREE.Color(0.7, 0.6, 0.9),
        new THREE.Color(0.9, 0.85, 0.7),
      ][i],
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((beam, i) => {
      const config = beams[i];
      beam.rotation.z = config.angle + t * config.speed;
      beam.rotation.x = Math.sin(t * 0.5 + config.phase) * 0.2;
      const scaleX = config.width * (1.0 + scrollProgress * 2.0);
      const scaleY = config.length * (1.0 + scrollProgress * 0.5);
      beam.scale.set(scaleX, scaleY, 1);
      beam.material.opacity = (0.06 + scrollProgress * 0.08) *
        (0.5 + 0.5 * Math.sin(t * 2.0 + config.phase));
    });
  });

  return (
    <group ref={groupRef}>
      {beams.map((beam, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={beam.color}
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main Disco Ball Component ─── */
function DiscoBall({ scrollProgress = 0 }) {
  const meshRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
    }),
    []
  );

  const handlePointerMove = useCallback(
    (event) => {
      const x = (event.point.x / viewport.width) * 2;
      const y = (event.point.y / viewport.height) * 2;
      targetRotation.current.x = -y * 0.15;
      targetRotation.current.y = x * 0.15;
    },
    [viewport]
  );

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    uniforms.uTime.value = t;
    uniforms.uScrollProgress.value = scrollProgress;

    // Mouse-driven rotation target from pointer
    targetRotation.current.x = -pointer.y * 0.12;
    targetRotation.current.y = pointer.x * 0.12;

    // Smooth lerp toward mouse target
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.03;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.03;

    // Base rotation speed increases with scroll
    const rotSpeed = 0.002 + scrollProgress * 0.008;

    meshRef.current.rotation.y += rotSpeed;
    meshRef.current.rotation.x = currentRotation.current.x + Math.sin(t * 0.5) * 0.005;
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.003;

    // Add mouse influence
    meshRef.current.rotation.y += currentRotation.current.y * 0.01;

    // Move toward camera on scroll
    meshRef.current.position.z = scrollProgress * 2.0;
    meshRef.current.position.y = scrollProgress * -0.3;
  });

  return (
    <group>
      {/* Disco Ball Mesh */}
      <mesh
        ref={meshRef}
        onPointerMove={handlePointerMove}
      >
        <sphereGeometry args={[2, 96, 96]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      {/* Hanging wire */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.4} />
      </mesh>

      {/* Reflection particles */}
      <ReflectionParticles count={90} scrollProgress={scrollProgress} />

      {/* Light beams */}
      <LightBeams scrollProgress={scrollProgress} />

      {/* Orbiting spotlights */}
      <OrbitalLights scrollProgress={scrollProgress} />
    </group>
  );
}

/* ─── Orbital Lights ─── */
function OrbitalLights({ scrollProgress = 0 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  const intensity = 2.5 + scrollProgress * 3.0;

  return (
    <group ref={groupRef}>
      <spotLight
        color="#D4AF37"
        intensity={intensity}
        position={[5, 4, 3]}
        angle={0.5}
        penumbra={0.8}
        distance={20}
      />
      <spotLight
        color="#C0C0C0"
        intensity={intensity * 0.8}
        position={[-5, 3, -3]}
        angle={0.5}
        penumbra={0.8}
        distance={20}
      />
      <pointLight
        color="#FF6B9D"
        intensity={intensity * 0.6}
        position={[0, -4, 2]}
        distance={15}
      />
      <pointLight
        color="#D4AF37"
        intensity={intensity * 0.3}
        position={[3, 0, -4]}
        distance={12}
      />
    </group>
  );
}

export default DiscoBall;
