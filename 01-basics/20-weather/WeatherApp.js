import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const cards = getWeatherData()
    const icons = WeatherConditionIcons

    function isNight({ current }) {
      const { dt, sunrise, sunset } = current
      return sunrise > dt && dt < sunset
    }

    return {
      cards,
      icons,
      isNight
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li
          v-for="(card, key) in cards"
          :key="key"
          class="weather-card"
          :class="{ 'weather-card--night': isNight(card) }"
        >
          <div v-if="card.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">
              {{ card.alert.sender_name }}: {{ card.alert.description }}
            </span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ card.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ card.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="card.current.weather.description">
              {{ icons[card.current.weather.id] }}
            </div>
            <div class="weather-conditions__temp">
              {{ (card.current.temp - 273.15).toFixed(1) }} °C
            </div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ (card.current.pressure * 0.75).toFixed(0) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ card.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ card.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ card.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
