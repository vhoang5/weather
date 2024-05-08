import axios from 'axios';

class UtilService {
  temperatureUnit= '';

  async getTemperatureUnit(): Promise<string> {
    return new Promise((resolve, _reject) => {
      // Check cache data
      if (this.temperatureUnit) {
        resolve(this.temperatureUnit);
      } else {
        // Set default unit
        const defaultUnit = 'metric';
        const imperialCountries: string[] = ['US', 'BS', 'KY', 'BZ', 'PW', 'MH', 'FM', 'LR'];
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const data = await axios.get(`https://geocode.xyz/${latitude},${longitude}?json=1`);
              const { prov } = data.data;
              const unit = imperialCountries.includes(prov) ? 'imperial' : 'metric';
              // Store unit value
              this.temperatureUnit = unit;
              resolve(unit);
            } catch (error) {
              // Return default value when can't fetching geolocation 
              console.error('Error fetching geolocation:', error);
              resolve(defaultUnit);
            }
          },
          (error) => {
            console.error('Error getting geolocation:', error);
            resolve(defaultUnit);
          },
        );
      }
    });
  }
}

export default new UtilService();
