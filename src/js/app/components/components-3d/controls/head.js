import { MessageDispatcher } from "../../../../utils/black-engine.module";
import * as TWEEN from "@tweenjs/tween.js";
import UTween from "../../../../utils/utween";
import * as THREE from 'three';

export default class Head extends THREE.Group {
  constructor(scene, states) {
    super();
    this._scene = scene;
    this._states = states;
    this.bumpyMesh = null;
    this._initHead();
    // this.unmorph();
  }

  _initClay() {


    const baseGeo = new THREE.SphereGeometry(0.1, 32, 19);

    // Create the bumpy sphere geometry as a morph target
    const bumpyGeo = new THREE.SphereGeometry(0.1, 32, 19);

    // Modify the vertices of bumpyGeo to create the bumpy effect
    const vertexCount = bumpyGeo.attributes.position.count;
    const vertices = bumpyGeo.attributes.position;
    for (let i = 0; i < vertexCount; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(vertices, i);
      vertex.normalize().multiplyScalar(0.1 + Math.random() * 0.02); // Adjust the bumpiness here
      vertices.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    bumpyGeo.morphAttributes.position = [baseGeo.attributes.position]; // Set the base geometry as the morph target


    const mat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    this.clay = new THREE.Mesh(bumpyGeo, mat);
    this.clay.x = 0; this.clay.y = 0; this.clay.z = 0;
    this._scene.add(this.clay)
    this.clay.visible = false;
  }

  _initHead() {

    const assets = THREE.Cache.get('assets').scene;
    let originalGeometry;

    assets.traverse((child) => {
      if (child.name === "HEAD") {
        this._view = child;
        for (let i = 0; i < this._view.children.length; i++) this._view.children[i].visible = false;
        originalGeometry = child.geometry.clone()

      }
    })

    const view = this._view;
    view.position.y = 0.12;
    this._scene.add(view);

    view.material = new THREE.MeshStandardMaterial({
      color: 0xF2BA95,
      roughness: 1,
      metalness: 0
    })

    //     // Modify the vertices of the cloned geometry to create the bumpy effect
    //     const vertexCount = originalGeometry.attributes.position.count;
    //     const vertices = originalGeometry.attributes.position;
    //     const radius = 0.2; // Adjust the bumpiness here
    //     for (let i = 0; i < vertexCount; i++) {
    //       const vertex = new THREE.Vector3();
    //       vertex.fromBufferAttribute(vertices, i);
    //       vertex.normalize().multiplyScalar(radius + Math.random() * 0.02); // Adjust the bumpiness here
    // 
    //       vertices.setXYZ(i, vertex.x, vertex.y, vertex.z);
    //     }
    //     this.bumpyMesh = new THREE.Mesh(originalGeometry, view.material);
    //     this.bumpyMesh.position.set(this._view.position.x, this._view.position.y, this._view.position.z)
    //     this.bumpyMesh.rotation.x = 1.5;
    //     this._scene.add(this.bumpyMesh);

  }

  _animate() {
    requestAnimationFrame(this._animate.bind(this));
    TWEEN.update();
  }

  unmorph() {
    this._view.visible = true;
    console.log("morph");

    const tweenDuration = 10000; // 10 seconds in milliseconds

    const originalPositions = [];
    const morphTargetInfluences = this._view.morphTargetInfluences[0];
    const vertexCount = this._view.geometry.attributes.position.count;
    const vertices = this._view.geometry.attributes.position;

    // Store the original morphed vertex positions in an array
    for (let i = 0; i < vertexCount; i++) {
      const morphedPosition = new THREE.Vector3().fromBufferAttribute(morphTargetInfluences, i);
      originalPositions.push(morphedPosition.clone());
    }

    // Set up the Tween animation
    const tween = new TWEEN.Tween(this.bumpyMesh.geometry.vertices)
      .to(vertices.array, tweenDuration) // Tween the bumpyMesh vertices towards the _view mesh's vertices
      .easing(TWEEN.Easing.Quadratic.Out) // Adjust the easing function as per your preference
      .onUpdate(() => {
        this.bumpyMesh.geometry.verticesNeedUpdate = true;
      })
      .onComplete(() => {
        // Hide the bumpyMesh after the unmorphing is complete
        this._view.visible = false;
      });

    tween.start();
  }

}