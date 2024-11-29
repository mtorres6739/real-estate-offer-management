'use client';

import { useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';

const libraries = ['places'] as const;

interface AddressSearchProps {
  onAddressSelect: (address: {
    formattedAddress: string;
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
  }) => void;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
}

export function AddressSearch({
  onAddressSelect,
  defaultValue = '',
  className = '',
  placeholder = 'Enter an address...',
}: AddressSearchProps) {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY_NEW || '',
    libraries: libraries,
  });

  const [inputValue, setInputValue] = useState(defaultValue);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    autoCompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'us' },
      fields: ['address_components', 'formatted_address', 'geometry'],
    });

    autoCompleteRef.current.addListener('place_changed', () => {
      if (!autoCompleteRef.current) return;

      const place = autoCompleteRef.current.getPlace();
      if (!place.address_components || !place.geometry?.location) return;

      const addressComponents = place.address_components;
      const addressData = {
        formattedAddress: place.formatted_address || '',
        streetNumber: '',
        streetName: '',
        city: '',
        state: '',
        zipCode: '',
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      for (const component of addressComponents) {
        const type = component.types[0];
        switch (type) {
          case 'street_number':
            addressData.streetNumber = component.long_name;
            break;
          case 'route':
            addressData.streetName = component.long_name;
            break;
          case 'locality':
            addressData.city = component.long_name;
            break;
          case 'administrative_area_level_1':
            addressData.state = component.short_name;
            break;
          case 'postal_code':
            addressData.zipCode = component.long_name;
            break;
        }
      }

      setInputValue(addressData.formattedAddress);
      onAddressSelect(addressData);
    });

    return () => {
      if (autoCompleteRef.current) {
        google.maps.event.clearInstanceListeners(autoCompleteRef.current);
      }
    };
  }, [isLoaded, onAddressSelect]);

  if (!isLoaded) {
    return <Input value="Loading..." disabled />;
  }

  return (
    <Input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
}
