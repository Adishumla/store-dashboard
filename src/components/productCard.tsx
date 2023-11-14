import { Product } from "@/lib/type";

export default function ProductCard({ product }: { product: Product }) {
  console.log(product);
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image section */}
      {product.images && product.images.length > 0 && (
        <img
          className="w-full h-56 object-cover object-center"
          src={product.images[0].imageUrl}
          alt={product.images[0].altText}
        />
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>

        {/* Price section */}
        <div className="flex items-baseline mt-2">
          <span className="text-gray-800 font-bold text-xl">
            {product.price}
          </span>
          <span className="ml-1 text-sm text-gray-600">SEK</span>
        </div>

        {/* Variations section */}
        {product.variations && product.variations.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-800">Variations:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              {product.variations.map((variation) => (
                <li key={variation.id}>
                  Size: {variation.size}, Color: {variation.color}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
