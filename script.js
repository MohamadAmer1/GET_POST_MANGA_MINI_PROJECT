const API_URL = "https://6a3812e0c105017aa6399fa8.mockapi.io/manga";

const mangaName = document.getElementById("name");
const mangaPrice = document.getElementById("price");
const mangaImg = document.getElementById("image");
const chapterNumber = document.getElementById("chapterNumber");
const statusCompleted = document.getElementById("statusCompleted");
const mangaContainer = document.getElementById("mangaContainer");
const loadingMessage = document.getElementById("loadingMessage");
const mangaForm = document.getElementById("mangaForm");

async function getManga() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("An Error Has Been Detected");
    }
    const manga = await res.json();

    displayData(manga);
  } catch (error) {
    console.log(error);
  }
}

function displayData(mangas) {
  if (mangas.length === 0) {
    loadingMessage.textContent = "Type in a Manga!";
    loadingMessage.style.color = " red";
    return;
  }
  loadingMessage.textContent = "";

  mangas.forEach((manga) => {
    const card = document.createElement("div");
    card.classList.add("manga-card");
    card.innerHTML = `
      <img src="${manga.image}">
      <div class="manga-info">
          <h3>${manga.name}</h2>
          <p>Chapters: <b>${manga.chapterNumber}</b></p>
          <p>Status-Completed: <b>${manga.statusCompleted}</b></p>
          <p>Price: <b>$${manga.price} per-chapter</b></p>
      </div>`;
    mangaContainer.appendChild(card);
  });
}

getManga();
async function sendManga(e) {
  e.preventDefault();
  try {
    const newManga = {
      name: mangaName.value,
      image: mangaImg.value,
      price: Number(mangaPrice.value),
      chapterNumber: Number(chapterNumber.value),
      statusCompleted: statusCompleted.value,
    };
    if (statusCompleted.value === "false") {
      newManga.statusCompleted = false;
    } else {
      newManga.statusCompleted = true;
    }
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newManga),
    });
    const createdManga = await response.json();
    console.log(createdManga);
    displayData([newManga]);
  } catch (error) {
    console.log(error);
  }
}

mangaForm.addEventListener("submit", sendManga);
