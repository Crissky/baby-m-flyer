import { BasicObject } from "../basic/basicObject.js";

export class ShyguyRed extends BasicObject {
    constructor(sprites, canvas, debug=false) {
        super(sprites, canvas,
            29, 77, 27, 30, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }

    render() {
        super.render();
    }
}

export class ShyguyGreen extends BasicObject {
    constructor(sprites, canvas, debug=false) {
        super(sprites, canvas,
            0, 77, 27, 30, -100, 0,
            0, 0,
            4, 4, 4, 4,
            1, debug);
    }

    render() {
        super.render();
    }
}