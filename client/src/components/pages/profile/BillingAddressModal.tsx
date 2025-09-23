"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import FormInput from "@/components/form/FormInput";

export default function BillingAddressModal({
  isOpen,
  onClose,
  initialData,
  title = "Billing Address",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    country?: string;
    address?: string;
    apartment?: string;
    postcode?: string;
    city?: string;
  };
  title?: string;
}) {
  const [firstName, setFirstName] = useState(initialData?.firstName ?? "");
  const [lastName, setLastName] = useState(initialData?.lastName ?? "");
  const [company, setCompany] = useState(initialData?.company ?? "");
  const [country, setCountry] = useState(initialData?.country ?? "United Kingdom");
  const [address, setAddress] = useState(initialData?.address ?? "");
  const [apartment, setApartment] = useState(initialData?.apartment ?? "");
  const [postcode, setPostcode] = useState(initialData?.postcode ?? "");
  const [city, setCity] = useState(initialData?.city ?? "");

  const [showCompany, setShowCompany] = useState(!!company);
  const [showApartment, setShowApartment] = useState(!!apartment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      company,
      country,
      address,
      apartment,
      postcode,
      city,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* First name & Last name */}
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

        {/* Company name (optional toggle) */}
        {showCompany ? (
          <FormInput
            label="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowCompany(true)}
            className="text-blue-600 text-sm font-medium"
          >
            + Add company name
          </button>
        )}

        {/* Country select */}
        <div className="relative">
          <label className="block text-sm text-gray-600 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Vietnam</option>
            <option>Japan</option>
            <option>Germany</option>
          </select>
        </div>

        {/* Street address */}
        <FormInput
          label="Street address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Apartment (optional toggle) */}
        {showApartment ? (
          <FormInput
            label="Apartment, suite, etc."
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setShowApartment(true)}
            className="text-blue-600 text-sm font-medium"
          >
            + Add apartment, suite, etc.
          </button>
        )}

        {/* Post code & City */}
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Post code"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <FormInput
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Save button */}
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
