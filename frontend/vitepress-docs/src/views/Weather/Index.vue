<template>
  <div class="page">
    <Weather />
  </div>
</template>

<script setup>
import Weather from './Weather.vue';

// onMounted(() => {
//   queryWeatherAPI().then(data => {
//     console.log('data: ', data);
//     // if (weather.status === 200 && weather.data.error === 0) {
//     //   this.weather = weather.data.data.weather
//     //   this.position = weather.data.data.location
//     //   if (weather.data.data.location.error_msg !== '成功。') {
//     //     message.warning(weather.data.data.location.error_msg)
//     //   }
//     //   this.showIcon()
//     // } else {
//     //   message.error("网络错误!")
//     // }
//   });
// });
</script>

<style lang="sass" scoped>

</style>
