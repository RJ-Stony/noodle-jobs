import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "최신순", value: "recent" },
  { name: "가나다순", value: "title" },
  { name: "체크한 질문", value: "checked" },
];

type SortDropdownProps = {
  sortType: "title" | "recent" | "checked";
  setSortType: (value: "title" | "recent" | "checked") => void;
};

export default function SortDropdown({
  sortType,
  setSortType,
}: SortDropdownProps) {
  const selected =
    sortOptions.find((opt) => opt.value === sortType) || sortOptions[0];

  return (
    <div className="w-40 text-sm">
      <Listbox
        value={selected}
        onChange={(e) => setSortType(e.value as "title" | "recent" | "checked")}
      >
        <div className="relative">
          <ListboxButton
            className="relative w-full cursor-pointer rounded-lg bg-primary-50 dark:bg-primary-600 py-[6px] pl-3 pr-8 text-left
                       text-primary-700 dark:text-white border border-primary-200 dark:border-primary-400 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all text-sm hover:bg-primary-200 dark:hover:bg-primary-500"
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <ChevronUpDownIcon
                className="h-4 w-4 text-primary dark:text-white"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className="absolute mt-1 w-full overflow-auto rounded-md bg-white dark:bg-primary-600 py-1
                         text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-10"
            >
              {sortOptions.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className="relative cursor-pointer select-none py-2 pl-9 pr-3 text-primary-800 dark:text-white text-sm
                           ui-active:bg-primary-200/60 ui-selected:font-medium dark:ui-active:bg-primary-500/60"
                >
                  {({ selected }) => (
                    <>
                      <span className="block truncate">{option.name}</span>
                      {selected && (
                        <span className="absolute inset-y-0 left-2 flex items-center">
                          <CheckIcon
                            className="h-4 w-4 text-primary dark:text-white"
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
