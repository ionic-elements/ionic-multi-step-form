<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title> Thanks </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="flex-center">
        <ion-icon :icon="checkmarkCircle" color="success"></ion-icon>
        <div class="ion-padding">
          <ion-text color="dark">
            <h2 class="bold">Order Successfully Placed</h2>
            <p>Your payment has been processed and your order is complete.</p>
          </ion-text>
        </div>

        <div style="width: 300px; margin: 0 auto">
          <div class="ion-margin-vertical">
            <ion-button
              size="large"
              shape="round"
              color="dark"
              expand="block"
              @click="onHomeButtonTouched"
            >
              Go home
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonIcon,
  IonButton,
  IonText,
} from "@ionic/vue";
import { checkmarkCircle } from "ionicons/icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Thanks",
  setup() {
    const router = useRouter();

    const onHomeButtonTouched = () => {
      router.push({
        path: "/",
        replace: true,
      });
    };
    return {
      onHomeButtonTouched,
      checkmarkCircle,
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonText,
  },
});
</script>

<style lang="scss" scoped>
h2.text {
  font-size: 2rem;
}

.text {
  font-size: 1.5rem;
}

ion-icon {
  font-size: 6em;
}
</style>