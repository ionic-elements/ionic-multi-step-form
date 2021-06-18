import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
const { Camera } = Plugins;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('billingFormRef', { static: false }) billingFormRef: NgForm;
  @ViewChild('shippingFormRef', { static: false }) shippingFormRef: NgForm;
  @ViewChild('paymentFormRef', { static: false }) paymentFormRef: NgForm;

  public cart: any = {
    id: 1,
    items: [{
      id: 1,
      name: 'Denim T-Shirt',
      amount: 15.00,
    }, {
      id: 1,
      name: 'Denim Pants',
      amount: 5.00,
    }, {
      id: 1,
      name: 'Black T-Shirt',
      amount: 5.00,
    }],
    subtotal: 25.00,
    shippingFee: 5.00,
    total: 30.00, 
  };

  public billingForm: FormGroup;
  public paymentForm: FormGroup;
  public shippingForm: FormGroup;

  public imagePath: SafeResourceUrl;

  public times = [];

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;

  get billingFirstName(): AbstractControl {
    return this.billingForm.get('first_name');
  }

  get billingLastName(): AbstractControl {
    return this.billingForm.get('last_name');
  }

  get billingEmail(): AbstractControl {
    return this.billingForm.get('email');
  }

  get billingAddress(): AbstractControl {
    return this.billingForm.get('address');
  }

  get billingCity(): AbstractControl {
    return this.billingForm.get('city');
  }

  get billingState(): AbstractControl {
    return this.billingForm.get('state');
  }

  get billingZip(): AbstractControl {
    return this.billingForm.get('zip');
  }

  get billingCountryCode(): AbstractControl {
    return this.billingForm.get('country_code');
  }

  get shippingAddress(): AbstractControl {
    return this.shippingForm.get('address');
  }

  get shippingPhone(): AbstractControl {
    return this.shippingForm.get('phone');
  }

  get shippingDeliveryTime(): AbstractControl {
    return this.shippingForm.get('delivery_time');
  }

  get paymentNumber(): AbstractControl {
    return this.paymentForm.get('number');
  }

  get paymentExpiration(): AbstractControl {
    return this.paymentForm.get('expiration');
  }

  get paymentCvv(): AbstractControl {
    return this.paymentForm.get('cvv');
  }

  constructor(private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.setupForm();
    this.buildSlides();
    this.times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  }

  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
  }

  buildSlides() {
    const slides = ['Billing', 'Shipping', 'Summary', 'Payment'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  setupForm() {
    this.billingForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      country_code: new FormControl('', Validators.required),
    });

    this.shippingForm = new FormGroup({
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      delivery_time: new FormControl(null, Validators.required),
      note: new FormControl(''),
    });

    this.paymentForm = new FormGroup({
      number: new FormControl('', Validators.required),
      expiration: new FormControl('', Validators.required),
      cvv: new FormControl('', Validators.required),
    });
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {
    
    if (this.currentSlide === 'Billing') {

      this.billingFormRef.onSubmit(undefined);

      if (this.billingForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Shipping') {
      
      this.shippingFormRef.onSubmit(undefined);

      if (this.shippingForm.valid) {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Payment') {

      this.paymentFormRef.onSubmit(undefined);

      if (this.paymentForm.valid) {
        this.navCtrl.navigateRoot('/thanks', {
          animated: true,
          animationDirection: 'forward',
        });
      }

    }  else {

      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  async chooseImage(source: CameraSource) {

    try {

      const image = await Camera.getPhoto({
        quality: 70,
        width: 600,
        height: 600,
        preserveAspectRatio: true,
        allowEditing: true,
        correctOrientation: true,
        source: source,
        resultType: CameraResultType.Uri,
      });

      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
      this.imagePath = safeUrl;

      const response = await fetch(image.webPath);
      const blob = await response.blob();

      const base64 = await this.convertBlobToBase64(blob) as string;

      // Send encoded string to server...

    } catch (error) {
      console.warn(error);
    }

  }

  async presentActionSheet() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose an option',
      buttons: [{
        text: 'Photo Library',
        handler: () => {
          this.chooseImage(CameraSource.Photos);
        }
      }, {
        text: 'Camera',
        handler: () => {
          this.chooseImage(CameraSource.Camera);
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });

    return await actionSheet.present();
  }

  originalOrder = (): number => {
    return 0;
  }

}
