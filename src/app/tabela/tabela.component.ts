import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mensagem } from '../interfaces/gerais.interface';
import { ServiceBpmService } from '../services/service-bpm.service';
import { Anotacao } from '../interfaces/anotacao.interface';
import { MotivoAnotacao } from '../interfaces/motivo.inteface';
import { Dados, Formulario } from '../interfaces/formulario.interface';

interface tipo {
  tipo: 'Salvar Rascunho' | 'Seguir Processo';
}

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})
export class TabelaComponent {
  @Input() dados: any[] = [];
  @Output() enviaMensagem = new EventEmitter<Mensagem>();
  @Output() habilitaSpinner = new EventEmitter<boolean>();
  carregando: boolean = false;
  habilitarQuadro: boolean = false;
  habilitarColaborador: boolean = false;
  exibirTabela: boolean = true;
  mensagem: Mensagem = { tipo: 0 };
  anotacoes: Anotacao[] | any[] = [];
  anotacaoSelecionada!: Anotacao;
  motivos: MotivoAnotacao[] = [];
  nome: string = '';
  dadosFormulario: Formulario = {};
  dadosTabela: Dados[] = [];
  dadosTabelaFiltro: Dados[] | any[] = [];
  dadoSelecionado!: Dados;
  opcao: tipo[] = [{ tipo: 'Salvar Rascunho' }, { tipo: 'Seguir Processo' }];
  opcaoSelecionada!: tipo;
  habilitarDados: boolean = false;

  constructor(private servico: ServiceBpmService) {
    // this.carregando = true;
    servico.dados$.subscribe({
      next: (retorno) => {
        this.dadosFormulario = retorno;
        this.dadosTabela = this.dadosFormulario.dados;
        if (
          this.dadosFormulario.tipo_acao == 'Salvar Rascunho' ||
          this.dadosFormulario.tipo_acao == 'Seguir Processo'
        ) {
          this.opcaoSelecionada = { tipo: this.dadosFormulario.tipo_acao };
        }

        if (typeof this.dadosTabela === 'string') {
          this.dadosTabela = JSON.parse(this.dadosTabela);
          this.dadosTabelaFiltro = this.dadosTabela.map((item) => {
            return {
              numEmp: item.numEmp,
              codCen: item.codCen,
              estPos: item.estPos,
              posTra: item.posTra,
              numCad: item.numCad,
              desPos: item.desPos,
              valSal: item.valSal,
              Quadro01: item.Quadro01,
            };
          });
        } else if (Array.isArray(this.dadosTabela)) {
          this.dadosTabelaFiltro = this.dadosTabela.map((item) => {
            return {
              numEmp: item.numEmp,
              codCen: item.codCen,
              estPos: item.estPos,
              posTra: item.posTra,
              numCad: item.numCad,
              desPos: item.desPos,
              valSal: item.valSal,
              Quadro01: item.Quadro01,
            };
          });
        }
        setTimeout(() => {
          this.carregando = false;
        }, 1000);
      },
      error: (error) => {
        this.carregando = false;
        this.mensagem = {
          tipo: 4,
          mensagem: 'Não foi possível obter dados. Verifique a conexão.',
        };
        this.enviaMensagem.emit(this.mensagem);
      },
    });
  }

  mudaCor(status: string): string {
    switch (status) {
      case '':
        return 'status-definicao';
      case 'Pendente':
        return 'status-andamento';
      case 'Concluído':
        return 'status-concluida';
      default:
        return '';
    }
  }

  obterStatusCarregando(status: boolean) {
    this.carregando = status;
  }

  obterSelecao(dado: Dados) {
    this.dadoSelecionado = this.dadosTabela.filter(
      (item) =>
        item.numCad === dado.numCad &&
        item.numEmp === dado.numEmp &&
        item.codCen === dado.codCen &&
        item.posTra === dado.posTra
    )[0];
    this.dadoSelecionado.valSal = dado.valSal;
  }

  // gravar dados
  obterTipo(opcao: tipo) {
    this.opcaoSelecionada = opcao;
    this.dadosFormulario.tipo_acao = opcao.tipo;
    this.enviarDados();
  }

  showDialog(tipo: string) {
    if (tipo === 'quadro') {
      this.habilitarQuadro = true;
    } else if (tipo === 'colaborador') {
      this.carregando = true;
      this.habilitarColaborador = true;
    }
  }

  fecharDialogQuadro(valor: boolean) {
    this.habilitarQuadro = !valor;
    this.habilitarColaborador = !valor;
    this.dadoSelecionado = {};
  }

  receberDadosTabela(dados: any) {
    this.enviarDados();
  }

  getValorSpinner(valor: boolean) {
    this.habilitaSpinner.emit(valor);
  }

  enviarDados() {
    this.dadosFormulario.dados = this.dadosTabela;
    this.servico.dadosFormulario = this.dadosFormulario;
    this.dados = [];
  }

  getMensagem(dados: Mensagem) {
    this.enviaMensagem.emit(dados);
    setTimeout(() => {
      this.mensagem = { tipo: 0 };
    }, 3000);
  }
}
