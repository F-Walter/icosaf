import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProblemModalComponent } from '../UCDetails/modal/problem-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { ProblemImageComponent, Slide } from './error-image-modal/problem-image.component';
import { SseServiceService } from 'src/app/services/SseService/sse-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';


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

  dataSourceProblems: MatTableDataSource<Item>
  columnsToDisplay = ['state', 'id', 'kit', 'problemsFound', 'button', 'hour'];
  expandedElement: Item | null;




  displayedColumnsPrelievi: string[] = ['state', 'components', 'kit', 'hours'];
  dataSourcePrelievi: MatTableDataSource<PrelieviInterface>
  problems: Slide[];


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
    private activatedRoute: ActivatedRoute) {

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


  solve(element: Item) {
    event.stopPropagation();
    this.dialog.open(ProblemModalComponent);
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


