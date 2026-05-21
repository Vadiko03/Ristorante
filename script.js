// Funzione per apri' la tendina spostandola a 250 pixel
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

// Funzione per chiude la tendina rimettendola a 0
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

// Logica del Biscotto della Fortuna
const massime = [
    "Un amaro ripaga mille dolcezze, ma un buon Ramen ne ripaga diecimila.",
    "Colui che ordina Dumpling Uncommon non camminerà mai a pancia vuota.",
    "Grandi cose ti aspettano, specialmente se ordini pure il dolce.",
    "Il saggio dice: chi mangia di martedì da Uncommon, trova chiuso.",
    "Se la strada è in salita, è perché stai andando verso il bancone del Ramen."
];

function spezzaBiscotto() {
    const display = document.getElementById("frase-fortuna");
    const fraseCasuale = massime[Math.floor(Math.random() * massime.length)];
    
    display.innerHTML = "🥠 « " + fraseCasuale + " »";
}
