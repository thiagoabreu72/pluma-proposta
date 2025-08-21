import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { MensagemComponent } from './mensagem/mensagem.component';
import { QuadroComponent } from './quadro/quadro.component';
import { TabelaMensalComponent } from './tabela-mensal/tabela-mensal.component';

//PRIMENG
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PosFaltaComponent } from './pos-falta/pos-falta.component';
import { TabelaComponent } from './tabela/tabela.component';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';

import { HoraComponent } from './hora/hora.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { DataComponent } from './data/data.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    MensagemComponent,
    PosFaltaComponent,
    TabelaComponent,
    QuadroComponent,
    TabelaMensalComponent,
    HoraComponent,
    ColaboradoresComponent,
    DataComponent,
  ],
  imports: [
    AccordionModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ChartModule,
    DividerModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    ImageModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    RadioButtonModule,
    ReactiveFormsModule,
    SelectButtonModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ProgressSpinnerModule,
    DialogModule,
    PanelModule,
  ],

  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
