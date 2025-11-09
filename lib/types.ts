/**
 * Hardcoded product props for demo purposes
 */
export type ProductProps = {
  id: number | string
  type: 'one-off' | 'subscription'
  title: string
  description: string
  price: number
  image: string
  priceId?: string
}

/**
 * Hardcoded user props for demo purposes
 */
export type UserProps = {
  email: string;
  name: string;
  image: string; 
}

/**
 * Hardcoded subscription props for demo purposes
 */
export interface SubscriptionProps extends ProductProps {
  time: number
  textColor: string
  icon: string
  user: UserProps
}