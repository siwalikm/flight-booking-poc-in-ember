import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  inrTypeface: '₹',
  minRange: 2000,
  maxRange: 10000,
  minPriceValue: 2000,
  maxPriceValue: 10000,
  isSliderVisible: false,
  source: null,
  destination: null,
  departureDate: null,
  returnDate: null,
  isBothWayFlight: null,
  isSelectionComplete: false,
  showSuccessMessage: false,

  selectedFlightsId: computed(function () {
    return [];
  }),


  getCities: computed(function () {
    let model = this.get('model');
    const cities = model.map(el => el.source);
    return [...new Set(cities)];
  }),

  selectedFlightData: computed('isSelectionComplete', function () {
    if (this.get('isSelectionComplete')) {
      const selectedFlightsId = this.get('selectedFlightsId');
      const model = this.get('model');
      let totalPrice = 0;
      let currency;
      let flights = selectedFlightsId.map(id => {
        return model.find(flight => {
          if (flight.id == id) {
            const midNightMilitaryTime = 24;
            let flightLandingTime = flight.departure_time + flight.duration_in_hr;
            if (flightLandingTime > midNightMilitaryTime) {
              flightLandingTime = flightLandingTime - midNightMilitaryTime;
            }
            flight.set('timeMap', `${flight.departure_time}:00 - ${flightLandingTime}:00`);
            totalPrice += flight.price;
            currency = flight.currency;
            return flight;
          } else return;
        });
      });
      return {
        totalPrice: this.numberToCurrency(totalPrice, currency),
        flights
      }
    }
    else return false;
  }),

  numberToCurrency: ((amount, currency) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency })
      .format(amount);
  }),

  filteredFlights: computed(
    'source',
    'destination',
    'departureDate',
    'minPriceValue',
    'maxPriceValue',
    'returnDate', function () {
      let model = this.get('model');
      return model
        .filter(flight => {
          // sorting relevent flights based on to and fro locations
          return (
            flight.destination == this.get('destination') &&
            flight.source == this.get('source') &&
            flight.price >= this.get('minPriceValue') && flight.price <= this.get('maxPriceValue')
          );
        })
        .map(flight => {
          const midNightMilitaryTime = 24;
          let flightLandingTime = flight.departure_time + flight.duration_in_hr;
          if (flightLandingTime > midNightMilitaryTime) {
            flightLandingTime = flightLandingTime - midNightMilitaryTime;
          }
          flight.set('timeMap', `${flight.departure_time}:00 - ${flightLandingTime}:00`);
          flight.set('processedSum', this.numberToCurrency(flight.price, flight.currency));
          return flight;
        });

    }
  ),

  actions: {

    minSlider(el) {
      this.set('minPriceValue', el);
    },


    maxSlider(el) {
      this.set('maxPriceValue', el);
    },

    formSubmit(formData) {
      this.set('isSliderVisible', true);
      this.set('selectedFlightsId', []);
      this.set('isSelectionComplete', false);
      this.set('source', formData.source);
      this.set('destination', formData.destination);
      this.set('departureDate', formData.departureDate);
      this.set('returnDate', formData.returnDate);
      this.set('isBothWayFlight', formData.isBothWayFlight);
    },

    fakeCheckout() {
      this.set('showSuccessMessage', true);
      setTimeout(() => {
        window.location.reload(true);
      }, 5000);
    },

    selectFlight(flightId) {
      const isBothWayFlight = this.get('isBothWayFlight');
      this.get('selectedFlightsId').pushObject(flightId);
      if (isBothWayFlight) {
        if (this.get('selectedFlightsId').length > isBothWayFlight) this.set('isSelectionComplete', true);
        const source = this.get('source');
        this.set('source', this.get('destination'));
        this.set('destination', source);
      } else this.set('isSelectionComplete', true);
    }
  }
});
