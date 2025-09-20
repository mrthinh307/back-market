"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  createdAt: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
};

const mockOrders: OrderItem[] = [
  {
    id: "BM-10001",
    createdAt: "2025-08-21T13:22:00Z",
    total: 249.99,
    status: "completed",
  },
  {
    id: "BM-10002",
    createdAt: "2025-09-01T09:10:00Z",
    total: 129.0,
    status: "shipped",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch
    const t = setTimeout(() => {
      setOrders(mockOrders); // đổi thành [] để test empty state
      setLoading(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <div className="animate-pulse h-24 bg-gray-100 rounded-xl" />;

  if (!orders.length)
    return <p className="text-gray-600">You haven&apos;t made any orders yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-3 font-medium">{o.id}</td>
                <td className="px-4 py-3">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">£{o.total.toFixed(2)}</td>
                <td className="px-4 py-3 capitalize">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
