import { Component, Input, OnInit } from '@angular/core';
import { TestServiceService } from 'src/app/services/test-service.service';
import { Student } from 'src/app/models/student';
import { FormGroup, FormControl, Validators, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'componente-tabla',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})

export class FirstComponentComponent implements OnInit {
  student = new Student();
  studentForm: FormGroup;

  studentsList = new Array<Student>;

  id2: number;
  document2: number;
  name2: string;
  lastName2: string;
  email2: string;

  constructor(private studentService: TestServiceService, private ngbModalService:NgbModal) {}

  ngOnInit() {
    this.studentForm = new FormGroup({
      "dni": new FormControl(this.student.dni, Validators.required),
      "firstName": new FormControl(this.student.firstName, Validators.required),
      "lastName": new FormControl(this.student.lastName, Validators.required),
      "email": new FormControl(this.student.email, Validators.required)
    });
    this.getAll();
  }

  get dni() { return this.studentForm.get("dni"); }
  get lastName() { return this.studentForm.get("lastName"); }
  get firstName() { return this.studentForm.get("firstName"); }
  get email() { return this.studentForm.get("email"); }

  getAll() {
    this.studentService.getAll().subscribe(response => {
      this.studentsList = response;
    }, error => {
      console.log(error);
    });
  }

  saveStudent() {
    this.student.dni = this.dni?.value;
    this.student.lastName = this.lastName?.value;
    this.student.firstName = this.firstName?.value;
    this.student.email = this.email?.value;
    this.student.cohort = 0;
    this.student.status = 'activo';
    this.student.gender = 'masculino';
    this.student.address = 'abc123';
    this.student.phone = '223000';

    this.studentService.add(this.student).subscribe(() => {
      location.reload();
    }, error => {
      console.error(error);
      alert('Error: ' + error.error.message);
      document.getElementsByTagName('input')[0].focus();
    });
  }
  delete(id: number){

    this.studentService.delete(id).subscribe(() => { 
      location.reload()
      }, error => {
        console.error(error);
        alert('Error: ' + error.error.message)
        document.getElementsByTagName('input')[0].focus()
    })

  }
  modify(ver: any, s: Student) {
    this.id2 = s.id
    this.document2 = s.dni
    this.lastName2 = s.lastName
    this.name2 = s.firstName
    this.email2 = s.email
    this.document2 = s.dni
    this.lastName2 = s.lastName
    this.name2 = s.firstName
    this.email2 = s.email
    this.ngbModalService.open(ver).result.then(() => {
      {
        let student = new Student()
        student.id = this.id2
        student.dni = this.document2
        student.lastName = this.lastName2
        student.firstName = this.name2
        student.email = this.email2
        student.cohort = 0
        student.status = 'activo'
        student.gender = 'masculino'
        student.address = 'abc123'
        student.phone = '000'
        this.studentService.alter(student).subscribe(() => {
          location.reload()
        }, error => {
          console.error(error)
          alert('Error: ' + error.error.message)
        })
      }
    }, reason => { })
  }



}







