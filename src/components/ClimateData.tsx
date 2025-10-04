import { Card } from "@/components/ui/card";
import { Cloud, Droplets, Wind, ThermometerSun } from "lucide-react";
import { useEffect, useState } from "react";

const ClimateData = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 72,
    humidity: 65,
    windSpeed: 12,
    precipitation: 15,
  });

  // Simulate dynamic weather changes
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        temperature: Math.max(60, Math.min(85, prev.temperature + (Math.random() - 0.5) * 2)),
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 3)),
        windSpeed: Math.max(5, Math.min(25, prev.windSpeed + (Math.random() - 0.5) * 2)),
        precipitation: Math.max(0, Math.min(30, prev.precipitation + (Math.random() - 0.5) * 3)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      icon: ThermometerSun,
      label: "Temperature",
      value: `${Math.round(weatherData.temperature)}°F`,
      color: "text-destructive",
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${Math.round(weatherData.humidity)}%`,
      color: "text-secondary",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${Math.round(weatherData.windSpeed)} mph`,
      color: "text-accent",
    },
    {
      icon: Cloud,
      label: "Precipitation",
      value: `${Math.round(weatherData.precipitation)}%`,
      color: "text-primary",
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5 text-secondary" />
        NASA Climate Data
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-lg bg-gradient-to-br from-card to-muted/20 border border-border transition-all duration-300 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
            <div className="text-xl font-bold">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-secondary">Live Data:</span> Conditions update every 5 seconds based on simulated NASA satellite observations
        </p>
      </div>
    </Card>
  );
};

export default ClimateData;
