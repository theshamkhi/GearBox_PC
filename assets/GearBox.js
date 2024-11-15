const slides = document.getElementById('carousel-images');
slides.addEventListener("wheel",(evnt)=>{
    slides.scrollLeft += evnt.deltaX
})

function toggleMenu() {
    const menuSidebar = document.getElementById('MenuSidebar');
    menuSidebar.classList.toggle('-translate-x-full');
}

var imgapi1 = document.getElementById('imgapi1')
var carte1 = document.getElementById('carte1')
var txtapi1 = document.getElementById('txtapi1')
var descriapi1 = document.getElementById('descriapi1')
var descriapi2 = document.getElementById('descriapi2')
fetch('data/data.json')
.then(response=>response.json())
.then(data=>{
    data.forEach(item => {
if (item.id == 1100){
    let elementA = document.createElement('div')
    imgapi1.src = `${item.image_urls[0]}`
    txtapi1.innerHTML = `${item.name}`
    descriapi1.innerHTML = `${item.short_description}`
    var prgapi1 = document.createElement('p')
    prgapi1.innerHTML = `${item.Interface}`
    descriapi1.appendChild(prgapi1)

}
    });
})

// 

// Fonction pour gérer l'ajout au panier
function ajouterAuPanier(produit) {
    let panier = JSON.parse(localStorage.getItem('panier')) || []; // Récupère le panier existant ou crée un tableau vide
    panier.push(produit); // Ajoute le produit au panier
    localStorage.setItem('panier', JSON.stringify(panier)); // Sauvegarde le panier dans le localStorage
    alert('Produit ajouté au panier !'); // Message d'alerte
}

// Exemple de données du produit (id, image, nom, description)
const produits = [
    {
        id: 1100,
        name: "PC Gamer Intel i5 RTX 3060",
        short_description: "Un PC de gaming puissant avec un processeur Intel i5 et une carte graphique RTX 3060.",
        image_urls: ["assets/media/PC1.jpg"],
        interface: "USB, HDMI"
    },
    // Ajoutez d'autres produits ici
];

// Ajoute le produit au panier lorsque le bouton est cliqué
document.getElementById('bouton1').addEventListener('click', function () {
    const produit = produits.find(p => p.id === 1100); // Trouve le produit par ID
    ajouterAuPanier(produit);
});

// Ajouter d'autres écouteurs pour les autres produits si nécessaire
document.getElementById('bouton2').addEventListener('click', function () {
    const produit = produits.find(p => p.id === 1101); // Exemple pour un autre produit
    ajouterAuPanier(produit);
});

// Exemple de récupération du panier et affichage (pour tester)
window.addEventListener('load', function () {
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
    console.log(panier); // Affiche le panier dans la console
});


localStorage.clear()