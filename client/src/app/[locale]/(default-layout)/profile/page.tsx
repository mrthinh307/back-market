"use client";

import { PersonalDetailsCard } from "@/components/profile/PersonalDetailsCard";
import { AddressCard } from "@/components/profile/AddressCard";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-serif text-center mb-8">Profile</h1>
      <p className="text-center text-gray-500 mb-10">
        Who am I? Where am I? Why am I? Look no further for the answers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalDetailsCard />
        <AddressCard type="billing" />
        <AddressCard type="delivery" />
      </div>
    </div>
  );
}
