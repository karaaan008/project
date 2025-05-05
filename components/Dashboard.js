import React, { useEffect, useState } from "react";

function Dashboard() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    if (isOnline) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });

          try {
            const apiKey = "7dba400116b29419cf1091a21132cb3d"; // Replace with your OpenWeatherMap API key
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            console.log("Weather data:", data); 
            setWeather(data);
          } catch (err) {
            console.error("Weather fetch error:", err);
          }
        },
        (err) => console.error("Geolocation error:", err)
      );
    }

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, [isOnline]);

  if (!isOnline) {
    return (
      <div>
        <h3>You are offline</h3>
        <p>Weather and location data are unavailable.</p>
      </div>
    );
  }

  return (
    <div>
      {location ? (
        <p>Your Location: {location.latitude}, {location.longitude}</p>
      ) : (
        <p>Getting your location...</p>
      )}
      {weather ? (
  <>
    <p>City: {weather.name}</p>
    <p>Weather: {weather.weather?.[0]?.description || "N/A"}</p>
    <p>Temperature: {weather.main?.temp}°C</p>
  </>
) : (
  <p>Loading weather data...</p>
)}

    </div>
  );
}

export default Dashboard;
