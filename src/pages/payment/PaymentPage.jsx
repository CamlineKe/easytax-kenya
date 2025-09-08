import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Star,
  Shield,
  Zap,
  Users,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Switch } from '../../components/ui/switch';

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState('subscription');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    mpesaNumber: '',
    amount: '',
    taxPeriod: ''
  });

  const [currentSubscription] = useState({
    plan: 'Premium',
    status: 'active',
    nextBilling: '2024-10-15',
    amount: 1500,
    cycle: 'monthly'
  });

  const [billingHistory] = useState([
    {
      id: 1,
      date: '2024-09-15',
      description: 'Premium Plan - Monthly',
      amount: 1500,
      status: 'paid',
      method: 'M-Pesa',
      reference: 'MP240915001'
    },
    {
      id: 2,
      date: '2024-08-15',
      description: 'Premium Plan - Monthly',
      amount: 1500,
      status: 'paid',
      method: 'M-Pesa',
      reference: 'MP240815002'
    },
    {
      id: 3,
      date: '2024-07-15',
      description: 'Basic Plan - Monthly',
      amount: 500,
      status: 'paid',
      method: 'M-Pesa',
      reference: 'MP240715003'
    }
  ]);

  const [taxPayments] = useState([
    {
      id: 1,
      date: '2024-09-20',
      type: 'VAT Payment',
      period: 'August 2024',
      amount: 12500,
      status: 'completed',
      reference: 'ETK-VAT-240920-001'
    },
    {
      id: 2,
      date: '2024-08-09',
      type: 'PAYE Payment',
      period: 'July 2024',
      amount: 8750,
      status: 'completed',
      reference: 'ETK-PAYE-240809-002'
    }
  ]);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 500,
      yearlyPrice: 5000,
      description: 'Perfect for small businesses with basic tax needs',
      features: [
        'NIL return filing',
        'Tax deadline reminders',
        'Basic dashboard',
        'Email support',
        'Up to 10 filings per month'
      ],
      limitations: [
        'No M-Pesa integration',
        'No eTIMS validation',
        'Basic reporting only'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: 1500,
      yearlyPrice: 15000,
      description: 'Complete tax solution for growing businesses',
      features: [
        'Everything in Basic',
        'M-Pesa payment integration',
        'eTIMS invoice validation',
        'Advanced analytics & reporting',
        'Priority support',
        'Unlimited filings',
        'Document storage',
        'API access'
      ],
      popular: true
    }
  ];

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      icon: <Smartphone className="h-6 w-6 text-green-600" />,
      description: 'Pay instantly with your mobile money',
      fees: 'No additional fees'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Building className="h-6 w-6 text-blue-600" />,
      description: 'Direct bank transfer',
      fees: 'Bank charges may apply'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-6 w-6 text-purple-600" />,
      description: 'Pay with Visa or Mastercard',
      fees: '2.5% processing fee',
      comingSoon: true
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubscriptionPayment = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Subscription payment successful! Your plan has been updated.');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaxPayment = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Tax payment successful! Reference: ETK-TAX-' + Date.now());
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const calculateSavings = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return 0;
    
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlyTotal = plan.yearlyPrice;
    return monthlyTotal - yearlyTotal;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ET</span>
              </div>
              <span className="text-xl font-bold text-foreground">EasyTax Kenya</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payments & Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription, make tax payments, and view billing history
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="tax-payment">Tax Payment</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
          </TabsList>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-8">
            {/* Current Subscription Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Current Subscription</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Plan</div>
                    <div className="text-lg font-semibold">{currentSubscription.plan}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(currentSubscription.status)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Next Billing</div>
                    <div className="text-lg font-semibold">{formatDate(currentSubscription.nextBilling)}</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Your subscription is active</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Next payment of {formatCurrency(currentSubscription.amount)} due on {formatDate(currentSubscription.nextBilling)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Plan Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Plan</CardTitle>
                <CardDescription>
                  Upgrade or downgrade your subscription at any time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Billing Cycle Toggle */}
                <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <span className={`text-sm ${billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}`}>
                    Monthly
                  </span>
                  <Switch
                    checked={billingCycle === 'yearly'}
                    onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                  />
                  <span className={`text-sm ${billingCycle === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}`}>
                    Yearly
                  </span>
                  {billingCycle === 'yearly' && (
                    <Badge className="bg-green-100 text-green-800 ml-2">
                      Save {formatCurrency(calculateSavings())}
                    </Badge>
                  )}
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.id}
                      className={`cursor-pointer transition-all border-2 ${
                        selectedPlan === plan.id 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'hover:border-primary/50'
                      } ${plan.popular ? 'relative' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                          Most Popular
                        </Badge>
                      )}
                      
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">
                            {formatCurrency(billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            per {billingCycle === 'yearly' ? 'year' : 'month'}
                          </div>
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {plan.limitations && (
                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2">Not included:</p>
                            <ul className="space-y-1">
                              {plan.limitations.map((limitation, index) => (
                                <li key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                                  <span>{limitation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <Card 
                        key={method.id}
                        className={`cursor-pointer transition-all ${
                          paymentMethod === method.id 
                            ? 'border-primary ring-2 ring-primary/20' 
                            : 'hover:border-primary/50'
                        } ${method.comingSoon ? 'opacity-50' : ''}`}
                        onClick={() => !method.comingSoon && setPaymentMethod(method.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            {method.icon}
                            <div className="flex-1">
                              <div className="font-medium flex items-center space-x-2">
                                <span>{method.name}</span>
                                {method.comingSoon && (
                                  <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">{method.description}</div>
                              <div className="text-xs text-muted-foreground">{method.fees}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* M-Pesa Payment Form */}
                {paymentMethod === 'mpesa' && (
                  <div className="space-y-4 p-4 border rounded-lg">
                    <h4 className="font-medium">M-Pesa Payment Details</h4>
                    <div className="space-y-2">
                      <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                      <Input
                        id="mpesaNumber"
                        name="mpesaNumber"
                        placeholder="254XXXXXXXXX"
                        value={formData.mpesaNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <Alert>
                      <Smartphone className="h-4 w-4" />
                      <AlertDescription>
                        You will receive an M-Pesa prompt on your phone to complete the payment.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span className="font-medium">
                        {plans.find(p => p.id === selectedPlan)?.name} ({billingCycle})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="font-medium">
                        {formatCurrency(
                          billingCycle === 'yearly' 
                            ? plans.find(p => p.id === selectedPlan)?.yearlyPrice 
                            : plans.find(p => p.id === selectedPlan)?.monthlyPrice
                        )}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings:</span>
                        <span className="font-medium">{formatCurrency(calculateSavings())}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>
                        {formatCurrency(
                          billingCycle === 'yearly' 
                            ? plans.find(p => p.id === selectedPlan)?.yearlyPrice 
                            : plans.find(p => p.id === selectedPlan)?.monthlyPrice
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleSubscriptionPayment}
                  disabled={isLoading || (paymentMethod === 'mpesa' && !formData.mpesaNumber)}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    'Update Subscription'
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tax Payment Tab */}
          <TabsContent value="tax-payment" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Tax Payment</span>
                </CardTitle>
                <CardDescription>
                  Pay your tax obligations quickly and securely
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Make sure you have filed your tax return before making a payment. 
                    Payments are linked to specific tax periods and filing references.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="taxPeriod">Tax Period</Label>
                    <Select 
                      value={formData.taxPeriod} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, taxPeriod: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sep-2024">September 2024</SelectItem>
                        <SelectItem value="aug-2024">August 2024</SelectItem>
                        <SelectItem value="jul-2024">July 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (KES)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
                  <Input
                    id="mpesaNumber"
                    name="mpesaNumber"
                    placeholder="254XXXXXXXXX"
                    value={formData.mpesaNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Your payment will be processed securely through M-Pesa and confirmed with KRA automatically.
                  </AlertDescription>
                </Alert>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleTaxPayment}
                  disabled={isLoading || !formData.amount || !formData.mpesaNumber || !formData.taxPeriod}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    `Pay ${formData.amount ? formatCurrency(formData.amount) : 'Tax'}`
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Recent Tax Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tax Payments</CardTitle>
                <CardDescription>Your latest tax payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{formatDate(payment.date)}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.period}</TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
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
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="history" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View all your subscription payments and invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{formatDate(bill.date)}</TableCell>
                        <TableCell>{bill.description}</TableCell>
                        <TableCell>{formatCurrency(bill.amount)}</TableCell>
                        <TableCell>{bill.method}</TableCell>
                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                        <TableCell className="font-mono text-sm">{bill.reference}</TableCell>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentPage;

