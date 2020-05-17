import { Bill } from "../enemies/Bill.js";
import { randomIntFromInterval } from "../../utils/Random.js";
import { RocketShyguy } from "../enemies/RocketShyguy.js";

export class BillHandler {
    constructor(canvas, player, debug) {
        this.canvas = canvas;
        this.player = player;
        this.debugMode = debug;
        this.billList = [];
        this.distanceBetweenX = canvas.width;
    }

    update(speedScreen) {
        if(this.billList.length < 1) {
            this.appendBill();
        }
        if (this.billList.length > 0 && this.billList.slice(-1)[0].posX < (this.canvas.width - this.distanceBetweenX)) {
            this.appendBill();
        }

        this.billList.forEach(bill => {
            bill.update(speedScreen * 2);
        });

        this.billList = this.billList.filter(function(bill, index, arr) {
            return (bill.getEndPosX() > 0);
        });
    }

    render() {
        this.billList.forEach(bill => {
            bill.render();
        });
    }

    reset() {
        this.billList = [];
    }
    
    updateLevel(level=1) {
        this.distanceBetweenX = (this.canvas.width * (1 - level/10));
    }

    appendBill() {
        let bill = new Bill(this.canvas, this.debugMode);

        let choice = randomIntFromInterval(1, 16);
        switch (choice) {
            case 1:
                bill = new RocketShyguy(this.canvas, this.player, this.debugMode);
                break;
            default:
                break;
        }

        bill.posX = this.canvas.width + randomIntFromInterval(100, 200);
        bill.posY = randomIntFromInterval(30, (this.canvas.height - 200));
        this.billList.push(bill);
    }

    removeBill() {

    }
}