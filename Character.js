var Adventure = Adventure || {};
 
Adventure.Character = {};
 
Adventure.Character.init = function(stats){
  this.day = stats.day;
  this.XP = stats.XP;
  this.HP = stats.HP;
  this.money = stats.money;
};