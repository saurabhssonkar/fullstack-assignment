import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-employee-form-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css']
})
export class EmployeeFormDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.form = new FormGroup({
      employeeId: new FormControl(data?.employeeId || null),
      name: new FormControl(data?.name || '', Validators.required),
      department: new FormControl(data?.department || '', Validators.required),
      email: new FormControl(data?.email || '', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(data?.phoneNumber || '', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
