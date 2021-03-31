import React, { useEffect } from "react";
import Phaser from "phaser";

function Game() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: "100%",
      height: 375,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: "arcade",
      },
    };

    let player;
    let granny;
    let purse1;

    function preload() {
      this.load.image("street", "/canvasLayer1.svg");
      this.load.image("granny", "/granny.png");
      this.load.image("purse1", "/purse1.svg");
      this.load.image("purse2", "/purse2.svg");
      this.load.spritesheet("niffler", "/spritesheetNiffler.png", {
        frameWidth: 120,
        frameHeight: 51,
      });
    }

    function create() {
      this.add.image(1340, 52, "street");
      granny = this.physics.add.image(1900, 140, "granny").setImmovable();
      this.physics.add.image(1935, 224, "purse2");
      purse1 = this.physics.add.image(1935, 224, "purse1");

      player = this.physics.add.sprite(80, 265, "niffler");

      player.setBounce(0);
      player.setCollideWorldBounds(true);

      this.physics.world.setBounds(0, 0, 2597, 375);

      this.cameras.main.setBounds(0, 0, 2597, 375);
      this.cameras.main.startFollow(player, true);

      this.anims.create({
        key: "standing",
        frames: this.anims.generateFrameNumbers("niffler", {
          start: 0,
          end: 0,
        }),
      });

      this.anims.create({
        key: "running",
        frames: this.anims.generateFrameNumbers("niffler", {
          start: 0,
          end: 1,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.physics.add.overlap(purse1, player, touchPurse, null, this);
    }

    function update() {
      const cursors = this.input.keyboard.createCursorKeys();
      if (cursors.right.isDown) {
        player.setVelocityX(200);
        player.anims.play("running", true);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-50);
        player.anims.play("running", true);
      } else if (cursors.down.isDown) {
        player.setVelocityY(50);
        player.anims.play("running", true);
      } else {
        player.setVelocityX(0) && player.setVelocityY(0);
        player.anims.play("standing", true);
      }
      this.physics.add.collider(granny, player, function () {
        console.log("hit?");
      });
    }

    function touchPurse(purse1, player) {
      if (player.body.touching.up && purse1.body.touching.down) {
        purse1.disableBody(true, true);
      }
    }

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return <></>;
}

export default Game;
