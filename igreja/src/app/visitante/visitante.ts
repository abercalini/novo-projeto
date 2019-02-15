export class Visitante {
    codigo: number;
    nome: string;
    cargoMinistro = new CargoMinistro();
    telefone: string;
    email: string;
    observacao: string;
    endereco = new Endereco();
}

export class CargoMinistro {
    codigo: number;
}

export class Endereco {
    rua: string;
    numero: string;
    bairro: string;
    estado: string;
    cidade: string;
    cep: string;
}
