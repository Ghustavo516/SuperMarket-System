import { ProdutosService } from './../../shared/services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { NotasService } from 'src/app/shared/services/notas.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Nota } from 'src/app/model/nota';
import { Cliente } from 'src/app/model/cliente';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit{

  //Dados do banco
  notaSource: Nota[] = [];
  clientesSource: Cliente[] = [];
  produtoSource: Produto[] = [];

  URL: string = "http://localhost:8080/api";

  clienteSelecionadoEvent: any;
  selectClientDefaultName: any;

  constructor(
    private notasService: NotasService,
    private clienteService: ClientesService,
    private produtoService: ProdutosService) {
  }

  ngOnInit(): void {
    this.loadDataNotas();
    this.loadDataCliente();
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

  loadDataCliente(){
    //Carrega todos os clientes cadastrados no banco de dados
    this.clienteService.loadClienteSelectBox(this.URL).subscribe((cliente) => {
      this.clientesSource = cliente;
    });
  }

  loadDataProducts(){
    //Carrega todos os produtos cadastrados no banco de dados
    this.produtoService.loadProdutosSelectBox(this.URL).subscribe((produto) => {
      this.produtoSource = produto;
    });
  }

  nameChangeClient(event: any){
    //Armazena o valor selecionado com o dado do cliente, quando evento acionado
    this.clienteSelecionadoEvent = event.value;
  }

  showNameUser(nameClient: any){
    //Exibe o nome do cliente na coluna de clientes
    if(nameClient.value && nameClient.value.nome){
      return nameClient.value.nome;
    }
  }

  editingProcess(e:any){//Evento quando clica no botão de edição
    //Seleciona o nome do cliente e ja seta como padrão dentro do popup com o nome do cliente ja preenchido
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
