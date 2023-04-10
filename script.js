import { sceneExemple as sceneExemple } from "./sceneExemple.js";
import { donjon1 as donjon1 } from "./donjon1.js";
import { donjon2 as donjon2 } from "./donjon2.js";


var config = {
    type: Phaser.AUTO,
    input:{gamepad:true},
physics: {
    default: 'arcade' },
    
    scene: [ sceneExemple, donjon1, donjon2 ],
    pixelArt:true
};

new Phaser.Game(config);
