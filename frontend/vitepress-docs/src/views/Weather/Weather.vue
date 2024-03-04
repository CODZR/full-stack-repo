<template>
  <div class="f-row col-center mgb-5">
    常用城市： 
    <button
      class="co-button"
      @click="getWeather('余杭')"
    >
      余杭区
    </button>
    <button
      class="co-button"
      @click="getWeather('西湖')"
    >
      西湖区
    </button> 
    <button
      class="co-button"
      @click="getWeather('北仑')"
    >
      北仑区
    </button>
  </div>
  <div
    class="v-weather"
    :style="`color: rgb(${convartedColor[0]}, ${convartedColor[1]}, ${convartedColor[2]})`"
    @click="getWeather"
  >
    <div
      :class="{
        'is-small': size === 'small',
        'is-normal': size === 'normal',
        'is-oneline': type === 'oneline',
        'is-multiline': type === 'multiline'
      }"
    >
      <div>
        {{ weather.date }} {{ weather.time }}
      </div>
      <span v-if="size === 'small' && type === 'oneline'">{{ position.area }} / {{ weather.weather }} / {{ weather.temp }}℃</span>
      <span v-if="size === 'normal' && type === 'oneline'">{{ position.area }} / {{ weather.weather }} / {{ weather.temp }}℃ / {{ weather.WD }}{{ weather.WS }} /
        {{ weather.sd }} / {{ weather.rain }}mm / {{ weather.aqi }}</span>
      <div
        v-if="type === 'oneline'"
        ref="svgContainer"
        class="v-weather-icon"
      >
      </div>
      <div
        v-if="type=== 'multiline'"
        ref="svgContainer"
        class="v-weather-icon"
        :style="`width: ${iconSize}px; height: ${iconSize}px`"
      ></div>
     
      <template v-if="size === 'small' && type === 'multiline'">
        <p>{{ position.area }}</p>
        <p>{{ weather.temp }}℃ / {{ weather.weather }}</p>
      </template>
      <template v-if="size === 'normal' && type === 'multiline'">
        <p>坐标：{{ (position.city + position.area ) || weather.cityname }}</p>
        <p>天气：{{ weather.weather }}</p>
        <p>气温：{{ weather.temp }}℃</p>
        <p>风向：{{ weather.WD }}</p>
        <p>风力：{{ weather.WS }}</p>
        <p>降水量：{{ weather.rain }}mm</p>
        <p>相对湿度：{{ weather.sd }}</p>
        <p>大气压强：{{ weather.qy }}hPa</p>
        <p>空气质量：{{ weather.aqi }}</p>
      </template>
    </div>
    <div style="text-align: center; border: 1px solid #333; color: #222">
      点击区域查询/刷新天气
    </div>
    <template v-if="bodyTemperature >= 24">
      一件短袖就好了，空调里记得加个外套。
    </template>
    <template v-else>
      <div v-if="calSuitableClothes(bodyTemperature, 2)?.length">
        <strong>两件搭配:</strong>
        <template
          v-for="clothKey in calSuitableClothes(bodyTemperature, 2)"
          :key="clothKey"
        >
          <span>{{ clothEnum[clothArr[clothKey]] }}</span>&ensp;
        </template>
      </div>
      <div v-if="calSuitableClothes(bodyTemperature, 3)?.length">
        <strong>三件搭配:</strong>
        <template
          v-for="clothKey in calSuitableClothes(bodyTemperature, 3)"
          :key="clothKey"
        >
          <span>{{ clothEnum[clothArr[clothKey]] }}</span>
        </template>
      </div>
      <div v-if="calSuitableClothes(bodyTemperature, 4)?.length">
        <strong>四件搭配:</strong>
        <template
          v-for="clothKey in calSuitableClothes(bodyTemperature, 4)"
          :key="clothKey"
        >
          <span>{{ clothEnum[clothArr[clothKey]] }}</span>
        </template>
      </div>
    </template>
    <div class="is-hidden">
      <button
        class="co-button cursor-pointer mgt-5"
        @click="showWeatherDialog()"
      >
        点击查看一周天气
      </button>
    </div>

    <div>
      <strong>体感温度：</strong>
      {{ bodyTemperature }}
    </div>
    <div>
      <strong>平均体感温度：</strong>
      {{ Number(bodyTemperature) + 3 }}(白天) &emsp;
      {{ Number(bodyTemperature) - 3 }}(晚上)
    </div>

    <div>
      <iframe
        class="weather-iframe"
        :src="weatherIframeLink"
      />
    </div>


    <WeatherDialog
      v-model="dialogWeatherVisible"
      title="Weather Dialog"
      is-fullscreen
    >
      <div ref="iframeContainer">
      </div>
    </WeatherDialog>
  </div>
