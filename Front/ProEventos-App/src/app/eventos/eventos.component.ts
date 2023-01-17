import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  public eventos: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    // chamado antes de inicializar a aplicação
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('http://localhost:5032/api/eventos').subscribe({
      next: res => this.eventos = res,
      error: err => console.error(err)
    });
  }



}
