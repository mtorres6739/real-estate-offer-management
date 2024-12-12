'use client';

import { ShieldCheckIcon, CircleStackIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <CircleStackIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">
              All systems operational
            </span>
          </div>

          {/* Insurance Quote */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100"
            >
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Get Insurance Quote</span>
              <span className="text-blue-400 text-xs">Protect your investment</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            &copy; 2024 Real Estate Offer Management. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
