let cart = document.querySelectorAll('.add-cart');
// let localProductList = localStorage.setItem("productList", JSON.stringify(products));
for (let i = 0; i < cart.length; i++) {
	cart[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}
//För att veta hur många gånger man lägger till saker i cart
function cartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	//LocalStorage är en string så omvandlade den till siffror 
	productNumbers = parseInt(productNumbers);
	if (productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1)
		document.querySelector('.cart span').textContent = 1;
	}
	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	if (cartItems != null) {
		//Om produkten inte finns i cartItems
		if (cartItems[product.name] == undefined) {
			cartItems = { ...cartItems,
				[product.name]: product
			}
		}
		//Om den finns, lägg till +1 i dess inCart
		cartItems[product.name].inCart += 1;
	} else {
		product.inCart = 1;
		//Skapa objekt cartItems
		cartItems = {
			[product.name]: product
		}
	}
	//ska sparas objektet i en array
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
//Gör så att cart numret inte raderas 
function LoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}
//Räknar ut den totala kostnaden 
function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');
	if (cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map((item, index) => {
			productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="trash-outline"></ion-icon>
                <img src="${item.src}"/>
                <span>${item.name}</span>
            </div>
            <div class="price">
                ${item.price}sek
            </div>    
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                ${item.inCart * item.price}sek
            </div>
            
            `;
		});
		productContainer.innerHTML += `
            <div class="TotalContainer">
                <h4 class="TotalTitle">
                    Att betala:
                </h4>
                <h4 class="AttBetala">
                    ${cartCost} sek
                </h4>
            </div>
        `;
		deleteBtn();
	}
}
//Delete knapp för att kunna tabort varor från varukorgen
function deleteBtn() {
	let deleteBtn = document.querySelectorAll('.product ion-icon');
	let productNumbers = localStorage.getItem('cartNumbers');
	let cartCost = localStorage.getItem("totalCost");
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	let productsName;
	console.log(cartItems);
	for (let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener('click', () => {
			productsName = deleteBtn[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g, '').trim();
			const capitalize = (s) => {
				if (typeof s !== 'string') return ''
				return s.charAt(0).toUpperCase() + s.slice(1)
			}
			productsName = capitalize(productsName)
			console.log(productsName)
			console.log(cartItems[productsName].inCart)
			localStorage.setItem('cartNumbers', productNumbers - cartItems[productsName].inCart);
			localStorage.setItem('totalCost', cartCost - (cartItems[productsName].price * cartItems[productsName].inCart));
			delete cartItems[productsName];
			localStorage.setItem('productsInCart', JSON.stringify(cartItems));
			//Rakibs kommentarer 
			//för att kunna använda den här splice lösningen måste ProduktInCart items sparas i en lista istället för object.   
			// cartItems.splice(i, 1);
			//Update DOM
			displayCart();
			LoadCartNumbers();
		})
	}
}
//LoadCartNumbers funktion kommer aldrig att funka om man inta kallar på det så där av 
LoadCartNumbers();
displayCart();