import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import { ColorScatter } from "../../../utils/black-engine.module";

export default class Environment extends THREE.Object3D {
    constructor(scene) {
        super();
        this._scene = scene;
        this._initView();
    }

    _initView() {
        console.log("environment")
    }
}