
 
var Character = function(stats){
  this.day = stats.day;
  this.XP = stats.XP;
  this.HP = stats.HP;
  this.money = stats.money;
  this.dex = stats.dex;
  this.wis = stats.wis;
  this.con = stats.con;
  this.char = stats.char;
  this.level = stats.level;
  this.int = stats.int;
  this.attacks = stats.attacks;
  this.AC = stats.AC;

  this.gain_xp = function(xp){
  	this.xp=this.xp+xp;
  }
  this.take_damage = function(damage){
  		this.HP = this.HP - damage;
  	}
  this.roll_initiative = function(){
  	return Math.floor((Math.random() * 20) + 1)+this.dex;
  }
};

var Enemy = function(stats){
	this.HP = stats.HP;
	this.dex = stats.dex;
  	this.wis = stats.wis;
  	this.con = stats.con;
  	this.char = stats.char;
  	this.int = stats.int;
  	this.attacks = stats.attacks;

  	this.roll_initiative = function(){
  	return Math.floor((Math.random() * 20) + 1)+this.dex;
  }
  	this.take_damage = function(damage){
  		this.HP = this.HP - damage;
  	}
}

var attacks = {"rapier":{AB:5, dice:1, dice_type:8}, "shortbow":{AB:5, dice:1, dice_type:6}}
var player = new Character({attacks: attacks, day:0, XP:0, HP:8, money: 15, dex: 3, wis:1, con:1, char:-1, level:1, int: 2, AC:14});

var attacks = {"rapier":{AB:5, dice:1, dice_type:8}}
var goblin = new Enemy({attacks: attacks,HP:8, dex:0 ,wis:0, con:0,char:0,int:0, AC:10});
