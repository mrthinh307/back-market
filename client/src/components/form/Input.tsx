'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import clearIcon from '@/public/assets/images/clear-input.svg';

type InputProps = {
  type?: 'text' | 'password';
  label?: string;
  icon?: any;
  description?: string;
  isShowDescription?: boolean;
  error?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({
  type,
  label,
  icon,
  description,
  isShowDescription = false,
  error,
  value: controlledValue,
  onChange,
  className,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (controlledValue === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    const fakeEvent = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;

    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.(fakeEvent);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative group ${className}`}>
      <input
        ref={inputRef}
        type={type || 'text'}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        placeholder=" "
        className={`peer rounded-sm border text-content w-full h-[48px] min-w-0 relative bg-white duration-200 transition-all hover:bg-input-hover focus:bg-input-hover focus:outline-none focus:ring-2 px-3 pt-6 pb-2 group-hover:focus:bg-white ${
          error
            ? 'border-danger focus:border-danger focus:ring-red-200'
            : 'border-input-border focus:border-content focus:ring-input-outline'
        }`}
      />
      <label
        className="absolute left-3 top-3 text-base transition-all duration-200 ease-in-out
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-content
                   peer-focus:top-1 peer-focus:text-xs peer-focus:text-muted
                   peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-muted pointer-events-none"
      >
        {label}
      </label>
      <div className="rounded-sm absolute right-1 top-1 z-[1] size-10 motion-safe:transition-colors motion-safe:duration-200">
        {(type === 'password' || value) && (
          <button
            type="button"
            aria-label="Clear input"
            title="Clear"
            onClick={handleClear}
            className="input-icon"
          >
            <Image src={clearIcon} alt="Clear input" />
          </button>
        )}
        {!value && icon && (
          <div className="input-icon pointer-events-none">
            <Image src={icon} alt="Input icon" />
          </div>
        )}
      </div>
      {isShowDescription && (
        <p className={`text-sm mt-2 ${error ? 'text-danger' : 'text-muted'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default Input;
