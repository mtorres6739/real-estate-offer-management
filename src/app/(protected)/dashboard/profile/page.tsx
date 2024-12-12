'use client';

import { useAuth } from '@/lib/auth/contexts/AuthContext';
import { updateUserProfile, getUserProfile, type UserProfile } from '@/lib/api/user';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      
      try {
        const profile = await getUserProfile(user.id);
        if (profile) {
          setName(profile.name || '');
          setPhone(profile.phone || '');
          setCompany(profile.company || '');
        } else {
          // Create initial profile
          await updateUserProfile(user.id, {
            name: '',
            phone: '',
            company: '',
          });
        }
      } catch (error: any) {
        // If profile doesn't exist, create it
        if (error?.code === 'PGRST116') {
          try {
            await updateUserProfile(user.id, {
              name: '',
              phone: '',
              company: '',
            });
          } catch (createError) {
            console.error('Error creating profile:', createError);
            toast.error('Failed to create profile');
          }
        } else {
          console.error('Error loading profile:', error);
          toast.error('Failed to load profile');
        }
      } finally {
        setIsLoadingProfile(false);
      }
    }

    loadProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      await updateUserProfile(user.id, {
        name,
        phone,
        company,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Update your account details and preferences.</p>
                </div>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                      <input
                        type="email"
                        disabled
                        value={user?.email || ''}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter your company name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
