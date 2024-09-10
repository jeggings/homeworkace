class StartScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'StartScene' })
    }

 

    create ()
    {
        this.input.manager.enabled = true;
        this.add.image(400, 300, 'sky');


        

        const music = this.sound.add('theme',{ loop: true });

        music.play();

        const paperImage = this.add.image(100, 370, 'paper').setScale(0.6)
        const extraCredImage = this.add.image(180, 370, 'notebook').setScale(0.6)
        
        const videoGameImage = this.add.image(400, 370, 'controller').setScale(0.6).setRotation(-.05)
        const tvImage = this.add.image(480, 370, 'tv').setScale(0.6).setRotation(-.05)

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2

        this.add.image(screenCenterX, 120, 'logo').setScale(0.25).setOrigin(0.5)
        
        const clickText = this.add.text(screenCenterX/2, screenCenterY/2+140, 'Tap', { fontFamily: 'sans-serif', fontSize :'48px', fontStyle:'bold', fill: '#1F1' }).setOrigin(0.5).setStroke('#040', 5)        
        const homeworkText = this.add.text(screenCenterX/2, screenCenterY/2+170, 'Homework', { fontFamily: 'sans-serif', fontSize :'16px', fontStyle:'bold', fill: '#1F1' }).setOrigin(0.5).setStroke('#040', 4)
        
        const avoidText = this.add.text(screenCenterX+screenCenterX/2, screenCenterY/2+140, 'Avoid', { fontFamily: 'sans-serif', fontSize :'48px', fontStyle:'bold', fill: '#F11' }).setOrigin(0.5).setRotation(-.05).setStroke('#400', 5)
        const distractionsText = this.add.text(screenCenterX+screenCenterX/2, screenCenterY/2+170, 'Distractions', { fontFamily: 'sans-serif', fontSize :'16px', fontStyle:'bold', fill: '#F11' }).setOrigin(0.5).setRotation(-.05).setStroke('#400', 4)

        const startText = this.add.text(screenCenterX, this.cameras.main.height-110, 'Tap To Start!', { fontFamily: 'sans-serif', fontSize :'48px' , fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 5)
        this.input.once('pointerdown', function () {
            this.sound.add(`click`).play()
            music.stop();
            this.cameras.main.fadeOut(500, 0, 0, 0)
            setTimeout( ()=>{
                this.scene.stop('StartScene')
                this.scene.start('GameScene')
            },600
            )
        }, this)        

        this.tweens.add({
            targets: startText,
            scale: 1.05,
            yoyo: true,
            duration: 450,
            repeat: -1
        })

        this.tweens.add({
            targets: [clickText,homeworkText],
            scale: 1.1,
            yoyo: true,
            duration: 450,
            repeat: -1
        })
        this.tweens.add({
            targets: [paperImage,extraCredImage],
            scale: 0.7,
            yoyo: true,
            duration: 450,
            repeat: -1
        })
        this.tweens.add({
            targets: [avoidText,distractionsText,videoGameImage,tvImage],
            rotation: .05,
            yoyo: true,
            duration: 150,
            repeat: -1
        })

    }
   
}
export default StartScene