var baliseImg = document.querySelector('.item__img');
var baliseTitle = document.getElementById('title');
var balisePrice = document.getElementById('price');
var baliseDescription = document.getElementById('description');
var baliseColors = document.getElementById('colors');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('http://localhost:3000/api/products/' + id)
  .then((res) => res.json())
  .then((product) => {
    let image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);
    baliseImg.appendChild(image);

    title.innerText = product.name;
    price.innerText = product.price;
    description.innerText = product.description;

    product.colors.forEach((color) => {
      let baliseColor = document.createElement('option');
      baliseColor.setAttribute('value', color);
      baliseColor.innerText = color;
      baliseColors.appendChild(baliseColor);
    });
  })

  .catch(function (error) {
    console.error(error);
  });

const button = document.querySelector('#addToCart');
const color = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');

button.addEventListener('click', (event) => {
  event.preventDefault();

  if (color.value === '') {
    alert('Veuillez choisir une couleur');
  } else if (quantity.value <= 0) {
    alert('Quantité minimale : 1');
  } else if (quantity.value > 100) {
    alert('La quantité maximale fixée à 100');
  } else if (quantity.value > 0 && quantity.value < 100) {
    var optionsProduct = {
      id: id,
      color: color.value,
      quantity: parseInt(quantity.value),
    };
    console.log(optionsProduct);
    if (window.confirm('Voulez-vous ajouter cet article au panier?')) {
      addBasket(optionsProduct);
      alert('Le panier a bien été mis à jour');
    }
  }

  function setBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }

  function addBasket(optionsProduct) {
    let basket = getBasket();
    let proceed = false;

    basket.forEach(function (oneProduct, index) {
      console.log('forEach');
      console.log(oneProduct);
      console.log(index);
      if (oneProduct.id == optionsProduct.id && oneProduct.color == optionsProduct.color) {
        basket[index].quantity = parseInt(basket[index].quantity) + parseInt(optionsProduct.quantity);
        setBasket(basket);
        proceed = true;
      }
    });

    if (proceed == false) {
      basket.push(optionsProduct);
      setBasket(basket);
    }
  }
});
