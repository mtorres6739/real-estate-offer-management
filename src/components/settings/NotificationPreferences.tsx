'use client';

import { Switch } from '@headlessui/react';
import { NotificationPreferences as NotificationPreferencesType } from '@/types/profile';
import { classNames } from '@/lib/utils';

interface NotificationPreferencesProps {
  preferences: NotificationPreferencesType;
  onChange: (preferences: NotificationPreferencesType) => void;
}

export default function NotificationPreferences({ preferences, onChange }: NotificationPreferencesProps) {
  const handleToggle = (channel: keyof NotificationPreferencesType, type: string, value: boolean) => {
    const updatedPreferences = {
      ...preferences,
      [channel]: {
        ...preferences[channel],
        [type]: value,
      },
    };
    onChange(updatedPreferences);
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Email Notifications</h3>
        <div className="mt-4 space-y-4">
          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">New Offers</span>
                <p className="text-sm text-gray-500">Get notified when a new offer is submitted</p>
              </Switch.Label>
              <Switch
                checked={preferences.email.new_offers}
                onChange={(checked) => handleToggle('email', 'new_offers', checked)}
                className={classNames(
                  preferences.email.new_offers ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    preferences.email.new_offers ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Offer Updates</span>
                <p className="text-sm text-gray-500">Get notified when an offer is updated</p>
              </Switch.Label>
              <Switch
                checked={preferences.email.offer_updates}
                onChange={(checked) => handleToggle('email', 'offer_updates', checked)}
                className={classNames(
                  preferences.email.offer_updates ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    preferences.email.offer_updates ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Weekly Digest</span>
                <p className="text-sm text-gray-500">Receive a weekly summary of your activity</p>
              </Switch.Label>
              <Switch
                checked={preferences.email.weekly_digest}
                onChange={(checked) => handleToggle('email', 'weekly_digest', checked)}
                className={classNames(
                  preferences.email.weekly_digest ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    preferences.email.weekly_digest ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>
      </div>

      {/* SMS Notifications */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">SMS Notifications</h3>
        <div className="mt-4 space-y-4">
          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">New Offers</span>
                <p className="text-sm text-gray-500">Get SMS notifications for new offers</p>
              </Switch.Label>
              <Switch
                checked={preferences.sms.new_offers}
                onChange={(checked) => handleToggle('sms', 'new_offers', checked)}
                className={classNames(
                  preferences.sms.new_offers ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    preferences.sms.new_offers ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Offer Updates</span>
                <p className="text-sm text-gray-500">Get SMS notifications for offer updates</p>
              </Switch.Label>
              <Switch
                checked={preferences.sms.offer_updates}
                onChange={(checked) => handleToggle('sms', 'offer_updates', checked)}
                className={classNames(
                  preferences.sms.offer_updates ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    preferences.sms.offer_updates ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Push Notifications</h3>
        <div className="mt-4 space-y-4">
          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">New Offers</span>
                <p className="text-sm text-gray-500">Get browser notifications for new offers</p>
              </Switch.Label>
              <Switch
                checked={preferences.push.new_offers}
                onChange={(checked) => handleToggle('push', 'new_offers', checked)}
                className={classNames(
                  preferences.push.new_offers ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    preferences.push.new_offers ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
          </Switch.Group>

          <Switch.Group>
            <div className="flex items-center justify-between">
              <Switch.Label className="flex-grow">
                <span className="text-sm font-medium text-gray-900">Offer Updates</span>
                <p className="text-sm text-gray-500">Get browser notifications for offer updates</p>
              </Switch.Label>
              <Switch
                checked={preferences.push.offer_updates}
                onChange={(checked) => handleToggle('push', 'offer_updates', checked)}
                className={classNames(
                  preferences.push.offer_updates ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
              >
                <span
                  className={classNames(
                    preferences.push.offer_updates ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
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
