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

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit{
  //Classe das tabelas banco de dados

  notaSource: Nota[] = [];
  clientesSource: Cliente[] = [];
  produtoSource: Produto[] = [];
  itensSource: any[] = [];

  URL: string = "http://localhost:8080/api"; //URL base para as requisições

  valueObjectNota : any;//Armazena o valor completo em JSON daquele item
  valueObjectItem: any;

  //Armazena o valor de cliente/produto e define valor default aos selectBox
  clienteSelecionadoEvent: any;
  selectClientDefaultName: any;
  produtoSelecionadoEvent: any;
  selectProdutoDefaultName: any;

  createModeForm: boolean = false; //Mode de criar nova nota

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

  setModeCreate(value: boolean){ //Define o estado do template que será exidido ao abrir o popup de edição modo normal/criar
    this.createModeForm = value
    this.updateDataNota(this.valueObjectNota)//Atualiza a nota com o valor atualiado
  }

  //DATAGRID NOTAS --------------------------------------------------------------
  loadDataNotas(){ //Carrega todas as notas
    this.notasService.loadNotas(this.URL).subscribe((notas) => {
      this.notaSource = notas;
    });
  }

  insertDataNota(event:any){ //Insere novas notas
    const dado = event.data;
    dado.cliente = this.clienteSelecionadoEvent; //Inseri o nome do cliente
    this.notasService.insertNota(this.URL, dado).subscribe(() => {
      this.loadDataNotas();
    });
  }

  updateDataNota(event: any){//Atualiza valores de notas
    const updateData = event.data;
    const id = event.key.id;
    updateData.cliente = this.clienteSelecionadoEvent; //Inseri o nome do cliente

    // Calcula a soma total de cada itens dentro da nota
    const somaTotalItens = updateData.itens.reduce((total:number, item:any) => {
      return total + item.valorTotal;
    }, 0);

    updateData.totalNota = somaTotalItens; //Atualiza o valorTotal com o valor atualizado

    //Remove o {"id": numeroId} do atributo nota
    for(let checkIdItens of updateData.itens){
      if(checkIdItens.nota.hasOwnProperty('id')){
        checkIdItens.nota = parseInt(checkIdItens.nota.id)
      }
    }

    this.notasService.updateNota(this.URL, id, updateData).subscribe(() => {
      this.loadDataNotas();
    });
  }

  deleteDataNota(event:any){ //Deleta valores de notas
    const id = event.key.id;
    this.notasService.deleteNota(this.URL, id).subscribe(() => {this.loadDataNotas();})
  }

  loadDataCliente(){ //Carrega todos os clientes cadastrados no banco de dados
    this.clienteService.loadClienteSelectBox(this.URL).subscribe((cliente) => {
      this.clientesSource = cliente;
    });
  }

  nameChangeClient(event: any){ //Armazena o valor selecionado com o dado do cliente, quando evento acionado
    this.clienteSelecionadoEvent = event.value;
  }

  showNameUser(nameClient: any){ //Exibe o nome do cliente na coluna de clientes
    if(nameClient.value && nameClient.value.nome){
      return nameClient.value.nome;
    }
  }

  editingProcess(e:any){ //Evento quando clica no botão de edição
    const nameUserSearching = e.data.cliente;
    this.clienteSelecionadoEvent = nameUserSearching;
    e.data.numeroNota = e.data.id;
    const valueIndex = this.clientesSource.findIndex((cliente) => cliente.nome === nameUserSearching.nome);
    this.selectClientDefaultName = this.clientesSource[valueIndex];
    this.valueObjectNota = e;
    this.valueObjectItem = e.data; //Armazena o valor do id da nota para preencher automaticamente
  }

  loadDataProducts(){ //Carrega todos os produtos cadastrados no banco de dados
    this.produtoService.loadProdutosSelectBox(this.URL).subscribe((produto) => {
      this.produtoSource = produto;
    });
  }

  //DATAGRID ITENS -----------------------------------------------------------------------------------
  insertDataItens(event: any){
    console.log(event)
    const itens = event.data;
    itens.produto = this.produtoSelecionadoEvent //Adiciona o valores de produtos

    if(!itens.nota.hasOwnProperty('id')){
      itens.nota = {id: parseInt(event.data.nota)} //Formata a estrutura de nota
    }
    const ValorAtualizado =  this.updateValorTotalEachItens(itens); //Atualiza o valor total
    this.itensService.insertItensNota(this.URL, ValorAtualizado).subscribe(() => {
      this.loadDataNotas();
    });
  }

  updateDataItens(event: any, data:any){

    const updateItens = event.data;
    const id = event.key.id;
    updateItens.produto = this.produtoSelecionadoEvent //Adiciona o valor de produto

    if(!updateItens.nota.hasOwnProperty('id')){
      updateItens.nota = {id: parseInt(event.data.nota)} //Formata a estrutura de nota
    }

    const ValorAtualizado =  this.updateValorTotalEachItens(updateItens); //Atualiza o valor total do itens editado

    this.itensService.updateItensNota(this.URL, id, ValorAtualizado).subscribe(() => {
        this.loadDataNotas();
    });

    this.updateDataNota(this.valueObjectNota)//Atualiza a nota com o valor atualiado
  }

  updateValorTotalEachItens(updateItens: any){ //Atualiza o valor total do item
    const quantidadeProdutos = updateItens.quantProdutos;
    const valorUnitario = updateItens.produto.valorUnitario;
    updateItens.valorTotal = valorUnitario * quantidadeProdutos;
    //this.updateDataNota(this.valueItemSelectJSON) //Funcionalidade para atualizar o valor total ao alterar o valor de cada itens
    return updateItens;
  }

  deleteDataItens(event: any){ //Deleta o item da nota
    const id = event.data.id;
    this.itensService.deleteItensNota(this.URL, id).subscribe(() => {
      this.loadDataNotas();
    },
    (error) => {
      if (error.status !== 200) {
        console.error('Erro durante a exclusão:', error);
      }
    });
  }

  setIdNumberNota(event:any){
    event.data.nota = this.valueObjectItem.id;

    const maiorItensSequenciais = this.valueObjectItem.itens.reduce((maior:any, item:any) =>
    item.itensSequenciais > maior ? item.itensSequenciais : maior, -Infinity);

    event.data.itensSequenciais = (maiorItensSequenciais + 1)
  }

  showNameProduct(nameProduct: any){ //Exibe o nome de produtos na coluna de produtos
    if(nameProduct.value && nameProduct.value.descricao){
      return nameProduct.value.descricao;
    }
  }

  nameProductChanged(productName: any){ //Armazena o nome do produto, quando alterado o selectBox
    this.produtoSelecionadoEvent = productName.value;
  }

  editingProduct(product: any){ //Obtem o nome de produto e popula o selectBox com valor default durant edição
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
