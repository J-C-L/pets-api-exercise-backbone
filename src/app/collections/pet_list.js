import Backbone from 'backbone';

import Pet from 'app/models/pet';

var PetList = Backbone.Collection.extend({
  model: Pet,
  url: 'http://petdibs.herokuapp.com/pets',
  // parse: function(data) {
  //   return data;
  // }
});

export default PetList;
