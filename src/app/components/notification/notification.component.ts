import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UCCServiceService } from 'src/app/services/uc-c-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  public dialogRef: MatDialogRef<NotificationComponent>

  taskId: string
  workAreaId: string
  agvId: string
  constructor(@Inject(MAT_DIALOG_DATA) public data, private UCCService: UCCServiceService) {
    if (data.taskId) this.taskId = data.taskId
    if (data.workAreaId) this.workAreaId = data.workAreaId
    if (data.agvId) this.agvId = data.agvId
  }

  ngOnInit(): void {
  }

  risolviOra() {
    // TODO vedere come estrarre i parametri da passare
    this.UCCService.setSolveAction("pippo", 1, 1, 1, 13).subscribe(success => {
      console.log("Risolvi ora", success)
    })
  }



}
