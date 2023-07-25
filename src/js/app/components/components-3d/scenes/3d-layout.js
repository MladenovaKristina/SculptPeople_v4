import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import Character from "./character";

export default class Layout3d extends THREE.Object3D {
  constructor(scene) {
    super();
    this._scene = scene;
    this._initView();
  }

  _initView() {
    this._initCharacter();
    this._initEnvironment
  }

  _initCharacter() {
    this._character = new Character(this._scene);
    this.add(this._character);
  }

  _initEnvironment() {
    this._environment = new Environment(this._scene);
    this.add(this._environment);
  }
}