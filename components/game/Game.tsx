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
    let purseClasp;
    let collectGroup;
    let necklace;
    let chalice;
    let noTreasureArea;
    let randomTreasures;

    function preload() {
      this.load.image("street", "/canvasLayer1.svg");
      this.load.image("granny", "/granny.png");
      this.load.image("purseClasp", "/purseClasp.svg");
      this.load.image("purseNoClasp", "/purseNoClasp.svg");
      this.load.spritesheet("niffler", "/spritesheetNiffler.png", {
        frameWidth: 120,
        frameHeight: 51,
      });
      this.load.image("coin", "/coin.svg");
      this.load.image("jewel", "/jewel.svg");
      this.load.image("twistedBracelet", "/twistedBracelet.svg");
      this.load.image("jewelBracelet", "/jewelBracelet.svg");
      this.load.image("necklace", "/necklace.svg");
      this.load.image("ruby", "/ruby.svg");
      this.load.image("emerald", "/emerald.svg");
      this.load.image("chalice", "/chalice.svg");
    }

    function create() {
      this.add.image(1340, 52, "street");
      granny = this.physics.add.image(1900, 140, "granny").setImmovable();
      this.physics.add.image(1935, 224, "purseNoClasp");
      purseClasp = this.physics.add.image(1935, 224, "purseClasp");
      necklace = this.physics.add.image(1320, 165, "necklace");
      chalice = this.physics.add.image(
        2500,
        Phaser.Math.Between(165, 350),
        "chalice"
      );
      randomTreasures = this.randomTreasures = [
        "coin",
        "coin",
        "coin",
        "jewel",
        "jewel",
        "ruby",
        "emerald",
        "twistedBracelet",
        "jewelBracelet",
      ];

      collectGroup = this.physics.add.staticGroup({
        key: randomTreasures,
        frameQuantity: 1,
      });

      const children = collectGroup.getChildren();

      for (let i = 0; i < children.length; i++) {
        const randomX = Phaser.Math.Between(150, 2300);
        const randomY = Phaser.Math.Between(165, 350);
        console.log(randomY);

        children[i].setPosition(randomX, randomY);
      }

      collectGroup.refresh();

      player = this.physics.add.sprite(80, 265, "niffler");

      player.setBounce(0);
      player.setCollideWorldBounds(true);

      this.physics.world.setBounds(0, 130, 2557, 245);

      this.cameras.main.setBounds(0, 0, 2597, 375);
      this.cameras.main.startFollow(player, true);

      noTreasureArea = { granny, purseClasp };

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

      this.physics.add.overlap(purseClasp, player, touchPurse, null, this);
      this.physics.add.overlap(
        children,
        player,
        touchRandomTreasures,
        null,
        this
      );
      this.physics.add.overlap(necklace, player, touchNecklace, null, this);
      this.physics.add.overlap(chalice, player, touchChalice, null, this);
      this.physics.add.collider(collectGroup);
      this.physics.add.collider(collectGroup, noTreasureArea);
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
      this.physics.add.collider(granny, player);
    }

    function touchPurse(purseClasp, player) {
      if (player.body.touching.up && purseClasp.body.touching.down) {
        purseClasp.disableBody(true, true);
      }
    }

    function touchRandomTreasures(children) {
      children.disableBody(true, true);
    }

    function touchNecklace(necklace) {
      necklace.disableBody(true, true);
    }

    function touchChalice(chalice) {
      chalice.disableBody(true, true);
    }

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return <></>;
}

export default Game;
