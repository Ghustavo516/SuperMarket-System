export class Produto {
  //Estrutura de dados dos Produtos
  id?: number;
  codico_produto?: string;
  descricao?: string;
  valor_unitario?: string

  constructor(ProdutosAPI?: any){
    if(ProdutosAPI){
      this.id = ProdutosAPI.id;
      this.codico_produto = ProdutosAPI.codico_produto;
      this.descricao = ProdutosAPI.descricao;
      this.valor_unitario = ProdutosAPI.valor_unitario;
    }
  }
}
