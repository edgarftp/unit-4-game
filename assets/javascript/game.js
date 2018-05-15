var starWars = {
    charSelected: "",
    charIndex: null,
    enemiesArray: [],
    chosenEnemy: "",
    enemiesID: [],
    btnClicks: 1,
    chosen: null,
    fighter: null,
    fightersLeft: 3,
    audiofx: "",
    soundfx: ["assets/soundfx/lightsaberfx.mp3","assets/soundfx/lightsaber1fx.mp3","assets/soundfx/lightsaber2fx.mp3","assets/soundfx/lightsaber3fx.mp3","assets/soundfx/lightsaber4fx.mp3","assets/soundfx/shotsfx.mp3"],


    characters: [{
        name: "Obi Wan Kenobi",
        id: "obi",
        initialAD: 16,
        AD: 16,
        Counter: 18,
        hp: 125,
        audio: "assets/soundfx/obifx.mp3"
        },
        {
        name: "Yoda",
        id: "yoda",
        initialAD:14,
        AD: 14,
        Counter: 25,
        hp: 120,
        audio: "assets/soundfx/yodafx.mp3"
        },
        {
        name: "Darth Vader",
        id: "darth",
        initialAD: 10,
        AD: 10,
        Counter: 20,
        hp: 145,
        audio: "assets/soundfx/darthfx.mp3"
        },
        {
        name: "Boba Fett",
        id: "boba",
        initialAD: 18,
        AD: 18,
        Counter: 28,
        hp: 110,
        audio: "assets/soundfx/bobafx.mp3"
        }
    ],
    find_index: function() {
        for (i=0; i<starWars.characters.length; i++) {
            if (this.charSelected == this.characters[i].id) {
                this.charIndex = i;
                this.chosen = this.characters[i];
            }
            else {
                this.enemiesArray.push(i);
            }
        }
    },
    reset_game: function (){
        $("#chose-player").removeClass("hide");
        $("#chosen").addClass("hide");
        $("#enemies").addClass("hide");
        $("#fighter").addClass("hide");
        $("#chosen-dmg").empty();
        $("#fighter-dmg").empty();
        this.fightersLeft= 3;
        this.charSelected= "";
        this.charIndex= null;
        this.enemiesArray= [];
        this.chosenEnemy= "";
        this.enemiesID= [];
        this.btnClicks= 1;
        this.chosen= null;
        this.fighter= null;
        this.characters[0].AD = 16;
        this.characters[0].hp = 125;
        this.characters[1].AD = 14;
        this.characters[1].hp = 120;
        this.characters[2].AD = 10;
        this.characters[2].hp = 145;
        this.characters[3].AD = 18;
        this.characters[3].hp = 110;

        this.display_name_hp();

    },

    start_game_display: function (){
        $("#chosen").addClass("hide");
        this.display_name_hp();
        $("#enemies").addClass("hide");
        $("#fighter").addClass("hide");
        $("#audiofx").addClass("hide");
    },

    start_game: function (event) {
        console.log(event);
        this.charSelected = event.currentTarget.id;
        this.find_index();
        $("#chose-player").addClass("hide");
        this.display_char(this.charSelected);
        this.display_enemies(); 
        var audioFX = $("#audiofx");
        audioFX.attr("src", this.audiofx);
        audioFX.attr("autoplay", 1); 

    },

    display_name_hp: function () {
        $("#obi-name").text(this.characters[0].name);
        $(".obi-img").attr("src", "assets/images/obi.jpg");
        $("#obi-hp").text((this.characters[0].hp) + " HP");
        $("#yoda-name").text(this.characters[1].name);
        $(".yoda-img").attr("src", "assets/images/yoda.jpg");
        $("#yoda-hp").text(this.characters[1].hp + " HP");
        $("#darth-name").text(this.characters[2].name);
        $(".darth-img").attr("src", "assets/images/darth.jpg");
        $("#darth-hp").text(this.characters[2].hp + " HP");
        $("#boba-name").text(this.characters[3].name);
        $(".boba-img").attr("src", "assets/images/boba.jpg");
        $("#boba-hp").text(this.characters[3].hp + " HP");
    },

    display_char: function (char) {
        $("#chosen").removeClass("hide");
        let selected = this.characters[this.charIndex];
        $("#chosen-name").text(selected.name);
        $("#chosen-img").attr("src", "assets/images/" + char + ".jpg");
        $("#chosen-hp").text(selected.hp);
        this.audiofx = selected.audio;
        
    },

    display_enemies: function () {
        $("#enemies").removeClass("hide");
        $("#enemy_0").removeClass("hide");
        $("#enemy_1").removeClass("hide");
        $("#enemy_2").removeClass("hide");
        for (i=0 ; i < this.enemiesArray.length ; i++) {
            var char = this.characters[this.enemiesArray[i]];
            var name = ("#enemy" + i + "-name");
            var image = ("#enemy" + i + "-img");
            var hp = ("#enemy" + i + "-hp");
            $(name).text(char.name);
            $(image).attr("src", "assets/images/" + char.id + ".jpg");
            $(hp).text(char.hp);
            this.enemiesID.push("enemy_" + i);
        }
            
    },

    chosen_fighter: function (enemy) {
        this.fightersLeft --;
        this.chosenEnemy = enemy.currentTarget.id;
        for (i=0 ; i < this.enemiesArray.length ; i++) {
            if (this.chosenEnemy == this.enemiesID[i]) {
                
                $("#fighter").removeClass("hide");
                $("#" + this.chosenEnemy).addClass("hide");
                var char = this.characters[this.enemiesArray[i]]
                this.fighter = char;
                console.log(char);
                var name = ("#fighter" + "-name");
                var image = ("#fighter" + "-img");
                var hp = ("#fighter" + "-hp");
                $(name).text(char.name);
                $(image).attr("src", "assets/images/" + char.id + ".jpg");
                $(hp).text(char.hp);
            }
        }
    },

    fight: function () {
        if (this.chosenEnemy != "") {
            var rand = Math.floor(Math.random()*this.soundfx.length);
            this.audiofx = this.soundfx[rand];
            var soundFX = $("#audiofx");
            soundFX.attr("src", this.audiofx);
            soundFX.attr("autoplay", 1); 
            
            this.fighter.hp -= this.chosen.AD;
            this.chosen.AD = this.chosen.initialAD * this.btnClicks;
            console.log(this.btnClicks);
            this.btnClicks++;
            $("#fighter-hp").text(this.fighter.hp);
            $("#chosen-dmg").text("You attacked " + this.fighter.name + " for " + this.chosen.AD + " damage.");

            if (this.fighter.hp > 0) {
                this.chosen.hp -= this.fighter.Counter;
                $("#chosen-hp").text(this.chosen.hp);
                $("#fighter-dmg").text (this.fighter.name + " counter attacked damaging your health by " + this.fighter.Counter + ".");
            }
            else {
                if (this.fightersLeft == 0){
                    alert("CONGRATULATIONS YOU WON!!");
                    this.reset_game();
                } else{
                $("#fighter").addClass("hide");
                $("#chosen-dmg").text("You defeated " + this.fighter.name);
                $("#fighter-dmg").empty();
                this.fighter.hp = 0;
                $("#fighter-hp").text(this.fighter.hp);
                this.chosenEnemy = "";
                }
                
            }

            if (this.chosen.hp <= 0) {  
                alert("LOSER!!")
                this.reset_game();
            }
        }
    }
};
$(document).ready(function () {
    starWars.start_game_display();

    $(".line-1").on("click", function (event) {
        starWars.start_game(event);
          
    })
    
    $(".char-enemy").on("click", function (event) {
        if (starWars.chosenEnemy == "") {
            starWars.chosen_fighter(event);
        }
    })
    

    $("#attack-btn").on("click", function () {
        starWars.fight();
    })



});

