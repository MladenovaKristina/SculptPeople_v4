import * as THREE from "three";
import Helpers from "../../helpers/helpers";

export default class SceneController extends THREE.Object3D {
    constructor(scene, layout2d) {
        super();
        this._scene = scene;
        this._layout2d = layout2d;

        this.selectClayScene()

    }

    selectClayScene() {
        console.log("scene1, select clay")
        this._layout2d.showClay();
    }

    morphClayScene(clay) {
        console.log("scene1, morph selected clay index", clay)
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