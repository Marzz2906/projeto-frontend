import { Component, signal } from '@angular/core'; // Adicione o 'signal' aqui
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
import { TarefaService } from './tarefa.service'; // [cite: 191]


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false 
})
export class AppComponent {
  title = 'TODOapp';
  apiURL: string = 'https://projeto-backend-marcelo.onrender.com';
  arrayDeTarefas = signal<Tarefa[]>([]);
  
constructor(
  private tarefaService: TarefaService, 
  private http: HttpClient // Adicione isso aqui para as funções antigas pararem de dar erro
) { 
  this.READ_tarefas();
}

  READ_tarefas() {
  this.http.get<Tarefa[]>(`${this.apiURL}/api/tarefasmarcelo254476`).subscribe(
    resultado => this.arrayDeTarefas.set(resultado));
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(resultado => { console.log(resultado); this.READ_tarefas(); });
  }

 REMOVE_tarefa(tarefa: Tarefa) {
  // Certifique-se de que o ID da tarefa está chegando corretamente
  this.http.delete(`${this.apiURL}/api/delete/${tarefa._id}`).subscribe(() => {
    console.log('Removido do MongoDB!');
    this.READ_tarefas(); // Atualiza a lista na tela
  });
}

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
 var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
 var id = this.arrayDeTarefas()[indice]._id;
 this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
 tarefaAserModificada).subscribe(
 resultado => { console.log(resultado); this.READ_tarefas(); });
 }
  adicionar(descricao: string) {
  this.tarefaService.adicionarTarefa(descricao).subscribe(() => {
    console.log('Tarefa salva no tarefasDB');
    this.READ_tarefas(); // Isso faz a lista atualizar na tela [cite: 161]
  });
}
}
