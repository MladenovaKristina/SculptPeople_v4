import * as THREE from 'three';
import UTween from '../../../../utils/utween';

export default class Stick extends THREE.Group {
  constructor(scene) {
    super();
    this._scene = scene;
    this._view = null;
    this._isDrilling = false;
    this._drillingTweenActive = false;
    this._bigSwipes = false;

    this._createView();
  }

  _createView() {
    const geo = new THREE.SphereGeometry(0.005);
    const mat = new THREE.MeshLambertMaterial({
      color: 0xffc467
    });
    const view = this._view = new THREE.Mesh(geo, mat);
    this._scene.add(view);

    view.scale.set(0.9, 0.9, 65)

    view.position.z = 0.32;
  }

  enableDrilling(value) {
    this._isDrilling = value;

    if (!this._drillingTweenActive && this._isDrilling) {
      this._stepDrill();
    }
  }

  enableBigSwipes() {
    this._bigSwipes = true;
  }

  _stepDrill() {
    this._drillingTweenActive = true;

    let valX, valY, time;

    if (this._bigSwipes) {
      valX = Math.random() * 0.3 - 0.15;
      valY = Math.random() * 0.3 - 0.15;
      time = (Math.abs(valX) + Math.abs(valY)) * 2;
    }
    else {
      valX = Math.random() * 0.1 - 0.05;
      valY = Math.random() * 0.1 - 0.05;
      time = (Math.abs(valX) + Math.abs(valY)) * 4;
    }

    const swipeTween = new UTween(this._view.rotation, {
      x: [valX, 0],
      y: [valY, 0]
    }, time);

    swipeTween.on('complete', msg => {
      if (this._isDrilling) {
        this._stepDrill();
      }
      else {
        this._drillingTweenActive = false;
      }
    });
  }

  hide() {
    new UTween(this.position, {
      y: 1
    }, 0.5);
  }
}
