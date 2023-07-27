import * as THREE from "three";
import Head from "../controls/head";
import Stick from "../controls/stick";
import StickController from "../controls/stick-controller";

export default class PaintScene extends THREE.Object3D {
    constructor(head, scene, renderer, camera) {
        super();
        this._head = head;
        this._scene = scene;
        this._renderer = renderer;
        this._camera = camera;

        this.add(this._head);

    }
}