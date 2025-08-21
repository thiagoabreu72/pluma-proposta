import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.scss'],
})
export class HoraComponent implements OnInit {
  @Input() valores!: number; // minutos
  @Output() valoresAlterados = new EventEmitter<number>();

  placeholder = 'HH:MM';
  desabilitar = false;
  valor = ''; // exibido no input

  ngOnInit(): void {
    this.valor = this.formatarMinutos(this.valores);
  }

  /** Formata minutos para HH:mm */
  private formatarMinutos(minutos: number): string {
    if (!minutos && minutos !== 0) return '';
    let h = Math.floor(minutos / 60);
    let m = minutos % 60;

    // limite de 9999:59
    if (h > 9999) h = 9999;
    if (m > 59) m = 59;

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  /** Converte HH:mm em minutos */
  private converterParaMinutos(valor: string): number {
    const partes = valor.split(':');
    if (partes.length !== 2) return 0;
    let h = parseInt(partes[0], 10) || 0;
    let m = parseInt(partes[1], 10) || 0;

    // valida limites
    if (h > 9999) h = 9999;
    if (m > 59) m = 59;

    return h * 60 + m;
  }

  /** Máscara enquanto digita */
  onInput(e: Event) {
    let value = (e.target as HTMLInputElement).value.replace(/\D/g, ''); // só números

    // permite apagar tudo
    if (value.length === 0) {
      this.valor = '';
      return;
    }

    // máximo 6 dígitos (até 999959 -> 9999:59)
    if (value.length > 6) {
      value = value.substring(0, 6);
    }

    // formatação dinâmica — só coloca ":" se houver ao menos 3 dígitos
    if (value.length > 2) {
      this.valor = `${value.substring(0, value.length - 2)}:${value.substring(value.length - 2)}`;
    } else {
      this.valor = value; // deixa o usuário apagar até zerar
    }

    (e.target as HTMLInputElement).value = this.valor;
  }

  /** Ao perder o foco, normaliza o valor */
  onBlur() {
    if (!this.valor) {
      this.valoresAlterados.emit(0);
      return;
    }

    const minutos = this.converterParaMinutos(this.valor);
    this.valor = this.formatarMinutos(minutos);
    this.valoresAlterados.emit(minutos);
  }

  /** Seleciona todo o valor ao focar */
  onFocus(e: Event) {
    (e.target as HTMLInputElement).select();
  }
}
