import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  public dialogRef: MatDialogRef<LoginDialogComponent>
 
 
  onNoClick(): void {
    this.dialogRef.close();
  }


  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.save();
    }
  }
  @Input() error: string | null;

  save() {
    // this.auth.login(this.form.value.email, this.form.value.password).subscribe(data => {

    //   var sess = {};

    //   sess["email"] = this.form.value.email;
    //   sess["info"] = JSON.parse(atob(data["token"].split('.')[1]));
    //   sess["token"] = data["token"]

    //   localStorage.setItem("session", JSON.stringify(sess));
      


    // }, error => {
    //   this.error = error.error;
    // })

          this.dialogRef.close();

  }

  close() {
    this.dialogRef.close();

  }


}

/*@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
*/