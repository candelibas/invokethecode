/* Game Config */ 
kontra.init();
kontra.context.imageSmoothingEnabled = false; // for pixel art
kontra.context.webkitImageSmoothingEnabled = false;
kontra.context.oImageSmoothingEnabled = false;
kontra.assets.imagePath = 'assets/sprites/';


kontra.assets.load('mage.png', 'portal.png').then((wut) => {

  let totalTypingCount = 0;
  let typingCount = 0;
  let ultiPressed = false;
  let skillCombos = ['qqq', 'qqe', 'qqw', 'www', 'wwq', 'wwe', 'eee', 'eew', 'eeq'];
  /* PLAYER */
  let player = kontra.sprite({
    x: 60,
    y: 84,
    image: kontra.assets.images.mage,
    type: 'player',
    rotation: 0
  });

  /* BACKGROUNDS */
  let winBackground = kontra.sprite({
    width: kontra.canvas.width,
    height: kontra.canvas.height,
    color: 'purple'
  });


  let loseBackground = kontra.sprite({
    width: kontra.canvas.width,
    height: kontra.canvas.height,
    color: '#413d5e',
  });

  /* ELEMENTS */
  let quasEffect = kontra.sprite({
    x: kontra.canvas.width / 2 - 50,
    y: kontra.canvas.height / 2 + 220,
    width: 7,
    height: 7,
    color: '#33FFF8',
    dy: .1
  });

  let wexEffect = kontra.sprite({
    x: kontra.canvas.width / 2 - 30,
    y: kontra.canvas.height / 2 + 190,
    width: 7,
    height: 7,
    color: '#EC18FF',
    dy: .1
  });

  let exortEffect = kontra.sprite({
    x: kontra.canvas.width / 2 + 50,
    y: kontra.canvas.height / 2 + 215,
    width: 7,
    height: 7,
    color: '#FF6C00',
    dy: .1
  });

  /* PORTAL */
  let portal = kontra.sprite({
    x: 105,
    y: 135,
    image: kontra.assets.images.portal,
    type: 'portal'
  });

    
    // Main loop
    let loop = kontra.gameLoop({
      update() { // update the game state;
        /* sprites.map(sprite => {
          sprite.update();
        });*/

        
        loseBackground.update();
        player.update();
        quasEffect.update();
        wexEffect.update();
        exortEffect.update();

        /* Elements with tweens */
        if(quasEffect.y > kontra.canvas.height / 2 + 230) {
          quasEffect.dy -= 0.1;
        }
        if(quasEffect.y < kontra.canvas.height / 2 + 220) {
          quasEffect.dy += 0.1;
        }
        if(wexEffect.y > kontra.canvas.height / 2 + 200) {
          wexEffect.dy -= 0.1;
        }
        if(wexEffect.y < kontra.canvas.height / 2 + 190) {
          wexEffect.dy += 0.1;
        }
        if(exortEffect.y > kontra.canvas.height / 2 + 215) {
          exortEffect.dy -= 0.1;
        }
        if(exortEffect.y < kontra.canvas.height / 2 + 205) {
          exortEffect.dy += 0.1;
        }

        let timer = 0;
        setTimeout(() => {
          loseBackground.y -= 0.1;
          timer += 1;
          console.log(timer);
        }, 2000);
        
        // Input controls
        if(kontra.keys.pressed('r')) {
          ultiPressed = true;

          startShake();
          //playerRotation += 1 ;
          loseBackground.y += 1;

          
        } else {
          ultiPressed = false;
        }

        console.log('ULTI PRESSED: ' + ultiPressed);
        
        
        if(loseBackground.y < kontra.canvas.height) {
          // console.log('dead');
        }
      },
      render() {

        //sprites.map(sprite => sprite.render());

        preShake();
        portal.context.save();
        portal.context.scale(3, 3);
        portal.render();
        portal.context.restore();
        postShake(); 

        loseBackground.render();
        
        player.context.save();
        player.context.scale(6, 6);
        //this.context.translate(this.x, this.y);
        //this.context.rotate(degreesToRadians(this.rotation));
        player.render();
        player.context.restore();

        quasEffect.render();
        wexEffect.render();
        exortEffect.render();
  
      }
    });

    loop.start(); 
  })
  .catch(err => console.log(err));