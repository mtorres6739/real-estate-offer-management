'use client';

export default function OffersPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Offers</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all property offers, both sent and received.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <div className="min-h-[400px] bg-white flex items-center justify-center text-gray-500">
                Offers list coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
