import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {
  public eventos: any = [];
  public eventosFiltrados: any;
  larguraImagem: number = 100;
  margemImagem: number = 2;
  mostrarImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    // chamado antes de inicializar a aplicação
    this.getEventos();
  }

  alterarImagem(){
    this.mostrarImagem = !this.mostrarImagem
  }

  public getEventos(): void {
    this.http.get('http://localhost:5032/api/eventos').subscribe({
      next: res => {
        this.eventos = res;
        this.eventosFiltrados = this.eventos;
      },
      error: err => console.error(err)
    });
  }



}
