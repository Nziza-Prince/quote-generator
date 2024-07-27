let api_url = "https://type.fit/api/quotes";
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let seeQoute = document.getElementById("btn");
let saving = document.getElementById("saving");
let liking = document.getElementById("liking");
let savedQuotesContainer = document.getElementById("saved-quotes-container");
let likedQuotesContainer = document.getElementById("liked-quotes-container");
let savedQuotesList = document.getElementById("saved-quotes");
let likedQuotesList = document.getElementById("liked-quotes");
let viewSavedBtn = document.getElementById("view-saved");
let viewLikedBtn = document.getElementById("view-liked");
let data;
let savedQuoteContent;
let likedQuoteContent;
let saved = [];
let liked = [];

if (localStorage.getItem('likedQuotes') == null) {
    localStorage.setItem('likedQuotes', JSON.stringify(liked));
} else {
    liked = JSON.parse(localStorage.getItem('likedQuotes'));
}

if (localStorage.getItem('savedQuotes') == null) {
    localStorage.setItem('savedQuotes', JSON.stringify(saved));
} else {
    saved = JSON.parse(localStorage.getItem('savedQuotes'));
}

async function getQuote(url) {
    const res = await fetch(url);
    const quotes = await res.json();
    data = quotes[Math.floor(Math.random() * quotes.length)];

    if (data) {
        quote.innerHTML = data.text || "Unknown Quote";
        author.innerHTML = data.author ? `- ${data.author}` : "- Unknown Author";
        saving.style.display = "inline";
        liking.style.display = "inline";
        savedQuoteContent = { text: data.text || "Unknown Quote", author: data.author || "Unknown Author" };
        likedQuoteContent = { text: data.text || "Unknown Quote", author: data.author || "Unknown Author" };

        if (saving.classList.contains("fa-solid")) {
            saving.classList.remove("fa-solid");
            saving.classList.add("fa-regular");
        }

        if (liking.classList.contains("fa-solid")) {
            liking.classList.remove("fa-solid");
            liking.classList.add("fa-regular");
            liking.style.color = "black";
        }
    } else {
        quote.innerHTML = "Failed to fetch quote.";
        author.innerHTML = "";
    }
}

seeQoute.onclick = () => {
    getQuote(api_url);
}

function saveData() {
    saved.push(savedQuoteContent);
    localStorage.setItem('savedQuotes', JSON.stringify(saved));
}

function saveLiked() {
    liked.push(likedQuoteContent);
    localStorage.setItem('likedQuotes', JSON.stringify(liked));
}

saving.onclick = () => {
    if (saving.classList.contains("fa-regular")) {
        saving.classList.remove("fa-regular");
        saving.classList.add("fa-solid");
        saveData();
    } else {
        saving.classList.remove("fa-solid");
        saving.classList.add("fa-regular");
    }
}

liking.onclick = () => {
    if (liking.classList.contains("fa-regular")) {
        liking.classList.remove("fa-regular");
        liking.classList.add("fa-solid");
        liking.style.color = "red";
        saveLiked();
    } else {
        liking.classList.remove("fa-solid");
        liking.classList.add("fa-regular");
        liking.style.color = "black";
    }
}

viewSavedBtn.onclick = () => {
    savedQuotesContainer.style.display = savedQuotesContainer.style.display === "block" ? "none" : "block";
    displayQuotes(savedQuotesList, saved);
}

viewLikedBtn.onclick = () => {
    likedQuotesContainer.style.display = likedQuotesContainer.style.display === "block" ? "none" : "block";
    displayQuotes(likedQuotesList, liked);
}

function displayQuotes(container, quotes) {
    container.innerHTML = '';
    quotes.forEach((quote) => {
        let li = document.createElement('li');
        li.textContent = `"${quote.text}" - ${quote.author}`;
        container.appendChild(li);
    });
}
