import { Cliente } from '../../model/cliente';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  // Método para carregar todos os clientes
  loadClientes(URL: string): Promise<Cliente[]> {
    return this.http.get<Cliente[]>(`${URL}/cliente`).toPromise()
    .then((response) => response || []);
  }

  // Método para inserir um novo cliente
  insertCliente(URL: string, values: any): Promise<any> {
    return this.http.post(`${URL}/cliente`, values).toPromise();
  }

  // Método para atualizar um cliente
  updateCliente(URL: string, key: number, values: any): Promise<any> {
    return this.http.get(`${URL}/cliente/${key}`).toPromise()
      .then((existingRecord: any) => {
        const updatedRecord = { ...existingRecord, ...values };
        return this.http.put(`${URL}/cliente/${key}`, updatedRecord).toPromise();
      });
  }

  // Método para remover um cliente
  removeCliente(URL: string, key: number): Promise<any> {
    return this.http.delete(`${URL}/cliente/${key}`).toPromise()
      .then(() => {
        // Atualiza a visualização após a exclusão (opcional)
        this.loadClientes(URL);
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log('Cliente deletado com sucesso');
        } else {
          console.error('Erro ao excluir o cliente:', error);
          throw error;
        }
      });
  }


}
