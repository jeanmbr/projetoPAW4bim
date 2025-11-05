class GerenciadorCarros {
    constructor() {
        this.currentAction = null;
        this.selectedCar = null;
        this.selectedClient = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCarsTable();
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

        // Seleção de carro na tabela
        document.addEventListener('click', (e) => {
            if (e.target.closest('#carsTable tbody tr')) {
                const row = e.target.closest('tr');
                this.selectCarFromTable(row);
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
                this.setupClientCombobox('clienteCarro');
                break;
            case 'alterar':
                actionArea.innerHTML = this.getAlterarForm();
                this.setupCarCombobox('carroBuscar');
                break;
            case 'deletar':
                actionArea.innerHTML = this.getDeletarForm();
                this.setupCarCombobox('carroDeletar');
                break;
        }
    }

    getBuscarForm() {
        return `
            <div class="action-form">
                <h3>Buscar Carros</h3>
                <div class="form-group">
                    <label for="filtroBuscaCarro">Filtrar por:</label>
                    <select id="filtroBuscaCarro">
                        <option value="montadora">Montadora</option>
                        <option value="modelo">Modelo</option>
                        <option value="placa">Placa</option>
                        <option value="cor">Cor</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="termoBuscaCarro">Termo de busca:</label>
                    <input type="text" id="termoBuscaCarro" placeholder="Digite para buscar...">
                </div>
                <button class="btn" onclick="carrosManager.executarBuscaCarros()">Buscar</button>
            </div>
        `;
    }

    getInserirForm() {
        return `
            <div class="action-form">
                <h3>Inserir Novo Carro</h3>
                <div class="form-group">
                    <label for="carroPlaca">Placa:</label>
                    <input type="text" id="carroPlaca" required>
                    <div class="error-message" id="placaError">Placa é obrigatória</div>
                </div>
                <div class="form-group">
                    <label for="carroMontadora">Montadora:</label>
                    <input type="text" id="carroMontadora" required>
                    <div class="error-message" id="montadoraError">Montadora é obrigatória</div>
                </div>
                <div class="form-group">
                    <label for="carroModelo">Modelo:</label>
                    <input type="text" id="carroModelo" required>
                    <div class="error-message" id="modeloError">Modelo é obrigatório</div>
                </div>
                <div class="form-group">
                    <label for="carroCor">Cor:</label>
                    <input type="text" id="carroCor" required>
                    <div class="error-message" id="corError">Cor é obrigatória</div>
                </div>
                <div class="form-group combobox">
                    <label for="clienteCarro">Cliente (Proprietário):</label>
                    <input type="text" id="clienteCarro" placeholder="Digite o nome do cliente..." required>
                    <div class="combobox-options" id="comboboxOptionsClient"></div>
                    <div class="error-message" id="clienteError">Cliente é obrigatório</div>
                </div>
                <button class="btn confirm-btn" onclick="carrosManager.confirmarAcao('inserir')">Confirmar Cadastro</button>
            </div>
        `;
    }

    getAlterarForm() {
        return `
            <div class="action-form">
                <h3>Alterar Carro</h3>
                <div class="form-group combobox">
                    <label for="carroBuscar">Buscar Carro:</label>
                    <input type="text" id="carroBuscar" placeholder="Digite placa, modelo ou montadora...">
                    <div class="combobox-options" id="comboboxOptionsCar"></div>
                </div>
                <div id="dadosCarro" style="display: none;">
                    <div class="form-group">
                        <label for="carroPlacaAlt">Placa:</label>
                        <input type="text" id="carroPlacaAlt">
                    </div>
                    <div class="form-group">
                        <label for="carroMontadoraAlt">Montadora:</label>
                        <input type="text" id="carroMontadoraAlt">
                    </div>
                    <div class="form-group">
                        <label for="carroModeloAlt">Modelo:</label>
                        <input type="text" id="carroModeloAlt">
                    </div>
                    <div class="form-group">
                        <label for="carroCorAlt">Cor:</label>
                        <input type="text" id="carroCorAlt">
                    </div>
                    <div class="form-group combobox">
                        <label for="clienteCarroAlt">Cliente (Proprietário):</label>
                        <input type="text" id="clienteCarroAlt" placeholder="Digite o nome do cliente...">
                        <div class="combobox-options" id="comboboxOptionsClientAlt"></div>
                    </div>
                    <button class="btn confirm-btn" onclick="carrosManager.confirmarAcao('alterar')">Salvar Alterações</button>
                </div>
            </div>
        `;
    }

    getDeletarForm() {
        return `
            <div class="action-form">
                <h3>Deletar Carro</h3>
                <div class="form-group combobox">
                    <label for="carroDeletar">Buscar Carro:</label>
                    <input type="text" id="carroDeletar" placeholder="Digite placa, modelo ou montadora...">
                    <div class="combobox-options" id="comboboxOptionsCarDelete"></div>
                </div>
                <div id="dadosCarroDelete" style="display: none;">
                    <div class="car-info">
                        <p><strong>Carro selecionado:</strong> <span id="carroInfo"></span></p>
                    </div>
                    <button class="btn confirm-btn" onclick="carrosManager.confirmarAcao('deletar')">Confirmar Exclusão</button>
                </div>
            </div>
        `;
    }

    setupClientCombobox(inputId) {
        const input = document.getElementById(inputId);
        const optionsContainer = document.getElementById(
            inputId === 'clienteCarroAlt' ? 'comboboxOptionsClientAlt' : 'comboboxOptionsClient'
        );

        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                this.loadClientSuggestions(searchTerm, optionsContainer, inputId);
                optionsContainer.style.display = 'block';
            } else {
                optionsContainer.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !optionsContainer.contains(e.target)) {
                optionsContainer.style.display = 'none';
            }
        });
    }

    setupCarCombobox(inputId) {
        const input = document.getElementById(inputId);
        const optionsContainer = inputId === 'carroDeletar' ? 
            document.getElementById('comboboxOptionsCarDelete') : 
            document.getElementById('comboboxOptionsCar');

        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                this.loadCarSuggestions(searchTerm, optionsContainer);
                optionsContainer.style.display = 'block';
            } else {
                optionsContainer.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !optionsContainer.contains(e.target)) {
                optionsContainer.style.display = 'none';
            }
        });
    }

    async loadClientSuggestions(searchTerm, optionsContainer, inputId) {
        try {
            // Simular busca de clientes no backend
            const suggestions = await this.searchClients(searchTerm);
            
            optionsContainer.innerHTML = '';
            suggestions.forEach(client => {
                const option = document.createElement('div');
                option.className = 'combobox-option';
                option.textContent = `${client.nome} - ${client.cpf}`;
                option.addEventListener('click', () => {
                    this.selectClient(client, optionsContainer, inputId);
                });
                optionsContainer.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar sugestões de clientes:', error);
        }
    }

    async loadCarSuggestions(searchTerm, optionsContainer) {
        try {
            const suggestions = await this.searchCars(searchTerm);
            
            optionsContainer.innerHTML = '';
            suggestions.forEach(car => {
                const option = document.createElement('div');
                option.className = 'combobox-option';
                option.textContent = `${car.placa} - ${car.montadora} ${car.modelo}`;
                option.addEventListener('click', () => {
                    this.selectCar(car, optionsContainer);
                });
                optionsContainer.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar sugestões de carros:', error);
        }
    }

    async searchClients(term) {
        // Simular chamada API - mesma função do clientes.js
        return new Promise(resolve => {
            setTimeout(() => {
                const mockClients = [
                    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', telefone: '(11) 9999-9999', email: 'joao@email.com' },
                    { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', telefone: '(11) 8888-8888', email: 'maria@email.com' },
                    { id: 3, nome: 'Pedro Oliveira', cpf: '456.789.123-00', telefone: '(11) 7777-7777', email: 'pedro@email.com' }
                ].filter(client => 
                    client.nome.toLowerCase().includes(term.toLowerCase()) ||
                    client.cpf.includes(term)
                );
                resolve(mockClients);
            }, 300);
        });
    }

    async searchCars(term) {
        // Simular chamada API
        return new Promise(resolve => {
            setTimeout(() => {
                const mockCars = [
                    { id: 1, placa: 'ABC-1234', montadora: 'Ford', modelo: 'Fiesta', cor: 'Preto', clienteId: 1 },
                    { id: 2, placa: 'DEF-5678', montadora: 'Volkswagen', modelo: 'Gol', cor: 'Branco', clienteId: 2 },
                    { id: 3, placa: 'GHI-9012', montadora: 'Chevrolet', modelo: 'Onix', cor: 'Prata', clienteId: 3 }
                ].filter(car =>
                    car.placa.toLowerCase().includes(term.toLowerCase()) ||
                    car.montadora.toLowerCase().includes(term.toLowerCase()) ||
                    car.modelo.toLowerCase().includes(term.toLowerCase()) ||
                    car.cor.toLowerCase().includes(term.toLowerCase())
                );
                resolve(mockCars);
            }, 300);
        });
    }

    selectClient(client, optionsContainer, inputId) {
        this.selectedClient = client;
        optionsContainer.style.display = 'none';
        document.getElementById(inputId).value = `${client.nome} - ${client.cpf}`;
    }

    selectCar(car, optionsContainer) {
        this.selectedCar = car;
        optionsContainer.style.display = 'none';
        
        if (this.currentAction === 'alterar') {
            this.preencherFormAlterar(car);
        } else if (this.currentAction === 'deletar') {
            this.preencherFormDeletar(car);
        }
    }

    async preencherFormAlterar(car) {
        document.getElementById('carroBuscar').value = `${car.placa} - ${car.montadora} ${car.modelo}`;
        document.getElementById('carroPlacaAlt').value = car.placa;
        document.getElementById('carroMontadoraAlt').value = car.montadora;
        document.getElementById('carroModeloAlt').value = car.modelo;
        document.getElementById('carroCorAlt').value = car.cor;
        
        // Buscar dados do cliente
        const client = await this.getClientById(car.clienteId);
        if (client) {
            document.getElementById('clienteCarroAlt').value = `${client.nome} - ${client.cpf}`;
            this.selectedClient = client;
        }
        
        document.getElementById('dadosCarro').style.display = 'block';
        this.setupClientCombobox('clienteCarroAlt');
    }

    preencherFormDeletar(car) {
        document.getElementById('carroDeletar').value = `${car.placa} - ${car.montadora} ${car.modelo}`;
        document.getElementById('carroInfo').textContent = `${car.placa} - ${car.montadora} ${car.modelo} - ${car.cor}`;
        document.getElementById('dadosCarroDelete').style.display = 'block';
    }

    async getClientById(clientId) {
        // Simular busca de cliente por ID
        return new Promise(resolve => {
            setTimeout(() => {
                const clients = [
                    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', telefone: '(11) 9999-9999', email: 'joao@email.com' },
                    { id: 2, nome: 'Maria Santos', cpf: '987.654.321-00', telefone: '(11) 8888-8888', email: 'maria@email.com' },
                    { id: 3, nome: 'Pedro Oliveira', cpf: '456.789.123-00', telefone: '(11) 7777-7777', email: 'pedro@email.com' }
                ];
                resolve(clients.find(c => c.id === clientId));
            }, 200);
        });
    }

    async confirmarAcao(acao) {
        try {
            switch(acao) {
                case 'inserir':
                    await this.inserirCarro();
                    break;
                case 'alterar':
                    await this.alterarCarro();
                    break;
                case 'deletar':
                    await this.deletarCarro();
                    break;
            }
        } catch (error) {
            console.error('Erro ao confirmar ação:', error);
            alert('Erro ao executar operação');
        }
    }

    async inserirCarro() {
        if (!this.selectedClient) {
            alert('Selecione um cliente primeiro');
            return;
        }

        const carro = {
            placa: document.getElementById('carroPlaca').value,
            montadora: document.getElementById('carroMontadora').value,
            modelo: document.getElementById('carroModelo').value,
            cor: document.getElementById('carroCor').value,
            clienteId: this.selectedClient.id
        };

        // Validar campos obrigatórios
        if (!carro.placa || !carro.montadora || !carro.modelo || !carro.cor) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        console.log('Inserindo carro:', carro);
        alert('Carro cadastrado com sucesso!');
        this.limparFormulario();
        this.loadCarsTable();
    }

    async alterarCarro() {
        if (!this.selectedCar || !this.selectedClient) {
            alert('Selecione um carro primeiro');
            return;
        }

        const carroAtualizado = {
            id: this.selectedCar.id,
            placa: document.getElementById('carroPlacaAlt').value,
            montadora: document.getElementById('carroMontadoraAlt').value,
            modelo: document.getElementById('carroModeloAlt').value,
            cor: document.getElementById('carroCorAlt').value,
            clienteId: this.selectedClient.id
        };

        console.log('Alterando carro:', carroAtualizado);
        alert('Carro alterado com sucesso!');
        this.limparFormulario();
        this.loadCarsTable();
    }

    async deletarCarro() {
        if (!this.selectedCar) {
            alert('Selecione um carro primeiro');
            return;
        }

        if (confirm(`Tem certeza que deseja deletar o carro ${this.selectedCar.placa}?`)) {
            console.log('Deletando carro:', this.selectedCar);
            alert('Carro deletado com sucesso!');
            this.limparFormulario();
            this.loadCarsTable();
        }
    }

    limparFormulario() {
        this.selectedCar = null;
        this.selectedClient = null;
        document.getElementById('actionArea').innerHTML = '<div class="welcome-message"><p>Selecione uma ação acima para começar</p></div>';
    }

    async loadCarsTable() {
        try {
            const cars = await this.getAllCars();
            this.displayCarsTable(cars);
        } catch (error) {
            console.error('Erro ao carregar tabela de carros:', error);
        }
    }

    async getAllCars() {
        // Simular chamada API
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 1, placa: 'ABC-1234', montadora: 'Ford', modelo: 'Fiesta', cor: 'Preto', clienteId: 1 },
                    { id: 2, placa: 'DEF-5678', montadora: 'Volkswagen', modelo: 'Gol', cor: 'Branco', clienteId: 2 },
                    { id: 3, placa: 'GHI-9012', montadora: 'Chevrolet', modelo: 'Onix', cor: 'Prata', clienteId: 3 }
                ]);
            }, 300);
        });
    }

    displayCarsTable(cars) {
        const tbody = document.querySelector('#carsTable tbody');
        tbody.innerHTML = '';

        cars.forEach(car => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${car.placa}</td>
                <td>${car.montadora}</td>
                <td>${car.modelo}</td>
                <td>${car.cor}</td>
            `;
            row.setAttribute('data-car-id', car.id);
            tbody.appendChild(row);
        });
    }

    async selectCarFromTable(row) {
        const carId = parseInt(row.getAttribute('data-car-id'));
        
        try {
            const car = await this.getCarById(carId);
            if (car) {
                this.highlightSelectedRow(row);
                await this.displayClientInfo(car.clienteId);
            }
        } catch (error) {
            console.error('Erro ao selecionar carro:', error);
        }
    }

    async getCarById(carId) {
        // Simular busca de carro por ID
        return new Promise(resolve => {
            setTimeout(() => {
                const cars = [
                    { id: 1, placa: 'ABC-1234', montadora: 'Ford', modelo: 'Fiesta', cor: 'Preto', clienteId: 1 },
                    { id: 2, placa: 'DEF-5678', montadora: 'Volkswagen', modelo: 'Gol', cor: 'Branco', clienteId: 2 },
                    { id: 3, placa: 'GHI-9012', montadora: 'Chevrolet', modelo: 'Onix', cor: 'Prata', clienteId: 3 }
                ];
                resolve(cars.find(c => c.id === carId));
            }, 200);
        });
    }

    highlightSelectedRow(selectedRow) {
        // Remover seleção anterior
        document.querySelectorAll('#carsTable tbody tr').forEach(row => {
            row.classList.remove('selected');
        });
        
        // Adicionar seleção à linha clicada
        selectedRow.classList.add('selected');
    }

    async displayClientInfo(clientId) {
        const client = await this.getClientById(clientId);
        const tbody = document.querySelector('#clientTable tbody');
        
        if (client) {
            tbody.innerHTML = `
                <tr>
                    <td>${client.nome}</td>
                    <td>${client.cpf}</td>
                    <td>${client.telefone}</td>
                    <td>${client.email || '-'}</td>
                </tr>
            `;
        } else {
            tbody.innerHTML = '<tr><td colspan="4">Cliente não encontrado</td></tr>';
        }
    }

    async performGlobalSearch() {
        const searchTerm = document.getElementById('globalSearch').value;
        if (!searchTerm) {
            alert('Digite um termo para buscar');
            return;
        }

        try {
            const results = await this.searchCars(searchTerm);
            this.displayCarsTable(results);
        } catch (error) {
            console.error('Erro na busca global:', error);
        }
    }

    async executarBuscaCarros() {
        const filtro = document.getElementById('filtroBuscaCarro').value;
        const termo = document.getElementById('termoBuscaCarro').value;
        
        if (!termo) {
            alert('Digite um termo para buscar');
            return;
        }

        try {
            const results = await this.searchCars(termo);
            this.displayCarsTable(results);
        } catch (error) {
            console.error('Erro na busca:', error);
        }
    }
}

// Inicializar o gerenciador
const carrosManager = new GerenciadorCarros();