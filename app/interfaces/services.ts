export interface Plan {
  name: string
  lastName: string
  documentType: string
  document: string
  email: string
  subscriptionPlanId: number
}

export interface PaymentData {
  membershipId: number
  paymentMethod: string
  paymentTransactionId?: string | null // Puede ser string o null, pero es opcional
}
