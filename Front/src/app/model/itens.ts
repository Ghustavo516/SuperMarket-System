import { Nota } from "./nota";
import { Produto } from "./produto";

export class ItensNota{
  //Mapeando a estrutura de dados de itens
  id?: number;
  nota?:Nota
  itensSequenciais?: number;
  produto?: Produto;
  quantProdutos?: number;
  valorTotal?: number;

  constructor(itensAPI?: any ){
    this.id = itensAPI.id;
    this.nota = itensAPI.nota;
    this.itensSequenciais = itensAPI.itensSequenciais;
    this.produto = itensAPI.produto;
    this.quantProdutos = itensAPI.quantProdutos;
    this.valorTotal = itensAPI.valorTotal;
  }
}
