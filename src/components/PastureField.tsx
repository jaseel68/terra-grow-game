import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, MapPin } from "lucide-react";

interface Pasture {
  id: number;
  ndvi: number;
  grazingLoad: number;
  health: number;
}

interface PastureFieldProps {
  pastures: Pasture[];
  selectedPasture: number | null;
  onPastureClick: (id: number) => void;
}

const PastureField = ({ pastures, selectedPasture, onPastureClick }: PastureFieldProps) => {
  const getNDVIColor = (ndvi: number) => {
    if (ndvi >= 0.7) return "bg-green-600";
    if (ndvi >= 0.5) return "bg-green-500";
    if (ndvi >= 0.3) return "bg-yellow-500";
    if (ndvi >= 0.2) return "bg-orange-500";
    return "bg-red-500";
  };

  const getNDVILabel = (ndvi: number) => {
    if (ndvi >= 0.7) return "Excellent";
    if (ndvi >= 0.5) return "Good";
    if (ndvi >= 0.3) return "Moderate";
    if (ndvi >= 0.2) return "Poor";
    return "Very Poor";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5" />
          Pasture Monitor (NASA NDVI)
        </CardTitle>
        <CardDescription>
          Vegetation health from satellite imagery - click to select grazing area
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {pastures.map((pasture) => (
            <button
              key={pasture.id}
              onClick={() => onPastureClick(pasture.id)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                selectedPasture === pasture.id
                  ? "border-primary shadow-lg"
                  : "border-border"
              }`}
            >
              {/* NDVI Color Background */}
              <div className={`absolute inset-0 ${getNDVIColor(pasture.ndvi)} opacity-80`} />
              
              {/* Grazing Pattern Overlay */}
              {pasture.grazingLoad > 0 && (
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30">
                  <div className="absolute top-1 right-1">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-white">
                <div className="text-xs font-medium">
                  NDVI: {pasture.ndvi.toFixed(2)}
                </div>
                <div className="text-[10px] opacity-90">
                  {getNDVILabel(pasture.ndvi)}
                </div>
                {pasture.grazingLoad > 0 && (
                  <div className="text-[10px] opacity-90 flex items-center gap-1 mt-1">
                    <MapPin className="w-2.5 h-2.5" />
                    {pasture.grazingLoad} animals
                  </div>
                )}
              </div>

              {selectedPasture === pasture.id && (
                <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* NDVI Legend */}
        <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
          <div className="text-xs font-medium mb-2">NDVI Scale (Vegetation Health)</div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span>0.0-0.2</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-orange-500" />
              <span>0.2-0.3</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-yellow-500" />
              <span>0.3-0.5</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span>0.5-0.7</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-600" />
              <span>0.7-1.0</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PastureField;
