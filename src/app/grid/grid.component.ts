import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExportService} from "./export.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  data: Array<any>;
  defaultCols: Array<string> = ['رقم_الصفحة', 'اسم_السورة', 'الآية'];
  colInfo: Array<{ Caption: string, Field: string }>;
  @Output() CloseGrid: EventEmitter<any> = new EventEmitter<any>();
  @Input() numOfMoade3: number;
  @Input() searchWord: string;
  @Input() displaySearchResult: boolean = false;
  @Input() rowsInPage: number = 5;
  dataInGrid: any = [];
  search:string;


  constructor() {
  }


  @Input('data')
  set setData(data) {
    debugger;
    this.search = this.searchWord;

    let dynamic_cols = JSON.parse(localStorage.getItem('dynamic_cols'));
    this.data = data;
    if (data == null) {
      this.colInfo = null;
    } else {
      if (this.displaySearchResult) {
        this.colInfo = [];
        if (dynamic_cols && dynamic_cols.length > 0) {
            dynamic_cols.forEach(col => {
              this.colInfo.push({Field: col, Caption: col.toUpperCase().replace('_', ' ')});

            });
        } else {
          this.defaultCols.forEach(col => {
            this.colInfo.push({Field: col, Caption: col.toUpperCase().replace('_', ' ')});

          });
        }

      } else {
        debugger;
        this.colInfo = [];
        for (let field in data[0]) {

          this.colInfo.push({Field: field, Caption: field.toUpperCase().replace('_', ' ')})
        }

      }
    }
  }


  ngOnInit() {
    this.search = this.searchWord;
  }

  prepareDataToExport() {
    this.dataInGrid = [];
    this.data.forEach(row => {
      let jsonObject = {};
      const map: Map<any, any> = new Map(Object.entries(row));
      this.colInfo.forEach(col => {
        map.forEach((value, key) => {
          if (key == col.Field) {
            jsonObject[key] = value
          }
        });
      });
      this.dataInGrid.push(jsonObject)
    });
  }

  exportAsXLSX(): void {
    debugger;
    this.prepareDataToExport();
    // this.excelService.exportAsExcelFile(this.dataInGrid, 'download');
  }

  exportAsPDF() {

    let y = document.getElementsByClassName('p-datatable-wrapper')[0].innerHTML;
    let x = window.open();
    x.document.write('<body>');
    x.document.write(y);
    x.document.write('</body>');
    x.print();

    // let head = [];
    // let header = [];
    // let body = [];
    // let headerField = [];
    // for (let y = 0; this.colInfo.length > y; y++) {
    //   if (this.colInfo[y].Field !== 'mainOption') {
    //     head.push(this.colInfo[y].Caption);
    //     headerField.push(this.colInfo[y].Field);
    //   }
    // }
    // header.push(head);
    // for (let i = 0; this.dataInGrid.length > i; i++) {
    //   let FieldBody = [];
    //   for (let x = 0; headerField.length > x; x++) {
    //     let Field = headerField[x];
    //     FieldBody.push(this.dataInGrid[i][Field]);
    //   }
    //   body.push(FieldBody);
    // }


    // this.excelService.exportPdf(header, body);

  }

  exportAsWord() {

    // this.excelService.exportAsWordFile(this.data, 'download');

  }


}

