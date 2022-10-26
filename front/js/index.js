var baliseItems = document.querySelector("#items");

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((products) => {
    // console.log(products);

    products.forEach((product) => {
      // console.log(product);

      // baliseItems.innerHTML += `<a href="./product.html?id=${product._id}">
      //       <article>
      //         <img src="${product.imageUrl}" alt="${product.altTxt}">
      //         <h3 class="productName">${product.name} </h3>
      //         <p class="productDescription">${product.description}</p>
      //       </article>
      //     </a>`;

      let baliseA = document.createElement("a");
      baliseA.setAttribute("href", `./products.html?id=${product._id}`);
      baliseItems.appendChild(baliseA);

      let baliseArticle = document.createElement("article");
      baliseA.appendChild(baliseArticle);

      let baliseImg = document.createElement("img");
      baliseImg.setAttribute("src", `${product.imageUrl}`);
      baliseImg.setAttribute("alt", `${product.altTxt}`);
      baliseArticle.appendChild(baliseImg);

      let baliseH3 = document.createElement("h3");
      baliseH3.innerText = ("productName", `${product.name}`);
      baliseArticle.appendChild(baliseH3);

      let baliseP = document.createElement("p");
      baliseP.innerText = ("productDescription", `${product.description}`);
      baliseArticle.appendChild(baliseP);
    });
  });
