import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { AddressSearch } from '../AddressSearch'

const propertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip_code: z.string().min(1, 'ZIP code is required'),
  price: z.number().min(1, 'Price is required'),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  square_feet: z.number().optional(),
  year_built: z.number().optional(),
  property_type: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  attom_id: z.string().optional(),
  street_number: z.string().optional(),
  street_name: z.string().optional(),
  status: z.enum(['Active', 'Pending', 'Sold', 'Inactive', 'Cancelled', 'Closed', 'Withdrawn'])
})

type PropertyFormData = z.infer<typeof propertySchema>

interface AddPropertyModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: PropertyFormData) => Promise<void>
}

export default function AddPropertyModal({ open, onClose, onSubmit }: AddPropertyModalProps) {
  const cancelButtonRef = useRef(null)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      status: 'Active'
    }
  })

  const handleAddressSelect = (addressData: {
    formattedAddress: string;
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
  }) => {
    // Set form values and trigger validation
    setValue('address', addressData.formattedAddress, { shouldValidate: true });
    setValue('city', addressData.city, { shouldValidate: true });
    setValue('state', addressData.state, { shouldValidate: true });
    setValue('zip_code', addressData.zipCode, { shouldValidate: true });
    setValue('latitude', addressData.lat, { shouldValidate: true });
    setValue('longitude', addressData.lng, { shouldValidate: true });
    setValue('street_number', addressData.streetNumber, { shouldValidate: true });
    setValue('street_name', addressData.streetName, { shouldValidate: true });
  };

  const onSubmitForm = async (data: PropertyFormData) => {
    try {
      // Transform the form data to match the API interface
      const transformedData = {
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zip_code,
        price: data.price.toString(),
        bedrooms: data.bedrooms?.toString(),
        bathrooms: data.bathrooms?.toString(),
        squareFeet: data.square_feet?.toString(),
        yearBuilt: data.year_built?.toString(),
        propertyType: data.property_type,
        description: data.description,
        notes: data.notes,
        status: data.status
      };

      // Log form data without sensitive information
      console.log('Submitting form data:', {
        ...transformedData,
        address: '[REDACTED]'
      });

      await onSubmit(transformedData)
      reset()
      onClose()
      toast.success('Property added successfully')
    } catch (error) {
      console.error('Error adding property:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred while adding the property')
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl rounded bg-white p-6">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
              Add Property
            </Dialog.Title>

            <div className="mt-4 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <AddressSearch
                    onAddressSelect={handleAddressSelect}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter property address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                  {/* Hidden fields for address data */}
                  <input type="hidden" {...register('address')} />
                  <input type="hidden" {...register('city')} />
                  <input type="hidden" {...register('state')} />
                  <input type="hidden" {...register('zip_code')} />
                  <input type="hidden" {...register('latitude')} />
                  <input type="hidden" {...register('longitude')} />
                  <input type="hidden" {...register('street_number')} />
                  <input type="hidden" {...register('street_name')} />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    {...register('bedrooms', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    {...register('bathrooms', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="square_feet" className="block text-sm font-medium text-gray-700">
                    Square Feet
                  </label>
                  <input
                    type="number"
                    {...register('square_feet', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="year_built" className="block text-sm font-medium text-gray-700">
                    Year Built
                  </label>
                  <input
                    type="number"
                    {...register('year_built', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="property_type" className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    {...register('property_type')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="">Select type</option>
                    <option value="Single Family">Single Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Multi Family">Multi Family</option>
                    <option value="Land">Land</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue="Active"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Closed">Closed</option>
                    <option value="Withdrawn">Withdrawn</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={onClose}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isSubmitting ? 'Adding...' : 'Add Property'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
