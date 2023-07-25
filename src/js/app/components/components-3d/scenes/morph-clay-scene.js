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

        this._state = MorphScene.STATES.REYE;
        this._head = new Head(this._scene, MorphScene.STATES);
        this.add(this._head);

        this._head.setState(this._state)

        this._stick = new Stick(this._scene);
        this.add(this._stick);

        this._stickController = new StickController(this._head, this._stick);
        this._setNextAimPoint();

    }

    onUpdate(dt) {
        this._head.onUpdate(dt);
    }

    onDown(x, y) {
        this._stickController.onDown(x, y);
    }

    onUp() {
        this._stickController.onUp();
    }

    onMove(x, y) {
        this._stickController.onMove(x, y);
    }

    _showCheersText() {
    }

    _setNextAimPoint() {
        this._head.setState(this._state);
        this._head.enableDrilling(false);

        if (this._state === MorphScene.STATES.FACE) this._stick.enableBigSwipes();
        this._stick.enableDrilling(false);

    }

    enableStoreMode() {
        if (this._isStoreMode) return;
        this._isStoreMode = true;

        this._state = MorphScene.STATES.FINAL;

        this._head.enableDrilling(false);
        this._head.reset();

        this._stick.enableDrilling(false);

        this._stick.hide();
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
