export class sceneExemple extends Phaser.Scene{



constructor(){    
    super("sceneExemple");

    this.estSolide;        
    this.plateformes;
    this.score =0;
    this.scoreText;
    this.item
    this.player;
    this.perso;
    this.cursors;
    this.tileset;
    this.playerhp = 100;
    this.gameover =false;
    this.manette =false;
    this.enemie;
    this.argent;
    this.argenttext;
    this.sortie =true;
    this.monstre;
    this.enemies;
    this.coffres;
    // this.enemies = this.enemie;
    this.gainargent = 0;
    this.argent = 100;
    this.onCollide = false;
}

  preload() {

    //Chargement de la map
    this.load.image("tileset", "Tileset.png");
    this.load.tilemapTiledJSON("Map", "Map.json",);
    this.load.spritesheet('perso','animation/perso.gif',{ frameWidth: 32, frameHeight: 64 });

    // chargement de l'inventaire
    this.load.image("ui", "assets/ui.png");
    this.load.image("épée","assets/épée.png");
    this.load.image("or","assets/or.png");
    this.load.image("powerup1","assets/powerup1.png");
    this.load.image("powerup2","assets/powerup2.png");

    this.load.image("coffre","assets/coffre.png");

    // this.load.spritesheet('enemie','asset/monstre.png',
    // { frameWidth: 18, frameHeight: 18 });
}

 create(){


    // ajout de tout les calques du niveau

    const carteDuNiveau = this.add.tilemap("Map");
    const tileset = carteDuNiveau.addTilesetImage(
          "Tileset", // dans le code
          "tileset"  // dans phaser
        ); 
        const sol = carteDuNiveau.createLayer(
        "Calque de Tuiles 1",
        tileset
    )
        const Maison = carteDuNiveau.createLayer(
        "Maison",
        tileset
    )
        const barriere = carteDuNiveau.createLayer(
        "barriere",
        tileset
    )
        const barriereaussi = carteDuNiveau.createLayer(
        "barriere 2",
        tileset
    )
        const Chateau = carteDuNiveau.createLayer(
        "Chateau/chateau",
        tileset
    )
        const barriereencore = carteDuNiveau.createLayer(
        "Chateau/barriere",
        tileset
    )
        const eau = carteDuNiveau.createLayer(
        "eau/eau sol",
        tileset
    )
        const eausol = carteDuNiveau.createLayer(
        "eau/eau ",
        tileset
    )
        const mur = carteDuNiveau.createLayer(
        "Montagne/mur ",
        tileset
    )
        const Mont = carteDuNiveau.createLayer(
        "Montagne/3",
        tileset
    )
        const arbres = carteDuNiveau.createLayer(
        "arbres",
        tileset
    )
        const déco = carteDuNiveau.createLayer(
        "déco",
        tileset
    )
        // const coffre = carteDuNiveau.createLayer(
        // "coffres",
        // tileset
    // )
        const cailloux = carteDuNiveau.createLayer(
        "cailloux",
        tileset
    )    
        const Montagne = carteDuNiveau.createLayer(
        "Montagne/montagne",
        tileset
    )
        const murchateau = carteDuNiveau.createLayer(
        "Chateau/mur chateau",
        tileset
    )
        // const coffre2 = carteDuNiveau.createLayer(
        // "coffre2",
        // tileset
    // )
        // const coffre3 = carteDuNiveau.createLayer(
        // "coffre3",
        // tileset
    // )
        // const coffre4 = carteDuNiveau.createLayer(
        // "coffre4",
        // tileset
    // )
        // const coffre5 = carteDuNiveau.createLayer(
        // "coffre5",
        // tileset
    // )
        // const coffre6 = carteDuNiveau.createLayer(
        // "coffre6",
        // tileset
    // )
        // const coffre7 = carteDuNiveau.createLayer(
        // "coffre7",
        // tileset
    // )
        // const coffre8 = carteDuNiveau.createLayer(
        // "coffre8",
        // tileset
    // )
        // const coffre9 = carteDuNiveau.createLayer(
        // "coffre9",
        // tileset
    // )
        const donjonporte = carteDuNiveau.createLayer(
        "porte donjon 1",
        tileset
    )
    const donjonfinporte = carteDuNiveau.createLayer(
        "Chateau/porte donjon2",
        tileset
    )
    const Shop=carteDuNiveau.createLayer(
        "shop",
        tileset
    )
    const rien = carteDuNiveau.createLayer(
        "Calque de Tuiles 17",
        tileset
    )
    
     // mise en place des l'enemies

         // this.enemie = this.physics.add.sprite(500, 1300, 'enemie');
         // this.enemie.setBounce(0.2);
         // this.enemie.setCollideWorldBounds(true);
        //  this.physics.add.collider(this.enemies,Maison);
        //  this.physics.add.collider(this.enemies,arbres);
               
        // this.enemies= this.physics.add.group ({allowGravity:false})
        // this.enemies.create(1600,4000, 'enemie');
        // this.enemies.create(1620,4020, 'enemie');
        // this.enemies.create(1580,4080, 'enemie');
        // this.physics.add.collider(this.enemies,this.player )
        // this.coffre.setCollideWorldBounds(-1, true);
        // this.physics.add.overlap(this.player, this.enemies, this.damage_player, null, this);


    //mise en place des coffres 

    this.coffres=this.physics.add.group({allowGravity:false})
    this.coffres.create(2384,5088,'coffre',this.gainargent1);
    this.coffres.create(5712,2464,'coffre',this.gainargent1);
    this.coffres.create(2992,4496,'coffre',this.gainargent1);
    this.coffres.create(2960,3616,'coffre',this.gainargent1);
    this.coffres.create(4816,5136,'coffre',this.gainargent1);
    this.coffres.create(5872,4656,'coffre',this.gainargent1);
    this.coffres.create(6128,3872,'coffre',this.gainargent1);
    this.coffres.create(4656,1410,'coffre',this.gainargent1);
    this.coffres.create(3858,2765,'coffre',this.gainargent1);
    // this.coffres.create()
    // this.add.image(2384,5088,"coffre",this.gainargent1);
    // this.physics.add.collider(this.player,this.coffre,this.gainargent1,null,this)
 


    // mise en place du perso

    this.player = this.physics.add.sprite(1500, 4000, 'perso');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.5);


