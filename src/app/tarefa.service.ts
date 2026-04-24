import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
private readonly API = 'https://projeto-backend-marcelo.onrender.com';

  constructor(private http: HttpClient) { }

  // Esta função envia a descrição para o MongoDB [cite: 127, 130, 228, 229]
  adicionarTarefa(descricao: string) {
    return this.http.post(this.API, {
      descricao: descricao,
      statusRealizada: false
    });
  }
}