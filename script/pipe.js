function Pipe(options){ 
    var canvas = document.getElementById("pipe_canvas"),
        ctx = canvas.getContext("2d"),
        body = document.getElementById("pipe_body"),
        top_img = document.getElementById("pipe_top"),
        bottom_img = document.getElementById("pipe_bottom");
    // console.log(pattern, body, ctx, canvas);
    canvas.setAttribute("width", options.width);
    canvas.setAttribute("height", options.height);
    this.pattern = ctx.createPattern(body,'repeat');
    this.x = canvas.width;
    this.y = 0;
    this.minHeight = 0.2*canvas.height;
    this.width = body.width/1.5;
    this.speed = -5;
    this.emptySpace = 0.4*canvas.height;
    this.passed = false;
    this.top_body = createPhysicalBody({
        coordinates: {
            x: this.x,
            y: this.y
        },
        speed: {
            x: this.speed,
            y: 0
        },
        height: getRandomNumber(this.minHeight, canvas.height-(this.minHeight+this.emptySpace)),
        width: this.width
    });
    this.top_lastCoordinates = this.top_body.coordinates;
    
    this.bottom_body = createPhysicalBody({
        coordinates: {
            x: this.x,
            y: this.top_body.height+this.emptySpace
        },
        speed: {
            x: this.speed,
            y: 0
        },
        height: canvas.height-(this.top_body.height+this.emptySpace),
        width: this.width
    });
    this.bottom_lastCoordinates = this.bottom_body.coordinates;
    
    this.draw = function(){
        ctx.clearRect(this.top_lastCoordinates.x,
            this.top_lastCoordinates.y,
            this.top_body.width*2,
            canvas.height);


        ctx.fillStyle = this.pattern;
        ctx.beginPath();
        ctx.moveTo(this.top_lastCoordinates.x,
                   this.top_lastCoordinates.y);
        ctx.rect(this.top_lastCoordinates.x,
                 this.top_lastCoordinates.y,
                 this.top_body.width,
                 this.top_body.height);
        ctx.moveTo(this.bottom_lastCoordinates.x,
                this.bottom_lastCoordinates.y);
        ctx.rect(this.bottom_lastCoordinates.x,
                this.bottom_lastCoordinates.y,
                this.bottom_body.width,
                this.bottom_body.height);
        ctx.fill();
        ctx.closePath();
        ctx.drawImage(bottom_img, this.bottom_lastCoordinates.x ,this.bottom_lastCoordinates.y-10 ,this.width, bottom_img.height);
        ctx.drawImage(top_img, this.top_lastCoordinates.x ,this.top_body.height-(top_img.height-10) ,this.width, top_img.height);
    }

    this.update = function(){
        this.top_lastCoordinates = this.top_body.move();
        this.bottom_lastCoordinates = this.bottom_body.move();
    }

    this.isOffscreen = function(){
        if(this.top_lastCoordinates.x+this.top_body.width < -this.top_body.width){
            return true;
        }
    }
}

