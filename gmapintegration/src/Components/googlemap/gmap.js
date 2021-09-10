import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        address: "1600 Amphitheatre Parkway, Mountain View, california.",
        lat: 34.0522,
        lng: -118.2437,
      },
   };
  //  this.handleChange = this.handleChange.bind(this);
  //  this.handleSelect = this.handleSelect.bind(this);

  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  componentWillMount() {
 
}


  // handleChange = address => {
  //   this.setState({ address });
  // };
 
  // handleSelect = address => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log('Success', latLng))
  //     .catch(error => console.error('Error', error));
  // };

  render() {
    return (
      <div>
         <PlacesAutocomplete 
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        // value={this.props.address}
          // onChange={this.props.onAddressChange}
          // label={InputGroup}
          // classNames={cssClasses}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

        <Map
          google={this.props.google}
          // onClick={this.onMapClicked}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
            showingInfoWindow: true,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
        >
          <Marker onClick={this.onMarkerClick} name={"Current location"} />

          <InfoWindow onClose={this.onInfoWindowClose}>                             
                <div>
                  <h1>{this.state.selectedPlace.name}</h1> 
                </div>
             </InfoWindow>
        </Map>
      </div>
    );
  }
}

Gmap = GoogleApiWrapper({
  apiKey: "AIzaSyD2XiPe2I6A9KRa5ISSEsTkqLThhvn-o8Q",
  language: "en",
  libraries: ["places"]
})(Gmap);
