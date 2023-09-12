import { Cliente } from './cliente';
import { ItensNota } from './itens';
export class Nota {
  //Mapeando as estrutura de dados de notas
  id?: number;
  numeroNota?: number;
  dataCompra?: Date;
  cliente?: Cliente
  totalNota?: number;
  itens?: ItensNota[]
}
