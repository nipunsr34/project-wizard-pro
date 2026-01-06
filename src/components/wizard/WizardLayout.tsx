import { ReactNode } from "react";
import { motion } from "framer-motion";

interface WizardLayoutProps {
  children: ReactNode;
}

export function WizardLayout({ children }: WizardLayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        {children}
      </motion.div>
    </div>
  );
}
