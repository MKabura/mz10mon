async function loadArticle() {
    const endpoint = "https://script.google.com/macros/s/AKfycbyUcTaFeinmyI69fZuMLDWs-NARzO70uy-j-LSoutlakfGI9SgWkS5Tm62fjQQ68ELE_A/exec";

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch(endpoint);
    const items = await res.json();

    const article = items.find(item => item.id === id);

    if (!article) {
        document.getElementById("news-article").innerHTML = "<p>記事が見つかりません。</p>";
        return;
    }
    document.getElementById("article-title").textContent = article.title;
    document.getElementById("article-date").textContent = article.date;
    document.getElementById("article-image").src = "images/" + article.image;
    document.getElementById("article-body").innerHTML = article.body;
}

loadArticle();
