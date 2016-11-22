// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require cable
//= require reveal/reveal
//= require reveal/plugin/highlight/highlight.js

function initAuthor() {
  Reveal.initialize({
    hideAddressBar: true,
    keyboard: true,
    controls: true,
    progress: false,
    center: true,
  });

  App.messages = App.cable.subscriptions.create("SlidesChannel", {
    broadcastCurrentSlide: function(data) {
      this.perform("broadcast_current_slide", data);
    },
  });

  Reveal.addEventListener( 'slidechanged', function( event ) {
    App.messages.broadcastCurrentSlide({"current_slide": event.indexh});
  } );
}

function initUser() {
  Reveal.initialize({
    hideAddressBar: true,
    keyboard: false,
    controls: false,
    progress: false,
    center: true,
  });

  App.messages = App.cable.subscriptions.create("SlidesChannel", {
    received: function(data) {
      // Navigate to slide data["slide"]
      Reveal.slide(data["current_slide"]);
    },

    getCurrentSlide: function() {
      this.perform("get_current_slide")
    },

    connected: function() {
      App.messages.getCurrentSlide();
    },
  });
}

if (window.author === true) {
  initAuthor();
} else {
  initUser();
}
