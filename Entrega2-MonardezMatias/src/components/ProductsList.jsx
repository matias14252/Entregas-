import ProductCard from './ProductCard';

export default function ProductsList({ products, addToCart }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'row', gap: 10, width: '100%', overflowX: 'auto' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </section>
  );
}