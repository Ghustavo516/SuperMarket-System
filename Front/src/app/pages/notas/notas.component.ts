import { ItensNotaService } from './../../shared/services/itens-nota.service';
import { ProdutosService } from './../../shared/services/produtos.service';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxSelectBoxModule, DxToastModule } from 'devextreme-angular';
import { NotasService } from 'src/app/shared/services/notas.service';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Nota } from 'src/app/model/nota';
import { Cliente } from 'src/app/model/cliente';
import { Produto } from 'src/app/model/produto';
import { ItensNota } from 'src/app/model/itens';

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
  itensSource: any[] = [];

  valueItemSelectJSON : any;//Armazena o valor completo em JSON daquele item

  URL: string = "http://localhost:8080/api";

  clienteSelecionadoEvent: any;
  selectClientDefaultName: any;

  produtoSelecionadoEvent: any;
  selectProdutoDefaultName: any;

  createModeForm: boolean = false;

  constructor(
    private notasService: NotasService,
    private clienteService: ClientesService,
    private produtoService: ProdutosService,
    private itensService: ItensNotaService) {
  }

  ngOnInit(): void {
    this.loadDataNotas();
    this.loadDataCliente();
    this.loadDataProducts();
  }

  setModeCreate(value: boolean){
    this.createModeForm = value

  }

  //CRUD DataGrid Nota -----------------------------------
  loadDataNotas(){
    //Carrega todos os valores da nota
    this.notasService.loadNotas(this.URL).subscribe((notas) => {
      this.notaSource = notas;
    })
  }

  insertDataNota(event:any){
    //Inseri novos valores
    const dado = event.data;
    dado.cliente = this.clienteSelecionadoEvent; //Inseri o nome do cliente
    this.notasService.insertNota(this.URL, dado).subscribe(() => {
      this.loadDataNotas();
    })
  }

  updateDataNota(event: any){
    //Atualiza valores de notas
    const updateData = event.data;
    const id = event.key.id;
    event.data.cliente = this.clienteSelecionadoEvent; //Inseri o nome do cliente

    // Calcule a soma total dos valores 'valorTotal' dos itens
    const somaTotalItens = updateData.itens.reduce((total:number, item:any) => {
      return total + item.valorTotal;
    }, 0);

    console.log(somaTotalItens);
    updateData.totalNota = somaTotalItens;
    console.log(updateData)

    this.notasService.updateNota(this.URL, id, updateData).subscribe(() => {
      this.loadDataNotas();
    })
  }

  deleteDataNota(event:any){
    //Deleta valores de notas
    console.log("Deletando")
    console.log(event)
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
    const nameUserSearching = e.data.cliente;
    this.clienteSelecionadoEvent = nameUserSearching;
    const valueIndex = this.clientesSource.findIndex((cliente) => cliente.nome === nameUserSearching.nome);
    this.selectClientDefaultName = this.clientesSource[valueIndex]
    this.valueItemSelectJSON = e //Armazena Json completo de itens para ser manipulado futuramente
  }

  //CRUD datagrid itens ----------------------------
  insertDataItens(event: any){
    const itens = event.data;
    itens.produto = this.produtoSelecionadoEvent //Adiciona o valores de produtos
    itens.nota = {id: event.data.nota}//Formata a estrutura de nota

    const ValorAtualizado =  this.updateValorTotalEachItens(itens); //Atualiza o valor total

    this.itensService.insertItensNota(this.URL, ValorAtualizado).subscribe(() => {
      this.loadDataNotas();
      //Rever o conceito se deve ser loadNota ou loadItens para melhor funcionamento
    })
  }

  updateDataItens(event: any){
    const updateItens = event.data;
    const id = event.key.id;
    updateItens.produto = this.produtoSelecionadoEvent //Adiciona o valor de produto
    updateItens.nota = {id: event.data.nota} //Formata a estrutura de nota

    const ValorAtualizado =  this.updateValorTotalEachItens(updateItens); //Atualiza o valor total

    this.itensService.updateItensNota(this.URL, id, ValorAtualizado).subscribe(() => {
        this.loadDataNotas();
    });
  }

  updateValorTotalEachItens(updateItens: any){
    //Atualiza o valor total de nota
    const quantidadeProdutos = updateItens.quantProdutos;
    const valorUnitario = updateItens.produto.valorUnitario;
    updateItens.valorTotal = valorUnitario * quantidadeProdutos;

    this.updateDataNota(this.valueItemSelectJSON)
    return updateItens;
  }

  deleteDataItens(event: any){
    const id = event.data.id;
    this.itensService.deleteItensNota(this.URL, id).subscribe(() => {
      this.loadDataNotas();
    },
    (error) => {
      if (error.status !== 200) {
        console.error('Erro durante a exclusão:', error);
      }
    })
  }

  showNameProduct(nameProduct: any){
    //Exibe o nome de produtos na coluna de produtos
    if(nameProduct.value && nameProduct.value.descricao){
      return nameProduct.value.descricao;
    }
  }

  nameProductChanged(productName: any){
    this.produtoSelecionadoEvent = productName.value;
  }

  editingProduct(product: any){
    const productNameSearching = product.data.produto;
    this.produtoSelecionadoEvent = productNameSearching

    const valueIndex = this.produtoSource.findIndex((produto) => produto.descricao === productNameSearching.descricao);
    this.selectProdutoDefaultName = this.produtoSource[valueIndex]
  }
}

@NgModule({
  declarations: [NotasComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxToastModule

  ],
  exports: [NotasComponent]
})
export class NotasModule { }
