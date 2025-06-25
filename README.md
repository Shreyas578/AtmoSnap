# 🌤️ WeatherLens - Advanced Weather Intelligence for Jira

[![Atlassian Forge](https://img.shields.io/badge/Atlassian-Forge-blue.svg)](https://developer.atlassian.com/platform/forge/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.0-blue.svg)](https://www.typescriptlang.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green.svg)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Professional weather intelligence dashboard gadget for Jira with AI-powered insights, interactive radar maps, and comprehensive forecasting.**

![WeatherLens Preview](https://via.placeholder.com/800x400/1e3c72/ffffff?text=WeatherLens+Dashboard)

## ✨ Features

### 🌡️ **Comprehensive Weather Data**
- **Real-time conditions** with 15+ weather metrics
- **15-day extended forecast** with detailed breakdowns
- **72-hour hourly predictions** for precise planning
- **Weather alerts** with severity indicators
- **Moon phases** and astronomical data

### 🛰️ **Interactive Radar System**
- **5 Weather layers**: Precipitation, Clouds, Temperature, Wind, Pressure
- **Multiple base maps**: Street view, Satellite, Dark mode
- **Live animations** with play/pause controls
- **Detailed popups** for every weather element
- **Professional legend** and measurement tools

### 🌫️ **Air Quality Monitoring**
- **Real-time AQI** with health recommendations
- **Pollutant breakdown**: PM2.5, PM10, O3, NO2, SO2, CO
- **Pollen forecast** for trees, grass, and weeds
- **Health impact** assessments

### 🧠 **AI Weather Assistant**
- **Contextual responses** based on current conditions
- **Smart activity suggestions** (running, travel, outdoor events)
- **Clothing recommendations** based on temperature and conditions
- **Natural language processing** for weather queries

### 📱 **User Experience**
- **Responsive design** for all screen sizes
- **City search** with autocomplete and history
- **Geolocation support** for current location
- **Data export** functionality (JSON format)
- **Dark/Light theme** support

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.x or higher
- **Atlassian Forge CLI** installed globally
- **Jira Cloud** development environment
- **OpenWeatherMap API key** (optional for live data)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/weatherlens-jira-gadget.git
   cd weatherlens-jira-gadget
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   cd static/weather-gadget
   npm install
   cd ../..
   \`\`\`

3. **Configure API keys** (optional)
   \`\`\`bash
   # Edit src/index.ts and replace with your OpenWeatherMap API key
   const WEATHER_API_KEY = "your-openweathermap-api-key"
   \`\`\`

4. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

5. **Deploy to Forge**
   \`\`\`bash
   forge deploy
   forge install
   \`\`\`

### Development Mode

\`\`\`bash
# Start development tunnel
forge tunnel

# In another terminal, start React development server
cd static/weather-gadget
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
weatherlens-jira-gadget/
├── 📄 manifest.yml              # Forge app configuration
├── 📁 src/
│   └── 📄 index.ts              # Backend resolvers and API handlers
├── 📁 static/weather-gadget/
│   ├── 📁 src/
│   │   ├── 📄 App.tsx           # Main React application
│   │   └── 📄 index.tsx         # React entry point
│   ├── 📁 public/
│   │   └── 📄 index.html        # HTML template
│   └── 📄 package.json          # Frontend dependencies
├── 📄 script.js                 # Vanilla JS implementation
├── 📄 styles.css                # Professional styling
├── 📄 index.html                # Standalone HTML version
├── 📄 package.json              # Main project dependencies
└── 📄 README.md                 # This file
\`\`\`

## 🔧 Configuration

### Gadget Configuration

Users can configure the following settings in Jira:

- **City**: Default city for weather data
- **Units**: Temperature units (Celsius/Fahrenheit)
- **Language**: Display language for weather descriptions
- **Refresh Rate**: Data update frequency

### Environment Variables

\`\`\`bash
# OpenWeatherMap API (optional - uses mock data if not provided)
WEATHER_API_KEY=your_openweathermap_api_key

# Forge environment
FORGE_ENV=development|staging|production
\`\`\`

## 🎯 Usage

### Adding to Jira Dashboard

1. Navigate to your **Jira Dashboard**
2. Click **"Add gadget"**
3. Search for **"WeatherLens"**
4. Configure your preferred city and settings
5. Click **"Add"** to install

### Using the AI Assistant

Ask natural language questions like:
- *"Should I bring an umbrella today?"*
- *"What should I wear for my morning run?"*
- *"Is it good weather for a picnic this weekend?"*
- *"When will the rain stop?"*
- *"Best time to travel to Mumbai?"*

### Interactive Radar

- **Toggle layers** using the layer control panel
- **Click markers** for detailed weather information
- **Use animation controls** to see weather movement
- **Switch base maps** for different viewing modes

## 🛠️ Development

### Adding New Features

1. **Backend changes**: Edit `src/index.ts` for new resolvers
2. **Frontend changes**: Edit `static/weather-gadget/src/App.tsx`
3. **Styling**: Update `static/weather-gadget/src/App.css`

### Testing

\`\`\`bash
# Run backend tests
npm test

# Run frontend tests
cd static/weather-gadget
npm test
\`\`\`

### Building for Production

\`\`\`bash
# Build React app
cd static/weather-gadget
npm run build

# Deploy to Forge
cd ../..
forge deploy --environment production
\`\`\`

## 🌐 API Integration

### OpenWeatherMap API

WeatherLens integrates with OpenWeatherMap for live weather data:

- **Current Weather**: Real-time conditions
- **5-day Forecast**: Extended predictions
- **Air Quality**: Pollution and pollen data
- **UV Index**: Sun exposure information

### Mock Data Mode

When no API key is provided, WeatherLens uses realistic mock data for demonstration purposes.

## 🎨 Customization

### Themes

\`\`\`css
/* Custom theme variables in styles.css */
:root {
  --primary-color: #1e3c72;
  --secondary-color: #2a5298;
  --accent-color: #4CAF50;
  --text-color: #ffffff;
  --background-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
}
\`\`\`

### Adding Weather Layers

\`\`\`javascript
// Add new weather layer in script.js
this.weatherLayers.newLayer = L.layerGroup()

// Generate layer data
generateNewLayer() {
  // Your layer implementation
}
\`\`\`

## 📊 Performance

### Optimization Features

- **Lazy loading** of map components
- **Data caching** with localStorage
- **Efficient re-rendering** with React optimization
- **Compressed assets** for faster loading
- **CDN integration** for external libraries

### Metrics

- **Initial load**: < 2 seconds
- **Data refresh**: < 1 second
- **Map rendering**: < 500ms
- **AI response**: < 2 seconds

## 🔒 Security

### Data Privacy

- **No personal data** stored on external servers
- **Local storage** for user preferences only
- **HTTPS encryption** for all API calls
- **No tracking** or analytics collection

### API Security

- **Rate limiting** to prevent API abuse
- **Error handling** for failed requests
- **Secure key storage** in Forge environment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- **ESLint** for JavaScript/TypeScript
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data API
- **Leaflet** for interactive mapping
- **Atlassian Forge** for the development platform
- **React** for the frontend framework
- **OpenStreetMap** contributors for map data

## 📞 Support

### Getting Help

- **Documentation**: [Forge Developer Docs](https://developer.atlassian.com/platform/forge/)
- **Issues**: [GitHub Issues](https://github.com/your-username/weatherlens-jira-gadget/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/weatherlens-jira-gadget/discussions)

### Reporting Bugs

Please include:
- **Jira version** and environment
- **Browser** and version
- **Steps to reproduce** the issue
- **Expected vs actual** behavior
- **Screenshots** if applicable

## 🗺️ Roadmap

### Upcoming Features

- [ ] **Historical weather data** and trends
- [ ] **Weather station integration** with real sensor data
- [ ] **Satellite imagery** overlay
- [ ] **Severe weather alerts** with push notifications
- [ ] **Multi-location** dashboard support
- [ ] **Weather-based task** recommendations
- [ ] **Integration** with Jira project planning
- [ ] **Mobile app** companion

### Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added AI assistant and radar animations
- **v1.2.0** - Enhanced air quality monitoring
- **v1.3.0** - Interactive radar with multiple layers

---

<div align="center">

**Made with ❤️ for the Jira community**

[⭐ Star this repo](https://github.com/your-username/weatherlens-jira-gadget) | [🐛 Report Bug](https://github.com/your-username/weatherlens-jira-gadget/issues) | [💡 Request Feature](https://github.com/your-username/weatherlens-jira-gadget/issues)

</div>
