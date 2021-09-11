import logo from './logo.svg';
import './App.css';
import {Gmap} from "./Components/googlemap/gmap";
import {Gmaprect} from "./Components/google-map-react/gmaprect";

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}
function App() {
  return (
    <div className="App">
      <Gmap/>
    </div>
  );
}

export default App;
