new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    // START GAME
    startGame: function () {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = []
    },
    // ATTACK
    attack: function () {
      let damage = this.calcDamage(3, 10);
      this.monsterHealth -= damage;
      // SHOWING LOG!! HOW MUCH DAMAGE WE DEALT, HOW MUCH DAMAGE WE HEALED OR HOW MUCH DAMAGE WE GOT BY THE MONSTER.
      this.turns.unshift({
        isPlayer: true,
        text: `player hits monster for ${damage}`
      });
      if (this.checkWin()) {
        return true;
      }

      this.monsterAttacks();
    },
    // SPECIAL ATTACK
    specialAttack: function () {
      let damage = this.calcDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `player hits monster hard for ${damage}`
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    // GIVEUP
    giveUp: function () {
      this.gameIsRunning = false;
    },
    // HEAL
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: `player heals for 10`
      });
      this.monsterAttacks();
    },
    // CLACDAMAGE
    calcDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    // CHECKWIN
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won, New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost, New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    // MONSTERATTACKS
    monsterAttacks: function () {
      let damage = this.calcDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: `Monster Hits player ${damage}`
      })
    },




  }
});