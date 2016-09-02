console.log('sourced');
//count starts at 15 in html file, setting to 14 here will start the decrementing on the first interval
var count = 14;
var totalMinutes = 4;
var totalSeconds = 59;
var totalMonies = 100;
var inventory = [];
//set random initial price for each fruit
var fruitsForSale = {
  pear: {price: (Math.floor(Math.random() * 950) + 50)/100},
  redGrape: {price: (Math.floor(Math.random() * 950) + 50)/100},
  grape: {price: (Math.floor(Math.random() * 950) + 50)/100},
  orange: {price: (Math.floor(Math.random() * 950) + 50)/100}
};

//update DOM with initial fruit prices
$(document).ready(function(){
  for (var fruit in fruitsForSale) {
    $('#' + fruit + 'Price').html(fruitsForSale[fruit].price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
    //change sell buttons to can't sell
    $('#sell' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).addClass('btn-danger');
    $('#sell' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).html('Can\'t Sell');
  }
  $('#totalTime').html('5:00');
});//end doc ready

//every second, update the count, the prices, and the display
var interval = setInterval(function(){
  console.log('in set interval');
  //if count is single-digit, add a leading zero
  if (count < 10) {
    $('#countDown').html(':0' + count);
  }
  else {
    $('#countDown').html(':' + count);
  }//end if/else
  //if totalSeconds is single-digit, add a leading zero
  if (totalSeconds < 10) {
    $('#totalTime').html(totalMinutes + ":0" + totalSeconds);
  }
  else {
    $('#totalTime').html(totalMinutes + ":" + totalSeconds);
  }//end if/else

  if (count === 0 ){
    count = 15;
    updatePrices();
    displayFruit();
    //update prices
    //update display
  } else {
    count--;
  }//end if/else
  //check timer
  if (totalSeconds === 0) {
    //if both minutes and seconds are zero
    if (totalMinutes === 0){
      //--------sell all fruit, display earnings, stop loop
      for (var i = 0; inventory.length; ) {
        sellFruit(inventory[i].name);
      }
      clearInterval(interval);
      //display end game messages
      $('#standStatus').html('The Fruit Stand is closed!');
      $('#totalTime').html('');
      if (totalMonies > 100) {
        $('#myWallet').append('<br/><text>You earned ' + (totalMonies - 100).toLocaleString('USD', {style: 'currency', currency: "USD"}) + ' </text>');
      }
      else if(totalMonies === 100){
        $('#myWallet').append('<br/><text>You broke even!</text>');
      }
      else {
        $('#myWallet').append('<br/><text>You lost ' + ((totalMonies - 100) * -1).toLocaleString('USD', {style: 'currency', currency: "USD"}) + ' </text>');
      }

      $('#priceChange').html('Thanks for shopping!');
      $('#countDown').html('');
    }
    //if minutes is > 0
    else {
      totalMinutes--;
      totalSeconds = 59;
    }//end if/else
  }
  //if seconds > 0
  else {
    totalSeconds--;
  }//end outer if/else
}, 1000);//end interval

var buyFruit = function (fruit){
  //if not enough money can't buyFruit
  if ( totalMonies < fruitsForSale[fruit].price){
    //no action
  }//end if
  //else deduct money, add fruit to inventory
  else {
    totalMonies -= fruitsForSale[fruit].price;
    //push fruit object to inventory
    inventory.push({
      name: fruit,
      price: fruitsForSale[fruit].price,
    });//end push
    //if money is less than .50 stop interval
    if (totalMonies < 0.50 ){
      //-----------------------------stop loop---still necessary with sell button?
      // clearInterval(interval); removed stop as user should be able to sell at this point
      alert('NO MORE MONIES!!!');
    }//end if
    //call displayFruit
    displayFruit();
  }//end else
};//end buyFruit

//calculates inventory $$ amounts, updates full display
var displayFruit = function () {
  //create individual fruit arrays
  var redGrapes = [];
  var pears = [];
  var grapes = [];
  var oranges = [];
  //filter inventory into individual arrays
  for (var i = 0; i < inventory.length; i++) {
    switch (inventory[i].name) {
      case 'redGrape':
        redGrapes.push(inventory[i]);
        break;
      case 'pear':
        pears.push(inventory[i]);
        break;
      case 'grape':
        grapes.push(inventory[i]);
        break;
      case 'orange':
        oranges.push(inventory[i]);
        break;
    }//close switch
  }//close for
  // calculate total price of each type of fruit
  var redGrapeTotalPrice = 0;
  for (var i = 0; i < redGrapes.length; i++) {
    redGrapeTotalPrice += redGrapes[i].price;
  }
  var pearTotalPrice = 0;
  for (var i = 0; i < pears.length; i++) {
    pearTotalPrice += pears[i].price;
  }
  var grapeTotalPrice = 0;
  for (var i = 0; i < grapes.length; i++) {
    grapeTotalPrice += grapes[i].price;
  }
  var orangeTotalPrice = 0;
  for (var i = 0; i < oranges.length; i++) {
    orangeTotalPrice += oranges[i].price;
  }
  // calculate average price of each type of fruit
  var redGrapeAveragePrice = redGrapeTotalPrice / redGrapes.length;
  var pearAveragePrice = pearTotalPrice / pears.length;
  var grapeAveragePrice = grapeTotalPrice / grapes.length;
  var orangeAveragePrice = orangeTotalPrice / oranges.length;
  //end calculations
  //start display updates
  //convert totalMonies to USD and display
  $('#showMoney').html(totalMonies.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  //update new prices of fruitsForSale
  $('#redGrapePrice').html(fruitsForSale.redGrape.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#orangePrice').html(fruitsForSale.orange.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#pearPrice').html(fruitsForSale.pear.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#grapePrice').html(fruitsForSale.grape.price.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  //end fruit price update
  // create singluar/plural count string for each fruit and add to DOM
  var redGrapeCount = redGrapes.length;
  var pearCount = pears.length;
  var grapeCount = grapes.length;
  var orangeCount = oranges.length;

  if (redGrapeCount === 1) {
    redGrapeCount += ' red grape';
  }
  else {
    redGrapeCount += ' red grapes';
  }

  if (pearCount === 1) {
    pearCount += ' pear';
  }
  else {
    pearCount += ' pears';
  }

  if (grapeCount === 1) {
    grapeCount += ' green grape';
  }
  else {
    grapeCount += ' green grapes';
  }

  if (orangeCount === 1) {
    orangeCount += ' orange';
  }
  else {
    orangeCount += ' oranges';
  }

  $('#redGrapeCount').html(redGrapeCount);
  $('#pearCount').html(pearCount);
  $('#grapeCount').html(grapeCount);
  $('#orangeCount').html(orangeCount);
  //end fruit count update
  // format average price to USD and add to DOM
  if (redGrapeAveragePrice > 0){
    $('#averageRedGrape').html(redGrapeAveragePrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  }
  else {
    $('#averageRedGrape').html('$0.00');
  }
  if (pearAveragePrice > 0){
    $('#averagePear').html(pearAveragePrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  }
  else {
    $('#averagePear').html('$0.00');
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
  //end average price update
  //format total spent on each fruit to USD and add to DOM
  $('#totalRedGrape').html(redGrapeTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#totalPear').html(pearTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#totalGrape').html(grapeTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  $('#totalOrange').html(orangeTotalPrice.toLocaleString('USD', {style: 'currency', currency: "USD"}));
  //end total price update
  //update buttons depending on whether user can afford each fruit
  for (var fruit in fruitsForSale) {
    if (fruitsForSale[fruit].price > totalMonies) {
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).addClass('btn-danger');
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).html('Can\'t Buy');
    }//end if
    if (fruitsForSale[fruit].price < totalMonies) {
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).removeClass('btn-danger');
      $('#buy' + fruit.charAt(0).toUpperCase() + fruit.slice(1)).html('Buy!');
    }//end if
  }//end for
  //update sale buttons
  if (redGrapes.length > 0) {
    $('#sellRedGrape').removeClass('btn-danger');
    $('#sellRedGrape').html('Sell!');
  }//end if
  else {
    $('#sellRedGrape').addClass('btn-danger');
    $('#sellRedGrape').html('Can\'t Sell');
  }//end else
  if (pears.length > 0) {
    $('#sellPear').removeClass('btn-danger');
    $('#sellPear').html('Sell!');
  }//end if
  else {
    $('#sellPear').addClass('btn-danger');
    $('#sellPear').html('Can\'t Sell');
  }//end else
  if (grapes.length > 0) {
    $('#sellGrape').removeClass('btn-danger');
    $('#sellGrape').html('Sell!');
  }//end if
  else {
    $('#sellGrape').addClass('btn-danger');
    $('#sellGrape').html('Can\'t Sell');
  }//end else
  if (oranges.length > 0) {
    $('#sellOrange').removeClass('btn-danger');
    $('#sellOrange').html('Sell!');
  }//end if
  else {
    $('#sellOrange').addClass('btn-danger');
    $('#sellOrange').html('Can\'t Sell');
  }//end else
  //end button update
};//end displayFruit

var sellFruit = function(fruit){
  //start searching inventory for fruit
  for (var i = 0; i < inventory.length; i++) {
    if(inventory[i].name === fruit){
      //once first fruit is found, remove from array, add sale price to totalMonies, update display, then break out of the loop
      inventory.splice(i, 1);
      totalMonies += fruitsForSale[fruit].price;
      displayFruit();
      break;
    }//end if
  }//end for
};//end sellFruit

var updatePrices = function () {
  //go through each oject and change price property by random 0-.50
  for (var fruit in fruitsForSale) {
    //random change amt, 0.00... to 0.99..., divided by 2 to get 0.00 - 0.49..., + .01, to 2 digits
    var randomChange = (Math.random() /2 + 0.01).toFixed(2);
    //make it a number
    randomChange = Number(randomChange);
    //coin flip to determine + or -
    if (Math.random() > .5){
      randomChange *= -1;
    }//end if
    fruitsForSale[fruit].price += randomChange;
    if(fruitsForSale[fruit].price < .50){
      fruitsForSale[fruit].price = .50;
    }else if(fruitsForSale[fruit].price > 9.99){
      fruitsForSale[fruit].price = 9.99;
    }//end if/else if
    // console.log(fruitsForSale[fruit].price);
  }//end for
};//end updatePrices
