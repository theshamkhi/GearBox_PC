






































































































































































































































































// 
// Function to get a URL parameter by name
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to fetch data.json and check the ID
function fetchDataAndCheckId() {
    const urlId = getURLParameter('id'); // Get the current ID from the URL

    // If no ID in the URL, exit
    if (!urlId) {
        console.log("Aucun ID dans l'URL");
        return;
    }

    console.log("ID extrait de l'URL:", urlId);

    const full = document.getElementById('full');
    if (!full) {
        console.error("L'élément avec l'ID 'full' est introuvable dans le document.");
        return;
    }

    // Fetch data.json and check the ID
    fetch('../data/data.json')  // Replace with the correct path to data.json
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du fichier data.json");
            }
            return response.json();
        })
        .then(data => {
            console.log("Données récupérées :", data);
            const idValeur = String(data.id); // Convert data.json ID to a string for comparison
            console.log("ID dans data.json:", idValeur);

            // Check if the URL ID matches the data.json ID
            if (urlId === idValeur) {
                // Clear existing content before adding new data
                full.innerHTML = '';
                
                // Create and append content
                const prod = document.createElement('div');
                prod.innerHTML = `<span>${data.short_description}</span>`;
                full.appendChild(prod);
                console.log("Contenu ajouté avec succès.");
            } else {
                console.log("L'ID ne correspond pas ou n'est pas présent dans data.json");
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement de data.json :", error);
        });
}

// Function to monitor URL changes and reload data if the ID changes
function monitorURLChange() {
    let currentId = getURLParameter('id'); // Get the initial ID

    // Initial check on page load
    fetchDataAndCheckId();

    setInterval(() => {
        const newId = getURLParameter('id'); // Check the ID in the URL again

        // If the ID has changed, update currentId and run fetchDataAndCheckId()
        if (newId !== currentId) {
            currentId = newId;
            fetchDataAndCheckId(); // Execute fetch each time the ID changes
        }
    }, 1000); // Check the URL every second
}

// Start monitoring URL changes
monitorURLChange();
