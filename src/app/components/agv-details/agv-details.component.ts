import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProblemModalComponent } from '../UCDetails/modal/problem-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { ProblemImageComponent } from './error-image-modal/problem-image.component';

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
export class AgvDetailsComponent implements OnInit {

  dataSource = PROBLEMS;
  columnsToDisplay = ['state', 'id', 'kit', 'problemsFound', 'button', 'hour'];
  expandedElement: Item | null;


  displayedColumnsPrelievi: string[] = ['state', 'components', 'kit', 'hours'];
  dataSourcePrelievi: MatTableDataSource<PrelieviInterface>
  problems: string[];

  constructor(public dialog: MatDialog, public imageDialog: MatDialog) {
    this.problems = [
      "../../../assets/img/errorIcon.svg", "../../../assets/img/dangerIcon.svg", "../../../assets/img/errorIcon.svg"
    ]


    this.dataSourcePrelievi = new MatTableDataSource([{
      state: 0,
      components: "PN12345",
      kit: "45",
      hour: "23:23"
    }])
  }

  ngOnInit(): void {
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

  openImage(imageSrc: string) {
    console.log(imageSrc)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "50%"
    dialogConfig.minHeight = "50%"
    dialogConfig.panelClass = "imageModal"


    dialogConfig.data = {
      imageSrc: imageSrc
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


