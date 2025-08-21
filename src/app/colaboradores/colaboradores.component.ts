import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceBpmService } from '../services/service-bpm.service';
import { Dados } from '../interfaces/formulario.interface';
import {
  Colaborador,
  GetColaboradorPosto,
} from '../interfaces/colaborador.interface';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss'],
})
export class ColaboradoresComponent implements OnInit {
  @Input() dados: Dados = {};
  dadosTabela: Colaborador[] | any[] = [];
  @Output() carregando = new EventEmitter<boolean>();
  constructor(private service: ServiceBpmService) {}

  ngOnInit(): void {
    this.carregando.emit(true);
    this.service.getColaboradoresPosto(this.dados).subscribe((res) => {
      if (Array.isArray(res.outputData.dados)) {
        this.dadosTabela = res.outputData.dados;
      } else {
        this.dadosTabela = [res.outputData.dados];
      }
      this.carregando.emit(false);
    });
  }
}
