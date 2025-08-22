import { Colaborador } from './colaborador.interface';

export interface Formulario {
  nome_gestor?: string;
  usuario_gestor?: string;
  email_gestor?: string;
  nome_rh?: string;
  usuario_rh?: string;
  email_rh?: string;
  nome_solicitante?: string;
  usuario_solicitante?: string;
  email_solicitante?: string;
  dados?: Dados[] | any;
  tipo_acao?: string;
}

export interface Dados {
  numEmp?: number;
  nomEmp?: string;
  tipCol?: number;
  nomFun?: string;
  codCen?: number;
  estPos?: number;
  posTra?: string;
  numCad?: number;
  desPos?: string;
  anoOrc?: number;
  codPlv?: number;
  DatAlt1?: string;
  DatAlt2?: string;
  PerAlt1?: number;
  PerAlt2?: number;
  estCar?: number;
  codCar?: number;
  valSal?: number;
  responseCode?: number;
  outputData?: any;
  validado?: boolean;
  dados?: Colaborador[];
}
