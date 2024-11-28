'use client';

import { Switch } from '@headlessui/react';
import { PrivacySettings as PrivacySettingsType } from '@/types/profile';
import { classNames } from '@/lib/utils';

interface PrivacySettingsProps {
  settings: PrivacySettingsType;
  onChange: (settings: PrivacySettingsType) => void;
}

export default function PrivacySettings({ settings, onChange }: PrivacySettingsProps) {
  const handleToggle = (setting: keyof PrivacySettingsType, value: boolean) => {
    const updatedSettings = {
      ...settings,
      [setting]: value,
    };
    onChange(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Privacy Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage how your information is displayed to other users
        </p>
        <div className="mt-6 space-y-6">
          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Profile Visibility</span>
                <p className="text-sm text-gray-500">Control who can view your profile</p>
              </Switch.Label>
              <select
                value={settings.profile_visibility}
                onChange={(e) => handleToggle('profile_visibility', e.target.value as any)}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="public">Public</option>
                <option value="registered">Registered Users</option>
                <option value="private">Private</option>
              </select>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Contact Info Visibility</span>
                <p className="text-sm text-gray-500">Control who can see your contact information</p>
              </Switch.Label>
              <select
                value={settings.contact_info_visibility}
                onChange={(e) => handleToggle('contact_info_visibility', e.target.value as any)}
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="public">Public</option>
                <option value="registered">Registered Users</option>
                <option value="private">Private</option>
              </select>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Show Email</span>
                <p className="text-sm text-gray-500">Display your email address on your profile</p>
              </Switch.Label>
              <Switch
                checked={settings.show_email}
                onChange={(checked) => handleToggle('show_email', checked)}
                className={classNames(
                  settings.show_email ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.show_email ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Show Phone</span>
                <p className="text-sm text-gray-500">Display your phone number on your profile</p>
              </Switch.Label>
              <Switch
                checked={settings.show_phone}
                onChange={(checked) => handleToggle('show_phone', checked)}
                className={classNames(
                  settings.show_phone ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.show_phone ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Show Address</span>
                <p className="text-sm text-gray-500">Display your address on your profile</p>
              </Switch.Label>
              <Switch
                checked={settings.show_address}
                onChange={(checked) => handleToggle('show_address', checked)}
                className={classNames(
                  settings.show_address ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.show_address ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>
      </div>
    </div>
  );
}
