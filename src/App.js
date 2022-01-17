import { useEffect, useState } from "react";
import "./App.css";
//img assets
import Clear from "./assets/clear.jpg";
import Cloudy from "./assets/cloudy.jpg";
import Overcast from "./assets/overcast.jpg";
import Rainy from "./assets/rainy.jpg";
import Snow from "./assets/snow.jpg";
//material UI icons
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [place, setPlace] = useState("Newquay"); // stores input value on location in search bar.
  const [placeInfo, setPlaceInfo] = useState({}); //useState to store data from API

  //fetches API data on load.
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log(place);
      const fetchedData = await fetch(
        `${process.env.REACT_APP_WEATHER_API_KEY}&q=${place}&days=1&aqi=no&alerts=no`
      );
      if (fetchedData.status !== 200)
        throw new Error(`${fetchedData.status} - ${fetchedData.statusText}`);
      const res = await fetchedData.json();
      // console.log("res", res);
      setPlaceInfo({
        name: res.location.name,
        country: res.location.country,
        centigrade: {
          current: res.current.temp_c,
          high: res.forecast.forecastday[0].day.maxtemp_c,
          low: res.forecast.forecastday[0].day.mintemp_c,
        },
        condition: res.current.condition.text,
      });
      // console.log("placeInfo", placeInfo);
      setPlace("");
      return res;
    } catch (err) {
      console.error(`💥💥 ${err.message}`);
    }
  };

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
      <div className="weatherContainer">
        <div className="topPart">
          <div className="condition">
            <h1>
              {placeInfo.condition} {placeInfo.centigrade?.current}°C{" "}
            </h1>
          </div>
          <div className="highLow">
            <h1>
              (High: {placeInfo.centigrade?.high}
              °C, Low: {placeInfo.centigrade?.low}°C)
            </h1>
          </div>
          <div className="nameCountry">
            <h2>
              {placeInfo.name}, {placeInfo.country}
            </h2>
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default App;
