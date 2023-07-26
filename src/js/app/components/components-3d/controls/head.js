import { MessageDispatcher } from "../../../../utils/black-engine.module";
import UTween from "../../../../utils/utween";
import * as THREE from 'three';

export default class Head extends THREE.Group {
  constructor(scene, states) {
    super();
    this._scene = scene;
    this._states = states;

    this.messageDispatcher = new MessageDispatcher();
    this.onPointComplete = 'onPointComplete';

    this._head = null;
    this._eyes = null;
    this._aimPoints = {};

    this._currentMorphId = 0;
    this._mainMaterial = null;

    this._createMaterial();
    this._createView();
    this._createAimPoints();
  }

  _createMaterial() {
    this._mainMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000, specular: 0x0f0f0f
    });
  }

  _createView() {
    this._view = new THREE.Object3D(); // Corrected: Initialize _view as a new Object3D
    this.asset = THREE.Cache.get('assets').scene;
    this.asset.traverse((child) => {
      if (child.name == "HEAD") {
        this._view = child; // Corrected: Assign child to _view
        console.log(child.position)
      }
    });
    const view = this._view;
    view.position.y = 0.07;

    this._scene.add(view);

    view.material = new THREE.MeshStandardMaterial({
      color: 0xF2BA95,
      roughness: 1,
      metalness: 0,

    });
  }

  turnToClay() {

  }


  _createAimPoints() {
    const aimPointsData = {
      rEye: new THREE.Vector3(-0.037, 0.01, 0.09),
      lEye: new THREE.Vector3(0.034, 0.01, 0.09),
      nose: new THREE.Vector3(0, -0.03, 0.14),
      mouth: new THREE.Vector3(0, -0.06, 0.12),
      face: new THREE.Vector3(0, 0.07, 0.12)
    };

    const geo = new THREE.SphereGeometry(0.03, 32, 32);

    for (let key in aimPointsData) {
      const p = aimPointsData[key];

      const point = new THREE.Mesh(geo);
      point.position.x = p.x;
      point.position.y = p.y;
      point.position.z = p.z;
      this._scene.add(point);
    }

    this._aimPoints = aimPointsData;
  }

  reset() {
    new UTween(this.rotation, {
      x: 0, y: 0, z: 0
    }, 0.3);

    this._view.morphTargetInfluences = [0, 0, 0, 0, 1];
  }

  setState(state) {
    this._state = state;

    if (state === MorphScene.STATES.REYE) {
      this._currentMorphId = 0;
      this._view.morphTargetInfluences[0] = 0;
    }
    else if (state === MorphScene.STATES.LEYE) {
      this._currentMorphId = 1;
      this._view.morphTargetInfluences[1] = 0;
    }
    else if (state === MorphScene.STATES.NOSE) {
      this._currentMorphId = 2;
      this._view.morphTargetInfluences[2] = 0;
    }
    else if (state === MorphScene.STATES.MOUTH) {
      this._currentMorphId = 3;
      this._view.morphTargetInfluences[3] = 0;
    }
    else if (state === MorphScene.STATES.FACE) {
      this._currentMorphId = 4;
      this._view.morphTargetInfluences[4] = 0;
    }
  }

  enableDrilling(value) {
    this._isDrilling = value;
  }

  onUpdate(dt) {
    const drillValue = dt * 0.9;

    if (this._isDrilling) {
      this._view.morphTargetInfluences[this._currentMorphId] = Math.min(this._view.morphTargetInfluences[this._currentMorphId] + drillValue, 1);

      if (this._currentMorphId > 0) {
        this._view.morphTargetInfluences[this._currentMorphId - 1] = Math.max(this._view.morphTargetInfluences[this._currentMorphId - 1] - drillValue, 0);
      }

      if (this._view.morphTargetInfluences[this._currentMorphId] === 1) {
        this.messageDispatcher.post(this.onPointComplete);
      }
    }
  }

  get headMesh() {
    return [this._view];
  }

  get currentAimPoint() {
    if (this._state === MorphScene.STATES.REYE) {
      return this._aimPoints.rEye;
    }
    else if (this._state === MorphScene.STATES.LEYE) {
      return this._aimPoints.lEye;
    }
    else if (this._state === MorphScene.STATES.NOSE) {
      return this._aimPoints.nose;
    }
    else if (this._state === MorphScene.STATES.MOUTH) {
      return this._aimPoints.mouth;
    }
    else if (this._state === MorphScene.STATES.FACE) {
      return this._aimPoints.face;
    }

    return new THREE.Vector3();
  }
}
