<template>
  <form>
    <ion-list-header class="ion-no-padding" style="min-height: auto">
      <ion-label class="ion-text-center ion-margin-bottom bold text-large" color="dark">
        Shipping details
      </ion-label>
    </ion-list-header>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Delivery address</ion-label>
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
          <ion-label position="stacked">Contact phone</ion-label>
          <ion-input type="tel" name="phone" v-model="phone"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ phoneError }}</span>
        </ion-text>
      </ion-col>
      <ion-col>
        <ion-item class="item-select" lines="none">
          <ion-label position="stacked">Delivery time</ion-label>
          <select name="deliveryTime" v-model="deliveryTime" class="text-small">
            <option :value="null" disabled selected>Select time</option>
            <option v-for="time in times" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ deliveryTimeError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col>
        <ion-item lines="none">
          <ion-label position="stacked">Note</ion-label>
          <ion-input type="text" name="note" v-model="note"></ion-input>
        </ion-item>
        <ion-text color="danger">
          <span class="text-tiny">{{ noteError }}</span>
        </ion-text>
      </ion-col>
    </ion-row>

    <div class="flex align-items-center full-width ion-margin-top">
      <div class="ion-margin-end">
        <h5 class="text-medium bold">Upload image</h5>
        <ion-button
          strong
          shape="round"
          color="medium"
          size="small"
          @click="presentActionSheet()"
        >
          Select
        </ion-button>
      </div>
      <div>
        <img class="img-thumb" :src="imagePath" v-if="imagePath" />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonListHeader,
  IonRow,
  IonCol,
  IonText,
  actionSheetController,
} from "@ionic/vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  useForm,
  useField,
  useValidateForm,
  useFormValues,
} from "vee-validate";
import { object, string } from "yup";

export default defineComponent({
  name: "ShippingForm",
  setup() {
    // Define a validation schema
    const validationSchema = object({
      address: string().required("Address is required"),
      phone: string().required("Phone is required"),
      deliveryTime: string().required("Delivery time is required"),
      note: string().required("Note is required"),
    });

    // Create a form context with the validation schema
    useForm({
      validationSchema: validationSchema,
    });

    const values = useFormValues();
    const validate = useValidateForm();

    const { value: address, errorMessage: addressError } = useField("address");

    const { value: phone, errorMessage: phoneError } = useField("phone");

    const { value: deliveryTime, errorMessage: deliveryTimeError } =
      useField("deliveryTime");

    const { value: note, errorMessage: noteError } = useField("note");

    const imagePath = ref("");

    const times: string[] = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ];

    const convertBlobToBase64 = (blob: Blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
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

        imagePath.value = image.webPath as string;

        const response = await fetch(image.webPath as string);
        const blob = await response.blob();

        const base64 = (await convertBlobToBase64(blob)) as string;

        // Send encoded string to server...
      } catch (error) {
        console.warn(error);
      }
    };

    const presentActionSheet = async () => {
      const actionSheet = await actionSheetController.create({
        header: "Choose an option",
        buttons: [
          {
            text: "Photo Library",
            handler: () => {
              chooseImage(CameraSource.Photos);
            },
          },
          {
            text: "Camera",
            handler: () => {
              chooseImage(CameraSource.Camera);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      });

      return actionSheet.present();
    };

    return {
      presentActionSheet,
      imagePath,
      times,
      address,
      addressError,
      phone,
      phoneError,
      deliveryTime,
      deliveryTimeError,
      note,
      noteError,
      validate,
      formValues: values,
    };
  },
  components: {
    IonButton,
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

  ion-input, select {
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

select {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 10px 6px;
}

.img-thumb {
  width: 45px;
  height: 55px;
  object-fit: cover;
  display: block;
}
</style>