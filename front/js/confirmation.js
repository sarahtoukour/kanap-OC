const numberOrder = new URL(location.href).searchParams.get('orderId');

document.getElementById('orderId').textContent = numberOrder;

localStorage.removeItem('basket');
