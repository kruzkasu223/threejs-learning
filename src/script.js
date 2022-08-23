import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const textureImagePath = "./textures/"
const doorImagePath = textureImagePath + "door/"

// Texture JS way
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () => {
//   texture.needsUpdate = true
// }
// image.src = doorImagePath + "color.jpg"

// Texture Threejs way
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//   console.log("loading started")
// }
// loadingManager.onLoad = () => {
//   console.log("loading finished")
// }
// loadingManager.onProgress = () => {
//   console.log("loading progressing")
// }
// loadingManager.onError = () => {
//   console.log("loading error")
// }
const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load(doorImagePath + "color.jpg")
// const colorTexture = textureLoader.load(
//   textureImagePath + "checkerboard-1024x1024.png"
// )
// const colorTexture = textureLoader.load(
//   textureImagePath + "checkerboard-8x8.png"
// )
const colorTexture = textureLoader.load(textureImagePath + "minecraft.png")
const alphaTexture = textureLoader.load(doorImagePath + "alpha.jpg")
const heightTexture = textureLoader.load(doorImagePath + "height.jpg")
const normalTexture = textureLoader.load(doorImagePath + "normal.jpg")
const ambientOcclusionTexture = textureLoader.load(
  doorImagePath + "ambientOcclusion.jpg"
)
const metalnessTexture = textureLoader.load(doorImagePath + "metalness.jpg")
const roughnessTexture = textureLoader.load(doorImagePath + "roughness.jpg")
// const texture = textureLoader.load(
//   doorImagePath + "color.jpg",
//   () => {
//     console.log("load")
//   },
//   () => {
//     console.log("progress")
//   },
//   () => {
//     console.log("error")
//   }
// )

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// // colorTexture.wrapS = THREE.RepeatWrapping
// // colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// Canvas
const canvas = document.querySelector(".canvas")

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update threejs things
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
// const geometry = new THREE.SphereGeometry(1, 32, 32)
// const geometry = new THREE.ConeGeometry(1, 1, 32)
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animations

const clock = new THREE.Clock()

const animate = () => {
  const elapsedTime = clock.getElapsedTime()

  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(animate)
}

animate()
