// Number of articles to show per page and current page
const articlesPerPage = 4;
let currentPage = 0;
let articles = [];

// Load and parse the CSV data
function loadCSV() {
    Papa.parse("merged_fake_news_dataset.csv", {
        download: true,
        header: true,
        complete: function(results) {
            articles = results.data;
            displayArticles();  // Display articles after loading
        }
    });
}

// Display articles based on the current page and search query
function displayArticles() {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";  // Clear previous content

    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchInput) ||
        article.text.toLowerCase().includes(searchInput)
    );

    const start = currentPage * articlesPerPage;
    const end = start + articlesPerPage;
    const pageArticles = filteredArticles.slice(start, end);

    pageArticles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        // Use a default image for all articles
        const image = 'https://via.placeholder.com/350x200?text=News+Image';

        newsCard.innerHTML = `
            <img src="${image}" alt="News Image">
            <div class="news-card-content">
                <h2 class="news-title">${article.title}</h2>
                <p class="news-text">${article.text}</p>
                <span class="label ${article.label === "1" ? "label-fake" : "label-real"}">
                    ${article.label === "1" ? "Fake News" : "Real News"}
                </span>
            </div>
        `;

        newsContainer.appendChild(newsCard);
    });

    // Hide Load More button if no more articles to load
    const loadMoreBtn = document.querySelector(".btn");
    loadMoreBtn.style.display = end >= filteredArticles.length ? "none" : "block";
}

// Load more articles when button is clicked
function loadMoreArticles() {
    currentPage++;
    displayArticles();
}

// Filter articles on search input change
document.getElementById("searchInput").addEventListener("input", () => {
    currentPage = 0;  // Reset to the first page
    displayArticles();
});

// Initial load
loadCSV();
