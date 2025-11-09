'use client'

import Image from "next/image"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"
import { ProductProps } from "@/lib/types"

const Product = ({
  id,
  title,
  type,
  description,
  price,
  image
}: ProductProps) => {
  const { addItem, removeItem, isInCart } = useCart()
  const inCart = isInCart(id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (inCart) {
      removeItem(id)
    } else {
      addItem({
        id: id,
        type: type,
        title: title,
        description: description,
        price: price || 0,
        image: image,
      })
      toast.success('Aggiunto al carrello')
    }
  }

  return (
    <Card className="hover:scale-102 transition-transform duration-200 ease-in-out cursor-pointer py-0 gap-0">
      <Image src={image} alt={title} className="h-96 w-full object-cover rounded-lg rounded-b-none" width={200} height={200} />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
        <div className="flex flex-col items-start gap-1 mt-4">
          <p className="text-lg font-semibold">€{(price / 100).toFixed(2)}</p>
          <Button onClick={handleAddToCart} className="cursor-pointer">
            <ShoppingCart />
            Aggiungi al carrello
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Product