import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';


module('Unit | Controller | index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:index');
    assert.ok(controller);
  });

  test('it should convert amount to currency  string', function(assert) {
    const controller = this.owner.lookup('controller:index');
    const numToCurrency = controller.get('numberToCurrency');
    assert.equal(numToCurrency('2000', 'INR'), '₹ 2,000.00');
  });


  test('it`s return type should be array', function(assert) {
    const controller = this.owner.lookup('controller:index');
    // const selectedFlightsId = ;
    assert.equal(controller.get('selectedFlightsId').__proto__.constructor.name, 'Array');
  });
});
