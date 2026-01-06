import { motion } from "framer-motion";
import { Database, Download, Bell, Users, Globe, FileJson, BarChart3, CheckCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DeployStepProps {
  data: {
    publishToHub: boolean;
    exportData: boolean;
    notifications: boolean;
    selectedUsers: string[];
  };
  onChange: (data: Partial<DeployStepProps["data"]>) => void;
}

const integrationOptions = [
  {
    id: "publishToHub",
    icon: Globe,
    title: "Publish to Contract Hub",
    description: "Make documents searchable in the main LOB dashboard",
  },
  {
    id: "exportData",
    icon: Download,
    title: "Export Data",
    description: "Send extracted JSON/CSV to a downstream database",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Email Notifications",
    description: "Get notified when ingestion is complete",
  },
];

const exportFormats = [
  { icon: FileJson, label: "JSON", description: "Structured data" },
  { icon: Database, label: "SQL", description: "Database export" },
  { icon: BarChart3, label: "PowerBI", description: "Analytics ready" },
];

const teamMembers = [
  { id: "1", name: "Sarah Johnson", role: "Legal Analyst", avatar: "SJ" },
  { id: "2", name: "Michael Chen", role: "Contract Manager", avatar: "MC" },
  { id: "3", name: "Emily Davis", role: "Compliance Officer", avatar: "ED" },
  { id: "4", name: "Robert Wilson", role: "Finance Lead", avatar: "RW" },
];

export function DeployStep({ data, onChange }: DeployStepProps) {
  const toggleUser = (userId: string) => {
    const currentUsers = data.selectedUsers || [];
    if (currentUsers.includes(userId)) {
      onChange({ selectedUsers: currentUsers.filter((id) => id !== userId) });
    } else {
      onChange({ selectedUsers: [...currentUsers, userId] });
    }
  };

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
          Deploy & Share
        </h2>
        <p className="text-muted-foreground">
          Set your project live and configure who can access it
        </p>
      </div>

      {/* Integration Hub */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          Integration Hub
        </h3>
        
        {integrationOptions.map((option, index) => {
          const Icon = option.icon;
          const isEnabled = data[option.id as keyof typeof data] as boolean;

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200
                ${
                  isEnabled
                    ? "border-primary bg-primary-light/50 shadow-md"
                    : "border-border bg-card hover:border-primary/30"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2.5 rounded-lg transition-colors ${
                      isEnabled
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={(checked) =>
                    onChange({ [option.id]: checked } as Partial<DeployStepProps["data"]>)
                  }
                  className="data-[state=checked]:bg-primary"
                />
              </div>

              {/* Export Format Options */}
              {option.id === "exportData" && isEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <p className="text-sm text-muted-foreground mb-3">Select export format:</p>
                  <div className="grid grid-cols-3 gap-3">
                    {exportFormats.map((format) => {
                      const FormatIcon = format.icon;
                      return (
                        <button
                          key={format.label}
                          className="p-3 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary-light/30 transition-all text-center group"
                        >
                          <FormatIcon className="w-5 h-5 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                          <p className="text-sm font-medium text-foreground mt-2">{format.label}</p>
                          <p className="text-xs text-muted-foreground">{format.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Notification Email */}
              {option.id === "notifications" && isEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <Label htmlFor="notificationEmail" className="text-sm text-muted-foreground">
                    Notification email address
                  </Label>
                  <Input
                    id="notificationEmail"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-2 h-10 bg-card"
                  />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Access Control */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Access Control
        </h3>
        <p className="text-sm text-muted-foreground">
          Select team members who can access the Gen AI Chatbot for these documents
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teamMembers.map((member, index) => {
            const isSelected = (data.selectedUsers || []).includes(member.id);
            return (
              <motion.button
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => toggleUser(member.id)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left
                  ${
                    isSelected
                      ? "border-primary bg-primary-light shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  }
                `}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                    ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                  `}
                >
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-primary-light to-secondary-light border border-border rounded-xl p-5"
      >
        <h4 className="font-semibold text-foreground mb-3">Project Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Documents to process</p>
            <p className="font-medium text-foreground">10,000 files</p>
          </div>
          <div>
            <p className="text-muted-foreground">Estimated completion</p>
            <p className="font-medium text-foreground">~45 minutes</p>
          </div>
          <div>
            <p className="text-muted-foreground">AI features enabled</p>
            <p className="font-medium text-foreground">4 of 5</p>
          </div>
          <div>
            <p className="text-muted-foreground">Team access</p>
            <p className="font-medium text-foreground">{(data.selectedUsers || []).length} members</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
