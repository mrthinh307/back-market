import CartPage from '@/components/pages/cart/CartPage';
import ProtectedRoute from '@/components/providers/ProtectedRoute';

export default function Cart() {
  return (
    <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
  );
}
