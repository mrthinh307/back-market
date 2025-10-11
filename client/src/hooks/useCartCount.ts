import { useQuery } from '@tanstack/react-query';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { useAuth } from '@/contexts/AuthContext';
import { getTotalCartItems } from '@/api/cart.api';

export const useCartCount = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: USE_QUERY_KEY.CART_COUNT(),
    queryFn: getTotalCartItems,
    enabled: isAuthenticated, // Only fetch when user is authenticated
    retry: true,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true, // Refetch when user comes back to tab
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};