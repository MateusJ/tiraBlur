const fs = require('fs');
const fetch = require('node-fetch');
const readline = require('readline');


async function downloadPageSource(url, filename, callback) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        await fs.promises.writeFile(filename, html, 'utf8');
        console.log('Página baixada e salva como', filename);
        if (callback) {
            await callback(filename);
        }
    } catch (error) {
        console.error('Erro ao baixar a página:', error);
    }
}

async function apagarNomesDoArquivo(caminhoArquivo) {
    try {
        const data = await fs.promises.readFile(caminhoArquivo, 'utf8');
        const novoConteudo = data.replace(/\bblur\b/g, '');
        await fs.promises.writeFile(caminhoArquivo, novoConteudo, 'utf8');
        console.log('Nomes apagados com sucesso!');
    } catch (error) {
        console.error('Erro ao manipular o arquivo:', error);
    }
}

// Função para baixar a página e, em seguida, apagar os nomes do arquivo
async function baixarPaginaEApagarNomes(url, filename) {
    await downloadPageSource(url, filename, apagarNomesDoArquivo);
    process.exit();
}

// Exemplo de uso
const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

setTimeout(() => {
    console.log('\x1Bc');

    r1.question("Cole o link aq:", (link)=>{
        if(link){
            baixarPaginaEApagarNomes(link, "respondeAi.html");
        }
    })
}, 20);





