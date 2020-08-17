import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ProblemModalComponent } from '../UCDetails/modal/problem-modal.component';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(public dialog: MatDialog) {
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
  solve(element: Item){
    event.stopPropagation();
    this.dialog.open(ProblemModalComponent);
  }
  
}

const PROBLEMS: Item[] = [
  {
    state: 1,
    id: 'Oxygen',
    kit : 'PIPPO',
    hour: '15.9994',
    problemsFound: 'Tipologia Errore',
    button:'',
    description: `Oxygen is a chemical element with problemsFound O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  },
]
