import Component from "@ember/component";
import moment from "moment";

import { computed } from "@ember/object";

export default Component.extend({
  isBothWayFlight: 0,
  selectedSource: null,
  selectedDestination: null,
  departureDate: null,
  returnDate: null,
  sameLocationError: false,

  getCities: computed(function() {
    const cities = this.get("flightData").map(el => el.source);
    return [...new Set(cities)];
  }),

  isDisabled: computed(
    "isBothWayFlight",
    "selectedSource",
    "selectedDestination",
    "departureDate",
    "returnDate",
    function() {
      const source = this.get("selectedSource");
      const destination = this.get("selectedDestination");
      const departure = this.get("departureDate");
      const returnDate = this.get("returnDate");

      if (this.get("isBothWayFlight")) {
        if (source && destination && departure && returnDate) return false;
        else return true;
      } else {
        // one way flight
        if (source && destination && departure) return false;
        else return true;
      }
    }
  ),

  currentDate: computed(() => moment().subtract(0, "days")),

  actions: {
    searchAction() {
      const source = this.get("selectedSource");
      const destination = this.get("selectedDestination");

      if (source === destination) this.set('sameLocationError', true);
      else {
        this.set('sameLocationError', false);
      }
    },

    updateDepartureDate(date) {
      this.set("returnDate", null);
      this.set("departureDate", date);
    },

    updateReturnDate(date) {
      this.set("returnDate", date);
    },

    updateFlightType(type) {
      this.set("isBothWayFlight", Number(type));
    },

    chooseSourceCity(city) {
      this.set("selectedSource", city);
    },

    chooseDestinationCity(city) {
      this.set("selectedDestination", city);
    }
  }
});
