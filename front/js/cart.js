document.title = 'Panier';
let baliseCartItems = document.getElementById('cart__items');
let basket = JSON.parse(localStorage.getItem('basket') || '[]');
let products = [];

basket.forEach(function (product, index) {
  // console.log('forEach');
  // console.log(basket);
  // console.log(product);

  let id = product.id;
  let color = product.color;
  let quantity = product.quantity;

  // console.log(product.id);
  // console.log(product.color);
  // console.log(product.quantity);

  fetch('http://localhost:3000/api/products/' + id)
    .then((res) => res.json())
    .then((product) => {
      // console.log(product);

      const productInfo = { id: id, color: color, quantity: quantity, name: product.name, price: product.price, img: product.imageUrl, alt: product.altTxt };

      // console.log(productInfo);
      // console.log(product.name);

      products.push(productInfo);
      getTotalPrice();

      let baliseArticle = document.createElement('article');
      baliseArticle.className = 'cart__item';
      baliseArticle.setAttribute('data-id', id);
      baliseArticle.setAttribute('data-color', color);
      baliseCartItems.appendChild(baliseArticle);

      let baliseDivImg = document.createElement('div');
      baliseDivImg.className = 'cart__item__img';
      baliseArticle.appendChild(baliseDivImg);

      let baliseImg = document.createElement('img');
      baliseImg.setAttribute('src', product.imageUrl);
      baliseImg.setAttribute('alt', product.altTxt);
      baliseDivImg.appendChild(baliseImg);

      let baliseDivContent = document.createElement('div');
      baliseDivContent.className = 'cart__item__content';
      baliseArticle.appendChild(baliseDivContent);

      let baliseDivDescription = document.createElement('div');
      baliseDivDescription.className = 'cart__item__content__description';
      baliseDivContent.appendChild(baliseDivDescription);

      let baliseH2 = document.createElement('h2');
      baliseH2.innerText = product.name;
      baliseDivDescription.appendChild(baliseH2);

      let baliseParagraphColor = document.createElement('p');
      baliseParagraphColor.innerText = color;
      baliseDivDescription.appendChild(baliseParagraphColor);

      let balisePrice = document.createElement('p');
      balisePrice.innerText = product.price + ' €';
      baliseDivDescription.appendChild(balisePrice);

      let baliseDivContentSetting = document.createElement('div');
      baliseDivContentSetting.className = 'cart__item__content__settings';
      baliseDivContent.appendChild(baliseDivContentSetting);

      let baliseDivQuantity = document.createElement('div');
      baliseDivQuantity.className = 'cart__item__content__settings__quantity';
      baliseDivContentSetting.appendChild(baliseDivQuantity);

      let baliseParagraphQuantity = document.createElement('p');
      baliseParagraphQuantity.innerText = 'Qté : ';
      baliseDivQuantity.appendChild(baliseParagraphQuantity);

      let baliseInputQuantity = document.createElement('input');
      baliseInputQuantity.className = 'itemQuantity';
      baliseInputQuantity.setAttribute('type', 'number');
      baliseInputQuantity.setAttribute('name', 'itemQuantity');
      baliseInputQuantity.setAttribute('min', '1');
      baliseInputQuantity.setAttribute('max', '100');
      baliseInputQuantity.setAttribute('value', quantity);
      baliseDivQuantity.appendChild(baliseInputQuantity);

      let baliseDivDelete = document.createElement('div');
      baliseDivDelete.className = 'cart__item__content__settings__delete';
      baliseDivContentSetting.appendChild(baliseDivDelete);

      let baliseParagraphDelete = document.createElement('p');
      baliseParagraphDelete.className = 'deleteItem';
      baliseParagraphDelete.innerText = 'Supprimer';
      baliseDivDelete.appendChild(baliseParagraphDelete);

      function getTotalPrice() {
        let totalPrice = 0;
        let totalQuantity = 0;
        let totalQuantityDisplay = document.getElementById('totalQuantity');
        let totalPriceDisplay = document.getElementById('totalPrice');

        products.forEach(function (product) {
          totalPrice += product.price * product.quantity;
          // console.log(totalPrice);
          totalQuantity += product.quantity;
          // console.log(totalQuantity);
        });

        totalPriceDisplay.innerText = totalPrice;
        totalQuantityDisplay.innerText = totalQuantity;
      }

      baliseInputQuantity.addEventListener('change', function () {
        let newValue = baliseInputQuantity.value;

        if (newValue <= 0 || newValue > 100 || isNaN(quantity)) {
          alert('Merci de sélectionner une quantité valide.');
        } else {
          basket[index].quantity = parseInt(newValue);
          getTotalPrice();
          // console.log(newValue);
          setLocalStorage(basket);
          location.reload();
        }
      });

      baliseParagraphDelete.addEventListener('click', function (e) {
        alert('Ce produit va être supprimé du panier');
        e.preventDefault();
        basket.splice(index, 1);
        setLocalStorage(basket);
        location.reload();
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});

function emptyBasket() {
  if (basket === null || basket.length === 0) {
    // console.log(basket);
    products = 'Le panier est vide !';
    let newH2 = document.createElement('h2');
    baliseCartItems.appendChild(newH2);
    newH2.innerText = products;
    document.getElementById('totalQuantity').innerText = 0;
    document.getElementById('totalPrice').innerText = 0;
    disableForm();
  }
}

function disableForm() {
  const formDisplay = document.querySelector('.cart__order');
  formDisplay.style.display = 'none';
}

emptyBasket();

function setLocalStorage(newBasket) {
  localStorage.setItem('basket', JSON.stringify(newBasket));
}

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');

const order = document.getElementById('order');

const firstNameRegex = /^[A-Z a-zé]{3,}[-]?[A-Z a-zé]{0,10}$/;
const lastNameRegex = /^[A-Z a-zé]{3,}[-]?[A-Z a-zé]{0,10}$/;
const addressRegex = /^[0-9]{1,3}[a-zA-Z0-9\s\,\''\-]*$/;
const cityRegex = /^[A-ZÉÀ a-zéèàôâ']{3,15}[-]?[A-ZÉÀ a-zéèàôâ']{0,10}[-]?[A-ZÉÀ a-zéèàôâ']{0,10}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let correct = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};

function formValidation() {
  firstName.addEventListener('input', function (e) {
    let inputValid = firstNameRegex.test(e.target.value);
    if (inputValid === false) {
      document.getElementById('firstNameErrorMsg').textContent = 'Format incorrect';
      correct.firstName = false;
    } else {
      correct.firstName = true;
      document.getElementById('firstNameErrorMsg').textContent = '';
    }
  });

  lastName.addEventListener('input', function (e) {
    let inputValid = lastNameRegex.test(e.target.value);
    if (inputValid === false) {
      document.getElementById('lastNameErrorMsg').textContent = 'Format incorrect';
      correct.lastName = false;
    } else {
      correct.lastName = true;
      document.getElementById('lastNameErrorMsg').textContent = '';
    }
  });

  address.addEventListener('input', function (e) {
    let inputValid = addressRegex.test(e.target.value);
    if (inputValid === false) {
      document.getElementById('addressErrorMsg').textContent = 'Format incorrect';
      correct.address = false;
    } else {
      correct.address = true;
      document.getElementById('addressErrorMsg').textContent = '';
    }
  });

  city.addEventListener('input', function (e) {
    let inputValid = cityRegex.test(e.target.value);
    if (inputValid === false) {
      document.getElementById('cityErrorMsg').textContent = 'Format incorrect';
      correct.city = false;
    } else {
      correct.city = true;
      document.getElementById('cityErrorMsg').textContent = '';
    }
  });

  email.addEventListener('input', function (e) {
    let inputValid = emailRegex.test(e.target.value);
    if (inputValid === false) {
      document.getElementById('emailErrorMsg').textContent = 'Adresse Email non valide';
      correct.email = false;
    } else {
      correct.email = true;
      document.getElementById('emailErrorMsg').textContent = '';
    }
  });
}

function sendForm() {
  let pushOrder = document.getElementById('order');
  pushOrder.addEventListener('click', function (event) {
    event.preventDefault();

    if (correct.firstName == true && correct.lastName == true && correct.address == true && correct.city == true && correct.email == true) {
      let basket = JSON.parse(localStorage.getItem('basket'));
      const arrayId = [];

      basket.forEach(function (arrayId) {
        basket.push(arrayId.id);
        console.log(arrayId.id);
      });

      const dataOrder = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: arrayId,
      };
      // console.log(dataOrder);

      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataOrder),
      })
        .then((res) => res.json())
        .then((data) => {
          document.location.href = `./confirmation.html?orderId=${data.orderId}`;
        });
    } else {
      alert('Vérifiez le formulaire');
      event.preventDefault();
    }
  });
}

formValidation();
sendForm();