</template>

<script setup>
import axios from 'axios';
import WeatherDialog from '@vcomp/Dialog.vue';
import { Loading, Message } from '@vcomp/ui';
import { twoSum, threeSum, fourSum } from './nSumOfNums';
import { getLocationByIpAPI, getWeatherAPI } from '@/api';

// import Lottie from 'lottie-web';
const weatherJson = ref(null);
// import 'ant-design-vue/lib/Message/style/index.css'
import weatherIcon from './iconJson';

const props = defineProps({
  size: {
    type: String,
    default: 'normal',
    validator: value => {
      return ['small', 'normal'].includes(value);
    }
  },
  type: {
    type: String,
    default: 'multiline',
    validator: value => {
      return ['oneline', 'multiline'].includes(value);
    }
  },
  color: {
    type: String,
    default: '000000'
  },
  iconSize: {
    type: Number,
    default: 100
  },
  url: {
    type: String,
    default: 'https://apia.aidioute.cn/weather/index.php'
  }
});

const { proxy } = getCurrentInstance();
const convartedColor= ref([]);
let location = null;   //定位功能获取的经纬度
const position = ref({});   //经纬度查询获得的位置信息
const weather = ref({});
const bodyTemperature = ref(null);
const timer= null;
const weatherIframeLink = ref(null);

const dialogWeatherVisible = ref(false);

const calWindSpeed = (level) => {
  if (level < 3) {
    return level;
  } else if (level === 3) {
    return level + 1;
  } else if (level > 3) { // 4-9
    return (level - 2) * 3;
  } else if (level > 9) {
    return (level - 10) * 4  + 27;
  }
};

const DIVISOR_UNIT = 0.3;
const dealColdDivisorByTime = (time) =>  {
  const hour = Number(time.split(':')[0]);
  if (hour < 9) {
    return -2 * DIVISOR_UNIT;
  } else if (hour < 11) {
    return 0;
  } else if (hour < 14) {
    return 1 * DIVISOR_UNIT;
  } else if (hour < 17) {
    return 1 * DIVISOR_UNIT;
  } else if (hour < 21) {
    return 0;
  } else if (hour < 24) {
    return -1 * DIVISOR_UNIT;
  }
};

const calBodyTemperature = () => {
  const w = weather.value;
  const T = w.temp;

  let coldDivisor = 0.5; // 热时湿度大热，冷时湿度大冷, 雨雪更冷
  if (w.weather.includes('雨') || w.weather.includes('雪')) {
    coldDivisor *= T < 16 ? -2 : -1;
  } else if (w.weather.includes('阴')) {
    coldDivisor *= T < 16 ? -1 : -0.5;
  } else {
    if (T > 26 || w.weather === '晴') coldDivisor *= 2;
  }

  coldDivisor += dealColdDivisorByTime(w.time);

  const e = coldDivisor * (parseInt(w.sd) / 100) * 6.105 * Math.exp((17.27 * T) / (237.7 + T));
  const V = calWindSpeed(parseInt(w.WS));
  return (1.07 * T + 0.2 * e - 0.65 * V - 2.7).toFixed(2);
};

const initLottiePlayer = () => {
  const container = proxy.$refs.svgContainer;

  const player = document.createElement('lottie-player');
  player.id = 'weather-lottie-player';
  player.background = 'transparent';
  player.loop = true;
  player.autoplay = true;
  player.speed = 1;
  player.style = `width: ${props.iconSize}px; height: ${props.iconSize}px; border: 5px solid #fff; border-radius: 50%;`;

  container.appendChild(player);
};


onMounted(async () => {
  import('https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js');
  initLottiePlayer();

  convartColor();

  const ip = await getIpByIpify();
  if (ip) {
    getLocationByIpAPI(ip).then(data => {
      const res = data.result;
      const cityInfo = res.adInfo;
      const locationData = data.result.location;
      location = {
        latitude: locationData.lat,
        longitude: locationData.lng,
      };
      getWeather();
    });
  }
});

