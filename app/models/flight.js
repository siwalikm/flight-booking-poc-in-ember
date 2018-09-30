import DS from 'ember-data';

export default DS.Model.extend({
    flight_name: DS.attr('string'),
    source: DS.attr('string'),
    destination: DS.attr('string'),
    departure_time: DS.attr('number'),
    duration_in_hr: DS.attr('number'),
    currency: DS.attr('string'),
    price: DS.attr('number')
});
