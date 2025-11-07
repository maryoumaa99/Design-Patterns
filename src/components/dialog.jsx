import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function OpenDialog({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      {/* Dimmed background overlay */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 dark:bg-gray-900/50"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 sm:w-full sm:max-w-md dark:bg-gray-800 dark:text-gray-100"
          >
            {/* Dialog content */}
            <div className="px-6 py-5">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-3"
              >
              Search Helper
              </DialogTitle>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Use these examples to perform smart searches in the table:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <span>Name:</span> <code>john</code> or <code>sarah</code>
                </li>
                <li>
                  <span>Salary range:</span>{" "}
                  <strong>salary from</strong> "range" <strong>to</strong> "range"
                </li>
                <li>
                  <span>ID search:</span> <strong>id: </strong> "Id Number"
                </li>
              </ul>

              <p className="text-xs mt-4 text-gray-500 dark:text-gray-400 italic">
                * Search is case-insensitive.
              </p>
            </div>

            {/* Dialog footer with close button */}
            <div className="bg-gray-50 px-4 py-3 text-right dark:bg-gray-700/40">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-md bg-[var(--text-C)] text-[var(--bg)] px-4 py-2 text-sm font-medium hover:bg-gray-500 transition"
              >
                Got it
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
