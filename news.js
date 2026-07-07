async function loadArticle() {
    const endpoint = "https://script.google.com/macros/s/AKfycbyP8hy4mNaUENxYDtSCFpP3X9uIr9NpA-obaNbYiD7A15SCQewa17ZGb6GiI6xXyhVUkg/exec";

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
    document.getElementById("article-image").src = article.image;
    document.getElementById("article-body").innerHTML = article.body;
}

loadArticle();
