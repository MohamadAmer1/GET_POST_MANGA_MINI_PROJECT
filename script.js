const API_URL = "https://6a3812e0c105017aa6399fa8.mockapi.io/manga";

const mangaName = document.getElementById("name");
const mangaPrice = document.getElementById("price");
const mangaImg = document.getElementById("image");
const chapterNumber = document.getElementById("chapterNumber");
const statusCompleted = document.getElementById("statusCompleted");
const mangaContainer = document.getElementById("mangaContainer");
const loadingMessage = document.getElementById("loadingMessage");

async function getManga() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("An Error Has Been Detected");
    }
    const manga = await res.json();
    console.log(manga);

    getData(manga);
  } catch (error) {
    console.log(error);
  }
}

function getData(mangas) {
  if (mangas.length === 0) {
    loadingMessage.textContent = "Type in a Manga!";
    loadingMessage.style.color = " red";
    return;
  }
  loadingMessage.textContent = "";
  mangaContainer.innerHTML = "";

  mangas.forEach((manga) => {
    mangaContainer.innerHTML += `
    <div class="manga-card">
    <img src="${manga.image}">
    <div class="manga-info">
        <h3>${manga.name}</h2>
        <p>Chapters: <b>${manga.chapterNumber}</b></p>
        <p>Status-Completed: <b>${manga.statusCompleted}</b></p>
        <p>Price: <b>$${manga.price}</b></p>
    </div>

    </div>
    `;
  });
}

getManga();
