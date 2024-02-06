import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as FileSaver from 'file-saver';
import * as dateFns from 'date-fns';
import * as moment from 'moment';

interface User2 {
  FECHA_DOCUMENTO: Date;
  SOSTENIMIENTO: string;
  RFC: string;
  PLAZA: string;
  CENTRO_TRABAJO: string;
  CLAVE_MOVIMIENTO: string;
  MOTIVO_MOVIMIENTO: string;
  FECHA_INICIAL: Date;
  FECHA_FINAL: Date;
  NIVEL_SUELDO: number;
  FECHA_INGRESO_SUB: Date;
  REINSTALACION_O_TRANSFERENCIA: number;
}

interface UserMultiple {
  FECHA_DOCUMENTO: Date;
  SOSTENIMIENTO: string;
  RFC: string;
  PLAZA: string;
  CENTRO_TRABAJO: string;
  CLAVE_MOVIMIENTO: string;
  MOTIVO_MOVIMIENTO: string;
  FECHA_INICIAL: Date;
}

interface User11 {
  FECHA_DOCUMENTO: Date;
  SOSTENIMIENTO: string;
  RFC: string;
  PLAZA: string;
  CENTRO_TRABAJO: string;
  CLAVE_MOVIMIENTO: string;
  MOTIVO_MOVIMIENTO: string;
  FECHA_INICIAL: Date;
  FECHA_FINAL: Date;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  nombreArchivo: string = '';
  listaExcel: any[] = [];
  formulario!: FormGroup;
  lista02: any[] = [];
  lista0607: any[] = [];
  lista11: any[] = [];
  lista12: any[] = [];
  lista16: any[] = [];
  fechaDoc: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      archivoCarga: [null], // Puedes inicializarlo con un valor predeterminado si es necesario
    });
  }

  iniForm(): void {
    this.formulario = new FormGroup({
      archivoCarga: new FormControl(null, [Validators.required]),
    });
  }

  selectFile() {
    console.log('Abriendo seleccion de archivo');
    let element: HTMLElement = document.getElementById(
      'archivo'
    ) as HTMLElement;
    element.click();
  }

  seleccionarArchivoMovtos(event: any) {
    this.uploadExcelMovtos(event);

    this.nombreArchivo = event.target.files[0].name;
    console.log(this.nombreArchivo);
  }

  uploadExcelMovtos(datosExcel: any) {
    try {
      import('xlsx').then((xlsx) => {
        let workBook: any = null;
        let jsonData = null;
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          this.listaExcel = jsonData[Object.keys(jsonData)[0]] as any[];
          this.listaExcel.forEach((documento: any) => {
            let lastDate = dateFns.parse('31/12/9999', 'dd/MM/yyyy', new Date());
            if (documento['OPERACION'].toString().startsWith('02')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA']),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: '02',
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (!documento['FEC_INI']) ? lastDate : dateFns.parse(this.extraerFechaDocumento(documento['FEC_INI'].toString()), 'dd/MM/yyyy', new Date()),
                FECHA_FINAL: (!documento['FEC_FIN']) ? lastDate : dateFns.parse(this.extraerFechaDocumento(documento['FEC_FIN'].toString()), 'dd/MM/yyyy', new Date()),
                NIVEL_SUELDO: 3,
                FECHA_INGRESO_SUB: (!documento['FEC_INI']) ? lastDate : dateFns.parse(this.extraerFechaDocumento(documento['FEC_INI'].toString()), 'dd/MM/yyyy', new Date()),
                REINSTALACION_O_TRANSFERENCIA: 0
              };            
              this.lista02.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('06') || documento['OPERACION'].toString().startsWith('07')) {
              let user: UserMultiple = {
                FECHA_DOCUMENTO: new Date(this.extraerFechaDocumento(documento['FECHA'].toString())),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (documento['FEC_FIN'] === undefined) ? new Date('99/99/9999') : new Date(this.obtenerFechaSiguiente(this.extraerFechaDocumento(documento['FEC_FIN'].toString())))
              };
              this.lista0607.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('11')) {
              let user: User11 = {
                FECHA_DOCUMENTO: new Date(this.extraerFechaDocumento(documento['FECHA'].toString())),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (documento['FEC_INI'] === undefined) ? new Date('99/99/9999') : new Date(this.extraerFechaDocumento(documento['FEC_INI'].toString())),
                FECHA_FINAL: (documento['FEC_FIN'] === undefined) ? new Date('99/99/9999') : new Date(this.extraerFechaDocumento(documento['FEC_FIN'].toString()))
              };
              this.lista11.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('12')) {
              let user: UserMultiple = {
                FECHA_DOCUMENTO: new Date(this.extraerFechaDocumento(documento['FECHA'].toString())),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (documento['FEC_INI'] === undefined) ? new Date('99/99/9999') : new Date(this.extraerFechaDocumento(documento['FEC_INI'].toString())),
              };
              this.lista12.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('16')) {
              let user: UserMultiple = {
                FECHA_DOCUMENTO: new Date(this.extraerFechaDocumento(documento['FECHA'].toString())),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: new Date(this.extraerFechaDocumento(documento['FEC_INI'].toString()))
              };
              this.lista16.push(user);
            }
          });
          this.exportToExcel(this.lista02, '02');
          //this.exportToExcel(this.lista0607, '06-07');
          //this.exportToExcel(this.lista11, '11');
          //this.exportToExcel(this.lista12, '12');
          //this.exportToExcel(this.lista16, '16');
        };
        reader.readAsBinaryString(datosExcel.target.files[0]);
      });
    } catch (excp) {
      console.log('error', excp);
    }
  }

  exportToExcel(response: any, termino: string) {
    this.spinner.showLoadingIndicator();
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(response);
      worksheet['A1'].v = 'FECHA DOCUMENTO';
      worksheet['B1'].v = 'SOSTENIMIENTO';
      worksheet['C1'].v = 'RFC';
      worksheet['D1'].v = 'PLAZA';
      worksheet['E1'].v = 'CENTRO TRABAJO';
      worksheet['F1'].v = 'CLAVE MOVIMIENTO';
      worksheet['G1'].v = 'MOTIVO MOVIMIENTO';
      worksheet['H1'].v = 'FECHA INICIAL';
      if (response[0].hasOwnProperty('FECHA_FINAL')) {
        worksheet['I1'].v = 'FECHA FINAL';
      }
      if (response[0].hasOwnProperty('NIVEL_SUELDO')) {
        worksheet['J1'].v = 'NIVEL SUELDO';
        worksheet['K1'].v = 'FECHA INGRESO SUB';
        worksheet['L1'].v = 'REINSTALACION O TRANSFERENCIA';
      }
      const workbook = {
        Sheets: { resultados: worksheet },
        SheetNames: ['resultados']
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
        cellDates: true
      });
      this.saveAsExcelFile(excelBuffer, 'Resultados - ' + termino);
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(data, fileName + ' ' + EXCEL_EXTENSION);
    this.spinner.hideLoadingIndicator();
  }

  extraerFechaDocumento(fecha: string): string {
    let fechaDocumento = fecha.split(' ');
    let fechaDocumentoFinal = fechaDocumento[0].split('/');
    return fechaDocumentoFinal[0] + '/' + fechaDocumentoFinal[1] + '/20' + fechaDocumentoFinal[2];
  }

  obtenerFechaSiguiente(fecha: string): string {
    let fechaDocumento = fecha.split('/');
    if (fechaDocumento[1] === '12' && fechaDocumento[0] === '31') {
      return '01/01/' + (parseInt(fechaDocumento[2]) + 1);
    }
    if (fechaDocumento[0] === '31' && (fechaDocumento[1] === '01' || fechaDocumento[1] === '03' || fechaDocumento[1] === '05' || fechaDocumento[1] === '07' || fechaDocumento[1] === '08' || fechaDocumento[1] === '10')) {
      return '01/' + (parseInt(fechaDocumento[1]) + 1) + '/' + fechaDocumento[2];
    }
    if (fechaDocumento[0] === '30' && (fechaDocumento[1] === '04' || fechaDocumento[1] === '06' || fechaDocumento[1] === '09' || fechaDocumento[1] === '11')) {
      return '01/' + (parseInt(fechaDocumento[1]) + 1) + '/' + fechaDocumento[2];
    }
    if (fechaDocumento[0] === '28' && fechaDocumento[1] === '02') {
      return '01/03/' + fechaDocumento[2];
    }
    return (parseInt(fechaDocumento[0]) + 1) + '/' + fechaDocumento[1] + '/' + fechaDocumento[2];
  }

}
