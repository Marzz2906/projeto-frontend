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
    // Voltamos para o getAll, que é a porta que sabemos que está aberta e funcionando no servidor!
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
      resultado => this.arrayDeTarefas.set(resultado)
    );
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    // Criamos a tarefa "limpa", sem enviar o ID vazio, para não dar o Erro 400 no banco!
    const novaTarefaLimpa = {
      descricao: descricaoNovaTarefa,
      statusRealizada: false
    };
    
    this.http.post(`${this.apiURL}/api/post`, novaTarefaLimpa).subscribe(
      resultado => { 
        console.log('Sucesso! Tarefa salva no banco:', resultado); 
        this.READ_tarefas(); // Atualiza a lista na tela na mesma hora
      }
    );
  }

 REMOVE_tarefa(tarefa: Tarefa) {
  // Certifique-se de que o ID da tarefa está chegando corretamente
  this.http.delete(`${this.apiURL}/api/delete/${tarefa._id}`).subscribe(() => {
    console.log('Removido do MongoDB!');
    this.READ_tarefas(); // Atualiza a lista na tela
  });
}

UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    // 1. Pegamos o ID da tarefa que acabou de ser clicada
    var id = tarefaAserModificada._id;
    
    // 2. Avisamos o servidor! 
    // ATENÇÃO: Se você mudou o nome da rota no backend para incluir o seu RA (ex: updatemarcelo254476), 
    // você precisa trocar a palavra 'update' aqui no link abaixo para bater com o seu backend!
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada).subscribe(
      resultado => { 
        console.log('Sucesso! Tarefa atualizada no banco!', resultado); 
        this.READ_tarefas(); // Recarrega a lista
      },
      erro => {
        console.error('ERRO AO SALVAR:', erro);
      }
    );
}
}
