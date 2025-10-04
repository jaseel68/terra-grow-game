import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Satellite, Sprout, Play, Home } from "lucide-react";
import GameField from "@/components/GameField";
import ControlPanel from "@/components/ControlPanel";
import ClimateData from "@/components/ClimateData";
import SustainabilityMetrics from "@/components/SustainabilityMetrics";
import LivestockPanel from "@/components/LivestockPanel";
import PastureField from "@/components/PastureField";
import WeatherEvents from "@/components/WeatherEvents";
import LivestockMetrics from "@/components/LivestockMetrics";
import heroFarm from "@/assets/hero-farm.jpg";

interface Plot {
  id: number;
  health: number;
  waterLevel: number;
  fertilized: boolean;
}

interface Pasture {
  id: number;
  ndvi: number;
  grazingLoad: number;
  health: number;
}

interface WeatherEvent {
  type: "drought" | "rainfall" | "normal" | "storm";
  severity: "low" | "medium" | "high";
  message: string;
}

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<number | null>(null);
  const [selectedPasture, setSelectedPasture] = useState<number | null>(null);
  const [credits, setCredits] = useState(150);
  const [plots, setPlots] = useState<Plot[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      health: 50,
      waterLevel: 50,
      fertilized: false,
    }))
  );

  // Livestock management state
  const [herdSize, setHerdSize] = useState(0);
  const [livestockHealth, setLivestockHealth] = useState(100);
  const [feedLevel, setFeedLevel] = useState(80);
  const [waterAvailability, setWaterAvailability] = useState(70);

  // Pasture state with NDVI
  const [pastures, setPastures] = useState<Pasture[]>(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      ndvi: 0.5 + Math.random() * 0.3,
      grazingLoad: 0,
      health: 70,
    }))
  );

  // Weather event state
  const [weatherEvent, setWeatherEvent] = useState<WeatherEvent>({
    type: "normal",
    severity: "low",
    message: "Clear skies and moderate temperatures",
  });

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

  // Calculate livestock metrics
  const calculateLivestockMetrics = () => {
    const avgNDVI = pastures.reduce((sum, p) => sum + p.ndvi, 0) / pastures.length;
    const grazingBalance = herdSize > 0 ? Math.max(0, 100 - (herdSize * 8)) : 100;
    
    return {
      animalWelfare: Math.min(100, Math.round((livestockHealth * 0.5) + (feedLevel * 0.25) + (waterAvailability * 0.25))),
      resourceEfficiency: Math.min(100, Math.round((waterAvailability * 0.4) + (feedLevel * 0.3) + grazingBalance * 0.3)),
      pastureHealth: Math.min(100, Math.round(avgNDVI * 100)),
      overallSustainability: 0,
    };
  };

  const [metrics, setMetrics] = useState(calculateMetrics());
  const [livestockMetrics, setLivestockMetrics] = useState(() => {
    const initial = calculateLivestockMetrics();
    initial.overallSustainability = Math.round((initial.animalWelfare + initial.resourceEfficiency + initial.pastureHealth) / 3);
    return initial;
  });

  useEffect(() => {
    setMetrics(calculateMetrics());
  }, [plots]);

  useEffect(() => {
    const metrics = calculateLivestockMetrics();
    metrics.overallSustainability = Math.round((metrics.animalWelfare + metrics.resourceEfficiency + metrics.pastureHealth) / 3);
    setLivestockMetrics(metrics);
  }, [livestockHealth, feedLevel, waterAvailability, herdSize, pastures]);

  // Passive health decay for crops and livestock
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

      // Livestock passive decay
      if (herdSize > 0) {
        setLivestockHealth(prev => Math.max(0, prev - 1.5));
        setFeedLevel(prev => Math.max(0, prev - (herdSize * 0.8)));
        setWaterAvailability(prev => Math.max(0, prev - (herdSize * 0.6)));
      }

      // Weather event effects on pastures
      setPastures(prev => prev.map(p => ({
        ...p,
        ndvi: Math.max(0.1, Math.min(1.0, p.ndvi + (Math.random() - 0.5) * 0.02)),
        health: Math.max(0, p.health - (p.grazingLoad > 0 ? 0.5 : 0.1)),
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [gameStarted, herdSize]);

  // Credit regeneration
  useEffect(() => {
    if (!gameStarted) return;
    
    const interval = setInterval(() => {
      setCredits(prev => Math.min(250, prev + 5));
    }, 3000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  // Dynamic weather events
  useEffect(() => {
    if (!gameStarted) return;

    const interval = setInterval(() => {
      const rand = Math.random();
      let newEvent: WeatherEvent;

      if (rand < 0.15) {
        newEvent = {
          type: "drought",
          severity: "high",
          message: "Extended dry period detected. Water conservation critical.",
        };
      } else if (rand < 0.3) {
        newEvent = {
          type: "rainfall",
          severity: "medium",
          message: "Heavy rainfall replenishing water sources and pastures.",
        };
      } else if (rand < 0.4) {
        newEvent = {
          type: "storm",
          severity: "high",
          message: "Severe weather warning. Protect livestock and secure resources.",
        };
      } else {
        newEvent = {
          type: "normal",
          severity: "low",
          message: "Optimal weather conditions for farming operations.",
        };
      }

      setWeatherEvent(newEvent);

      // Apply weather effects
      if (newEvent.type === "drought") {
        setWaterAvailability(prev => Math.max(0, prev - 15));
        setPastures(prev => prev.map(p => ({ ...p, ndvi: Math.max(0.1, p.ndvi - 0.05) })));
      } else if (newEvent.type === "rainfall") {
        setWaterAvailability(prev => Math.min(100, prev + 20));
        setPastures(prev => prev.map(p => ({ ...p, ndvi: Math.min(1.0, p.ndvi + 0.08) })));
      } else if (newEvent.type === "storm") {
        setLivestockHealth(prev => Math.max(0, prev - 10));
      }
    }, 15000);

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

  // Livestock management handlers
  const handleHerdChange = (change: number) => {
    if (change > 0 && credits >= 50) {
      setCredits(prev => prev - 50);
      setHerdSize(prev => prev + 1);
      if (selectedPasture !== null) {
        setPastures(prev => prev.map(p => 
          p.id === selectedPasture ? { ...p, grazingLoad: p.grazingLoad + 1 } : p
        ));
      }
    } else if (change < 0 && herdSize > 0) {
      setHerdSize(prev => prev - 1);
      if (selectedPasture !== null) {
        setPastures(prev => prev.map(p => 
          p.id === selectedPasture && p.grazingLoad > 0 ? { ...p, grazingLoad: p.grazingLoad - 1 } : p
        ));
      }
    }
  };

  const handleFeed = () => {
    if (credits < 15 || feedLevel >= 100) return;
    setCredits(prev => prev - 15);
    setFeedLevel(prev => Math.min(100, prev + 40));
    setLivestockHealth(prev => Math.min(100, prev + 10));
  };

  const handleWater = () => {
    if (credits < 10 || waterAvailability >= 100) return;
    setCredits(prev => prev - 10);
    setWaterAvailability(prev => Math.min(100, prev + 30));
    setLivestockHealth(prev => Math.min(100, prev + 5));
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
                  icon: Home,
                  title: "Livestock Management",
                  description: "Master sustainable livestock practices using data-driven decision making",
                  details: [
                    "NDVI-based pasture health monitoring",
                    "Optimal herd sizing and grazing rotation",
                    "Water and feed resource optimization",
                    "Climate adaptation for animal welfare"
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
          {/* Left Column - Fields and Climate */}
          <div className="lg:col-span-2 space-y-6">
            <PastureField
              pastures={pastures}
              selectedPasture={selectedPasture}
              onPastureClick={setSelectedPasture}
            />
            <GameField
              plots={plots}
              onPlotClick={setSelectedPlot}
              selectedPlot={selectedPlot}
            />
            <ClimateData />
          </div>

          {/* Right Column - Controls and Metrics */}
          <div className="space-y-6">
            <WeatherEvents currentEvent={weatherEvent} />
            <LivestockPanel
              herdSize={herdSize}
              onHerdChange={handleHerdChange}
              onFeed={handleFeed}
              onWater={handleWater}
              credits={credits}
              livestockHealth={livestockHealth}
              waterAvailability={waterAvailability}
              feedLevel={feedLevel}
            />
            <ControlPanel
              selectedPlot={selectedPlot}
              onIrrigate={handleIrrigate}
              onFertilize={handleFertilize}
              credits={credits}
            />
            <LivestockMetrics {...livestockMetrics} />
            <SustainabilityMetrics {...metrics} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
