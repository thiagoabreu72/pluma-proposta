export interface ColaboradorPosto {
  numEmp: number;
  estPos: number;
  posTra: string;
  dados?: Colaborador[];
}

export interface Colaborador {
  numEmp?: number;
  tipCol?: number;
  numCad?: number;
  nomFun?: string;
  estPos?: number;
  posTra?: string;
  desPos?: string;
  estCar?: number;
  codCar?: string;
  titCar?: string;
  priApr?: string;
  cadApr?: number;
  nomApr?: string;
  datCon?: string;
  defFis?: string;
  colaborador?: string;
  cargo?: string;
  salario?: string | number;
  valSal?: number;
  email_aprovador_2?: string;
  email_aprovador_1?: string;
  email_solicitante?: string;
  cadastro_aprovador_2?: number;
  cadastro_aprovador_1?: number;
  tipo_aprovador_2?: number;
  tipo_aprovador_1?: number;
  empresa_aprovador_2?: number;
  empresa_aprovador_1?: number;
  aprovador_2?: string | number;
  aprovador_1?: string | number;
  usuario_solicitante?: string;
}

export interface GetColaborador {
  codUsu?: number;
  dados?: Colaborador;
  msgRet?: string;
}
export interface GetColaboradorPosto {
  numEmp?: number;
  estPos?: number;
  posTra?: string;
  dados?: Colaborador[];
  msgRet?: string;
  responseCode?: number;
}
