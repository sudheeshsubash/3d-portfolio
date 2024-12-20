import "./styles/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class ThreeJSTemplate {
  constructor() {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLights();
    this.loadModel(); // Use loadModel to load the 3D model
    this.initControls();
    this.addEventListeners();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
  }


  initCamera() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.camera = new THREE.PerspectiveCamera(
      100,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.z = 3;
    this.scene.add(this.camera);
  }

  initRenderer() {
    this.canvas = document.querySelector("canvas.webgl");
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    const hemisphereLight = new THREE.HemisphereLight(0x7444ff, 0xff00bb, 0.5);
    const pointLight = new THREE.PointLight(0x7444ff, 1, 100);
    pointLight.position.set(0, 3, 4);

    this.scene.add(ambientLight, directionalLight, hemisphereLight, pointLight);
  }

  loadModel() {
    // Instantiate GLTFLoader
    this.loader = new GLTFLoader();

    // Path to your .glb file
    const gltfPath = "public/model3.glb"; // Change path if necessary

    // Load the GLB file
    this.loader.load(gltfPath,
      (gltf) => {
        // Called when the GLB file has loaded
        this.model = gltf.scene; // Save the loaded model
        this.scene.add(this.model); //Add the loaded model to the scene
        console.log("GLB file loaded successfully!", gltf);
      },
      (xhr) => {
        // Called during download progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        // Called when loading has errors
        console.error("An error happened", error);
      }
    );
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  addEventListeners() {
    window.addEventListener("resize", () => this.onResize());
  }

  onResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();

    // If model is loaded, apply some animation
    // if (this.model) {
    //   this.model.rotation.x = elapsedTime * 1;
    //   this.model.rotation.y = elapsedTime * 1;
    // }

    // Update controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Call animate again on the next frame
    window.requestAnimationFrame(() => this.animate());
  }
}

// Initialize the template
new ThreeJSTemplate();
