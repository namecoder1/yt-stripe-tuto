import { products, subscriptions } from "@/data";
import Product from "@/components/blocks/product";
import Subscription from "@/components/blocks/subscription";
import { user } from "@/data";

const ShopPage = () => {
  return (
    <section className="mx-auto max-w-7xl mb-20 mt-10 px-4">
      <div id="subscriptions">
        <h1 className="text-3xl font-bold mb-2">Abbonamenti</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.map((subscription) => (
            <Subscription
              key={subscription.id}
              id={subscription.id}
              title={subscription.title}
              description={subscription.description}
              price={subscription.price}
              time={subscription.time}
              textColor={subscription.textColor}
              icon={subscription.icon}
              image=""
              user={user}
              priceId={subscription.priceId}
              type="subscription"
            />
          ))}
        </ul>
      </div>

      <div id="products" className="mt-10">
        <h1 className="text-3xl font-bold mb-2">Prodotti</h1>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
              type='one-off'
            />
          ))}
        </ul>
      </div>
    </section>
  );
}


export default ShopPage;