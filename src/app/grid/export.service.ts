import { Injectable } from '@angular/core';
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExportService {

  exportColumns: any[];


  constructor() {

  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    // const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    // const data: Blob = new Blob([buffer], {
    //   type: EXCEL_TYPE
    // });
    // FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  exportPdf(head,data) {
    debugger

    //   var doc = new jsPDF();
    //   doc.setFontSize(18);
    //   doc.setFontSize(11);
    //   doc.setTextColor(100);
    //   (doc as any).autoTable({
    //     header: head,
    //     data: data,
    //   });

    //   // Open PDF document in new tab
    //   doc.output('dataurlnewwindow');

    //   let pdfName = 'download.pdf';
    //   // Download PDF document
    //   doc.save(pdfName);

    // this.exportColumns = cols.map(col => ({title: col.header, dataKey: col.field}));
    //
    // import("jspdf").then(jsPDF => {
    //   import("jspdf-autotable").then(x => {
    //     const doc = new jsPDF.default(0,0);
    //     doc.autoTable(this.exportColumns, data);
    //     doc.save('products.pdf');
    //   })
    // })
  }

  // exportExcel() {
  //   import("xlsx").then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.products);
  //     const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //     this.saveAsExcelFile(excelBuffer, "products");
  //   });
  // }

}


