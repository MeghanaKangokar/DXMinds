import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

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
  public processFile(imageInput: any, index: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
    const CompanyDetails = this.companyDetails.get('employeeDetails') as FormArray;
    console.log((CompanyDetails.value)[index]);
    console.log(document.getElementById('image').getAttribute('src'));
    document.getElementById('image').setAttribute('src', (CompanyDetails.value)[index].Image);
  }

  public removeImage(index: any) {
    const CompanyDetails = this.companyDetails.get('employeeDetails') as FormArray;
    console.log((CompanyDetails.value)[index]);
  }

  onSubmit() {
    console.log(this.companyDetails.value);
  }

}
