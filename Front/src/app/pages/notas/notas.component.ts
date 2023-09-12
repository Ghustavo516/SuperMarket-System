import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { NotasService } from 'src/app/shared/services/notas.service';
import CustomStore from 'devextreme/data/custom_store';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Nota } from 'src/app/model/nota';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit{

  notaSource: Nota[] = [];
  URL: string = "http://localhost:8080/api";

  constructor(private notasService: NotasService, private clienteService: ClientesService) {
    //Realiza o processo de crud dentro do DataGrid

    // this.notaSource = new CustomStore({
    //   key: 'id',
    //   // Carrega os valores de todas as notas cadastrados
    //   load: () => this.notasService.loadNotas(this.URL),
    //   // Insere dados de novas notas
    //   insert: (values) => this.notasService.insertNotas(this.URL, values),
    //   // Atualiza os valores das notas
    //   update: (key, values) => this.notasService.updateNotas(this.URL, key, values),
    //   // Remove a nota selecionada
    //   remove: (key) => this.notasService.deleteNotas(this.URL, key),
    // });
  }
  ngOnInit(): void {
    this.notasService.loadNotas(this.URL).subscribe((notas) => {
      this.notaSource = notas;
      console.log(notas)
    })
  }

  // formataNomeCliente(infoCelula: any) {
  //   return infoCelula.value.nome;
  // }
}

@NgModule({
  declarations: [NotasComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxSelectBoxModule

  ],
  exports: [NotasComponent]
})
export class NotasModule { }
