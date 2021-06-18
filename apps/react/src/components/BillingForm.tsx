import { IonCol, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonText } from '@ionic/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { forwardRef, useImperativeHandle } from 'react';

const validationSchema = yup.object().shape({
  billingFirstName: yup.string().required('First name is required'),
  billingLastName: yup.string().required('Last name is required'),
  billingEmail: yup.string().required('Email is required'),
  billingAddress: yup.string().required('Address is required'),
  billingCity: yup.string().required('City is required'),
  billingState: yup.string().required('State is required'),
  billingZipcode: yup.string().required('Zipcode is required'),
  billingCountryCode: yup.string().required('Country code is required'),
});

const BillingForm = (props: any, ref: any) => {

  const {
    formState: {
      errors,
    },
    getValues,
    register,
    trigger,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  useImperativeHandle(ref, () => ({

    onTrigger() {
      return trigger();
    },

    getFormValues() {
      return getValues();
    }

  }), []);

  return (
    <form>

      <IonListHeader className="ion-no-padding" style={{ minHeight: 'auto' }}>
        <IonLabel className="ion-text-center bold ion-margin-bottom text-large" color="dark">Billing details</IonLabel>
      </IonListHeader>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">First name</IonLabel>
            <IonInput type="text" {...register('billingFirstName')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingFirstName?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>

        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Last name</IonLabel>
            <IonInput type="text" {...register('billingLastName')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingLastName?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" {...register('billingEmail')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingEmail?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Address</IonLabel>
            <IonInput type="text" {...register('billingAddress')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingAddress?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">City</IonLabel>
            <IonInput type="text" {...register('billingCity')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingCity?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>

        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">State</IonLabel>
            <IonInput type="text" {...register('billingState')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingState?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Zipcode</IonLabel>
            <IonInput type="text" inputmode="numeric" {...register('billingZipcode')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingZipcode?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>

        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Country code</IonLabel>
            <IonInput type="text" {...register('billingCountryCode')} />
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.billingCountryCode?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

    </form>
  );
};

export default forwardRef(BillingForm);
