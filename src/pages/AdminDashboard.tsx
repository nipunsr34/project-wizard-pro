import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Server, 
  DollarSign, 
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Database,
  Zap,
  FileText
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FeedbackBugReport } from "@/components/FeedbackBugReport";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

// Mock data - replace with actual API calls
const platformMetrics = {
  totalProjects: 47,
  activeProjects: 32,
  averageAccuracy: 94.2,
  totalClients: 12,
  totalDocuments: 125000,
};

const billingData = [
  { client: "Healthcare Provider A", department: "Legal", docIntelligence: 45000, llmTokens: 2300000, cost: 1250 },
  { client: "IT Vendor B", department: "Procurement", docIntelligence: 32000, llmTokens: 1800000, cost: 890 },
  { client: "PBM C", department: "Compliance", docIntelligence: 28000, llmTokens: 1500000, cost: 720 },
  { client: "Financial Services D", department: "Risk", docIntelligence: 52000, llmTokens: 3100000, cost: 1680 },
];

const infrastructureStatus = [
  { service: "Document Ingestion Pipeline", status: "healthy", uptime: 99.9, latency: 120 },
  { service: "Table Extraction Microservice", status: "healthy", uptime: 99.7, latency: 450 },
  { service: "Paragraph Extraction Service", status: "healthy", uptime: 99.8, latency: 280 },
  { service: "Contract Search API", status: "degraded", uptime: 98.5, latency: 850 },
  { service: "Dashboard Analytics Engine", status: "healthy", uptime: 99.6, latency: 320 },
  { service: "Notification Service", status: "healthy", uptime: 99.9, latency: 50 },
];

const clientList = [
  { name: "Healthcare Provider A", projects: 8, accuracy: 96.2, documents: 45000, status: "active" },
  { name: "IT Vendor B", projects: 5, accuracy: 93.8, documents: 32000, status: "active" },
  { name: "PBM C", projects: 6, accuracy: 94.5, documents: 28000, status: "active" },
  { name: "Financial Services D", projects: 12, accuracy: 95.1, documents: 52000, status: "active" },
  { name: "Legal & Compliance E", projects: 3, accuracy: 92.3, documents: 15000, status: "inactive" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Wizard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Global Dashboard</h1>
              <p className="text-muted-foreground mt-1">Platform Administration & Monitoring</p>
            </div>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <Server className="w-4 h-4 mr-2" />
            Admin Only
          </Badge>
        </motion.div>

        {/* Platform Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformMetrics.totalProjects}</div>
                <p className="text-xs text-muted-foreground">
                  {platformMetrics.activeProjects} active
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Extraction Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformMetrics.averageAccuracy}%</div>
                <p className="text-xs text-muted-foreground">
                  Across all LOBs
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{platformMetrics.totalClients}</div>
                <p className="text-xs text-muted-foreground">
                  Active LOBs
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(platformMetrics.totalDocuments / 1000).toFixed(0)}K</div>
                <p className="text-xs text-muted-foreground">
                  Processed
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="billing" className="space-y-4">
          <TabsList>
            <TabsTrigger value="billing">Billing & Token Usage</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure Monitoring</TabsTrigger>
            <TabsTrigger value="clients">Client Management</TabsTrigger>
          </TabsList>

          {/* Billing & Token Usage */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Azure Document Intelligence & LLM Token Usage</CardTitle>
                <CardDescription>Resource consumption per client/department</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Doc Intelligence Calls</TableHead>
                      <TableHead>LLM Tokens</TableHead>
                      <TableHead>Estimated Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.client}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{(row.docIntelligence / 1000).toFixed(0)}K</TableCell>
                        <TableCell>{(row.llmTokens / 1000000).toFixed(2)}M</TableCell>
                        <TableCell>${row.cost.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Monitoring */}
          <TabsContent value="infrastructure" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline & Microservice Status</CardTitle>
                <CardDescription>Real-time monitoring of automated pipelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infrastructureStatus.map((service, index) => (
                    <motion.div
                      key={service.service}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-card"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-lg ${
                          service.status === "healthy" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}>
                          {service.status === "healthy" ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <AlertTriangle className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{service.service}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              {service.uptime}% uptime
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {service.latency}ms latency
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={service.status === "healthy" ? "default" : "secondary"}>
                        {service.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Client Management */}
          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client & LOB Overview</CardTitle>
                <CardDescription>High-level KPIs for each client</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientList.map((client, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.projects}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={client.accuracy} className="w-20 h-2" />
                            <span className="text-sm">{client.accuracy}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{(client.documents / 1000).toFixed(0)}K</TableCell>
                        <TableCell>
                          <Badge variant={client.status === "active" ? "default" : "secondary"}>
                            {client.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Global Feedback/Bug Report */}
      <FeedbackBugReport 
        currentScreen="Admin Dashboard"
        currentFeature="Platform Administration"
      />
    </div>
  );
}

