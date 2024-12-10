'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { ClipboardDocumentIcon, PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/solid';

interface AccessCode {
  id: string;
  code: string;
  created_at: string;
  updated_at: string;
  used_at: string | null;
  used_by_id: string | null;
  expires_at: string;
  is_active: boolean;
  is_deleted: boolean;
  used_by?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export default function AccessCodesPage() {
  const { user } = useAuth();
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCode, setEditingCode] = useState<AccessCode | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [customCode, setCustomCode] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const supabase = createClientComponentClient();

  const getDaysRemaining = (expirationDate: string) => {
    const now = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const fetchAccessCodes = async () => {
    if (!user?.id) return;
    
    try {
      console.log('Fetching access codes for user:', user.id);
      // First, get the access codes
      const { data: accessCodesData, error: accessCodesError } = await supabase
        .from('agent_access_codes')
        .select(`
          id,
          code,
          created_at,
          updated_at,
          used_at,
          used_by_id,
          expires_at,
          is_active,
          is_deleted
        `)
        .eq('agent_id', user.id)
        .eq('is_active', true)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });

      if (accessCodesError) {
        console.error('Error fetching access codes:', accessCodesError);
        throw accessCodesError;
      }

      // Get user profiles for used codes
      const usedByIds = accessCodesData
        ?.filter(code => code.used_by_id)
        .map(code => code.used_by_id) || [];

      if (usedByIds.length > 0) {
        const { data: userProfilesData, error: userProfilesError } = await supabase
          .from('user_profiles')
          .select('id, first_name, last_name, email, phone')
          .in('id', usedByIds);

        if (userProfilesError) {
          console.error('Error fetching user profiles:', userProfilesError);
          throw userProfilesError;
        }

        // Combine the data
        const accessCodesWithUsers = accessCodesData.map(code => {
          if (!code.used_by_id) return code;
          const userProfile = userProfilesData?.find(profile => profile.id === code.used_by_id);
          return {
            ...code,
            used_by: userProfile || null
          };
        });

        setAccessCodes(accessCodesWithUsers);
      } else {
        setAccessCodes(accessCodesData || []);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load access codes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessCodes();
  }, [user, refreshTrigger]);

