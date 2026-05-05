// Banco de dados de culturas (em dias)
const culturas = {
    milho: {
        nome: "Milho",
        ciclo: 120,
        etapas: [
            { dias: 20, tarefa: "Adubação de Cobertura", dica: "Use fertilizantes orgânicos para proteger o solo." },
            { dias: 45, tarefa: "Monitoramento de Pragas", dica: "Prefira o controle biológico para manter o equilíbrio ambiental." },
            { dias: 120, tarefa: "Colheita", dica: "Verifique a umidade do grão para evitar perdas pós-colheita." }
        ]
    },
    feijao: {
        nome: "Feijão",
        ciclo: 90,
        etapas: [
            { dias: 15, tarefa: "Controle de Ervas Daninhas", dica: "A capina manual evita a compactação do solo." },
            { dias: 40, tarefa: "Floração (Irrigação Crítica)", dica: "Use sistemas de gotejamento para economizar água." },
            { dias: 90, tarefa: "Colheita", dica: "Mantenha a palhada no solo para proteger a microbiota." }
        ]
    },
    soja: {
        nome: "Soja",
        ciclo: 110,
        etapas: [
            { dias: 25, tarefa: "Inoculação de Nitrogênio", dica: "Bactérias naturais ajudam a planta a crescer sem químicos." },
            { dias: 60, tarefa: "Monitoramento de Percevejos", dica: "Aplique apenas se atingir o nível de dano econômico." },
            { dias: 110, tarefa: "Colheita", dica: "Planeje a rotação com milho para a próxima safra." }
        ]
    }
};

document.getElementById('formCronograma').addEventListener('submit', function(e) {
    e.preventDefault();

    // Pegar valores do formulário
    const culturaInput = document.getElementById('cultura').value.toLowerCase().trim();
    const dataInicial = new Date(document.getElementById('dataInicio').value);
    const containerResultado = document.getElementById('resultadoCronograma');

    // Verificar se temos os dados da cultura ou usar um padrão genérico
    const dados = culturas[culturaInput] || {
        nome: culturaInput,
        ciclo: 100,
        etapas: [{ dias: 50, tarefa: "Manejo Geral", dica: "Siga as orientações técnicas da sua região." },
                 { dias: 100, tarefa: "Colheita Estimada", dica: "Respeite o tempo da natureza." }]
    };

    // Limpar resultados anteriores
    containerResultado.innerHTML = `<h5 class="mb-3 text-primary">Plano de Manejo: ${dados.nome}</h5>`;

    // Gerar os cards das etapas
    dados.etapas.forEach((etapa, index) => {
        let dataEtapa = new Date(dataInicial);
        dataEtapa.setDate(dataInicial.getDate() + etapa.dias);

        const dataFormatada = dataEtapa.toLocaleDateString('pt-BR');
        
        const card = document.createElement('div');
        card.className = 'card card-cronograma mb-3 p-3 shadow-sm border-0';
        card.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <strong>${index + 1}. ${etapa.tarefa}</strong>
                    <span class="badge bg-light text-dark border mt-1">${dataFormatada}</span>
                    <p class="small text-muted mt-2 mb-0">
                        <i class="bi bi-leaf-fill text-success"></i> 
                        <strong>Dica Sustentável:</strong> ${etapa.dica}
                    </p>
                </div>
                <i class="bi bi-clock-history text-secondary"></i>
            </div>
        `;
        containerResultado.appendChild(card);
    });
});
