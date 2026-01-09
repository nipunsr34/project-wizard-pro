import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Rocket, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { WizardProgress } from "@/components/wizard/WizardProgress";
import { DiscoverStep } from "@/components/wizard/DiscoverStep";
import { ExploreStep } from "@/components/wizard/ExploreStep";
import { ValidateStep } from "@/components/wizard/ValidateStep";
import { DeployStep } from "@/components/wizard/DeployStep";
import { DatasetManager } from "@/components/wizard/DatasetManager";
import { TestingMonitoring } from "@/components/wizard/TestingMonitoring";
import { FeedbackBugReport } from "@/components/FeedbackBugReport";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, label: "Discover", description: "Identity & Data Source" },
  { id: 2, label: "Explore", description: "Intelligence Config" },
  { id: 3, label: "Validate", description: "Preview Lab" },
  { id: 4, label: "Deploy", description: "Target & Access" },
];

interface WizardData {
  discover: {
    projectName: string;
    businessCategory: string;
    ingestionSource: string;
    confidentialityLevel: string;
    datasetManager: {
      attributes: Array<{ name: string; type: string; description: string }>;
      customDictionary: File | null;
      keywordFlags: string[];
    };
  };
  explore: {
    summarization: boolean;
    navigation: boolean;
    deepAnalysis: boolean;
    assistance: boolean;
    quality: boolean;
    tableExtraction: boolean;
    paragraphExtraction: boolean;
    contractSearch: boolean;
    dashboardAnalytics: boolean;
    automatedNotifications: boolean;
    legislationAnalysis: boolean;
    contractRedlining: boolean;
    performanceComparison: boolean;
    multiStateAnalysis: boolean;
  };
  validate: {
    validated: boolean;
  };
  deploy: {
    publishToHub: boolean;
    exportData: boolean;
    notifications: boolean;
    selectedUsers: string[];
    userRoles: Record<string, "edit" | "search" | "view">;
    lobAssignments: Record<string, string[]>;
    externalAccess: {
      enabled: boolean;
      auditors: Array<{ email: string; expiryDate: string }>;
    };
  };
}

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({
    discover: {
      projectName: "",
      businessCategory: "",
      ingestionSource: "",
      confidentialityLevel: "",
      datasetManager: {
        attributes: [],
        customDictionary: null,
        keywordFlags: [],
      },
    },
    explore: {
      summarization: true,
      navigation: true,
      deepAnalysis: false,
      assistance: true,
      quality: false,
      tableExtraction: false,
      paragraphExtraction: false,
      contractSearch: true,
      dashboardAnalytics: false,
      automatedNotifications: true,
      legislationAnalysis: false,
      contractRedlining: false,
      performanceComparison: false,
      multiStateAnalysis: false,
    },
    validate: {
      validated: false,
    },
    deploy: {
      publishToHub: true,
      exportData: false,
      notifications: true,
      selectedUsers: [],
      userRoles: {},
      lobAssignments: {},
      externalAccess: {
        enabled: false,
        auditors: [],
      },
    },
  });

  const updateStepData = <T extends keyof WizardData>(
    step: T,
    data: Partial<WizardData[T]>
  ) => {
    setWizardData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Deploy action
      toast({
        title: "Project Deployed Successfully! 🚀",
        description: "Your digitization project is now live and processing documents.",
      });
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <DiscoverStep
              data={{
                projectName: wizardData.discover.projectName,
                businessCategory: wizardData.discover.businessCategory,
                ingestionSource: wizardData.discover.ingestionSource,
                confidentialityLevel: wizardData.discover.confidentialityLevel,
              }}
              onChange={(data) => updateStepData("discover", data)}
            />
            <DatasetManager
              data={wizardData.discover.datasetManager}
              onChange={(data) =>
                updateStepData("discover", {
                  datasetManager: { ...wizardData.discover.datasetManager, ...data },
                })
              }
            />
          </div>
        );
      case 2:
        return (
          <ExploreStep
            data={wizardData.explore}
            onChange={(data) => updateStepData("explore", data)}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            <ValidateStep
              data={wizardData.validate}
              onChange={(data) => updateStepData("validate", data)}
            />
            <TestingMonitoring projectId={wizardData.discover.projectName} />
          </div>
        );
      case 4:
        return (
          <DeployStep
            data={wizardData.deploy}
            onChange={(data) => updateStepData("deploy", data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <WizardLayout>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative"
      >
        {/* Admin Dashboard Link */}
        <div className="absolute top-0 right-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin")}
            className="gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Admin Dashboard
          </Button>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-card mb-4">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-foreground">Document Digitization Wizard</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Transform Your Documents
        </h1>
        <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
          Self-serve digitization without needing deep technical knowledge
        </p>
      </motion.header>

      {/* Progress Indicator */}
      <WizardProgress currentStep={currentStep} steps={steps} />

      {/* Step Content Card */}
      <motion.div
        layout
        className="bg-card rounded-2xl border border-border shadow-card p-6 md:p-8 mt-8"
      >
        <AnimatePresence mode="wait">
          <motion.div key={currentStep}>{renderStep()}</motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between mt-8"
      >
        <Button
          variant="wizard-secondary"
          size="lg"
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>

        <Button
          variant={currentStep === steps.length ? "wizard-accent" : "wizard"}
          size="lg"
          onClick={goToNextStep}
          className="gap-2"
        >
          {currentStep === steps.length ? (
            <>
              Deploy Project
              <Rocket className="w-4 h-4" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Global Feedback/Bug Report */}
      <FeedbackBugReport 
        currentScreen={`Wizard - Step ${currentStep}`}
        currentFeature={steps[currentStep - 1]?.label}
      />
    </WizardLayout>
  );
};

export default Index;
