import React, { useState, useRef } from 'react';
import { Autocomplete, Loader } from '@mantine/core';

interface AutocompleteLoadingProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function AutocompleteLoading({ value, onChange, error }: AutocompleteLoadingProps,) {
  const timeoutRef = useRef<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    onChange(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
      },);
    }
  };

  return (
    <Autocomplete
      value={value}
      data={data}
      error={error}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      label="Email"
      placeholder="Your email"
    />
  );
}
