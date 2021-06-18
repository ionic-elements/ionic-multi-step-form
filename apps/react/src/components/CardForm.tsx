import { IonCol, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonText } from '@ionic/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { forwardRef, useImperativeHandle } from 'react';

const validationSchema = yup.object().shape({
  cardNumber: yup.string().required('Card number is required'),
  cardExpiration: yup.string().required('Expiration is required'),
  cardCvv: yup.string().required('CVV is required'),
});

const CardForm = (props: any, ref: any) => {

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
        <IonLabel className="ion-text-center bold ion-margin-bottom text-large" color="dark">Pay order</IonLabel>
      </IonListHeader>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Card number</IonLabel>
            <IonInput type="text" inputmode="numeric" {...register('cardNumber')}></IonInput>
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.cardNumber?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Expiration</IonLabel>
            <IonInput type="text" inputmode="numeric" {...register('cardExpiration')}></IonInput>
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.cardExpiration?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>

        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">CVV</IonLabel>
            <IonInput type="text" inputmode="numeric" {...register('cardCvv')}></IonInput>
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.cardCvv?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

    </form>
  );
};

export default forwardRef(CardForm);
