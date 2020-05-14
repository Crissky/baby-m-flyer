export function getAngle(x1, y1, x2, y2) {
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    return angle;
}

export function getProportionalVector(origin, target, targetMagnitude) {
    let coorOrigin = origin.getCenterPos();
    let coorTarget = target.getCenterPos();
    let deltaX = coorOrigin.posX - coorTarget.posX;
    let deltaY = coorOrigin.posY - coorTarget.posY;
    let magnitude = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    let multiplier = magnitude / targetMagnitude;
    let mSpeedX = deltaX / multiplier;
    let mSpeedY = deltaY / multiplier;

    console.log("getProportionalVector()", "mSpeedX", mSpeedX, "mSpeedY", mSpeedY)
    return { speedX: mSpeedX, speedY: -mSpeedY };
}

// export function getProportionalVector(x1, y1, x2, y2, targetMagnitude) {
//     let deltaX = x2 - x1;
//     let deltaY = y2 - y1;
//     let magnitude = Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2) );
//     let multiplier = magnitude / targetMagnitude;
//     let mSpeedX = deltaX / multiplier;
//     let mSpeedY = deltaY / multiplier;

//     console.log("mSpeedX", mSpeedX, "mSpeedY", mSpeedY)
//     return {speedX: mSpeedX, speedY: -mSpeedY};
// }