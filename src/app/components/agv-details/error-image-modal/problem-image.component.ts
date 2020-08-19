import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-problem-image',
  templateUrl: './problem-image.component.html',
  styleUrls: ['./problem-image.component.css']
})
export class ProblemImageComponent implements OnInit {



  imageSrc: string

  constructor(private dialogRef: MatDialogRef<ProblemImageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    if (data.imageSrc)
      this.imageSrc = data.imageSrc

  }

  ngOnInit(): void {
  }

}
