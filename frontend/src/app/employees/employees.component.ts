import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employee.service';
import { DownloadService } from '../service/download.service';
import { SearchPipe } from '../pipe/search.pipe';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../employee-form-dialog/employee-form-dialog.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchPipe],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  pagedEmployees: Employee[] = [];
  loading = true;

  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  pageSizeOptions = [5, 10, 15, 20];
  totalPages = 0;

  constructor(
    private empService: EmployeeService,
    private downloadfile: DownloadService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.empService.getEmployees().subscribe((res) => {
      this.employees = res;
      this.loading = false;
      this.updatePagedEmployees();
    });
  }

  // 👉 Pagination logic
  updatePagedEmployees(): void {
    this.totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedEmployees = this.employees.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedEmployees();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedEmployees();
    }
  }

  goToFirst(): void {
    this.currentPage = 1;
    this.updatePagedEmployees();
  }

  goToLast(): void {
    this.currentPage = this.totalPages;
    this.updatePagedEmployees();
  }

  // 👉 Open add/edit dialog
  openDialog(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormDialogComponent, {
      width: '600px',
      data: employee || {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.employeeId) {
          this.empService
            .updateEmployee(result.employeeId, result)
            .subscribe(() => this.loadEmployees());
        } else {
          this.empService.addEmployee(result).subscribe(() => this.loadEmployees());
        }
      }
    });
  }

  // 👉 Delete employee
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

  // 👉 Download logic
  downloadFile(data: any, userData: any): void {
    this.downloadfile.downloadFile(data, userData);
  }
}
