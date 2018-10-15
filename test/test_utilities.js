let assert = require('assert')
let expect = require('chai').expect

let utils = require('../src/Helper')
let settings = require('../src/Settings')


describe('Utilities', function() {
  describe('#extend()', function() {
    it('should modify the original object with values from another object', function() {

      let original = {a:'test',b:'123'}
      let modified = {a:'test 2', b: '456'}

      utils.extend(original,modified)

      expect(original.a).to.not.equal('test')
      expect(original.b).to.equal('456')

    });


    it('should modify the settings', function() {
      
      let modified = {updateFields:function() {
        return true
      }}

      utils.extend(settings,modified)

      expect(settings.updateFields()).to.equal(true)
    })

    it('should not modify unmatched keys', function() {

      let original = {a:'test',b:'123',c:'unique'}

      let modified = {a:'test 2', b: '456'}

      utils.extend(original,modified)

      expect(original.c).to.equal('unique')

    });

  });

  describe('#fixMissingStreetNumber()' , function() {
      it(`Should prepend the street number from the address
      description when street number is missing from places data`, function() {

          let result = utils.fixMissingStreetNumber('23 Queen Street Auckland',
      {formatted_address : 'Queen Street Auckland' })

      expect(result.street_number).to.equal('23')
      expect(result.formatted_address).to.equal('23 Queen Street Auckland')
      })
  })

  describe('#fixMissingStreetNumber()' , function() {
      it(`Should prepend the street number and suffix from the address
      description when street number is missing from places data`, function() {

          let result = utils.fixMissingStreetNumber('23b Queen Street Auckland',
      {formatted_address : 'Queen Street Auckland' })

      expect(result.street_number).to.equal('23b')
      expect(result.formatted_address).to.equal('23b Queen Street Auckland')
      })
  })
});
