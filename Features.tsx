// import React from "react";
// import { CheckIcon } from "@heroicons/react/24/solid";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import { ChartBarIcon } from "@heroicons/react/24/solid";

// export default function Features() {
//   return (
//     <>
//       <div className=" m-10">
//         <h2 className="text-4xl font-extrabold dark:text-white">
//           HOW IT WORKS?
//         </h2>
//       </div>
//       <div className="flex justify-around m-10">
//         <div className="w-40 h-20 flex flex-col items-center gap-2">
//           <PlusIcon className="w-6 h-6 text-blue-600" />

//           <p>Add a habit</p>
//         </div>
//         <div className="w-40 h-20 flex flex-col items-center gap-2">
//           <CheckIcon className="w-6 h-6 text-blue-500" />
//           <p>Track</p>
//         </div>
//         <div className="w-40 h-20 flex flex-col items-center gap-2">
//           <ChartBarIcon className="w-6 h-6 text-emerald-600" />
//           <p>Analyze</p>
//         </div>
//       </div>
//     </>
//   );
// }

import { PlusIcon, CheckIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export default function Features() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          How It Works
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Build healthy habits step by step — it's simple, visual, and
          motivating.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <PlusIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Add Habits
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create your daily goals and routines.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <div className="p-4 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Track Progress
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Check off tasks and build streaks.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
          <div className="p-4 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
            <ChartBarIcon className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Analyze
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Visualize your growth over time.
          </p>
        </div>
      </div>
    </section>
  );
}
