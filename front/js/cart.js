document.title = 'Panier';
let cartItems = document.getElementById('cart__items');
// récupération du local storage
let basket = JSON.parse(localStorage.getItem('basket') || '[]');
// création d'un tableau vide
let products = [];

// boucle qui récupère chaque produit dans le LS
basket.forEach(function (product, index) {
  let id = product.id;
  let color = product.color;
  let quantity = product.quantity;

  fetch('http://localhost:3000/api/products/' + id)
    .then((res) => res.json())
    .then((product) => {
      // récupération des données de l'article dans la variable productInfo
      const productInfo = { id: id, color: color, quantity: quantity, name: product.name, price: product.price, img: product.imageUrl, alt: product.altTxt };
      // ajout des produits dans le tableau
      products.push(productInfo);
      // appel de la fonction pour le calcul du prix total
      getTotalPrice();

      // création des éléments html manquants
      let article = document.createElement('article');
      article.className = 'cart__item';
      article.setAttribute('data-id', id);
      article.setAttribute('data-color', color);
      cartItems.appendChild(article);

      let divImg = document.createElement('div');
      divImg.className = 'cart__item__img';
      article.appendChild(divImg);

      let img = document.createElement('img');
      img.setAttribute('src', product.imageUrl);
      img.setAttribute('alt', product.altTxt);
      divImg.appendChild(img);

      let divContent = document.createElement('div');
      divContent.className = 'cart__item__content';
      article.appendChild(divContent);

      let divDescription = document.createElement('div');
      divDescription.className = 'cart__item__content__description';
      divContent.appendChild(divDescription);

      let h2 = document.createElement('h2');
      h2.innerText = product.name;
      divDescription.appendChild(h2);

      let paragraphColor = document.createElement('p');
      paragraphColor.innerText = color;
      divDescription.appendChild(paragraphColor);

      let price = document.createElement('p');
      price.innerText = product.price + ' €';
      divDescription.appendChild(price);

      let divContentSetting = document.createElement('div');
      divContentSetting.className = 'cart__item__content__settings';
      divContent.appendChild(divContentSetting);

      let divQuantity = document.createElement('div');
      divQuantity.className = 'cart__item__content__settings__quantity';
      divContentSetting.appendChild(divQuantity);

      let paragraphQuantity = document.createElement('p');
      paragraphQuantity.innerText = 'Qté : ';
      divQuantity.appendChild(paragraphQuantity);

      let inputQuantity = document.createElement('input');
      inputQuantity.className = 'itemQuantity';
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.setAttribute('name', 'itemQuantity');
      inputQuantity.setAttribute('min', '1');
      inputQuantity.setAttribute('max', '100');
      inputQuantity.setAttribute('value', quantity);
      divQuantity.appendChild(inputQuantity);

      let divDelete = document.createElement('div');
      divDelete.className = 'cart__item__content__settings__delete';
      divContentSetting.appendChild(divDelete);

      let paragraphDelete = document.createElement('p');
      paragraphDelete.className = 'deleteItem';
      paragraphDelete.innerText = 'Supprimer';
      divDelete.appendChild(paragraphDelete);

      // calcul du total pour la quantité et le prix
      function getTotalPrice() {
        let totalPrice = 0;
        let totalQuantity = 0;
        let totalQuantityDisplay = document.getElementById('totalQuantity');
        let totalPriceDisplay = document.getElementById('totalPrice');

        products.forEach(function (product) {
          totalPrice += product.price * product.quantity;
          totalQuantity += product.quantity;
        });

        totalPriceDisplay.innerText = totalPrice;
        totalQuantityDisplay.innerText = totalQuantity;
      }

      // modification de la quantité d'un produit
      inputQuantity.addEventListener('change', function () {
        let newValue = inputQuantity.value;

        if (newValue <= 0 || newValue > 100 || isNaN(quantity)) {
          alert('Merci de sélectionner une quantité valide.');
        } else {
          basket[index].quantity = parseInt(newValue);
          getTotalPrice();
          setLocalStorage(basket);
          location.reload();
        }
      });

      // suppression d'un produit
      paragraphDelete.addEventListener('click', function (e) {
        if (window.confirm('Souhaitez vous supprimer cet article ?')) {
          alert('Ce produit a bien été supprimé du panier');
          e.preventDefault();
          basket.splice(index, 1);
          setLocalStorage(basket);
          location.reload();
        }
      });
    })
    .catch(function (error) {
      console.error(error);
    });
});

// affichage de la mention "panier vide" et masquer le formulaire
function emptyBasket() {
  if (basket === null || basket.length === 0) {
    // let noProducts = 'Le panier est vide !';
    // let newH2 = document.createElement('h2');
    // cartItems.appendChild(newH2);
    // newH2.innerText = noProducts;
    // newH2.style.textAlign = 'center';
    document.querySelector('h1').innerHTML = 'Votre panier est vide';
    document.getElementById('totalQuantity').innerText = 0;
    document.getElementById('totalPrice').innerText = 0;
    disableForm();
  }
}

// Formulaire masqué
function disableForm() {
  const formDisplay = document.querySelector('.cart__order');
  formDisplay.style.display = 'none';
}

// enregistrement du panier dans le LS
function setLocalStorage(newBasket) {
  localStorage.setItem('basket', JSON.stringify(newBasket));
}

// récupération des id du formulaire de commande dans des variables
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const order = document.getElementById('order');

// création des regex pour validation du formulaire
const firstNameRegex = /^[A-Z a-zéèàôâ]{3,}[-]?[A-Z a-zéèàôâ]{0,10}$/;
const lastNameRegex = /^[A-Z a-zéèàôâ]{3,}[-]?[A-Z a-zéèàôâ]{0,10}$/;
const addressRegex = /^[0-9]{1,3}[a-zA-Z0-9\s\,\''\-]*$/;
const cityRegex = /^[A-ZÉÀ a-zéèàôâ']{3,15}[-]?[A-ZÉÀ a-zéèàôâ']{0,10}[-]?[A-ZÉÀ a-zéèàôâ']{0,10}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// création variable témoin
let correct = {
  firstName: false,
  lastName: false,
  address: false,
  city: false,
  email: false,
};

// fonctions qui vérifient la validité de saisie des input
function formValidation() {
  // vérif du prénom
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

  // vérif du nom
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

  // vérif de l'adresse
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

  // vérif de la ville
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

  // vérif du mail
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

// envoi du formulaire de commande
function sendForm() {
  let pushOrder = document.getElementById('order');
  pushOrder.addEventListener('click', function (event) {
    event.preventDefault();

    // si les saisies sont ok
    if (correct.firstName == true && correct.lastName == true && correct.address == true && correct.city == true && correct.email == true) {
      // on récupére le contenu du LS
      let basket = JSON.parse(localStorage.getItem('basket'));
      // on déclare en tableau la variable arrayId
      const arrayId = [];
      // boucle qui récupère les ID des produits dans le LS et les push dans l'array
      basket.forEach(function (arrayId) {
        basket.push(arrayId.id);
      });

      // récupération des données saisies du formulaire + les prosuits dans l'objet dataOrder
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

      // envoi requête POST avec l'objet dataOrder comme paramètre
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataOrder),
      })
        .then((res) => res.json())
        .then((data) => {
          // renvoi vers la page de confirmation
          document.location.href = `./confirmation.html?orderId=${data.orderId}`;
        });

      // sinon affiche un message d'alerte
    } else {
      alert('Vérifiez le formulaire');
      event.preventDefault();
    }
  });
}

// appel des fonctions
emptyBasket();
formValidation();
sendForm();
