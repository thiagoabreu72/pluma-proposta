export interface Mensagem {
  tipo?: number; //  1 - Sucesso , 2 - Info , 3 - Alerta, 4 - Erro
  mensagem?: string;
}

export interface Opcao {
  descricao: string;
  valor: boolean;
}

export interface Opcoes {
  selecao: Opcao[];
}

export interface Contador {
  codigo: number;
  nome: string;
  quantidade: number;
  competencia?: string;
}

export interface Texto {
  cabecalho?: string;
  texto?: string;
  valor?: number;
  obrigatorio?: string;
  desabilitar?: boolean;
}

export interface SimNao {
  opcao: string;
  booleano: boolean;
}

export interface Observacao {
  cabecalho?: string;
  descricao?: string;
  desabilitar?: boolean;
}
