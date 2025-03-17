import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const EarthGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with darker background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000033); // Darker blue, almost black

    // Camera setup with mobile optimization
    const camera = new THREE.PerspectiveCamera(
      window.innerWidth < 768 ? 60 : 45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = window.innerWidth < 768 ? 5 : 7;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);

    // Earth texture
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'),
      roughness: 0.8,
      metalness: 0.1
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Cloud layer
    const cloudGeometry = new THREE.SphereGeometry(2.005, 64, 64);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-clouds.png'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Communication Network Setup
    const createSatelliteNetwork = () => {
      const network = new THREE.Group();
      const satelliteCount = 12;
      const satellites = [];

      // Create multiple satellites in different orbits
      for (let i = 0; i < satelliteCount; i++) {
        const orbitRadius = 4 + Math.random() * 2;
        const satelliteGroup = new THREE.Group();

        // Satellite body with more realistic proportions
        const satelliteBody = new THREE.BoxGeometry(0.2, 0.08, 0.08);
        const satelliteMaterial = new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          metalness: 0.9,
          roughness: 0.1,
        });
        const satellite = new THREE.Mesh(satelliteBody, satelliteMaterial);

        // More detailed solar panels
        const panelGeometry = new THREE.BoxGeometry(0.3, 0.01, 0.15);
        const panelMaterial = new THREE.MeshStandardMaterial({
          color: 0x2244ff,
          metalness: 0.7,
          roughness: 0.3,
        });
        const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);

        // Add antenna
        const antennaGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.15, 8);
        const antennaMaterial = new THREE.MeshStandardMaterial({
          color: 0x888888,
          metalness: 0.8,
          roughness: 0.2,
        });
        const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna.rotation.x = Math.PI / 2;
        antenna.position.z = 0.1;

        leftPanel.position.x = -0.3;
        rightPanel.position.x = 0.3;

        satelliteGroup.add(satellite);
        satelliteGroup.add(leftPanel);
        satelliteGroup.add(rightPanel);
        satelliteGroup.add(antenna);

        // Position satellites in a more organized network
        const angle = (i / satelliteCount) * Math.PI * 2;
        const heightVariation = Math.sin((i / satelliteCount) * Math.PI * 4) * 0.5;
        satelliteGroup.position.set(
          orbitRadius * Math.cos(angle),
          orbitRadius * heightVariation,
          orbitRadius * Math.sin(angle)
        );

        satellites.push({
          group: satelliteGroup,
          orbitRadius,
          startAngle: angle,
          rotationSpeed: 0.0005 + Math.random() * 0.0005,
          heightVariation
        });

        network.add(satelliteGroup);
      }

      return { network, satellites };
    };

    const { network, satellites } = createSatelliteNetwork();
    scene.add(network);

    // Enhanced Quantum Communication Beams
    const createQuantumBeam = () => {
      const beamGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 8);
      beamGeometry.rotateX(Math.PI / 2);
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.2,
      });
      return new THREE.Mesh(beamGeometry, beamMaterial);
    };

    // Communication Links with improved visuals
    const communicationLinks = new THREE.Group();
    scene.add(communicationLinks);

    // Brighter atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Bigger stars with increased brightness
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: window.innerWidth < 768 ? 0.1 : 0.05, // Increased star size
      transparent: true,
      opacity: 1.0, // Increased opacity
      sizeAttenuation: true
    });

    const starVertices = [];
    const radius = 100;
    const starCount = window.innerWidth < 768 ? 3000 : 6000; // Reduced count for better visibility

    for (let i = 0; i < starCount; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(hemisphereLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = window.innerWidth < 768 ? 3 : 4;
    controls.maxDistance = window.innerWidth < 768 ? 15 : 20;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Animation loop with RAF ID for cleanup
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous rotation for Earth, clouds, and atmosphere
      earth.rotation.y += 0.001;
      clouds.rotation.y += 0.0012;
      atmosphere.rotation.y += 0.001;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 5 : 7;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      controls.minDistance = width < 768 ? 3 : 4;
      controls.maxDistance = width < 768 ? 15 : 20;

      // Update star size for mobile
      starMaterial.size = width < 768 ? 0.1 : 0.05;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      mountRef.current?.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default EarthGlobe;