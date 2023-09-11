import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular';
import { ProdutosService } from 'src/app/shared/services/produtos.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent {

  produtosSource: any;
  URL: string = "http://localhost:8080/api";

  constructor(private produtoService: ProdutosService){
    this.produtosSource = new CustomStore({
      key: 'id',
      // Carrega os valores de todos os clientes cadastrados
      load: () => this.produtoService.loadProdutos(this.URL),
      // Insere dados de novos clientes
      insert: (values) => this.produtoService.insertProdutos(this.URL, values),
  
      // Atualiza os valores do cliente
      update: (key, values) => this.produtoService.updateProdutos(this.URL, key, values),
      // Remove o cliente
      remove: (key) => this.produtoService.deleteProdutos(this.URL, key),
    })
  }
}

@NgModule({
  declarations: [ProdutoComponent],
  imports: [
    CommonModule,
    DxDataGridModule
  ],
  exports: [ProdutoComponent]
})
export class ProdutoModule { }
