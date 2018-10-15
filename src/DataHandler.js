let Settings = require('../src/Settings'),
    Helper = require('../src/Helper')

let DataHandler = {
    /**
     * @param {Object} service - the google object
     * @param {Object} options - options to pass to the service.getPlacePredictions method
     * @param {Function} callback - a function recieving predictions[] and 'status'
     */
    getAutocompletePredictions: (service, options, callback) => {
        
        let valid_status = 'OK'

        if (typeof google != 'undefined') {
            valid_status = google.maps.places.PlacesServiceStatus.OK
        }
        
        let results = service.getPlacePredictions(

            options, (predictions, status) => {

                if (status !== valid_status) {

                    return false

                } else {

                    //console.log('Got these ', predictions)

                    //filter predictions based on valid types
                    
                    let valid_types = Settings.get('validAddressTypes')

                    predictions = predictions.filter(place_data => {

                        let intersect = []

                        //look at every predictions types
                        place_data.types.forEach(place_data => {
                            //see if that type is in our valid_types settings array
                            let result = valid_types.find(address_type => {
                                return place_data === address_type
                            })
                            if (result) {
                                intersect.push(place_data)
                            }
                        })
                        //if we found at least one match then it passes 
                        return intersect.length
                    })

                    callback(predictions)
                }
            }
        )
        return true
    },

    /** calls getDetails method on passed service with placesId and callback arguments
     * @param {Function} service 
     * @param {String} placesId
     * @param {Function} callback
     */
    getAddressResults: (service, placesId, callback) => {

        service.getDetails({
            placeId: placesId
        }, callback)

    },

    processResult: function (dataset) {
        
        let prediction_description = dataset.prediction.description || dataset.prediction,
            address_components = {}

        DataHandler.getAddressResults(Settings.get('PlacesService'), dataset.placeid, (place_data) => {

            if (place_data.address_components) {

                place_data.address_components.forEach((component, index) => {

                    address_components[component.types[0].toString()] = component.long_name

                })
                address_components['formatted_address'] = place_data.formatted_address
                

                address_components = Helper.fixMissingStreetNumber(prediction_description, address_components)

                Settings.get('updateFields')(address_components, place_data)

            }
        })
    }
}

module.exports = DataHandler