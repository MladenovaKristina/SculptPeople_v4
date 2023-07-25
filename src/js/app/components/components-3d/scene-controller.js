import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import Layout3d from "./3d-layout";

export default class SceneController extends THREE.Object3D {
    constructor(scene, layout2d) {
        super();
        this._scene = scene;
        this._layout2d = layout2d;

        this._initLayout3d();
        this.selectClayScene()

    }

    _initLayout3d() {
        this._layout3d = new Layout3d();
        this._scene.add(this._layout3d);
    }

    selectClayScene() {
        console.log("scene1, select clay")
        this._layout2d.showClay();
    }

    morphClayScene() {
        console.log("scene1, morph")
    }
    paintScene() {
        console.log("scene2, paint")
    }
    decorateScene() {
        console.log("scene3, decorate")
    }
    bodyScene() {
        console.log("scene4, body")
    }

    onDown(x, y) {
        // console.log("down", x, y)
    };
    onUp() {
        // console.log("up")
    };
    onMove(x, y) {
        // console.log("move", x, y)
    };
}