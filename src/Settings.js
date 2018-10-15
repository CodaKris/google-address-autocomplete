let Settings = {

    data: {

        throttleTime: 200,

        element: null,

        AutocompleteService: null,

        minLength: 3,

        PlacesService: null,
        //default to NZ, types:['geocode'] means addresses only
        AutocompleteServiceOptions: {
            componentRestrictions: {
                country: 'NZ'
            },
            types: ['geocode']
        },

        resultContainerSelector: '.ga-address-container',

        //resultElementSelector: '.ga-address-container li',

        //not yet implemented
        //keyboardActiveElementClass: 'j-scroll',

        validAddressTypes: ['street_address'],

        addressTestRegex: /[a-zA-Z0-9-_\#\,\-\.\\\/ ]/,

        updateFields: function (addressbits, full_item) {
            console.log(addressbits, full_item)
        }
    },

    get: (prop) => {
        return Settings.data[prop]
    },

    set: (prop, val) => {
        Settings.data[prop] = val
    }
}

module.exports = Settings