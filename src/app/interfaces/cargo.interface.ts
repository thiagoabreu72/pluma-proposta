export interface DadosCargo {
  estPos: number;
  posTra: string;
  dados?: Cargo[];
}

export interface Cargo {
  estCar?: number;
  codCar?: string;
  titRed?: string;
  titCar?: string;
  cargo?: string;
}

export interface Turno {
  codTur: number;
  desTur: string;
}

export interface GetCargos {
  bpmAlt?: string;
  cargo?: string;
  dados?: Cargo[];
  msgRet?: string;
}
