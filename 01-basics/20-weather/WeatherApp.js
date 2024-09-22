import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const kelvin = 273.15;
    const weatherData = getWeatherData();
    const wetherIcons = WeatherConditionIcons;
    
    function converKtoC(value) {
      let result = value - kelvin;
      return result.toFixed(1) + ' °C'
    }

    function getTemp(value) {
      return converKtoC(value);
    }

    function isNight(dt, sunrise, sunset) {
      return sunset < dt || dt < sunrise;
    }

    function getPressure(value) {
      return converthPaToMmHg(value);
    }
    function converthPaToMmHg(hPa) {
        return (hPa * 0.75).toFixed(0);
    } 
    

    return {
      weathers : weatherData,
      wetherIcons,
      getTemp,
      isNight,
      getPressure,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul v-for="item in weathers" class="weather-list unstyled-list">
        <li class="weather-card" 
        :class ="{ 'weather-card--night': isNight(item.current.dt, item.current.sunrise, item.current.sunset) }">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{wetherIcons[item.current.weather.id]}}</div>
            <div class="weather-conditions__temp">{{ getTemp(item.current.temp)}}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{getPressure(item.current.pressure)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{item.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{item.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{item.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
