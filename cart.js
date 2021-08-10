function Product(id,name,price)
{
	this.id=id;
	this.name=name;
	this.price=price;       // constructor for the product
}
// Global parameters
var p1 = new Product(1,"Boat storm watch",3000);   // creating an object p1
var p2 = new Product(2, "Samsung galaxy M51", 24000);   // creating an object p2
var p3 = new Product(3, "JEANS", 1500);

var products = [p1, p2,p3]; // 2 products are in the products catalog.
var purchase = [];    // in js array in object
                      // empty array
function retrievePurchase()
{
	
	var purchase = JSON.parse(localStorage.getItem('purchases')?localStorage.getItem('purchases'):"[]");      // retrieving purchases from localstorage
	return purchase;

}
function savePurchase()
{

	localStorage.setItem('purchases',JSON.stringify(purchase));
	var pur = JSON.parse(localStorage.getItem('purchases'));
	console.log(pur)
	// saving the details in local storage
    // we are putting the string version of purchase to purchases
   
}


function updatePurchases(purch)            // here purch is a key.
{
	localStorage.setItem('purchases',JSON.stringify(purch));       // we are passing an object to be converted into a string in this updatePurchases function

}
function savedetails()
{   // in js array is an object
	// stringyfy converts object to a string
	localStorage.setItem('products',JSON.stringify(products));
}

function refreshTotal(total)
{

	var x = document.getElementById('totalLabel');
	x.innerText=total;
}
function refreshTable()
{
	$('#item-table-body').html('');
	var pur = retrievePurchase();						//get purchase object
	var t = JSON.parse(localStorage.getItem('total'));	//get total from localStorage
	var total=0;

	for(var p of pur)              // in this case we have two p
	{
		var pq = (p.qty)*(p.price)
		$('#item-table').append("<tr> <td>" + p.id + " </td> <td>" + p.name + "</td> <td>" + p.price + " </td> <td>" + "  <button id=plus"+p.id+">+</button> "  + p.qty + "  <button id=sub"+p.id+">-</button>" +  "</td> <td>" + pq + " </td></tr>")
		total+=pq;             // updating the table of purchases in the html table
	}


	$("button").click(function(e){
	    var idClicked = e.target.id;       //jQuery
	    var pp = retrievePurchase();

	    for(i=0;i<pp.length;i++)
	    {
	    	var ob=pp[i];
	    	if(("plus"+ob.id)===idClicked)
	    	{
	    		ob.qty++;
	    	}                                                          // displays the quantity of products
	    	if(("sub"+ob.id)===idClicked)
    		{
	    		ob.qty--;
	    		if(ob.qty<=0)
	    		{
	    			pp.splice(i,1);

	    		}
    		}
	    }

    	updatePurchases(pp)
    	refreshTable()
	});

	refreshTotal(total);
}


function checkPurchases(id)
{
	var pur = retrievePurchase();
	for(var p of pur)
	{
		if(p.id==id)
		{
			return p.qty;
		}
	}
	return 0;
}

$(function()
{

	savedetails()  // first the unnamed functions are called in js
	retrievePurchase();    // everytime the page is refreshed or loaded
	refreshTable();
	$("button").click(function(e)
	{
		var	idClicked = e.target.id;
		for(i=1;i<=9;i++)                                    //iterating through the 2 products of the page
		{
			if(idClicked===("btn"+i))	//btn1 and btn2 are unique ids in this case
			{
				purchase = retrievePurchase();
				var id=i;
				var det = getDetails(id);//get the details of id=1 and id=2
				if(det!==0)
				{
					purchase.push({
						id:id,
						name:det.name,
						price:det.price,
						qty:det.qty
						});
				}                                                            
				savePurchase();
				retrievePurchase();
				refreshTable();
			}

		}

	});


	function getDetails(id)
	{
		var pro;
		var containsAlready = checkPurchases(id);
		var products = JSON.parse(localStorage.getItem('products'));

		if(containsAlready==0)
		{
			for(p of products)
			{
				if(p.id===id)
				{
					pro =
					{
						name:p.name,                // getting details from localstrorage 
						price:p.price,
						qty:1
					}
				}
			}
			return pro
		}
		else
		{
			window.alert("This item exists in Cart. Kindly view your cart !");
			return 0;
		}

	}
})