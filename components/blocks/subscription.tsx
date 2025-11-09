'use client'

import { cn, formatMonths } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { ProductProps, SubscriptionProps } from "@/lib/types"
import { ShoppingCart } from "lucide-react"

const Subscription = ({
  id,
  title,
  type,
  description,
  price,
  priceId,
  time,
  textColor,
  icon,
  user,
}: SubscriptionProps) => {

  const handleCheckout = async ({ mode, item }: { mode: 'one-off' | 'subscription'; item: ProductProps }) => {
    try {
      const res = await fetch('api/stripe/create-checkout/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: [item], user, type: mode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Errore nel checkout');
      }
    } catch (err) {
      toast.error('Errore nel checkout');
    }
  };

  return (
    <Card className="border hover:scale-102 transition-transform duration-200 ease-in-out cursor-pointer">
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <div className={cn(`${icon} py-1 px-1.5 border w-fit rounded-sm`)} >
            <span>{title.split(' ')[0][0] + title.split(' ')[1][0]}</span>
          </div>
          <span className={cn(`${textColor}`)}>
            {title}
          </span>
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex items-end gap-1">
          <span className="text-xl font-semibold">
            €{(price / 100).toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground pb-0.5">ogni {formatMonths(time)}</span>
        </p>
        <Button onClick={() => handleCheckout({ mode: 'subscription', item: { id, title, type, description, price, image: '', priceId,  } })} className="cursor-pointer mt-2 ml-auto">
          <ShoppingCart />
          Abbonati ora
        </Button>
      </CardContent>
    </Card>
  )
}

export default Subscription