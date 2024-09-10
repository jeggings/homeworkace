import {default as AssetLoadScene} from './AssetLoadScene.js';
import {default as StartScene} from './StartScene.js';
import {default as GameScene} from './GameScene.js';
import {default as GameOverScene} from './GameOverScene.js';
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: 'game-container',
    scene: [AssetLoadScene,StartScene,GameScene,GameOverScene]
};

const game = new Phaser.Game(config);