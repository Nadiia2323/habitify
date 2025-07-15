import React from "react";

export default function Info() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Why Growbit?
        </h2>

        <ul className="space-y-6 text-gray-600 dark:text-gray-300">
          {["Simplicity", "Motivation", "Progress tracking"].map((item) => (
            <li key={item} className="flex items-center">
              <svg
                className="w-5 h-5 text-emerald-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-3 text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
