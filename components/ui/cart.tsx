'use client';

import { useCart } from '@/hooks/useCart'
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { Badge } from './badge';
import { Separator } from './separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Cart = ({
  user
}: { 
  user: {
    email: string;
    name: string;
    image: string;
  }
 }) => {
  const { items, removeItem, clearCart, getItemCount, getTotalPrice, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemCount = getItemCount();
  const totalPrice = getTotalPrice();

  const handleCheckout = async ({ mode}: { mode: 'one-off' | 'subscription' }) => {
    try {
      const res = await fetch('api/stripe/create-checkout/one-off', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, user, type: 'one-off' }),
      })
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Errore nel checkout')
      }
    } catch (err) {
      toast.error('Errore nel checkout')
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {isClient && itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrello
          </SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Il tuo carrello è vuoto"
              : `${itemCount} ${itemCount === 1 ? "prodotto" : "prodotti"} nel carrello`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-20" />
              <p>Nessun prodotto nel carrello</p>
              <p className="text-sm mt-2">Aggiungi dei prodotti per iniziare!</p>
            </div>
          ) : (
            <div className="space-y-4 px-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-lg border bg-card">
                  {typeof item.id === 'string' ? (
                    <div className={cn("w-20 rounded-sm flex items-center justify-center font-bold text-3xl border")}>
                      <p>{item.title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase()}</p>
                    </div>
                  ) : (
                    <div className="relative w-20 rounded-sm border overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt="Image Alt"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-lg font-bold mt-1">€{(item.price / 100).toFixed(2)}</p>
                    {item.type !== 'subscription' && (
                      <div className="flex items-center gap-1 mt-2">
                        <button
                          className="p-1.5 border rounded-lg"
                          onClick={
                            () => {
                              updateQuantity(item.id, item.quantity + 1)
                              toast.success('Quantità aggiornata')
                            }
                          }
                        >
                          <Plus size={16} />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="p-1.5 border rounded-lg"
                          onClick={() => {
                            updateQuantity(item.id, item.quantity - 1)
                            toast.success('Quantità aggiornata')
                          }}
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 border rounded-lg self-start ml-auto mt-1 bg-destructive/90 border-destructive"
                  >
                    <X size={14} color='white' />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4 px-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Totale</span>
                <span className="text-2xl font-bold">€{(totalPrice / 100).toFixed(2)}</span>
              </div>

              <SheetFooter className="flex-row gap-2 pt-0 px-0">
                <Button
                  onClick={clearCart}
                  variant="destructive"
                  size="lg"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Svuota
                </Button>
                <Button onClick={() => handleCheckout({ mode: 'one-off' })} className='flex-1' size="lg">
                  Procedi al checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default Cart