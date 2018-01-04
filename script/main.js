window.addEventListener("load", function(){ 

    var WIDTH  = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    HEIGHT     = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    frameCount = 0,
    animate    = false,
    pause      = false,
    dimensions = {width: WIDTH, height: HEIGHT},
    background = new Background(dimensions),
    dragon     = new Dragon(dimensions),
    pipes       = [],
    bullets    = [],
    curBullet  = null,
    prevBullet = null,
    points = 0;
    



    background.draw();
    dragon.draw();

    function gameLoop(){
        dragon.body.applyGravity(dimensions.height, 0.6);
        dragon.update({frameCount: frameCount});
        dragon.draw();
        background.update();
        background.draw();
        for(var i = bullets.length-1; i >= 0; i--){
            bullets[i].update();
            bullets[i].draw();
            for (var k = pipes.length-1; k >= 0; k--) {
                if(bullets[i].body.collidesWith(pipes[k].top_body) || bullets[i].body.collidesWith(pipes[k].bottom_body)){
                    bullets[i].clear();
                    bullets.splice(i, 1);
                    k=0;
                    i=0;
                }
            }

            if(bullets.length > 0){
                if(bullets[i].isOffscreen()){
                    bullets.splice(i, 1);
                }
            }
        }
        
        for(var j = pipes.length-1; j >= 0; j--){
            pipes[j].update();
            pipes[j].draw();
            if(dragon.body.collidesWith(pipes[j].top_body) || dragon.body.collidesWith(pipes[j].bottom_body)){
                alert("Points: "+points+". Game Over !");
                animate = false;

            }
            if( dragon.passed(pipes[j]) && !pipes[j].passed ){
                console.log("point");
                pipes[j].passed = true;
                points++;
            }
            if(pipes[j].isOffscreen()){
                pipes.splice(j, 1);
            }
        }


        if(frameCount % 100 === 0){
            pipes.push(new Pipe(dimensions));
        }
        frameCount++;
        if(animate){
            requestAnimationFrame(gameLoop);
        }

    }
    
    

    window.addEventListener("keyup", function(e){
        checkKey(e.keyCode);
    });

    function checkKey(key){
        switch(key){
            case 38: // UP Arrow
                if(animate){ dragon.jump(); }
                break;
            case 80: // P - Pause
                animate = false;
                pause = true;
                break;
            case 32:
                if(animate){
                    bullets.push(new Bullet(dimensions));

                    if(bullets.length > 1){
                         prevBullet= bullets[bullets.length-2];
                         curBullet = bullets[bullets.length-1];
                        if(prevBullet.passed(dragon)){
                            dragon.shoot(curBullet.body);
                        }else{
                            bullets.splice(bullets.length-1, 1)
                            return;
                        }
                    }else{
                        dragon.shoot(bullets[bullets.length-1].body); 
                    }
                }
                break;
            case 13: // Enter - Starting game and disabling pause
                if(!animate){
                    animate = true;
                    gameLoop();
                }
                animate = true;
                pause = false;
                break;
            default:
                break;    
        }
    }
    
});