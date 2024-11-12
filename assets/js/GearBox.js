















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































// les lignes JS : oumayma 
// recupere id de image de prod Numero 1
var img_prod_first = document.getElementById('img_prod_first');
var Full_image=document.getElementById('Full_image');
var Prix=document.getElementById('Prix');
var prix_promotion=document.getElementById('prix_promotion');
var name_product=document.getElementById('name_product');
var description_product=document.getElementById('description_product');
var prod_zome_1=document.getElementById('prod_zome_1');
var prod_zome_2=document.getElementById('prod_zome_2');
var prod_zome_3=document.getElementById('prod_zome_3');
var prod_zome_4=document.getElementById('prod_zome_4');
var img_prod_second=document.getElementById('img_prod_second');
var img_prod_third=document.getElementById('img_prod_third');
var img_prod_for=document.getElementById('img_prod_for');
//div pour description sur Product
var product_description=document.getElementById('product_description'); 



console.log(img_prod_first);

function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function fetchDataAndDisplay() {
    const urlId = getURLParameter('id'); 
    console.log(urlId);

    if (!urlId) {
        console.log("Aucun ID dans l'URL, nouvelle vérification dans une seconde.");
        return;
    }
    fetch('../data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur de chargement du fichier data.json");
        }
        return response.json();
    })
    .then(data => {
        data.forEach((item) => {
            if (item.id == urlId) {
                img_prod_first.src = item.image_urls[2];
                Full_image.src = item.image_urls[0];
                Prix.innerHTML = ` MAD${item.price} `;
    
                // Calculate promotion price
                let calul_prix_promotion = ((item.price) - item.price * (0.39)).toFixed(2);
                prix_promotion.innerHTML = ` MAD ${calul_prix_promotion}`;
                name_product.innerHTML = `${item.name}`;
                description_product.innerHTML = `${item.short_description}`;
    
                // Zoom images
                prod_zome_1.src = item.image_urls[0];
                prod_zome_2.src = item.image_urls[2];
                prod_zome_3.src = item.image_urls[0];
                prod_zome_4.src = item.image_urls[2];
    
                // Left-side product images
                img_prod_second.src = item.image_urls[0];
                img_prod_third.src = item.image_urls[2];
                img_prod_for.src = item.image_urls[0];
    
                // Display part_type if available
                if (item.part_type) {
                    let partTypeElement = document.createElement('div');
                    partTypeElement.innerHTML = `<p>Type de pièce: ${item.part_type}</p>`;
                    product_description.appendChild(partTypeElement);
                }
    
                // Display Socket if available
                if (item.Socket) {
                    let socketElement = document.createElement('div');
                    socketElement.innerHTML = `<p>Socket: ${item.Socket}</p>`;
                    product_description.appendChild(socketElement);
                }
    
                // Display GPU Model if available
                if (item["GPU Model"]) {
                    let gpuModelElement = document.createElement('div');
                    gpuModelElement.innerHTML = `<p>Modèle GPU: ${item["GPU Model"]}</p>`;
                    product_description.appendChild(gpuModelElement);
                }
    
                // Display Memory if available
                if (item.Memory) {
                    let memoryElement = document.createElement('div');
                    memoryElement.innerHTML = `<p>Mémoire: ${item.Memory}GB</p>`;
                    product_description.appendChild(memoryElement);
                }
    
                // Display any other properties like Capacity, Interface, etc.
                if (item.Capacity) {
                    let capacityElement = document.createElement('div');
                    capacityElement.innerHTML = `<p>Capacité: ${item.Capacity}GB</p>`;
                    product_description.appendChild(capacityElement);
                }
    
                if (item.Interface) {
                    let interfaceElement = document.createElement('div');
                    interfaceElement.innerHTML = `<p>Interface: ${item.Interface}</p>`;
                    product_description.appendChild(interfaceElement);
                }
                if (item.Speed) {
                    let SpeedElement = document.createElement('div');
                    SpeedElement.innerHTML = `<p>Speed: ${item.Speed}</p>`;
                    product_description.appendChild(SpeedElement);
                } 
                if (item.Voltage) {
                    let VoltageElement = document.createElement('div');
                    VoltageElement.innerHTML = `<p>Voltage: ${item.Voltage}</p>`;
                    product_description.appendChild(VoltageElement);
                }
            }
        });
    });
    
  

}

// Set up a repeating check every second
const checkInterval = setInterval(() => {
    const urlId = getURLParameter('id');

    if (urlId) {
        clearInterval(checkInterval);  // Stop checking once ID is found
        fetchDataAndDisplay();         // Fetch data and display content
    } else {
        console.log("Vérification de l'ID chaque seconde...");
    }
}, 1000);  // Check every 1000ms (1 second)

































