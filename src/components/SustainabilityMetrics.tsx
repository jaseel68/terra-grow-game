import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Zap, TrendingUp } from "lucide-react";

interface SustainabilityMetricsProps {
  sustainability: number;
  efficiency: number;
  yield: number;
}

const SustainabilityMetrics = ({ sustainability, efficiency, yield: yieldValue }: SustainabilityMetricsProps) => {
  const metrics = [
    {
      icon: Leaf,
      label: "Sustainability Score",
      value: sustainability,
      color: "text-primary",
      description: "Measures eco-friendly farming practices",
    },
    {
      icon: Zap,
      label: "Resource Efficiency",
      value: efficiency,
      color: "text-accent",
      description: "Water and fertilizer optimization",
    },
    {
      icon: TrendingUp,
      label: "Crop Yield Potential",
      value: yieldValue,
      color: "text-secondary",
      description: "Expected harvest output",
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Leaf className="w-5 h-5 text-primary" />
        Performance Metrics
      </h3>
      
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <span className="text-lg font-bold">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-primary">Goal:</span> Maintain all metrics above 75% for optimal sustainable farming
        </p>
      </div>
    </Card>
  );
};

export default SustainabilityMetrics;
