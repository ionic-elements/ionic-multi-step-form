import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonListHeader, IonRow, IonText, useIonActionSheet } from '@ionic/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const validationSchema = yup.object().shape({
  shippingAddress: yup.string().required('Address is required'),
  shippingContactPhone: yup.string().required('Phone is required'),
  shippingDeliveryTime: yup.string().required('Delivery time is required'),
  shippingNote: yup.string().required('Message is required'),
});

const ShippingForm = (props: any, ref: any) => {

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

  const [times] = useState<string[]>([
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
  ]);

  const [imagePath, setImagePath] = useState<string>('');

  const [present] = useIonActionSheet();

  const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

  const chooseImage = async (source: CameraSource) => {

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

      setImagePath(image.webPath as string);

      const response = await fetch(image.webPath as string);
      const blob = await response.blob();

      const base64 = await convertBlobToBase64(blob) as string;

      // Send encoded string to server...

    } catch (error) {
      console.warn(error);
    }

  }

  const onPresentActionSheet = () => {

    present({
      buttons: [
        {
          text: 'Photo Library',
          handler: () => chooseImage(CameraSource.Photos),
        },
        {
          text: 'Camera',
          handler: () => chooseImage(CameraSource.Camera),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ],
      header: 'Choose an option',
    })
  }

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
        <IonLabel className="ion-text-center bold ion-margin-bottom text-large" color="dark">Shipping details</IonLabel>
      </IonListHeader>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Delivery address</IonLabel>
            <IonInput type="text" {...register('shippingAddress')}></IonInput>
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.shippingAddress?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Contact phone</IonLabel>
            <IonInput type="tel" {...register('shippingContactPhone')}></IonInput>
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.shippingContactPhone?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>

        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Delivery time</IonLabel>
            <select {...register('shippingDeliveryTime')}>
              {times.map((time: string) => <option key={time}>{time}</option>)}
            </select>
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.shippingDeliveryTime?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonItem lines="none">
            <IonLabel position="stacked">Note</IonLabel>
            <IonInput type="text" {...register('shippingNote')}></IonInput>
          </IonItem>
          <IonText color="danger">
            <span className="text-tiny" style={{
              visibility: errors.shippingNote?.type === 'required' ? 'visible' : 'hidden'
            }}>
              Field required
            </span>
          </IonText>
        </IonCol>
      </IonRow>

      <div className="flex align-items-center full-width ion-margin-top">
        <div className="ion-margin-end">
          <h5 className="text-medium bold">Upload image</h5>
          <IonButton strong shape="round" color="medium" size="small" onClick={onPresentActionSheet}>Select</IonButton>
        </div>
        <div>
          {imagePath && <img className="img-thumb" src={imagePath} />}
        </div>
      </div>

    </form>
  );
};

export default forwardRef(ShippingForm);
