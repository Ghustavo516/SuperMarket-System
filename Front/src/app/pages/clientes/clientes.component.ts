import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent{

  clienteSource: any;
  URL: string = "http://localhost:8080/api";

  constructor(private clienteService: ClientesService) {
    //Realiza o processo de crud dentro do DataGrid
    this.clienteSource = new CustomStore({
      key: 'id',
      // Carrega os valores de todos os clientes cadastrados
      load: () => this.clienteService.loadClientes(this.URL),
      // Insere dados de novos clientes
      insert: (values) => this.clienteService.insertCliente(this.URL, values),
      // Atualiza os valores do cliente
      update: (key, values) => this.clienteService.updateCliente(this.URL, key, values),
      // Remove o cliente
      remove: (key) => this.clienteService.removeCliente(this.URL, key),
    });
  }
}

@NgModule({
  declarations: [ClientesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DxDataGridModule
  ],
  exports: [ClientesComponent]
})
export class ClientesModule { }
