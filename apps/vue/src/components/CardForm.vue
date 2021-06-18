<template>
  <form>
    <ion-list-header class="ion-no-padding" style="min-height: auto">
      <ion-label class="ion-text-center ion-margin-bottom bold text-large" color="dark">Pay order</ion-label>
    </ion-list-header>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Card number</ion-label>
          <ion-input
            type="text"
            name="number"
            inputmode="numeric"
            v-model="number"
          ></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ numberError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Expiration</ion-label>
          <ion-input
            type="text"
            name="expiration"
            inputmode="numeric"
            v-model="expiration"
          ></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ expirationError }}</span>
        </ion-text>
      </ion-col>

      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">CVV</ion-label>
          <ion-input
            type="text"
            name="cvv"
            inputmode="numeric"
            v-model="cvv"
          ></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ cvvError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonListHeader,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/vue";
import {
  useForm,
  useField,
  useValidateForm,
  useFormValues,
} from "vee-validate";
import { object, string } from "yup";

export default defineComponent({
  name: "CardForm",
  setup() {
    // Define a validation schema
    const validationSchema = object({
      number: string().required("Card number is required"),
      expiration: string().required("Card expiration is required"),
      cvv: string().required("CVV is required"),
    });

    // Create a form context with the validation schema
    useForm({
      validationSchema: validationSchema,
    });

    const values = useFormValues();
    const validate = useValidateForm();

    const { value: number, errorMessage: numberError } = useField("number");

    const { value: expiration, errorMessage: expirationError } =
      useField("expiration");

    const { value: cvv, errorMessage: cvvError } = useField("cvv");

    return {
      number,
      numberError,
      expiration,
      expirationError,
      cvv,
      cvvError,
      validate,
      formValues: values,
    };
  },
  components: {
    IonText,
    IonItem,
    IonLabel,
    IonInput,
    IonListHeader,
    IonRow,
    IonCol,
  },
});
</script>

<style lang="scss" scoped>
ion-item {
  --padding-start: 0;
  --background-focused: transparent;
  --min-height: 65px;
  ion-label {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
    font-size: 14px !important;

    &.md {
      transform: none !important;
    }
  }

  ion-input {
    border: 1px solid #cbcbcb;
    border-radius: 3px;
    font-size: 14px;
    --padding-start: 10px !important;
    --padding-top: 10px !important;
    --padding-bottom: 10px !important;
  }
}

ion-row {
  margin-bottom: 5px;
}

ion-col {
  --ion-grid-column-padding: 0 5px;
}

ion-list-header ion-label {
  margin-top: 16px;
}
</style>