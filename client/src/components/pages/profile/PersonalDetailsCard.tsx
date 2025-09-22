"use client";

import { useState } from "react";
import FormInput from "@/components/form/FormInput";

export function PersonalDetailsCard() {
  const [editing, setEditing] = useState(false);

  const [fullName, setFullName] = useState("Nguyễn Xuân Thịnh");
  const [email, setEmail] = useState("thinhcuoc6@gmail.com");
  const [verified] = useState(true);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Personal details</h3>
        <button
          onClick={() => setEditing(!editing)}
          className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
        >
          {editing ? "Close" : "Edit"}
        </button>
      </div>

      {!editing ? (
        <div className="space-y-1 text-[15px]">
          <p className="font-medium">{fullName}</p>
          <p className={verified ? "text-emerald-600" : "text-gray-400"}>
            {verified ? "● Verified" : "○ Not verified"}
          </p>
          <p className="text-gray-700">{email}</p>
        </div>
      ) : (
        <form className="space-y-3">
          <FormInput
            label="Full name"
            value={fullName}
            onChange={(e: any) => setFullName(e.target.value)}
          />
          <FormInput
            label="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
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
