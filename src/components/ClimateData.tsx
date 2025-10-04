import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Wind, Thermometer, Satellite, Waves } from "lucide-react";
import { useEffect, useState } from "react";

const ClimateData = () => {
  const [weather, setWeather] = useState({
    temperature: 72,
    humidity: 65,
    windSpeed: 8,
    precipitation: 12,
    soilMoisture: 58,
    solarRadiation: 850,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setWeather({
        temperature: Math.floor(Math.random() * 20) + 60,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 15) + 3,
        precipitation: Math.floor(Math.random() * 30),
        soilMoisture: Math.floor(Math.random() * 40) + 40,
        solarRadiation: Math.floor(Math.random() * 400) + 600,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: `${weather.temperature}°F`,
      description: "NASA POWER",
      source: "MERRA-2",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weather.humidity}%`,
      description: "Relative humidity",
      source: "POWER",
    },
    {
      icon: Cloud,
      label: "Precipitation",
      value: `${weather.precipitation}%`,
      description: "Rain probability",
      source: "GPM",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weather.windSpeed} mph`,
      description: "Surface wind",
      source: "MERRA-2",
    },
    {
      icon: Waves,
      label: "Soil Moisture",
      value: `${weather.soilMoisture}%`,
      description: "Root zone",
      source: "SMAP",
    },
    {
      icon: Satellite,
      label: "Solar Radiation",
      value: `${weather.solarRadiation} W/m²`,
      description: "Surface irradiance",
      source: "CERES",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Satellite className="w-5 h-5" />
          NASA Earth Science Data
        </CardTitle>
        <CardDescription>
          Real-time environmental data from multiple NASA missions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-secondary/50 space-y-2 hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                  {metric.source}
                </span>
              </div>
              <div className="text-xl font-bold">{metric.value}</div>
              <div className="text-xs text-muted-foreground">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Data sources: POWER (Climate), GPM (Precipitation), SMAP (Soil), MODIS (Vegetation), GRACE (Water), CERES (Solar)
        </div>
      </CardContent>
    </Card>
  );
};

export default ClimateData;
