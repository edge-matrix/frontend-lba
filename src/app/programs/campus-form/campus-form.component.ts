import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService, SharedService } from '@service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Response } from '@models'
import { Router } from '@angular/router';

@Component({
  templateUrl: './campus-form.component.html',
  styleUrls: ['./campus-form.component.scss']
})
export class CampusHeroFormComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private commonService: CommonService,
    private sharedService: SharedService,
    private router: Router) {

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      collageName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._-]{5,15}$|^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      year: ['1st Year', Validators.required],
      gender: ['Male', Validators.required],
      token: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      this.contactForm.patchValue({
        'token': token
      });
    });
  }

  ngOnDestroy() {
    const element = document.getElementsByClassName('grecaptcha-badge')[0] as HTMLElement;
    if (element) {
      element.style.visibility = 'hidden';
    }
  }

  // convenience getter for easy access to form fields
  get g() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if(this.contactForm.invalid){
      return;
    }
    this.commonService.campusForm(this.contactForm.value).subscribe((data: Response) => {
      if (data.statusCode != 200 && data.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(data.Error));
      } else {
        this.sharedService.showMessage(0,'Thank You for applying. Your Data is saved successfully, We will contact you soon.!!');
        this.router.navigate(['../programs/campus-hero']);
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      this.contactForm.patchValue({
        'token': token
      });
    });
  }
}
