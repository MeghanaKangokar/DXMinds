import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {}

    addEmployees(data: any): Observable<any> {
        return this.http.post('http://localhost:4000/api/create', data);
    }
}
