export interface DadosPosto {
  estPos?: number;
  posTra?: string;
  desRed?: string;
  tipPos?: string;
  posto?: string;
}

export interface Posto {
  numEmp?: number;
  priApr?: string;
  segApr?: string;
  estCar?: number;
  codCar?: string;
  dados?: DadosPosto[];
  selecionado?: any;
  msgRet?: string;
}
