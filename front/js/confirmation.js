// searchParams pour rechercher l'id de la commande
const numberOrder = new URL(location.href).searchParams.get('orderId');

// affichage du numéro de commande
document.getElementById('orderId').textContent = numberOrder;

// suppression du LS une fois la commande finalisée
localStorage.removeItem('basket');
