/* Game Config */ 
kontra.init();
kontra.context.imageSmoothingEnabled = false; // for pixel art
kontra.context.webkitImageSmoothingEnabled = false;
kontra.context.oImageSmoothingEnabled = false;
kontra.assets.imagePath = 'assets/sprites/';

/* Ending modal */
let endModal = document.getElementById('endModal');
let closeBtn = document.getElementsByClassName("close")[0];
let modalContent = document.getElementById("modal-text");

closeBtn.onclick = () => {
  endModal.style.display = "none";
}
window.onclick = (event) => {
  if (event.target == endModal) {
    endModal.style.display = "none";
  }
} 

/* Sounds */
const ultiSound = new Audio('./assets/sounds/key2.ogg'); 

/* Load assets first before game begins */
kontra.assets.load('mage.png', 'portal.png').then((wut) => {

  const midX = kontra.canvas.width / 2;
  const midY = kontra.canvas.height / 2;

  let win = 0;
  let modalShowed = false;
  let ultiPressed = false;
  let skillCombos = ['qqq', 'qqe', 'qqw', 'www', 'wwq', 'wwe', 'eee', 'eew', 'eeq', 'qwe'];

  const getRandomCombo = () => skillCombos[skillCombos.length * Math.random() | 0];
  let randomSelectedCombo = getRandomCombo();
  let typedCode = '';

  console.log(randomSelectedCombo);


  let keyCheck = {
    q: false,
    w: false,
    e: false
  };
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
    y: 200,
    width: kontra.canvas.width,
    height: kontra.canvas.height,
    color: '#413d5e',
  });

  


  /* ELEMENTS */
  let quasEffect = kontra.sprite({
    x: midX - 50,
    y: midY + 220,
    width: 7,
    height: 7,
    color: '#33FFF8',
    dy:.1,
    radius: 7,
    render: function() {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    }
  });
  let wexEffect = kontra.sprite({
    x: midX - 30,
    y: midY + 190,
    width: 7,
    height: 7,
    color: '#EC18FF',
    dy:.1,
    radius: 7,
    render: function() {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    }
  });
  let exortEffect = kontra.sprite({
    x: midX + 50,
    y: midY + 215,
    width: 7,
    height: 7,
    color: '#FF6C00',
    dy:.1,
    radius: 7,
    render: function() {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    }
  });
  let quasInfo = kontra.sprite({
    y: midY,
    width: 40,
    height: 40,
    color:'#33FFF8',
    radius: 25,
    render: function() {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    }
  });
  let wexInfo = kontra.sprite({
    y: midY,
    width: 40,
    height: 40,
    color:'#EC18FF',
    radius: 25,
    render: function() {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    }
  });
  let exortInfo = kontra.sprite({
    y: midY,
    width: 40,
    height: 40,
    color:'#FF6C00',
    radius: 25,
    render: function() {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    }
  });

  /* PORTAL */
  let portal = kontra.sprite({
    x: 105,
    y: 135,
    image: kontra.assets.images.portal,
    type: 'portal',
    rotation: 0
  });

  /* Pooling */
  let pool = kontra.pool({
    create: kontra.sprite  // create a new sprite every time the pool needs new objects
  });

  /* Particle effets for combos */
  const quasParticles = () => {
    for(let i = 0; i < 30; i++) {
      let randomMin  = 2;
      let randomMax  = 6;
      let randomSize = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin
      pool.get({
        x: midX,
        y: midY,
        dx: -5 + Math.random()*10,
        dy: -5 + Math.random()*10,
        width: randomSize,
        height: randomSize,
        color: '#33FFF8',
        ttl: 300
      });
    }
  };

  const wexParticles = () => {
    for(let i = 0; i < 40; i++) {
      let randomMin  = 2;
      let randomMax  = 6;
      let randomSize = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin
      pool.get({
        x: midX,
        y: midY,
        dx: -5 + Math.random()*10,
        dy: -3 + Math.random()*10 + 10,
        width: randomSize,
        height: randomSize,
        color: '#EC18FF',
        ttl: 300
      });
    }
  }

  const exortParticles = () => {
    for(let i = 0; i < 40; i++) {
      let randomMin  = 2;
      let randomMax  = 6;
      let randomSize = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin
      pool.get({
        x: midX,
        y: midY,
        dx: -5 + Math.random()*10,
        dy: -5 + Math.random()*10,
        width: randomSize,
        height: randomSize,
        color: '#FF6C00',
        ttl: 300
      });
    }
  }

  // Had to put these controls here because kontra keyboard calls it multiple times
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if(keyName === 'q') {
      quasParticles();
      typedCode = typedCode + 'q';
    }

    if(keyName === 'w') {
      wexParticles();
      typedCode = typedCode + 'w';
    }
    if(keyName === 'e') {
      exortParticles();
      typedCode = typedCode + 'e';
    }
    // Ulti controls
    if(keyName === 'r') {
      ultiPressed = true;
      ultiSound.play();
      startShake();

      if(typedCode === randomSelectedCombo) {
        loseBackground.y += 5;
        randomSelectedCombo = getRandomCombo();
        typedCode = '';
      }
      else {
        loseBackground.y -= 5;
        typedCode = '';
      }
      
    } 
  });
    // Main loop
    let loop = kontra.gameLoop({
      update() { 
        
        loseBackground.update();
        player.update();
        quasEffect.update();
        wexEffect.update();
        exortEffect.update();
        pool.update();
        quasInfo.update();
        wexInfo.update();
        exortInfo.update();

        /* Elements with tweens */
        if(quasEffect.y > midY + 230) {
          quasEffect.dy -= 0.1;
        }
        if(quasEffect.y < midY + 220) {
          quasEffect.dy += 0.1;
        }
        if(wexEffect.y > midY + 200) {
          wexEffect.dy -= 0.1;
        }
        if(wexEffect.y < midY + 190) {
          wexEffect.dy += 0.1;
        }
        if(exortEffect.y > midY + 215) {
          exortEffect.dy -= 0.1;
        }
        if(exortEffect.y < midY + 205) {
          exortEffect.dy += 0.1;
        }
        
        // Orbs info
        if(randomSelectedCombo.charAt(0) === 'q') {
          quasInfo.x = midX - 60;
        }
        if(randomSelectedCombo.charAt(0) === 'w') {
          wexInfo.x = midX - 60;
        }
        if(randomSelectedCombo.charAt(0) === 'e') {
          exortInfo.x = midX - 60;
        }
        if(randomSelectedCombo.charAt(1) === 'q') {
          quasInfo.x = midX;
        }
        if(randomSelectedCombo.charAt(1) === 'w') {
          wexInfo.x = midX;
        }
        if(randomSelectedCombo.charAt(1) === 'e') {
          exortInfo.x = midX;
        }
        if(randomSelectedCombo.charAt(2) === 'q') {
          quasInfo.x = midX + 60;
        }
        if(randomSelectedCombo.charAt(2) === 'w') {
          wexInfo.x = midX + 60;
        }
        if(randomSelectedCombo.charAt(2) === 'e') {
          exortInfo.x = midX + 60;
        }


        

        // Start timer for the challenge!
        let loseBgInterval = setTimeout(() => {
          loseBackground.y -= 0.1;
        }, 2000);
        
        // Dead
        if(loseBackground.y <= 0) {
          if(modalShowed === false) {
            modalContent.innerHTML = "<span style='color: #c23616'>You don't deserve to be a mage!</span>";
            endModal.style.display = "block";
            modalShowed = !modalShowed;
          }
          clearTimeout(loseBgInterval);
        }
        // It's a win!
        if(loseBackground.y >= kontra.canvas.height) {
          console.log('WIN');
          win = 1;

          if(modalShowed === false) {
            modalContent.innerHTML = "<span style='color: #1ED760'>Congratz! You've made through portal!</span>";
            endModal.style.display = "block";
            modalShowed = !modalShowed;
          }
          
          clearTimeout(loseBgInterval);
          loseBackground.y = kontra.canvas.height + 10;
          loseBackground.dy = 0;
          wexParticles();
          setTimeout(() => startShake(), 2000);

        } 
      },
      render() {

        preShake();
        portal.context.save();
        portal.context.scale(3, 3);
        portal.render();
        portal.context.restore();
        postShake(); 

        loseBackground.render();
        
        player.context.save();
        player.context.scale(6, 6);
        player.render();
        player.context.restore();

        quasEffect.render();
        wexEffect.render();
        exortEffect.render();

        pool.render();

        quasInfo.render();
        wexInfo.render();
        exortInfo.render();
        
      }
    });

    loop.start(); 
  })
  .catch(err => console.log(err));