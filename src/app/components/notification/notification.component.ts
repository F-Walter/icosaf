import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    if (data.taskId) this.taskId = data.taskId
    if (data.workAreaId) this.workAreaId = data.workAreaId
    if (data.agvId) this.agvId = data.agvId
  }

  ngOnInit(): void {
  }

}
