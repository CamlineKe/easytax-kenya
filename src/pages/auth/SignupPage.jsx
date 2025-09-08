import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Shield, 
  Eye, 
  EyeOff,
  Building,
  User,
  CreditCard,
  CheckCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Tax Information
    kraPin: '',
    businessType: '',
    vatRegistered: false,
    businessLocation: '',
    
    // Step 3: Plan Selection
    selectedPlan: 'basic',
    paymentMethod: '',
    agreeToTerms: false
  });

  const steps = [
    { 
      id: 1, 
      title: 'Basic Information', 
      icon: <User className="h-5 w-5" />,
      description: 'Tell us about your business'
    },
    { 
      id: 2, 
      title: 'Tax Information', 
      icon: <Building className="h-5 w-5" />,
      description: 'Verify your tax details'
    },
    { 
      id: 3, 
      title: 'Choose Plan', 
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Select your subscription'
    }
  ];

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'Limited Company',
    'NGO/Non-Profit',
    'Cooperative',
    'Other'
  ];

  const counties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale',
    'Garissa', 'Kakamega', 'Machakos', 'Meru', 'Nyeri', 'Kericho', 'Embu', 'Migori',
    'Homa Bay', 'Naivasha', 'Voi', 'Wajir', 'Bungoma', 'Busia', 'Webuye', 'Mumias'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^(\+254|0)[17]\d{8}$/.test(formData.phone)) newErrors.phone = 'Invalid Kenyan phone number';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (step === 2) {
      if (!formData.kraPin.trim()) newErrors.kraPin = 'KRA PIN is required';
      else if (!/^[A-Z]\d{9}[A-Z]$/.test(formData.kraPin)) newErrors.kraPin = 'Invalid KRA PIN format';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      if (!formData.businessLocation) newErrors.businessLocation = 'Business location is required';
    }

    if (step === 3) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Signup successful:', formData);
      // Redirect to dashboard or success page
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back to Home Link */}
        <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
          <Link to="/" className="flex items-center space-x-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > step.id 
                      ? 'bg-primary border-primary text-white' 
                      : currentStep === step.id
                      ? 'border-primary text-primary'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.icon}
                  </div>
                  <div className="hidden sm:block">
                    <div className="font-medium text-sm">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        {/* Main Card */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="mx-auto flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ET</span>
              </div>
              <span className="text-2xl font-bold text-foreground">EasyTax Kenya</span>
            </div>

            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
              <CardDescription className="text-base">
                {steps[currentStep - 1].description}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {errors.submit && (
              <Alert variant="destructive">
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="Enter your business name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className={errors.businessName ? 'border-red-500' : ''}
                    />
                    {errors.businessName && (
                      <p className="text-sm text-red-500">{errors.businessName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner's Full Name *</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      placeholder="Enter your full name"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className={errors.ownerName ? 'border-red-500' : ''}
                    />
                    {errors.ownerName && (
                      <p className="text-sm text-red-500">{errors.ownerName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+254 or 07XX XXX XXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pr-12 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              passwordStrength < 50 ? 'bg-red-500' : 
                              passwordStrength < 75 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                    </div>
                  )}
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Tax Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">KRA PIN Verification</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    We'll verify your KRA PIN using official KRA APIs to ensure compliance.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kraPin">KRA PIN *</Label>
                  <Input
                    id="kraPin"
                    name="kraPin"
                    placeholder="A123456789Z"
                    value={formData.kraPin}
                    onChange={handleInputChange}
                    className={`uppercase ${errors.kraPin ? 'border-red-500' : ''}`}
                    maxLength={11}
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: Letter + 9 digits + Letter (e.g., A123456789Z)
                  </p>
                  {errors.kraPin && (
                    <p className="text-sm text-red-500">{errors.kraPin}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select 
                      value={formData.businessType} 
                      onValueChange={(value) => handleSelectChange('businessType', value)}
                    >
                      <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <p className="text-sm text-red-500">{errors.businessType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessLocation">Business Location *</Label>
                    <Select 
                      value={formData.businessLocation} 
                      onValueChange={(value) => handleSelectChange('businessLocation', value)}
                    >
                      <SelectTrigger className={errors.businessLocation ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent>
                        {counties.map((county) => (
                          <SelectItem key={county} value={county}>{county}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessLocation && (
                      <p className="text-sm text-red-500">{errors.businessLocation}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vatRegistered"
                    name="vatRegistered"
                    checked={formData.vatRegistered}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, vatRegistered: checked }))
                    }
                  />
                  <Label htmlFor="vatRegistered" className="text-sm">
                    My business is VAT registered
                  </Label>
                </div>
              </div>
            )}

            {/* Step 3: Plan Selection */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Plan */}
                  <Card 
                    className={`cursor-pointer transition-all ${
                      formData.selectedPlan === 'basic' 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, selectedPlan: 'basic' }))}
                  >
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">Basic</CardTitle>
                      <div className="text-2xl font-bold">KSh 500</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>NIL return filing</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Tax deadline reminders</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Basic dashboard</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Email support</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Premium Plan */}
                  <Card 
                    className={`cursor-pointer transition-all relative ${
                      formData.selectedPlan === 'premium' 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, selectedPlan: 'premium' }))}
                  >
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">Premium</CardTitle>
                      <div className="text-2xl font-bold">KSh 1,500</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Everything in Basic</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>M-Pesa integration</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>eTIMS validation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Advanced analytics</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Free Trial:</strong> Start with a 14-day free trial. No credit card required.
                  </p>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, agreeToTerms: checked }))
                    }
                    className={errors.agreeToTerms ? 'border-red-500' : ''}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;

