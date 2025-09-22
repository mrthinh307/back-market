"use client";

import { useEffect, useState } from "react";

type FavItem = {
  id: string;
  name: string;
  price: number;
  thumbnailUrl?: string;
};

const mockFavourites: FavItem[] = [
  {
    id: "p1",
    name: "iPhone 13 Pro 256GB (Refurbished)",
    price: 589,
    thumbnailUrl: "",
  },
  {
    id: "p2",
    name: "Samsung Galaxy S22 128GB",
    price: 399,
    thumbnailUrl: "",
  },
];

export default function FavouritesPage() {
  const [items, setItems] = useState<FavItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    const t = setTimeout(() => {
      setItems(mockFavourites); // đổi thành [] để test empty state
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <div className="animate-pulse h-24 bg-gray-100 rounded-xl" />;

  if (!items.length)
    return <p className="text-gray-600">You haven&apos;t added any favourites yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Favourites</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border bg-white p-3 shadow-sm hover:shadow"
          >
            <div className="aspect-square rounded-lg bg-gray-100 mb-3 overflow-hidden flex items-center justify-center">
              {p.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.thumbnailUrl}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>
            <div className="text-sm font-medium line-clamp-2">{p.name}</div>
            <div className="text-gray-700 mt-1">£{p.price.toFixed(2)}</div>
            <button className="mt-2 w-full rounded-lg border py-1.5 hover:bg-gray-50">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
