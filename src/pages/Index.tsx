import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Satellite, Sprout, Play } from "lucide-react";
import GameField from "@/components/GameField";
import ControlPanel from "@/components/ControlPanel";
import ClimateData from "@/components/ClimateData";
import SustainabilityMetrics from "@/components/SustainabilityMetrics";
import heroFarm from "@/assets/hero-farm.jpg";

interface Plot {
  id: number;
  health: number;
  waterLevel: number;
  fertilized: boolean;
}

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [credits, setCredits] = useState(100);
  const [plots, setPlots] = useState<Plot[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      health: 50,
      waterLevel: 50,
      fertilized: false,
    }))
  );

  // Calculate metrics based on plots
  const calculateMetrics = () => {
    const avgHealth = plots.reduce((sum, plot) => sum + plot.health, 0) / plots.length;
    const avgWater = plots.reduce((sum, plot) => sum + plot.waterLevel, 0) / plots.length;
    const fertilizedCount = plots.filter(plot => plot.fertilized).length;
    
    return {
      sustainability: Math.min(100, Math.round(avgHealth * 0.7 + (fertilizedCount / plots.length) * 30)),
      efficiency: Math.min(100, Math.round(avgWater * 0.6 + avgHealth * 0.4)),
      yield: Math.min(100, Math.round(avgHealth * 0.5 + avgWater * 0.3 + (fertilizedCount / plots.length) * 20)),
    };
  };

  const [metrics, setMetrics] = useState(calculateMetrics());

  useEffect(() => {
    setMetrics(calculateMetrics());
  }, [plots]);

  // Passive health decay
  useEffect(() => {
    if (!gameStarted) return;
    
    const interval = setInterval(() => {
      setPlots(prevPlots =>
        prevPlots.map(plot => ({
          ...plot,
          health: Math.max(0, plot.health - 0.5),
          waterLevel: Math.max(0, plot.waterLevel - 1),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // Credit regeneration
  useEffect(() => {
    if (!gameStarted) return;
    
    const interval = setInterval(() => {
      setCredits(prev => Math.min(200, prev + 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  const handleIrrigate = () => {
    if (selectedPlot === null) return;
    
    setCredits(prev => prev - 10);
    setPlots(prevPlots =>
      prevPlots.map(plot =>
        plot.id === selectedPlot
          ? { ...plot, waterLevel: Math.min(100, plot.waterLevel + 30), health: Math.min(100, plot.health + 10) }
          : plot
      )
    );
  };

  const handleFertilize = () => {
    if (selectedPlot === null) return;
    
    setCredits(prev => prev - 15);
    setPlots(prevPlots =>
      prevPlots.map(plot =>
        plot.id === selectedPlot
          ? { ...plot, fertilized: true, health: Math.min(100, plot.health + 20) }
          : plot
      )
    );
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroFarm})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <Satellite className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by NASA Data</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-[var(--gradient-hero)]">
                FarmSim Earth
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Learn sustainable agriculture through interactive gameplay using real NASA satellite imagery and climate data
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => setGameStarted(true)}
                className="text-lg px-8 py-6"
              >
                <Play className="w-5 h-5" />
                Start Farming
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              {[
                {
                  icon: Satellite,
                  title: "Real NASA Data",
                  description: "Leverage actual satellite imagery and climate observations from NASA's Earth Science Division",
                  details: [
                    "MODIS satellite imagery for real-time land monitoring",
                    "POWER climate data including temperature, precipitation, and humidity",
                    "GRACE water availability measurements",
                    "GPM precipitation data for accurate rainfall tracking"
                  ]
                },
                {
                  icon: Sprout,
                  title: "Sustainable Practices",
                  description: "Learn eco-friendly farming methods that protect our planet and ensure long-term food security",
                  details: [
                    "Water conservation through precision irrigation",
                    "Soil health management and crop rotation",
                    "Organic fertilization techniques",
                    "Climate-adaptive farming strategies"
                  ]
                },
                {
                  icon: Play,
                  title: "Interactive Learning",
                  description: "Hands-on experience with farming decisions and their environmental impacts",
                  details: [
                    "Manage resources with real-time feedback",
                    "See immediate effects of your decisions",
                    "Track sustainability and efficiency metrics",
                    "Learn through experimentation and adaptation"
                  ]
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:shadow-[var(--shadow-soft)] transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Satellite className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">FarmSim Earth</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">Credits: {credits}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Game Interface */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Game Field */}
          <div className="lg:col-span-2 space-y-6">
            <GameField
              plots={plots}
              onPlotClick={setSelectedPlot}
              selectedPlot={selectedPlot}
            />
            <ClimateData />
          </div>

          {/* Right Column - Controls and Metrics */}
          <div className="space-y-6">
            <ControlPanel
              selectedPlot={selectedPlot}
              onIrrigate={handleIrrigate}
              onFertilize={handleFertilize}
              credits={credits}
            />
            <SustainabilityMetrics {...metrics} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
