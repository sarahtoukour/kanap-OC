var baliseImg = document.querySelector('.item__img')
var baliseTitle = document.getElementById('title')
var balisePrice = document.getElementById('price')
var baliseDescription = document.getElementById('description')
var baliseColors = document.getElementById('colors')

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

fetch('http://localhost:3000/api/products/' + id)
 .then((res) => res.json())
 .then((product) => {
  let image = document.createElement('img')
  image.setAttribute('src', product.imageUrl)
  image.setAttribute('alt', product.altTxt)
  baliseImg.appendChild(image)

  title.innerHTML = product.name
  price.innerHTML = product.price
  description.innerHTML = product.description

  //   for (let i = 0; i < product.colors.length; i++) {
  //    let color = document.createElement('option')
  //    color.setAttribute('value', product.colors[i])
  //    color.innerHTML = product.colors[i]
  //    baliseColors.appendChild(color)
  //   }

  product.colors.forEach((color, i) => {
   color = document.createElement('option')
   color.setAttribute('value', product.colors[i])
   color.innerHTML = product.colors[i]
   baliseColors.appendChild(color)
  })
 })

const button = document.querySelector('#addToCart')

button.addEventListener('click', (event) => {
 event.preventDefault()

 const color = document.querySelector('#colors')
 const quantity = document.querySelector('#quantity')

 let optionsProduct = {
  id: id,
  color: color.value,
  quantity: quantity.value,
 }
 console.log(optionsProduct)

 let getBasket = JSON.parse(localStorage.getItem('basket'))

 const addProduct = () => {
  getBasket.push(optionsProduct)
  localStorage.setItem('basket', JSON.stringify(getBasket))
 }

 if (getBasket) {
  addProduct()
 } else {
  getBasket = []
  addProduct()
  console.log(getBasket)
 }
})
