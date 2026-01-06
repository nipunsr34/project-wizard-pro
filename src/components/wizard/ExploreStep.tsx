import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FileText, GitBranch, Table, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ExploreStepProps {
  data: {
    summarization: boolean;
    navigation: boolean;
    deepAnalysis: boolean;
    assistance: boolean;
    quality: boolean;
  };
  onChange: (data: Partial<ExploreStepProps["data"]>) => void;
}

const features = [
  {
    id: "summarization",
    icon: FileText,
    title: "Summarization",
    subtitle: "LLM-based Key Metrics",
    description: "Generates a 3-bullet summary of every contract",
    processingTime: 2,
  },
  {
    id: "navigation",
    icon: GitBranch,
    title: "Navigation",
    subtitle: "Hierarchy & Versioning",
    description: "Automatically links Amendments to Base Agreements",
    processingTime: 1,
  },
  {
    id: "deepAnalysis",
    icon: Table,
    title: "Deep Analysis",
    subtitle: "Table & Chart Extraction",
    description: "Converts pricing tables into searchable Excel/Chart formats",
    processingTime: 3,
  },
  {
    id: "assistance",
    icon: MessageCircle,
    title: "Assistance",
    subtitle: "Gen AI Chatbot",
    description: 'Enables "Ask my Contracts" Q&A for this project',
    processingTime: 2,
  },
  {
    id: "quality",
    icon: CheckCircle,
    title: "Quality",
    subtitle: "Spell Check & Validation",
    description: "Flags inconsistent dates or missing signatures",
    processingTime: 1,
  },
];

export function ExploreStep({ data, onChange }: ExploreStepProps) {
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    let total = 0;
    features.forEach((feature) => {
      if (data[feature.id as keyof typeof data]) {
        total += feature.processingTime;
      }
    });
    setEstimatedTime(total);
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Configure Intelligence
        </h2>
        <p className="text-muted-foreground">
          Select which AI capabilities to activate for your project
        </p>
      </div>

      {/* Estimated Time Card */}
      <motion.div
        layout
        className="bg-gradient-to-r from-secondary-light to-primary-light p-4 rounded-xl border border-border flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary text-secondary-foreground">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Estimated Processing Time</p>
            <p className="text-xs text-muted-foreground">Per 100 documents</p>
          </div>
        </div>
        <motion.div
          key={estimatedTime}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-right"
        >
          <span className="text-2xl font-bold text-secondary">{estimatedTime}</span>
          <span className="text-sm text-muted-foreground ml-1">min</span>
        </motion.div>
      </motion.div>

      {/* Feature Toggles */}
      <div className="space-y-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isEnabled = data[feature.id as keyof typeof data];

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-5 rounded-xl border-2 transition-all duration-200
                ${
                  isEnabled
                    ? "border-primary bg-primary-light/50 shadow-md"
                    : "border-border bg-card hover:border-primary/30"
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg transition-colors ${
                      isEnabled
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {feature.subtitle}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>+{feature.processingTime} min per 100 docs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Label htmlFor={feature.id} className="sr-only">
                    Enable {feature.title}
                  </Label>
                  <Switch
                    id={feature.id}
                    checked={isEnabled}
                    onCheckedChange={(checked) =>
                      onChange({ [feature.id]: checked } as Partial<ExploreStepProps["data"]>)
                    }
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
