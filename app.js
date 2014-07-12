var prompt = require('sync-prompt').prompt;
var chalk = require('chalk');

var position = [], dollars = [], drafted = [];

function sum (x) {
  var sum = 0
  for (var i = 0; i < x.length; i++) {
    sum += x[i];
  }
  return sum
}

function adjust (i) {
  return balance - i;
}

function convertDollars (x,y,z) {
  return ((x - y) / z);
}

//Setting up the Budget
var balance = prompt('What is your total budget amount? $');
console.log('');

var remain = balance;

while (remain !== 0) {
  var addPosition = prompt('Add position: ');
  position.push(addPosition);
  var addDollars = dollars.push(parseInt(prompt('Position budget (' + chalk.green('$') + chalk.green(remain) + ' remain): $')));
  console.log('');
  remain = (balance - sum(dollars));
}

console.log('');
console.log('Budget:', chalk.green('$' + balance));

//Navigating the draft

var balanceRem = balance;

while (balanceRem > '0') {
  console.log('');
  for (i = 0; i < position.length; i++) {
    console.log(chalk.red(i), position[i], '$' + parseInt(dollars[i]));
  }
  console.log('');
  var draftPlayer = parseInt(prompt('Select number drafted: '));
  z = parseInt(prompt('Actual price of player: $'));
  drafted.push(z);
  balanceRem = (balanceRem - z);
  dollars.splice(draftPlayer, 1, 0);
  var convertFactor = convertDollars(balance, sum(drafted), sum(dollars));
  for (i = 0; i < dollars.length; i++) {
    dollars.splice(i, 1, (dollars[i] * convertFactor));
  }
  console.log('');
  console.log('Remaining Balance:', chalk.green('$' + balanceRem));
}

console.log('');
console.log(chalk.yellow('Congratulations on completing your draft!'));
console.log(chalk.yellow('Best of luck this season!'));
