class GerenciadorClientes {
    constructor() {
        this.currentAction = null;
        this.selectedClient = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSearch();
    }

    setupEventListeners() {
        // Botões de ação
        document.querySelectorAll('.action-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleAction(action);
            });
        });

        // Busca global
        document.querySelector('.search-btn').addEventListener('click', () => {
            this.performGlobalSearch();
        });

        document.getElementById('globalSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performGlobalSearch();
            }
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('globalSearch');
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                this.showSearchSuggestions(searchTerm);
            } else {
                this.hideSearchSuggestions();
            }
        });
    }

    handleAction(action) {
        this.currentAction = action;
        this.renderActionForm(action);
    }

    renderActionForm(action) {
        const actionArea = document.getElementById('actionArea');
        
        switch(action) {
            case 'buscar':
                actionArea.innerHTML = this.getBuscarForm();
                break;
            case 'inserir':
                actionArea.innerHTML = this.getInserirForm();
                this.setupCombobox('clienteNome');
                break;
            case 'alterar':
                actionArea.innerHTML = this.getAlterarForm();
                this.setupCombobox('clienteBuscar');
                break;
            case 'deletar':
                actionArea.innerHTML = this.getDeletarForm();
                this.setupCombobox('clienteDeletar');
                break;
        }
    }

    getBuscarForm() {
        return `
            <div class="action-form">
                <h3>Buscar Clientes</h3>
                <div class="form-group">
                    <label for="filtroBusca">Filtrar por:</label>
                    <select id="filtroBusca">
                        <option value="nome">Nome</option>
                        <option value="cpf">CPF</option>
                        <option value="telefone">Telefone</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="termoBusca">Termo de busca:</label>
                    <input type="text" id="termoBusca" placeholder="Digite para buscar...">
                </div>
                <button class="btn" onclick="clientesManager.executarBusca()">Buscar</button>
            </div>
        `;
    }

    getInserirForm() {
        return `
            <div class="action-form">
                <h3>Inserir Novo Cliente</h3>
                <div class="form-group">
                    <label for="clienteNome">Nome:</label>
                    <input type="text" id="clienteNome" required>
                    <div class="error-message" id="nomeError">Nome é obrigatório</div>
                </div>
                <div class="form-group">
                    <label for="clienteCpf">CPF:</label>
                    <input type="text" id="clienteCpf" required>
                    <div class="error-message" id="cpfError">CPF é obrigatório</div>
                </div>
                <div class="form-group">
                    <label for="clienteTelefone">Telefone:</label>
                    <input type="text" id="clienteTelefone" required>
                    <div class="error-message" id="telefoneError">Telefone é obrigatório</div>
                </div>
                <div class="form-group">
                    <label for="clienteEmail">Email:</label>
                    <input type="email" id="clienteEmail">
                </div>
                <button class="btn confirm-btn" onclick="clientesManager.confirmarAcao('inserir')">Confirmar Cadastro</button>
            </div>
        `;
    }

    getAlterarForm() {
        return `
            <div class="action-form">
                <h3>Alterar Cliente</h3>
                <div class="form-group combobox">
                    <label for="clienteBuscar">Buscar Cliente:</label>
                    <input type="text" id="clienteBuscar" placeholder="Digite o nome, CPF ou telefone...">
                    <div class="combobox-options" id="comboboxOptions"></div>
                </div>
                <div id="dadosCliente" style="display: none;">
                    <div class="form-group">
                        <label for="clienteNomeAlt">Nome:</label>
                        <input type="text" id="clienteNomeAlt">
                    </div>
                    <div class="form-group">
                        <label for="clienteCpfAlt">CPF:</label>
                        <input type="text" id="clienteCpfAlt">
                    </div>
                    <div class="form-group">
                        <label for="clienteTelefoneAlt">Telefone:</label>
                        <input type="text" id="clienteTelefoneAlt">
                    </div>
                    <div class="form-group">
                        <label for="clienteEmailAlt">Email:</label>
                        <input type="email" id="clienteEmailAlt">
                    </div>
                    <button class="btn confirm-btn" onclick="clientesManager.confirmarAcao('alterar')">Salvar Alterações</button>
                </div>
            </div>
        `;
    }

    getDeletarForm() {
        return `
            <div class="action-form">
                <h3>Deletar Cliente</h3>
                <div class="form-group combobox">
                    <label for="clienteDeletar">Buscar Cliente:</label>
                    <input type="text" id="clienteDeletar" placeholder="Digite o nome, CPF ou telefone...">
                    <div class="combobox-options" id="comboboxOptionsDelete"></div>
                </div>
                <div id="dadosClienteDelete" style="display: none;">
                    <div class="client-info">
                        <p><strong>Cliente selecionado:</strong> <span id="clienteInfo"></span></p>
                    </div>
                    <button class="btn confirm-btn" onclick="clientesManager.confirmarAcao('deletar')">Confirmar Exclusão</button>
                </div>
            </div>
        `;
    }

    setupCombobox(inputId) {
        const input = document.getElementById(inputId);
        const optionsContainer = inputId === 'clienteDeletar' ? 
            document.getElementById('comboboxOptionsDelete') : 
            document.getElementById('comboboxOptions');

        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                this.loadClientSuggestions(searchTerm, optionsContainer);
                optionsContainer.style.display = 'block';
            } else {
                optionsContainer.style.display = 'none';
            }
        });

        // Fechar combobox ao clicar fora
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !optionsContainer.contains(e.target)) {
                optionsContainer.style.display = 'none';
            }
        });
    }

    async loadClientSuggestions(searchTerm, optionsContainer) {
        try {
            // Simular busca no backend
            const suggestions = await this.searchClients(searchTerm);
            
            optionsContainer.innerHTML = '';
            suggestions.forEach(client => {
                const option = document.createElement('div');
                option.className = 'combobox-option';
                option.textContent = `${client.nome} - ${client.cpf}`;
                option.addEventListener('click', () => {
                    this.selectClient(client, optionsContainer);
                });
                optionsContainer.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar sugestões:', error);
        }
    }

    async searchClients(term) {
        // Simular chamada API
        return new Promise(resolve => {
            setTimeout(() => {
                // Dados mockados - substituir pela chamada real ao backend
                const mockClients = [
                    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', telefone: '(11) 9999-9999', email: 'joao@email.com' },
                    { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', telefone: '(11) 8888-8888', email: 'maria@email.com' },
                    { id: 3, nome: 'Pedro Oliveira', cpf: '456.789.123-00', telefone: '(11) 7777-7777', email: 'pedro@email.com' }
                ].filter(client => 
                    client.nome.toLowerCase().includes(term.toLowerCase()) ||
                    client.cpf.includes(term) ||
                    client.telefone.includes(term)
                );
                resolve(mockClients);
            }, 300);
        });
    }

    selectClient(client, optionsContainer) {
        this.selectedClient = client;
        optionsContainer.style.display = 'none';
        
        if (this.currentAction === 'alterar') {
            this.preencherFormAlterar(client);
        } else if (this.currentAction === 'deletar') {
            this.preencherFormDeletar(client);
        }
    }

    preencherFormAlterar(client) {
        document.getElementById('clienteBuscar').value = `${client.nome} - ${client.cpf}`;
        document.getElementById('clienteNomeAlt').value = client.nome;
        document.getElementById('clienteCpfAlt').value = client.cpf;
        document.getElementById('clienteTelefoneAlt').value = client.telefone;
        document.getElementById('clienteEmailAlt').value = client.email;
        document.getElementById('dadosCliente').style.display = 'block';
    }

    preencherFormDeletar(client) {
        document.getElementById('clienteDeletar').value = `${client.nome} - ${client.cpf}`;
        document.getElementById('clienteInfo').textContent = `${client.nome} - ${client.cpf} - ${client.telefone}`;
        document.getElementById('dadosClienteDelete').style.display = 'block';
    }

    async confirmarAcao(acao) {
        try {
            switch(acao) {
                case 'inserir':
                    await this.inserirCliente();
                    break;
                case 'alterar':
                    await this.alterarCliente();
                    break;
                case 'deletar':
                    await this.deletarCliente();
                    break;
            }
        } catch (error) {
            console.error('Erro ao confirmar ação:', error);
            alert('Erro ao executar operação');
        }
    }

    async inserirCliente() {
        const cliente = {
            nome: document.getElementById('clienteNome').value,
            cpf: document.getElementById('clienteCpf').value,
            telefone: document.getElementById('clienteTelefone').value,
            email: document.getElementById('clienteEmail').value
        };

        // Validar campos obrigatórios
        if (!cliente.nome || !cliente.cpf || !cliente.telefone) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        // Simular chamada API
        console.log('Inserindo cliente:', cliente);
        alert('Cliente cadastrado com sucesso!');
        this.limparFormulario();
    }

    async alterarCliente() {
        if (!this.selectedClient) {
            alert('Selecione um cliente primeiro');
            return;
        }

        const clienteAtualizado = {
            id: this.selectedClient.id,
            nome: document.getElementById('clienteNomeAlt').value,
            cpf: document.getElementById('clienteCpfAlt').value,
            telefone: document.getElementById('clienteTelefoneAlt').value,
            email: document.getElementById('clienteEmailAlt').value
        };

        console.log('Alterando cliente:', clienteAtualizado);
        alert('Cliente alterado com sucesso!');
        this.limparFormulario();
    }

    async deletarCliente() {
        if (!this.selectedClient) {
            alert('Selecione um cliente primeiro');
            return;
        }

        if (confirm(`Tem certeza que deseja deletar o cliente ${this.selectedClient.nome}?`)) {
            console.log('Deletando cliente:', this.selectedClient);
            alert('Cliente deletado com sucesso!');
            this.limparFormulario();
        }
    }

    limparFormulario() {
        this.selectedClient = null;
        document.getElementById('actionArea').innerHTML = '<div class="welcome-message"><p>Selecione uma ação acima para começar</p></div>';
    }

    async performGlobalSearch() {
        const searchTerm = document.getElementById('globalSearch').value;
        if (!searchTerm) {
            alert('Digite um termo para buscar');
            return;
        }

        try {
            const results = await this.searchClients(searchTerm);
            this.displayResults(results);
        } catch (error) {
            console.error('Erro na busca global:', error);
        }
    }

    displayResults(clients) {
        const resultsArea = document.getElementById('resultsArea');
        
        if (clients.length === 0) {
            resultsArea.innerHTML = '<p>Nenhum cliente encontrado</p>';
            return;
        }

        let html = `
            <h3>Resultados da Busca (${clients.length} clientes encontrados)</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
        `;

        clients.forEach(client => {
            html += `
                <tr>
                    <td>${client.nome}</td>
                    <td>${client.cpf}</td>
                    <td>${client.telefone}</td>
                    <td>${client.email || '-'}</td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        resultsArea.innerHTML = html;
    }

    showSearchSuggestions(term) {
        // Implementação similar ao loadClientSuggestions
        console.log('Buscando sugestões para:', term);
    }

    hideSearchSuggestions() {
        // Implementação para esconder sugestões
    }

    async executarBusca() {
        const filtro = document.getElementById('filtroBusca').value;
        const termo = document.getElementById('termoBusca').value;
        
        if (!termo) {
            alert('Digite um termo para buscar');
            return;
        }

        try {
            const results = await this.searchClients(termo);
            this.displayResults(results);
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    }
}

// Inicializar o gerenciador
const clientesManager = new GerenciadorClientes();