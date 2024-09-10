class GameScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'GameScene' });
    }

    init(){
        this.tapEnabled = true
        this.currentScore = 0
        this.totalScore = 0
        if (this.spawnInterval)
            clearInterval(this.spawnInterval)
    }
    reset() {
        this.scene.restart();
    }
    update(timestep, dt)
    {
        this.sprites = this.sprites.filter(e=>e.active)
        this.sprites.forEach(e=>{
            e.update(timestep, dt)
        }) 
    }

    createFallingObject(type){
        const fallObject = this.add.sprite(Math.random()*500+50, -50, type).setInteractive()
        this.objectContainer.add(fallObject)
        fallObject.fallSpeed = Math.floor(Math.random()*150)+200 
        fallObject.rotateSpeed = Math.floor(Math.random()*4)-2
        fallObject.update = function(timestep, dt){
            this.y += this.fallSpeed*dt/1000
            this.rotation +=this.rotateSpeed*dt/1000
            if(this.y >= 580){
                fallObject.destroy()
                this.onHitBottom()
            }
        }

        fallObject.on('pointerdown', function () {
            if (this.tapEnabled)
                fallObject.onClick()
        },this)

        fallObject.onHitBottom = ()=>{}
        fallObject.onClick = ()=>{}

        this.sprites.push(fallObject)
        return fallObject
    }

    spawnVideoGame(){
        const controller = this.createFallingObject('controller')
        controller.onClick = () => {
            controller.destroy()
            this.tapEnabled = false
            this.input.manager.setCursor({ cursor: 'not-allowed' })
            this.distractedText.setVisible(true)
            this.sound.add(`distract`).play()
            setTimeout(()=>{
                this.distractedText.setVisible(false)
                this.tapEnabled = true
                this.input.manager.resetCursor({ cursor: true })
            },1000)}
    }

    spawnTV(){
       const tv = this.createFallingObject('tv')
       tv.onClick = () => {
            tv.destroy()
            this.tapEnabled = false
            this.input.manager.setCursor({ cursor: 'not-allowed' });
            this.distractedText.setVisible(true)
            this.sound.add(`distract`).play()
            setTimeout(()=>{
                this.distractedText.setVisible(false)
                this.tapEnabled = true
                this.input.manager.resetCursor({ cursor: true });
            },1000)}
    }

    spawnHomework(){
        const homework = this.createFallingObject('paper')
        

        const partEmit = this.add.particles(400, 250, 'star', {
            lifespan: 500,
            speed: { min: 250, max: 350 },
            scale: { start: 0.8, end: 0 },
            emitting: false
        });
        homework.particles = partEmit
       
        homework.onClick = () => {
            homework.particles.x=homework.x
            homework.particles.y=homework.y
            homework.particles.explode(16)
            homework.destroy()
            this.totalScore += 50
            this.currentScore += 50
            this.updateScore()
            this.sound.add(`homework-sfx`).play()
        }
        homework.onHitBottom = () => {
            this.totalScore += 50
            this.updateScore()
        }
        
    }
    spawnExtraCredit(){
        const extraCred = this.createFallingObject('notebook')
        extraCred.rotateSpeed = 0
        const partEmit = this.add.particles(400, 250, 'star', {
            lifespan: 500,
            speed: { min: 250, max: 350 },
            scale: { start: 0.8, end: 0 },

            emitting: false
        });
        extraCred.particles = partEmit

        extraCred.onClick = () => {
            extraCred.particles.x=extraCred.x
            extraCred.particles.y=extraCred.y
            extraCred.particles.explode(100)
            extraCred.destroy()
            this.currentScore += 50
            this.updateScore()
            this.sound.add(`extracred-sfx`).play()
        }
        this.tweens.add({
            targets: extraCred,
            scale: 1.05,
            yoyo: true,
            duration: 400,
            repeat: -1
        })
    }
    updateScore(){
        this.scoreText.setText(`Score ${this.currentScore}/${this.totalScore}`)
        if (this.totalScore >= 1000){
            this.distractedText.setVisible(false)
            this.tweens.add({    
                targets: this.music,
                volume: 0,
    
                ease: 'Linear',
                duration: 2000,
    
                onComplete: ()=>{this.music.stop()}
            });
            
            clearInterval(this.spawnInterval)
            this.sprites.forEach(e=>{
                e.destroy()
            })
            this.add.text(
                this.cameras.main.width / 2, this.cameras.main.height / 2, 'Term\'s Over!', { fontFamily: 'sans-serif', fontSize :'90px', fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 10)
            setTimeout(()=>{
                

                this.scene.stop('GameScene')
                this.scene.start('GameOverScene',{score: this.currentScore})
            },2000)
        }
    }

    spawnObjects(){
        this.spawnVideoGame() 

        this.spawnTV()
        this.spawnHomework()

        if (Math.random() <= 0.5)
            this.spawnVideoGame() 
        if (Math.random() <= 0.3)
            this.spawnTV() 
        
        if (this.currentScore < this.totalScore)
            if (Math.random() <= 0.2)
                this.spawnExtraCredit()
    }

    create ()
    {
        this.add.image(400, 300, 'sky')
        

        this.sprites = []
        this.objectContainer = this.add.container()
        this.scoreContainer = this.add.container()

        this.scoreText = this.add.text(this.cameras.main.width / 2, 25, 'Score 0/0', { fontFamily: 'sans-serif', fontSize :'32px', fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 5)
        
        this.distractedText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Distracted!', { fontFamily: 'sans-serif', fontSize :'32px', fontStyle:'bold', fill: '#F00' }).setOrigin(0.5).setStroke('#000', 5).setRotation(-.05)
        this.distractedText.setVisible(false)
        this.scoreContainer.add( this.scoreText)
        this.input.manager.enabled = true
        this.input.topOnly = true

        this.countdown = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, '3', { fontFamily: 'sans-serif', fontSize :'120px', fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 10)

        this.music = this.sound.add('play')

        this.music.play()
        setTimeout(()=>{
            this.countdown.setText("2")
        },500)
        setTimeout(()=>{
            this.countdown.setText("1")
            
        },1000)
        setTimeout(()=>{
            this.countdown.setText("GO!")
            
            this.spawnObjects()
        this.spawnInterval = setInterval(()=> {
            this.spawnObjects()
        },800) 
        },1500)
        setTimeout(()=>{
            this.countdown.destroy()
        },2000)

        this.tweens.add({
            targets:  this.distractedText,
            rotation: .05,
            yoyo: true,
            duration: 150,
            repeat: -1
        })
    }
}

export default GameScene