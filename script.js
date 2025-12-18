const API_URL = "https://rickandmortyapi.com/api/character";

let currentPage = 1;
let maxPage = 1; 
let currentSearch = "";

const cardsContainer = document.getElementById("cards");
const statusEl = document.getElementById("status");
const pageInfoEl = document.getElementById("page-info");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const searchInput = document.getElementById("search-input");

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
    searchInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            const value = searchInput.value.trim();
            currentSearch = value;
            currentPage = 1;
            loadPage(currentPage);
        }
    })
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.trim();

        if(value === ""){
            currentSearch = "";
            currentPage = 1;
            loadPage(currentPage);
        }
    })
});

async function loadPage(page) {
    statusEl.textContent = "Cargando...";
    cardsContainer.innerHTML = "";

    try{
        let url = `${API_URL}?page=${page}`;
        if(currentSearch){
            url += `&name=${encodeURIComponent(currentSearch)} `;
        }

        const res = await fetch(url);

        if(res.status === 404){
            cardsContainer.innerHTML = "";
            statusEl.textContent = "No se encontraron personajes para mostrar";
            pageInfoEl.textContent = "Sin resultados";
            return;
        }

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
