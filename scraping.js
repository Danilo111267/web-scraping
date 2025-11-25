document.getElementById("btnCarregar").addEventListener("click", () => {
    
    let url = "https://fortnite.gg/shop";
    let container = document.getElementById("lista-precos");
    container.innerHTML = "Carregando preços...";

    fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(pagina => {

            let parser = new DOMParser();
            let doc = parser.parseFromString(pagina, "text/html");

            let precos = doc.querySelectorAll(".fn-item-price");

            container.innerHTML = ""; // limpa antes

            precos.forEach(p => {
                let div = document.createElement("div");
                div.textContent = p.textContent.trim();
                container.appendChild(div);
            });

            if (precos.length === 0) {
                container.textContent = "Nenhum preço encontrado.";
            }
        })
        .catch(err => {
            console.error("Erro:", err);
            container.textContent = "Erro ao obter os dados.";
        });
});
