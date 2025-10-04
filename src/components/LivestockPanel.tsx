import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Plus, Minus, Droplets, Wheat } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface LivestockPanelProps {
  herdSize: number;
  onHerdChange: (change: number) => void;
  onFeed: () => void;
  onWater: () => void;
  credits: number;
  livestockHealth: number;
  waterAvailability: number;
  feedLevel: number;
}

const LivestockPanel = ({
  herdSize,
  onHerdChange,
  onFeed,
  onWater,
  credits,
  livestockHealth,
  waterAvailability,
  feedLevel,
}: LivestockPanelProps) => {
  const canAddLivestock = credits >= 50;
  const canRemoveLivestock = herdSize > 0;
  const canFeed = credits >= 15 && feedLevel < 100;
  const canWater = credits >= 10 && waterAvailability < 100;

  const getHealthColor = (health: number) => {
    if (health >= 70) return "text-green-600";
    if (health >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Livestock Management
        </CardTitle>
        <CardDescription>
          Manage your herd size, feeding, and water supply
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Herd Size Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Herd Size</span>
            <Badge variant="secondary">{herdSize} Animals</Badge>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onHerdChange(-1)}
              disabled={!canRemoveLivestock}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Minus className="w-4 h-4" />
              Remove (Free)
            </Button>
            <Button
              onClick={() => onHerdChange(1)}
              disabled={!canAddLivestock}
              variant="default"
              size="sm"
              className="flex-1"
            >
              <Plus className="w-4 h-4" />
              Add (50 credits)
            </Button>
          </div>
        </div>

        {/* Livestock Health */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Livestock Health</span>
            <span className={`text-sm font-bold ${getHealthColor(livestockHealth)}`}>
              {livestockHealth}%
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${livestockHealth}%` }}
            />
          </div>
        </div>

        {/* Feed Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Wheat className="w-4 h-4" />
              Feed Level
            </span>
            <span className="text-sm font-semibold">{feedLevel}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${feedLevel}%` }}
            />
          </div>
          <Button
            onClick={onFeed}
            disabled={!canFeed}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Wheat className="w-4 h-4" />
            Feed Livestock (15 credits)
          </Button>
        </div>

        {/* Water Availability */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              Water Supply
            </span>
            <span className="text-sm font-semibold">{waterAvailability}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${waterAvailability}%` }}
            />
          </div>
          <Button
            onClick={onWater}
            disabled={!canWater}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Droplets className="w-4 h-4" />
            Provide Water (10 credits)
          </Button>
        </div>

        {herdSize === 0 && (
          <div className="text-xs text-muted-foreground text-center p-3 bg-secondary/50 rounded-lg">
            Add livestock to begin managing your herd
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LivestockPanel;
