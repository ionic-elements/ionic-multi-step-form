import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSlide, IonSlides, IonTitle, IonToolbar, useIonRouter, useIonViewDidEnter } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';

import { useRef, useState } from 'react';

import { FormattedNumber } from 'react-intl';

import './Checkout.scss';

import BillingForm from '../components/BillingForm';
import ShippingForm from '../components/ShippingForm';
import CardForm from '../components/CardForm';

const MultiStepForm: React.FC = () => {

  const ionSlides = useRef<HTMLIonSlidesElement>(null);
  const ionContent = useRef<HTMLIonContentElement>(null);
  const billingFormRef = useRef<any>(null);
  const shippingFormRef = useRef<any>(null);
  const cardFormRef = useRef<any>(null);

  const ionRouter = useIonRouter();

  const [cart] = useState({
    id: 1,
    items: [{
      id: 1,
      name: 'Denim T-Shirt',
      amount: 15.00,
    }, {
      id: 2,
      name: 'Denim Pants',
      amount: 5.00,
    }, {
      id: 3,
      name: 'Black T-Shirt',
      amount: 5.00,
    }],
    subtotal: 25.00,
    shippingFee: 5.00,
    total: 30.00,
  });

  const [slides] = useState<string[]>(['Billing', 'Shipping', 'Summary', 'Payment']);
  const [currentSlide, setIsCurrentSlide] = useState('Billing');
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [formData, setFormData] = useState<any>({});

  useIonViewDidEnter(() => {
    ionSlides.current!.update();
    ionSlides.current!.updateAutoHeight();
  }, []);

  const slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  const camel2title = (camelCase: string) => {
    return camelCase
      .replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase())
      .trim();
  }

  const onSlidesWillChange = async () => {
    const index = await ionSlides.current!.getActiveIndex();
    const isBeginning = await ionSlides.current!.isBeginning();
    const isEnd = await ionSlides.current!.isEnd();

    setIsCurrentSlide(slides[index]);
    setIsBeginning(isBeginning);
    setIsEnd(isEnd);
  }

  const onSlidesDidChange = () => {
    ionContent.current!.scrollToTop();
  }

  const onBackButtonTouched = () => {
    ionSlides.current!.slidePrev();
    ionContent.current!.scrollToTop();
  }

  const onNextButtonTouched = async () => {

    if (currentSlide === 'Billing') {

      const isValid = await billingFormRef.current!.onTrigger();

      if (isValid) {

        setFormData({
          billing: billingFormRef.current!.getFormValues()
        });

        ionSlides.current!.slideNext();
        ionContent.current!.scrollToTop();
      }

    } else if (currentSlide === 'Shipping') {

      const isValid = await shippingFormRef.current!.onTrigger();

      if (isValid) {

        setFormData({
          shipping: shippingFormRef.current!.getFormValues(),
          ...formData,
        });

        ionSlides.current!.slideNext();
        ionContent.current!.scrollToTop();
      }

    } else if (currentSlide === 'Summary') {

      ionSlides.current!.slideNext();
      ionContent.current!.scrollToTop();

    } else if (currentSlide === 'Payment') {

      const isValid = await cardFormRef.current!.onTrigger();

      if (isValid) {

        setFormData({
          card: cardFormRef.current!.getFormValues(),
          ...formData,
        });

        ionRouter.push('/thanks', 'forward', 'replace');
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={ionContent} className="ion-padding">
        <div>

          <div className="flex justify-content-space-between ion-margin-top relative">
            <div className="absolute full-width line"></div>

            {slides.map((slide: string, index: number) => {
              return (
                <div key={index} className="flex flex-column justify-content-center full-width">
                  <span className={`flex flex-column align-items-center justify-content-center align-self-center bold text-medium radius`}
                    style={{
                      background: slide === currentSlide ? 'var(--ion-color-success)' : 'var(--ion-color-light-shade)',
                      color: slide === currentSlide ? 'var(--ion-color-light)' : 'var(--ion-color-dark)',
                      width: '30px',
                      height: '30px'
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ color: slide === currentSlide ? 'var(--ion-color-success)' : 'var(--ion-color-dark)'}}
                    className={`flex text-medium bold ion-margin-vertical align-self-center`}>
                    {slide}
                  </span>
                </div>
              )
            })}
          </div>

          <IonSlides ref={ionSlides} options={slidesOpts} onIonSlideDidChange={onSlidesDidChange}
            onIonSlideWillChange={onSlidesWillChange}>
            {slides.map((slide: string, index: number) => {

              return (
                <IonSlide key={index}>
                  <div className="full-width ion-text-start">

                    {slide === 'Billing' && <BillingForm ref={billingFormRef} />}

                    {slide === 'Shipping' && <ShippingForm ref={shippingFormRef} />}

                    {slide === 'Summary' &&
                      <>
                        <IonListHeader className="ion-no-padding" style={{ minHeight: 'auto' }}>
                          <IonLabel className="ion-text-center bold ion-margin-bottom text-large" color="dark">Cart details</IonLabel>
                        </IonListHeader>

                        <p className="text-medium bold ion-text-uppercase">Billing details</p>
                        <div className="divider"></div>

                        <div>
                          {formData.billing && Object.entries(formData.billing).map(([key, value]) => {
                            return (
                              <p key={key} className="text-medium margin-v-sm">
                                <span className="bold">{camel2title(key)}:</span> {value}
                              </p>
                            )
                          })}
                        </div>

                        <div className="divider"></div>
                        <p className="text-medium bold ion-text-uppercase">Shipping details</p>
                        <div className="divider"></div>

                        <div>
                          {formData.shipping && Object.entries(formData.shipping).map(([key, value]) => {
                            return (
                              <p key={key} className="text-medium margin-v-sm">
                                <span className="bold">{camel2title(key)}:</span> {value}
                              </p>
                            )
                          })}
                        </div>

                        <div className="divider"></div>
                        <p className="text-medium bold ion-text-uppercase">Items</p>
                        <div className="divider"></div>

                        <IonList>
                          {cart.items.map((item: any) => {
                            return (
                              <IonItem key={item.id}>
                                <IonLabel>
                                  <h2 className="text-medium bold">{item.name}</h2>
                                </IonLabel>
                                <div>
                                  <span className="text-medium">
                                    <FormattedNumber value={item.amount} style="currency" currency="USD" />
                                  </span>
                                </div>
                              </IonItem>
                            )
                          })}

                          <IonItem>
                            <IonLabel>
                              <h2 className="text-medium bold">Subtotal</h2>
                            </IonLabel>
                            <div>
                              <span className="text-medium">
                                <FormattedNumber value={cart.subtotal} style="currency" currency="USD" />
                              </span>
                            </div>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <h2 className="text-medium bold">Shipping &amp; Handling</h2>
                            </IonLabel>
                            <div>
                              <span className="text-medium">
                                <FormattedNumber value={cart.shippingFee} style="currency" currency="USD" />
                              </span>
                            </div>
                          </IonItem>
                          <IonItem>
                            <IonLabel>
                              <h2 className="text-medium bold">Total</h2>
                            </IonLabel>
                            <div>
                              <span className="text-medium bold">
                                <FormattedNumber value={cart.total} style="currency" currency="USD" />
                              </span>
                            </div>
                          </IonItem>

                        </IonList>
                      </>
                    }

                    {slide === 'Payment' &&
                      <>
                        <CardForm ref={cardFormRef} />
                        <div className="ion-text-center">
                          <IonButton type="button" style={{ width: '200px' }} className="ion-margin-vertical" strong size="large"
                            shape="round" color="success" onClick={onNextButtonTouched}>Pay <FormattedNumber value={cart.total} style="currency" currency="USD" /></IonButton>
                        </div>

                        <div className="ion-text-center">
                          <IonButton type="button" style={{ width: '200px' }} className="ion-margin-vertical" strong size="large"
                            shape="round" color="medium" onClick={onBackButtonTouched}>Back</IonButton>
                        </div>
                      </>
                    }

                  </div>
                </IonSlide>

              )
            })}

          </IonSlides>

        </div>

      </IonContent >

      <IonFooter>
        <IonToolbar>
          <div className="full-width flex align-items-center ion-padding-horizontal justify-content-space-between">
            <IonButton style={{ width: '120px', visibility: isBeginning || isEnd ? 'hidden' : '' }} strong shape="round" color="dark" onClick={onBackButtonTouched}>
              <span>Back</span>
              <IonIcon slot="start" icon={chevronBack}></IonIcon>
            </IonButton>
            <IonButton style={{ width: '120px', visibility: isEnd ? 'hidden' : '' }} strong shape="round" color="success" onClick={onNextButtonTouched}>
              <span>Next</span>
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>

    </IonPage >
  )
}

export default MultiStepForm;

