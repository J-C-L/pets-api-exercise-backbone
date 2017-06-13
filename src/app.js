import $ from 'jquery';
import _ from 'underscore';

import PetList from 'app/collections/pet_list';
import PetListView from 'app/views/pet_list_view';

$(document).ready(function() {


  var petList = new PetList();
  petList.fetch();

  var petListViewParams = {
    el: $('main'),
    model: petList
  };

  var myPetListView = new PetListView(petListViewParams);
  // myPetListView.render(); //Don't want the render to happen until there's an update event triggered by the return of the API call. Taken care of by backbone(using AJAX), which adds the results of the API call to the collection. Then handled by an event listener on the pet_list_view to listen for updates to the collection, and call render at that time.

});
