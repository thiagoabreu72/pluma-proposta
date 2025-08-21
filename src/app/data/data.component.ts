import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  // @Input() valor!: string; // valor inicial em "DD/MM/YYYY"

  private _valor: string = '';

  @Input() set valor(val: string) {
    if (val) {
      if (val == '0') val = '01/01/2025';
      this._valor = val;
      this.texto = this.formatarData(val.replace(/\D/g, ''));
    }
  }
  get valor() {
    return this._valor;
  }
  @Output() valorAlterado = new EventEmitter<string>(); // emite "DD/MM/YYYY"

  placeholder = 'DD/MM/YYYY';
  texto = '';
  anoAtual = new Date().getFullYear();

  ngOnInit(): void {
    if (this.valor) {
      this.texto = this.formatarData(this.valor.replace(/\D/g, ''));
    }
  }

  /** Formata e valida a data */
  private formatarData(value: string): string {
    let v = value.replace(/\D/g, '').substring(0, 8); // só números, até 8 dígitos
    let result = '';

    let dia = '';
    let mes = '';
    let ano = '';

    if (v.length >= 2) {
      dia = v.substring(0, 2);
      // valida dia
      let d = parseInt(dia, 10);
      if (d > 31) d = 31;
      dia = d.toString().padStart(2, '0');
    } else {
      dia = v;
    }

    if (v.length >= 4) {
      mes = v.substring(2, 4);
      // valida mês
      let m = parseInt(mes, 10);
      if (m > 12) m = 12;
      mes = m.toString().padStart(2, '0');
    } else if (v.length > 2) {
      mes = v.substring(2);
    }

    if (v.length > 4) {
      ano = v.substring(4);
    }

    // === ANO ===
    if (v.length > 4) {
      ano = v.substring(4);

      if (ano.length === 4) {
        let a = parseInt(ano, 10);
        if (a < this.anoAtual) {
          a = this.anoAtual;
        }
        ano = a.toString();
      }
    }

    // monta com separadores
    result = dia;
    if (mes) result += '/' + mes;
    if (ano) result += '/' + ano;

    return result;
  }

  /** Enquanto digita */
  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.texto = this.formatarData(input.value);
    input.value = this.texto;
  }

  /** Normaliza ao sair */
  onBlur() {
    if (!this.texto) {
      this.valorAlterado.emit('');
      return;
    }

    this.texto = this.formatarData(this.texto);

    this.valorAlterado.emit(this.texto); // emite DD/MM/YYYY
  }

  /** Seleciona todo o valor ao focar */
  onFocus(e: Event) {
    (e.target as HTMLInputElement).select();
  }
}
