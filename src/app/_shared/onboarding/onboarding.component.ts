import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response, ShopCategories } from '@models'
import { ComboDetailsService, CommonService, SharedService } from '@service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { passwordValidator } from './password-validator';

@Component({
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss','../spinner/spinner.component.scss']
})
export class OnboardingComponent implements OnInit {

  uploadImageUrl: SafeUrl = 'assets/icons/onboard/uploadfile.png';
  selectedTab = 0;
  categories: Array<ShopCategories> = [];

  shopForm!: FormGroup;
  shopAddressForm!: FormGroup;
  userForm!: FormGroup;
  shopSettingsForm!: FormGroup;
  orderSettingsForm!: FormGroup;
  shopOtherForm!: FormGroup;
  qr = '';
  qrCodes: Array<string> = [];
  submitted = false;

  loading = false;
  showPassword = false;
  loginMessage = '';

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private comboDetailService: ComboDetailsService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer,
    ) {
  }

  ngOnInit() {
    this.categoriesList();
    this.shopForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      code: ['', Validators.required],
      about: [''],
      profileImage: [''],
      shop_categories_id: [1, Validators.required],
      restroType: [0, Validators.required],
    });
    this.shopAddressForm = this.fb.group({
      addressLine: ['', Validators.required],
      landmark: [''],
      mapLink: [''],
      lat: ['', [Validators.required,Validators.pattern('^[-]?(([0-8]?[0-9])\.(\\d+))|(90(\.0+)?)$')]],
      long: ['', [Validators.required,Validators.pattern('^[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\\d+))|180(\.0+)?)$')]],
      city: ['', Validators.required],
      pincode: ['', [Validators.required,Validators.pattern('[0-9]{6}')]],
    });
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', [Validators.required, Validators.pattern('^[5-9]{1}[0-9]{9}$')]],
      isOnWhatsapp: [0],
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, passwordValidator()]],
    });
    this.shopSettingsForm = this.fb.group({
      isPayLaterEnabled: [1, Validators.required],
      isPayNowEnabled: [0, Validators.required],
      isWalkingAvailable: [1, Validators.required],
      isUserDetailRequired: [0, Validators.required],
      isUserVerificationRequired: [0, Validators.required],
      isGst: [0, Validators.required],
      gst_no: ['', Validators.pattern('^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$')],
      printItem: ['2', Validators.required],
      bankName: [''],
      accountNumber: ['', Validators.pattern('^[0-9]{9,18}$')],
      ifscCode: ['', Validators.pattern('^[A-Za-z]{4}[0][0-9]{6}$')],
      holderName: [''],
      upi: ['',Validators.pattern('^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z._]{2,49}$')],
    });
    this.orderSettingsForm = this.fb.group({
      isDineInAvailable: [0, Validators.required],
      isPickUpAvailable: [0, Validators.required],
      isDeliveryAvailble: [0, Validators.required],
      isRoomDropAvailable	: [0, Validators.required],
      isTablesActive: [0, Validators.required],
      noOfCounters: [1, Validators.required],
      isSelfDelivery: [0, Validators.required],
      isOnZomoto	: [0, Validators.required],
      isOnSwiggy: [0, Validators.required],
      isOnMagicPin: [0, Validators.required],
      isRoomsActive: [0, Validators.required],
    });
    this.shopOtherForm = this.fb.group({
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.shopForm.controls; }

  get g() { return this.shopAddressForm.controls; }

  get h() { return this.userForm.controls; }

  get i() { return this.shopSettingsForm.controls; }

  get j() { return this.shopOtherForm.controls; }

  get k() { return this.orderSettingsForm.controls; }

  addQr() {
    if(this.qr !== ''){
      this.qrCodes.push(this.qr);
      this.qr = '';
    }
  }

  deleteQr(index: number) {
    this.qrCodes.splice(index, 1);
  }

  slugGenerate(){
    let slug = this.f['title'].value;
    this.shopForm.patchValue({
      'slug': slug.toLowerCase().replace(/[^\w-]+/g, '-'),
      'code': '10' + Math.floor(100 + Math.random() * 900)
    });
  }

  updateImage(){
    $('#image').click();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
      this.shopForm.patchValue({
        'profileImage': file
      });
      let imageUrl  = URL.createObjectURL(file);
      this.uploadImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
    }
  }

  nextStep(form: FormGroup, to: number){
    this.submitted = true;
    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.submitted = false;
    if(to === 3){
      this.userForm.patchValue({
        'isOnWhatsapp':  this.userForm.value.isOnWhatsapp?1:0,
      });
    }else if(to === 4){
      this.shopSettingsForm.patchValue({
        'isPayLaterEnabled':  this.shopSettingsForm.value.isPayLaterEnabled?1:0,
        'isPayNowEnabled': this.shopSettingsForm.value.isPayNowEnabled?1:0,
        'isWalkingAvailable': this.shopSettingsForm.value.isWalkingAvailable?1:0,
        'isUserDetailRequired': this.shopSettingsForm.value.isUserDetailRequired?1:0,
        'isUserVerificationRequired': this.shopSettingsForm.value.isUserVerificationRequired?1:0,
        'isGst': this.shopSettingsForm.value.isGst?1:0,
      });
    }else if(to === 5){
      this.orderSettingsForm.patchValue({
        'isDineInAvailable':  this.orderSettingsForm.value.isDineInAvailable?1:0,
        'isPickUpAvailable': this.orderSettingsForm.value.isPickUpAvailable?1:0,
        'isDeliveryAvailble':  this.orderSettingsForm.value.isDeliveryAvailble?1:0,
        'isRoomDropAvailable': this.orderSettingsForm.value.isRoomDropAvailable?1:0,
        'isTablesActive': this.orderSettingsForm.value.isTablesActive?1:0,
        'isSelfDelivery': this.orderSettingsForm.value.isSelfDelivery?1:0,
        'isOnZomoto': this.orderSettingsForm.value.isOnZomoto?1:0,
        'isOnSwiggy': this.orderSettingsForm.value.isOnSwiggy?1:0,
        'isOnMagicPin': this.orderSettingsForm.value.isOnMagicPin?1:0,
        'isRoomsActive': this.orderSettingsForm.value.isRoomsActive?1:0
      });
    }else if(to === 6){
      this.submit();
      return;
    }
    this.selectedTab = to;
  }

  validateTime(type: number, time: string | undefined){
    //Basic Validations
    if(time === ''){
      return false;
    }else if(!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time as string)){
      return false
    }else if(type === 1 && Date.parse('01/01/2011 ' +  time) <= Date.parse('01/01/2011 ' + this.shopOtherForm.value.openTime ) ){
      return false;
    }
    return true;
  }

  updateTime(type: number, ev: any){
    if(type === 0){
      this.shopOtherForm.patchValue({
        'openTime':  ev.target.value
      });
    }else if(type === 1){
      this.shopOtherForm.patchValue({
        'closeTime':  ev.target.value
      });
    }
  }

  submit() {
    this.submitted = true;
    if (this.shopForm.invalid || this.shopAddressForm.invalid || this.userForm.invalid || this.shopSettingsForm.invalid || this.orderSettingsForm.invalid || this.shopOtherForm.invalid) {
      this.loginMessage = 'All Fill all required fields';
      return;
    }
    this.loginMessage = '';
    this.loading = true;
    const formData = new FormData();
    Object.entries(this.shopForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
    });
    Object.entries(this.shopAddressForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
    });
    Object.entries(this.userForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
    });
    Object.entries(this.shopSettingsForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
    });
    Object.entries(this.orderSettingsForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
    });
    Object.entries(this.shopOtherForm.value).forEach(
      ([key, value]: any[]) => {
        formData.set(key, value);
    });
    formData.append('qrCode', JSON.stringify(this.qrCodes));
    this.commonService.onBoardingForm(formData).subscribe((data: Response) => {
        if (data.statusCode != 200 && data.statusCode != 201) {
          this.sharedService.showMessage(1,this.sharedService.errorMessage(data.Error));
          this.loginMessage = this.sharedService.errorMessage(data.Error);
        } else {
          this.sharedService.showMessage(0,"Onboarding successfully !!");
          this.selectedTab = 6;
        }
        this.loading = false;
      },
      error => {
        this.sharedService.showMessage(1,'Something Went Wrong');
        this.loginMessage = 'Something Went Wrong';
        this.loading = false;
      });
  }

  categoriesList(){
    this.comboDetailService.getShopCategories().subscribe((response: Response) => {
      if (response.statusCode != 200 && response.statusCode != 201) {
        this.sharedService.showMessage(1,this.sharedService.errorMessage(response.Error));
      } else {
        if(response.data){
          this.categories = response.data;
        }
      }
    },
    error => {
      this.sharedService.showMessage(1,'Something Went Wrong');
    });
  }
}
