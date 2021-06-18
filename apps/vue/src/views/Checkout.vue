<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar color="dark">
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" ref="ionContent">
      <div>
        <div class="flex justify-content-space-between ion-margin-top relative">
          <div class="absolute full-width line"></div>
          <div
            class="flex flex-column justify-content-center full-width"
            v-for="(slide, index) in slides"
            :key="slide"
          >
            <span
              class="
                flex flex-column
                align-items-center
                justify-content-center
                align-self-center
                bold
                text-medium
                radius
              "
              :style="{
                background:
                  slide === currentSlide
                    ? 'var(--ion-color-success)'
                    : 'var(--ion-color-light-shade)',
                color:
                  slide === currentSlide
                    ? 'var(--ion-color-light)'
                    : 'var(--ion-color-dark)',
                width: '30px',
                height: '30px',
              }"
            >
              {{ index + 1 }}
            </span>
            <span
              :style="{
                color:
                  slide === currentSlide
                    ? 'var(--ion-color-success)'
                    : 'var(--ion-color-dark)',
              }"
              class="
                flex
                text-medium
                bold
                ion-margin-vertical
                align-self-center
              "
            >
              {{ slide }}
            </span>
          </div>
        </div>

        <ion-slides
          ref="ionSlides"
          :options="slidesOpts"
          @ionSlideDidChange="onSlidesDidChange()"
          @ionSlideWillChange="onSlidesChanged()"
        >
          <ion-slide v-for="slide in slides" :key="slide">
            <div class="full-width ion-text-start">
              <BillingForm ref="billingForm" v-if="slide === 'Billing'" />
              <ShippingForm ref="shippingForm" v-if="slide === 'Shipping'" />
              <div v-if="slide === 'Summary'">
                <ion-list-header
                  class="ion-no-padding"
                  style="min-height: auto"
                >
                  <ion-label class="ion-text-center ion-margin-bottom bold text-large" color="dark">
                    Order details
                  </ion-label>
                </ion-list-header>

                <div>
                  <p class="text-medium bold ion-text-uppercase">
                    Shipping details
                  </p>
                  <div class="divider"></div>

                  <div
                    v-for="(value, key, index) in formValues.shipping"
                    :key="index"
                  >
                    <p
                      class="text-medium margin-v-sm"
                      v-if="key !== 'attachment'"
                    >
                      <span class="bold"> {{ camel2title(key) }}: </span>
                      {{ value }}
                    </p>
                    <p
                      class="text-medium margin-v-sm"
                      v-if="key === 'attachment'"
                    >
                      <span class="bold"> Attachment: </span>
                      <img class="img-thumb" :src="value" />
                    </p>
                  </div>
                </div>

                <div>
                  <div class="divider"></div>
                  <p class="text-medium bold ion-text-uppercase">
                    Billing details
                  </p>
                  <div class="divider"></div>
                  <p
                    class="text-medium margin-v-sm"
                    v-for="(value, key, index) in formValues.billing"
                    :key="index"
                  >
                    <span class="bold"> {{ camel2title(key) }}: </span>
                    {{ value }}
                  </p>
                </div>

                <div class="divider"></div>
                <p class="text-medium bold ion-text-uppercase">Items</p>
                <div class="divider"></div>

                <ion-list>
                  <ion-item v-for="item in cart.items" :key="item.id">
                    <ion-label>
                      <h2 class="text-medium bold">{{ item.name }}</h2>
                    </ion-label>
                    <div>
                      <span class="text-medium">{{
                        $formatNumber(item.amount, {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 8,
                        })
                      }}</span>
                    </div>
                  </ion-item>
                  <ion-item>
                    <ion-label>
                      <h2 class="text-medium bold">Subtotal</h2>
                    </ion-label>
                    <div>
                      <span class="text-medium">{{
                        $formatNumber(cart.subtotal, {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 8,
                        })
                      }}</span>
                    </div>
                  </ion-item>
                  <ion-item>
                    <ion-label>
                      <h2 class="text-medium bold">Shipping &amp; Handling</h2>
                    </ion-label>
                    <div>
                      <span class="text-medium">{{
                        $formatNumber(cart.shippingFee, {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 8,
                        })
                      }}</span>
                    </div>
                  </ion-item>
                  <ion-item>
                    <ion-label>
                      <h2 class="text-medium bold">Total</h2>
                    </ion-label>
                    <div>
                      <span class="text-medium bold">{{
                        $formatNumber(cart.total, {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 8,
                        })
                      }}</span>
                    </div>
                  </ion-item>
                </ion-list>
              </div>
              <div v-if="slide === 'Payment'">
                <CardForm ref="cardForm" />

                <div class="ion-text-center">
                  <ion-button
                    type="button"
                    style="width: 200px"
                    class="ion-margin-vertical"
                    strong
                    size="large"
                    shape="round"
                    color="success"
                    @click="onNextButtonTouched"
                  >
                    Pay
                    {{
                      $formatNumber(cart.total, {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 8,
                      })
                    }}
                  </ion-button>
                </div>

                <div class="ion-text-center">
                  <ion-button
                    type="button"
                    style="width: 200px"
                    class="ion-margin-vertical"
                    strong
                    size="large"
                    shape="round"
                    color="medium"
                    @click="onBackButtonTouched"
                  >
                    Back
                  </ion-button>
                </div>
              </div>
            </div>
          </ion-slide>
        </ion-slides>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <div
          class="
            full-width
            flex
            align-items-center
            ion-padding-horizontal
            justify-content-space-between
          "
        >
          <ion-button
            style="width: 120px"
            strong
            shape="round"
            color="dark"
            :style="{ visibility: isBeginning || isEnd ? 'hidden' : '' }"
            @click="onBackButtonTouched"
          >
            <span>Back</span>
            <ion-icon slot="start" :icon="chevronBack"></ion-icon>
          </ion-button>
          <ion-button
            style="width: 120px"
            strong
            shape="round"
            color="success"
            :style="{ visibility: isEnd ? 'hidden' : '' }"
            @click="onNextButtonTouched"
          >
            <span>Next</span>
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonIcon,
  IonButton,
  IonSlides,
  IonSlide,
  IonFooter,
  IonLabel,
  IonListHeader,
  IonItem,
  IonList,
  onIonViewDidEnter,
} from "@ionic/vue";
import { chevronBack } from "ionicons/icons";
import { useRouter } from "vue-router";
import BillingForm from "@/components/BillingForm.vue";
import ShippingForm from "@/components/ShippingForm.vue";
import CardForm from "@/components/CardForm.vue";

