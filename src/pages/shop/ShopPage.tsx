import { Product } from '@/model/product';
import { useEffect, useState } from 'react';
import { pb } from '../../pocketbase';
import { ProductCard } from './components/ProductCard';
import { ServerError, Spinner } from '../../shared';

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setPending(true)
    pb.collection('products').getList<Product>()
      .then(res => {
        setProducts(res.items)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setPending(false)
      })
}, [])

function addToCart(p: Partial<Product>) {
  console.log(p)
}

return (
  <div>
    <h1 className="title">SHOP</h1>
    {pending && <Spinner />}
    {error && <ServerError />}

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
      {
        products.map(p => {
          return (
            <div key={p.id}>
              <ProductCard product={p} onAddToCart={() => addToCart(p)} />
            </div>
          )
        })
      }
    </div>
  </div>
)
}
