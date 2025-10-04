import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Droplets, Sprout, ThermometerSun } from "lucide-react";
import fieldGrid from "@/assets/field-grid.jpg";

interface Plot {
  id: number;
  health: number;
  waterLevel: number;
  fertilized: boolean;
}

interface GameFieldProps {
  plots: Plot[];
  onPlotClick: (plotId: number) => void;
  selectedPlot: number | null;
}

const GameField = ({ plots, onPlotClick, selectedPlot }: GameFieldProps) => {
  const getPlotColor = (plot: Plot) => {
    if (plot.health > 80) return "bg-primary";
    if (plot.health > 60) return "bg-primary/80";
    if (plot.health > 40) return "bg-primary/60";
    if (plot.health > 20) return "bg-primary/40";
    return "bg-muted";
  };

  return (
    <Card className="p-6 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${fieldGrid})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-primary" />
          Your Farm Field
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {plots.map((plot) => (
            <button
              key={plot.id}
              onClick={() => onPlotClick(plot.id)}
              className={`
                aspect-square rounded-lg transition-all duration-300 relative overflow-hidden
                ${getPlotColor(plot)}
                ${selectedPlot === plot.id ? 'ring-4 ring-accent scale-105' : 'hover:scale-105'}
                shadow-[var(--shadow-soft)]
              `}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
                <span className="text-xs font-medium">Plot {plot.id + 1}</span>
                <div className="flex gap-1 mt-2">
                  {plot.waterLevel > 50 && (
                    <Droplets className="w-3 h-3" />
                  )}
                  {plot.fertilized && (
                    <ThermometerSun className="w-3 h-3" />
                  )}
                </div>
              </div>
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                style={{ width: `${plot.health}%` }}
              />
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GameField;
