import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabela-mensal',
  templateUrl: './tabela-mensal.component.html',
  styleUrls: ['./tabela-mensal.component.scss'],
})
export class TabelaMensalComponent {
  @Input() titulo!: string;
  @Input() prefixo!: string;
  @Input() dados: any[] = [];

  meses = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  // tempoEmMinutos = 150; // 2h30min

  onTempoAlterado(minutos: number, row: any, i: number) {
    // atualiza a célula correta
    row[this.getCampo(i)] = minutos;
  }

  getCampo(index: number) {
    // Prefixos tipo HE050 precisam manter zeros
    return `${this.prefixo}${(index + 1).toString().padStart(2, '0')}`;
  }
}
