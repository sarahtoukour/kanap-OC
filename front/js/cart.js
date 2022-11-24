document.title = "Panier";
var baliseCartItems = document.getElementById('cart__items')
var basket = JSON.parse(localStorage.getItem('basket') || "[]");
let products = []



basket.forEach(function(product, index) {
    console.log('forEach');
    console.log(basket);
    console.log(product);

    let id = product.id;
    let color = product.color;
    let quantity = product.quantity;  

    console.log(product.id);
    console.log(product.color);
    console.log(product.quantity);

    fetch ("http://localhost:3000/api/products/" + id)
        .then((res) => res.json())
        .then((product) => {
            console.log(product);

            const productInfo = {id: id, color: color, quantity: quantity, name: product.name, price: product.price, img: product.imageUrl, alt: product.altTxt};   

            console.log(productInfo);
            console.log(product.name);

            products.push(productInfo);
            getTotalPrice()

            let baliseArticle = document.createElement("article");
            baliseArticle.className = ("cart__item");
            baliseArticle.setAttribute("data-id", id);
            baliseArticle.setAttribute("data-color", color);
            baliseCartItems.appendChild(baliseArticle);
            
            let baliseDivImg = document.createElement('div');
            baliseDivImg.className = "cart__item__img";
            baliseArticle.appendChild(baliseDivImg);
            
            let baliseImg = document.createElement('img');
            baliseImg.setAttribute("src", product.imageUrl);
            baliseImg.setAttribute("alt", product.altTxt);
            baliseDivImg.appendChild(baliseImg);
            
            let baliseDivContent = document.createElement('div');
            baliseDivContent.className = ("cart__item__content");
            baliseArticle.appendChild(baliseDivContent);
            
            let baliseDivDescription = document.createElement("div");
            baliseDivDescription.className = ("cart__item__content__description");
            baliseDivContent.appendChild(baliseDivDescription);
            
            let baliseH2 = document.createElement("h2");
            baliseH2.innerText = product.name;
            baliseDivDescription.appendChild(baliseH2);
            
            let baliseParagraphColor = document.createElement("p");
            baliseParagraphColor.innerHTML = color;
            baliseDivDescription.appendChild(baliseParagraphColor);
            
            let balisePrice = document.createElement("p");
            balisePrice.innerHTML = product.price + " €";
            baliseDivDescription.appendChild(balisePrice);
            
            let baliseDivContentSetting = document.createElement('div');
            baliseDivContentSetting.className = ("cart__item__content__settings");
            baliseDivContent.appendChild(baliseDivContentSetting);
            
            let baliseDivQuantity = document.createElement('div');
            baliseDivQuantity.className = ("cart__item__content__settings__quantity");
            baliseDivContentSetting.appendChild(baliseDivQuantity);
            
            let baliseParagraphQuantity = document.createElement("p");
            baliseParagraphQuantity.innerText = "Qté : ";
            baliseDivQuantity.appendChild(baliseParagraphQuantity);
            
            let baliseInputQuantity = document.createElement("input");
            baliseInputQuantity.className = ("itemQuantity");
            baliseInputQuantity.setAttribute("type", "number");
            baliseInputQuantity.setAttribute("name", "itemQuantity");
            baliseInputQuantity.setAttribute("min", "1");
            baliseInputQuantity.setAttribute("max", "100");
            baliseInputQuantity.setAttribute("value", quantity);
            baliseDivQuantity.appendChild(baliseInputQuantity);
            
			// let newValue = baliseInputQuantity.value

			// basket[index].quantity = newValue ;

            let baliseDivDelete = document.createElement("div");
            baliseDivDelete.className = ("cart__item__content__settings__delete");
            baliseDivContentSetting.appendChild(baliseDivDelete);
            
            let baliseParagraphDelete = document.createElement("p");
            baliseParagraphDelete.className = ("deleteItem");
            baliseParagraphDelete.innerText = "Supprimer";
            baliseDivDelete.appendChild(baliseParagraphDelete);

			baliseParagraphDelete.addEventListener('click', function(event) {
				event.preventDefault();

				basket.splice(index, 1)

				setLocalStorage(basket)

				location.reload();
			});

			

            function getTotalPrice(){
                let totalPrice = 0;
                let totalQuantity = 0;
                let totalQuantityDisplay = document.getElementById("totalQuantity");
                let totalPriceDisplay = document.getElementById("totalPrice");

                products.forEach (function(product) {
                    console.log(product);
                    totalPrice += product.price * product.quantity;
                    console.log(product.price);
                    totalQuantity += product.quantity;
                });
    
                totalPriceDisplay.innerText = totalPrice;
                totalQuantityDisplay.innerText = totalQuantity;
            }


           

            
    	})
    	.catch(function(error){
        	console.error(error);
		})      
})



        function setLocalStorage(newBasket) {
	localStorage.setItem('basket', JSON.stringify(newBasket))
}
      

        
        