    // mise en place du shop

    this.Shop = this.physics.add.sprite(3824,4080);
            
    
    // mécaniques de mouvements et choix des touches pour se déplacer

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
    this.anims.create({
        key: 'down',
        frames:this.anims.generateFrameNumbers('perso',{start:0,end:-3}),
        frameRate:10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames:this.anims.generateFrameNumbers('perso',{start:-4,end:-8}),
        frameRate:10,
        repeat: -1
    });


    // mise en place du clavier et de la manette

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.gamepad.once('connected', function (pad) {
        console.log("Manette Connecté");
        this.controller = pad;
    }, this);

    // mise en place de la camera et du suivit du joueur

    this.physics.world.setBounds(0, 0, 8000, 8000);
    this.cameras.main.fadeIn(0, 0, 1500,4000);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2);
    // this.cameras.setScale(0.1);


    //création de l'inventaire

    this.add.image(360, 220, "ui").setScrollFactor(0).setScale(1);
    this.add.image(360,225,"épée").setScrollFactor(0).setScale(1);
    this.add.text(280,200,this.playerhp,{font:'16 Arial',fill:'#FF0000'}).setScrollFactor(0).setScale(1);
    this.add.image(360,220,"or").setScrollFactor(0).setScale(1);
    this.add.text(330,200,this.argent,{font:'16 Arial',fill:'#fff000'}).setScrollFactor(0).setScale(1);
    this.add.image(360,220,"powerup1").setScrollFactor(0).setScale(1).alpha =0.2;
    this.add.image(360,220,"powerup2").setScrollFactor(0).setScale(1).alpha =0.2;
                

    // Debut de la mise en place de la colision du joueur et de l'enemie avec les plateformes et entre eux deux 

    arbres.setCollisionByProperty({ estSolide:true});
    this.physics.add.collider(this.player, arbres)
    Maison.setCollisionByProperty({ estSolide:true});
    this.physics.add.collider(this.player, Maison)
    barriere.setCollisionByProperty({ estSolide:true});
    this.physics.add.collider(this.player,barriere)
    barriereaussi.setCollisionByProperty({estSolide:true});
    this.physics.add.collider(this.player,barriereaussi)
    barriereencore.setCollisionByProperty({estSolide:true});
    this.physics.add.collider(this.player,barriereencore)
    mur.setCollisionByProperty({estSolide:true});
    this.physics.add.collider(this.player,mur)
    Montagne.setCollisionByProperty({estSolide:true});
    this.physics.add.collider(this.player, Montagne)
    cailloux.setCollisionByProperty({estSolide:true});
    this.physics.add.collider(this.player, cailloux)
    eau.setCollisionByProperty({estSolide:true});
    this.physics.add.collider(this.player, eau)
    murchateau.setCollisionByProperty({estSolide:true});
    this.physics.add.collider(this.player,murchateau)
    // coffre.setCollisionByProperty({estSolide:true});
    // this.physics.add.collider(this.player,this.coffre,this.gainargent1,null,this)
    // coffre2.setCollisionByProperty({estSolide:true});
    // this.physics.add.collider(this.player,this.coffre2,this.gainargent2,null,this)
    // coffre3.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,coffre3,this.gainargent);
    // coffre4.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,coffre4,this.gainargent);
    // coffre5.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,coffre5,this.gainargent);
    // coffre6.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,coffre6,this.gainargent);
    // coffre7.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,coffre7,this.gainargent);
    // coffre8.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,coffre8,this.gainargent);
    // coffre9.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,coffre9,this.gainargent);
    // donjonporte.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player,donjonporte,this.changeScene,null,this);
    this.physics.add.collider(this.coffres,this.player)
    this.physics.add.collider(this.coffres,sol)
    this.physics.add.collider(this.coffres,Maison)

}

 update()
{

    // mouvement du joueur

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

    // deplacement des monstres vers le joueur

    // this.enemies.getChildren().forEach(enemies => {
        // const distance = Phaser.Math.Distance.Between(enemies.x, enemies.y, this.player.x, this.player.y);
        // if (distance < 300) {
        //   enemies.setVelocity(this.player.x - enemies.x, this.player.y - enemies.y);
        // } else {
        //   enemies.setVelocity(0);
        // }
    //   });

    // if (this.enemies_once)
    // {
        // this.enemies.each(function (enemies) {
            // if (enemies.can_move)
            // {
                // this.physics.moveToObject(enemies, this.player, 50);
            // }
            // if (enemies.x < this.player.x)
                // enemies.setFlipX(true);
            // else
                // enemies.setFlipX(false);
        // }, this)
    // }

// déplacement des monstres quand le joueur est loin

        // this.direction = Phaser.Math.RND.between(0,3);
    // this.speed = Phaser.Math.RND.between(50,100);
    // switch(direction){
        // case 0:
            // this.body.setVelocity(speed,0);
            // break;
        // case 1:
            // this.body.setVelocity(-speed,0);
            // break;
        // case 2:
            // this.body.setVelocity(0,speed);
            // break;
        // case 3:
            // this.body.setVelocity(0, -speed);
            // break;
    // }      



    // téléportation du joueur vers les donjons

    if (this.player.x >= 4384 && this.player.y <= 2368 && this.player.x <= 4560)
       {       
        this.scene.start('donjon2',{entrance:"sceneExemple",});

        if (this.sortie == true)
    			{
    				this.sortie = false;
    				// this.cameras.main.fadeOut(400, 0, 0, 0);
    				this.time.delayedCall(500, () => 
                    {
                       this.scene.start('donjon2',{entrance:"sceneExemple",});
                    
    				}
                
                    )
    }
    }

    if (this.player.y >= 4544 && this.player.x >= 6368 && this.player.y <= 4624)
    {       
        this.scene.start('donjon1',{entrance:"sceneExemple",});

        if (this.sortie == true)
    			{
    				this.sortie = false;
    				// this.cameras.main.fadeOut(0, 0, 0, 0);
    				this.time.delayedCall(500, () => 
                    {
                       this.scene.start('donjon1',{entrance:"sceneExemple",});
                    
    				}
                
                    )


    }
}
}



// fonction gain d'argent
gainargent1(player,collider,coffres){
    if (this.player,collider,this.coffres)
    coffres.disableBody,(true, true);
    argent += 10;
    coffres.destroy();
}


// fonction prise de dégat du joueur et couldown


// function damage_player()
    // {
        // if (this.player.can_get_hit)
        // {
            // this.player.can_get_hit = false;
            // this.player.setTint(0xff0000);
            // this.playerhp -= 1;
            // if (this.hp <= 0)
                // this.kill_player();
            // setTimeout(this.cd_can_get_hit, 1000, this.player)
        // }}
// 
}