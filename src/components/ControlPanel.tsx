import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Droplets, Sprout, CloudRain, Info } from "lucide-react";
import { toast } from "sonner";

interface ControlPanelProps {
  selectedPlot: number | null;
  onIrrigate: () => void;
  onFertilize: () => void;
  credits: number;
}

const ControlPanel = ({ selectedPlot, onIrrigate, onFertilize, credits }: ControlPanelProps) => {
  const handleAction = (action: () => void, actionName: string, cost: number) => {
    if (selectedPlot === null) {
      toast.error("Please select a plot first");
      return;
    }
    if (credits < cost) {
      toast.error("Not enough credits!");
      return;
    }
    action();
    toast.success(`${actionName} applied to Plot ${selectedPlot + 1}`);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Sprout className="w-5 h-5 text-primary" />
        Farm Actions
      </h3>
      
      <div className="mb-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Available Credits</span>
          <span className="text-2xl font-bold text-primary">{credits}</span>
        </div>
      </div>

      {selectedPlot === null && (
        <div className="mb-4 p-3 rounded-lg bg-muted/50 flex items-start gap-2">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Select a plot to perform actions
          </p>
        </div>
      )}

      <div className="space-y-3">
        <Button
          className="w-full justify-start"
          variant="secondary"
          onClick={() => handleAction(onIrrigate, "Irrigation", 10)}
          disabled={selectedPlot === null}
        >
          <Droplets className="w-4 h-4" />
          Irrigate Plot (10 credits)
        </Button>

        <Button
          className="w-full justify-start"
          variant="default"
          onClick={() => handleAction(onFertilize, "Fertilizer", 15)}
          disabled={selectedPlot === null}
        >
          <Sprout className="w-4 h-4" />
          Apply Fertilizer (15 credits)
        </Button>

        <div className="pt-3 border-t border-border">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5">
            <CloudRain className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">NASA Data Integration</p>
              <p>Actions are optimized using real-time climate data and satellite imagery to improve sustainability.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;
