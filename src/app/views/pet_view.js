import Backbone from 'backbone';

var PetView = Backbone.View.extend({

  initialize: function(options) {
    this.template = options.cardTemplate;
  },

  render: function() {
    var html = this.template({pet: this.model.toJSON()} );
    this.$el.html(html);

    // console.log("IndivRender");

    // Re-attach DOM event listeners to our brand-spankin-new HTML
    this.delegateEvents();

    // Enable chained calls
    return this;
  },

  events: {
    "click .show-details": "onClick",
    "click .delete-pet": "deletePet"
    // "dblclick": "editHandler"
  },
  onClick: function(event) {
    console.log("onClick called");
    this.trigger('showDetailsClicked', this.model);
  },

deletePet: function(event) {
  console.log("delePet called!");
  if (window.confirm("Are you sure you want to delete this pet?")) {
    console.log("going to delete it!");
    this.model.destroy();
  }
},


});

export default PetView;
