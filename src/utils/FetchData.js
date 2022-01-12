export const fetchData = async (place, setPlace, setPlaceInfo, placeInfo) => {
  try {
    const fetchedData = await fetch(
      `${process.env.REACT_APP_WEATHER_API_KEY}&q=${place}&days=1&aqi=no&alerts=no`
    );
    if (fetchedData.status !== 200)
      throw new Error(`${fetchedData.status} - ${fetchedData.statusText}`);
    const res = await fetchedData.json();
    console.log("res", res);

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
    console.log("placeInfo", placeInfo);
    return res;
  } catch (err) {
    console.error(`💥💥 ${err.message}`);
  }
};
