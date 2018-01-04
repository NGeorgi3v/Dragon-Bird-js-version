function Bullet(options){
    var canvas = document.getElementById("bullet_canvas"),
        ctx = canvas.getContext("2d"),
        image = document.getElementById("dragon_blast");
    this.x = 0;
    this.y = 0;
    canvas.setAttribute("width", options.width);
    canvas.setAttribute("height", options.height);
    this.body = createPhysicalBody({
        coordinates: {
            x: this.x,
            y: this.y
        },
        speed: {
            x: 10,
            y: 0
        },
        height: image.height,
        width: image.width
    });
    this.lastCoordinates = this.body.coordinates;
    this.draw = function(){
        ctx.clearRect(this.lastCoordinates.x-10,
            this.lastCoordinates.y,
            this.body.width * 1.5,
            this.body.height * 1.5)
        ctx.drawImage(
            image,
            this.lastCoordinates.x,
            this.lastCoordinates.y,
            this.body.width,
            this.body.height
        );
    }

    this.update = function(){
        this.lastCoordinates = this.body.move();
    }

    this.passed = function(dragon){
        if(this.lastCoordinates.x-this.body.width >=  dragon.lastCoordinates.x+dragon.body.width)
        {
            return true;
        }else{
            return false;
        }
    }

    this.clear = function(){
        ctx.clearRect(this.lastCoordinates.x-10,
            this.lastCoordinates.y,
            this.body.width * 1.5,
            this.body.height * 1.5)
    }

    this.isOffscreen = function(){
        if(this.lastCoordinates.x > canvas.width){
            return true;
        }
    }
}