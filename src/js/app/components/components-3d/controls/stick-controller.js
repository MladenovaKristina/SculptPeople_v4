import Helpers from '../../../helpers/helpers';
import * as THREE from 'three'

export default class StickController {
  constructor(head, stick) {
    this._head = head;
    this._raycastArray = head.headMesh;
    this._stick = stick;

    this._raycaster = new THREE.Raycaster();

    this._originPosition = { x: 0, y: 0 };

    this._start = { x: 0, y: 0 };
    this._prevPosition = { x: 0, y: 0 };

    this._stick.position.x = 0.04;
    this._stick.position.y = -0.05;
    this._stick.position.z = 0.2;

    this._stick.rotation.x = -this._stick.position.y * 2;
    this._stick.rotation.y = this._stick.position.x * 2;
  }

  setState(state) {

  }

  onDown(x, y) {
    this._start = { x: x, y: y };
    this._prevPosition = { x: this._originPosition.x, y: this._originPosition.y };
  }

  onUp() {
    this._startX = { x: 0, y: 0 };
    this._head.enableDrilling(false);
  }

  onMove(x, y) {
    const diffX = x - this._start.x;
    const diffY = this._start.y - y;

    this._originPosition.x = Helpers.clamp(this._prevPosition.x + diffX / 500, -0.2, 0.2);
    this._originPosition.y = Helpers.clamp(this._prevPosition.y + diffY / 500, -0.2, 0.2);

    this._raycast();
  }

  _raycast() {
    const origin = new THREE.Vector3(this._originPosition.x, this._originPosition.y, 0.5);
    const target = new THREE.Vector3(0, 0, -0.5);
    const direction = new THREE.Vector3().subVectors(target, origin).normalize();

    this._raycaster.set(origin, direction);
    const intersects = this._raycaster.intersectObjects(this._raycastArray);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      this._stick.position.x = point.x;
      this._stick.position.y = point.y;
      this._stick.position.z = point.z;

      this._stick.rotation.x = -point.y * 2;
      this._stick.rotation.y = point.x * 2;

      this._head.rotation.y = -point.x * 2;
      this._head.rotation.x = point.y * 2;

      this._updateDrilling();
    }
  }

  _updateDrilling() {
    const currentAimPoint = new THREE.Vector3(
      this._head.currentAimPoint.x,
      this._head.currentAimPoint.y - 0.01,
      this._head.currentAimPoint.z
    );


    if (this._stick.position.distanceTo(currentAimPoint) < 0.034) {
      this._head.enableDrilling(true);
      this._stick.enableDrilling(true)
    }
    else {
      this._head.enableDrilling(false);
      this._stick.enableDrilling(false)
    }
  }

  onUpdate(dt) {

  }

  get stickPosition() {
    return this._stick.position;
  }
}
