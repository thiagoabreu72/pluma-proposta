export interface Afastamento {
  datIni?: string;
  datFim?: string;
  datAfa?: string;
  horAfa?: number;
  sitAfa?: number;
  desAfa?: string;
}

export interface Anotacao {
  datIni?: string;
  datFim?: string;
  datNot?: string;
  horNot?: number;
  tipNot?: number;
  desNot?: string;
}

export interface Situacao {
  codSit: number;
  desSit: string;
  qtdDia: number;
}

export interface Salario {
  datIni?: string;
  datFim?: string;
  datAlt?: string;
  seqAlt?: number;
  codMot?: number;
  valSal?: number;
  cplSal?: number;
  nomMot?: string;
  salAnt?: number;
}

export interface Historicos {
  numEmp?: number;
  tipCol?: number;
  numCad?: number;
  lisSal?: string;
  lisAfa?: string;
  lisAno?: string;
  afastamentos?: Afastamento[];
  anotacoes?: Anotacao[];
  situacoes?: Situacao[];
  salarios?: Salario[];
}