export default defineComponent({
  name: "Checkout",
  setup() {
    const cart: any = {
      id: 1,
      items: [
        {
          id: 1,
          name: "Denim T-Shirt",
          amount: 15.0,
        },
        {
          id: 1,
          name: "Denim Pants",
          amount: 5.0,
        },
        {
          id: 1,
          name: "Black T-Shirt",
          amount: 5.0,
        },
      ],
      subtotal: 25.0,
      shippingFee: 5.0,
      total: 30.0,
    };

    const slidesOpts = {
      allowTouchMove: false,
      autoHeight: true,
    };

    const ionContent = ref();
    const ionSlides = ref();

    const billingForm = ref<InstanceType<typeof BillingForm>>();
    const shippingForm = ref<InstanceType<typeof ShippingForm>>();
    const cardForm = ref<InstanceType<typeof CardForm>>();

    const router = useRouter();

    onIonViewDidEnter(() => {
      ionSlides.value.$el.update();
      ionSlides.value.$el.updateAutoHeight();
    });

    const slides = ref(["Billing", "Shipping", "Summary", "Payment"]);
    const currentSlide = ref("Billing");
    const isBeginning = ref(true);
    const isEnd = ref(false);
    const formValues = ref({});

    const onSlidesChanged = async () => {
      const index = await ionSlides.value.$el.getActiveIndex();
      currentSlide.value = slides.value[index];
      isBeginning.value = await ionSlides.value.$el.isBeginning();
      isEnd.value = await ionSlides.value.$el.isEnd();
    };

    const onSlidesDidChange = () => {
      ionContent.value.$el.scrollToTop();
    };

    const onBackButtonTouched = () => {
      ionSlides.value.$el.slidePrev();
      ionContent.value.$el.scrollToTop();
    };

    const onNextButtonTouched = async () => {
      if (currentSlide.value === "Billing") {
        const form = await billingForm.value?.validate();

        if (form?.valid) {
          formValues.value = {
            billing: billingForm.value?.formValues,
            ...formValues.value,
          };

          ionSlides.value.$el.slideNext();
          ionContent.value.$el.scrollToTop();
        }
      } else if (currentSlide.value === "Shipping") {
        const form = await shippingForm.value?.validate();

        if (form?.valid) {
          formValues.value = {
            shipping: shippingForm.value?.formValues,
            ...formValues.value,
          };

          ionSlides.value.$el.slideNext();
          ionContent.value.$el.scrollToTop();
        }
      } else if (currentSlide.value === "Payment") {
        const form = await cardForm.value?.validate();

        if (form?.valid) {
          router.push({
            path: "/thanks",
            replace: true,
          });
        }
      } else {
        ionSlides.value.$el.slideNext();
        ionContent.value.$el.scrollToTop();
      }
    };

    const last = computed(() => slides.value.length - 1);

    const camel2title = (camelCase: string) => {
      return camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
    };

    return {
      cart,
      slides,
      slidesOpts,
      currentSlide,
      isBeginning,
      isEnd,
      ionContent,
      ionSlides,
      onSlidesChanged,
      onSlidesDidChange,
      onBackButtonTouched,
      onNextButtonTouched,
      chevronBack,
      billingForm,
      shippingForm,
      cardForm,
      formValues,
      camel2title,
      last,
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonSlides,
    IonSlide,
    IonButton,
    IonFooter,
    IonLabel,
    IonListHeader,
    IonItem,
    IonList,
    BillingForm,
    ShippingForm,
    CardForm,
  },
});
</script>

<style lang="scss" scoped>

ion-item {
  --border-color: var(--ion-color-light-tint);
}
ion-slides {
  height: 100%;

  ion-slide {
    align-items: flex-start;
  }

  .swiper-slide {
    visibility: hidden;
  }

  .swiper-slide.swiper-slide-active {
    visibility: visible;
  }
}

ion-item {
  --padding-start: 0;
}

.line {
  height: 3px;
  background: var(--ion-color-light-shade);
  top: 14px;
  z-index: -1;
}
</style>