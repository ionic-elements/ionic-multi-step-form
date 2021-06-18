import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import { checkmarkCircle } from "ionicons/icons";
import './Thanks.scss';

const Thanks: React.FC = () => {

  const ionRouter = useIonRouter();

  const onHomeButtonTouched = () => {
    ionRouter.push('/', 'forward', 'replace');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Thank you</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <div className="flex-center">

          <IonIcon icon={checkmarkCircle} color="success"></IonIcon>
          <div className="ion-padding">
            <IonText color="dark">
              <h2 className="bold">Order Successfully Placed</h2>
              <p>Your payment has been processed and your order is complete.</p>
            </IonText>
          </div>

          <div style={{ width: '300px', margin: '0 auto' }} >
            <div className="ion-margin-vertical">
              <IonButton size="large" shape="round" color="dark" expand="block" onClick={onHomeButtonTouched}>Go home</IonButton>
            </div>
          </div>

        </div>

      </IonContent>
    </IonPage>
  )
}

export default Thanks;