import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) {}

  loadProdutos(URL: string): Promise<Produto[]>{
    return this.http.get<Produto[]>(`${URL}/produto`).toPromise()
    .then((response) => response || []);
  }

  loadProdutosSelectBox(URL: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${URL}/produto`)
  }

  insertProdutos(URL: string, values:any): Promise<any>{
    return this.http.post(`${URL}/produto`, values).toPromise();
  }

  updateProdutos(URL: string, key: number, values: any){
    return this.http.get(`${URL}/produto/${key}`).toPromise()
      .then((ValorExistente: any) => {
        const atualizaValorExistente = { ...ValorExistente, ...values};
        return this.http.put(`${URL}/produto/${key}`, atualizaValorExistente).toPromise();
      });
  }

  deleteProdutos(URL: string, key: number): Promise<any>{
    return this.http.delete(`${URL}/produto/${key}`).toPromise()
    .then(() => {
      this.loadProdutos(URL)
    })
    .catch((error) => {
      if (error instanceof HttpErrorResponse && error.status === 200) {
        console.log('Produto deletado com sucesso');
      } else {
        console.error('Erro ao excluir o produto:', error);
        throw error;
      }
    })
  }
}
