import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Scene = () => {
  const container = useRef<HTMLDivElement>(null);
  const scrollPercent = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 15, 20); // Initial camera position
    camera.lookAt(new THREE.Vector3(0, 15, 1000)); // Look straight ahead at the same y level
    camera.up.set(0, 1, 0); // Ensure the camera's up vector is correct

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Hemisphere Light
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    scene.add(hemisphereLight);

    // Directional Light (Sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false; // Disable controls

    // Load the background image
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/path/to/your/background.jpg', (texture) => {
      scene.background = texture;
    });

    // Load the GLB file
    const loader = new GLTFLoader();
    loader.load(
      "/sand_rock_pack_02.glb", // Replace with the correct path to your GLB file
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Log the bounding box to check the model's size and position
        const box = new THREE.Box3().setFromObject(model);
        console.log("Model bounding box:", box);
      },
      () => {
        console.log("Loading in progress...");
      },
      (error) => {
        console.error("An error happened", error);
      }
    );

    // Add AxesHelper
    const axesHelper = new THREE.AxesHelper(5); // Size of the axes
    scene.add(axesHelper);

    // Add GridHelper for XZ plane
    const gridHelperXZ = new THREE.GridHelper(100, 10);
    scene.add(gridHelperXZ);

    // Add GridHelper for XY plane
    const gridHelperXY = new THREE.GridHelper(100, 10);
    gridHelperXY.rotation.x = Math.PI / 2;
    scene.add(gridHelperXY);

    // Add GridHelper for YZ plane
    const gridHelperYZ = new THREE.GridHelper(100, 10);
    gridHelperYZ.rotation.z = Math.PI / 2;
    scene.add(gridHelperYZ);

    // Create a transparent object (e.g., a sphere)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    const transparentObject = new THREE.Mesh(geometry, material);
    scene.add(transparentObject);

    // Define the camera path using the provided points
    const points = [
      [0, 3, 15],
      [5, 3, 12],
      [-15, 3, 12],
      [10, 3, 7],
      [20, 3, 5],
      [15, 3, 2],
      [-15, 3, 0],
      [10, 3, -7],
      [-5, 3, -7],
      [5, 3, -10],
    ].map(p => new THREE.Vector3(...p));

    const path = new THREE.CatmullRomCurve3(points);

    // Create small objects in front of each point
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffa500, 0x800080, 0x008000, 0x000080];
    points.forEach((point, index) => {
      const smallGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const smallMaterial = new THREE.MeshBasicMaterial({ color: colors[index % colors.length] });
      const smallObject = new THREE.Mesh(smallGeometry, smallMaterial);
      smallObject.position.copy(point).add(new THREE.Vector3(0, 0, -1)); // Position slightly in front of the point
      scene.add(smallObject);
    });

    // Handle mouse wheel event
    const onWheel = (event) => {
      scrollPercent.current += event.deltaY * 0.001; // Adjust the scroll speed as needed
      scrollPercent.current = Math.max(0, Math.min(1, scrollPercent.current)); // Clamp the value between 0 and 1
      const point = path.getPoint(scrollPercent.current);
      camera.position.copy(point);

      // Find the next point to look at
      const nextIndex = Math.min(Math.floor(scrollPercent.current * (points.length - 1)) + 1, points.length - 1);
      const nextPoint = points[nextIndex];
      camera.lookAt(nextPoint);
    };

    window.addEventListener('wheel', onWheel);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('wheel', onWheel);
      container.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={container} style={{ height: '100vh' }} />;
};

export default Scene;
