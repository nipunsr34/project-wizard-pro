import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, MessageSquare, X, Send, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

interface FeedbackBugReportProps {
  currentScreen?: string;
  currentFeature?: string;
}

export function FeedbackBugReport({ currentScreen, currentFeature }: FeedbackBugReportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reportType, setReportType] = useState<"bug" | "feedback">("bug");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<string>("medium");

  const handleSubmit = () => {
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description of the issue or feedback.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send to an API
    console.log("Feedback/Bug Report:", {
      type: reportType,
      category,
      description,
      severity: reportType === "bug" ? severity : undefined,
      currentScreen,
      currentFeature,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Thank you!",
      description: `Your ${reportType === "bug" ? "bug report" : "feedback"} has been submitted.`,
    });

    // Reset form
    setDescription("");
    setCategory("");
    setSeverity("medium");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        aria-label="Report bug or provide feedback"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {reportType === "bug" ? (
                <Bug className="w-5 h-5 text-destructive" />
              ) : (
                <MessageSquare className="w-5 h-5 text-primary" />
              )}
              {reportType === "bug" ? "Report a Bug" : "Provide Feedback"}
            </DialogTitle>
            <DialogDescription>
              Help us improve Contract Central by reporting issues or sharing your thoughts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Report Type Toggle */}
            <div className="flex gap-2">
              <Button
                variant={reportType === "bug" ? "default" : "outline"}
                onClick={() => setReportType("bug")}
                className="flex-1"
              >
                <Bug className="w-4 h-4 mr-2" />
                Bug Report
              </Button>
              <Button
                variant={reportType === "feedback" ? "default" : "outline"}
                onClick={() => setReportType("feedback")}
                className="flex-1"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Feedback
              </Button>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {reportType === "bug" ? (
                    <>
                      <SelectItem value="extraction">Extraction Error</SelectItem>
                      <SelectItem value="pipeline">Pipeline Failure</SelectItem>
                      <SelectItem value="ui">UI/UX Issue</SelectItem>
                      <SelectItem value="performance">Performance Problem</SelectItem>
                      <SelectItem value="access">Access/Permission Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="improvement">UI/UX Improvement</SelectItem>
                      <SelectItem value="documentation">Documentation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Severity (for bugs only) */}
            {reportType === "bug" && (
              <div className="space-y-3">
                <Label>Severity</Label>
                <RadioGroup value={severity} onValueChange={setSeverity}>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center space-x-2 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="low" id="low" />
                      <div>
                        <div className="font-medium text-sm">Low</div>
                        <div className="text-xs text-muted-foreground">Minor issue</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="medium" id="medium" />
                      <div>
                        <div className="font-medium text-sm">Medium</div>
                        <div className="text-xs text-muted-foreground">Moderate impact</div>
                      </div>
                    </label>
                    <label className="flex items-center space-x-2 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="high" id="high" />
                      <div>
                        <div className="font-medium text-sm">High</div>
                        <div className="text-xs text-muted-foreground">Critical issue</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Context Information */}
            {(currentScreen || currentFeature) && (
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">Context:</span>
                </div>
                <div className="text-sm space-y-1">
                  {currentScreen && <div>Screen: {currentScreen}</div>}
                  {currentFeature && <div>Feature: {currentFeature}</div>}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                {reportType === "bug" ? "Describe the bug" : "Share your feedback"}
              </Label>
              <Textarea
                id="description"
                placeholder={
                  reportType === "bug"
                    ? "Please describe what happened, what you expected, and steps to reproduce..."
                    : "Tell us what you think..."
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="gap-2">
                <Send className="w-4 h-4" />
                Submit {reportType === "bug" ? "Bug Report" : "Feedback"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

