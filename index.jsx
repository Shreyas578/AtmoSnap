"use client"

// Forge Frontend (static/hello-world/src/index.jsx)
import { useState, useEffect } from "react"
import { invoke } from "@forge/bridge"

function WeatherLensApp() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [hourlyData, setHourlyData] = useState(null)
  const [airQualityData, setAirQualityData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState("London")
  const [inputCity, setInputCity] = useState("London")
  const [activeTab, setActiveTab] = useState("current")
  const [forecastType, setForecastType] = useState("daily")
  const [error, setError] = useState(null)
  const [aiResponse, setAiResponse] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  const fetchAllWeatherData = async (cityName) => {
    setLoading(true)
    setError(null)

    try {
      console.log("Fetching comprehensive weather data for:", cityName)

      // Fetch current weather
      const weatherResponse = await invoke("getWeatherData", {
        city: cityName,
        units: "metric",
        lang: "en",
      })

      if (weatherResponse.success) {
        setWeatherData(weatherResponse.weather)

        // Fetch extended forecast
        const forecastResponse = await invoke("getExtendedForecast", {
          city: cityName,
          units: "metric",
          days: 15,
        })
        if (forecastResponse.success) {
          setForecastData(forecastResponse.forecast)
        }

        // Fetch hourly forecast
        const hourlyResponse = await invoke("getHourlyForecast", {
          city: cityName,
          units: "metric",
          hours: 72,
        })
        if (hourlyResponse.success) {
          setHourlyData(hourlyResponse.hourly)
        }

        // Fetch air quality
        const airQualityResponse = await invoke("getAirQuality", {
          city: cityName,
          lat: weatherResponse.weather.coordinates?.lat,
          lon: weatherResponse.weather.coordinates?.lon,
        })
        if (airQualityResponse.success) {
          setAirQualityData(airQualityResponse.airQuality)
        }
      } else {
        setError(weatherResponse.error || "Failed to fetch weather data")
      }
    } catch (err) {
      console.error("Error in fetchAllWeatherData:", err)
      setError(`Error: ${err.message}`)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchAllWeatherData(city)
  }, [city])

  const handleCitySubmit = (e) => {
    e.preventDefault()
    if (inputCity.trim()) {
      setCity(inputCity.trim())
    }
  }

  const handleAIQuestion = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const question = formData.get("ai-question")

    if (question && question.trim()) {
      setAiLoading(true)
      setAiResponse("")

      try {
        const response = await invoke("askAIAssistant", {
          question: question.trim(),
          weatherData: weatherData,
          location: city,
        })

        if (response.success) {
          setAiResponse(response.response)
        } else {
          setAiResponse("Sorry, I couldn't process your question right now. Please try again.")
        }
      } catch (err) {
        console.error("AI Assistant error:", err)
        setAiResponse("Sorry, there was an error processing your question.")
      }

      setAiLoading(false)
      e.target.reset()
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCity("Current Location")
          fetchAllWeatherData("Current Location")
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

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const getWindDirection = (degrees) => {
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

  const getMoonPhase = (phase) => {
    if (phase < 0.125) return "🌑 New Moon"
    if (phase < 0.25) return "🌒 Waxing Crescent"
    if (phase < 0.375) return "🌓 First Quarter"
    if (phase < 0.5) return "🌔 Waxing Gibbous"
    if (phase < 0.625) return "🌕 Full Moon"
    if (phase < 0.75) return "🌖 Waning Gibbous"
    if (phase < 0.875) return "🌗 Last Quarter"
    return "🌘 Waning Crescent"
  }

  const getAQIStatusClass = (aqi) => {
    if (aqi <= 50) return "aqi-good"
    if (aqi <= 100) return "aqi-moderate"
    return "aqi-unhealthy"
  }

  const getAQIStatusText = (aqi) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive"
    return "Unhealthy"
  }

  // Inline styles for the component
  const styles = {
    container: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      color: "white",
      borderRadius: "20px",
      padding: "28px",
      minHeight: "500px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "28px",
      flexWrap: "wrap",
      gap: "16px",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "700",
      margin: 0,
      background: "linear-gradient(45deg, #fff, #a8edea)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    headerControls: {
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    searchForm: {
      display: "flex",
      gap: "8px",
    },
    searchInput: {
      padding: "12px 16px",
      border: "none",
      borderRadius: "12px",
      fontSize: "14px",
      minWidth: "180px",
      background: "rgba(255,255,255,0.95)",
      color: "#333",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    button: {
      padding: "12px 16px",
      border: "none",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.2)",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },
    tabContainer: {
      display: "flex",
      gap: "8px",
      marginBottom: "28px",
      flexWrap: "wrap",
    },
    tabBtn: {
      padding: "12px 20px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.1)",
      color: "white",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
    },
    activeTab: {
      background: "rgba(255,255,255,0.3)",
      borderColor: "rgba(255,255,255,0.6)",
      boxShadow: "0 4px 15px rgba(255,255,255,0.1)",
    },
    loading: {
      textAlign: "center",
      padding: "80px 20px",
    },
    spinner: {
      width: "60px",
      height: "60px",
      border: "4px solid rgba(255,255,255,0.3)",
      borderTop: "4px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto 24px",
    },
    error: {
      textAlign: "center",
      padding: "80px 20px",
    },
    errorIcon: {
      fontSize: "4rem",
      marginBottom: "20px",
    },
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <h3>🌤️ WeatherLens</h3>
          <p>Loading comprehensive weather intelligence...</p>
          <div style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "12px" }}>
            Fetching current conditions, forecasts, air quality, and AI insights
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <div style={styles.errorIcon}>⚠️</div>
          <img src="ChatGPT Image Jun 25, 2025, 10_27_28 PM.png" height="100" width="100"></img>
          <p>{error}</p>
          <button onClick={() => fetchAllWeatherData(city)} style={styles.button}>
            🔄 Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🌤️ AtmoSnap</h1>
        <div style={styles.headerControls}>
          <form onSubmit={handleCitySubmit} style={styles.searchForm}>
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Search cities worldwide..."
              style={styles.searchInput}
            />
            <button type="submit" style={styles.button}>
              🔍
            </button>
          </form>
          <button onClick={getCurrentLocation} style={styles.button} title="Use current location">
            📍
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        {[
          { id: "current", label: "🌡️ Current" },
          { id: "forecast", label: "📅 Forecast" },
          { id: "radar", label: "🛰️ Radar" },
          { id: "air-quality", label: "🌫️ Air Quality" },
          { id: "ai-assistant", label: "🧠 AI Assistant" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tabBtn,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === "current" && weatherData && (
        <div>
          {/* Weather Alerts */}
          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <div
              style={{
                background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "20px",
                borderLeft: "4px solid #ff3838",
              }}
            >
              {weatherData.alerts.map((alert, index) => (
                <div key={index}>
                  <div
                    style={{
                      fontWeight: "600",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>⚠️</span>
                    {alert.type}
                  </div>
                  <div>{alert.message}</div>
                </div>
              ))}
            </div>
          )}

          {/* Main Weather Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "32px",
              alignItems: "center",
              marginBottom: "28px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "1.6rem",
                  fontWeight: "600",
                  margin: "0 0 16px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>📍</span>
                {weatherData.city}, {weatherData.country}
              </h2>
              <div
                style={{
                  fontSize: "4.5rem",
                  fontWeight: "200",
                  lineHeight: 1,
                  margin: "16px 0",
                  background: "linear-gradient(45deg, #fff, #a8edea)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {weatherData.temperature}°C
              </div>
              <div style={{ fontSize: "1.1rem", opacity: 0.8, marginBottom: "12px" }}>
                Feels like {weatherData.feelsLike}°C
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "8px" }}>
                {getMoonPhase(weatherData.moonPhase)}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src={getWeatherIcon(weatherData.icon) || "/placeholder.svg"}
                alt={weatherData.description}
                style={{ width: "120px", height: "120px", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" }}
              />
              <div
                style={{
                  fontSize: "1.1rem",
                  textTransform: "capitalize",
                  opacity: 0.9,
                  marginTop: "12px",
                  fontWeight: "500",
                }}
              >
                {weatherData.description}
              </div>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "20px",
              background: "rgba(255,255,255,0.1)",
              padding: "28px",
              borderRadius: "16px",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {[
              { label: "💧 Humidity", value: weatherData.humidity, unit: "%" },
              { label: "🌪️ Pressure", value: weatherData.pressure, unit: "hPa" },
              {
                label: "💨 Wind",
                value: weatherData.windSpeed,
                unit: `m/s ${getWindDirection(weatherData.windDirection)}`,
              },
              { label: "👁️ Visibility", value: weatherData.visibility, unit: "km" },
              {
                label: "☀️ UV Index",
                value: weatherData.uvIndex,
                unit: weatherData.uvIndex > 7 ? "High" : weatherData.uvIndex > 3 ? "Moderate" : "Low",
              },
              { label: "💧 Dew Point", value: weatherData.dewPoint, unit: "°C" },
              { label: "☁️ Cloud Cover", value: weatherData.cloudCover, unit: "%" },
              { label: "🌅 Sunrise", value: formatTime(weatherData.sunrise), unit: "" },
              { label: "🌇 Sunset", value: formatTime(weatherData.sunset), unit: "" },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "16px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  transition: "transform 0.3s ease",
                }}
              >
                <span style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "8px", fontWeight: "500" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "1.3rem", fontWeight: "600" }}>{item.value}</span>
                <span style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "4px" }}>{item.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forecast Tab */}
      {activeTab === "forecast" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>📅 Weather Forecast</h3>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            <button
              onClick={() => setForecastType("hourly")}
              style={{
                ...styles.tabBtn,
                ...(forecastType === "hourly" ? styles.activeTab : {}),
                padding: "8px 16px",
                fontSize: "12px",
              }}
            >
              72-Hour Hourly
            </button>
            <button
              onClick={() => setForecastType("daily")}
              style={{
                ...styles.tabBtn,
                ...(forecastType === "daily" ? styles.activeTab : {}),
                padding: "8px 16px",
                fontSize: "12px",
              }}
            >
              15-Day Daily
            </button>
          </div>

          {forecastType === "hourly" && hourlyData && (
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", padding: "16px 0" }}>
              {hourlyData.slice(0, 24).map((hour, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: "80px",
                    textAlign: "center",
                    padding: "16px 8px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "8px" }}>{hour.time}</div>
                  <img
                    src={getWeatherIcon(hour.icon) || "/placeholder.svg"}
                    alt={hour.description}
                    style={{ width: "40px", height: "40px", margin: "8px auto" }}
                  />
                  <div style={{ fontSize: "1rem", fontWeight: "600" }}>{hour.temperature}°</div>
                  <div style={{ fontSize: "0.7rem", opacity: 0.7 }}>{hour.precipitation}%</div>
                </div>
              ))}
            </div>
          )}

          {forecastType === "daily" && forecastData && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {forecastData.map((day, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto auto 2fr auto",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ fontSize: "1rem", fontWeight: "500" }}>
                    {index === 0
                      ? "Today"
                      : index === 1
                        ? "Tomorrow"
                        : new Date(day.dateObj).toLocaleDateString([], {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                  </div>
                  <img
                    src={getWeatherIcon(day.icon) || "/placeholder.svg"}
                    alt={day.description}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>{day.tempHigh}°</div>
                    <div style={{ fontSize: "1rem", opacity: 0.7 }}>{day.tempLow}°</div>
                  </div>
                  <div style={{ fontSize: "0.9rem", opacity: 0.9, textTransform: "capitalize" }}>{day.description}</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8, textAlign: "right" }}>
                    💧 {day.precipitation}%<br />💨 {day.windSpeed} m/s
                    <br />
                    ☀️ UV {day.uvIndex}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Air Quality Tab */}
      {activeTab === "air-quality" && airQualityData && (
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "24px",
            borderRadius: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3>🌫️ Air Quality Index</h3>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "600" }}>{airQualityData.aqi}</div>
              <div
                style={{
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                  background:
                    getAQIStatusClass(airQualityData.aqi) === "aqi-good"
                      ? "#27ae60"
                      : getAQIStatusClass(airQualityData.aqi) === "aqi-moderate"
                        ? "#f39c12"
                        : "#e74c3c",
                }}
              >
                {getAQIStatusText(airQualityData.aqi)}
              </div>
            </div>
          </div>

          <h4 style={{ margin: "20px 0 12px 0" }}>Pollutant Levels</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {Object.entries(airQualityData.pollutants).map(([key, value]) => (
              <div
                key={key}
                style={{
                  textAlign: "center",
                  padding: "12px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                }}
              >
                <div style={{ fontWeight: "600" }}>{key.toUpperCase()}</div>
                <div>{value} μg/m³</div>
              </div>
            ))}
          </div>

          <h4 style={{ margin: "20px 0 12px 0" }}>🌸 Pollen Forecast</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "12px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontWeight: "600" }}>🌳 Tree</div>
              <div>Level {airQualityData.pollen.tree}/5</div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "12px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontWeight: "600" }}>🌾 Grass</div>
              <div>Level {airQualityData.pollen.grass}/5</div>
            </div>
            <div
              style={{
                textAlign: "center",
                padding: "12px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontWeight: "600" }}>🌿 Weed</div>
              <div>Level {airQualityData.pollen.weed}/5</div>
            </div>
          </div>
        </div>
      )}

      {/* Radar Tab */}
      {activeTab === "radar" && (
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "24px",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>🛰️ Weather Radar & Maps</h3>
          <div
            style={{
              width: "100%",
              height: "300px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              opacity: 0.7,
            }}
          >
            <div>
              <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🗺️</div>
              <div>Interactive Weather Radar</div>
              <div style={{ fontSize: "0.9rem", marginTop: "8px", opacity: 0.7 }}>
                Real-time precipitation, clouds, and storm tracking
              </div>
              <div style={{ marginTop: "20px", fontSize: "0.8rem" }}>
                <div>🌧️ Precipitation Layer</div>
                <div>☁️ Cloud Cover</div>
                <div>🌪️ Storm Tracking</div>
                <div>🌡️ Temperature Heatmap</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Tab */}
      {activeTab === "ai-assistant" && (
        <div
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            padding: "24px",
            borderRadius: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <h3>🧠 AI Weather Assistant</h3>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Ask me anything about weather, travel planning, or outdoor activities
            </div>
          </div>

          <form onSubmit={handleAIQuestion}>
            <input
              type="text"
              name="ai-question"
              placeholder="e.g., 'Will it rain during my flight to Mumbai?' or 'Best time for morning run?'"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "none",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.9)",
                color: "#333",
                marginBottom: "12px",
              }}
              required
            />
            <button type="submit" style={{ ...styles.button, width: "100%" }} disabled={aiLoading}>
              {aiLoading ? "🤔 Thinking..." : "Ask WeatherLens AI"}
            </button>
          </form>

          {aiResponse && (
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "16px",
                borderRadius: "12px",
                marginTop: "12px",
                lineHeight: 1.6,
              }}
            >
              <strong>🤖 WeatherLens AI:</strong>
              <br />
              {aiResponse}
            </div>
          )}

          <div style={{ marginTop: "20px", fontSize: "0.9rem", opacity: 0.8 }}>
            <h4 style={{ marginBottom: "12px" }}>💡 Try asking:</h4>
            <div style={{ lineHeight: 1.6 }}>
              • "What should I wear today?"
              <br />• "Is it good weather for a picnic this weekend?"
              <br />• "When will the rain stop?"
              <br />• "Should I water my plants today?"
              <br />• "Best time to travel to [destination]?"
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "28px",
          paddingTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button onClick={() => fetchAllWeatherData(city)} style={styles.button}>
            🔄 Refresh Data
          </button>
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            opacity: 0.6,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>⚡ Powered by OpenWeatherMap API</span>
          <span>•</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherLensApp
