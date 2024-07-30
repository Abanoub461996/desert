import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { gsap } from "gsap";

const Scene = () => {
  const container = useRef<HTMLDivElement>(null);
  const scrollIndex = useRef(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    // Set the initial camera position to the first point
    const points = [
      [-20, 0.5, 0],
      [-10, 1, 2],
      [-5, 1, 0],
      [0, 1, 5],
      [5, 2, 0],
      [8, 2, 5],
      [10, 0.5, 20],
      [15, 0.5, 5],
      [18, 0.5, 0],
      [20, 0.5, 5],
    ].map((p) => new THREE.Vector3(...p));

    camera.position.copy(points[0]);
    camera.lookAt(points[1]);

    camera.up.set(0, 1, 0);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    scene.add(hemisphereLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/path/to/your/background.jpg", (texture) => {
      scene.background = texture;
    });
    const loader = new GLTFLoader();
    loader.load(
      "/sand_rock_pack_02.glb",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
      },
      () => {},
      () => {}
    );
    const colors = [
      0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffa500,
      0x800080, 0x008000, 0x000080,
    ];
    points.forEach((point, index) => {
      const smallGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const smallMaterial = new THREE.MeshBasicMaterial({
        color: colors[index % colors.length],
      });
      const smallObject = new THREE.Mesh(smallGeometry, smallMaterial);
      smallObject.position.copy(point);
      scene.add(smallObject);
    });

    // Function to animate camera movement and lookAt
    const animateCamera = (newPosition: THREE.Vector3, lookAtPosition: THREE.Vector3, duration: number) => {
      gsap.to(camera.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: duration / 1000,
        ease: "power2.inOut",
      });

      gsap.to(camera, {
        onUpdate: () => {
          camera.lookAt(
            new THREE.Vector3(
              lookAtPosition.x,
              lookAtPosition.y,
              lookAtPosition.z
            )
          );
        },
        duration: duration / 1000,
        ease: "power2.inOut",
      });
    };

    // Handle mouse wheel event
    const onWheel = (event: { deltaY: number; }) => {
      if (event.deltaY > 0) {
        scrollIndex.current = Math.min(
          scrollIndex.current + 1,
          points.length - 1
        );
      } else {
        scrollIndex.current = Math.max(scrollIndex.current - 1, 0);
      }

      const currentPoint = points[scrollIndex.current];
      const nextPoint =
        points[Math.min(scrollIndex.current + 1, points.length - 1)];

      // Calculate the direction vector from the current point to the next point
      const direction = new THREE.Vector3()
        .subVectors(nextPoint, currentPoint)
        .normalize();

      // Move the camera to a position slightly before the current point in the opposite direction of the next point
      const cameraPosition = new THREE.Vector3()
        .copy(currentPoint)
        .sub(direction.multiplyScalar(2));
      animateCamera(cameraPosition, currentPoint, 1000); // Adjust the duration as needed
    };

    window.addEventListener("wheel", onWheel);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      window.removeEventListener("wheel", onWheel);
      container.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={container} />;
};

export default Scene;
