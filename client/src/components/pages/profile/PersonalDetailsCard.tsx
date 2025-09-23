"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";
import PersonalDetailsModal from "@/components/pages/profile/PersonalDetailsModal";

export function PersonalDetailsCard() {
  const [openEditModal, setOpenEditModal] = useState(false);

  const [fullName] = useState("Nguyễn Xuân Thịnh");
  const [email] = useState("thinhcuoc6@gmail.com");
  const [verified] = useState(true);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Personal details</h3>
        <button
          onClick={() => setOpenEditModal(true)}
          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
        >
          Edit
        </button>
      </div>

      {/* Nội dung */}
      <div className="space-y-1 text-[15px]">
        <p className="font-medium">{fullName}</p>

        <p className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              verified ? "bg-emerald-600" : "bg-gray-400"
            }`}
          />
          <span className={verified ? "text-emerald-600" : "text-gray-400"}>
            {verified ? "Verified" : "Not verified"}
          </span>
        </p>

        <p className="text-gray-700">{email}</p>

        <div className="mt-3 flex flex-col space-y-1 text-[15px]">
          <button
            type="button"
            onClick={() => setOpenRemoveModal(true)}
            className="font-medium text-gray-800 underline hover:text-black text-left"
          >
            Remove connected social accounts
          </button>
          <button
            type="button"
            onClick={() => setOpenDeleteModal(true)}
            className="font-medium text-gray-800 underline hover:text-black text-left"
          >
            Delete your account
          </button>
        </div>
      </div>

      {/* Modal edit personal info */}
      <PersonalDetailsModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        initialData={{
          firstName: fullName.split(" ").slice(0, -1).join(" ") || "Nguyễn Xuân",
          lastName: fullName.split(" ").slice(-1).join(" ") || "Thịnh",
          email: email,
        }}
      />

      {/* Remove Social Accounts Modal */}
      <Modal isOpen={openRemoveModal} onClose={() => setOpenRemoveModal(false)}>
        <h3 className="text-lg font-semibold mb-2">
          Remove connected social accounts
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This will disconnect any linked social login providers from your
          account.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpenRemoveModal(false)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setOpenRemoveModal(false)}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Remove
          </button>
        </div>
      </Modal>

      {/* Delete Account Modal */}
      <Modal isOpen={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <h3 className="text-lg font-semibold mb-2">Delete your account</h3>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpenDeleteModal(false)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => setOpenDeleteModal(false)}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
