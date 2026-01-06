import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Activity,
  TrendingUp,
  Filter,
  Search,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TestingMonitoringProps {
  projectId?: string;
}

interface ExtractionLog {
  id: string;
  document: string;
  attribute: string;
  extractedValue: string;
  confidence: number;
  manualChange: boolean;
  timestamp: string;
  changedBy?: string;
}

interface PipelineStage {
  name: string;
  status: "pending" | "processing" | "complete" | "error";
  progress: number;
  documentsProcessed: number;
  totalDocuments: number;
}

interface ConflictLog {
  id: string;
  document: string;
  conflictType: "visual_artifact" | "amendment_mismatch" | "data_inconsistency";
  description: string;
  detectedAt: string;
  resolved: boolean;
}

// Mock data
const extractionAudit: ExtractionLog[] = [
  {
    id: "1",
    document: "Master_Agreement_2024.pdf",
    attribute: "Termination Notice Period",
    extractedValue: "90 days",
    confidence: 98,
    manualChange: false,
    timestamp: "2024-01-15 10:23:45",
  },
  {
    id: "2",
    document: "Master_Agreement_2024.pdf",
    attribute: "Annual Fee",
    extractedValue: "$2,450,000",
    confidence: 95,
    manualChange: true,
    timestamp: "2024-01-15 10:25:12",
    changedBy: "Sarah Johnson",
  },
  {
    id: "3",
    document: "Amendment_01_Pricing.pdf",
    attribute: "Effective Date",
    extractedValue: "January 15, 2024",
    confidence: 99,
    manualChange: false,
    timestamp: "2024-01-15 10:27:33",
  },
];

const pipelineStages: PipelineStage[] = [
  { name: "Document Ingestion", status: "complete", progress: 100, documentsProcessed: 10000, totalDocuments: 10000 },
  { name: "Table Extraction", status: "processing", progress: 60, documentsProcessed: 6000, totalDocuments: 10000 },
  { name: "Paragraph Extraction", status: "pending", progress: 0, documentsProcessed: 0, totalDocuments: 10000 },
  { name: "Contract Search Indexing", status: "pending", progress: 0, documentsProcessed: 0, totalDocuments: 10000 },
  { name: "Dashboard Analytics", status: "pending", progress: 0, documentsProcessed: 0, totalDocuments: 10000 },
];

const conflictLogs: ConflictLog[] = [
  {
    id: "1",
    document: "Master_Agreement_2024.pdf",
    conflictType: "visual_artifact",
    description: "Rate Table detected in image format on page 12",
    detectedAt: "2024-01-15 10:20:00",
    resolved: false,
  },
  {
    id: "2",
    document: "Amendment_01_Pricing.pdf",
    conflictType: "amendment_mismatch",
    description: "Pricing terms conflict with base agreement",
    detectedAt: "2024-01-15 10:22:15",
    resolved: true,
  },
];

export function TestingMonitoring({ projectId }: TestingMonitoringProps) {
  const [selectedTab, setSelectedTab] = useState("audit");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-600 bg-green-500/10";
      case "processing":
        return "text-blue-600 bg-blue-500/10";
      case "error":
        return "text-red-600 bg-red-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getConflictIcon = (type: string) => {
    switch (type) {
      case "visual_artifact":
        return "🖼️";
      case "amendment_mismatch":
        return "⚠️";
      case "data_inconsistency":
        return "❌";
      default:
        return "🔍";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">Testing & Monitoring</h3>
          <p className="text-sm text-muted-foreground">Project audit trail and pipeline tracking</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audit">Extraction Audit</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Tracking</TabsTrigger>
          <TabsTrigger value="conflicts">Conflict Logs</TabsTrigger>
        </TabsList>

        {/* Extraction Audit */}
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Extraction Audit Log</CardTitle>
                  <CardDescription>
                    Detailed log of AI extractions, confidence scores, and manual changes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Search..." className="w-48" />
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Attribute</TableHead>
                    <TableHead>Extracted Value</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Manual Change</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {extractionAudit.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.document}</TableCell>
                      <TableCell>{log.attribute}</TableCell>
                      <TableCell>{log.extractedValue}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={log.confidence} className="w-16 h-2" />
                          <span className="text-sm">{log.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {log.manualChange ? (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Yes
                            {log.changedBy && ` by ${log.changedBy}`}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pipeline Tracking */}
        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Pipeline Progress</CardTitle>
              <CardDescription>
                Real-time tracking of document processing stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pipelineStages.map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border bg-card"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(stage.status)}`}>
                          {stage.status === "complete" ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : stage.status === "processing" ? (
                            <Activity className="w-5 h-5 animate-pulse" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{stage.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {stage.documentsProcessed.toLocaleString()} / {stage.totalDocuments.toLocaleString()} documents
                          </p>
                        </div>
                      </div>
                      <Badge variant={stage.status === "complete" ? "default" : "secondary"}>
                        {stage.status}
                      </Badge>
                    </div>
                    <Progress value={stage.progress} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conflict Logs */}
        <TabsContent value="conflicts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multimodal Validation Conflicts</CardTitle>
              <CardDescription>
                Detected visual artifacts and data inconsistencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conflictLogs.map((conflict, index) => (
                  <motion.div
                    key={conflict.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 ${
                      conflict.resolved
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-yellow-500/30 bg-yellow-500/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-2xl">{getConflictIcon(conflict.conflictType)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground">{conflict.document}</p>
                            <Badge variant="outline" className="text-xs">
                              {conflict.conflictType.replace("_", " ")}
                            </Badge>
                            {conflict.resolved && (
                              <Badge variant="default" className="text-xs gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{conflict.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Detected: {conflict.detectedAt}
                          </p>
                        </div>
                      </div>
                      {!conflict.resolved && (
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

