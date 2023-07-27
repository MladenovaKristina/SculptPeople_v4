import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import Environment from "./environment";
import MorphScene from "./scenes/morph-clay-scene";
import PaintScene from "./scenes/paint-head-scene";

export default class Layout3d extends THREE.Object3D {
  constructor(scene) {
    super();
    this._scene = scene;
    this._initEnvironment();
    this.initMorphScene();
    this.initPaintScene();
  }
  _initEnvironment() {
    this._environment = new Environment(this._scene);
    this.add(this._environment);
  }

  initMorphScene(scene) {
    this._morphScene = new MorphScene(this._scene);
    this.add(this._morphScene);
  }

  initPaintScene() {
    this._paintScene = new PaintScene(this._morphScene._head._view);
    this.add(this._paintScene);
  }


}