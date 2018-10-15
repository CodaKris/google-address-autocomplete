let Helper = {

    extend : (obj, src) => {

        Object.keys(src).forEach(key => {
            obj[key] = src[key];
        })

        return obj

    },

    ready : (fn) => {
        document.addEventListener('DOMContentLoaded', fn)
    },

    hasClass : (el,className) => {
         return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className)
    },

    listen : (el,event,fn) => {
        el.addEventListener(event, fn)
    },

    unlisten : (el,event,fn) => {
        el.removeEventListener(event,fn)
    },

    fixMissingStreetNumber : (prediction_description, addressbits) => {

        //in rare cases there is no street_number
        //try and match from prediction description
        
        if (typeof addressbits.street_number == 'undefined') {

            let match = prediction_description.match(/[0-9]{1,4}[\s|A-z]{1}/)

            if (match && match.length) {

                addressbits.street_number  = match[0].trim()
                addressbits.formatted_address = (addressbits.street_number + ' ' + addressbits.formatted_address)
                addressbits._missingstreetnmberfixed = true
            }

        } else {

            addressbits.formatted_address = addressbits.formatted_address || ''

        }

        return addressbits
    }

}

module.exports = Helper
