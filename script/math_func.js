function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function distanceBetweenPoints(point1, point2){
    xa = point2.x;
    xb = point1.x;
    ya = point2.y;
    yb = point1.y;
    
    return Math.sqrt(Math.pow(xa-xb, 2) + Math.pow(ya-yb, 2));
}