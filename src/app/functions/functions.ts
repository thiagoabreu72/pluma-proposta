import { Contador } from '../interfaces/gerais.interface';
import { Afastamento, Anotacao } from '../interfaces/historicos.interface';

export function converteUrl(
  url: string,
  porta: any,
  modulo: string,
  contexto: string
) {
  let novaUrl: string[] = url.split('/');
  let servico = novaUrl[4].replace(`${modulo}_Sync`, '').replace(`?wsdl`, '');
  let urlFinal = `${novaUrl[0]}//${novaUrl[2]}/${contexto}/G5Rest?server=${novaUrl[0]}//${novaUrl[2]}&module=${modulo}&service=${servico}&port=${porta}`;
  //console.log(urlFinal);
  return urlFinal;
}

export function formatarData(
  data: Date,
  decrementar?: number,
  incrementar?: number
): string {
  const dia = data.getDate();
  const mes = data.getMonth() + 1; // Janeiro é 0, então é necessário adicionar 1
  let ano = data.getFullYear();

  // Formatar dia e mês para terem dois dígitos
  const diaFormatado = dia < 10 ? `0${dia}` : `${dia}`;
  const mesFormatado = mes < 10 ? `0${mes}` : `${mes}`;

  if (decrementar !== undefined) {
    ano = ano - decrementar;
  }

  if (incrementar !== undefined) {
    ano = ano + incrementar;
  }

  return `${diaFormatado}/${mesFormatado}/${ano}`;
}

export function formatarDataCalendario(data: string) {
  const date = new Date(data);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

interface AfastamentosAgrupados {
  [key: string]: Afastamento[];
}

interface AnotacoesAgrupadas {
  [key: string]: Anotacao[];
}

export function montarDadosGraficosVertical(
  info: Afastamento[] | Anotacao[],
  tipo: 'Afa' | 'Ano'
): AfastamentosAgrupados | undefined {
  let retorno: AfastamentosAgrupados | undefined;

  if (tipo === 'Afa') {
    retorno = (info as Afastamento[]).reduce(
      (agrupados: AfastamentosAgrupados, afastamento: Afastamento) => {
        // Extrai o mês e o ano da data
        const [dia, mes, ano] = afastamento.datAfa!.split('/');
        const chave = `${mes}/${ano}`;

        // Se a chave ainda não existir no objeto agrupado, cria um array vazio
        if (!agrupados[chave]) {
          agrupados[chave] = [];
        }

        // Adiciona o afastamento ao grupo correspondente
        agrupados[chave].push(afastamento);

        return agrupados;
      },
      {} as AfastamentosAgrupados
    );
  } else if (tipo === 'Ano') {
    retorno = (info as Anotacao[]).reduce(
      (agrupados: AnotacoesAgrupadas, anotacao: Anotacao) => {
        // Extrai o mês e o ano da data
        const [dia, mes, ano] = anotacao.datNot!.split('/');
        const chave = `${mes}/${ano}`;

        // Se a chave ainda não existir no objeto agrupado, cria um array vazio
        if (!agrupados[chave]) {
          agrupados[chave] = [];
        }

        // Adiciona a anotação ao grupo correspondente
        agrupados[chave].push(anotacao);

        return agrupados;
      },
      {} as AnotacoesAgrupadas
    );
  }

  return retorno;
}

interface Resultado {
  competencias: string[];
  situacoes: Contador[];
}

export function agruparSituacoesPorCompetencia(
  situacoes: Contador[]
): Resultado {
  const agrupado: { [key: string]: Contador[] } = {};

  situacoes.forEach((situacao) => {
    const chave = situacao.competencia!;

    if (!agrupado[chave]) {
      agrupado[chave] = [];
    }

    const situacaoExistente = agrupado[chave].find(
      (s) => s.codigo === situacao.codigo
    );

    if (situacaoExistente) {
      // Soma a quantidade se a situação com o mesmo código já existir
      situacaoExistente.quantidade += situacao.quantidade;
    } else {
      // Caso contrário, adiciona a nova situação ao grupo
      agrupado[chave].push({ ...situacao });
    }
  });

  // Obtem todas as competências
  const competencias = Object.keys(agrupado);

  // Concatena todas as situações agrupadas
  const situacoesAgrupadas = competencias.flatMap((comp) => agrupado[comp]);

  return { competencias, situacoes: situacoesAgrupadas };
}
