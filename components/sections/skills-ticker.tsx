'use client';

import { Skill } from '@prisma/client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function SkillsTicker({ skills }: { skills: Skill[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const texturesRef = useRef<THREE.CanvasTexture[]>([]);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const positionsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Create camera
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create skill names text - using hardcoded list with new technologies
    const allSkills = [
      'Express.js',
      'BetterAuth',
      'Stytch',
      'TanStack',
      'Convex',
      'Resend',
      'FastAPI',
      'MongoDB',
      'CI/CD',
      'WebSocket',
      'Redis Caching',
      'Ably Realtime',
      'Stripe',
      'Paystack',
      'Flutterwave',
      'Next.js',
      'React',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
    ];
    const skillNames = [...allSkills, ...allSkills];
    const textures: THREE.CanvasTexture[] = [];
    const positions: number[] = [];
    const meshes: THREE.Mesh[] = [];

    skillNames.forEach((skillName, index) => {
      // Create canvas texture for text
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 40px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(skillName, 20, 80);

      const texture = new THREE.CanvasTexture(canvas);
      textures.push(texture);

      // Create plane geometry for text
      const geometry = new THREE.PlaneGeometry(300, 80);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const mesh = new THREE.Mesh(geometry, material);

      const yOffset = index < skillNames.length / 2 ? 100 : -100;
      mesh.position.y = yOffset;
      const xStart = -width;
      mesh.position.x = xStart + index * 320;
      mesh.position.z = 0;

      scene.add(mesh);
      meshes.push(mesh);
      positions.push(mesh.position.x);
    });

    texturesRef.current = textures;
    meshesRef.current = meshes;
    positionsRef.current = positions;

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      meshesRef.current.forEach((mesh, index) => {
        mesh.position.x -= 2; // Scroll speed

        // Loop back to start
        if (mesh.position.x < -width - 300) {
          mesh.position.x = width + 300;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      camera.left = -newWidth / 2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = -newHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [skills]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[240px] bg-black relative"
      style={{ WebkitFontSmoothing: 'antialiased' }}
    />
  );
}
