async function loadCategory() {
    const endpoint = "https://script.google.com/macros/s/AKfycbz4T9ev723nI65LqtDNH9nEQWQaXdmB2l-S6Wz0D_7y/exec";

    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat");

    document.getElementById("category-title").textContent = category;

    const res = await fetch(endpoint);
    const items = await res.json();

    const filtered = items.filter(item => item.category === category);

    const container = document.getElementById("category-list");
    container.innerHTML = "";

    filtered.forEach(item => {
        container.innerHTML += `
            <div class="news-card">
                <img src="images/${item.image}" alt="">
                <h3>${item.title}</h3>
                <p class="date">${item.date}</p>
                <p>${item.summary}</p>
                <a href="news.html?id=${item.id}" class="more">続きを読む</a>
            </div>
        `;
    });
}
loadCategory();
