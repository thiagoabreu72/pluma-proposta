import { Component, OnInit } from '@angular/core';
import { Mensagem } from './interfaces/gerais.interface';
import { ServiceBpmService } from './services/service-bpm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  carregando!: boolean;
  dadosMensagem: Mensagem = { tipo: 0 };
  minhaHora!: string;
  ngOnInit(): void {
    this.carregando = true;
  }

  constructor(private service: ServiceBpmService) {
    service.mensagem$.subscribe({
      next: (retorno) => {
        this.getDadosMensagem(retorno);
      },
    });
  }

  getValorSpinner(valor: boolean) {
    this.carregando = valor;
  }

  getDadosMensagem(dados: Mensagem) {
    this.dadosMensagem = dados;
  }
}
