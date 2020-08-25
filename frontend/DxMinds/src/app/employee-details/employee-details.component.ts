import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  public numberOfEmployees = 0;
  selectedFile: ImageSnippet;
  companyDetails = new FormGroup({
    companyName: new FormControl(''),
    location: new FormControl(''),
    employeeDetails: new FormArray([])
  });

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  addEmployee() {
    const CompanyDetails = this.companyDetails.get('employeeDetails') as FormArray;
    CompanyDetails.push(this.createEmployeeDetailsFormGroup());
    this.numberOfEmployees = CompanyDetails.length;
  }

  private createEmployeeDetailsFormGroup(): FormGroup {
    return new FormGroup({
      Name: new FormControl(''),
      EmailId: new FormControl(''),
      Image: new FormControl('')
    });
  }

  // tslint:disable-next-line: typedef
  public processFile(imageInput: any, index: any, imagesrc: any) {
    const reader = new FileReader();
    const blob = new Blob([imageInput.target.files[0]], {type: 'image/*'});
    const CompanyDetails = this.companyDetails.get('employeeDetails') as FormArray;
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
    (CompanyDetails.value)[index].Image = reader.result;
    };
  }

  public removeImage(index: any, imageInput: any) {
    const CompanyDetails = this.companyDetails.get('employeeDetails') as FormArray;
    (CompanyDetails.value)[index].Image = '';
    imageInput.value = '';
  }

  onSubmit() {
    console.log(this.companyDetails.value);
    this.employeeService.addEmployees(this.companyDetails.value).subscribe(data => {});
  }

}
