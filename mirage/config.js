import { faker } from "ember-cli-mirage";
export default function() {
  this.namespace = "api";

  this.get("/flights", () => {
    return {
      data: [...generateFlightStub()]
    };
  });
}

const generateFlightStub = () => {
  const flightBetweenCities = 4;
  const attributes = [];
  const cities = ["Bangalore", "Chennai", "Kolkata"]; // list of cities
  const mappedCities = cities.map(sourceCity => {
    return {
      source: sourceCity,
      dest: cities.filter(city => city !== sourceCity)
    };
  });

  mappedCities.forEach(cityMap => {
    // creating 'flightBetweenCities' no. of flights for each city
    cityMap.dest.forEach(destination => {
      for (let i = 0; i < flightBetweenCities; i++) {
        attributes.push({
          flight_name: "AI-" + faker.helpers.replaceSymbolWithNumber("###"),
          source: cityMap.source,
          destination,
          departure_time: faker.random.number({
            min: 0,
            max: 24
          }),
          duration_in_hr: faker.random.number({
            min: 2,
            max: 4
          }),
          currency: "INR",
          price: faker.commerce.price(2000, 10000, 2)
        });
      }
    });
  });
  return attributes.map((attributes, index) => {
    // generate flights stub data acc. to JSON API structure
    return {
      id: index + 1,
      type: "flights",
      attributes
    };
  });
};
