'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CreateOfferInput } from '@/types/offers';
import { use } from 'react';

interface Buyer {
  name: string;
  email: string;
  phone: string;
}

interface Document {
  file: File;
  type: string;
  description: string;
}

export default function SubmitOfferPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params); // Fix for params promise warning
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [amount, setAmount] = useState('');
  const [buyers, setBuyers] = useState<Buyer[]>([{ name: '', email: '', phone: '' }]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [notes, setNotes] = useState('');

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    }
    checkAuth();
  }, [supabase.auth]);

  const handleBuyerChange = (index: number, field: keyof Buyer, value: string) => {
    const newBuyers = [...buyers];
    newBuyers[index] = { ...newBuyers[index], [field]: value };
    setBuyers(newBuyers);
  };

  const addBuyer = () => {
    setBuyers([...buyers, { name: '', email: '', phone: '' }]);
  };

  const removeBuyer = (index: number) => {
    if (buyers.length > 1) {
      setBuyers(buyers.filter((_, i) => i !== index));
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newDocuments: Document[] = [];
    for (let i = 0; i < files.length; i++) {
      newDocuments.push({
        file: files[i],
        type: 'Other',
        description: '',
      });
    }
    setDocuments([...documents, ...newDocuments]);
  };

  const handleDocumentChange = (index: number, field: keyof Document, value: string) => {
    const newDocuments = [...documents];
    if (field === 'type' || field === 'description') {
      newDocuments[index] = { ...newDocuments[index], [field]: value };
      setDocuments(newDocuments);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const uploadDocuments = async () => {
    const uploadedDocs = [];
    for (const doc of documents) {
      const fileName = `${Date.now()}-${doc.file.name}`;
      const { data, error } = await supabase.storage
        .from('offer-documents')
        .upload(fileName, doc.file);

      if (error) throw error;

      uploadedDocs.push({
        path: data.path,
        type: doc.type,
        description: doc.description,
        name: doc.file.name,
      });
    }
    return uploadedDocs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload documents first
      const uploadedDocuments = documents.length > 0 ? await uploadDocuments() : [];

      const response = await fetch(`/api/properties/${resolvedParams.id}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_id: resolvedParams.id,
          amount: Number(amount),
          buyer_names: buyers.map(b => b.name),
          buyer_emails: buyers.map(b => b.email),
          buyer_phones: buyers.map(b => b.phone),
          documents: uploadedDocuments,
          notes,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit offer');
      }

      // Redirect back to property page after successful submission
      router.push(`/properties/${resolvedParams.id}?offer=submitted`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your offer');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Submit an Offer</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Offer Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Offer Amount ($)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                required
                min="0"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isSubmitting}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="500,000"
              />
            </div>
          </div>

          {/* Buyers Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Buyers</h3>
              <button
                type="button"
                onClick={addBuyer}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Buyer
              </button>
            </div>
            
            {buyers.map((buyer, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-900">Buyer {index + 1}</h4>
                  {buyers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBuyer(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={buyer.name}
                      onChange={(e) => handleBuyerChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={buyer.email}
                      onChange={(e) => handleBuyerChange(index, 'email', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyer.phone}
                      onChange={(e) => handleBuyerChange(index, 'phone', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Documents</h3>
            <div className="space-y-4">
              <input
                type="file"
                multiple
                onChange={handleDocumentUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              
              {documents.map((doc, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{doc.file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Document Type
                      </label>
                      <select
                        value={doc.type}
                        onChange={(e) => handleDocumentChange(index, 'type', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="Other">Other</option>
                        <option value="Proof of Funds">Proof of Funds</option>
                        <option value="Pre-Approval Letter">Pre-Approval Letter</option>
                        <option value="Financial Statement">Financial Statement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <input
                        type="text"
                        value={doc.description}
                        onChange={(e) => handleDocumentChange(index, 'description', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Brief description of the document"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Any additional information or contingencies..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
