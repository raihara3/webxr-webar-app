import * as THREE from 'three'

export let renderer = null
export let scene = null
export let camera = null
export let controller = null

const setRenderer = () => {
  // antialias: whether to perform antialiasing
  // alpha: whether the canvas contains an alpha buffer or not
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  renderer.xr.enabled = true
  document.body.appendChild(renderer.domElement)

  setScene()
}

const setScene = () => {
  scene = new THREE.Scene()
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
  light.position.set(0, 1, 0)

  setCamera()
}

const setCamera = () => {
  const fov = 70;
  const aspect = window.innerWidth/window.innerHeight
  const near = 0.01
  const far = 20
  camera = new THREE.PerspectiveCamera(fov,aspect, near, far)
  window.addEventListener('resize', () => {
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)

  setController()
}

const setController = () => {
  controller = renderer.xr.getController(0)
  controller.addEventListener('selectend', () => {
    controller.userData.isSelecting = true
  })

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
  })
}

export default setRenderer