import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from 'src/app/model/nota';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http: HttpClient) {}

  loadNotas(URL: string): Observable<Nota[]>{
    return this.http.get<Nota[]>(`${URL}/notaFiscal`)
  }

  insertNotas(URL: string, values:any): Promise<any>{
    return this.http.post(`${URL}/notaFiscal`, values).toPromise();
  }

  updateNotas(URL: string, key: number, values: any){
    return this.http.get(`${URL}/notaFiscal/${key}`).toPromise()
      .then((ValorExistente: any) => {
        const atualizaValorExistente = { ...ValorExistente, ...values};
        return this.http.put(`${URL}/notaFiscal/${key}`, atualizaValorExistente).toPromise();
      });
  }

  deleteNotas(URL: string, key: number): Promise<any> {
    return this.http
      .delete(`${URL}/notaFiscal/${key}`)
      .toPromise()
      .then(() => {
        return this.loadNotas(URL); // Retorna a lista atualizada após a exclusão
      })
      .catch((error) => {
        console.error('Erro ao excluir a Nota:', error);
        throw error;
      });
  }

}
