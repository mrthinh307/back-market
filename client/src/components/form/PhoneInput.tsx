"use client";

import { useEffect, useState } from "react";

type Country = { code: string; dial: string };

const countryCodes: Country[] = [
  { code: "US", dial: "+1" },
  { code: "GB", dial: "+44" },
  { code: "VN", dial: "+84" },
  { code: "JP", dial: "+81" },
  { code: "DE", dial: "+49" },
  { code: "GA", dial: "+241" },
  // 👉 có thể mở rộng danh sách bằng cách import JSON country code
];

const DEFAULT_COUNTRY: Country = { code: "GB", dial: "+44" };

function getCountryByCodeOrDefault(code: string): Country {
  return countryCodes.find((c) => c.code === code) ?? countryCodes[0] ?? DEFAULT_COUNTRY;
}

export default function PhoneInput({
  value,
  onChange,
  defaultCode = "GB",
}: {
  value: string;
  onChange: (val: { country: string; dial: string; phone: string }) => void;
  defaultCode?: string;
}) {
  const [selected, setSelected] = useState<Country>(() => getCountryByCodeOrDefault(defaultCode));
  const [phone, setPhone] = useState(value);

  // Keep local phone state in sync when parent value changes
  useEffect(() => {
    setPhone(value);
  }, [value]);

  // Keep selected country in sync when defaultCode changes
  useEffect(() => {
    setSelected(getCountryByCodeOrDefault(defaultCode));
  }, [defaultCode]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cc = countryCodes.find((c) => c.code === e.target.value);
    if (cc) {
      setSelected(cc);
      onChange({ country: cc.code, dial: cc.dial, phone });
    }
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    onChange({ country: selected.code, dial: selected.dial, phone: e.target.value });
  };

  return (
    <div className="flex">
      {/* Select country */}
      <select
        value={selected.code}
        onChange={handleSelect}
        className="px-3 py-2 border rounded-l-lg bg-gray-50 text-sm"
        aria-label="Country code"
      >
        {countryCodes.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} {c.dial}
          </option>
        ))}
      </select>

      {/* Phone input */}
      <div className="relative flex-1">
        <input
          type="tel"
          placeholder=" "
          value={phone}
          onChange={handlePhone}
          className="peer w-full px-3 pt-6 pb-3 h-[48px] border-t border-b border-r rounded-r-lg focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Phone number"
        />
        <label
          className="absolute left-3 top-3 text-base transition-all duration-200 ease-in-out
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-primary
                   peer-focus:top-1 peer-focus:text-xs peer-focus:text-muted
                   peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-muted pointer-events-none"
        >
          Phone number - optional
        </label>
      </div>
    </div>
  );
}
