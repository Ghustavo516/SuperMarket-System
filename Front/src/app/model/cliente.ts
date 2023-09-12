export class Cliente {
  //Estrutura de dados dos Clientes
  id?: number;
  codigo?: string;
  nome?: string;

  constructor(ClientesAPI?: any){
    if(ClientesAPI){
      this.id = ClientesAPI.id;
      this.codigo = ClientesAPI.codigo;
      this.nome = ClientesAPI.nome;
    }
  }
}
