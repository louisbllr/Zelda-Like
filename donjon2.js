export class donjon2 extends Phaser.Scene{
    

    constructor(){    
        super("donjon2");
        this.estSolide;        
        this.plateformes;
        this.score =0;
        this.scoreText;
        this.item
        this.player;
        this.perso;
        this.cursors;
        this.controller = false;
        this.tileset;
        this.playerhp = 100;
        this.gameover =false;
        this.manette =false;
        this.enemie;
        this.argent;
        this.argenttext;
        this.sortie =true;
        this.enemies
        this.enemies = this.enemie;
        this.onCollide = false;
        this.argent=100;
        this.atck;
        // this.atck = this.physics.add.staticGroup();

        
    }
    preload(){
        // load de la map

        this.load.image("tileset", "Tileset.png");
        this.load.tilemapTiledJSON("Map3", "Donjon2.json",)
        this.load.spritesheet('perso','animation/perso.gif',
             { frameWidth: 32, frameHeight: 64 });

            //  load de l'inventaire

        this.load.image("ui", "assets/ui.png");
        this.load.image("épée","assets/épée.png");
        this.load.image("or","assets/or.png");
        this.load.image("powerup1","assets/powerup1.png");
        this.load.image("powerup2","assets/powerup2.png");
    }

    create(){
// création touche 

        // this.clavier = this.input.keyboard.addKeys('SPACE');(create)
        // if (this.clavier.SPACE.isDown) {}

    // ajout de tout les calques du niveau

    const carteDuNiveau = this.add.tilemap("Map3");
    const tileset = carteDuNiveau.addTilesetImage(
          "Tileset", // dans le code
          "tileset"  // dans phaser
        ); 
        
        const sol = carteDuNiveau.createLayer(
        "sol",
        tileset
    )
    const Glace = carteDuNiveau.createLayer(
        "glace",
        tileset
    )
    const trou = carteDuNiveau.createLayer(
        "trou",
        tileset
    )
    const Porte = carteDuNiveau.createLayer(
        "Porte",
        tileset
    )
        const PowerUp2 = carteDuNiveau.createLayer(
        "PowerUp2",
        tileset
    )
    // const enemies = carteDuNiveau.createLayer(
        // "enemies",
        // tileset
    // )
    
    const cailloux = carteDuNiveau.createLayer(
        "cailloux",
        tileset
    )
    const mur = carteDuNiveau.createLayer(
        "mur",
        tileset
    )
    const cassable = carteDuNiveau.createLayer(
        "mur cassable",
        tileset
    )
    const coffres = carteDuNiveau.createLayer(
        "coffre",
        tileset
    )
    const Déplacable =carteDuNiveau.createLayer(
        "déplacable",
        tileset
    )
    const coffre2 =carteDuNiveau.createLayer(
        "coffre2",
        tileset
    )

        

    // fin des calques mise en place du perso

    this.player = this.physics.add.sprite(640, 1150, 'perso');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.5);



    //mise en place des enemies

    this.enemies= this.physics.add.group ({allowGravity:false})
    this.enemies.create(768,416, 'enemies');
    this.enemies.create(1072,880, 'enemies');
    this.enemies.create(960,672, 'enemies');
    this.enemies.create(640,736, 'enemies');
    this.enemies.create(896,368, 'enemies');

// mise en place des anims du joueur

    // this.anims.create({
        // key: 'left',
        // frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
        // frameRate: 10,
        // repeat: -1
    // });
    // this.anims.create({
        // key: 'turn',
        // frames: [ { key: 'perso', frame: 4 } ],
        // frameRate: 20
    // });
    // this.anims.create({
        // key: 'right',
        // frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
        // frameRate: 10,
        // repeat: -1
    // });

// mise en place du clavier et de la manette
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.gamepad.once('connected', function (pad) {
        console.log("Manette Connecté");
        this.controller = pad;
    }, this);

    // mise en place de la caméra

    this.physics.world.setBounds(0, 0, 5000, 5000);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(3);

    // mise en place de l'inventaire

    this.add.image(400, 275, "ui").setScrollFactor(0).setScale(0.5);
    this.add.image(400,280,"épée").setScrollFactor(0).setScale(0.5);
    this.add.text(355,265,this.playerhp,{font:'16 Arial',fill:'#FF0000'}).setScrollFactor(0).setScale(0.5);
    this.add.image(400,275,"or").setScrollFactor(0).setScale(0.5);
    this.add.text(380,265,this.argent,{font:'16 Arial',fill:'#fff000'}).setScrollFactor(0).setScale(0.5);
    this.add.image(400,275,"powerup1").setScrollFactor(0).setScale(0.5).alpha =0.2;
    this.add.image(400,275,"powerup2").setScrollFactor(0).setScale(0.5).alpha =0.2;

// mise en place des collision

        mur.setCollisionByProperty({ estSolide:true});
        this.physics.add.collider(this.player,mur)
        cassable.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player,cassable)
        cailloux.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player,cailloux)
        Déplacable.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player,Déplacable)
        coffres.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player,coffres)
        PowerUp2.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player,PowerUp2)
        coffre2.setCollisionByExclusion({estSolide:true});
        this.physics.add.collider(this.player,coffre2,this.gainargent);

        this.physics.add.collider(this.enemies,this.player )
        this.physics.add.collider(this.enemies,mur)
        this.physics.add.collider(this.enemies,cassable)
        this.physics.add.collider(this.enemies,cailloux)
        this.physics.add.collider(this.enemies,Déplacable)
        
    }

    update(){
// mise en place des déplacements du joueur
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-200); 
            //player.anims.play('left', true); 
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(200); 
            //player.anims.play('right', true);
        }
        else{ 
            this.player.setVelocityX(0);
            //player.anims.play('turn');
        }

        if (this.cursors.up.isDown){
            this.player.setVelocityY(-200);
            //player.anims.play('up',true)
        
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocityY(200);
            // player.anims.play('down',true); 
        }
        else{ 
            this.player.setVelocityY(0);
            //player.anims.play('turn');
        }


        // mise en place de la téléportation entre zone

        if (this.player.x >= 600 && this.player.y >= 1160 && this.player.x <= 700)
{       
    this.scene.start('sceneExemple',{entrance:"donjon2",});
    if (this.sortie == true)
			{
				this.sortie = false;
				// this.cameras.main.fadeOut(0, 0, 0, 0);
				this.time.delayedCall(500, () => 
                {
                   this.scene.start('sceneExemple',{entrance:"donjon2",});
                
				}
            
                )
}}



    // mise en place des mouvements des monstres

    this.enemies.getChildren().forEach(enemies => {
        const distance = Phaser.Math.Distance.Between(enemies.x, enemies.y, this.player.x, this.player.y);
        if (distance < 200) {
          enemies.setVelocity(this.player.x - enemies.x, this.player.y - enemies.y);
        } else {
          enemies.setVelocity(0);
        }
      });



    //Attaque