const convartColor = () => {
  const colorTemp = /([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})/.exec(props.color);
  convartedColor.value = [
    parseInt(`0x${colorTemp[1]}`),
    parseInt(`0x${colorTemp[2]}`),
    parseInt(`0x${colorTemp[3]}`)
  ];
};

const showIcon = () =>  {
  const jsonIcon = weatherIcon[weather.value.weather]
    ? weatherIcon[weather.value.weather](convartedColor.value[0] / 255, convartedColor.value[1] / 255, convartedColor.value[2] / 255)
    : null;
  
  if (jsonIcon) {
    const player = document.getElementById('weather-lottie-player');
    console.log('player: ', player.load);
    player.addEventListener('rendered', (e) => {
      player?.load && player.load(jsonIcon);
    });
  } else {
    getWeather();
  }
};


const getDefaultWeather = () => {
  Message.error('获取天气失败!自动获取默认余杭天气。');
  getWeather('余杭');
};

const cityPosEnum = {
  '余杭': { longitude: 120.01134, latitude: 30.27599 },
  '西湖': { longitude: 120.13040, latitude: 30.25924 },
  '北仑': { longitude: 121.94856, latitude: 29.89389 },
};
const getWeather = async (city) => {
  const cityPos = cityPosEnum[city];

  let apiLink;
  if (cityPos) {
    apiLink = `${props.url}?location_type=1&lat=${cityPos.latitude}&lng=${cityPos.longitude}`;
  } else {
    if (location) {
      apiLink = `${props.url}?location_type=1&lat=${location.latitude}&lng=${location.longitude}`;
    } else {
      getDefaultWeather();
      return;
    }
  }
  
  try {
    Loading.show();
    const res = await axios.get(apiLink);
    console.log('res: ', res);
    Loading.close();
    const weatherData = res.data.data;
    if (res.status === 200 && res.data.error === 0 && weatherData.weather) {
      weather.value = weatherData.weather;
      position.value = weatherData.location;
      bodyTemperature.value = calBodyTemperature();
      
      if (weatherData.location.error_msg !== '成功。') {
        Message.warn(weatherData.location.error_msg);
      }
      showIcon();
    } else {
      getDefaultWeather();
    }

    weatherIframeLink.value = weather.value.city
      ? `https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=${weather.value.city}&key=506922bf101b43668f4db06f843b9fd2&v=_1662948186215`
      : 'https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=506922bf101b43668f4db06f843b9fd2&v=_1662948186215';
  } catch (err) {
    console.log(err);
    Message.error('未知错误!');
  }
};
// const getWeather = async (city) => {
//   if (!location) {
//     Message.error('获取位置信息失败');
//     return;
//   }
//   const cityPos = cityPosEnum[city];
//   const lat = cityPos ? cityPos.latitude :location.latitude;
//   const lng = cityPos ? cityPos.longitude : location.longitude;
//   const params = {
//     location: `${lng},${lat}`
//     // location: '120.298501,30.41875'
//   };
  
  
//   try {
//     Loading.show();
//     getWeatherAPI(params).then(data => {
//       console.log('data: ', data);
//       //   showIcon();
//       weather.value = data.now;
//     });
//     Loading.close();
 

//     weatherIframeLink.value = weather.value.city
//       ? `https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=${weather.value.city}&key=506922bf101b43668f4db06f843b9fd2&v=_1662948186215`
//       : 'https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=506922bf101b43668f4db06f843b9fd2&v=_1662948186215';
//   } catch (err) {
//     console.log(err);
//     Message.error('未知错误!');
//   }
// };

const clothEnum = {
  9: '较厚的羽绒服',
  6: '薄款羽绒服',
  5: '稍厚的弹力絮棉衣',
  4: '羊毛衫/棉背心',
  3: '抓绒衣服/薄外套',
  2: '厚的棉衣衫',
  1: '薄的棉毛衫/短袖',
};
const clothArr = [1,2,3,4,5,6,9];
// const clothArrLen = clothArr.length;

/**
 * 计算衣服搭配
 * @param {*} temp 温度
 * @param {*} nums 衣服件数
 */
function calSuitableClothes (temp, nums = 2) {
  if (!temp) return;

  const diffTemp = 26 - parseInt(temp);
  const target = diffTemp <= 0 ? 0 : diffTemp; 

  if (nums === 2) {
    return twoSum(clothArr, target);
  } else if (nums === 3) {
    return threeSum(clothArr, target);
  } else if (nums === 4) {
    return fourSum(clothArr, target);
  }
  return [];
}

