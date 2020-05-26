import { Bill } from "../enemies/Bill.js";
import { randomIntFromInterval } from "../../utils/Random.js";
import { RocketShyguy } from "../enemies/RocketShyguy.js";

export class BillHandler {
    constructor(canvas, player, debug = false) {
        this.canvas = canvas;
        this.player = player;
        this.debugMode = debug;
        this.billList = [];
        this.distanceBetweenX = canvas.width;
        this.rateSpecialSpawn = 1;
        this.baseSpecialSpawn = 100;
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
        this.rateSpecialSpawn = 1;
        this.distanceBetweenX = this.canvas.width;
    }
    
    updateRateSpawn(level=1) {
        let newDBX = (this.canvas.width * (1 - level/20))
        this.distanceBetweenX = newDBX < 0 ? 1 : newDBX;
        this.rateSpecialSpawn = level;
    }

    appendBill() {
        let bill = new Bill(this.canvas, this.debugMode);
        bill.sizeMultiplier = 1 + (this.rateSpecialSpawn / 5)
        let rocketChance = (this.baseSpecialSpawn / this.rateSpecialSpawn);
        rocketChance = rocketChance < 2 ? 2 : rocketChance;
        
        let choice = randomIntFromInterval(1, rocketChance);
        switch (choice) {
            case 1:
                bill = new RocketShyguy(this.canvas, this.player, this.debugMode);
                break;
            default:
                break;
        }

        bill.posX = this.canvas.width + randomIntFromInterval(100, 200);
        bill.posY = randomIntFromInterval(30, (this.canvas.height - 200));
        // if(this.player.status === this.player.enumStatus.FIXED) {
        //     let min = this.player.getCenterPosY() - 20;
        //     let max = this.player.getCenterPosY() + 20;
        //     bill.posY = randomIntFromInterval(min, max);
        // }
        this.billList.push(bill);
    }

    removeBill() {

    }
}