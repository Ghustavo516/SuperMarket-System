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
}
