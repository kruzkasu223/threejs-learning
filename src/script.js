import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const cube = document.querySelector(".cube");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
// camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, cube);
controls.enableDamping = true;
// controls.target.z = 2;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: cube,
});
renderer.setSize(sizes.width, sizes.height);
// renderer.render(scene, camera);

// Animations

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // mesh.rotation.y = elapsedTime;
  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;

  // camera.lookAt(mesh.position);

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * Math.PI * 2;

  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
