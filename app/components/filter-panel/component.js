import Component from '@ember/component';
import moment from 'moment';

import { computed } from '@ember/object';

export default Component.extend({
  isBothWayFlight: 0,
  selectedSource: null,
  selectedDestination: null,
  departureDate: null,
  returnDate: null,
  sameLocationError: false,

  isDisabled: computed(
    'isBothWayFlight',
    'selectedSource',
    'selectedDestination',
    'departureDate',
    'returnDate', function () {
      const source = this.get('selectedSource');
      const destination = this.get('selectedDestination');
      const departureDate = this.get('departureDate');
      const returnDate = this.get('returnDate');

      if (this.get('isBothWayFlight')) {
        if (source && destination && departureDate && returnDate) return false;
        else return true;
      } else {
        // one way flight
        if (source && destination && departureDate) return false;
        else return true;
      }
    }
  ),

  currentDate: computed(() => moment().subtract(0, 'days')),

  actions: {
    searchAction() {
      const source = this.get('selectedSource');
      const isBothWayFlight = this.get('isBothWayFlight');
      const destination = this.get('selectedDestination');
      const departureDate = moment(this.get('departureDate')).format('ll');
      let returnDate = this.get('returnDate');
      // setting returnDate as null when toggled to 'One Way flight'
      if (!isBothWayFlight) returnDate = null;
      returnDate = returnDate !== null ? moment(returnDate).format('ll') : null;
      if (source === destination) this.set('sameLocationError', true);
      else {
        this.set('sameLocationError', false);
        this.submit({
          isBothWayFlight,
          source,
          destination,
          departureDate,
          returnDate
        });
        // this.sendAction('action', source, destination);
      }
    },

    updateDepartureDate(date) {
      this.set('returnDate', null);
      this.set('departureDate', date);
    },

    updateReturnDate(date) {
      this.set('returnDate', date);
    },

    updateFlightType(type) {
      this.set('isBothWayFlight', Number(type));
    },

    chooseSourceCity(city) {
      this.set('selectedSource', city);
    },

    chooseDestinationCity(city) {
      this.set('selectedDestination', city);
    }
  }
});
