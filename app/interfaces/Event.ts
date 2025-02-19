export interface UserData {
  name: string
  lastname: string
  email: string
  document: string
  documentType: string
  phone: string
  sexo: string
  id: string
}
export interface PosData {
  numberPost: string
  typeCard: string
  card: string
}
export interface Event {
  id: number
  organizerId: number
  name: string
  description: string
  information: string
  visanetProductId: string
  price: number
  currency: string
  frequency: string
  status: number
  metadata: string
  dateStart: string
  dateEnd: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  type: string
}

export interface Plan {
  name: string
  lastName: string
  documentType: string
  document: string
  email: string
  subscriptionPlanId: number
}
