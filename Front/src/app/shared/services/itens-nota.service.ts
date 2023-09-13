import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItensNota } from 'src/app/model/itens';

@Injectable({
  providedIn: 'root'
})
export class ItensNotaService {

  constructor(private http: HttpClient) {}

  insertItensNota(URL:string, values: any): Observable<any>{
    return this.http.post<any>(`${URL}/itensNota`,values);
  }

  updateItensNota(URL:string, id: number, data: any): Observable<any>{
    return this.http.put<any>(`${URL}/itensNota/${id}`, data)
  }

  deleteItensNota(URL: string, id: number): Observable<any>{
    return this.http.delete<any>(`${URL}/itensNota/${id}`)
  }
}
