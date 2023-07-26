import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, MessageDispatcher, Ease, Timer } from '../../../utils/black-engine.module';
import UTween from '../../helpers/../../utils/utween';
import { TutorialHand } from './tutorial-hand';

export default class Dock extends DisplayObject {
    constructor() {
        super();
        this.scaleX = 1;
        this.scaleY = 1;
        this.numberOfClayElements = 4;
        this.claySize = Black.stage.bounds.width / (this.numberOfClayElements + 2);
        this.visible = true;
        this.canMove = false;

        this.onClaySelectEvent = 'onClaySelectEvent';
        this.selectedClay = null;

    }

    onAdded() {
        const bb = Black.stage.bounds;
        this.positionY = bb.bottom - this.claySize * 2;
        let offset = (bb.width / (this.numberOfClayElements + 2)) / this.numberOfClayElements, spacing = (bb.width - (this.numberOfClayElements * this.claySize)) / this.numberOfClayElements;

        this._container = new Graphics();
        this._container.fillStyle(0xffffff, 0.8);
        this._container.rect(0, this.positionY - this.claySize / 2, bb.width, this.claySize * 2);
        this._container.fill();
        this.add(this._container);

        this.duplicate = new Graphics();
        this.duplicate.visible = false;
        this.add(this.duplicate);
        this.position = [];

        for (let i = 0; i < this.numberOfClayElements; i++) {
            const clay = new Graphics();
            clay.fillStyle(0x000000, 1);
            clay.roundedRect(0 + offset, this.positionY, this.claySize, this.claySize, 30);
            offset += this.claySize + spacing;
            clay.fill();
            this._container.add(clay);
            this.position.push(offset)
        }

        this._hand = new TutorialHand();
        this._hand.x = 0;
        this._hand.y = 0;
        this.add(this._hand);

        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'INFINITY ONLY') this._hand.visible = false;
    }

    show() {
        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'NONE') return;
        console.log('show');
        this.visible = true;
        this._hand.start();
        this.startHint();
    }

    startHint() {
        this._hintTimer = new Timer(1.2, Infinity);
        this.add(this._hintTimer);

        const getCounter = function () {
            let value = 0;
            return function () { return value++; };
        };
        const count = getCounter();

        this._hintTimer.on('tick', msg => {
            this._makeStep(count);
        });

        this._hand.visible = true;
        this._makeStep(count);
    }

    _makeStep(count) {
        const children = this._container.mChildren;
        console.log
        if (children.length === 0) {
            this._stopHint();
            return;
        }
        const index = count() % children.length;
        this._hand.x = this.position[index] - this.claySize;
        this._hand.y = this.positionY + this._hand.height / 4;
        this._hand.tap();
    }


    hide(callback) {

        const hideTween = new Tween({
            y: Black.stage.bounds.bottom + 250
        }, 0.2);


        this.add(hideTween);

        hideTween.on('complete', msg => { this.visible = false; callback(); });

    }

    _stopHint() {
        this._hint.visible = false;
        this._hintTimer && this._hintTimer.stop();
    }

    onDown(x, y) {
        this._hand.visible = false;

        const blackPos = Black.stage.worldTransformationInverted.transformVector({ x, y });

        this.getObjectAtPosition(blackPos.x, blackPos.y);
    }

    getObjectAtPosition(x, y) {

        for (let i = 0; i < this.position.length; i++) {
            const minX = Math.abs(this.position[i] - this.claySize * 2);
            const maxX = this.position[i];
            const minY = this.positionY;
            const maxY = this.positionY + this.claySize;
            if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
                this.selectElement = i;
                this.canMove = true;
            }
        }
    };

    moveObjectToPosition() {
        //get bounds of head object, if element x,y is within bounds, make object visible on head. if not, visible dock element=true,duplicate.visible=false;.
        const bounds = [window.innerWidth / 2, window.innerHeight / 2, 300, 300];//dummy x,y,width,height

        const minX = bounds[0] + bounds[2];
        const maxX = bounds[0] + bounds[2] * 2;
        const minY = bounds[1] - bounds[3];
        const maxY = bounds[1] + bounds[3];

        if (this.duplicate.x >= minX && this.duplicate.x <= maxX) {
            console.log("on head")
        } else console.log("reset")
    }
    onMove(x, y) {
        if (x > 137 && y > 233 && x < 237 && y < 433) console.log(x, y)
        if (this.canMove) {
            const blackPos = Black.stage.worldTransformationInverted.transformVector({ x, y });
            this.duplicate = this._container.mChildren[this.selectElement];
            this.duplicate.x = blackPos.x - this.claySize - this.position[this.selectElement] / 2;
            this.duplicate.y = blackPos.y - this.positionY - this.claySize / 2;
            this.duplicate.visible = true;
            this._hand.x = blackPos.x;
            this._hand.y = blackPos.y;
            this._hand.visible = true;
        }

    }

    onUp() {
        this.moveObjectToPosition();
    };

}
