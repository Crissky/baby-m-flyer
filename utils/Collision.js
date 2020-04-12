export function isCollision(object1, object2) {
    let area1 = object1.getArea();
    let area2 = object2.getArea();
    let result = false;
    if(area1.x1 < area2.x2 && area1.x2 > area2.x1 && area1.y1 < area2.y2 && area1.y2 > area2.y1) {
        result = true;
    }
    return result;
};