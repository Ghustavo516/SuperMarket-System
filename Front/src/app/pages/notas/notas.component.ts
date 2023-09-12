import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { NotasService } from 'src/app/shared/services/notas.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Nota } from 'src/app/model/nota';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit{

  notaSource: Nota[] = [];
  clientesSource: Cliente[] = [];

  editNomeSelectBoxDefault?: string

  URL: string = "http://localhost:8080/api";

  teste: any[] = ['teste', 'teste']

  clienteSelecionadoEvent: any;
  selectClientDefaultName: any;

  constructor(
    private notasService: NotasService,
    private clienteService: ClientesService) {
  }

  ngOnInit(): void {
    this.loadDataNotas();
    this.populaCliente();
  }

  loadDataNotas(){
    //Carrega todos os valores da nota
    this.notasService.loadNotas(this.URL).subscribe((notas) => {
      this.notaSource = notas;
    })
  }

  insertDataNota(event:any){
    //Inseri novos valores
    const dado = event.data;
    this.notasService.insertNota(this.URL, dado).subscribe(() => {
      this.loadDataNotas();
    })
  }

  updateDataNota(event: any){
    //Atualiza valores de notas
    console.log("Atualizando")
    const updateData = event.data;
    const id = event.key.id;

    //Altera o nome do cliente com o valor substituido
    event.data.cliente = this.clienteSelecionadoEvent;

    this.notasService.updateNota(this.URL, id, updateData).subscribe(() => {
      this.loadDataNotas();
    })
  }

  deleteDataNota(event:any){
    //Deleta valores de notas
    console.log("Deletando")
    const id = event.key.id;
    this.notasService.deleteNota(this.URL, id).subscribe(() => {
      this.loadDataNotas();
    })
  }

  populaCliente(){
    //Carrega os todos os nome cadastrados de clientes para ser utilizado durante o processo de CRUD
    this.clienteService.loadClienteSelectBox(this.URL).subscribe((cliente) => {
      this.clientesSource = cliente;
    })
  }

  nameChangeClient(event: any){
    //Armazena o valor selecionado com o dado do cliente, quando evento acionado
    this.clienteSelecionadoEvent = event.value;
  }

  showNameUser(nameClient: any){
    if(nameClient.value && nameClient.value.nome){
      return nameClient.value.nome;
    }
  }

  editingProcess(e:any){
    const nameUserSearching = e.data.cliente.nome;

    const valueIndex = this.clientesSource.findIndex((cliente) => cliente.nome === nameUserSearching);
    this.selectClientDefaultName = this.clientesSource[valueIndex]
  }
}

@NgModule({
  declarations: [NotasComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSelectBoxModule

  ],
  exports: [NotasComponent]
})
export class NotasModule { }
