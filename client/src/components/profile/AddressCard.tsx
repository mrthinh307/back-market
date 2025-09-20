"use client";

import { useState } from "react";
import FormInput from "@/components/form/FormInput";

export function AddressCard({ type }: { type: "billing" | "delivery" }) {
  const label = type === "billing" ? "Billing Address" : "Delivery Address";
  const [editing, setEditing] = useState(false);

  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const isEmpty = !line1 && !city && !postcode;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{label}</h3>
        <button
          onClick={() => setEditing(!editing)}
          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
        >
          {editing ? "Close" : "Edit"}
        </button>
      </div>

      {!editing ? (
        isEmpty ? (
          <p className="text-gray-600">There is no address registered yet.</p>
        ) : (
          <div className="text-[15px] text-gray-700 leading-6 whitespace-pre-line">
            {[line1, city, postcode].filter(Boolean).join("\n")}
          </div>
        )
      ) : (
        <form className="space-y-3">
          <FormInput
            label="Address line 1"
            value={line1}
            onChange={(e: any) => setLine1(e.target.value)}
          />
          <FormInput
            label="City"
            value={city}
            onChange={(e: any) => setCity(e.target.value)}
          />
          <FormInput
            label="Postcode"
            value={postcode}
            onChange={(e: any) => setPostcode(e.target.value)}
          />

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-lg bg-black text-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
