import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import Layout3d from "./3d-layout";
import { Black } from '../../../utils/black-engine.module';

export default class SceneController extends THREE.Object3D {
    constructor(scene, layout2d) {
        super();
        this._scene = scene;
        this._layout2d = layout2d;

        this._initScenes();
        this.paintScene();
        // this.morphClayScene();
        // this.selectClayScene()
    }
    _initScenes() {
        this._layout3d = new Layout3d();
        this._scene.add(this._layout3d);
    }
    selectClayScene() {
        this.sceneNumber = 0;
        console.log(this.sceneNumber, "select clay")
        this._layout2d.showClay();
    }

    morphClayScene(clay) {
        this.sceneNumber = 1;

        this._layout2d.hideClay(() => {
            this._layout3d.initMorphScene(this._scene);
        });
        console.log(this.sceneNumber, " morph selected clay index", clay)
    }
    paintScene() {
        console.log(this.sceneNumber, " paint")

        this.sceneNumber = 2;
        this._layout2d.selectionUI();
    }


    decorateScene() {
        this.sceneNumber = 3;
        console.log(this.sceneNumber, " decorate")
    }
    bodyScene() {
        this.sceneNumber = 4;

        console.log(this.sceneNumber, " body")
    }

    onDown(x, y) {
        if (this.sceneNumber == 0) {
            this._layout2d._clay.onDown(x, y);
        }

        if (this.sceneNumber == 1) {
            this._layout3d._morphScene.onDown(x, y)
        }
        if (this.sceneNumber == 2) {
            this._layout2d._dock.onDown(x, y)
        }
    };
    onUp() {
        if (this.sceneNumber == 1) {
            this._layout3d._morphScene.onUp()
        }
    };
    onMove(x, y) {
        if (this.sceneNumber == 1) {
            this._layout3d._morphScene.onMove(x, y)
        }
        if (this.sceneNumber == 2) {
            this._layout2d._dock.onMove(x, y)
        }
    };
}