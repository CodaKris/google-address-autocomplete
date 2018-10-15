let chai = require('chai')
let assert = require('assert')
let expect = require('chai').expect
let sinon = require("sinon");
let sinonChai = require("sinon-chai");

chai.use(sinonChai)

let handler = require('../src/DataHandler')
let settings = require('../src/Settings')
let prediction_data = require('../test/prediction_data.js')
let test_result = require('../test/test_result.js')

let mockService = {
    status : 'OK',
    getPlacePredictions : function(options, cb) {
        let predictions = prediction_data
        
        cb(predictions,mockService.status)
    },
    getDetails : function(settings,cb) {
        cb(test_result)
    }
}

sinon.spy(mockService,'getPlacePredictions')

describe('DataHandler', function() {
  
    describe('#getAutocompletePredictions()', function() {
        
        it('should filter out the result that is not a street address', function() {

            let result = handler.getAutocompletePredictions(mockService,{},(predictions) => {

                //there are 5 results in the test data, one is not a 'street_address'
                expect(predictions.length).to.equal(4)

            })
            
            expect(result).to.not.equal(false)

            expect(mockService.getPlacePredictions.calledOnce)

        });

        it('should not filter out any results', function() {
            
            settings.set('validAddressTypes',['street_address','route'])

            let result = handler.getAutocompletePredictions(mockService,{},(predictions) => {

                expect(predictions.length).to.equal(5)

            })
            
            expect(result).to.not.equal(false)

            expect(mockService.getPlacePredictions.calledOnce)

        });

    });

    describe('#processResult()',function() {

        it('should process the results', function() {
            
            test_result.prediction = {}
            test_result.prediction.description = '10 Queens Road, Panmure, Auckland, New Zealand'
            
            settings.set('PlacesService',mockService)

            settings.set('updateFields',function(address_data,item) {
                expect(item.formatted_address).to.equal('10 Queens Rd, Panmure, Auckland 1072, New Zealand')
            })

            let result = handler.processResult(test_result)
        })

        it('should fix the missing street number in the formatted address', function() {
            

            test_result.prediction = {}
            //set up a prediction with correct address
            test_result.prediction.description = '10 Queens Road, Panmure, Auckland, New Zealand'
            //provide a formatted address missing the description
            test_result.formatted_address = 'Queens Road, Panmure, Auckland, New Zealand'
            //delete the address number
            delete test_result.address_components[0]
            
            settings.set('PlacesService',mockService)

            settings.set('updateFields',function(address_data,item) {
                
                expect(address_data.formatted_address).to.equal('10 Queens Road, Panmure, Auckland, New Zealand')
                expect(address_data.street_number).to.equal('10')
            })

            let result = handler.processResult(test_result)

        })

    })


});
