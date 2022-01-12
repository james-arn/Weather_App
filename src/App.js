import { useEffect, useState } from "react";
import "./App.css";
//img assets
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
import { fetchData } from "./utils/FetchData";
//material UI icons
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [place, setPlace] = useState("Newquay"); // stores input value on location in search bar.
  const [placeInfo, setPlaceInfo] = useState({}); //useState to store data from API

  //fetches API data on load.
  useEffect(() => {
    fetchData(place, setPlace, setPlaceInfo, placeInfo);
  }, []);

  return (
    <div
      className="app"
      style={
        placeInfo.condition?.toLowerCase() === "clear" ||
        placeInfo.condition?.toLowerCase() === "sunny"
          ? { backgroundImage: `url(${Clear})` }
          : placeInfo.condition?.includes("cloudy")
          ? { backgroundImage: `url(${Cloudy})` }
          : placeInfo.condition?.toLowerCase().includes("rainy")
          ? { backgroundImage: `url(${Rainy})` }
          : placeInfo.condition?.toLowerCase().includes("snow")
          ? { backgroundImage: `url(${Snow})` }
          : { backgroundImage: `url(${Overcast})` }
      }
    >
      <div className="searchInput">
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <SearchIcon onClick={fetchData} fontSize="large" className="searchIcon">
          Search
        </SearchIcon>
      </div>
      <div className="weatherContainer">
        <div className="topPart">
          <h1>{placeInfo.centigrade?.current}°C</h1>
          <div className="conditionHighLow">
            <h1>{placeInfo.condition}</h1>
            <h1>{placeInfo.centigrade?.high}°C</h1>
            <h1>{placeInfo.centigrade?.low}°C</h1>
          </div>
        </div>
        <h2>
          {placeInfo.name}, {placeInfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
