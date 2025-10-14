export interface UserProfile {
  id: string;
  authId: string;
  lastName: string | null;
  firstName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserAuth {
  id: string;
  email: string;
  emailVerified: boolean;
  provider: string | null;
  providerId: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile | null;
}

export interface UserAddress {
  id: string;
  userId: string;
  fullName: string | null;
  phone: string | null;
  addressLine: string | null;
  ward: string | null;
  district: string | null;
  city: string | null;
  postalCode: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}