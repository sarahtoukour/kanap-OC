// récupération de la balise parent
let items = document.querySelector('#items');

// méthode fetch => requête auprès de l'API pour récupérer l'ensemble des produits
// conversion au format JSON (forme textuelle et structurée)
// promesse avec pour paramètre products pour l'ensemble des produits
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((products) => {
    // boucle qui récupère chaque produit
    products.forEach((product) => {
      // création des éléments html
      let a = document.createElement('a');
      a.setAttribute('href', `./product.html?id=${product._id}`);
      items.appendChild(a);

      let article = document.createElement('article');
      a.appendChild(article);

      let img = document.createElement('img');
      img.setAttribute('src', product.imageUrl);
      img.setAttribute('alt', product.altTxt);
      article.appendChild(img);

      let h3 = document.createElement('h3');
      h3.setAttribute('class', 'productName');
      h3.innerText = product.name;
      article.appendChild(h3);

      let p = document.createElement('p');
      p.setAttribute('class', 'productDescription');
      p.innerText = product.description;
      article.appendChild(p);
    });
  })
  .catch((error) => {
    console.error(error);
  });
