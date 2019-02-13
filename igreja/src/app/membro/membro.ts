
export class Membro {
  codigo: number;
  nome: string;
  situacao = true;
  tipo: string;
  sexo: string;
  dataNascimento: Date;
  estadoCivil: string;
  cpf: string;
  rg: string;
  nacionalidade = 'Brasileiro(a)';
  profissao: string;
  naturalidade: string;
  email: string;
  telefone: string;
  celular: string;
  graEscolaridade: string;
  curso: string;
  endereco = new Enderereco();
  nomePai: string;
  nomeMae: string;
  dataConsagracao: Date;
  dataBatismo: Date;
  comoSeConverteu: string;
  igrejaProcedencia: string;
  bastimoEspiritoSanto: string;
  dizimista: string;
  observacao: string;
  tipoAdesao = new TipoAdesao();
  situacaoMembro = new SituacaoMembro();
  cargoMinistro = new CargoMinistro();
  funcoes: Funcoes[] = [];
}



export class Funcoes {
  codigo: number;
}

export class CargoMinistro {
  codigo: number;
}

export class SituacaoMembro {
  codigo: number;
}

export class TipoAdesao {
  codigo: number;
}

export class Enderereco {
  rua: string;
  numero: string;
  bairro: string;
  estado: string;
  cidade: string;
  cep: string;
}
