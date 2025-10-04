import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Droplets, Leaf, Heart } from "lucide-react";

interface LivestockMetricsProps {
  animalWelfare: number;
  resourceEfficiency: number;
  pastureHealth: number;
  overallSustainability: number;
}

const LivestockMetrics = ({
  animalWelfare,
  resourceEfficiency,
  pastureHealth,
  overallSustainability,
}: LivestockMetricsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  const metrics = [
    {
      icon: Heart,
      label: "Animal Welfare",
      value: animalWelfare,
      description: "Health, feed, and water adequacy",
    },
    {
      icon: Droplets,
      label: "Resource Efficiency",
      value: resourceEfficiency,
      description: "Water and feed management",
    },
    {
      icon: Leaf,
      label: "Pasture Health",
      value: pastureHealth,
      description: "NDVI and grazing sustainability",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Sustainability Dashboard
        </CardTitle>
        <CardDescription>
          Track your livestock management performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Sustainability</span>
            <span className={`text-2xl font-bold ${getScoreColor(overallSustainability)}`}>
              {overallSustainability}%
            </span>
          </div>
          <Progress value={overallSustainability} className="h-3" />
          <div className="text-xs text-muted-foreground mt-2">
            {getScoreLabel(overallSustainability)}
          </div>
        </div>

        {/* Individual Metrics */}
        <div className="space-y-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className={`text-sm font-bold ${getScoreColor(metric.value)}`}>
                  {metric.value}%
                </span>
              </div>
              <Progress value={metric.value} className="h-2" />
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="p-3 bg-secondary/50 rounded-lg">
          <div className="text-xs font-medium mb-1">💡 Management Tips</div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Monitor NDVI to prevent overgrazing</li>
            <li>• Balance herd size with pasture capacity</li>
            <li>• Respond quickly to weather events</li>
            <li>• Maintain water and feed levels above 40%</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivestockMetrics;
