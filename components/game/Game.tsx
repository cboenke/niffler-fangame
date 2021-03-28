import React, { useEffect } from "react";
import Phaser from "phaser";

function Game() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 667,
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

    function preload() {
      this.load.image("street", "/canvasLayer1.svg");
      this.load.image("granny", "/granny.png");
      this.load.image("purse1", "/purse1.svg");
      //   this.load.image("purse2", "/purse2");
      this.load.spritesheet("niffler", "/spritesheetNiffler.png", {
        frameWidth: 120,
        frameHeight: 51,
      });
    }

    function create() {
      this.add.image(-350, 52, "street");
      this.add.image(212, 140, "granny");
      this.add.image(247, 224, "purse1");

      player = this.physics.add.sprite(80, 280, "niffler");

      player.setBounce(0);
      // player.setVelocity(70, 0);
      player.setCollideWorldBounds(true);

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
    }

    function update() {
      const cursors = this.input.keyboard.createCursorKeys();
      if (cursors.right.isDown) {
        player.setVelocityX(100);
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
    }

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return <></>;
}

export default Game;
