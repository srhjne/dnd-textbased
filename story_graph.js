"use strict";

var StoryElement = function(text, children){
	this.text = text;
	this.children = children;

	this.add_child = function(child){
		this.children.push(child)
	}
}

var first_step = new StoryElement("some stuff", []);
var second_step = new StoryElement("some more stuff", []);
first_step.add_child(second_step);


var road_setup = new StoryElement("You've been on the Triboar Trail for about half day. As you come around a bend, you spot two dead horses sprawled about fifty feet ahead of you, blocking the path. Each has several black-feathered arrows sticking out of it. The woods press close to the trail here, with a steep embankment and dense thickets on either side. What is your next step? Type 1 to investigate the horses, Type 2 to continue past them",[]);
var horses_setup = new StoryElement("The horses have been dead about a day and were killed by arrows. The saddlebags have already been looted and nearby lies an empty map case. Type 1 to continue.",[]);


var after_combat = new StoryElement("You continue down the road", []);

var attack_round = function(weapon, playerHP, goblinHP){
	console.log("some attack round is happening"+playerHP+goblinHP);
	var attack = player.attacks[weapon];
	var to_hit = Math.floor(Math.random()*20)+1+attack.AB;
	if (to_hit <goblin.AC){
		var p_desc = "You attack with your "+weapon+" and miss!"
	} else {
		var damage = attack.dice*Math.floor(Math.random()*attack.dice_type+1);
		goblinHP = goblinHP - damage;
		if (goblinHP <= 0){
			player.take_damage(player.HP - playerHP);
			player.gain_xp(100);
			return new StoryElement("You attack with your "+weapon+" and kill the goblin!", [after_combat])
		}
		var p_desc = "You attack with you "+weapon+" and deal "+damage+" damage";
	
	};
	var attack_name = Object.keys(goblin.attacks)[Math.floor(Math.random()*Object.keys(goblin.attacks).length)];
	var attack = goblin.attacks[attack_name];
	var to_hit = Math.floor(Math.random()*20)+1+attack.AB;
	if (to_hit < player.AC){
		var desc = "The goblin attacks with his "+ attack_name +" but he misses! "
	} else {
		var damage = attack.dice*Math.floor(Math.random()*attack.dice_type+1);
		playerHP = playerHP - damage;
		if (playerHP <= 0){
			return new StoryElement("Sorry you died! Please refresh to restart game", [])
		}
		var desc = "The goblin attacks with his "+attack+" and deals "+damage+" damage";
	}
	return new StoryElement(p_desc+"<br>"+desc+"<br> It's your turn <br> Type 1 to use your rapier, Type 2 to use your shortbow.",[attack_round("rapier", playerHP, goblinHP), attack_round("shortbow", playerHP, goblinHP)]);
}

var goblin_attack = function(playerHP, goblinHP){
	var attack_name = Object.keys(goblin.attacks)[Math.floor(Math.random()*Object.keys(goblin.attacks).length)];
	var attack = goblin.attacks[attack_name];
	var to_hit = Math.floor(Math.random()*20)+1+attack.AB;
	if (to_hit < player.AC){
		var desc = "The goblin attacks with his "+ attack_name +" but he misses! "
	} else {
		var damage = attack.dice*Math.floor(Math.random()*attack.dice_type+1);
		playerHP = playerHP - damage;
		if (playerHP <= 0){
			return new StoryElement("Sorry you died! Please refresh to restart game", [])
		}
		var desc = "The goblin attacks with his "+attack+" and deals "+damage+" damage";
	}
	return new StoryElement(desc+"<br> It's your turn <br> Type 1 to use your rapier, Type 2 to use your shortbow.",[attack_round("rapier", player.HP, goblin.HP), attack_round("shortbow", player.HP, goblin.HP)]);

}


var player_attack = function(){

}
var start_combat = function(){
var initiative = player.roll_initiative();
var goblin1_initiative = goblin.roll_initiative();
if (initiative < goblin1_initiative) {
	var text = "The goblin attacks first";
	var turn = goblin;
	var children = [goblin_attack()]
} else {
	var text = "You attack first. Type 1 to move in and use your rapier. Type 2 to shoot using your shortbow";

	var turn = player;
	var children = [attack_round("rapier", player.HP, goblin.HP),attack_round("shortbow", player.HP, goblin.HP)]
}
return new StoryElement(text, children)
}


var goblin_ambush = new StoryElement("A goblin leaps out from the bushes to attack! Type 1 to roll initiative", [start_combat()]);
road_setup.add_child(horses_setup);
road_setup.add_child(goblin_ambush);
horses_setup.add_child(goblin_ambush);




