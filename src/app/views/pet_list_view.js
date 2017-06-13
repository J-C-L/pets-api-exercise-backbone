import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import PetView from './pet_view';

var PetListView = Backbone.View.extend({
  initialize: function(options) {
    var self = this;

    this.cardTemplate = _.template($('#pet-card-template').html());
    this.petInfoTemplate = _.template($('#pet-info-template').html());

    // We'll keep track of a list of pet views.
    this.petViewList = [];

    this.model.forEach(function(rawPet) {
      self.addPet(rawPet);
    });
    // bind `this` so it's available inside forEach

    // Keep track of our form input fields
    this.input = {
      name: this.$('.new-pet-form input[name="name"]'),
      age: this.$('.new-pet-form input[name="age"]'),
      breed: this.$('.new-pet-form input[name="breed"]')
    };


    this.listenTo(this.model, 'add', this.addPet);
    this.listenTo(this.model, "update", this.render);
  },

  render: function() {

    var self = this;
    self.$('.pet-cards').empty();

    this.petViewList.forEach(function(petView) {
      petView.render();
      self.$('.pet-cards').append(petView.$el);
    });
    return this;
  },
  events: {
    'click .add-pet': 'createPet',
    'click .cancel-add': 'clearInput'
  },


  // Turn a raw pet into a Pet model, create a view for it, and add that to our list of views.
  addPet: function(pet) {
    // Create a view for the new pet
    var petView = new PetView({
      model: pet,
      cardTemplate: this.cardTemplate,
    });

    this.listenTo(petView, 'petClicked', this.showPetDetals);

    // Add the pet to our pet list
    this.petViewList.push(petView);
  },

  showPetDetals: function(pet) {
    // console.log('In showPetDetals for pet ' + pet.get('name'));

    var html = this.petInfoTemplate({pet: pet.toJSON()});
    this.$('#pet').html(html);
  },

  getInput: function() {
    var pet = {
        name: this.input.name.val(),
        age: this.input.age.val(),
        breed: this.input.breed.val()
    };
    return pet;
  },

  createPet: function(event) {
     event.preventDefault();
    // Get the input data from the form and turn it into a task
    var rawPet = this.getInput();
    console.log(rawPet.name);
    // alert("You have added a pet named: "+rawPet.name);


    // Add the task to our collection
    // this.model.add(rawPet); WITHOUT API
    this.model.create(rawPet);

    // Clear the input form so the user can add another pet
    this.clearInput();
  },


  clearInput: function(event) {
    console.log("clearInput called!");
    this.input.name.val('');
    this.input.age.val('');
    this.input.breed.val('');
  }


});

export default PetListView;
