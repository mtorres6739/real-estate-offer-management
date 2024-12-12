'use client';

export default function SettingsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mt-8">
        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Choose what updates you want to receive.</p>
              </div>
              <div className="mt-5">
                <div className="space-y-4">
                  {[
                    { id: 'offers', label: 'New offer notifications' },
                    { id: 'messages', label: 'Message notifications' },
                    { id: 'updates', label: 'Property updates' },
                  ].map((item) => (
                    <div key={item.id} className="relative flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id={item.id}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={item.id} className="font-medium text-gray-700">
                          {item.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage your privacy preferences.</p>
              </div>
              <div className="mt-5">
                <div className="space-y-4">
                  {[
                    { id: 'public-profile', label: 'Make profile public' },
                    { id: 'show-contact', label: 'Show contact information' },
                  ].map((item) => (
                    <div key={item.id} className="relative flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id={item.id}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={item.id} className="font-medium text-gray-700">
                          {item.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