// {
    //   if (this.player_facing == "up") {
        //   this.atck.create(this.player.x, this.player.y - 32, "up atck");
    //   }
    //   else if (this.player_facing == "down") {
        //   this.atck.create(this.player.x, this.player.y + 32, "atck");
    //   }
    //   else if (this.player_facing == "right") {
        //   this.atck.create(this.player.x + 32, this.player.y, "right_atck");
    //   }
    //   else if (this.player_facing == "left") {
        //   this.atck.create(this.player.x - 32, this.player.y, "left_atck");
    //   }
    //   this.player_block = true;
    //   this.player.setVelocityX(0);
    //   this.player.setVelocityY(0);
// 
// }
}

        //Activation du powerup1 = déstruiction des murs cassable et déblocage du donjon2

        // destroy(attack, cassable);{
            // attack.disableBody(true,true);
            // cassable.disableBody(true, true);
            // this.attack = false;
        // }
        
        // Second power up 
        PowerUp2(player,déplacable){
            if (this.player.collider.this.PowerUp2);
                player.collider.déplacable 
                déplacable.setVelocity(-50)
        }


        // fonction gain d'argent
gainargent1(player,collider,coffres){
    if (this.player,collider,coffres)
    coffres.disableBody,(true, true);
    argent += 10;
    coffres.destroy();
}
    // attaque des monstres et les loots
        
    kill_enemies(enemies) {
        enemies.disableBody(true, true)
        this.lootMob(enemies);
    }

    
    Loot(enemies) {
        this.loot = Math.floor(Math.random() * (4 - 1)) + 1;
        if (this.loot == 1) {
            this.playerhp.create(mob.x, mob.y, "épée");
        }
        else if (this.loot == 2) {
            this.argent.create(mob.x, mob.y, "Argent");
        }
    }
        
        // déplacement des monstres quand le joueur est loin d'eux 

        enemies_switch_right(enemies) {
            mob.setVelocityX(100);
            mob.setVelocityY(0);
            // mob.anims.play('right_enemies')
        }
    
        enemies_switch_left(enemies) {
            mob.setVelocityX(-100);
            mob.setVelocityY(0);
            // mob.anims.play('left_enemies')
        }
    
        enemies_switch_up(enemies) {
            mob.setVelocityX(0);
            mob.setVelocityY(-100);
            // mob.anims.play('up_enemies')
        }
    
        enemies_switch_down(enemies){
            mob.setVelocityX(0);
            mob.setVelocityY(100);
            // mob.anims.play('down_enemies')
        }




}
