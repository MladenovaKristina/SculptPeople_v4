import { TextureLoader, Cache } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import assets from '../../../data/3d/models/fourCharacters_assets.glb';



export default class Loader3D {
  constructor() {
    this.textureLoader = new TextureLoader();
    this.GLBLoader = new GLTFLoader();

    this._count = 0;
  }

  load() {
    const objects = [
      { name: 'assets', asset: assets }
    ];

    const textures = [

    ];

    this._count = objects.length + textures.length;

    return new Promise((resolve, reject) => {
      if (this._count === 0)
        resolve(null);

      objects.forEach((obj, i) => {
        this.GLBLoader.load(obj.asset, (object3d) => {
          Cache.add(obj.name, object3d);
          this._count--;

          if (this._count === 0)
            resolve(null);
        });
      });

      textures.forEach((txt) => {
        const textureMain = this.textureLoader.load(txt.asset);
        textureMain.flipY = false;
        Cache.add(txt.name, textureMain);

        this._count--;

        if (this._count === 0)
          resolve(null);
      });
    });
  }
}