import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //Url da API
  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  //Metodo para selecionar clientes
  selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  //Método para cadastro
  cadastrar(obj:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,obj);
  }

  //Metodo para editar cliente
  editar(obj:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(this.url,obj);
  }

  //Método para remover clientes
  remover(codigo:number):Observable<void>{
    return this.http.delete<void>(this.url + '/' + codigo);
  }
}
