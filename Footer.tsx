import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-sm p-4 mt-10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <span>© 2025 GrowBit™. All Rights Reserved.</span>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
            <a href="#" className="hover:underline">
              GitHub
            </a>
            {/* <div></div> */}
          </div>
        </div>
      </footer>
    </>
  );
}
