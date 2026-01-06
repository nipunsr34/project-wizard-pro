import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FileText, 
  Upload, 
  X, 
  Plus, 
  AlertCircle,
  BookOpen,
  Tag,
  CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DatasetManagerProps {
  data: {
    attributes: Array<{ name: string; type: string; description: string }>;
    customDictionary: File | null;
    keywordFlags: string[];
  };
  onChange: (data: Partial<DatasetManagerProps["data"]>) => void;
}

export function DatasetManager({ data, onChange }: DatasetManagerProps) {
  const [newAttribute, setNewAttribute] = useState({ name: "", type: "text", description: "" });

  const addAttribute = () => {
    if (newAttribute.name.trim()) {
      onChange({
        attributes: [...(data.attributes || []), { ...newAttribute }],
      });
      setNewAttribute({ name: "", type: "text", description: "" });
    }
  };

  const removeAttribute = (index: number) => {
    onChange({
      attributes: data.attributes.filter((_, i) => i !== index),
    });
  };

  const addKeywordFlag = (keyword: string) => {
    if (keyword.trim() && !data.keywordFlags.includes(keyword.trim())) {
      onChange({
        keywordFlags: [...(data.keywordFlags || []), keyword.trim()],
      });
    }
  };

  const removeKeywordFlag = (keyword: string) => {
    onChange({
      keywordFlags: data.keywordFlags.filter((k) => k !== keyword),
    });
  };

  const handleFileUpload = (file: File) => {
    onChange({ customDictionary: file });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">Dataset Manager</h3>
        <p className="text-sm text-muted-foreground">
          Define your "Ground Truth" - attributes, dictionaries, and keyword flags
        </p>
      </div>

      <Tabs defaultValue="attributes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="attributes">Attributes & KPIs</TabsTrigger>
          <TabsTrigger value="dictionary">Custom Dictionary</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Flags</TabsTrigger>
        </TabsList>

        {/* Attribute & KPI Definition */}
        <TabsContent value="attributes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Define Extraction Variables
              </CardTitle>
              <CardDescription>
                Specify the exact attributes you want to extract from your documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Attribute */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border border-border rounded-lg bg-muted/30">
                <Input
                  placeholder="e.g., Termination Notice Period"
                  value={newAttribute.name}
                  onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                  className="bg-card"
                />
                <select
                  value={newAttribute.type}
                  onChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value })}
                  className="h-10 rounded-md border border-input bg-card px-3 text-sm"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="currency">Currency</option>
                  <option value="percentage">Percentage</option>
                </select>
                <div className="flex gap-2">
                  <Input
                    placeholder="Description (optional)"
                    value={newAttribute.description}
                    onChange={(e) => setNewAttribute({ ...newAttribute, description: e.target.value })}
                    className="bg-card flex-1"
                  />
                  <Button onClick={addAttribute} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Existing Attributes */}
              <div className="space-y-2">
                {data.attributes && data.attributes.length > 0 ? (
                  data.attributes.map((attr, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-card"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{attr.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {attr.type}
                            </Badge>
                            {attr.description && (
                              <span className="text-xs text-muted-foreground">{attr.description}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttribute(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No attributes defined yet</p>
                    <p className="text-xs mt-1">Add attributes above to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Dictionary Upload */}
        <TabsContent value="dictionary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Domain-Specific Dictionary
              </CardTitle>
              <CardDescription>
                Upload your own acronyms, legal terms, or template dictionaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data.customDictionary ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 border-2 border-primary rounded-lg bg-primary-light/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{data.customDictionary.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(data.customDictionary.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onChange({ customDictionary: null })}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CSV, JSON, or TXT file with your domain terms
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv,.json,.txt"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </label>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Keyword Flags */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                High-Priority Keyword Flags
              </CardTitle>
              <CardDescription>
                Keywords that trigger alerts in the Validate lab when detected
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Force Majeure, Termination Clause"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addKeywordFlag(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                  className="bg-card"
                />
                <Button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (input) {
                      addKeywordFlag(input.value);
                      input.value = "";
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {data.keywordFlags && data.keywordFlags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.keywordFlags.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 flex items-center gap-2"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {keyword}
                      <button
                        onClick={() => removeKeywordFlag(keyword)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Tag className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No keyword flags set</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

