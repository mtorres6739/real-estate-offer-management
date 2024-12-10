'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { generateTestEmail } from '@/utils/testEmailGenerator';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [userType, setUserType] = useState('client'); // 'client' or 'agent'
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    try {
      let agentId = null;
      let accessCodeData = null;

      // Verify access code if applicable
      if (userType === 'client' && accessCode) {
        const { data: codes, error: codeError } = await supabase
          .from('agent_access_codes')
          .select('*')
          .eq('code', accessCode.toUpperCase())
          .eq('is_deleted', false)
          .single();

        if (codeError || !codes) {
          toast.error('Invalid or expired access code');
          setLoading(false);
          return;
        }

        console.log('Found codes:', codes);

        // Validate access code
        if (codes.used_by || (codes.expires_at && new Date(codes.expires_at) < new Date())) {
          toast.error('Access code has already been used or has expired');
          setLoading(false);
          return;
        }

        agentId = codes.agent_id;
        accessCodeData = codes;

        console.log('Valid access code found:', { agentId, accessCodeData });
      }

      setLoading(true);

      try {
        // Sign up user with Supabase Auth
        const { data: { user }, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              phone,
              role: userType,
              assigned_agent_id: agentId
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (signupError) {
          if (signupError.status === 429) {
            toast.error('Too many signup attempts. Please wait a few minutes and try again.');
            console.error('Rate limit exceeded:', signupError);
          } else {
            toast.error(`Signup failed: ${signupError.message}`);
            console.error('Signup error:', signupError);
          }
          setLoading(false);
          return;
        }

        if (!user) {
          toast.error('User creation failed');
          setLoading(false);
          return;
        }

        // Create the profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            email: user.email,
            first_name: firstName,
            last_name: lastName,
            phone,
            role: userType,
            assigned_agent_id: agentId
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          toast.error('Failed to create user profile. Please contact support.');
          setLoading(false);
          return;
        }

        // Update access code if needed
        if (userType === 'client' && accessCode && agentId && accessCodeData) {
          const { error: accessCodeUpdateError } = await supabase
            .from('agent_access_codes')
            .update({ 
              used_by_id: user.id, 
              used_at: new Date().toISOString() 
            })
            .eq('code', accessCode);

          if (accessCodeUpdateError) {
            console.error('Error updating access code:', accessCodeUpdateError);
            toast.error('Warning: Failed to update access code');
          }
        }

        // Show success message and redirect
        toast.success('Account created! Please check your email to verify your account.');
        router.push('/login');
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <div className="mt-2">
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="client"
                      checked={userType === 'client'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Client</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="agent"
                      checked={userType === 'agent'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2">Agent</span>
                  </label>
                </div>
              </div>
            </div>

            {userType === 'client' && (
              <div>
                <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700">
                  Access Code
                </label>
                <div className="mt-1">
                  <input
                    id="accessCode"
                    type="text"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
