import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from 'src/app/services/spinner.service';
import * as FileSaver from 'file-saver';
import * as dateFns from 'date-fns';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  nombreArchivo: string = '';
  listaExcel: any[] = [];
  formulario!: FormGroup;
  lista01: any[] = [];
  listaEspejo: any[] = [];
  listaEspejoDoble: any[] = [];
  listaEspejoDobleFinal: any[] = [];
  listaEsppejo02: any[] = [];
  lista02: any[] = [];
  lista0607: any[] = [];
  lista11: any[] = [];
  listaPromociones: any[] = [];
  lista11Final: any[] = [];
  lista0607Final: any[] = [];
  lista12: any[] = [];
  lista16: any[] = [];
  fechaDoc: Date = new Date();
  tempRFC: string = '';
  tempCURP: string = '';

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
          this.listaExcel.sort((a, b) => (a['RFC'] > b['RFC']) ? 1 : -1);
          this.listaExcel.forEach((documento: any) => {
            let lastDate = '99/99/9999';
            if (documento['OPERACION'].toString().startsWith('01')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA'].toString()),
                SOSTENIMIENTO: 'FEDERAL',
                CENTRO_TRABAJO: documento['CCT'],
                RFC: documento['RFC'],
                CURP: documento['CURP'],
                DISCAPACIDAD: 1,
                NIVEL_ACADEMICO: '00',
                ESTADO_CIVIL: 1,
                TEL_FIJO: 'x',
                EXTENSION: 'x',
                TEL_MOVIL: 'x',
                CORREO_PERSONAL: 'x',
                CORREO_INSTITUCIONAL: 'x',
                NSS: 'x',
                CUENTA_SAR: 0,
                REGIMEN_PENSIONARIO: 1,
                CALLE: 'NO CONOCIDO',
                NUMERO_EXTERIOR: 0,
                NUMERO_INTERIOR: 'x',
                CODIGO_POSTAL: documento['CP'],
                CODIGO_POSTAL_FISCAL: documento['CP'],
                ENTIDAD_FEDERATIVA: 11,
                MUNICIPIO: 'x',
                LOCALIDAD: 'x',
                COLONIA: 'x',
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                ING_GOBIERNO: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
                ING_SEP: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
                ING_RAMA_SUBSISTEMA: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
                REINSTALACION_O_TRANSFERENCIA: 0,
                CLAVE_DE_COBRO: documento['CPZA'],
                NIVEL_SUELDO: 3,
                FECHA_INICIO: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
                FECHA_FIN: (!documento['FEC_FIN']) ? lastDate : this.extraerFechaDocumento(documento['FEC_FIN']),
                SINDICATO: 99999,
                BANCO: 0,
                CLABE_INTERBANCARIA: 'x',
                FOLIO_RYS: 'x'
              };
              this.lista01.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('02')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA']),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: '02',
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
                FECHA_FINAL: (!documento['FEC_FIN']) ? lastDate : this.extraerFechaDocumento(documento['FEC_FIN']),
                NIVEL_SUELDO: 3,
                FECHA_INGRESO_SUB: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
                REINSTALACION_O_TRANSFERENCIA: 0
              };
              this.lista02.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('06') || documento['OPERACION'].toString().startsWith('07')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA']),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (!documento['FEC_FIN']) ? lastDate : this.obtenerFechaSiguiente(this.extraerFechaDocumento(documento['FEC_FIN']))
              };
              this.lista0607.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('10')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA']),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (!documento['FEC_INI']) ? '99/99/9999' : this.extraerFechaDocumento(documento['FEC_INI']),
                FECHA_FINAL: (!documento['FEC_FIN']) ? '99/99/9999' : this.extraerFechaDocumento(documento['FEC_FIN'])
              };
              this.listaPromociones.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('11')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA']),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
                FECHA_FINAL: (!documento['FEC_FIN']) ? lastDate : this.extraerFechaDocumento(documento['FEC_FIN'])
              };
              this.lista11.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('12')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA']),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: (!documento['FEC_INI']) ? lastDate : this.extraerFechaDocumento(documento['FEC_INI']),
              };
              this.lista12.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('16')) {
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA']),
                SOSTENIMIENTO: 'FEDERAL',
                RFC: documento['RFC'],
                PLAZA: documento['CPZA'],
                CENTRO_TRABAJO: documento['CCT'],
                CLAVE_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(3, 5),
                FECHA_INICIAL: this.extraerFechaDocumento(documento['FEC_INI'])
              };
              this.lista16.push(user);
            }
            if (documento['OPERACION'].toString().startsWith('22') || documento['OPERACION'].toString().startsWith('24') || documento['OPERACION'].toString().startsWith('25')) {
              let initial;
              if (documento['OPERACION'].toString().startsWith('22')) {
                initial = '48';
              }
              if (documento['OPERACION'].toString().startsWith('24')) {
                initial = '14';
              }
              if (documento['OPERACION'].toString().startsWith('25')) {
                initial = '15';
              }
              let user: any = {
                FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA'].toString()),
                SOSTENIMIENTO: 'FEDERAL',
                CENTRO_TRABAJO: documento['CCT'],
                RFC: documento['RFC'],
                CURP: documento['CURP'],
                DISCAPACIDAD: 1,
                NIVEL_ACADEMICO: '00',
                ESTADO_CIVIL: 1,
                TEL_FIJO: 'x',
                EXTENSION: 'x',
                TEL_MOVIL: 'x',
                CORREO_PERSONAL: 'x',
                CORREO_INSTITUCIONAL: 'x',
                NSS: 'x',
                CUENTA_SAR: 0,
                REGIMEN_PENSIONARIO: 1,
                CALLE: 'NO CONOCIDO',
                NUMERO_EXTERIOR: 0,
                NUMERO_INTERIOR: 'x',
                CODIGO_POSTAL: documento['CP'],
                CODIGO_POSTAL_FISCAL: documento['CP'],
                ENTIDAD_FEDERATIVA: 11,
                MUNICIPIO: 'x',
                LOCALIDAD: 'x',
                COLONIA: 'x',
                CLAVE_MOVIMIENTO: '01',
                MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                ING_GOBIERNO: this.extraerFechaDocumento(documento['FEC_INI']),
                ING_SEP: this.extraerFechaDocumento(documento['FEC_INI']),
                ING_RAMA_SUBSISTEMA: this.extraerFechaDocumento(documento['FEC_INI']),
                REINSTALACION_O_TRANSFERENCIA: 0,
                CLAVE_DE_COBRO: initial + documento['CPZA'].substring(2),
                NIVEL_SUELDO: 3,
                FECHA_INICIO: this.extraerFechaDocumento(documento['FEC_INI']),
                FECHA_FIN: (!documento['FEC_FIN']) ? lastDate : this.extraerFechaDocumento(documento['FEC_FIN']),
                SINDICATO: 99999,
                BANCO: 0,
                CLABE_INTERBANCARIA: 'x',
                FOLIO_RYS: 'x'
              };
              if (documento['RFC'] === this.tempRFC) {
                let user2: any = {
                  FECHA_DOCUMENTO: this.extraerFechaDocumento(documento['FECHA'].toString()),
                  SOSTENIMIENTO: 'FEDERAL',
                  RFC: documento['RFC'],
                  PLAZA: initial + documento['CPZA'].substring(2),
                  CENTRO_TRABAJO: documento['CCT'],
                  CLAVE_MOVIMIENTO: '02',
                  MOTIVO_MOVIMIENTO: documento['OPERACION'].toString().substring(0, 2),
                  FECHA_INICIO: this.extraerFechaDocumento(documento['FEC_INI']),
                  FECHA_FIN: (!documento['FEC_FIN']) ? lastDate : this.extraerFechaDocumento(documento['FEC_FIN']),
                  NIVEL_SUELDO: 3,
                  FECHA_INGRESO_SUB: this.extraerFechaDocumento(documento['FEC_INI']),
                  REINSTALACION_O_TRANSFERENCIA: 0
                };
                user['CLAVE_MOVIMIENTO'] = '02';
                this.listaEspejoDoble.push(user);
                this.listaEspejoDobleFinal.push(user2);
              } else {
                user['CLAVE_MOVIMIENTO'] = '01';
                this.listaEspejo.push(user);
              }
              this.tempRFC = documento['RFC'];
            }
          });

          /* if (this.lista01.length > 0) {
            this.exportToExcelIngreso(this.lista01, '01');
          }
          if (this.lista02.length > 0) {
            this.exportToExcel(this.lista02, '02');
          }
          if (this.listaEspejo.length > 0) {
            this.exportToExcelIngreso(this.listaEspejo, 'Espejo 01');
          }
          if (this.listaEspejoDobleFinal.length > 0) {
            this.exportToExcel(this.listaEspejoDobleFinal, 'Espejo 02');
          }
          if (this.lista12.length > 0) {
            this.exportToExcel(this.lista12, '12');
          }
          if (this.lista16.length > 0) {
            this.exportToExcel(this.lista16, '16');
          }
          this.obtenerPromociones(); */

          if (this.listaEspejo.length > 0) {
            this.exportToExcelIngreso(this.listaEspejo, 'Espejo 01');
          }
          if (this.listaEspejoDobleFinal.length > 0) {
            this.exportToExcel(this.listaEspejoDobleFinal, 'Espejo 02');
          }
        };
        reader.readAsBinaryString(datosExcel.target.files[0]);
      });
    } catch (excp) {
      console.log('error', excp);
    }
  }

  obtenerPromociones() {
    console.log(this.listaPromociones.length);

    this.lista11.forEach((documento: any) => {
      let encontrado = this.listaPromociones.some((promocion: any) =>
        (promocion['RFC'] === documento['RFC']) &&
        (documento['MOTIVO_MOVIMIENTO'] === '42' || documento['MOTIVO_MOVIMIENTO'] === '52')
      );

      if (encontrado) {
        documento['CLAVE_MOVIMIENTO'] = '10';
        this.listaPromociones.push(documento);
      } else {
        this.lista11Final.push(documento);
      }
    });

    if (this.lista0607.length > 0) {
      this.lista0607.forEach((documento: any) => {
        let encontrado = this.listaPromociones.some((promocion: any) =>
          (promocion['RFC'] === documento['RFC']) && (documento['MOTIVO_MOVIMIENTO'] === '37' || documento['MOTIVO_MOVIMIENTO'] === '36'));

        if (encontrado) {
          documento['CLAVE_MOVIMIENTO'] = '10';
          this.listaPromociones.push(documento);
        } else {
          this.lista0607Final.push(documento);
        }
      });
    }

    if (this.listaPromociones.length > 0) {
      this.exportToExcel(this.listaPromociones, 'Promociones');
    } else {
      console.log('No hay promociones');
    }
    if (this.lista11Final.length > 0) {
      this.exportToExcel(this.lista11Final, '11');
    }
    if (this.lista0607Final.length > 0) {
      this.exportToExcel(this.lista0607Final, '06-07');
    }
  }

  exportToExcelIngreso(response: any, termino: string) {
    this.spinner.showLoadingIndicator();
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(response);
      worksheet['A1'].v = 'FECHA_DOCUMENTO';
      worksheet['B1'].v = 'SOSTENIMIENTO';
      worksheet['C1'].v = 'CENTRO TRABAJO';
      worksheet['D1'].v = 'RFC';
      worksheet['E1'].v = 'CURP';
      worksheet['F1'].v = 'DISCAPACIDAD';
      worksheet['G1'].v = 'NIVEL ACADEMICO';
      worksheet['H1'].v = 'ESTADO CIVIL';
      worksheet['I1'].v = 'TEL FIJO';
      worksheet['J1'].v = 'EXTENSION';
      worksheet['K1'].v = 'TEL MOVIL';
      worksheet['L1'].v = 'CORREO PERSONAL';
      worksheet['M1'].v = 'CORREO INSTITUCIONAL';
      worksheet['N1'].v = 'NSS';
      worksheet['O1'].v = 'CUENTA SAR';
      worksheet['P1'].v = 'REGIMEN PENSIONARIO';
      worksheet['Q1'].v = 'CALLE';
      worksheet['R1'].v = 'NUMERO EXTERIOR';
      worksheet['S1'].v = 'NUMERO INTERIOR';
      worksheet['T1'].v = 'CODIGO POSTAL';
      worksheet['U1'].v = 'CODIGO POSTAL FISCAL';
      worksheet['V1'].v = 'ENTIDAD FEDERATIVA';
      worksheet['W1'].v = 'MUNICIPIO';
      worksheet['X1'].v = 'LOCALIDAD';
      worksheet['Y1'].v = 'COLONIA';
      worksheet['Z1'].v = 'CLAVE MOVIMIENTO';
      worksheet['AA1'].v = 'MOTIVO MOVIMIENTO';
      worksheet['AB1'].v = 'ING GOBIERNO';
      worksheet['AC1'].v = 'ING SEP';
      worksheet['AD1'].v = 'ING RAMA - SUBSISTEMA';
      worksheet['AE1'].v = 'REINSTALACION O TRANSFERENCIA';
      worksheet['AF1'].v = 'CLAVE DE COBRO';
      worksheet['AG1'].v = 'NIVEL SUELDO';
      worksheet['AH1'].v = 'FECHA INICIO';
      worksheet['AI1'].v = 'FECHA FIN';
      worksheet['AJ1'].v = 'SINDICATO';
      worksheet['AK1'].v = 'BANCO';
      worksheet['AL1'].v = 'CLABE INTERBANCARIA';
      worksheet['AM1'].v = 'FOLIO RYS';

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

  extraerFechaDocumento(fecha: any): string {
    let finalDate = '';
    if (typeof fecha === 'number') {
      let newFecha = new Date((fecha - 25569) * 86400 * 1000); // Convertir número de serie de Excel a milisegundos
      let dia = newFecha.getUTCDate().toString().padStart(2, '0');
      let mes = (newFecha.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-11
      let año = newFecha.getUTCFullYear();
      finalDate = `${dia}/${mes}/${año}`;
    }
    if (typeof fecha === 'string') {
      let fechaDocumento = fecha.split(' ');
      let fechaDocumentoFinal = fechaDocumento[0].split('/');
      finalDate = fechaDocumentoFinal[0] + '/' + fechaDocumentoFinal[1] + '/20' + fechaDocumentoFinal[2];
    }
    return finalDate;
  }

  convertirNumeroAFecha(numero: number): string {
    let fecha = new Date((numero - 25569) * 86400 * 1000); // Convertir número de serie de Excel a milisegundos
    let dia = fecha.getUTCDate();
    let mes = fecha.getUTCMonth() + 1; // Los meses en JavaScript son 0-11
    let año = fecha.getUTCFullYear();
    return `${dia}/${mes}/${año}`;
  }


  obtenerFechaSiguiente(fecha: string): string {
    let fechaDocumento = fecha.split('/');
    let dia = fechaDocumento[0];
    let mes = fechaDocumento[1];
    let anio = fechaDocumento[2];

    if (mes === '12' && dia === '31') {
      return '01/01/' + (parseInt(anio) + 1).toString().padStart(2, '0');
    }
    if (dia === '31' && (mes === '01' || mes === '03' || mes === '05' || mes === '07' || mes === '08' || mes === '10')) {
      return '01/' + (parseInt(mes) + 1).toString().padStart(2, '0') + '/' + anio;
    }
    if (dia === '30' && (mes === '04' || mes === '06' || mes === '09' || mes === '11')) {
      return '01/' + (parseInt(mes) + 1).toString().padStart(2, '0') + '/' + anio;
    }
    if (dia === '28' && mes === '02') {
      return '01/03/' + anio;
    }

    let nuevoDia = (parseInt(dia) + 1).toString().padStart(2, '0');
    return nuevoDia + '/' + mes.padStart(2, '0') + '/' + anio;
  }


}
