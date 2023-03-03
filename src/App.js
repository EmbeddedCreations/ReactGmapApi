import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./components/Map";
import { mapOptions } from "./components/MapConfiguration";

function App() {
  const { isLoaded } = useJsApiLoader({
    id:mapOptions.googleMapApiKey,
    googleMapsApiKey:mapOptions.googleMapApiKey,
  });


  return (
    <div className="App">
      <h1>gmap</h1>
      {/* Loading of map Main code in map.js */}
      <Map  isLoaded={isLoaded}/>
    </div>
    
  );
}

export default App;
