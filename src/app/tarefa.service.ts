import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  // Use a URL da sua API (Backend) [cite: 161, 214, 227]
  private readonly API = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) { }

  // Esta função envia a descrição para o MongoDB [cite: 127, 130, 228, 229]
  adicionarTarefa(descricao: string) {
    return this.http.post(this.API, {
      descricao: descricao,
      statusRealizada: false
    });
  }
}