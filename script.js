class WeatherLensApp {
  constructor() {
    this.weatherData = null
    this.forecastData = null
    this.hourlyData = null
    this.airQualityData = null
    this.loading = true
    this.city = "London"
    this.activeTab = "current"
    this.forecastType = "daily"
    this.error = null
    this.units = "metric"
    this.language = "en"
    this.savedCities = JSON.parse(localStorage.getItem("weatherlens-cities") || "[]")
    this.map = null
    this.aiResponding = false

    this.init()
  }

  init() {
    this.render()
    this.fetchAllWeatherData(this.city)
  }

  async fetchAllWeatherData(cityName) {
    this.loading = true
    this.error = null
    this.render()

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock comprehensive weather data
      await this.fetchCurrentWeather(cityName)
      await this.fetchForecastData(cityName)
      await this.fetchAirQualityData(cityName)
      await this.fetchHourlyData(cityName)
    } catch (err) {
      this.error = "Failed to fetch weather data"
      console.error("Error:", err)
    }

    this.loading = false
    this.render()
  }

  async fetchCurrentWeather(cityName) {
    // Enhanced mock weather data
    this.weatherData = {
      city: cityName,
      country: this.getRandomCountry(),
      coordinates: { lat: 51.5074 + (Math.random() - 0.5) * 10, lon: -0.1278 + (Math.random() - 0.5) * 10 },
      temperature: Math.round(15 + Math.random() * 20),
      feelsLike: Math.round(15 + Math.random() * 20),
      description: this.getRandomWeatherCondition(),
      humidity: Math.round(40 + Math.random() * 40),
      pressure: Math.round(1000 + Math.random() * 50),
      windSpeed: Math.round(Math.random() * 15 * 10) / 10,
      windDirection: Math.round(Math.random() * 360),
      visibility: Math.round(5 + Math.random() * 15),
      uvIndex: Math.round(Math.random() * 11),
      dewPoint: Math.round(10 + Math.random() * 15),
      cloudCover: Math.round(Math.random() * 100),
      icon: this.getRandomIcon(),
      sunrise: Date.now() / 1000 - 3600,
      sunset: Date.now() / 1000 + 3600,
      moonPhase: Math.random(),
      alerts: this.generateWeatherAlerts(),
      lastUpdated: new Date().toISOString(),
    }
  }

  async fetchForecastData(cityName) {
    // 15-day forecast
    this.forecastData = []
    for (let i = 0; i < 15; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)

      this.forecastData.push({
        date: date.toDateString(),
        dateObj: date,
        tempHigh: Math.round(18 + Math.random() * 15),
        tempLow: Math.round(5 + Math.random() * 15),
        description: this.getRandomWeatherCondition(),
        icon: this.getRandomIcon(),
        humidity: Math.round(40 + Math.random() * 40),
        windSpeed: Math.round(Math.random() * 15 * 10) / 10,
        precipitation: Math.round(Math.random() * 100),
        uvIndex: Math.round(Math.random() * 11),
        sunrise: Date.now() / 1000 - 3600 + i * 60,
        sunset: Date.now() / 1000 + 3600 + i * 60,
      })
    }
  }

  async fetchHourlyData(cityName) {
    // 72-hour hourly forecast
    this.hourlyData = []
    for (let i = 0; i < 72; i++) {
      const date = new Date()
      date.setHours(date.getHours() + i)

      this.hourlyData.push({
        time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        date: date.toDateString(),
        temperature: Math.round(15 + Math.random() * 20),
        description: this.getRandomWeatherCondition(),
        icon: this.getRandomIcon(),
        precipitation: Math.round(Math.random() * 100),
        windSpeed: Math.round(Math.random() * 15 * 10) / 10,
        humidity: Math.round(40 + Math.random() * 40),
      })
    }
  }

  async fetchAirQualityData(cityName) {
    const aqi = Math.round(1 + Math.random() * 300)

    this.airQualityData = {
      aqi: aqi,
      status: this.getAQIStatus(aqi),
      pollutants: {
        pm25: Math.round(Math.random() * 100),
        pm10: Math.round(Math.random() * 150),
        o3: Math.round(Math.random() * 200),
        no2: Math.round(Math.random() * 100),
        so2: Math.round(Math.random() * 50),
        co: Math.round(Math.random() * 10000),
      },
      pollen: {
        tree: Math.round(Math.random() * 5),
        grass: Math.round(Math.random() * 5),
        weed: Math.round(Math.random() * 5),
      },
    }
  }

  getRandomWeatherCondition() {
    const conditions = [
      "sunny",
      "partly cloudy",
      "cloudy",
      "overcast",
      "light rain",
      "moderate rain",
      "heavy rain",
      "thunderstorm",
      "snow",
      "fog",
      "mist",
      "drizzle",
      "clear sky",
      "scattered clouds",
    ]
    return conditions[Math.floor(Math.random() * conditions.length)]
  }

  getRandomIcon() {
    const icons = ["01d", "02d", "03d", "04d", "09d", "10d", "11d", "13d", "50d"]
    return icons[Math.floor(Math.random() * icons.length)]
  }

  getRandomCountry() {
    const countries = ["GB", "US", "FR", "DE", "IT", "ES", "CA", "AU", "JP", "IN"]
    return countries[Math.floor(Math.random() * countries.length)]
  }

  generateWeatherAlerts() {
    const alerts = []
    if (Math.random() > 0.6) {
      const alertTypes = [
        {
          type: "⛈️ Storm Warning",
          message: "Severe thunderstorms expected in the next 6 hours. Seek shelter indoors.",
          severity: "high",
        },
        {
          type: "🌡️ Heat Advisory",
          message: "Temperatures may reach dangerous levels. Stay hydrated and avoid prolonged sun exposure.",
          severity: "medium",
        },
        {
          type: "🌫️ Air Quality Alert",
          message: "Poor air quality conditions detected. Limit outdoor activities.",
          severity: "medium",
        },
        {
          type: "☀️ UV Warning",
          message: "Very high UV index detected. Use sunscreen and protective clothing.",
          severity: "low",
        },
        {
          type: "🌪️ Wind Advisory",
          message: "Strong winds expected. Secure loose objects and avoid high-profile vehicles.",
          severity: "medium",
        },
      ]
      alerts.push(alertTypes[Math.floor(Math.random() * alertTypes.length)])
    }
    return alerts
  }

  getAQIStatus(aqi) {
    if (aqi <= 50) return { text: "Good", class: "aqi-good" }
    if (aqi <= 100) return { text: "Moderate", class: "aqi-moderate" }
    if (aqi <= 150) return { text: "Unhealthy for Sensitive", class: "aqi-unhealthy" }
    return { text: "Unhealthy", class: "aqi-unhealthy" }
  }

  async askAIAssistant(question) {
    // Enhanced AI responses with more context
    const lowerQuestion = question.toLowerCase()

    // Weather-specific responses
    if (lowerQuestion.includes("rain") || lowerQuestion.includes("umbrella")) {
      const responses = [
        "Based on current weather patterns, there's a 60% chance of rain this afternoon. I recommend carrying an umbrella, especially between 2-5 PM when precipitation is most likely.",
        "Looking at the radar data, light showers are expected around 3 PM. The rain should be brief, but an umbrella would be wise for outdoor activities.",
        "Current atmospheric pressure suggests rain is likely within the next 4 hours. Pack an umbrella and consider waterproof clothing if you'll be outside for extended periods.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerQuestion.includes("run") || lowerQuestion.includes("exercise") || lowerQuestion.includes("outdoor")) {
      const responses = [
        "Perfect conditions for outdoor exercise! The air quality is good (AQI: 45), temperature is comfortable at 22°C, and UV index is moderate. Best time would be between 7-9 AM or 6-8 PM.",
        "Great weather for running! Current conditions show low humidity (55%), light winds, and excellent visibility. I'd recommend early morning for the coolest temperatures.",
        "Ideal outdoor activity weather! Air quality is excellent, no precipitation expected for the next 6 hours, and comfortable temperature. Don't forget sunscreen - UV index is 6.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerQuestion.includes("travel") || lowerQuestion.includes("trip") || lowerQuestion.includes("flight")) {
      const responses = [
        "Weather conditions look favorable for travel. Clear skies with minimal wind shear expected. However, check your destination's weather as conditions can vary significantly.",
        "Excellent travel weather! No severe weather alerts in the area, good visibility (15km), and stable atmospheric conditions. Safe travels!",
        "Travel conditions are optimal. No storms or adverse weather expected along major travel routes. Flight delays due to weather are unlikely today.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (lowerQuestion.includes("wear") || lowerQuestion.includes("clothes") || lowerQuestion.includes("dress")) {
      const temp = this.weatherData?.temperature || 20
      if (temp > 25) {
        return "It's quite warm today! I recommend light, breathable clothing like cotton or linen. Don't forget sunglasses, a hat, and sunscreen. Shorts and a t-shirt would be perfect."
      } else if (temp > 15) {
        return "Pleasant temperature today! A light jacket or cardigan would be perfect for layering. Jeans and a long-sleeve shirt should be comfortable. You might want to bring a light sweater for evening."
      } else {
        return "It's a bit chilly today. I recommend layering with a warm jacket or coat. Long pants, closed shoes, and perhaps a scarf would keep you comfortable. Don't forget gloves if you'll be outside long."
      }
    }

    if (lowerQuestion.includes("plants") || lowerQuestion.includes("garden") || lowerQuestion.includes("water")) {
      const humidity = this.weatherData?.humidity || 60
      if (humidity > 70) {
        return "High humidity levels (75%) mean your plants are getting plenty of moisture from the air. Check soil moisture before watering - they might not need as much today."
      } else {
        return "With current humidity at 55% and no recent rainfall, your plants would appreciate some watering. Early morning or evening would be the best times to water."
      }
    }

    if (lowerQuestion.includes("picnic") || lowerQuestion.includes("barbecue") || lowerQuestion.includes("bbq")) {
      const responses = [
        "Perfect picnic weather! Clear skies, comfortable temperature, and light winds. I'd recommend setting up in a spot with some shade for the afternoon. Don't forget to secure lightweight items.",
        "Great day for outdoor dining! No rain expected, pleasant temperature, and good air quality. The wind is calm, so your napkins won't blow away! Enjoy your meal outdoors.",
        "Excellent conditions for a barbecue! Low wind speeds mean easy grilling, and the weather will stay pleasant through the evening. Perfect for outdoor entertaining.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    // Default contextual responses
    const defaultResponses = [
      `Based on current conditions in ${this.weatherData?.city || "your area"}, the weather is ${this.weatherData?.description || "pleasant"} with a temperature of ${this.weatherData?.temperature || 20}°C. Air quality is good for most activities.`,
      `Current weather shows ${this.weatherData?.description || "clear skies"} with comfortable conditions. Humidity is at ${this.weatherData?.humidity || 60}% and winds are ${this.weatherData?.windSpeed || 5} m/s. Great day to be outside!`,
      `Weather conditions are stable with ${this.weatherData?.description || "partly cloudy"} skies. Temperature feels like ${this.weatherData?.feelsLike || 22}°C. UV index is ${this.weatherData?.uvIndex || 5}, so consider sun protection for extended outdoor time.`,
      `Today's forecast shows ${this.weatherData?.description || "pleasant"} conditions. Visibility is excellent at ${this.weatherData?.visibility || 10}km, and atmospheric pressure is stable at ${this.weatherData?.pressure || 1013} hPa.`,
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  initializeRadarMap() {
    if (!this.weatherData || !window.L) return

    const mapContainer = document.getElementById("radar-map")
    if (!mapContainer) return

    // Initialize map
    if (this.map) {
      this.map.remove()
    }

    this.map = L.map("radar-map").setView([this.weatherData.coordinates.lat, this.weatherData.coordinates.lon], 8)

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map)

    // Add weather marker
    const weatherIcon = L.divIcon({
      html: `<div style="background: rgba(255,255,255,0.9); border-radius: 50%; padding: 8px; text-align: center; font-size: 20px;">${this.getWeatherEmoji(this.weatherData.icon)}</div>`,
      className: "weather-marker",
      iconSize: [40, 40],
    })

    L.marker([this.weatherData.coordinates.lat, this.weatherData.coordinates.lon], { icon: weatherIcon })
      .addTo(this.map)
      .bindPopup(`
        <div style="text-align: center; color: #333;">
          <strong>${this.weatherData.city}</strong><br>
          ${this.weatherData.temperature}°C<br>
          ${this.weatherData.description}
        </div>
      `)

    // Add weather overlay simulation
    this.addWeatherOverlays()
  }

  addWeatherOverlays() {
    if (!this.map) return

    // Simulate precipitation overlay
    const precipitationData = []
    for (let i = 0; i < 20; i++) {
      const lat = this.weatherData.coordinates.lat + (Math.random() - 0.5) * 2
      const lng = this.weatherData.coordinates.lon + (Math.random() - 0.5) * 2
      const intensity = Math.random()

      if (intensity > 0.3) {
        const color = intensity > 0.7 ? "#ff4444" : intensity > 0.5 ? "#ffaa44" : "#4444ff"
        L.circle([lat, lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.3,
          radius: Math.random() * 5000 + 1000,
        }).addTo(this.map)
      }
    }
  }

  getWeatherEmoji(iconCode) {
    const emojiMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    }
    return emojiMap[iconCode] || "🌤️"
  }

  formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  getWindDirection(degrees) {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    return directions[Math.round(degrees / 22.5) % 16]
  }

  getMoonPhase(phase) {
    if (phase < 0.125) return "🌑 New Moon"
    if (phase < 0.25) return "🌒 Waxing Crescent"
    if (phase < 0.375) return "🌓 First Quarter"
    if (phase < 0.5) return "🌔 Waxing Gibbous"
    if (phase < 0.625) return "🌕 Full Moon"
    if (phase < 0.75) return "🌖 Waning Gibbous"
    if (phase < 0.875) return "🌗 Last Quarter"
    return "🌘 Waning Crescent"
  }

  handleCitySubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newCity = formData.get("city")
    if (newCity && newCity.trim()) {
      this.city = newCity.trim()
      this.saveCityToHistory(this.city)
      this.fetchAllWeatherData(this.city)
    }
  }

  saveCityToHistory(city) {
    if (!this.savedCities.includes(city)) {
      this.savedCities.unshift(city)
      this.savedCities = this.savedCities.slice(0, 10)
      localStorage.setItem("weatherlens-cities", JSON.stringify(this.savedCities))
    }
  }

  setActiveTab(tab) {
    this.activeTab = tab
    this.render()

    // Initialize radar map when radar tab is selected
    if (tab === "radar") {
      setTimeout(() => this.initializeRadarMap(), 100)
    }
  }

  setForecastType(type) {
    this.forecastType = type
    this.render()
  }

  async handleAIQuestion(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const question = formData.get("ai-question")

    if (question && question.trim() && !this.aiResponding) {
      this.aiResponding = true

      // Show thinking animation
      const responseContainer = document.getElementById("ai-response-container")
      if (responseContainer) {
        responseContainer.innerHTML = `
          <div class="ai-thinking">
            <span>🤖 WeatherLens AI is thinking</span>
            <div class="thinking-dots">
              <div class="thinking-dot"></div>
              <div class="thinking-dot"></div>
              <div class="thinking-dot"></div>
            </div>
          </div>
        `
        responseContainer.style.display = "block"
      }

      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 2000))

      try {
        const response = await this.askAIAssistant(question.trim())

        if (responseContainer) {
          responseContainer.innerHTML = `
            <div class="ai-response">
              <strong>🤖 WeatherLens AI:</strong><br>
              ${response}
            </div>
          `
        }
      } catch (error) {
        console.error("AI Assistant error:", error)
        if (responseContainer) {
          responseContainer.innerHTML = `
            <div class="ai-response">
              <strong>🤖 WeatherLens AI:</strong><br>
              I apologize, but I'm having trouble processing your question right now. Please try again in a moment.
            </div>
          `
        }
      }

      this.aiResponding = false
      e.target.reset()
    }
  }

  handleSuggestionClick(suggestion) {
    const input = document.querySelector('input[name="ai-question"]')
    if (input) {
      input.value = suggestion
      input.focus()
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.city = "Current Location"
          this.fetchAllWeatherData(this.city)
        },
        (error) => {
          console.error("Geolocation error:", error)
          alert("Unable to get your location. Please search for a city manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  exportWeatherData() {
    const data = {
      city: this.city,
      current: this.weatherData,
      forecast: this.forecastData,
      hourly: this.hourlyData,
      airQuality: this.airQualityData,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `weather-${this.city}-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  render() {
    const app = document.getElementById("weather-app")

    if (this.loading) {
      app.innerHTML = `
        <div class="weather-gadget">
          <div class="loading">
            <div class="spinner"></div>
            <h3>🌤️ WeatherLens</h3>
            <p>Loading comprehensive weather intelligence...</p>
            <div style="font-size: 0.9rem; opacity: 0.7; margin-top: 12px;">
              Fetching current conditions, forecasts, air quality, and radar data
            </div>
          </div>
        </div>
      `
      return
    }

    if (this.error) {
      app.innerHTML = `
        <div class="weather-gadget">
          <div class="error">
            <div class="error-icon">⚠️</div>
            <h3>Unable to Load Weather Data</h3>
            <p>${this.error}</p>
            <button class="retry-btn" onclick="weatherApp.fetchAllWeatherData('${this.city}')">
              🔄 Retry
            </button>
          </div>
        </div>
      `
      return
    }

    app.innerHTML = `
      <div class="weather-gadget">
        ${this.renderHeader()}
        ${this.renderTabs()}
        ${this.renderContent()}
        ${this.renderFooter()}
      </div>
    `

    // Add event listeners for AI assistant
    const aiForm = document.getElementById("ai-form")
    if (aiForm) {
      aiForm.addEventListener("submit", (e) => this.handleAIQuestion(e))
    }

    // Add event listeners for suggestion clicks
    const suggestions = document.querySelectorAll(".suggestion-item")
    suggestions.forEach((item) => {
      item.addEventListener("click", () => {
        this.handleSuggestionClick(item.textContent.replace("• ", ""))
      })
    })
  }

  renderHeader() {
    return `
      <div class="weather-header">
        <h1 class="weather-title">🌤️ WeatherLens</h1>
        <div class="header-controls">
          <form class="search-form" onsubmit="weatherApp.handleCitySubmit(event)">
            <input
              type="text"
              name="city"
              value="${this.city}"
              placeholder="Search cities worldwide..."
              class="search-input"
              list="city-history"
            />
            <datalist id="city-history">
              ${this.savedCities.map((city) => `<option value="${city}">`).join("")}
            </datalist>
            <button type="submit" class="search-btn">🔍</button>
          </form>
          <button class="location-btn" onclick="weatherApp.getCurrentLocation()" title="Use current location">
            📍
          </button>
          <button class="settings-btn" title="Settings">⚙️</button>
        </div>
      </div>
    `
  }

  renderTabs() {
    const tabs = [
      { id: "current", label: "🌡️ Current", icon: "" },
      { id: "forecast", label: "📅 Forecast", icon: "" },
      { id: "radar", label: "🛰️ Radar", icon: "" },
      { id: "air-quality", label: "🌫️ Air Quality", icon: "" },
      { id: "ai-assistant", label: "🧠 AI Assistant", icon: "" },
    ]

    return `
      <div class="tab-container">
        ${tabs
          .map(
            (tab) => `
          <button
            class="tab-btn ${this.activeTab === tab.id ? "active" : ""}"
            onclick="weatherApp.setActiveTab('${tab.id}')"
          >
            ${tab.label}
          </button>
        `,
          )
          .join("")}
      </div>
    `
  }

  renderContent() {
    switch (this.activeTab) {
      case "current":
        return this.renderCurrentWeather()
      case "forecast":
        return this.renderForecast()
      case "radar":
        return this.renderRadar()
      case "air-quality":
        return this.renderAirQuality()
      case "ai-assistant":
        return this.renderAIAssistant()
      default:
        return this.renderCurrentWeather()
    }
  }

  renderCurrentWeather() {
    if (!this.weatherData) return ""

    return `
      <div class="current-weather">
        ${this.weatherData.alerts.length > 0 ? this.renderAlerts() : ""}
        
        <div class="main-info">
          <div class="location-info">
            <h2 class="city-name">
              <span class="location-icon">📍</span>
              ${this.weatherData.city}, ${this.weatherData.country}
            </h2>
            <div class="temperature">${this.weatherData.temperature}°C</div>
            <div class="feels-like">Feels like ${this.weatherData.feelsLike}°C</div>
            <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 8px;">
              ${this.getMoonPhase(this.weatherData.moonPhase)}
            </div>
          </div>
          <div class="weather-icon-container">
            <img 
              src="${this.getWeatherIcon(this.weatherData.icon)}" 
              alt="${this.weatherData.description}"
              class="icon-img"
              onerror="this.src='/placeholder.svg'"
            />
            <div class="description">${this.weatherData.description}</div>
          </div>
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">💧 Humidity</span>
            <span class="detail-value">${this.weatherData.humidity}</span>
            <span class="detail-unit">%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">🌪️ Pressure</span>
            <span class="detail-value">${this.weatherData.pressure}</span>
            <span class="detail-unit">hPa</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">💨 Wind</span>
            <span class="detail-value">${this.weatherData.windSpeed}</span>
            <span class="detail-unit">m/s ${this.getWindDirection(this.weatherData.windDirection)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">👁️ Visibility</span>
            <span class="detail-value">${this.weatherData.visibility}</span>
            <span class="detail-unit">km</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">☀️ UV Index</span>
            <span class="detail-value">${this.weatherData.uvIndex}</span>
            <span class="detail-unit">${this.weatherData.uvIndex > 7 ? "High" : this.weatherData.uvIndex > 3 ? "Moderate" : "Low"}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">💧 Dew Point</span>
            <span class="detail-value">${this.weatherData.dewPoint}</span>
            <span class="detail-unit">°C</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">☁️ Cloud Cover</span>
            <span class="detail-value">${this.weatherData.cloudCover}</span>
            <span class="detail-unit">%</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">🌅 Sunrise</span>
            <span class="detail-value">${this.formatTime(this.weatherData.sunrise)}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">🌇 Sunset</span>
            <span class="detail-value">${this.formatTime(this.weatherData.sunset)}</span>
          </div>
        </div>
      </div>
    `
  }

  renderAlerts() {
    return `
      <div class="weather-alerts">
        ${this.weatherData.alerts
          .map(
            (alert) => `
          <div class="alert-item">
            <div class="alert-title">
              ${alert.type}
            </div>
            <div>${alert.message}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }

  renderForecast() {
    return `
      <div class="forecast-container">
        <div class="forecast-title">
          <span>📅</span>
          Weather Forecast
        </div>
        
        <div class="forecast-tabs">
          <button class="forecast-tab ${this.forecastType === "hourly" ? "active" : ""}" 
                  onclick="weatherApp.setForecastType('hourly')">
            72-Hour Hourly
          </button>
          <button class="forecast-tab ${this.forecastType === "daily" ? "active" : ""}" 
                  onclick="weatherApp.setForecastType('daily')">
            15-Day Daily
          </button>
        </div>

        ${this.forecastType === "hourly" ? this.renderHourlyForecast() : this.renderDailyForecast()}
      </div>
    `
  }

  renderHourlyForecast() {
    if (!this.hourlyData) return ""

    return `
      <div class="hourly-forecast">
        ${this.hourlyData
          .slice(0, 24)
          .map(
            (hour) => `
          <div class="hourly-item">
            <div class="hourly-time">${hour.time}</div>
            <img src="${this.getWeatherIcon(hour.icon)}" alt="${hour.description}" class="hourly-icon">
            <div class="hourly-temp">${hour.temperature}°</div>
            <div style="font-size: 0.7rem; opacity: 0.7;">${hour.precipitation}%</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }

  renderDailyForecast() {
    if (!this.forecastData) return ""

    return `
      <div class="daily-forecast">
        ${this.forecastData
          .map(
            (day, index) => `
          <div class="daily-item">
            <div class="daily-date">
              ${
                index === 0
                  ? "Today"
                  : index === 1
                    ? "Tomorrow"
                    : day.dateObj.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
              }
            </div>
            <img src="${this.getWeatherIcon(day.icon)}" alt="${day.description}" class="daily-icon">
            <div class="daily-temps">
              <div class="daily-high">${day.tempHigh}°</div>
              <div class="daily-low">${day.tempLow}°</div>
            </div>
            <div class="daily-desc">${day.description}</div>
            <div class="daily-details">
              💧 ${day.precipitation}%<br>
              💨 ${day.windSpeed} m/s<br>
              ☀️ UV ${day.uvIndex}
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
  }

  renderRadar() {
    return `
      <div class="radar-container">
        <h3 style="margin-bottom: 20px;">🛰️ Interactive Weather Radar</h3>
        <div id="radar-map" class="radar-map"></div>
        <div class="radar-controls">
          <button class="radar-btn active">🌧️ Precipitation</button>
          <button class="radar-btn">☁️ Clouds</button>
          <button class="radar-btn">🌪️ Wind</button>
          <button class="radar-btn">🌡️ Temperature</button>
        </div>
        <div style="margin-top: 16px; font-size: 0.9rem; opacity: 0.8; text-align: center;">
          Interactive map showing real-time weather conditions and patterns
        </div>
      </div>
    `
  }

  renderAirQuality() {
    if (!this.airQualityData) return ""

    return `
      <div class="air-quality">
        <div class="aqi-header">
          <h3>🌫️ Air Quality Index</h3>
          <div>
            <div class="aqi-value">${this.airQualityData.aqi}</div>
            <div class="aqi-status ${this.airQualityData.status.class}">
              ${this.airQualityData.status.text}
            </div>
          </div>
        </div>

        <h4 style="margin: 20px 0 12px 0;">Pollutant Levels</h4>
        <div class="pollutants">
          <div class="pollutant-item">
            <div style="font-weight: 600;">PM2.5</div>
            <div>${this.airQualityData.pollutants.pm25} μg/m³</div>
          </div>
          <div class="pollutant-item">
            <div style="font-weight: 600;">PM10</div>
            <div>${this.airQualityData.pollutants.pm10} μg/m³</div>
          </div>
          <div class="pollutant-item">
            <div style="font-weight: 600;">O₃</div>
            <div>${this.airQualityData.pollutants.o3} μg/m³</div>
          </div>
          <div class="pollutant-item">
            <div style="font-weight: 600;">NO₂</div>
            <div>${this.airQualityData.pollutants.no2} μg/m³</div>
          </div>
          <div class="pollutant-item">
            <div style="font-weight: 600;">SO₂</div>
            <div>${this.airQualityData.pollutants.so2} μg/m³</div>
          </div>
          <div class="pollutant-item">
            <div style="font-weight: 600;">CO</div>
            <div>${this.airQualityData.pollutants.co} μg/m³</div>
          </div>
        </div>

        <h4 style="margin: 20px 0 12px 0;">🌸 Pollen Forecast</h4>
        <div class="pollutants">
          <div class="pollutant-item">
            <div style="font-weight: 600;">🌳 Tree</div>
            <div>Level ${this.airQualityData.pollen.tree}/5</div>
          </div>
          <div class="pollutant-item">
            <div style="font-weight: 600;">🌾 Grass</div>
            <div>Level ${this.airQualityData.pollen.grass}/5</div>
          </div>
          <div class="pollutant-item">
            <div style="font-weight: 600;">🌿 Weed</div>
            <div>Level ${this.airQualityData.pollen.weed}/5</div>
          </div>
        </div>
      </div>
    `
  }

  renderAIAssistant() {
    const suggestions = [
      "What should I wear today?",
      "Is it good weather for a picnic this weekend?",
      "When will the rain stop?",
      "Should I water my plants today?",
      "Best time for morning run?",
      "Do I need an umbrella?",
      "Is the air quality good for cycling?",
      "What's the UV index like today?",
    ]

    return `
      <div class="ai-assistant">
        <div class="ai-header">
          <h3>🧠 AI Weather Assistant</h3>
          <div style="font-size: 0.9rem; opacity: 0.8;">
            Ask me anything about weather, travel planning, or outdoor activities
          </div>
        </div>

        <form id="ai-form">
          <input 
            type="text" 
            name="ai-question" 
            placeholder="e.g., 'Will it rain during my flight to Mumbai?' or 'Best time for morning run?'"
            class="ai-input"
            required
          />
          <button type="submit" class="ai-submit-btn" ${this.aiResponding ? "disabled" : ""}>
            ${this.aiResponding ? "🤔 Thinking..." : "🚀 Ask WeatherLens AI"}
          </button>
        </form>

        <div id="ai-response-container" style="display: none;">
          <!-- AI responses will appear here -->
        </div>

        <div class="ai-suggestions">
          <h4 style="margin-bottom: 12px;">💡 Try asking:</h4>
          <div style="line-height: 1.6;">
            ${suggestions
              .map(
                (suggestion) => `
              <div class="suggestion-item">• ${suggestion}</div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `
  }

  renderFooter() {
    return `
      <div class="weather-footer">
        <div class="footer-controls">
          <button onclick="weatherApp.fetchAllWeatherData('${this.city}')" class="refresh-btn">
            🔄 Refresh Data
          </button>
          <button onclick="weatherApp.exportWeatherData()" class="export-btn">
            📊 Export Data
          </button>
        </div>
        <div class="powered-by">
          <span>⚡ Powered by OpenWeatherMap API</span>
          <span>•</span>
          <span>Last updated: ${new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    `
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.weatherApp = new WeatherLensApp()
})
