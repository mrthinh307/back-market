'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getUserAddress, saveUserAddress, deleteUserAddress } from '@/api/user.api';
import { USE_QUERY_KEY } from '@/constants/use-query-key';
import { successToastProps } from '@/libs/toast/toast-props';

export interface DeliveryAddressData {
  id?: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  addressLine: string;
  isDefault?: boolean;
}

/**
 * Hook to fetch user address with React Query caching
 * @param options - Optional query configuration
 * @param options.enabled - Whether the query should run automatically
 */
export function useUserAddress(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: USE_QUERY_KEY.USER_ADDRESS(),
    queryFn: getUserAddress,
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: false, // Don't retry if user has no address
    ...options,
  });
}

/**
 * Hook to save/update user address with automatic cache invalidation
 */
export function useSaveUserAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveUserAddress,
    onSuccess: (savedAddress) => {
      // Invalidate to refetch fresh data
      queryClient.invalidateQueries({ 
        queryKey: USE_QUERY_KEY.USER_ADDRESS() 
      });

      toast.success('Address saved successfully!', {
        ...successToastProps,
      });

      return savedAddress;
    },
    onError: (error) => {
      console.error('Error saving address:', error);
      toast.error('Failed to save address. Please try again.');
      throw error;
    },
  });
}

/**
 * Hook to delete user address with automatic cache invalidation
 */
export function useDeleteUserAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserAddress,
    onSuccess: () => {
      // Clear the cache or set to null
      queryClient.setQueryData(USE_QUERY_KEY.USER_ADDRESS(), null);
      
      toast.success('Address deleted successfully!', {
        ...successToastProps,
      });
    },
    onError: (error) => {
      console.error('Error deleting address:', error);
      toast.error('Failed to delete address. Please try again.');
      throw error;
    },
  });
}

/**
 * Prefetch user address (useful for hover/focus optimization)
 */
export async function prefetchUserAddress(queryClient: ReturnType<typeof useQueryClient>) {
  await queryClient.prefetchQuery({
    queryKey: USE_QUERY_KEY.USER_ADDRESS(),
    queryFn: getUserAddress,
    staleTime: 3 * 60 * 1000,
  });
}
