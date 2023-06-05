class scene extends Phaser.Scene {
    constructor() {
        super("scene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('pic1', '1.png');
        this.load.image("pic2", "2.png");
    }

    create() {
        // create method
        this.times = 25;
        this.w = 800;
        this.h = 600;

        let target = this.add.text(200, 100,"up: use space bar").setOrigin(0.5).setFontSize(50);
        this.time.delayedCall(60 * 1000,()=>{
            this.tweens.add({
                targets: target,
                alpha: 0,
                repeat:false,
                duration: 1000,
            });
        });

        this.pic1 = this.physics.add.sprite(400, this.h, "pic1");
        this.pic1.setScale(4, 2);
        this.pic1.setBodySize(7, 10);
        this.pic1.setCollideWorldBounds(true, true, false, true);

        this.pic2 = this.physics.add.sprite(this.w + 10, this.h, "pic2");
        this.pic2.setBodySize(10, 10);
        this.pic2.setScale(4, 2);
        this.pic2.setCollideWorldBounds(true, true, false, true);

        // keyboard event
        this.input.keyboard.on('keydown', (event) => {
            console.log(event)
            if (event.key === ' ' && this.pic1.y >= this.h - 10) {
                this.pic1.setVelocityY(-200);
            }
        });

        this.physics.add.collider(this.pic1, this.pic2, this.collison, null, this);
    }


    // after collison
    collison() {
        this.tweens.add({
            targets: this.pic1,
            duration: 200,
            x: "-=40",
            y: "-=100",
            repeat: false,
        });
        this.times -= 1;
        this.pic1.setVelocityX(0);
    }

    update() {
        if (this.pic2.x <= 20) {
            this.pic2.x = this.w - 10;
        }
        this.pic2.setVelocityX(-200);

        if (this.times <= 0) {
            this.physics.pause();
            this.add.text(this.w * 0.2, this.h * 0.5, "You are lose").setFontSize(80);

        } else if (this.pic1.x >= (this.w - 100)) {
            this.physics.pause();
            this.add.text(this.w * 0.2, this.h * 0.5, "You are win").setFontSize(80);
            this.add.text(this.w * 0.2, this.h * 0.6, "Restart?").setFontSize(80).setColor('red');
        }
    }
}

new Phaser.Game({
    type: Phaser.WEBGL,
    backgroundColor: '#1b1464',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 200
            },
            // debug: true
        }
    },
    scene: [scene],
    title: "Physics Game",
});
