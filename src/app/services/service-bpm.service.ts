import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mensagem } from '../interfaces/gerais.interface';
import { Data, Info, ProcessVariables } from '../interfaces/workflow.interface';
import { user } from '@seniorsistemas/senior-platform-data';
import { Token } from '../interfaces/token.interface';
import { Dados, Formulario } from '../interfaces/formulario.interface';
import { DadosUsuario } from '../interfaces/dados-usuario.interface';
import { GetColaboradorPosto } from '../interfaces/colaborador.interface';

declare var workflowCockpit: any;

@Injectable({
  providedIn: 'root',
})
export class ServiceBpmService {
  // Declara variáveis para montagem da url
  private urlSenior: string = '';
  usuario: string = '';
  dadosFormulario: Formulario = { dados: [] };

  private getDados = new Subject<Formulario | any>(); // Criação do canal de comunicação.
  dados$ = this.getDados.asObservable(); // instanciando o Observable para mudanças no valor da variável

  private obterMensagem = new Subject<Mensagem>(); // Criação do canal de comunicação.
  mensagem$ = this.obterMensagem.asObservable(); // instanciando o Observable para mudanças no valor da variável

  private token!: Token;
  private capturaAcao = new Subject<Token>(); // Criação do canal de comunicação.
  acao$ = this.capturaAcao.asObservable(); // instanciando o Observable para mudanças no valor
  dadosMensagem: Mensagem = {};

  private idPlugin: string;
  private urlInvoke: string =
    'https://platform.senior.com.br/t/senior.com.br/bridge/1.0/rest/platform/conector/actions/invoke';

  private variaveisProcesso: ProcessVariables[] = [];
  private dadosUsuario: DadosUsuario = { email: '' };

  constructor(private http: HttpClient) {
    // cria meio de conexão entre a api do bpm e formulário
    new workflowCockpit({
      init: this._loadData,
      onSubmit: this._saveData,
      onError: this._rollback,
    });
    // Obter parâmetros da página index.
    const elemento: any = document.querySelector('app-root');
    this.idPlugin = elemento.getAttribute('idPlugin');
    this.urlSenior = elemento.getAttribute('urlG5');
  }

  // Funções do BPM
  private _saveData = async (_data: Data, _info: Info) => {
    const formElement = document.getElementById('formulario-inicio');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (this.getEtapa() === 'rh') {
      try {
        // Garante que dadosFormulario.dados seja objeto
        if (typeof this.dadosFormulario.dados === 'string') {
          this.dadosFormulario.dados = JSON.parse(this.dadosFormulario.dados);
        }

        // Define retorno base
        let retorno: Dados = { outputData: { responseCode: 400 } };

        switch (this.dadosFormulario.tipo_acao) {
          case 'Salvar Rascunho':
            retorno.outputData.responseCode = 201;
            break;
          case 'Seguir Processo':
            // Verifica pendências
            const temPendencia = this.dadosFormulario.dados.some(
              (item: any) => item.validado !== true
            );

            if (temPendencia) {
              const msg = 'Existem pendências no formulário. Verifique!';
              this.obterMensagem.next({ tipo: 4, mensagem: msg });
              throw new Error(msg);
            }
            retorno = await firstValueFrom(
              this.insereProposta(this.dadosFormulario)
            );
            break;
          case 'Retornar':
            this.dadosFormulario.dados = JSON.stringify(
              this.dadosFormulario.dados
            );
            return { formData: this.dadosFormulario };
        }

        // Avalia o retorno
        const code = retorno.outputData.responseCode;
        if ([200, 201].includes(code)) {
          if (code === 201) {
            this.obterMensagem.next({
              tipo: 1,
              mensagem: 'Gravado com sucesso!',
            });
          }
          this.dadosFormulario.dados = JSON.stringify(
            this.dadosFormulario.dados
          );
          return { formData: this.dadosFormulario };
        }

        // Caso não seja tratado acima → erro
        const msgErro = 'Não foi possível gravar o formulário. Verifique!';
        this.obterMensagem.next({ tipo: 4, mensagem: msgErro });
        throw new Error(msgErro);
      } catch (err) {
        throw err; // mantém propagação
      }
    } else {
      if (
        this.dadosFormulario.tipo_acao === 'Salvar Rascunho' ||
        this.dadosFormulario.tipo_acao === 'Seguir Processo'
      ) {
        if (typeof this.dadosFormulario.dados !== 'string') {
          this.dadosFormulario.dados = JSON.stringify(
            this.dadosFormulario.dados
          );
        }

        return { formData: this.dadosFormulario };
      } else {
        this.obterMensagem.next({
          tipo: 4,
          mensagem: 'Não foi selecionado a opção de escolha. Verifique!',
        });
        throw new Error('Não foi selecionado a opção de escolha.');
      }
    }
  };

