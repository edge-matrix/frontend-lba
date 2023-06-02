import { Component, HostListener, OnInit, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@models'
import { ToastrService } from 'ngx-toastr'
import { AuthenticationService, SharedService, SocialService } from '@service';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/_services/shared-service/storage.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../spinner/spinner.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginWithOtp = false;
  sendingOTP = true;
  isPasswordShow = false;
  loginForm!: FormGroup;
  submitted = false;

  medium = 'direct';
  loading = false;
  returnUrl: string = '';
  @ViewChildren('formRow') rows: any;
  @HostListener('window:message', ['$event'])
  onMessage(e: any)
  {
    this.commonSocialLogin(e);
  }

  constructor(
    private fb: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private socialService: SocialService,
    private sharedService: SharedService,
    private storageService: StorageService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loginMediumUpdate();
    if(this.route.snapshot.queryParams['code'])
    {
      this.socialService.redirectFunction(this.route.snapshot.queryParams['code']);
    }
    if(this.route.snapshot.queryParams['error'])
    {
      this.socialService.redirectFunction('Error');
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginMediumUpdate(){
    this.isLoginWithOtp = this.isLoginWithOtp?false:true;
    if(this.isLoginWithOtp){
      this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern('^[5-9]{1}[0-9]{9}$')]],
        type: ['1', Validators.required],
        token: ['', Validators.required],
        code: this.fb.group({
          input1: [''],
          input2: [''],
          input3: [''],
          input4: [''],
        })
      });
    }else{
      this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern('^[5-9]{1}[0-9]{9}$')]],
        type: ['1', Validators.required],
        token: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      this.loginForm.patchValue({
        'token': token
      });
    });
    this.submitted = false;
    this.sendingOTP = true;
  }

  keyUpEvent(event: { key: string; keyCode: number; which: number; }, index: number) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1 ;
    } else if(/^[0-9]$/i.test(event.key)){
      const val = this.loginForm.get('code.input'+(index+1))?.value;
      if(val || val == 0){
        pos = index + 1 ;
        this.loginForm.get('code.input'+(index+1))?.setValue(val%10);
      }
    }
    if (pos > -1 && pos < 4 ) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // Login With OTP
  sendOtp() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.sendOTP(this.f['username'].value, this.f['type'].value, this.f['token'].value).subscribe((data: Response) => {
        if (data.statusCode != 200 && data.statusCode != 201) {
          this.toastr.error(this.sharedService.errorMessage(data.Error));
        } else {
          this.toastr.success("OTP Send to Your Number, Please check!");
          this.sendingOTP = false;
        }
        this.loading = false;
      },
      error => {
          this.toastr.error('Something Went Wrong');
          this.loading = false;
      });
      this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
        this.loginForm.patchValue({
          'token': token
        });
      });
  }

  resendOtp(){
    this.sendingOTP = true;
    this.sendOtp();
  }

  extractOTPCode(){
    let code = '';
    Object.entries(this.f['code'].value).forEach(e => {
      const [, value] = e;
      code += value;
    });
    return code;
  }

  verifyOtp() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.verifyOTP(this.f['username'].value, this.f['type'].value, this.f['token'].value, this.extractOTPCode()).subscribe((data: Response) => {
        if (data.statusCode != 200 && data.statusCode != 201) {
          this.toastr.error(this.sharedService.errorMessage(data.Error));
        } else {
          this.toastr.success("Login Successfully !!");
          this.storageService.updateUser(data.data);
          this.router.navigate([this.returnUrl]);
        }
        this.loading = false;
      },
        error => {
          this.toastr.error('Something Went Wrong');
          this.loading = false;
      });
      this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
        this.loginForm.patchValue({
          'token': token
        });
      });
  }

  // Login With Password
  loginWithPassword() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.loginWithPassword(this.f['username'].value, this.f['password'].value, this.f['type'].value, this.f['token'].value).subscribe((data: Response) => {
        if (data.statusCode != 200 && data.statusCode != 201) {
          this.toastr.error(this.sharedService.errorMessage(data.Error));
        } else {
          this.toastr.success("Login Successfully !!");
          this.storageService.updateUser(data.data);
          this.router.navigate([this.returnUrl]);
        }
        this.loading = false;
      },
        error => {
          this.toastr.error('Something Went Wrong');
          this.loading = false;
      });
      this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
        this.loginForm.patchValue({
          'token': token
        });
      });
  }

  // Login With Social Login
  commonSocialLogin(e: any){
    if(e.data.value == 'Error'){
      this.toastr.error('Social login attempt failed.');
    }else if(e.data.value != undefined){
      this.loading = true;
      this.authService.socialLogin(this.medium, e.data.value).subscribe((data: Response) => {
        if (data.statusCode != 200 && data.statusCode != 201) {
          this.toastr.error(this.sharedService.errorMessage(data.Error));
        } else {
          this.toastr.success("Login Successfully !!");
          this.storageService.updateUser(data.data);
          this.router.navigate([this.returnUrl]);
        }
        this.loading = false;
      },
      error => {
        this.toastr.error('Something Went Wrong');
        this.loading = false;
      });
    }
  }

  signInWithGoogle(){
    let googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.Google_client_id}&redirect_uri=${environment.redirectUrl}&response_type=code&scope=profile email`;
    this.medium = '2';
    this.socialService.login(googleUrl);
  }
}
