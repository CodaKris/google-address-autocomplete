import Helper from '../src/Helper'
import Settings from '../src/Settings'
import UI from '../src/UI'

var gaAutoComplete = {

    init(selector, options) {
        "use strict";

        let self = this,
            qs = document.querySelector.bind(document)

        Helper.ready(function () {

            Helper.extend(Settings.data, options || {})

            Settings.set('element', qs(selector))

            if (null === Settings.get('element')) {
                console.warn('Element not found')
                return false
            }
            if (typeof google === 'undefined') {
                console.warn('Google library not found')
                return false
            }

            if (typeof google.maps.places.AutocompleteService === 'function') {
                Settings.set('AutocompleteService', new google.maps.places.AutocompleteService())
            }

            if (typeof google.maps.places.PlacesService === 'function') {
                Settings.set('PlacesService', new google.maps.places.PlacesService(document.createElement('div')))
            }
            //listen for key events
            Helper.listen(Settings.get('element'), 'keyup', UI.search)
        })
    }
}

module.exports = gaAutoComplete;

// Allow use of default import syntax in TypeScript
module.exports.default = gaAutoComplete;