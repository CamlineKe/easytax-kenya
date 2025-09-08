import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell,
  Calendar,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Eye,
  Plus,
  ArrowRight,
  BarChart3,
  Shield,
  Smartphone,
  HelpCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const DashboardPage = () => {
  const [user] = useState({
    name: 'Sarah Wanjiku',
    businessName: 'Mama Sarah\'s Boutique',
    plan: 'Premium',
    kraPin: 'A123456789Z'
  });

  const [complianceStatus] = useState({
    status: 'compliant', // compliant, warning, non_compliant
    score: 95,
    nextDeadline: '2024-10-20',
    daysUntilDeadline: 15
  });

  const [quickStats] = useState({
    pendingReturns: 0,
    completedThisYear: 8,
    totalSaved: 45000,
    lastFiling: '2024-09-15'
  });

  const [upcomingDeadlines] = useState([
    {
      id: 1,
      type: 'VAT Return',
      dueDate: '2024-10-20',
      status: 'pending',
      description: 'Monthly VAT return for September 2024'
    },
    {
      id: 2,
      type: 'PAYE Return',
      dueDate: '2024-11-09',
      status: 'upcoming',
      description: 'Monthly PAYE return for October 2024'
    },
    {
      id: 3,
      type: 'Income Tax',
      dueDate: '2024-12-31',
      status: 'upcoming',
      description: 'Annual income tax return for 2024'
    }
  ]);

  const [recentFilings] = useState([
    {
      id: 1,
      type: 'NIL Return',
      date: '2024-09-15',
      status: 'approved',
      reference: 'ETK-NIL-240915-001',
      amount: 0
    },
    {
      id: 2,
      type: 'VAT Return',
      date: '2024-08-20',
      status: 'approved',
      reference: 'ETK-VAT-240820-002',
      amount: 12500
    },
    {
      id: 3,
      type: 'NIL Return',
      date: '2024-08-15',
      status: 'approved',
      reference: 'ETK-NIL-240815-003',
      amount: 0
    },
    {
      id: 4,
      type: 'PAYE Return',
      date: '2024-07-09',
      status: 'approved',
      reference: 'ETK-PAYE-240709-004',
      amount: 8750
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'non_compliant':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getFilingStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ET</span>
                </div>
                <span className="text-xl font-bold text-foreground">EasyTax Kenya</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.businessName}</div>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's your tax compliance overview for {user.businessName}
          </p>
        </div>

        {/* Compliance Status Alert */}
        <div className="mb-8">
          <Alert className={`border-2 ${getStatusColor(complianceStatus.status)}`}>
            <div className="flex items-center space-x-3">
              {complianceStatus.status === 'compliant' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : complianceStatus.status === 'warning' ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <div className="flex-1">
                <AlertDescription className="text-base font-medium">
                  {complianceStatus.status === 'compliant' 
                    ? 'Your business is fully compliant with KRA requirements'
                    : complianceStatus.status === 'warning'
                    ? 'Action required: You have upcoming tax deadlines'
                    : 'Urgent: You have overdue tax obligations'
                  }
                </AlertDescription>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="text-sm">
                    Compliance Score: <span className="font-semibold">{complianceStatus.score}%</span>
                  </div>
                  <div className="text-sm">
                    Next Deadline: <span className="font-semibold">{complianceStatus.daysUntilDeadline} days</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          </Alert>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Returns</p>
                  <p className="text-3xl font-bold text-foreground">{quickStats.pendingReturns}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                All up to date
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed This Year</p>
                  <p className="text-3xl font-bold text-foreground">{quickStats.completedThisYear}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                Last: {formatDate(quickStats.lastFiling)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                  <p className="text-3xl font-bold text-foreground">45h</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <ArrowRight className="h-4 w-4 mr-1" />
                vs manual filing
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Next Deadline</p>
                  <p className="text-3xl font-bold text-foreground">{complianceStatus.daysUntilDeadline}</p>
                  <p className="text-sm text-muted-foreground">days</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(complianceStatus.nextDeadline)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Upcoming Deadlines</span>
                    </CardTitle>
                    <CardDescription>
                      Stay on top of your tax obligations
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => {
                    const daysUntil = getDaysUntilDeadline(deadline.dueDate);
                    return (
                      <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              daysUntil <= 7 ? 'bg-red-500' : daysUntil <= 14 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <div>
                              <h4 className="font-medium">{deadline.type}</h4>
                              <p className="text-sm text-muted-foreground">{deadline.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{formatDate(deadline.dueDate)}</div>
                          <div className={`text-xs ${
                            daysUntil <= 7 ? 'text-red-600' : daysUntil <= 14 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {daysUntil} days left
                          </div>
                        </div>
                        <Button size="sm" className="ml-4">
                          File Now
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Filings */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Recent Filings</span>
                    </CardTitle>
                    <CardDescription>
                      Your latest tax submissions
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentFilings.map((filing) => (
                      <TableRow key={filing.id}>
                        <TableCell className="font-medium">{filing.type}</TableCell>
                        <TableCell>{formatDate(filing.date)}</TableCell>
                        <TableCell className="font-mono text-sm">{filing.reference}</TableCell>
                        <TableCell>{formatCurrency(filing.amount)}</TableCell>
                        <TableCell>{getFilingStatusBadge(filing.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" size="lg" asChild>
                  <Link to="/tax-filing">
                    <Plus className="h-4 w-4 mr-2" />
                    File NIL Return
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Invoices
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg" asChild>
                  <Link to="/payment">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Make Payment
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" size="lg">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            {/* Plan Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{user.plan} Plan</span>
                  <Badge className="bg-primary text-white">Active</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Usage</span>
                    <span>8/10 filings</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>M-Pesa Integration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>eTIMS Validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Priority Support</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Help & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ & Guides
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

