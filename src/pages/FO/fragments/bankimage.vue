<template>
  <div v-if="showBank || showVirtual" style="display: flex">
    <div style="width: 80px" class="q-px-sm">
      <q-img
        src="../../../assets/img/payment/Bank_Central_Asia.svg.webp"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
    <div style="width: 80px" class="q-px-sm" v-if="!showBank">
      <q-img
        src="../../../assets/img/payment/1200px-BNI_logo.svg.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
    <div style="width: 80px" class="q-px-sm" v-if="!showVirtual">
      <q-img
        src="../../../assets/img/payment/2560px-Bank_Mandiri_logo.svg.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
    <div style="width: 80px" class="q-px-sm" v-if="!showVirtual">
      <q-img
        src="../../../assets/img/payment/1280px-BANK_BRI_logo.svg.webp"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
  </div>
  <div v-if="showDebit" style="display: flex">
    <div style="width: 80px" class="q-px-sm">
      <q-img
        src="../../../assets/img/payment/Visa_Inc._logo.svg.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
    <div style="width: 60px" class="q-px-sm">
      <q-img
        src="../../../assets/img/payment/JCB_logo.svg.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
    <div style="width: 80px" class="q-px-sm">
      <q-img
        src="../../../assets/img/payment/mastercard-og-image.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
  </div>
  <div v-if="showEWallet" style="display: flex">
    <div style="width: 80px" class="q-px-sm">
      <q-img
        src="../../../assets/img/payment/Gopay_logo.svg.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
    <div style="width: 80px" class="q-px-sm">
      <q-img
        src="../../../assets/img/payment/logo-shopeepay.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
    <div style="width: 80px" class="q-px-sm">
      <q-img
        src="../../../assets/img/payment/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
  </div>
  <!-- <div v-for="(option, index) in dropdownOptions" :key="index">
    <div style="width: 80px" class="q-px-sm">
      <q-img
        :src="'../../../assets/img/payment/' + option.imageUrl"
        loading="lazy"
        spinner-color="black"
        style="max-width: 80px; margin: auto"
      />
    </div>
  </div> -->
  <!-- PaymentImage.vue

  <div style="width: 80px" class="q-px-sm">
    <q-img
      :src="imageUrl"
      loading="lazy"
      spinner-color="black"
      style="max-width: 80px; margin: auto"
    />
  </div> -->
</template>

<script>
export default {
  props: {
    imageUrl: String,
    showDebit: Boolean,
    showBank: Boolean,
    showEWallet: Boolean,
    showVirtual: Boolean
  }
}
</script>

<style></style>
