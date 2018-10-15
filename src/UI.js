let Settings = require('../src/Settings'),
    Helper = require('../src/Helper'),
    DataHandler = require('../src/DataHandler'),
    keypress_timeout = null


//UIs the drop down list with the results
let UI = {

    search: function (event) {

        "use strict"

        let charCode = (typeof event.which == "number") ? event.which : event.keyCode,
            inp = String.fromCharCode(charCode),
            val = this.value,
            options = {},
            predictions = null

        const ESCAPE_KEY = 27,
            ANDROID_SCREENKEYBOARD_KEYCODE = 229

        clearTimeout(keypress_timeout)

        //test for input we are not interested in
        if (charCode > 0 &&
            charCode != ESCAPE_KEY && //escape key
            charCode != ANDROID_SCREENKEYBOARD_KEYCODE && //default keyboard always gives this value so need to let it pass
            !Settings.get('addressTestRegex').test(inp)) {
            return
        }
        if (val.length > Settings.get('minLength')) {

            options = Settings.get('AutocompleteServiceOptions')
            options.input = val

            keypress_timeout = setTimeout(function () {

                DataHandler
                    .getAutocompletePredictions(Settings.get('AutocompleteService'),
                        options,
                        UI.RenderListItems
                    )

            }, Settings.get('throttleTime'))
        }

    },

    listItemClick: function (event) {


        //get the result from the api which will fire the user callback
        DataHandler.processResult(this.dataset)
        UI.tidyUp()

    },

    //callback function for getAutocompletePredictions
    RenderListItems: function (predictions) {

        let container = document.querySelector(Settings.get('resultContainerSelector'))

        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild)
        }

        Object.keys(predictions).forEach(key => {

            let listItem = document.createElement('li')
            listItem.innerHTML = predictions[key].description
            listItem.dataset.placeid = predictions[key].place_id
            listItem.dataset.prediction = predictions[key].description

            Helper.listen(listItem, 'click', UI.listItemClick)

            container.appendChild(listItem)
        })

        container.style.display = 'block'
    },

    tidyUp: function () {

        let container = document.querySelector(Settings.get('resultContainerSelector'))

        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild)
        }

        container.style.display = 'none'
        Settings.get('element').value = ''
    }

}
module.exports = UI