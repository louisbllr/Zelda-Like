export class donjon1 extends Phaser.Scene{

    constructor(){    

        super("donjon1");
        this.estSolide;        
        this.plateformes;
        this.item
        this.player;
        this.perso;
        this.cursors;
        this.tileset;
        this.playerhp = 100;
        this.hp;
        this.gameover =false;
        this.manette =false;
        this.enemie;
        this.argent;
        this.argenttext;
        this.sortie =true;
        this.enemies;
        this.enemies = this.enemie;
        this.argent = 100;
        this.onCollide = false;
        this.player_block = false;
        this.player_beHit = false;
        this.attack=true;
        this.cd_can_attack=false;
        this.cd_attack=false;
        this.atck;
        // this.atck = this.physics.add.staticGroup();
    }

    preload(){
        // load de la map

            this.load.image("tileset", "Tileset.png");
            this.load.tilemapTiledJSON("Map4", "Donjon1.json",)
            this.load.spritesheet('perso','animation/perso.gif',{ frameWidth: 32, frameHeight: 64 });
            // this.load.spritesheet('enemies','coffre.png',
			// { frameWidth: 18, frameHeight: 18 });

            // création de l'inventaire

            this.load.image("ui", "assets/ui.png");
            this.load.image("épée","assets/épée.png");
            this.load.image("or","assets/or.png");
            this.load.image("powerup1","assets/powerup1.png");
            this.load.image("powerup2","assets/powerup2.png");
        
    }

    create()
    {
        // création touche de jeu

        // this.clavier = this.input.keyboard.addKeys('SPACE');(create)
        // if (this.clavier.SPACE.isDown) {}

        // ajout de tout les calques du niveau

    const carteDuNiveau = this.add.tilemap("Map4");
    const tileset = carteDuNiveau.addTilesetImage(
          "Tileset", // dans le code
          "tileset"  // dans phaser
        ); 
        const sol = carteDuNiveau.createLayer(
        "sol",
        tileset
    )
    const entré = carteDuNiveau.createLayer(
        "entrée",
        tileset
    )
    const sortie = carteDuNiveau.createLayer(
        "sortie",
        tileset
    )
        const PowerUp1 = carteDuNiveau.createLayer(
        "PowerUp1",
        tileset
    )
    // const enemies = carteDuNiveau.createLayer(
        // "enemies",
        // tileset
    // )
    const muraille = carteDuNiveau.createLayer(
        "mur",
        tileset
    )
    const cassable = carteDuNiveau.createLayer(
        "mur cassable",
        tileset
    )
    const coffre= carteDuNiveau.createLayer(
        "coffre",
        tileset
    )



    // fin des calques mise en place du perso

    this.player = this.physics.add.sprite(150, 1050, 'perso');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.5);



    

    // mise en place des enemies

    this.enemies= this.physics.add.group ({allowGravity:false})
    this.enemies.create(464,480, 'enemies');
    this.enemies.create(432,944, 'enemies');
    this.enemies.create(848,144, 'enemies');


    // mise en place des potions de soin

    this.hp = this.physics.add.group();
    this.hp.create(624,928,'épée');
    // this.hp.create(160,480,'épée');

    
    //this.hp.objects.forEach(this.hp);
    // {
        // const Soin = this.heal.create("épée");
    // };    

//  Animation du perso

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'perso', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
        frameRate: 10,
        repeat: -1
    });

    // commande clavier/manette

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.gamepad.once('connected', function (pad) {
        console.log("Manette Connecté");
        this.controller = pad;
    }, this);

    // mise en place de la camera et du suivit du joueur

    this.physics.world.setBounds(0, 0, 5000, 5000);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(3);

    // mise en place de l'inventaire 

    this.add.image(400, 275, "ui").setScrollFactor(0).setScale(0.5);
    this.add.text(360,265,this.playerhp,{font:'16 Arial',fill:'#FF0000'}).setScrollFactor(0).setScale(0.5);
    this.add.image(400,280,"épée").setScrollFactor(0).setScale(0.5);
    this.add.image(400,275,"or").setScrollFactor(0).setScale(0.5);
    this.add.text(380,265,this.argent,{font:'16 Arial',fill:'#fff000'}).setScrollFactor(0).setScale(0.5);
    this.add.image(400,275,"powerup1").setScrollFactor(0).setScale(0.5).alpha =0.2;
    this.add.image(400,275,"powerup2").setScrollFactor(0).setScale(0.5).alpha =0.2;



    //  collision

        muraille.setCollisionByProperty({ estSolide:true});
        this.physics.add.collider(this.player,muraille)
        cassable.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player,cassable)
        coffre.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player,coffre)
        PowerUp1.setCollisionByProperty({estSolide:true});
        this.physics.add.collider(this.player, PowerUp1)


        this.physics.add.collider(this.enemies,this.player)
        this.physics.add.collider(this.enemies,muraille)
        this.physics.add.collider(this.enemies,cassable)

        // this.physics.add.overlap(this.player,this.enemies,this.pertehp);




    }

    update(){
        // déplacement du joueur

        if (this.gameOver) { return }
        if (this.player_block == false){
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
        }

        // activation du powerUp et déblocage du donjon 2
        
        //if(player,PowerUp1)
        //    this.player.collider.this.PowerUp1;{
        //        this.physics.add.collider(this.attack, this.cassable, this.destroyRock, null, this);
        //        this.add.image(400,275,"powerup1").setScrollFactor(0).setScale(0.5).alpha =1;
        //    }


        // téléportation du joueur

        if (this.player.y >= 830 && this.player.x >= 1088 && this.player.y <= 1000)
        {       
            this.scene.start('sceneExemple',{entrance:"donjon1",});
    
            if (this.sortie == true)
                    {
                        this.sortie = false;
                        // this.cameras.main.fadeOut(0, 0, 0, 0);
                        this.time.delayedCall(500, () => 
                        {
                           this.scene.start('sceneExemple',{entrance:"donjon1",});
                        
                        }
                    
                        )
        }     }

// mouvement des mobs vert le joueur
    this.enemies.getChildren().forEach(enemies => {
        const distance = Phaser.Math.Distance.Between(enemies.x, enemies.y, this.player.x, this.player.y);
        if (distance < 150) {
          enemies.setVelocity(this.player.x - enemies.x, this.player.y - enemies.y);
        } else {
          enemies.setVelocity(0);
        }
      });


          //Attaque
// {
    // if (this.player_facing == "up") {
        // this.atck.create(this.player.x, this.player.y - 32, "up atck");
    // }
    // else if (this.player_facing == "down") {
        // this.atck.create(this.player.x, this.player.y + 32, "atck");
    // }
    // else if (this.player_facing == "right") {
        // this.atck.create(this.player.x + 32, this.player.y, "right_atck");
    // }
    // else if (this.player_facing == "left") {
        // this.atck.create(this.player.x - 32, this.player.y, "left_atck");
    // }
    // this.player_block = true;
    // this.player.setVelocityX(0);
    // this.player.setVelocityY(0);
// 
// }
    }



    //   damage_player()
    //   {
        //   if (this.player.can_get_hit)
        //   {
            //   this.cameras.main.shake(200, 0.0001);
            //   this.player.can_get_hit = false;
            //   this.player.setTint(0xff0000);
            //   this.hp -= 1;
            //   if (this.hp <= 0)
                //   this.kill_player();
            //   setTimeout(this.cd_can_get_hit, 1000, this.player)
        //   }
        // }
        // pertehp()
        // {
        //     if (this.player.can_get_hit)
        //     {
        //         this.cameras.main.shake(200, 0.0001);
        //         this.player.can_get_hit = false;
        //         this.player.setTint(0xff0000);
        //         this.hp -= 1;
        //         if (this.hp <= 0)
        //             this.kill_player();
        //         setTimeout(this.cd_can_get_hit, 1000, this.player)
        //     }
        // }








    //Activation du powerup1 = déstruiction des murs cassable et déblocage du donjon2
    destroy(attack, cassable) {
        attack.disableBody(true,true);
        cassable.disableBody(true, true);
        this.attack = false;
    }


