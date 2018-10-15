# Google Address Autocomplete

A customisable replacement for https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform

## Getting Started

For Development - Download or Clone The repository and run npm install

## Prerequisites

- An Address API Key for Google Maps with the places api enabled (https://developers.google.com/maps/documentation/javascript/get-api-key)

## Usage

- Include the google maps api, for example
https://maps.googleapis.com/maps/api/js?key=YOURKEYHERE&libraries=places

Then you can either  "import gaAutoComplete from '/path/to/autocomplete.min'
or include /path/to/autocomplete.min.js in your page

### Initialise
```javascript
var options = {}
var selector = '#address_autocomplete'
gaAutoComplete.init(selector,options)
```
### Html Elements
```html
        <input class="input" id="address_autocomplete" type="search" autocomplete="off" value="" placeholder="Start Typing Your Address" />
        <ul class="ga-address-container" style="display:none"></ul>
```        

## Initialisation Options

**throttleTime** - delay in milliseconds before making request to the maps api *default: 200*

**minLength** - the minimum number of characters required to make a request to the maps api *default: 3*

**resultContainerSelector** - the root html element that will contain the results *default: '.ga-address-container'*

**validAddressTypes** - an array of acceptable address types to show. Useful for filtering out unwanted results such as places of interest, bus stops etc. Refer to https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes for more information. *default: ['street_address']*

**updateFields** - a callback function accepting two arguments. The first is the address components, the second the full result from the maps api. The address_components is separate because in rare cases the api will return a result that does not include the street number even though it appears in the suggestions. This library attempts to extract the street number from the suggestion in that case and append it to the address_components object
*default* : 
```javascript
function(address_components,full_item) {
    console.log(address_components,full_item)
}
```
**AutocompleteServiceOptions** - refer to https://developers.google.com/maps/documentation/javascript/geocoding#ComponentFiltering


## Running the tests

npm run test

