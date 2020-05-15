import { Bill } from "../enemies/Bill.js";
import { randomIntFromInterval } from "../../utils/Random.js";

export class BillHandler {
    constructor(canvas, debug) {
        this.canvas = canvas;
        this.debugMode = debug;
        this.billList = [];
        this.distanceBetweenX = (canvas.width * 0.7);
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
    
    appendBill() {
        let bill = new Bill(this.canvas, this.debugMode);
        bill.posX = this.canvas.width + randomIntFromInterval(100, 200);
        bill.posY = randomIntFromInterval(30, (this.canvas.height - 200));

        this.billList.push(bill);
    }

    removeBill() {

    }
}