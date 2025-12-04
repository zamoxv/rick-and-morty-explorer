const API_URL = "https://rickandmortyapi.com/api/character";

let currentPage = 1;
let maxPage = 1; 

const cardsContainer = document.getElementById("cards");
const statusEl = document.getElementById("status");
const pageInfoEl = document.getElementById("page-info");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

document.addEventListener("DOMContentLoaded", () =>{
    loadPage(currentPage);

    prevBtn.addEventListener("click", () => {
        if(currentPage > 1){
            currentPage --;
            loadPage(currentPage);
        }
    })
    nextBtn.addEventListener("click", () => {
        if(currentPage < maxPage){
            currentPage ++;
            loadPage(currentPage);
        }
    });
});

async function loadPage(page) {
    statusEl.textContent = "Cargando...";
    cardsContainer.innerHTML = "";

    try{
        const res = await fetch(`${API_URL}?page=${page}`);
        if(!res.ok){
            throw new Error("Error al obtener datos de la API");
        }

        const data = await res.json();

        maxPage = data.info.pages;
        pageInfoEl.textContent = `Página ${page} de ${maxPage}`;

        renderCards(data.results);
        statusEl.textContent = "";

    }catch(error){
        console.error(error);
        status.textContent = "No se pudieron cargar los personajes.";
    }
}

function renderCards(characters) {
  cardsContainer.innerHTML = "";

  characters.forEach((char) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}">
      <h3>${char.name}</h3>
      <p>Estado: ${char.status}</p>
      <p>Especie: ${char.species}</p>
      <p>Origen: ${char.origin.name}</p>
    `;

    cardsContainer.appendChild(card);
  });
}
