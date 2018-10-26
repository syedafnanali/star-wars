$(document).ready(function(){
    

    $("#bgn").click(function(){
        $(".game-begin").hide(1000);
        $(".content").show(1000);
        $("#attack").hide();
        $("#deffend").hide();
        $("#begin").hide();

        var values = ["stormtrooper","clonetrooper","obiwan","yoda"];
        var names = ["Storm Trooper","Clone Trooper","Obi Wan","Yoda"];
        var points = [180,110,190,150];
        var counter_power = [25,20,15,30];
        var attack = [7,8,10,12];
        gen = false;
        var fighter,defender,defpoints,fightpoints,enemeyChosedAlready=false,playerChoosedAlready=false;
    
        var Character = (function(name,attack_power,counter_attack_power){
            this.name = name;
            this.attack_power = attack_power;
            this.counter_attack_power = counter_attack_power;
        });

        $.extend(Character.prototype,{
             fighter_power:function(points,base){
                points -=this.attack_power; 
                this.attack_power +=base;
                return points;
            },
             defend_power:function(power){
                return power - this.counter_attack_power;
            }
        });

        function generate(){
            for(var i=0;i<4;i++){
                $(".playerfield").append("<div class=\"player\" name=\""+values[i]+"\"><h6>"+names[i]+"</h6><div class=\"imgdiv\"><img src=\"./assets/images/"+values[i]+".jpg\" ></div><h4 id=\""+values[i]+"\">"+points[i]+"</h4></div>");
                $(".playerfield").find(".player").hide();
                $(".playerfield").find(".player").show(1000);
            }
        }

        if(!gen){

            generate();
        }
        
        $(".playerfield").on("click","div.player",function(){
            if(playerChoosedAlready){
                return false;
            }

            var audio = document.getElementById("chose");
            audio.play();
            audio.currentTime -= 50.0;
            playerChoosedAlready = true;
            $("#enemies").show(1000);
            var playername = $(this).attr("name");
            $(this).attr("class","fighter");
            for(var i=0;i<values.length;i++){
                if(values[i] != playername){
                    $(".player").hide(1000);
                    $(".enemypool").append("<div class=\"enemy\" name=\""+values[i]+"\"><h6>"+names[i]+"</h6><div class=\"imgdiv\"><img src=\"./assets/images/"+values[i]+".jpg\" ></div><h4 id=\""+values[i]+"\">"+points[i]+"</h4></div>");
                    $(".enemy").hide();
                    $(".enemy").show(1000);
                }
            }
            fighter = new Character(playername,attack[values.indexOf(playername)],counter_power[values.indexOf(playername)]);
            fightpoints = points[values.indexOf(fighter.name)];
            
        });
        $(".enemypool").on("click","div.enemy",function(){
                if(enemeyChosedAlready){
                    return false;
                }
                
                var audio = document.getElementById("chose");
                audio.play();
                audio.currentTime -= 50.0;
                enemeyChosedAlready = true;
                defname = $(this).attr("name");
                $("#attack").show(1000);
                $("#begin").show(1000);
                $("#deffend").show(1000);
                $(this).hide(1000);
                $(".defenderpool").append("<div class=\"deffender\" name=\""+$(this).attr("name")+"\"><h6>"+names[values.indexOf($(this).attr("name"))]+"</h6><div class=\"imgdiv\"><img src=\"./assets/images/"+values[values.indexOf($(this).attr("name"))]+".jpg\" ></div><h4 id=\""+$(this).attr("name")+"\">"+points[values.indexOf($(this).attr("name"))]+"</h4></div>");
                $(".deffender").hide();
                $(".deffender").show(1000);
                defender = new Character(defname,attack[values.indexOf(defname)],counter_power[values.indexOf(defname)]);
                defpoints = points[values.indexOf(defender.name)];
        });
           $("#attack").on("click",function(){
            $("#begin").hide(1000);

            if(!enemeyChosedAlready){
                return false;
            }

            
            var audio = document.getElementById("knife");
            audio.play();
            audio.currentTime -= 10.0;
            defpoints = defender.defend_power(defpoints);
            fightpoints = fighter.fighter_power(fightpoints,attack[values.indexOf(fighter.name)]);
            $(".deffender").find('#'+defender.name).text(defpoints);
            $('#'+fighter.name).text(fightpoints);
            if(defpoints <= 0){
                $(".deffender").hide(1000);
                $(".deffender").attr("class","dead");
                enemeyChosedAlready = false;
            }
            if(fightpoints <= 0){
                $(".fighter").attr("class","player");
                $(".player").hide(1000);
                $(".enemy").hide(1000);
                $("#attack").hide(1000);
                $("#attack").hide(1000);
                $("#deffend").hide(1000);
                $("#begin").hide(1000);
                $("#enemies").hide(1000);
                enemeyChosedAlready = false;
                playerChoosedAlready = false;     
                $('#exampleModalCenter').modal('show'); 
            }
        });
        $("#close").click(function(){
            $(".content").hide(1000);
            $(".game-begin").show(1000);
            location.reload();
        })
        $("#save").click(function(){
         generate();
         $('#exampleModalCenter').modal('hide'); 
        });
    });
   
    
});