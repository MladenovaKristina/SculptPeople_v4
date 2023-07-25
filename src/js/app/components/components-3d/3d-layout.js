import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import Environment from "./environment";
import MorphScene from "./scenes/morph-clay-scene";

export default class Layout3d extends THREE.Object3D {
  constructor(scene) {
    super();
    this._scene = scene;
    this._initEnvironment();
  }
  _initEnvironment() {
    this._environment = new Environment(this._scene);
    this.add(this._environment);
  }

  initMorphScene(scene) {
    this._morphScene = new MorphScene(scene);
  }
}