const numberOrder = new URL(location.href).searchParams.get("orderId")

// Injection de orderId récupérer avec searchParams dans le code HTML

document.getElementById("orderId").textContent = `${numberOrder}`;


// Remove du localStorage

localStorage.removeItem("basket");


