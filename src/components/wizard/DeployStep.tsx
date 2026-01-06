import { motion } from "framer-motion";
import { Database, Download, Bell, Users, Globe, FileJson, BarChart3, CheckCircle, Shield, UserPlus, Building2, Edit, Search, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeployStepProps {
  data: {
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
  { id: "1", name: "Sarah Johnson", role: "Legal Analyst", avatar: "SJ", lob: "Legal" },
  { id: "2", name: "Michael Chen", role: "Contract Manager", avatar: "MC", lob: "Procurement" },
  { id: "3", name: "Emily Davis", role: "Compliance Officer", avatar: "ED", lob: "Compliance" },
  { id: "4", name: "Robert Wilson", role: "Finance Lead", avatar: "RW", lob: "Finance" },
];

const lobs = ["Legal", "Procurement", "Compliance", "Finance", "Risk", "Operations"];

const rolePermissions = {
  edit: { label: "Edit/Validate", icon: Edit, description: "Can edit extractions and validate documents" },
  search: { label: "Search/Chat", icon: Search, description: "Can search contracts and use Gen AI Chatbot" },
  view: { label: "View Only", icon: Eye, description: "Read-only access to documents" },
};

export function DeployStep({ data, onChange }: DeployStepProps) {
  const toggleUser = (userId: string) => {
    const currentUsers = data.selectedUsers || [];
    if (currentUsers.includes(userId)) {
      onChange({ 
        selectedUsers: currentUsers.filter((id) => id !== userId),
        userRoles: Object.fromEntries(
          Object.entries(data.userRoles || {}).filter(([id]) => id !== userId)
        ),
      });
    } else {
      onChange({ 
        selectedUsers: [...currentUsers, userId],
        userRoles: { ...(data.userRoles || {}), [userId]: "search" },
      });
    }
  };

  const updateUserRole = (userId: string, role: "edit" | "search" | "view") => {
    onChange({
      userRoles: { ...(data.userRoles || {}), [userId]: role },
    });
  };

  const toggleLOBUser = (lob: string, userId: string) => {
    const currentLOBUsers = data.lobAssignments?.[lob] || [];
    const newLOBUsers = currentLOBUsers.includes(userId)
      ? currentLOBUsers.filter((id) => id !== userId)
      : [...currentLOBUsers, userId];
    
    onChange({
      lobAssignments: { ...(data.lobAssignments || {}), [lob]: newLOBUsers },
    });
  };

  const addExternalAuditor = () => {
    const newAuditor = { email: "", expiryDate: "" };
    onChange({
      externalAccess: {
        ...(data.externalAccess || { enabled: false, auditors: [] }),
        auditors: [...(data.externalAccess?.auditors || []), newAuditor],
      },
    });
  };

  const updateExternalAuditor = (index: number, field: "email" | "expiryDate", value: string) => {
    const auditors = [...(data.externalAccess?.auditors || [])];
    auditors[index] = { ...auditors[index], [field]: value };
    onChange({
      externalAccess: {
        ...(data.externalAccess || { enabled: false, auditors: [] }),
        auditors,
      },
    });
  };

  const removeExternalAuditor = (index: number) => {
    const auditors = (data.externalAccess?.auditors || []).filter((_, i) => i !== index);
    onChange({
      externalAccess: {
        ...(data.externalAccess || { enabled: false, auditors: [] }),
        auditors,
      },
    });
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

      {/* Roles and Access Management */}
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            Roles and Access Management
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Configure "Run State" permissions for this project
          </p>
        </div>

        <Tabs defaultValue="roles" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roles">Project-Level Roles</TabsTrigger>
            <TabsTrigger value="lob">LOB Permissioning</TabsTrigger>
            <TabsTrigger value="external">External Access</TabsTrigger>
          </TabsList>

          {/* Project-Level Roles */}
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Define User Permissions</CardTitle>
                <CardDescription>
                  Assign roles to determine who can Edit/Validate vs Search/Chat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => {
                    const isSelected = (data.selectedUsers || []).includes(member.id);
                    const userRole = data.userRoles?.[member.id] || "search";
                    const RoleIcon = rolePermissions[userRole].icon;

                    return (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                          p-4 rounded-xl border-2 transition-all duration-200
                          ${
                            isSelected
                              ? "border-primary bg-primary-light/30"
                              : "border-border bg-card opacity-50"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className={`
                                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                                ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                              `}
                            >
                              {member.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <Switch
                            checked={isSelected}
                            onCheckedChange={() => toggleUser(member.id)}
                          />
                        </div>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pt-3 border-t border-border"
                          >
                            <Label className="text-xs text-muted-foreground mb-2 block">
                              Assign Role
                            </Label>
                            <div className="grid grid-cols-3 gap-2">
                              {Object.entries(rolePermissions).map(([key, perm]) => {
                                const PermIcon = perm.icon;
                                const isActive = userRole === key;
                                return (
                                  <button
                                    key={key}
                                    onClick={() => updateUserRole(member.id, key as "edit" | "search" | "view")}
                                    className={`
                                      p-3 rounded-lg border-2 text-left transition-all
                                      ${
                                        isActive
                                          ? "border-primary bg-primary-light"
                                          : "border-border bg-card hover:border-primary/50"
                                      }
                                    `}
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <PermIcon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                                      <span className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {perm.label}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{perm.description}</p>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LOB Permissioning */}
          <TabsContent value="lob" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Business Unit Assignment
                </CardTitle>
                <CardDescription>
                  Assign team members to specific LOBs for this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lobs.map((lob) => {
                    const lobUsers = data.lobAssignments?.[lob] || [];
                    return (
                      <div key={lob} className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-foreground">{lob}</h4>
                          <Badge variant="outline">{lobUsers.length} assigned</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {teamMembers.map((member) => {
                            const isAssigned = lobUsers.includes(member.id);
                            return (
                              <button
                                key={member.id}
                                onClick={() => toggleLOBUser(lob, member.id)}
                                className={`
                                  flex items-center gap-2 p-2 rounded-lg border transition-all text-left
                                  ${
                                    isAssigned
                                      ? "border-primary bg-primary-light"
                                      : "border-border bg-muted/30 hover:border-primary/50"
                                  }
                                `}
                              >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                                  isAssigned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}>
                                  {member.avatar}
                                </div>
                                <span className="text-sm text-foreground">{member.name}</span>
                                {isAssigned && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* External Access */}
          <TabsContent value="external" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  External Auditor Access
                </CardTitle>
                <CardDescription>
                  Grant temporary access to external auditors or legal counsel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                  <div>
                    <p className="font-medium text-foreground">Enable External Access</p>
                    <p className="text-xs text-muted-foreground">
                      Allow external users to view audit trails
                    </p>
                  </div>
                  <Switch
                    checked={data.externalAccess?.enabled || false}
                    onCheckedChange={(checked) =>
                      onChange({
                        externalAccess: {
                          ...(data.externalAccess || { enabled: false, auditors: [] }),
                          enabled: checked,
                        },
                      })
                    }
                  />
                </div>

                {data.externalAccess?.enabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Label>External Auditors</Label>
                      <Button onClick={addExternalAuditor} size="sm" variant="outline">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Auditor
                      </Button>
                    </div>

                    {(data.externalAccess?.auditors || []).map((auditor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-2 p-3 rounded-lg border border-border bg-card"
                      >
                        <Input
                          type="email"
                          placeholder="auditor@example.com"
                          value={auditor.email}
                          onChange={(e) => updateExternalAuditor(index, "email", e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          type="date"
                          value={auditor.expiryDate}
                          onChange={(e) => updateExternalAuditor(index, "expiryDate", e.target.value)}
                          className="w-40"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExternalAuditor(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
