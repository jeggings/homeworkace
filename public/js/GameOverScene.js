class GameOverScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.score = data.score;
    }
    reset() {
        this.scene.restart();
    }


    create ()
    {
        const screenCenterX = this.cameras.main.width / 2
        const screenCenterY = this.cameras.main.height / 2
        this.add.image(400, 300, 'sky')
        
        let grade = ''
        let message = ''

        const partEmit = this.add.particles(screenCenterX, screenCenterY, 'star', {
            lifespan: 2500,
            speed: { min: 250, max: 350 },
            scale: { start: 0.8, end: 0 },
            emitting: false,
        });
        let emitParts = false

        if (this.score >= 1000){
            grade = 'A+'
            message = 'You\'re a HOMEWORK ACE!'
            emitParts = true
        }
        else if (this.score >= 900){
            grade = 'A'
            message = 'Great job!'
        }
        else if (this.score >= 800){
            grade = 'B'
            message = 'Nice work!'
        }
        else if (this.score >= 700){
            grade = 'C'
            message = 'You passed!'
        }
        else if (this.score >= 600){
            grade = 'D'
            message = 'Keep studying!'
        }
        else if (this.score < 600){
            grade = 'F'
            message = 'Better luck next time!' 
        }
        this.add.text(screenCenterX, screenCenterY-100,`Final Grade :`,{ fontFamily: 'sans-serif', fontSize :'48px' , fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 8)
        const gradeText = this.add.text(screenCenterX, screenCenterY,grade,{ fontFamily: 'sans-serif', fontSize :'100px' , fontStyle:'bold', fill: '#F00' }).setOrigin(0.5).setScale(15).setStroke('#400', 5)
        this.tweens.add({
            targets: gradeText,
            scale: 1,
            duration: 500,
        })

        setTimeout(function (){
            this.add.text(screenCenterX, screenCenterY+100,message,{ fontFamily: 'sans-serif', fontSize :'24px' , fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 5)
            gradeText.setRotation(-.15)
            if (emitParts) 
                partEmit.explode(100)
            this.sound.add(`grade`).play()
        }.bind(this),1000)

        setTimeout(()=>{
            const restartText = this.add.text(screenCenterX, this.cameras.main.height-25,'Tap to play again',{ fontFamily: 'sans-serif', fontSize :'24px' , fontStyle:'bold', fill: '#FFF' }).setOrigin(0.5).setStroke('#000', 5)
            this.tweens.add({
                targets: restartText,
                scale: 1.03,
                yoyo: true,
                duration: 500,
                repeat: -1
            })
            this.input.once('pointerdown', function () {
                this.sound.add(`click`).play()
            this.cameras.main.fadeOut(500, 0, 0, 0)
            setTimeout( ()=>{
                this.scene.start('StartScene')
            },1000)
            }, this)
        },3000)

        
        
    }
}






export default GameOverScene