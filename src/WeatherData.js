export default class WeatherData {
    data = {};
    constructor(data) {
        this.data = data;
    }

    // celcius - formatted with 1 decimal
    temperature() {
        return Math.round(this.data.temperature * 100)/100;
    }

    // m/s 
    windspeed() {
        return Math.round(this.data.CurrentWindSpeed / 3.6 * 10) / 10;
    }

    // m/s
    currentWindGust() {
        return this.calculateMeterPrSecondFromKilometersPrHour(this.data.CurrentWindGust);
    }

    windGustMax() {
        return this.calculateMeterPrSecondFromKilometersPrHour(this.data.WindGustMax);
    }

    windGustMin() {
        return this.calculateMeterPrSecondFromKilometersPrHour(this.data.WindGustMin);
    }

    calculateMeterPrSecondFromKilometersPrHour(input) {
        return Math.round(input / 3.6 * 10) / 10;
    }
}