  // Função _loadData é chamada ao abrir o formulário, carregando os dados das variáveis do fluxo.
  private _loadData = async (_data: Data, _info: Info): Promise<void> => {
    await _info.getInfoFromProcessVariables().then((dados) => {
      this.variaveisProcesso = dados;
      let variavel = new Map();

      for (let i = 0; i < this.variaveisProcesso.length; i++) {
        variavel.set(
          this.variaveisProcesso[i].key,
          this.variaveisProcesso[i].value
        );
      }

      this.dadosFormulario.nome_gestor = variavel.get('nome_gestor');
      this.dadosFormulario.usuario_gestor = variavel.get('usuario_gestor');
      this.dadosFormulario.nome_rh = variavel.get('nome_rh');
      this.dadosFormulario.usuario_rh = variavel.get('usuario_rh');
      this.dadosFormulario.nome_solicitante = variavel.get('nome_solicitante');
      this.dadosFormulario.usuario_solicitante = variavel.get(
        'usuario_solicitante'
      );
      this.dadosFormulario.dados = variavel.get('dados');
      this.dadosFormulario.tipo_acao = variavel.get('tipo_acao');
      console.log(this.dadosFormulario);

      // transformar em Array antes de encaminhar para o componente
      if (!Array.isArray(this.dadosFormulario.dados)) {
        this.dadosFormulario.dados = JSON.parse(this.dadosFormulario.dados);
      }

      _info.getPlatformData().then((dados) => {
        this.dadosUsuario.access_token = dados.token.access_token;
        this.getDados.next(this.dadosFormulario);
      });
    });
  };

  private _rollback = (_data: Data, _info: Info): any => {
    _data.error = 'erro ao carregar dados.';
  };

  insereProposta(parametros: Formulario): Observable<Dados> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${this.dadosUsuario.access_token}`,
    });
    let body = {};
    body = this.montarBody('insereProposta', parametros);
    return this.http.post<Dados>(this.urlInvoke, body, {
      headers,
    });
  }

  getColaboradoresPosto(
    parametros: Dados
  ): Observable<GetColaboradorPosto[] | any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `bearer ${this.dadosUsuario.access_token}`,
    });
    let body = {};
    body = this.montarBody('getColaboradoresPosto', parametros);
    return this.http.post<GetColaboradorPosto[] | any>(this.urlInvoke, body, {
      headers,
    });
  }

  getEtapa(): string | null {
    const match = window.location.href.match(/#!\/(.*?)\//);
    return match ? match[1] : 'impressao'; // Retorna o valor encontrado ou null se não houver correspondência
  }

  montarBody(port: string, inputData: any): any {
    return {
      inputData: {
        module: 'rubi',
        encryption: '0',
        server: this.urlSenior,
        service: 'com_prisma_hcm_bpm',
        rootObject: '',
        user: '',
        password: '',
        port,
        ...inputData, // Adiciona os parâmetros dinâmicos
      },
      id: this.idPlugin,
    };
  }
}