// prise de dégats et invincibilité suivi

        cd_can_get_hit(player)
        {
            player.can_get_hit = true;
            if (!this.game_over)
                player.setTint(0xffffff);
        }
        pertehp(player, enemies){
            this.player_block = true;
            this.player_beHit = true;
            if (enemies.body.touching.left) {
                player.setVelocityX(-400);
            }
            else if (enemies.body.touching.right) {
                player.setVelocityX(400);
            }
            else if (enemies.body.touching.up) {
                player.setVelocityY(-400);
            }
            else if (enemies.body.touching.down) {
                player.setVelocityY(400);
            }
            this.pinvisible();
            this.healthMask.x -= 25;
            this.health -= 25;
            console.log(this.hp)
            if (this.health <= 250) {
                this.explicationText.setVisible(true);
                this.explicationText.setText("Vous êtes mort(e).");
                this.gameOver = true;
                player.setTint(0xff0000);
                this.physics.pause();
            }
            else {
                this.time.delayedCall(200, this.delock_player, [], this);
            }
        }
        



// mouvement des mob quand le joueur n'est pas proche d'eux

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


// attaque du joueur 

    player_attack(direction)
	{
		this.player.is_attacking = true;
		this.player.can_attack = false;
		switch (direction)
		{
			case "left":
				// this.player.anims.play('attack_left');
				this.player.setVelocityX(-10);
				this.player.setVelocityY(0);
				break;
			case "right":
				// this.player.anims.play("attack_right", true);
				this.player.setVelocityX(10);
				this.player.setVelocityY(0);
				break;
			case "back":
				// this.player.anims.play("attack_back",true );
				this.player.setVelocityX(0);
				this.player.setVelocityY(-10);
				break;
			case "front":
				// this.player.anims.play("attack_front",true);
				this.player.setVelocityX(0);
				this.player.setVelocityY(10);
				break;
		}

// couldown attaque

		setTimeout(this.cd_attack, 400, this.player);
		setTimeout(this.cd_can_attack, 500, this.player);
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


    // fonction gain d'argent
gainargent1(player,collider,coffres){
    if (this.player,collider,this.coffres)
    coffres.disableBody,(true, true);
    argent += 10;
    coffres.destroy();
}

    //pinvisible() {
    //    this.player.setVisible(false);
    //    this.time.delayedCall(100, this.pvisible, [], this);
    //}


    // invisibilité du perso quand toucher

    pvisible() {
        if (this.clignotement < 3) {
            this.time.delayedCall(100, this.pinvisible, [], this);
            this.player.visible = true;
            this.clignotement += 1;
        }
        else {
            this.player.visible = true;
            this.clignotement = 0;
            this.player_beHit = false;
        }
    }

}


    