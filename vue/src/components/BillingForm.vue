<template>
  <form>
    <ion-list-header class="ion-no-padding" style="min-height: auto">
      <ion-label class="ion-text-center ion-margin-bottom bold text-large" color="dark">
        Billing details
      </ion-label>
    </ion-list-header>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">First name</ion-label>
          <ion-input
            type="text"
            name="firstName"
            v-model="firstName"
          ></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ firstNameError }}</span>
        </ion-text>
      </ion-col>

      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Last name</ion-label>
          <ion-input type="text" name="lastName" v-model="lastName"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ lastNameError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Email</ion-label>
          <ion-input type="email" name="email" v-model="email"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ emailError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Address</ion-label>
          <ion-input type="text" name="address" v-model="address"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ addressError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">City</ion-label>
          <ion-input type="text" name="city" v-model="city"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ cityError }}</span>
        </ion-text>
      </ion-col>

      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">State</ion-label>
          <ion-input type="text" name="state" v-model="state"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ stateError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Zipcode</ion-label>
          <ion-input
            type="text"
            inputmode="numeric"
            name="zipcode"
            v-model="zipcode"
          ></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ zipcodeError }}</span>
        </ion-text>
      </ion-col>

      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Country code</ion-label>
          <ion-input
            type="text"
            placeholder="two-letter code"
            name="countryCode"
            v-model="countryCode"
          ></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ countryCodeError }}</span>
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
  name: "BillingForm",
  setup() {
    // Define a validation schema
    const validationSchema = object({
      firstName: string().required("First name is required"),
      lastName: string().required("Last name is required"),
      email: string().required("Email is required"),
      address: string().required("Address is required"),
      city: string().required("City is required"),
      state: string().required("State is required"),
      zipcode: string().required("Zipcode is required"),
      countryCode: string().required("Country code is required"),
    });

    // Create a form context with the validation schema
    useForm({
      validationSchema: validationSchema,
    });

    const values = useFormValues();
    const validate = useValidateForm();

    const { value: firstName, errorMessage: firstNameError } =
      useField("firstName");
    const { value: lastName, errorMessage: lastNameError } =
      useField("lastName");

    const { value: email, errorMessage: emailError } = useField("email");

    const { value: address, errorMessage: addressError } = useField("address");

    const { value: city, errorMessage: cityError } = useField("city");

    const { value: state, errorMessage: stateError } = useField("state");

    const { value: zipcode, errorMessage: zipcodeError } = useField("zipcode");

    const { value: countryCode, errorMessage: countryCodeError } =
      useField("countryCode");

    return {
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      email,
      emailError,
      address,
      addressError,
      city,
      cityError,
      state,
      stateError,
      zipcode,
      zipcodeError,
      countryCode,
      countryCodeError,
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