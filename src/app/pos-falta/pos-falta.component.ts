import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Anotacao } from '../interfaces/anotacao.interface';
import { MotivoAnotacao } from '../interfaces/motivo.inteface';

@Component({
  selector: 'app-pos-falta',
  templateUrl: './pos-falta.component.html',
  styleUrls: ['./pos-falta.component.scss'],
})
export class PosFaltaComponent {
  @Input() formulario!: Anotacao;
  @Input() motivos!: MotivoAnotacao[];
  @Output() anotacao = new EventEmitter<Anotacao>();

  motivoSelecionado!: MotivoAnotacao;
  dataAlteracao: string = '';

  gravarDados() {
    // console.log(this.motivoSelecionado);
    this.formulario.motJus = this.motivoSelecionado.codMot;
    this.formulario.tipOpe = 'A';
    this.anotacao.emit(this.formulario);
  }
}
