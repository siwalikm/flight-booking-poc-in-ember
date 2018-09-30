import Component from "@ember/component";
import moment from 'moment';

import { computed } from "@ember/object";

export default Component.extend({
  selectedSource: null,
  selectedDestination: null,

  getCities: computed(function() {
    const cities = this.get("flightData").map(el => el.source);
    return [...new Set(cities)];
  }),

  currentDate: computed(function() {
    console.log('im here');
    
    return moment().subtract(0, 'days');
  }),

  // updateMonth: task(function*({ date }) {
  //   yield timeout(600);
  //   this.set("center", date);
  // }).drop(),

  actions: {
    updateDate(xxx) {
      debugger;
      console.log(xxx);
      
    },
    chooseSourceCity(city) {
      this.set("selectedSource", city);
    },

    chooseDestinationCity(city) {
      this.set("selectedDestination", city);
    }
  }
});
