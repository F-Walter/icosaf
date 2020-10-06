import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProblemModalComponent } from '../UCDetails/modal/problem-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { ProblemImageComponent, Slide } from './error-image-modal/problem-image.component';
import { SseServiceService } from 'src/app/services/SseService/sse-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { UCCService } from 'src/app/services/UC-C/uc-c-service.service';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';


const options = { hour: "numeric", minute: "numeric" }
export interface Item {
  state: number; // 0 nessun problema or problema risolto // 1 problema // 2 componente non ancora considerato //3 loading
  id: string;
  kit: string;
  hour: string;
  problemsFound: string;
  description: string;
  button: string;
}


interface PrelieviInterface {
  state: number;
  components: string
  kit: string;
  hour: string;
}


@Component({
  selector: 'app-agv-details',
  templateUrl: './agv-details.component.html',
  styleUrls: ['./agv-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AgvDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("OperatorSelection") opSelection: MatRadioGroup
  @ViewChild("AGVActionSelected") AGVsel: MatRadioGroup
  dataSourceProblems: MatTableDataSource<Item>
  columnsToDisplay = ['state', 'id', 'kit', 'problemsFound', 'button', 'hour'];
  expandedElement: Item | null;
  isTabClose: boolean
  AGVActionSelected: string
  OpActionSelected: string
  opChecked: boolean = false

  agvOptions = ['Ritentare', 'Rimanere fermo', 'Continuo attività']
  opOptions = [{text:'Richiesta intervento', val:false, dis:false}, {text:'Richiesta interveno urgente', val:false, dis:false}]

  displayedColumnsPrelievi: string[] = ['state', 'components', 'kit', 'hours'];
  dataSourcePrelievi: MatTableDataSource<PrelieviInterface>
  problems: Slide[];


  AGVActionSelection(actionSelected: string) {
    this.AGVActionSelected = actionSelected

    if(actionSelected === this.agvOptions[1]){
      console.log("selezionato rimanere fermo")
      if(!this.opOptions.find(o => o.val==true))
        this.opOptions[0].val=true
      for(let op of this.opOptions){
        op.dis = false
      }
      console.log("Changed now")
    }
    else{
      console.log("selezionato altro")
      for(let op of this.opOptions){
        op.val = false
        op.dis = true
      }
    }
  }
  OpActionSelection(opSel) {
    if(!opSel.dis){
      for(let op of this.opOptions)
        if(opSel != op) op.val = false
      //this.opOptions.find(o=>o!=opSel).val = false
      this.opOptions.find(o=> o==opSel).val = true
    }
  }

  private _paginatorPrelievi: MatPaginator;
  paramsSub: Subscription;
  public get paginatorPrelievi(): MatPaginator {
    return this._paginatorPrelievi;
  }
  @ViewChild('paginatorPrelievi')
  public set paginatorPrelievi(value: MatPaginator) {
    this._paginatorPrelievi = value;
    this.dataSourcePrelievi.paginator = this.paginatorPrelievi

  }
  private _paginatorErrors: MatPaginator;
  public get paginatorErrors(): MatPaginator {
    return this._paginatorErrors;
  }
  @ViewChild('paginatorErrors')
  public set paginatorErrors(value: MatPaginator) {
    this._paginatorErrors = value;
    this.dataSourceProblems.paginator = this.paginatorErrors
  }


  constructor(
    public dialog: MatDialog,
    public imageDialog: MatDialog,
    private sseService: SseServiceService,
    private UCCService: UCCService,
    private activatedRoute: ActivatedRoute) {

    this.isTabClose = true
    this.problems = []
    this.problems.push({ image: "../../../assets/img/errorIcon.svg" },
      { image: "../../../assets/img/dangerIcon.svg" },
      { image: "../../../assets/img/settingIconSelected.svg" })


    this.dataSourcePrelievi = new MatTableDataSource()
    this.dataSourceProblems = new MatTableDataSource()
  }
  ngAfterViewInit(): void {
    this.paginatorPrelievi = this.dataSourcePrelievi.paginator
    this.paginatorErrors = this.dataSourceProblems.paginator
  }

  ngOnInit(): void {

    //TODO chiamata per ottenere tutti i problemi e i task risolti fino a quel momento

    this.paramsSub = this.activatedRoute.params.subscribe(params => {

      // UC-C
      if (params['workAreaId'] === "0" && params['agvId'] === "0") {
        this.sseService
          .getServerSentEvent("http://localhost:4200/API/events")
          .subscribe(data => {

            let response = JSON.parse(data.data)

            if (response.status === "OK") {
              this.dataSourcePrelievi.data = [...this.dataSourcePrelievi.data, {
                state: 0,
                components: `PN${response.task_id}`,
                kit: "45",
                hour: new Date().toLocaleTimeString('it', options)
              }]

              this.dataSourcePrelievi.paginator = this.paginatorPrelievi
            } else {
              if (response.status === "NOK") {
                this.dataSourceProblems.data = [...this.dataSourceProblems.data,
                {
                  state: 2,
                  id: 'PN 45335478',
                  kit: 'Nome kit',
                  hour: new Date().toLocaleTimeString('it', options),
                  problemsFound: 'Tipologia Problema',
                  button: '',
                  description: `Problem description`,
                }]

                this.dataSourceProblems.paginator = this.paginatorErrors
              }
            }
          })

        this.dataSourceProblems.data = [{
          state: 2,
          id: 'PN 45335478',
          kit: 'Nome kit',
          hour: new Date().toLocaleTimeString('it', options),
          problemsFound: 'Tipologia Problema',
          button: '',
          description: `Problem description`,
        }]
      }
    })
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe()
  }



  headerOfColumn(column: string) {
    switch (column) {
      case 'state':
        return 'Stato';
      case 'id':
        return 'Componente';
      case 'hour':
        return 'Ora';
      case 'problemsFound':
        return 'Problemi Rilevati';
      default:
        break;
    }
  }

  proceed() {
    console.log(this.AGVActionSelected);

    this.UCCService.getLastActionError(15).subscribe(success => {
      console.log(success[0].error_id);

      this.UCCService.setSolveAction("pippo", 1, 1, 1, success[0].error_id).subscribe(response => {
        this.UCCService.setTaskStatusOk(15).subscribe(_ => {
          console.log("Risolvi ora", response)
        })
      })
    })
  }

  solve(element: Item) {
    event.stopPropagation();
    //this.dialog.open(ProblemModalComponent);
    this.isTabClose = false
    this.expandedElement = element
  }

  openImage(imageSrc: Slide) {
    console.log(imageSrc)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "50%"
    dialogConfig.minHeight = "50%"
    dialogConfig.panelClass = "zeroPaddingModal"


    let imageArray = []

    imageArray.push(imageSrc)

    this.problems.forEach(element => {
      if (element.image != imageSrc.image)
        imageArray.push(element)
    });

    dialogConfig.data = {
      images: imageArray
    };
    this.imageDialog.open(ProblemImageComponent, dialogConfig)
  }
}

const PROBLEMS: Item[] = [
  {
    state: 2,
    id: 'PN 45335478',
    kit: 'Nome kit',
    hour: '10:59',
    problemsFound: 'Tipologia Problema',
    button: '',
    description: `Problem description`
  },
]


