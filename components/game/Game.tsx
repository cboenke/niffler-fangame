import React, { useEffect } from "react";
import Phaser from "phaser";

function Game(this: Phaser.Scene) {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      backgroundColor: "#270c81",
      width: "100%",
      height: 375,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_VERTICALLY,
        parent: "main",
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: "arcade",
      },
    };

    let player: Phaser.Physics.Arcade.Sprite;
    let street: Phaser.GameObjects.Image;
    let granny: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    let purseClasp: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    let purseNoClasp: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    let collectGroup; //no type definition because phasers type definition is missing a property
    let necklace: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    let chalice: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    // let noTreasureArea: Phaser.Physics.Arcade.Collider;
    let randomTreasures: string[];
    let randomEnemies: string[];
    let avoidGroup; //no type definition because phasers type definition is missing a property
    let cigarette: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    let gameOver = false;
    let score = 0;
    let scoreText: Phaser.GameObjects.Text;
    let container: Phaser.GameObjects.Container;
    let scoreCam; //no type definition because phasers type definition is missing a property
    let gameOverText: Phaser.GameObjects.Text;
    let tryAgainText: Phaser.GameObjects.Text;
    let standing = true;
    let pressSpaceText: Phaser.GameObjects.Text;

    function preload(this: Phaser.Scene) {
      [
        "street",
        "purseClasp",
        "purseNoClasp",
        "coin",
        "jewel",
        "twistedBracelet",
        "jewelBracelet",
        "necklace",
        "ruby",
        "emerald",
        "chalice",
        "screw",
        "nut",
        "cigarette",
      ].forEach((imageName) => {
        this.load.image(imageName, `/${imageName}.svg`);
      });
      this.load.image("granny", "/granny.png");
      this.load.spritesheet("niffler", "/spritesheetNiffler.png", {
        frameWidth: 120,
        frameHeight: 51,
      });
    }

    function create(this: Phaser.Scene) {
      street = this.add.image(1340, 52, "street");
      granny = this.physics.add.image(1900, 140, "granny").setImmovable();
      purseNoClasp = this.physics.add.image(1935, 224, "purseNoClasp");
      purseClasp = this.physics.add.image(1935, 224, "purseClasp");
      necklace = this.physics.add.image(1320, 165, "necklace");
      chalice = this.physics.add.image(
        2500,
        Phaser.Math.Between(165, 350),
        "chalice"
      );
      cigarette = this.physics.add.image(
        Phaser.Math.Between(250, 2300),
        Phaser.Math.Between(165, 350),
        "cigarette"
      );

      randomTreasures = [
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

        children[i].setPosition(randomX, randomY);
      }

      collectGroup.refresh();

      randomEnemies = ["nut", "nut", "screw", "screw"];

      avoidGroup = this.physics.add.staticGroup({
        key: randomEnemies,
        frameQuantity: 1,
      });

      const childrenE = avoidGroup.getChildren();

      for (let i = 0; i < childrenE.length; i++) {
        const randomX = Phaser.Math.Between(250, 2300);
        const randomY = Phaser.Math.Between(165, 350);

        childrenE[i].setPosition(randomX, randomY);
      }

      avoidGroup.refresh();

      player = this.physics.add.sprite(80, 265, "niffler");

      player.setBounce(0, 0);
      player.setCollideWorldBounds(true);

      this.physics.world.setBounds(0, 130, 2557, 245);

      this.cameras.main.setBounds(0, 0, 2597, 375);
      this.cameras.main.startFollow(player, true);

      // noTreasureArea = { granny, purseClasp };

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
      this.physics.add.overlap(
        childrenE,
        player,
        touchRandomEnemies,
        null,
        this
      );
      this.physics.add.overlap(cigarette, player, touchCigarette, null, this);
      // this.physics.add.collider(collectGroup, null);
      // this.physics.add.collider(collectGroup, noTreasureArea);

      const centerX = window.innerWidth / 2;

      pressSpaceText = this.add.text(centerX, 187, "Press space to start", {
        fontFamily: "Roboto",
        fontSize: "3.5em",
        fontStyle: "bold",
        color: "#e3b93b",
      });
      pressSpaceText.setOrigin(0.5);
      pressSpaceText.setFontFamily("sans-serif");
      pressSpaceText.setShadow(1, 2, "#270c81", 2);

      scoreText = this.add.text(16, 16, "Score", {
        fontFamily: "Roboto",
        fontSize: "4em",
        fontStyle: "bold",
        color: "#e3b93b",
      });
      scoreText.setFontFamily("sans-serif");
      scoreText.setShadow(1, 2, "#270c81", 3);
      scoreText.setText("Score: " + 0);
      container = this.add.container();
      container.add(scoreText);
      scoreCam = this.cameras.add(0, 0, 2597, 375);
      this.cameras.main.ignore(scoreCam);
      this.cameras.main.ignore(scoreText);

      scoreCam.ignore([
        street,
        collectGroup,
        avoidGroup,
        granny,
        player,
        purseClasp,
        purseNoClasp,
        necklace,
        chalice,
        cigarette,
      ]);

      gameOverText = this.add.text(centerX, 155, "Game Over", {
        fontFamily: "Roboto",
        fontSize: "10em",
        fontStyle: "bold",
        color: "#e3b93b",
      });
      gameOverText.setOrigin(0.5);
      gameOverText.setFontFamily("sans-serif");
      gameOverText.setShadow(1, 2, "#270c81", 3);
      gameOverText.visible = false;
      this.cameras.main.ignore(gameOverText);

      tryAgainText = this.add.text(centerX, 280, "Try again", {
        fontFamily: "Roboto",
        fontSize: "5em",
        fontStyle: "bold",
        color: "#e3b93b",
      });
      tryAgainText.setOrigin(0.5);
      tryAgainText.setFontFamily("sans-serif");
      tryAgainText.setShadow(1, 2, "#270c81", 3);
      tryAgainText.visible = false;
      this.cameras.main.ignore(tryAgainText);
      tryAgainText.setInteractive();
      tryAgainText.once("pointerup", function () {
        location = window.location;
      });
    }

    function update(this: Phaser.Scene) {
      const cursors = this.input.keyboard.createCursorKeys();
      const space = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      if (gameOver) {
        return;
      }
      if (space.isDown) {
        standing = false;
        player.anims.play("running", true);
        pressSpaceText.visible = false;
      } else if (standing) {
        player.setVelocityX(0);
        player.anims.play("standing", true);
      } else if (cursors.up.isDown) {
        standing = false;
        player.setVelocityY(-60);
        player.anims.play("running", true);
      } else if (cursors.down.isDown) {
        standing = false;
        player.setVelocityY(60);
        player.anims.play("running", true);
      } else {
        standing = false;
        player.setVelocityX(150) && player.setVelocityY(0);
        player.anims.play("running", true);
      }
      this.physics.add.collider(granny, player);
    }

    function touchPurse(purseClasp, player) {
      if (player.body.touching.up && purseClasp.body.touching.down) {
        purseClasp.disableBody(true, true);
        score += 50;
        scoreText.setText("Score: " + score);
        localStorage.setItem("score", JSON.stringify(score));
      }
    }

    function touchRandomTreasures(children) {
      children.disableBody(true, true);
      score += 20;
      scoreText.setText("Score: " + score);
      localStorage.setItem("score", JSON.stringify(score));
    }

    function touchNecklace(necklace) {
      necklace.disableBody(true, true);
      score += 60;
      scoreText.setText("Score: " + score);
      localStorage.setItem("score", JSON.stringify(score));
    }

    function touchChalice(chalice) {
      chalice.disableBody(true, true);
      score += 100;
      scoreText.setText("Score: " + score);
      localStorage.setItem("score", JSON.stringify(score));
      this.time.timeScale = 2;
      this.time.addEvent({
        delay: 10000,
        callback: (window.location.href = "/level-completed"),
      });
    }

    function touchRandomEnemies(childrenE) {
      childrenE.disableBody(true, true);
      score -= 20;
      scoreText.setText("Score: " + score);
      localStorage.setItem("score", JSON.stringify(score));
    }

    function touchCigarette(cigarette, player) {
      this.physics.pause();
      cigarette.disableBody(true, true);
      player.flipY = true;
      player.anims.play("standing", true);
      gameOver = true;
      gameOverText.visible = true;
      tryAgainText.visible = true;
    }

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return <></>;
}

export default Game;
