import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  FileText,
  Calculator,
  Upload,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Eye,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';

const TaxFilingPage = () => {
  const [selectedFilingType, setSelectedFilingType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNilConfirmation, setShowNilConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    // Regular Return Data
    grossIncome: '',
    allowableDeductions: '',
    taxableIncome: '',
    taxDue: '',
    taxPaid: '',
    balanceDue: '',
    
    // Additional Information
    period: '',
    description: '',
    attachments: []
  });

  const [errors, setErrors] = useState({});

  const filingTypes = [
    {
      id: 'nil',
      title: 'NIL Return',
      description: 'For months with no taxable income or business activity',
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      features: ['One-click submission', 'Instant processing', 'No calculations needed'],
      recommended: true
    },
    {
      id: 'regular',
      title: 'Regular Return',
      description: 'For months with taxable income and business activity',
      icon: <Calculator className="h-8 w-8 text-green-600" />,
      features: ['Guided calculations', 'Document upload', 'Detailed reporting']
    },
    {
      id: 'vat',
      title: 'VAT Return',
      description: 'For VAT-registered businesses',
      icon: <Upload className="h-8 w-8 text-purple-600" />,
      features: ['eTIMS integration', 'Invoice validation', 'Automatic calculations'],
      premium: true
    }
  ];

  const taxPeriods = [
    'January 2024', 'February 2024', 'March 2024', 'April 2024',
    'May 2024', 'June 2024', 'July 2024', 'August 2024',
    'September 2024', 'October 2024', 'November 2024', 'December 2024'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Auto-calculate taxable income and tax due
    if (name === 'grossIncome' || name === 'allowableDeductions') {
      const gross = parseFloat(name === 'grossIncome' ? value : formData.grossIncome) || 0;
      const deductions = parseFloat(name === 'allowableDeductions' ? value : formData.allowableDeductions) || 0;
      const taxableIncome = Math.max(0, gross - deductions);
      
      // Simple tax calculation (30% for demonstration)
      const taxDue = taxableIncome * 0.3;
      
      setFormData(prev => ({
        ...prev,
        taxableIncome: taxableIncome.toString(),
        taxDue: taxDue.toString()
      }));
    }

    // Calculate balance due
    if (name === 'taxPaid' || name === 'taxDue') {
      const due = parseFloat(name === 'taxDue' ? value : formData.taxDue) || 0;
      const paid = parseFloat(name === 'taxPaid' ? value : formData.taxPaid) || 0;
      const balance = Math.max(0, due - paid);
      
      setFormData(prev => ({
        ...prev,
        balanceDue: balance.toString()
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateRegularReturn = () => {
    const newErrors = {};

    if (!formData.period) newErrors.period = 'Tax period is required';
    if (!formData.grossIncome) newErrors.grossIncome = 'Gross income is required';
    if (parseFloat(formData.grossIncome) < 0) newErrors.grossIncome = 'Gross income cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNilReturnSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('NIL Return submitted successfully! Reference: ETK-NIL-' + Date.now());
      setShowNilConfirmation(false);
    } catch (error) {
      alert('Error submitting NIL return. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegularReturnSubmit = async () => {
    if (!validateRegularReturn()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Show success message
      alert('Regular Return submitted successfully! Reference: ETK-REG-' + Date.now());
    } catch (error) {
      alert('Error submitting return. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount || 0);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Tax Filing</h1>
          <p className="text-muted-foreground">
            Choose your filing type and submit your tax returns with confidence
          </p>
        </div>

        {!selectedFilingType ? (
          /* Filing Type Selection */
          <div className="space-y-8">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Select the appropriate filing type based on your business activity for the tax period. 
                If you had no taxable income or business activity, choose NIL Return for quick submission.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filingTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50 relative ${
                    type.premium ? 'opacity-75' : ''
                  }`}
                  onClick={() => !type.premium && setSelectedFilingType(type.id)}
                >
                  {type.recommended && (
                    <Badge className="absolute -top-2 left-4 bg-primary text-white">
                      Recommended
                    </Badge>
                  )}
                  {type.premium && (
                    <Badge className="absolute -top-2 right-4 bg-orange-500 text-white">
                      Premium Only
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                      {type.icon}
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <CardDescription className="text-base">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full mt-6" 
                      disabled={type.premium}
                      onClick={() => setSelectedFilingType(type.id)}
                    >
                      {type.premium ? 'Upgrade Required' : 'Select'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Filing Forms */
          <div className="space-y-8">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => setSelectedFilingType('')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Change Filing Type</span>
            </Button>

            {/* NIL Return */}
            {selectedFilingType === 'nil' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>NIL Return Submission</span>
                  </CardTitle>
                  <CardDescription>
                    Submit a NIL return for periods with no taxable income or business activity
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Only submit a NIL return if you had no taxable income, 
                      sales, or business activity during the selected period.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nilPeriod">Tax Period *</Label>
                      <Select 
                        value={formData.period} 
                        onValueChange={(value) => handleSelectChange('period', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tax period" />
                        </SelectTrigger>
                        <SelectContent>
                          {taxPeriods.map((period) => (
                            <SelectItem key={period} value={period}>{period}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nilDescription">Additional Notes (Optional)</Label>
                      <Textarea
                        id="nilDescription"
                        name="description"
                        placeholder="Any additional information about this NIL return..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Return Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Period:</span>
                        <div className="font-medium">{formData.period || 'Not selected'}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <div className="font-medium">NIL Return</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Taxable Income:</span>
                        <div className="font-medium">{formatCurrency(0)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tax Due:</span>
                        <div className="font-medium">{formatCurrency(0)}</div>
                      </div>
                    </div>
                  </div>

                  <Dialog open={showNilConfirmation} onOpenChange={setShowNilConfirmation}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={!formData.period}
                      >
                        Submit NIL Return
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm NIL Return Submission</DialogTitle>
                        <DialogDescription>
                          Please confirm that you want to submit a NIL return for {formData.period}.
                          This declares that you had no taxable income or business activity during this period.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex space-x-4 pt-4">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setShowNilConfirmation(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="flex-1"
                          onClick={handleNilReturnSubmit}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Submitting...</span>
                            </div>
                          ) : (
                            'Confirm & Submit'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}

            {/* Regular Return */}
            {selectedFilingType === 'regular' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5" />
                    <span>Regular Tax Return</span>
                  </CardTitle>
                  <CardDescription>
                    Complete your tax return with income, deductions, and tax calculations
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="income" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="income">Income</TabsTrigger>
                      <TabsTrigger value="deductions">Deductions</TabsTrigger>
                      <TabsTrigger value="calculation">Calculation</TabsTrigger>
                      <TabsTrigger value="review">Review</TabsTrigger>
                    </TabsList>

                    {/* Income Tab */}
                    <TabsContent value="income" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="period">Tax Period *</Label>
                          <Select 
                            value={formData.period} 
                            onValueChange={(value) => handleSelectChange('period', value)}
                          >
                            <SelectTrigger className={errors.period ? 'border-red-500' : ''}>
                              <SelectValue placeholder="Select tax period" />
                            </SelectTrigger>
                            <SelectContent>
                              {taxPeriods.map((period) => (
                                <SelectItem key={period} value={period}>{period}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.period && (
                            <p className="text-sm text-red-500">{errors.period}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="grossIncome">Gross Income (KES) *</Label>
                          <Input
                            id="grossIncome"
                            name="grossIncome"
                            type="number"
                            placeholder="0.00"
                            value={formData.grossIncome}
                            onChange={handleInputChange}
                            className={errors.grossIncome ? 'border-red-500' : ''}
                          />
                          {errors.grossIncome && (
                            <p className="text-sm text-red-500">{errors.grossIncome}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Total income from all sources before deductions
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Deductions Tab */}
                    <TabsContent value="deductions" className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="allowableDeductions">Allowable Deductions (KES)</Label>
                          <Input
                            id="allowableDeductions"
                            name="allowableDeductions"
                            type="number"
                            placeholder="0.00"
                            value={formData.allowableDeductions}
                            onChange={handleInputChange}
                          />
                          <p className="text-xs text-muted-foreground">
                            Business expenses, professional fees, and other allowable deductions
                          </p>
                        </div>

                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Common deductions include: business rent, utilities, professional fees, 
                            equipment depreciation, and business travel expenses.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </TabsContent>

                    {/* Calculation Tab */}
                    <TabsContent value="calculation" className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="font-semibold mb-4">Tax Calculation</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Gross Income:</span>
                            <span className="font-medium">{formatCurrency(formData.grossIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Less: Allowable Deductions:</span>
                            <span className="font-medium">({formatCurrency(formData.allowableDeductions)})</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold">
                            <span>Taxable Income:</span>
                            <span>{formatCurrency(formData.taxableIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax Due (30%):</span>
                            <span className="font-medium">{formatCurrency(formData.taxDue)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="taxPaid">Tax Already Paid (KES)</Label>
                        <Input
                          id="taxPaid"
                          name="taxPaid"
                          type="number"
                          placeholder="0.00"
                          value={formData.taxPaid}
                          onChange={handleInputChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Amount of tax already paid through withholding or advance payments
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Balance Due:</span>
                          <span className={`text-lg font-bold ${
                            parseFloat(formData.balanceDue) > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {formatCurrency(formData.balanceDue)}
                          </span>
                        </div>
                        {parseFloat(formData.balanceDue) > 0 && (
                          <p className="text-sm text-blue-700 mt-2">
                            You have a balance due. You can pay this amount after submitting your return.
                          </p>
                        )}
                      </div>
                    </TabsContent>

                    {/* Review Tab */}
                    <TabsContent value="review" className="space-y-6">
                      <div className="space-y-6">
                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Please review all information carefully before submitting your return.
                          </AlertDescription>
                        </Alert>

                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="font-semibold mb-4">Return Summary</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Period:</span>
                              <div className="font-medium">{formData.period}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Type:</span>
                              <div className="font-medium">Regular Return</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Gross Income:</span>
                              <div className="font-medium">{formatCurrency(formData.grossIncome)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Deductions:</span>
                              <div className="font-medium">{formatCurrency(formData.allowableDeductions)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Taxable Income:</span>
                              <div className="font-medium">{formatCurrency(formData.taxableIncome)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Tax Due:</span>
                              <div className="font-medium">{formatCurrency(formData.taxDue)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Tax Paid:</span>
                              <div className="font-medium">{formatCurrency(formData.taxPaid)}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Balance Due:</span>
                              <div className={`font-medium ${
                                parseFloat(formData.balanceDue) > 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {formatCurrency(formData.balanceDue)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={handleRegularReturnSubmit}
                          disabled={isLoading || !formData.period || !formData.grossIncome}
                        >
                          {isLoading ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Submitting Return...</span>
                            </div>
                          ) : (
                            'Submit Tax Return'
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxFilingPage;

