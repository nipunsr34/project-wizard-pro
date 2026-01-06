import { motion } from "framer-motion";
import { FileText, CheckCircle, AlertTriangle, ImageIcon, Percent, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ValidateStepProps {
  data: {
    validated: boolean;
  };
  onChange: (data: Partial<ValidateStepProps["data"]>) => void;
}

const sampleDocuments = [
  { name: "Master_Agreement_2024.pdf", status: "validated", confidence: 98 },
  { name: "Amendment_01_Pricing.pdf", status: "review", confidence: 85 },
  { name: "SLA_Appendix_A.docx", status: "validated", confidence: 96 },
];

const extractedTerms = [
  { label: "Effective Date", value: "January 15, 2024", confidence: 99 },
  { label: "Termination Date", value: "January 14, 2027", confidence: 98 },
  { label: "Contract Value", value: "$2,450,000", confidence: 95 },
  { label: "Payment Terms", value: "Net 30", confidence: 92 },
  { label: "Auto-Renewal", value: "Yes - 12 months", confidence: 88 },
];

export function ValidateStep({ data, onChange }: ValidateStepProps) {
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
          Preview Lab
        </h2>
        <p className="text-muted-foreground">
          Validate the AI extraction on sample documents before full processing
        </p>
      </div>

      {/* Sample Documents Selector */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Sample Documents (3 of 10,000)</p>
        <div className="flex flex-wrap gap-2">
          {sampleDocuments.map((doc, index) => (
            <motion.button
              key={doc.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm transition-all
                ${
                  index === 0
                    ? "border-primary bg-primary-light"
                    : "border-border bg-card hover:border-primary/50"
                }
              `}
            >
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-foreground">{doc.name}</span>
              {doc.status === "validated" ? (
                <CheckCircle className="w-4 h-4 text-step-complete" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-secondary" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Side-by-Side View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Document */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-4 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Original Document</h3>
            <Badge variant="outline" className="text-xs">PDF</Badge>
          </div>
          <div className="bg-muted rounded-lg p-6 aspect-[3/4] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Master_Agreement_2024.pdf</p>
              <p className="text-xs mt-1">Page 1 of 24</p>
            </div>
          </div>
        </motion.div>

        {/* Extracted Data */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border p-4 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Extracted Data</h3>
            <Badge className="bg-step-complete text-primary-foreground text-xs">
              98% Confidence
            </Badge>
          </div>
          
          <div className="space-y-3">
            {extractedTerms.map((term, index) => (
              <motion.div
                key={term.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{term.label}</p>
                  <p className="font-medium text-foreground">{term.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Percent className="w-3 h-3" />
                    <span>{term.confidence}%</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Multimodal Detection Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-secondary-light border-2 border-secondary/30 rounded-xl p-5"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">
              Visual Artifact Detected
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              We detected a <strong>"Rate Table"</strong> in image format on page 12. 
              Should we convert this to a dynamic chart?
            </p>
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm">
                Convert to Chart
              </Button>
              <Button variant="ghost" size="sm">
                Keep as Image
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Validation Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Validation Progress</p>
          <span className="text-sm text-muted-foreground">2 of 3 documents reviewed</span>
        </div>
        <Progress value={66} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Sample validation complete</span>
          <span>Ready to deploy</span>
        </div>
      </div>
    </motion.div>
  );
}
