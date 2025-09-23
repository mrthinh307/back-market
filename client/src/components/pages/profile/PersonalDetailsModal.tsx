"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import FormInput from "@/components/form/FormInput";
import PhoneInput from "@/components/form/PhoneInput";

export default function PersonalDetailsModal({
  isOpen,
  onClose,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
}) {
  const [firstName, setFirstName] = useState(initialData?.firstName ?? "Nguyễn Xuân");
  const [lastName, setLastName] = useState(initialData?.lastName ?? "Thịnh");
  const [email, setEmail] = useState(initialData?.email ?? "thinhcuoc6@gmail.com");
  const [phone, setPhone] = useState(initialData?.phone ?? "");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Personal Information">
      <form className="space-y-4">
        {/* First & Last name */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormInput
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Email */}
        <FormInput
          label="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone */}
        <PhoneInput
            value={phone}
            onChange={({ country, dial, phone }) => {
                console.log("selected:", country, dial, phone);
                setPhone(phone);
            }}
        />

        {/* Save */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
