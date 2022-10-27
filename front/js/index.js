var baliseItems = document.querySelector("#items");

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((products) => {
    // console.log(products);

    products.forEach((product) => {
      // console.log(product);

      let baliseA = document.createElement("a");
      baliseA.setAttribute("href", `./product.html?id=${product._id}`);
      baliseItems.appendChild(baliseA);

      let baliseArticle = document.createElement("article");
      baliseA.appendChild(baliseArticle);

      let baliseImg = document.createElement("img");
      baliseImg.setAttribute("src", product.imageUrl);
      baliseImg.setAttribute("alt", product.altTxt);
      baliseArticle.appendChild(baliseImg);

      let baliseH3 = document.createElement("h3");
      baliseH3.setAttribute("class", "productName");
      baliseH3.innerText = product.name;
      baliseArticle.appendChild(baliseH3);

      let baliseP = document.createElement("p");
      baliseP.setAttribute("class", "productDescription");
      baliseP.innerText = product.description;
      baliseArticle.appendChild(baliseP);
    });
  });
