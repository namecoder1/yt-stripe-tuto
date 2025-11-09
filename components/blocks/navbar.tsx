import Cart from "../ui/cart"
import { user } from "@/data"
import Link from "next/link"
import { ModeToggle } from "../ui/mode-toggle"

const Navbar = () => {
  return (
    <header className="border border-t-0 z-50 bg-card xl:rounded-b-xl sticky top-0">
      <nav className=" flex items-center justify-between py-4 px-4 max-w-7xl mx-auto">
        <h1 className="flex items-center gap-1.5 text-xl font-light tracking-tighter">Stripe + Next.js Tutorial</h1>
        <ul className="items-center hidden sm:flex gap-4">
          <li className="text-muted-foreground hover:text-foreground"><Link href='/'>Home</Link></li>
          <li className="text-muted-foreground hover:text-foreground"><Link href='/shop'>Shop</Link></li>
        </ul>
        <div className="flex items-center gap-2">
          <Cart user={user} />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Navbar