  const copyToClipboard = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(codeId);
      toast.success('Code copied to clipboard');
      setTimeout(() => {
        setCopiedCodeId(null);
      }, 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy code');
    }
  };

  const updateAccessCode = async (code: AccessCode) => {
    try {
      const { error } = await supabase
        .from('agent_access_codes')
        .update({
          expires_at: code.expires_at
        })
        .eq('id', code.id);

      if (error) throw error;
      toast.success('Access code updated');
      setShowEditModal(false);
      setEditingCode(null);
      setRefreshTrigger(prev => prev + 1);  // Trigger a refresh
    } catch (error) {
      console.error('Error updating access code:', error);
      toast.error('Failed to update access code');
    }
  };

  const deleteAccessCode = async (codeId: string) => {
    try {
      const { error } = await supabase
        .from('agent_access_codes')
        .update({ is_active: false, is_deleted: true })  // Soft delete instead of hard delete
        .eq('id', codeId);

      if (error) throw error;
      
      // Update the local state to remove the deleted code
      setAccessCodes(prevCodes => prevCodes.filter(code => code.id !== codeId));
      setRefreshTrigger(prev => prev + 1);  // Trigger a refresh
      
      toast.success('Access code deleted');
      setShowDeleteModal(false);
      setEditingCode(null);
    } catch (error) {
      console.error('Error deleting access code:', error);
      toast.error('Failed to delete access code');
    }
  };

  const generateNewCode = async () => {
    try {
      // Use custom code if provided, otherwise generate a random one
      const code = customCode || Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Set expiration to 1 week from now
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
      
      const { data, error } = await supabase
        .from('agent_access_codes')
        .insert([{
          agent_id: user?.id,
          code: code,
          expires_at: oneWeekFromNow.toISOString(),
          is_active: true
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('New access code generated');
      setAccessCodes(prev => [data, ...prev]);
      setShowEditModal(false);
      setCustomCode(''); // Reset custom code input
      setRefreshTrigger(prev => prev + 1);  // Trigger a refresh
    } catch (error) {
      console.error('Error generating access code:', error);
      toast.error('Failed to generate access code');
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Access Codes</h1>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Generate and manage access codes for your clients. When a client signs up using your access code,
            they will be automatically assigned to you. Clients can sign up at{' '}
            <a 
              href="/signup" 
              target="_blank" 
              className="text-indigo-600 hover:text-indigo-500"
            >
              {window.location.origin}/signup
            </a>
          </p>
        </div>

        <div className="mt-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setEditingCode(null);
                setShowEditModal(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate New Code
            </button>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading access codes...</div>
          ) : accessCodes.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No access codes found</div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {accessCodes.map((code) => {
                  const isExpired = new Date(code.expires_at) < new Date();
                  console.log('Code status:', {
                    code: code.code,
                    is_active: code.is_active,
                    expires_at: code.expires_at,
                    isExpired,
                    shouldShowButtons: code.is_active && !isExpired
                  });
                  return (
                    <li key={code.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg font-medium text-gray-900">{code.code}</span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                code.is_active && !isExpired
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {code.is_active && !isExpired ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Expires {new Date(code.expires_at).toLocaleDateString()} 
                            {" "}
                            <span className={`${
                              getDaysRemaining(code.expires_at) > 0 
                                ? 'text-gray-500' 
                                : 'text-red-500'
                            }`}>
                              ({getDaysRemaining(code.expires_at) > 0 
                                ? `${getDaysRemaining(code.expires_at)} days remaining` 
                                : 'Expired'})
                            </span>
                          </p>
                          {code.used_by_id && (
                            <div className="mt-2 text-sm">
                              <p className="font-medium text-gray-900">Used by:</p>
                              <p className="text-gray-600">
                                {code.used_by?.first_name} {code.used_by?.last_name}
                              </p>
                              <p className="text-gray-500 text-xs">
                                Used on: {new Date(code.used_at!).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => copyToClipboard(code.code, code.id)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            title="Copy code"
                          >
                            {copiedCodeId === code.id ? (
                              <div className="flex items-center space-x-1">
                                <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                                <span className="text-sm text-green-500">Copied</span>
                              </div>
                            ) : (
                              <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setEditingCode(code);
                              setShowEditModal(true);
                            }}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            title="Edit code"
                          >
                            <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingCode(code);
                              setShowDeleteModal(true);
                            }}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            title="Delete code"
                          >
                            <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingCode ? 'Edit Access Code' : 'Generate New Code'}
            </h3>
            <div className="space-y-4">
              {!editingCode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Custom Code (Optional)</label>
                  <input
                    type="text"
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                    placeholder="Enter custom code or leave blank for random"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to generate a random code
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Maximum Uses</label>
                <input
                  type="number"
                  min="1"
                  value={editingCode?.max_uses || 1}
                  onChange={(e) =>
                    setEditingCode(prev => prev ? {
                      ...prev,
                      max_uses: Math.max(1, parseInt(e.target.value)),
                      remaining_uses: Math.max(1, parseInt(e.target.value))
                    } : null)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="date"
                  value={editingCode ? new Date(editingCode.expires_at).toISOString().split('T')[0] : ''}
                  onChange={(e) =>
                    setEditingCode(prev => prev ? {
                      ...prev,
                      expires_at: new Date(e.target.value).toISOString()
                    } : null)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCode(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => editingCode ? updateAccessCode(editingCode) : generateNewCode()}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                {editingCode ? 'Save Changes' : 'Generate Code'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && editingCode && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Access Code</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this access code? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setEditingCode(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => editingCode && deleteAccessCode(editingCode.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