const showWeatherDialog = () =>  {
  Loading.show();

  const iframe = document.createElement('iframe');
  iframe.style = 'width: 100%; height: 100%; min-height: 70vh';
  iframe.src = 'https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=506922bf101b43668f4db06f843b9fd2&v=_1662948186215';
  dialogWeatherVisible.value = true;

  proxy.$nextTick(() => {
    const iframeContainer = proxy.$refs.iframeContainer;
    iframeContainer.appendChild(iframe);
    Loading.close();
  });

};

// const getLocation = async () => {
//   if (typeof window !== 'undefined' && window.navigator.geolocation) {
//     window.navigator.geolocation.getCurrentPosition(
//       (position) => {
//         location = {
//           latitude: position.coords.latitude.toFixed(6),
//           longitude: position.coords.longitude.toFixed(6)
//         };
//       },
//       (error) => {
//         console.log('error: ', error);
//         switch (error.code) {
//         case 0:
//           Message.warn('获取位置信息出错！将使用IP定位');
//           break;
//         case 1:
//           Message.warn('您设置了阻止该页面获取位置信息！将使用IP定位');
//           break;
//         case 2:
//           Message.warn('浏览器无法确定您的位置！将使用IP定位');
//           break;
//         case 3:
//           Message.warn('获取位置信息超时！将使用IP定位');
//           break;
//         }
//       }
//     );
//   } else {
//     Message.warn('该浏览器不支持 HTML5 的定位功能！将使用IP定位');
//     console.log('该浏览器不支持 HTML5 的定位功能！将使用IP定位: ');
//   }

//   if (!location) {
//     Loading.show();
//     const ip = sessionStorage.Ip || await getIpByIpify();
//     console.log('ip: ', ip);
//     ip && getLocationByIpAPI(ip).then(data => {
//       console.log('data: ', data);
//       const res = data.result;
//       const cityInfo = res.adInfo;
//       const locationData = data.result.location;
//       location = {
//         latitude: locationData.lat,
//         longitude: locationData.lng,
//       };
//       getWeather();
//     });
//     Loading.close();
//   } else {
//     getWeather();
//   }
// };

function getIpByIpify() {
  Loading.show();
  return fetch('https://api.ipify.org/?format=json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      const ip = JSON.parse(res).ip;
      return ip;
    })
    .catch((err) => {
      console.log('getIpByIpify err: ', err);
      getDefaultWeather();
    })
    .finally(() => Loading.close());
}
</script>

<style scoped>
.weather-iframe {
  width: 100%;
  height: auto;
  min-width: 327px;
  min-height: 600px;
  margin-top: 8px;
}
/* .weather-iframe::-webkit-scrollbar {
  display: none;
  width: 0;
} */

p {
  margin: 0;
  padding: 0;
}

.mgt-5 {
  margin-top: 5px;
}

.f-row .co-button {
  padding: 12px;
}

.v-weather {
  display: inline-block;
  cursor: pointer;
  user-select: none;
}

.v-weather> .is-small.is-oneline, .v-weather> .is-normal.is-oneline {
  /*display: inline-block;*/
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  padding: 0 20px 0 45px;
  position: relative;
}

.v-weather> .is-small.is-oneline> .v-weather-icon, .v-weather> .is-normal.is-oneline> .v-weather-icon {
  position: absolute;
  top: 7px;
  left: 10px;
  width: 30px;
  height: 30px;
}

.v-weather> .is-small.is-multiline {
  display: inline-block;
  padding: 6px 20px;
  position: relative;
  text-align: center;
}

.v-weather> .is-small.is-multiline> .v-weather-icon {
  margin: 0 auto;
}

.v-weather> .is-small.is-multiline> p {
  height: 24px;
  line-height: 24px;
  font-size: 16px;
}

.v-weather> .is-normal.is-multiline {
  display: inline-block;
  padding: 6px 20px;
  position: relative;
  text-align: center;
}

.v-weather> .is-normal.is-multiline> .v-weather-icon {
  margin: 0 auto;
}

.v-weather> .is-normal.is-multiline> .map {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}

.v-weather> .is-normal.is-multiline> .map div {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: -14px;
  vertical-align: middle;
}

.v-weather> .is-normal.is-multiline> p {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}
</style>
