'use client';

import { useState } from 'react';
import { ProfessionalInfo as ProfessionalInfoType } from '@/types/profile';

interface ProfessionalInfoProps {
  info: ProfessionalInfoType;
  onChange: (info: ProfessionalInfoType) => void;
}

export default function ProfessionalInfo({ info, onChange }: ProfessionalInfoProps) {
  const [specialties, setSpecialties] = useState((info.specialties || []).join(', '));

  const handleChange = (field: keyof ProfessionalInfoType, value: string | number | string[]) => {
    const updatedInfo = {
      ...info,
      [field]: value,
    };
    onChange(updatedInfo);
  };

  const handleSpecialtiesChange = (value: string) => {
    setSpecialties(value);
    handleChange('specialties', value.split(',').map(s => s.trim()).filter(Boolean));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Professional Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update your professional details and credentials
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* License Number */}
        <div className="sm:col-span-3">
          <label htmlFor="license_number" className="block text-sm font-medium text-gray-700">
            License Number
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="license_number"
              id="license_number"
              value={info.license_number || ''}
              onChange={(e) => handleChange('license_number', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* License State */}
        <div className="sm:col-span-3">
          <label htmlFor="license_state" className="block text-sm font-medium text-gray-700">
            License State
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="license_state"
              id="license_state"
              value={info.license_state || ''}
              onChange={(e) => handleChange('license_state', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* License Expiry */}
        <div className="sm:col-span-3">
          <label htmlFor="license_expiry" className="block text-sm font-medium text-gray-700">
            License Expiry
          </label>
          <div className="mt-1">
            <input
              type="date"
              name="license_expiry"
              id="license_expiry"
              value={info.license_expiry || ''}
              onChange={(e) => handleChange('license_expiry', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Years of Experience */}
        <div className="sm:col-span-3">
          <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="years_of_experience"
              id="years_of_experience"
              value={info.years_of_experience || ''}
              onChange={(e) => handleChange('years_of_experience', parseInt(e.target.value, 10))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Specialties */}
        <div className="sm:col-span-6">
          <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
            Specialties
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="specialties"
              id="specialties"
              value={specialties}
              onChange={(e) => handleSpecialtiesChange(e.target.value)}
              placeholder="Enter specialties separated by commas"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Enter your specialties separated by commas (e.g., "Residential, Commercial, Investment")
          </p>
        </div>

        {/* Certifications */}
        <div className="sm:col-span-6">
          <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">
            Certifications
          </label>
          <div className="mt-1">
            <textarea
              id="certifications"
              name="certifications"
              rows={3}
              value={info.certifications || ''}
              onChange={(e) => handleChange('certifications', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="List your professional certifications"
            />
          </div>
        </div>

        {/* Brokerage */}
        <div className="sm:col-span-6">
          <label htmlFor="brokerage" className="block text-sm font-medium text-gray-700">
            Brokerage
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="brokerage"
              id="brokerage"
              value={info.brokerage || ''}
              onChange={(e) => handleChange('brokerage', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Your brokerage firm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
