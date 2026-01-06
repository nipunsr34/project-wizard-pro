import { motion } from "framer-motion";
import { Check, Search, Settings, Eye, Rocket } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  steps: { id: number; label: string; description: string }[];
}

const stepIcons = [Search, Settings, Eye, Rocket];

export function WizardProgress({ currentStep, steps }: WizardProgressProps) {
  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const Icon = stepIcons[index];
          const isComplete = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isComplete
                      ? "hsl(var(--step-complete))"
                      : isActive
                      ? "hsl(var(--step-active))"
                      : "hsl(var(--step-pending))",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center
                    ${isActive ? "shadow-glow" : ""}
                  `}
                >
                  {isComplete ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </motion.div>
                  ) : (
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    />
                  )}

                  {/* Active Ring Animation */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-soft"
                    />
                  )}
                </motion.div>

                {/* Label */}
                <motion.div
                  initial={false}
                  animate={{
                    color: isActive
                      ? "hsl(var(--primary))"
                      : isComplete
                      ? "hsl(var(--step-complete))"
                      : "hsl(var(--muted-foreground))",
                  }}
                  className="mt-3 text-center"
                >
                  <p className="font-semibold text-sm">{step.label}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block mt-0.5">
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 mt-[-2rem] relative overflow-hidden rounded-full bg-step-pending">
                  <motion.div
                    initial={false}
                    animate={{
                      width: isComplete ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-step-complete"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
