var baliseItems = document.querySelector("#items");

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((produits) => {
    console.log(produits);

    produits.forEach(produit => {
      console.log(produit);




      baliseItems.innerHTML += `<a href="./product.html?id=${produit._id}">
            <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              <h3 class="productName">${produit.name} </h3>
              <p class="productDescription">${produit.description}</p>
            </article>
          </a>`;


    });







  })
 