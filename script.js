console.log('sourced');

var count = 14;
var fruitsForSale = {
  banana: {price: (Math.floor(Math.random() * 950) + 50)/100},
  apple: {price: (Math.floor(Math.random() * 950) + 50)/100},
  grape: {price: (Math.floor(Math.random() * 950) + 50)/100},
  orange: {price: (Math.floor(Math.random() * 950) + 50)/100}
};
var totalMonies = 100;
var inventory = [];

$(document).ready(function(){
  for (var fruit in fruitsForSale) {
    $('#' + fruit + 'Price').html(fruitsForSale[fruit].price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  }
});

var interval = setInterval(function(){
  console.log('in set interval');
  $('#countDown').html(':' + count);
  if (count === 0 ){
    count = 15;
    updatePrices();
    displayFruit();
    //update prices
    //update display
  } else {
    count--;

  }
}, 1000);

var updatePrices = function () {
  //go through each oject and change price property by random 0-.50
  for (var fruit in fruitsForSale) {
    var randomChange = (Math.random() /2 + 0.01).toFixed(2);
    randomChange = Number(randomChange);
    if (Math.random() > .5){
      randomChange *= -1;
    }
    fruitsForSale[fruit].price += randomChange;
    if(fruitsForSale[fruit].price < .50){
      fruitsForSale[fruit].price = .50;
    }else if(fruitsForSale[fruit].price > 9.99){
      fruitsForSale[fruit].price = 9.99;
    }
    console.log(fruitsForSale[fruit].price);

  }

};//end updatePrices

var buyFruit = function (fruit){
    //if not enough money can't buyFruit
  if ( totalMonies < fruitsForSale[fruit].price){
    //----------------need error

  }
    //else deduct money, add fruit
    else {
    totalMonies -= fruitsForSale[fruit].price;
    inventory.push({
      name: fruit,
      price: fruitsForSale[fruit].price,
    });
    //if money is less than .50 stop interval
    if (totalMonies < 0.50 ){
      clearInterval(interval);
      alert('NO MORE MONIES!!!');
    }
    //call display and calculate
    displayFruit();
  }

};

var displayFruit = function () {
  //create individual fruit arrays
  var apples = [];
  var bananas = [];
  var grapes = [];
  var oranges = [];

  for (var i = 0; i < inventory.length; i++) {
    switch (inventory[i].name) {
      case 'apple':
        apples.push(inventory[i]);
        break;
      case 'banana':
        bananas.push(inventory[i]);
        break;
      case 'grape':
        grapes.push(inventory[i]);
        break;
      case 'orange':
        oranges.push(inventory[i]);
        break;
    }//close switch
  }//close for
  // calculate average price of each type of fruit
  var appleTotalPrice = 0;
  for (var i = 0; i < apples.length; i++) {
    appleTotalPrice += apples[i].price;
  }
  var bananaTotalPrice = 0;
  for (var i = 0; i < bananas.length; i++) {
    bananaTotalPrice += bananas[i].price;
  }
  var grapeTotalPrice = 0;
  for (var i = 0; i < grapes.length; i++) {
    grapeTotalPrice += grapes[i].price;
  }
  var orangeTotalPrice = 0;
  for (var i = 0; i < oranges.length; i++) {
    orangeTotalPrice += oranges[i].price;
  }
  var appleAveragePrice = appleTotalPrice / apples.length;
  var bananaAveragePrice = bananaTotalPrice / bananas.length;
  var grapeAveragePrice = grapeTotalPrice / grapes.length;
  var orangeAveragePrice = orangeTotalPrice / oranges.length;
  //update totalMonies
  //convert to USD
  //display totalMonies
  $('#showMoney').html(totalMonies.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  //update new prices of fruitsForSale
  $('#applePrice').html(fruitsForSale.apple.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#orangePrice').html(fruitsForSale.orange.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#bananaPrice').html(fruitsForSale.banana.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#grapePrice').html(fruitsForSale.grape.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  //calculate how many of each fruit they have .length and display
  // #[fruitCount] = fruitArray.length
  var appleCount = apples.length;
  var bananaCount = bananas.length;
  var grapeCount = grapes.length;
  var orangeCount = oranges.length;

  if (appleCount === 1) {
    appleCount += ' apple';
  }
  else {
    appleCount += ' apples';
  }

  if (bananaCount === 1) {
    bananaCount += ' banana';
  }
  else {
    bananaCount += ' bananas';
  }

  if (grapeCount === 1) {
    grapeCount += ' grape';
  }
  else {
    grapeCount += ' grapes';
  }

  if (orangeCount === 1) {
    orangeCount += ' orange';
  }
  else {
    orangeCount += ' oranges';
  }
  $('#appleCount').html(appleCount);
  $('#bananaCount').html(bananaCount);
  $('#grapeCount').html(grapeCount);
  $('#orangeCount').html(orangeCount);
  // #[averageFruit] = fruitAveragePrice
  if (appleAveragePrice > 0){
    $('#averageApple').html(appleAveragePrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  }
  else {
    $('#averageApple').html('$0.00');
  }
  if (bananaAveragePrice > 0){
    $('#averageBanana').html(bananaAveragePrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  }
  else {
    $('#averageBanana').html('$0.00');
  }
  if (grapeAveragePrice > 0){
    $('#averageGrape').html(grapeAveragePrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  }
  else {
    $('#averageGrape').html('$0.00');
  }
  if (orangeAveragePrice > 0){
    $('#averageOrange').html(orangeAveragePrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  }
  else {
    $('#averageOrange').html('$0.00');
  }
  // #[totalFruit] = fruitTotalPrice
  $('#totalApple').html(appleTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#totalBanana').html(bananaTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#totalGrape').html(grapeTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#totalOrange').html(orangeTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  //display
  //calculate total price of each fruit in inventory

  for (var fruit in fruitsForSale) {
    if (fruitsForSale[fruit].price > totalMonies) {
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).addClass('btn-danger');
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).html('Can\'t Buy');
    }
    if (fruitsForSale[fruit].price < totalMonies) {
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).removeClass('btn-danger');
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).html('Buy!');
    }
  }
};

var sellFruit = function(fruit){
  for (var i = 0; i < inventory.length; i++) {
    if(inventory[i].name === fruit){
      inventory.splice(i, 1);
      totalMonies += fruitsForSale[fruit].price;
      displayFruit();
      break;
    }
  }
};
