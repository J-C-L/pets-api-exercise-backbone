import Backbone from 'backbone';

var PetView = Backbone.View.extend({

  initialize: function(options) {
    this.template = options.cardTemplate;
  },

  render: function() {
    var html = this.template({pet: this.model.toJSON()} );
    this.$el.html(html);

    console.log("IndivRender");



    // Re-attach DOM event listeners to our brand-spankin-new HTML
    // this.delegateEvents();

    // Enable chained calls
    return this;
  },

  events: {
    "click": "onClick"
    // "click .delete-button": "deleteHandler",
    // "dblclick": "editHandler"
  },
  onClick: function(event) {
    console.log("onClick called");
    this.trigger('petClicked', this.model);
  }

});

export default PetView;
