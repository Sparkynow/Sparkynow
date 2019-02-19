function createStripe(){
var bod = document.getElementsByTagName("body");
console.log(bod);

}

function landTopDonors(data){
	var tested = IsJsonString(data);
    var totalAmount = 0;
	if(tested === true){
		data = JSON.parse(data);
		landing = document.getElementById('top_donors');

		var topd = "<table class='topDonorsTable'><tr><th>Donors</th><th>Dollars</th><th>Type</th></tr>";
		for(var i = 0; i < data.length; i++){
			totalAmount += data[i].amount;
			topd+="<tr><td>"+data[i].name+"</td><td>"+data[i].amount+"</td><td>"+data[i].type+"</td></tr>";
		}
		topd+="</table>";
		landing.innerHTML = topd;
	}  else {
		landing = document.getElementById('top_donors');
		landing.innerHTML = "<h3>The Top Donors couldn't be loaded</h3>";
	}
	var tamount = document.getElementById("totalAmount");
	totalAmount = totalAmount.toFixed(0);
	tamount.innerHTML= 	"$"+parseFloat(totalAmount).toLocaleString('en');
}
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
document.addEventListener("DOMContentLoaded", function(){
	var elem2 = document.getElementById("percent");
	var elemSet = document.getElementById("bar");
	var dataMark;
	var setDiv = "<div class='purplebackground barset' style='width:"+elem2.innerHTML+";'></div>";
	elemSet.innerHTML += setDiv;
	var xhr = new XMLHttpRequest();
	var testdata = xhr.open("GET", "topDonors.json", true);
	xhr.onload = function() {
    if (xhr.status === 200) {
        var dataMark = xhr.responseText;
        landTopDonors(dataMark);
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};

var testsend = xhr.send();
var handler = StripeCheckout.configure({
  key: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
  }
});

document.getElementById('stripeCheckoutBtn').addEventListener('click', function(e) {
  // Open Checkout with further options:
  handler.open({
    name: 'Stripe.com',
    description: '2 widgets',
    zipCode: true,
    amount: 2000
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  handler.close();
});
});
