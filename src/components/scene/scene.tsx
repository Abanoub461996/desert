import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { gsap } from "gsap";
import Chapter from "../chapter/chapter";

const Scene = () => {
  const [chapterNumber, setChapterNumber] = useState<number>(0);

  const container = useRef<HTMLDivElement>(null);
  const scrollIndex = useRef(0);
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    const points = [
      [-20, 0.5, 2],
      [-6, 0.5, -10],
      [-5, 1, 0],
      [0, 1, 5],
      [5, 2, 0],
      [8, 2, 5],
      [10, 0.5, 20],
      [15, 0.5, 5],
      [18, 0.5, 5],
      [20, 0.5, -5],
    ].map((p) => new THREE.Vector3(...p));
    camera.position.set(-21, 0.5, 2);
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
    renderer.setPixelRatio(window.innerWidth / window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.current?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/path/to/your/background.jpg", (texture) => {
      scene.background = texture;
    });
    const loader = new GLTFLoader();
    loader.load("/sand_rock_pack_02.glb", (gltf) => {
      const model = gltf.scene;
      scene.add(model);
    });
    const colors = [
      0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffa500,
      0x800080, 0x008000, 0x000080,
    ];

    const smallObjects: THREE.Mesh[] = [];

    points.forEach((point, index) => {
      const smallGeometry = new THREE.SphereGeometry(0.1, 32, 32);
      const smallMaterial = new THREE.MeshBasicMaterial({
        color: colors[index % colors.length],
      });
      const smallObject = new THREE.Mesh(smallGeometry, smallMaterial);
      smallObject.position.copy(point);
      smallObjects.push(smallObject);
      scene.add(smallObject);
    });

    // Raycasting setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Listen for mouse clicks
    window.addEventListener("click", onMouseClick);

    function onMouseClick(event: { clientX: number; clientY: number }) {
      container.current?.classList.add("no-scroll");
      // Calculate normalized device coordinates (NDC) from mouse position
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Find intersected objects
      const intersects = raycaster.intersectObjects(smallObjects);
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object as THREE.Mesh;
        const clickedIndex = smallObjects.indexOf(clickedObject);
        setChapterNumber(clickedIndex + 1);
      }
    }
    const animateCamera = (
      newPosition: THREE.Vector3,
      lookAtPosition: THREE.Vector3,
      duration: number
    ) => {
      gsap.to(camera.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: duration / 1000,
        ease: "power1.inOut",
      });

      // Add an additional animation for the y-axis movement
      gsap.to(camera.position, {
        y: newPosition.y - 0.5, // Move the camera position by -1 in the y-axis
        duration: duration / 1000,
        ease: "power1.inOut",
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
        ease: "power1.inOut",
      });
    };

    const onWheel = (event: { deltaY: number }) => {
      console.log(chapterNumber);
      if (chapterNumber != 0) return;

      if (event.deltaY > 0) {
        // Scroll down
        if (scrollIndex.current < points.length - 1) {
          scrollIndex.current = (scrollIndex.current + 1) % points.length;
        }
      } else {
        // Scroll up
        if (scrollIndex.current > 0) {
          scrollIndex.current =
            (scrollIndex.current - 1 + points.length) % points.length;
        }
      }

      const currentPoint = points[scrollIndex.current];
      const nextPoint = points[(scrollIndex.current + 1) % points.length];
      const prevPoint =
        points[(scrollIndex.current - 1 + points.length) % points.length];
      const directionNext = new THREE.Vector3()
        .subVectors(nextPoint, currentPoint)
        .normalize();
      const directionPrev = new THREE.Vector3()
        .subVectors(prevPoint, currentPoint)
        .normalize();
      const verticalOffset = 1; // Adjust as needed
      const cameraPosition = new THREE.Vector3()
        .copy(currentPoint)
        .sub(
          event.deltaY > 0
            ? directionNext.multiplyScalar(2)
            : directionPrev.multiplyScalar(2)
        )
        .add(new THREE.Vector3(0, verticalOffset, 0)); // Add the offset
      animateCamera(cameraPosition, currentPoint, 5000);
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

  return (
    <div className="wrapper">
      <div ref={container} />
      {!!chapterNumber && (
        <Chapter
          chapterNumber={chapterNumber}
          setChapterNumber={setChapterNumber}
        />
      )}
    </div>
  );
};

export default Scene;
