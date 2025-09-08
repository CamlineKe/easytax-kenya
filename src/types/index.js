// User and Authentication Types
export const UserRole = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  ADMIN: 'admin'
};

export const AuthStatus = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated'
};

// Tax Filing Types
export const FilingType = {
  NIL_RETURN: 'nil_return',
  REGULAR_RETURN: 'regular_return',
  VAT_RETURN: 'vat_return'
};

export const FilingStatus = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const ComplianceStatus = {
  COMPLIANT: 'compliant',
  WARNING: 'warning',
  NON_COMPLIANT: 'non_compliant'
};

// Payment Types
export const PaymentMethod = {
  MPESA: 'mpesa',
  BANK_TRANSFER: 'bank_transfer',
  CARD: 'card'
};

export const PaymentStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Subscription Types
export const SubscriptionPlan = {
  BASIC: 'basic',
  PREMIUM: 'premium'
};

export const SubscriptionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired'
};

// API Response Types
export const ApiStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
};

