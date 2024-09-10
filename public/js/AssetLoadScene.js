class AssetLoadScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'AssetLoadScene' });
    }

    preload ()
    {
        this.load.image('controller', 'images/controller.png')
        this.load.image('notebook', 'images/notebook.png')
        this.load.image('paper', 'images/paper.png')
        this.load.image('tv', 'images/tv.png')
        this.load.image('sky', 'images/sky.png')
        this.load.image('logo', 'images/logo.png')
        this.load.image('star', 'images/star.png')

        this.load.audio('theme','audio/GrooveScholar.mp3')
        this.load.audio('play','audio/MastersOfDiscipline.mp3')
        this.load.audio('click','audio/sparkle1.mp3');
        this.load.audio('homework-sfx','audio/sparkle2.mp3');
        this.load.audio('extracred-sfx','audio/sparkle3.mp3');
        this.load.audio('grade','audio/sparkle4.mp3');
        this.load.audio('distract','audio/vgbonus.mp3');
        this.sound.pauseOnBlur = false
    }

    create ()
    {
        this.sound.volume = 0.25

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2
        this.add.image(screenCenterX, 120, 'logo').setScale(0.25).setOrigin(0.5)

        const startText = this.add.text(screenCenterX, screenCenterY+100, 'Tap to Launch Game', { fontFamily: 'sans-serif', fontSize :'48px' , fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 5)
        this.tweens.add({
            targets: [startText],
            scale: 1.1,
            yoyo: true,
            duration: 750,
            repeat: -1,
            ease: 'circ.out'
        })
      

        this.input.once('pointerdown', function () {
            this.sound.add(`click`).play()
            this.cameras.main.fadeOut(500, 0, 0, 0)
            setTimeout( ()=>{
                this.scene.start('StartScene')
            },1500)
            
        }, this)
    }
}

export default AssetLoadScene