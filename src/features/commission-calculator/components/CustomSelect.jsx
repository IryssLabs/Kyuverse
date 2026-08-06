"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Check, CaretDown } from "@phosphor-icons/react";


export default function CustomSelect({ label, value, onChange, options }) {
  const selected = options.find((o) => o.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        {label && (
          <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2.5">
            {label}
          </label>
        )}
        
        <Listbox.Button className="relative w-full bg-[#141418] border border-white/15 hover:border-white/25 rounded-xl px-4 py-3 text-left text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all">
          <span className="block truncate">{selected?.label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <CaretDown className="h-4 w-4 text-gray-500" weight="bold" />
          </span>
        </Listbox.Button>
        
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 mt-2 w-full overflow-auto rounded-xl bg-[#1a1a1e] border border-white/15 py-2 shadow-xl shadow-black/20 max-h-60 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  `relative cursor-pointer select-none py-3 pl-4 pr-10 text-sm transition-colors ${
                    active || selected
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-cyan-400">
                        <Check className="h-4 w-4" weight="bold" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}