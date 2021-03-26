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

    function preload() {
      this.load.image("street", "/canvasLayer1.svg");
      this.load.image("granny", "/granny.png");
      this.load.image("purse1", "/purse1.svg");
      //   this.load.image("purse2", "/purse2");
      this.load.spritesheet("niffler", "/spritesheetNiffler.png", {
        frameWidth: 121.5,
        frameHeight: 51,
      });
    }

    function create() {
      this.add.image(-350, 52, "street");
      this.add.image(212, 140, "granny");
      this.add.image(247, 224, "purse1");
    }

    function update() {
      console.log("This function will be edited later.");
    }

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return <></>;
}

export default Game;
