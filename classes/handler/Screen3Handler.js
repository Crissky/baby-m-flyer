import { PlatformHandler } from "./PlatformHandler.js";
import { randomIntFromInterval } from "../../utils/Random.js";
import { MuftiShyguy } from "../enemies/MuftiShyguy.js";
import { WoodenLegShyguy } from "../enemies/WoodenLegShyguy.js";
import { FlyShyguy } from "../enemies/FlyShyguy.js";
import { FireBall } from "../enemies/FireBall.js";
import { JumpGuy } from "../enemies/JumpGuy.js";

export class Screen3Handler {
    constructor(canvas, floor, debug) {
        this.canvas = canvas;
        this.floor = floor;
        this.debugMode = debug;
        this.distanceBetweenX = canvas.width;
        this.enemyList = [];
        this.platformHandler = new PlatformHandler(canvas, debug);
    }

    update(speedScreen) {
        if (this.enemyList.length < 1 && this.platformHandler.isEmpty()) {
            this.appendEnemy(speedScreen);
        }
        if (this.getMaxElementPosition() < (this.canvas.width - this.distanceBetweenX)) {
            this.appendEnemy(speedScreen);
        }
        this.enemyList.forEach(enemy => {
            let speed = speedScreen;
            if (enemy instanceof WoodenLegShyguy) {
                speed = speedScreen + 2;
            }
            enemy.update(speed);
        });

        this.enemyList = this.enemyList.filter(function (enemy, index, arr) { // Remove Enemies off the left side of the screen.
            return (enemy.getEndPosX() > 0);
        });

        this.platformHandler.update(speedScreen);
    }

    render() {
        this.enemyList.forEach(enemy => {
            enemy.render();
        });

        this.platformHandler.render();
    }

    reset() {
        this.enemyList = [];
        this.platformHandler.reset();
        this.distanceBetweenX = this.canvas.width;
    }

    updateRateSpawn(level = 1) {
        let newDBX = (this.canvas.width * (1 - level / 20))
        this.distanceBetweenX = newDBX < 0 ? 1 : newDBX;
    }

    appendEnemy(speedScreen) {
        let enemy = new MuftiShyguy(this.canvas, this.debugMode);
        let choice = randomIntFromInterval(1, 6);
        // choice = 3;

        switch (choice) {
            case 1:
                enemy = new WoodenLegShyguy(this.canvas, this.debugMode);
                break;
            case 2:
                enemy = new FlyShyguy(this.canvas, this.floor, this.debugMode);
                break;
            case 3:
                enemy = new FireBall(this.canvas, this.floor, this.debugMode);
                enemy.sizeMultiplier += speedScreen / 5
                break;
            case 4:
                enemy = new JumpGuy(this.canvas, this.debugMode);
                break;
            case 5:
                this.platformHandler.appendPlatform(speedScreen, this.floor.posY, randomIntFromInterval(1, 5 * speedScreen));
                return;
            default:
                break;
        }

        enemy.posX = this.canvas.width + randomIntFromInterval(100, 200);
        enemy.setEndPosY(this.floor.posY);
        this.enemyList.push(enemy);
    }

    getMaxElementPosition() {
        let platformPosX = 0;
        let lastEnemyPosX = 0;
        if (!this.platformHandler.isEmpty()) {
            platformPosX = this.platformHandler.getLastPlatform().posX;
        }
        if (this.enemyList.length > 0) {
            lastEnemyPosX = this.getLastEnemy().posX;
        }

        return Math.max(platformPosX, lastEnemyPosX);
    }

    removeFirstEnemy() {
        this.enemyList.shift();
    }

    getLastEnemy() {
        return this.enemyList.slice(-1)[0];
    }
}