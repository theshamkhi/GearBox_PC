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
    let index = 0;
    data.forEach(item => {

        let inner = `
        <a href="#" id="carte1">
                    <img id="imgapi1" class="rounded-t-lg" src="${item.image_urls[0]}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 id="txtapi1" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${item.name}</h5>
                        <div id="descriapi1">${(item.price * 9)} MAD</div>
                    </a>
                    <a href="#" id="bouton1" class="inline-flex items-center px-10 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-7 mt-5">
                        Ajouter au panier
                    </a>
                </div>`;
        document.getElementById(`gamer${index+1}`).innerHTML = inner;

        index++;

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
