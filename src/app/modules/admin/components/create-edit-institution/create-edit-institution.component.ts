import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/data/services/role.service';
import { Institution } from 'src/app/data/types/institution';

@Component({
  selector: 'app-create-edit-institution',
  templateUrl: './create-edit-institution.component.html',
  styleUrls: ['./create-edit-institution.component.scss']
})
export class CreateEditInstitutionComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name       : [{ value: '', disabled: true }, [ Validators.required ]],
    description: [{ value: '', disabled: true }, [ Validators.required ]],
    url        : [{ value: '', disabled: true }, [ Validators.required ]],
    email      : [{ value: '', disabled: true }, [ Validators.required, Validators.email ]],
    status     : [{ value: '' }, [ Validators.required ]]
  })

  mode: 'create' | 'edit' = 'create';
  institution: Institution = {};
  initialFormValue: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CreateEditInstitutionComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.mode = this.defaults.mode;
    if (this.mode === 'edit') {
      this.institution = this.defaults.institution;
      this.form.setValue({ 
        name: this.institution.name,
        description: this.institution.description,
        url: this.institution.url,
        email: this.institution.email,
        status: this.institution.status
      });
      this.initialFormValue = this.form.value;
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (JSON.stringify(this.initialFormValue) === JSON.stringify(this.form.value)) {
      this.dialogRef.close('no changes');
      return;
    }
    const institution = this.form.value;
    this.dialogRef.close({...this.institution, status: institution.status});
  }

  isRequiredField(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.required && formControl?.touched;
  }

  isValidEmail(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.email && formControl?.touched; 
  }

  isMaxLengthExceeded(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.maxlength && formControl?.touched; 
  }

  isMinLengthInvalid(field: string): boolean {
    const formControl = this.form.get(field);
    return formControl?.errors?.minlength && formControl?.touched; 
  }
}