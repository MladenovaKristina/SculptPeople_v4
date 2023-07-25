import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import { ColorScatter } from "../../../utils/black-engine.module";

export default class Assets extends THREE.Object3D {
    constructor(scene) {
        super();
        this._scene = scene;
        this._initView();

        this.scaleX = 0.1;
        this.scaleY = 0.1;
        this.visible = false;
    }

    _initView() {
        this.asset = THREE.Cache.get('assets').scene;
        this.asset.traverse((child) => {
            console.log(child.name)
        });

        this.add(this.asset)
    }
}