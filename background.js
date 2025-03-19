async function baixarPaginaEApagarNomes(url) {
    try {
        const response = await fetch(url);
        let html = await response.text();

        html = html.replace(/\bblur\b/g, "");

        chrome.tabs.create({
            url: "data:text/html;charset=utf-8," + encodeURIComponent(html)
        });

        console.log("Página aberta em uma nova aba!");
    } catch (error) {
        console.error("Erro ao baixar a página:", error);
    }
}

// Ouvindo o clique no ícone da extensão
chrome.action.onClicked.addListener((tab) => {
    baixarPaginaEApagarNomes(tab.url);
});
