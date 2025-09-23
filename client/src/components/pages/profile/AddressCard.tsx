"use client";

import { useState } from "react";
import BillingAddressModal from "@/components/pages/profile/BillingAddressModal";

export function AddressCard({ type }: { type: "billing" | "delivery" }) {
  const label = type === "billing" ? "Billing Address" : "Delivery Address";
  const [openBillingModal, setOpenBillingModal] = useState(false);

  const [line1] = useState("");
  const [city] = useState("");
  const [postcode] = useState("");

  const isEmpty = !line1 && !city && !postcode;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{label}</h3>
        <button
          onClick={() => setOpenBillingModal(true)}
          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
        >
          Edit
        </button>
      </div>

      {isEmpty ? (
          <p className="text-gray-600">There is no address registered yet.</p>
        ) : (
          <div className="text-[15px] text-gray-700 leading-6 whitespace-pre-line">
            {[line1, city, postcode].filter(Boolean).join("\n")}
          </div>
        )}

      <BillingAddressModal
        isOpen={openBillingModal}
        onClose={() => setOpenBillingModal(false)}
        title={type === "billing" ? "Billing Address" : "Delivery Address"}
        initialData={{
          address: line1,
          city,
          postcode,
        }}
      />
    </div>
  );
}
