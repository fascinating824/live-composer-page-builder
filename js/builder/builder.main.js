/**
 * Main builder file
 */

"use strict";

var dslcRegularFontsArray = DSLCFonts.regular;
var dslcGoogleFontsArray = DSLCFonts.google;
var dslcAllFontsArray = dslcRegularFontsArray.concat( dslcGoogleFontsArray );

// Set current/default icons set
var dslcIconsCurrentSet = DSLCIcons.fontawesome;
var dslcDebug = false;


// Global Plugin Object
var LiveComposer = {

    Builder: {

        Elements: {},
        UI: {},
        Actions: {},
        Flags: {},
        PreviewFrame: {},
        Helpers: {}
    },
    Production: {

    },
    Utils: {}
};

(function(){

	LiveComposer.Builder.Flags = {

		generate_code_after_row_changed: true
	};

	LiveComposer.Builder.Actions = {

		postponed_actions_queue: {},
		add_postponed_action: function( action_name ) {

			if (action_name === undefined) {
			   return;
			}

			if ( isNaN ( this.postponed_actions_queue[ action_name ] ) ) {
				this.postponed_actions_queue[ action_name ] = 0;
			}

			this.postponed_actions_queue[ action_name ] += 1;
		},

		release_postponed_actions: function() {

			var self = this;

			jQuery.each( this.postponed_actions_queue, function(index, value) {

				if ( 1 < value ) {
					self.postponed_actions_queue[index] -= 1;
				} else if ( 1 == value ) {
					window[index](); // Run function with action name
					self.postponed_actions_queue[index] -= 1;
				}
			});
		}
	}
}());