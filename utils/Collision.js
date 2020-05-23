export function isCollision(object1, object2) {
    let area1 = object1.getCollisionRect();
    let area2 = object2.getCollisionRect();
    
    return calculateCollision(area1, area2);
};

export function isMagnetCollision(magnetChar, object2) {
    let area1 = magnetChar.getMagnetCollisionRect();
    let area2 = object2.getCollisionRect();

    return calculateCollision(area1, area2);
};

export function isFloorCollision(walkChar, object2) {
    let area1 = walkChar.getFloorCollisionRect();
    let area2 = object2.getCollisionRect();

    return calculateCollision(area1, area2);
};

function calculateCollision(area1, area2) {
    let result = false;
    area1.forEach(rect1 => {
        area2.forEach(rect2 => {
            if (rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1) {
                result = true;
            }
        });
    });

    return result;
};