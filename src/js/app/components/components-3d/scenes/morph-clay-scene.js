import * as THREE from "three";
import Head from "../controls/head";
import Stick from "../controls/stick";
import StickController from "../controls/stick-controller";

export default class MorphScene extends THREE.Object3D {
    constructor(scene, renderer, camera) {
        super();
        this._scene = scene;
        this._renderer = renderer;
        this._camera = camera;

        this._head = new Head(this._scene);
        this._scene.add(this._head);


        //         this._stick = new Stick(this._scene);
        //         this.add(this._stick);
        // 
        //         this._stickController = new StickController(this._head, this._stick);

    }

    onUpdate(dt) {
        // this._head.onUpdate(dt);
    }

    onDown(x, y) {
        // this._stickController.onDown(x, y);
    }

    onUp() {
        // this._stickController.onUp();
    }

    onMove(x, y) {
        // this._stickController.onMove(x, y);
    }

    _showCheersText() {
    }

    _setNextAimPoint() {
        this._head.setState(this._state);
        this._head.enableDrilling(false);

        if (this._state === MorphScene.STATES.FACE) this._stick.enableBigSwipes();
        this._stick.enableDrilling(false);

    }

    _vector3ToBlackPosition(vector) {
        const screenVector = vector.clone();
        screenVector.project(this._camera.threeCamera);
        return {
            x: (screenVector.x + 1) * this._renderer.threeRenderer.domElement.width / 2,
            y: (-screenVector.y + 1) * this._renderer.threeRenderer.domElement.height / 2,
        };
    }
}

MorphScene.STATES = {
    REYE: 0,
    LEYE: 1,
    NOSE: 2,
    MOUTH: 3,
    FACE: 4,
    FINAL: 5
};
