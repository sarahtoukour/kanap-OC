let baliseImg = document.querySelector(".item__img");
console.log(baliseImg);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then((product) => {
    console.log(product);

    
    let image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.altTxt);
    baliseImg.appendChild(image);
  });
