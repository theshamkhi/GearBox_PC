






































































































































































































































































// 
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function fetchDataAndDisplay() {
    const urlId = getURLParameter('id'); 

    if (!urlId) {
        console.log("Aucun ID dans l'URL");
        return;
    }

   
    const img1=document.getElementById('img_prod_first');
   

    fetch('../data/data.json')  
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du fichier data.json");
            }
            return response.json();
        })
        .then(data => {
            const matchingItem = data.find(item => String(item.id) === urlId); 

            if (matchingItem) {
                img1.src=`${matchingItem.image_urls[0]}`;
                
               
                console.log("Contenu affiché avec succès pour l'ID:", urlId);
            } else {
                console.log("Aucun contenu trouvé pour l'ID:", urlId);
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement de data.json :", error);
        });
}


fetchDataAndDisplay();

