import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CloudRain, Sun, Wind, AlertTriangle } from "lucide-react";

interface WeatherEvent {
  type: "drought" | "rainfall" | "normal" | "storm";
  severity: "low" | "medium" | "high";
  message: string;
}

interface WeatherEventsProps {
  currentEvent: WeatherEvent;
}

const WeatherEvents = ({ currentEvent }: WeatherEventsProps) => {
  const getEventIcon = () => {
    switch (currentEvent.type) {
      case "drought":
        return <Sun className="w-5 h-5 text-orange-500" />;
      case "rainfall":
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case "storm":
        return <Wind className="w-5 h-5 text-purple-500" />;
      default:
        return <Sun className="w-5 h-5 text-green-500" />;
    }
  };

  const getEventVariant = () => {
    if (currentEvent.severity === "high") return "destructive";
    if (currentEvent.severity === "medium") return "default";
    return "default";
  };

  const getEventTitle = () => {
    switch (currentEvent.type) {
      case "drought":
        return "Drought Conditions";
      case "rainfall":
        return "Heavy Rainfall";
      case "storm":
        return "Storm Warning";
      default:
        return "Normal Conditions";
    }
  };

  const getImpactText = () => {
    switch (currentEvent.type) {
      case "drought":
        return "Water resources depleting faster. Pasture growth reduced.";
      case "rainfall":
        return "Water resources replenishing. Good for pasture growth.";
      case "storm":
        return "Livestock stress increased. Move animals to shelter.";
      default:
        return "Optimal conditions for sustainable farming.";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getEventIcon()}
          Weather Events (NASA GPM)
        </CardTitle>
        <CardDescription>
          Real-time environmental conditions affecting your farm
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={getEventVariant()}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-semibold">{getEventTitle()}</div>
            <div className="text-sm mt-1">{currentEvent.message}</div>
          </AlertDescription>
        </Alert>

        <div className="p-3 bg-secondary/50 rounded-lg space-y-2">
          <div className="text-xs font-medium">Environmental Impact</div>
          <div className="text-xs text-muted-foreground">{getImpactText()}</div>
          
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="p-2 bg-background rounded text-xs">
              <div className="text-muted-foreground">Water Impact</div>
              <div className="font-semibold">
                {currentEvent.type === "drought" ? "-15%" : currentEvent.type === "rainfall" ? "+20%" : "0%"}
              </div>
            </div>
            <div className="p-2 bg-background rounded text-xs">
              <div className="text-muted-foreground">Pasture Impact</div>
              <div className="font-semibold">
                {currentEvent.type === "drought" ? "-10%" : currentEvent.type === "rainfall" ? "+15%" : "0%"}
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Data from NASA Global Precipitation Measurement (GPM) mission
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherEvents;
