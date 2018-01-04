function createPhysicalBody(options){
    
    function move(){
        // var lastCoordinates = JSON.parse(JSON.stringify(this.coordinates));
        var lastCoordinates = {x: this.coordinates.x, y: this.coordinates.y};

        this.coordinates.x += this.speed.x;
        this.coordinates.y += this.speed.y;

        return lastCoordinates;
    }

    function collidesWith(otherPhysicalBody){
        var p1_coord = {
            x: this.coordinates.x+this.width/2,
            y: this.coordinates.y+this.height/2
        },
        p2_coord = {
            x: otherPhysicalBody.coordinates.x+otherPhysicalBody.width/2,
            y: otherPhysicalBody.coordinates.y+otherPhysicalBody.height/2        
        },
        phBd1_rx = this.width/2,
        phBd2_rx = otherPhysicalBody.width/2,
        phBd1_ry = this.height/2,
        phBd2_ry = otherPhysicalBody.height/2;
        // void ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        if( (distanceBetweenPoints(p1_coord, p2_coord) < phBd1_rx+phBd2_rx) || (distanceBetweenPoints(p1_coord, p2_coord) < phBd1_ry+phBd2_ry)) {
           return true;
        }else{
            return;
        }
    }

    function applyGravity(height, gravity){
        if(this.coordinates.y >= (height - this.height*2)){
            this.coordinates.y = (height - this.height*2);
            return;
        }
        this.speed.y += gravity;
    }

    var physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed,
        height: options.height,
        width: options.width,
        move: move,
        collidesWith: collidesWith,
        applyGravity: applyGravity
    };

    return physicalBody;
}