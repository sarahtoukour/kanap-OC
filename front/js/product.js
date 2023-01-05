// récupération des classes et id du HTML
let img = document.querySelector('.item__img');
let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let colorsTag = document.getElementById('colors');

const button = document.getElementById('addToCart');
const color = document.getElementById('colors');
const quantity = document.getElementById('quantity');

// récupération de l'id avec les paramètres de l'url
const url = new URLSearchParams(window.location.search); //new initialise un objet = url
const id = url.get('id');

console.log("Récupération de l'id :" + id);

// requête de l'API et ajout de la variable qui contient l'id
fetch('http://localhost:3000/api/products/' + id)
  .then((res) => res.json())
  .then((product) => {
    // création des éléments html manquants
    let image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);
    img.appendChild(image);

    title.innerText = product.name;
    price.innerText = product.price;
    description.innerText = product.description;

    // Boucle pour ajouter les couleurs en option
    product.colors.forEach((color) => {
      let colorOption = document.createElement('option');
      colorOption.setAttribute('value', color);
      colorOption.innerText = color;
      colorsTag.appendChild(colorOption);
    });
  })

  .catch(function (error) {
    console.error(error);
  });

// détection de l'évènement au clic sur le bouton commander
button.addEventListener('click', (event) => {
  event.preventDefault();

  // conditions sur couleur et quantité
  if (color.value === '') {
    alert('Veuillez choisir une couleur');
  } else if (quantity.value <= 0) {
    alert('Quantité minimale : 1');
  } else if (quantity.value > 100) {
    alert('La quantité maximale : 100');
  } else if (quantity.value > 0 && quantity.value < 100) {
    //si conditions respectées alors un nouvel objet est créé avec les 3 références
    var optionsProduct = {
      id: id,
      color: color.value,
      quantity: parseInt(quantity.value), // parseInt = conversion d'une chaîne de caractères en nombre entier
    };
    console.log(optionsProduct);

    // fenêtre d'alerte et ajout du produit au panier
    if (window.confirm('Voulez-vous ajouter cet article au panier?')) {
      addBasket(optionsProduct);
      alert('Le panier a bien été mis à jour');
    }
  }

  // enregistrement du panier dans le local storage
  function setBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket)); // stringify = convertit en JSON
  }

  // récupération du contenu du local storage
  function getBasket() {
    let basket = localStorage.getItem('basket');
    if (basket == null) {
      // si le local storage est vide, on crée un tableau vide
      return [];
    } else {
      return JSON.parse(basket); // parse = sous forme d'objet JS
    }
  }
  // fonction d'ajout au panier
  function addBasket(optionsProduct) {
    let basket = getBasket();
    let proceed = false;

    // boucle avec conditions pour incrémenter uniquement la quantité si le produit est déjà dans le local storage
    basket.forEach((oneProduct, index) => {
      // si l'article existe déjà avec même id et même couleur alors on incrémente uniquement la quantité dans le panier
      if (oneProduct.id == optionsProduct.id && oneProduct.color == optionsProduct.color) {
        basket[index].quantity = parseInt(basket[index].quantity) + parseInt(optionsProduct.quantity);
        // on réactualise le panier dans le LS avec la fonction setBasket
        setBasket(basket);
        // variable témoin à true : article identique donc pas besoin du 2ème if
        proceed = true;
      }
    });
    // si variable témoin = false, on a pas trouvé d'article au même id alors on push nouvel article dans le panier (basket) et on actualise le panier avec la fonction setBasket
    if (proceed == false) {
      basket.push(optionsProduct);
      setBasket(basket);
    }
  }
});
