import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ChartBarIcon } from "@heroicons/react/24/solid";

export default function Features() {
  return (
    <>
      <div className=" m-10">
        <p> HOW IT WORKS?</p>
      </div>
      <div className="flex justify-around m-10">
        <div className="w-40 h-20 flex flex-col items-center gap-2">
          <PlusIcon className="w-6 h-6 text-blue-600" />

          <p>Add a habit</p>
        </div>
        <div className="w-40 h-20 flex flex-col items-center gap-2">
          <CheckIcon className="w-6 h-6 text-blue-500" />
          <p>Track</p>
        </div>
        <div className="w-40 h-20 flex flex-col items-center gap-2">
          <ChartBarIcon className="w-6 h-6 text-emerald-600" />
          <p>Analyze</p>
        </div>
      </div>
    </>
  );
}
