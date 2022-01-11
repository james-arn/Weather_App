export const fetchData = async (place, setPlaceInfo) => {
  try {
    const fetchedData = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=3cfb575d3de2436a91173540221101&q=${place}&days=1&aqi=no&alerts=no`
    );
    if (fetchedData.status !== 200)
      throw new Error(`${fetchedData.status} - ${fetchedData.statusText}`);
    const res = await fetchedData.json();
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
    return res;
  } catch (err) {
    console.error(`💥💥 ${err.message}`);
  }
};
