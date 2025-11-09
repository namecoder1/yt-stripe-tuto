import Link from "next/link";
import { navigation } from "@/data";

const Footer = () => {
  return (
    <footer className="bg-background/50 border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => (
            <Link key={item.name} target='_blank' href={item.href} className="text-muted-foreground hover:text-foreground duration-200 transition-colors">
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm/6 text-muted-foreground md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} Stripe + Next.js Tutorial. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer;