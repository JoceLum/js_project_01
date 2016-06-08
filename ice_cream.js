var sigFlav = document.getElementById("sigFlav");
var pickSig = document.getElementById("pickSig");
var order = document.getElementById("order");

//signature ice creams 
var sigFlavours = ['Smurf Explosion',
				'Wasabi Pea Dust',
				'Fig & Fresh Wild Turkey',
				'Kumquat Sriracha',
				'Sichuan Pepper Chocolate',
				'Alaska Fireweed and Honey',
				'Chocolate Chipotle Orange',
				'Kimchi & Rice',
        'Whiskey Prune',
        'Kitty Kitty Bang Bang',
        'Grass',
        'Cracker Jack',
        'Secret Breakfast',
        'Zen Butter',
        'Creamed Cod',
				'Bone Marrow & Bourbon Smoked Cherries',
				'Curry & Mint',
				'Raita Ice Cream with Indian Pistachio Brittle',	
				]
//to randomly generate and display different signature ice creams each visit (refresh page)        
var todaysSig = sigFlavours[Math.floor(Math.random() * sigFlavours.length)];
sigFlav.textContent = todaysSig;

//if choose signature ice cream
function chooseSig(){
	var choosenSig = document.getElementById("pickSig").value;
	document.getElementById("sigOrder").innerHTML = "Complete your order below!";
  $("form").css('display','none');
};
//if choose custom ice cream
function chooseCustom(){
    document.getElementById("sigOrder").innerHTML = "";
    $("form").css('display','flex');
    $("form").css('justify-content','center');
}
//to review the order
function reviewOrder(){
//store and display flavour choice
  var chosenFlav = $("input:radio[name='flavour']:checked").val();
 //store and display toppings choice(s)
 var arrayOfSelectedToppings = $.map($("input[name='topping']:checked"), function(checkbox) { 
                                    return $(checkbox).val().toLowerCase(); 
                                  });
 var chosenToppings = arrayToSentence(arrayOfSelectedToppings);
//store and display cone choice
  var chosenCone =$("input:radio[name='cone']:checked").val();
  if (chosenCone != null) {
    chosenCone = chosenCone.toLowerCase();
  }
//if don't choose anything
    if (!document.getElementById('pickSig').checked && !document.getElementById('custom').checked) {
    order.textContent = `You haven't selected anything!`;
//if choose signature ice cream
  } else if (document.getElementById('pickSig').checked) {
    order.textContent = `You have chosen ${todaysSig}. Enjoy!`;
//IS THERE A WAY TO DO THE ABOVE WITH JQUERY SO THAT IT'S CONSISTENT WITH THE BELOW?  
//if don't choose flavour AND cone
  } else if ($("input[name='flavour']:checked").length === 0 && $("input[name='cone']:checked").length === 0) {
    order.textContent = `You forgot to pick a flavour AND a cone!`;
//if don't choose a flavour
  } else if ($("input[name='flavour']:checked").length === 0) {
    order.textContent = `You forgot to pick a flavour!`;
//if don't choose a cone   
  } else if ($("input[name='cone']:checked").length === 0) {
    order.textContent = `You forgot to pick a cone!`;
//if don't choose any toppings
  } else if ($("input[name='topping']:checked").length === 0 && $("input[name='flavour']:checked") && $("input[name='cone']:checked")){
    order.textContent = `You have chosen ${chosenFlav} ice cream with no toppings on a ${chosenCone}. Enjoy!`;
//if choose flavour, toppings and cone
   } else {
    order.textContent = `You have chosen ${chosenFlav} ice cream with ${chosenToppings} on a ${chosenCone}. Enjoy!`;
  } 
};

//to keep track of # of toppings if choose > 3
//IS THERE ANOTHER (BETTER) WAY TO DO THIS?
var shownAlert = false;
var countChecked = function() {
  var numToppings = $( "input:checked[name=topping]").length;
//if # of toppings is > 3 AND the alert hasn't appeared yet. 
//below will prevent alert from appearing again after the 4th selection and thereafter 
  if (numToppings > 3 && !shownAlert) {
  	alert("Additional toppings are 50¢/topping");
    shownAlert = true;
  }
};
$("input[name=topping]").click(countChecked);

//function that adds "and" right before last topping selected, regardless of # of topping
function arrayToSentence (arr) {
    var last = arr.pop();
    return arr.join(', ') + ' and ' + last;
}


