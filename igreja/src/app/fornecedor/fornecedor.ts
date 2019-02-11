export class Fornecedor {
  codigo: number;
  nome: string;
  tipoPessoa: string;
  cnpj: string;
  cpf: string;
  colaborador = false;
  rg: string;
  cargo: string;
  inss: number;
  valorRenda: number;
  dataAdmissao: Date;
  dataDesligamento: Date;
  email: string;
  telefone: string;
  celular: string;
  endereco = new Endereco();
}

export class Endereco {
  rua: string;
  numero: string;
  bairro: string;
  estado: string;
  cidade: string;
  cep: string;
}
