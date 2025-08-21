import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dados } from '../interfaces/formulario.interface';
import { ServiceBpmService } from '../services/service-bpm.service';
import { Mensagem } from '../interfaces/gerais.interface';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.scss'],
})
export class QuadroComponent implements OnInit {
  @Input() formulario: Dados = {};
  @Output() formularioAlterado = new EventEmitter<Dados>();
  @Output() enviaMensagem = new EventEmitter<Mensagem>();

  mensagemQuadro: Mensagem = { tipo: 0 };
  dadosTabela: any[] = [];
  quadroData: any[] = [];
  he05Data: any[] = [];
  he08Data: any[] = [];
  he10Data: any[] = [];

  constructor(private servico: ServiceBpmService) {
    // this.separarTabelas();
  }

  ngOnInit(): void {
    console.log(this.formulario);
    this.dadosTabela.push(this.formulario);
    this.separarTabelas();
  }

  enviarDados() {
    this.formularioAlterado.emit(this.formulario);
    this.mensagemQuadro = {
      tipo: 1,
      mensagem: 'Dados gravados com sucesso!',
    };
    this.enviaMensagem.emit(this.mensagemQuadro);
  }

  separarTabelas() {
    this.quadroData = this.mapCampos('Quadro');
    this.he05Data = this.mapCampos('HE05');
    this.he08Data = this.mapCampos('HE08');
    this.he10Data = this.mapCampos('HE10');
  }

  private mapCampos(prefixo: string) {
    return this.dadosTabela.map((item) => {
      const filtrado: any = {
        numEmp: item.numEmp,
        codCen: item.codCen,
      };

      Object.keys(item).forEach((key) => {
        if (key.startsWith(prefixo)) {
          filtrado[key] = item[key as keyof Dados];
        }
      });

      return filtrado;
    });
  }
}
