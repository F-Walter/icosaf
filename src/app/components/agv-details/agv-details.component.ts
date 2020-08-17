import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


interface PrelieviInterface {
  state: number;
  components: string
  kit: string;
  hour: string;

}


@Component({
  selector: 'app-agv-details',
  templateUrl: './agv-details.component.html',
  styleUrls: ['./agv-details.component.css']
})
export class AgvDetailsComponent implements OnInit {

  displayedColumnsPrelievi: string[] = ['state', 'components', 'kit', 'hours'];
  dataSourcePrelievi: MatTableDataSource<PrelieviInterface>

  constructor() {
    this.dataSourcePrelievi = new MatTableDataSource([{
      state: 0,
      components: "PN12345",
      kit: "45",
      hour: "23:23"
    }])
  }

  ngOnInit(): void {
  }

}
