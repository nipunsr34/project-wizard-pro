import { motion } from "framer-motion";
import { Upload, Cloud, FolderOpen, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DiscoverStepProps {
  data: {
    projectName: string;
    businessCategory: string;
    ingestionSource: string;
    confidentialityLevel: string;
  };
  onChange: (data: Partial<DiscoverStepProps["data"]>) => void;
}

const categories = [
  { value: "healthcare", label: "Healthcare Provider" },
  { value: "it-vendor", label: "IT Vendor" },
  { value: "pbm", label: "Pharmacy Benefit Management" },
  { value: "financial", label: "Financial Services" },
  { value: "legal", label: "Legal & Compliance" },
];

const confidentialityLevels = [
  { value: "public", label: "Public", icon: Shield, description: "Publicly accessible documents" },
  { value: "internal", label: "Internal", icon: ShieldAlert, description: "Internal use only" },
  { value: "confidential", label: "Highly Confidential", icon: ShieldCheck, description: "Restricted access with encryption" },
];

export function DiscoverStep({ data, onChange }: DiscoverStepProps) {
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
          Define Your Project
        </h2>
        <p className="text-muted-foreground">
          Identify what you're digitizing and where the data comes from
        </p>
      </div>

      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="projectName" className="text-sm font-medium">
          Project Name
        </Label>
        <Input
          id="projectName"
          placeholder="e.g., Q1 Vendor Audit"
          value={data.projectName}
          onChange={(e) => onChange({ projectName: e.target.value })}
          className="h-12 bg-card border-border focus:border-primary transition-colors"
        />
      </div>

      {/* Business Category */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Business Category</Label>
        <Select
          value={data.businessCategory}
          onValueChange={(value) => onChange({ businessCategory: value })}
        >
          <SelectTrigger className="h-12 bg-card border-border">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Data Ingestion Source */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Data Ingestion Source</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange({ ingestionSource: "upload" })}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-200 text-left
              ${
                data.ingestionSource === "upload"
                  ? "border-primary bg-primary-light shadow-md"
                  : "border-border bg-card hover:border-primary/50"
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${data.ingestionSource === "upload" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Direct Upload</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag & drop PDF/Word files directly
                </p>
              </div>
            </div>
            {data.ingestionSource === "upload" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 border-2 border-dashed border-primary/30 rounded-lg bg-card"
              >
                <div className="flex flex-col items-center justify-center py-4 text-muted-foreground">
                  <FolderOpen className="w-8 h-8 mb-2" />
                  <p className="text-sm">Drop files here or click to browse</p>
                </div>
              </motion.div>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange({ ingestionSource: "cloud" })}
            className={`
              relative p-6 rounded-xl border-2 transition-all duration-200 text-left
              ${
                data.ingestionSource === "cloud"
                  ? "border-primary bg-primary-light shadow-md"
                  : "border-border bg-card hover:border-primary/50"
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${data.ingestionSource === "cloud" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Cloud Connect</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Sync with SharePoint, Azure Data Lake
                </p>
              </div>
            </div>
            {data.ingestionSource === "cloud" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-2"
              >
                <Select>
                  <SelectTrigger className="h-10 bg-card">
                    <SelectValue placeholder="Select cloud provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sharepoint">SharePoint</SelectItem>
                    <SelectItem value="azure-lake">Azure Data Lake</SelectItem>
                    <SelectItem value="azure-storage">Azure Storage Account</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Confidentiality Level */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Confidentiality Level</Label>
        <RadioGroup
          value={data.confidentialityLevel}
          onValueChange={(value) => onChange({ confidentialityLevel: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {confidentialityLevels.map((level) => {
            const Icon = level.icon;
            const isSelected = data.confidentialityLevel === level.value;
            return (
              <motion.label
                key={level.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${
                    isSelected
                      ? "border-primary bg-primary-light shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  }
                `}
              >
                <RadioGroupItem value={level.value} className="sr-only" />
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{level.label}</p>
                    <p className="text-xs text-muted-foreground">{level.description}</p>
                  </div>
                </div>
              </motion.label>
            );
          })}
        </RadioGroup>
      </div>
    </motion.div>
  );
}
