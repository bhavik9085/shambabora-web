// MultiSelectReactSelect.tsx
import React from 'react';
import Select from 'react-select';

interface Option {
  value: number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: number[];
  onChange: (values: number[]) => void;
  placeholder?: string;
}

const MultiSelectReactSelect: React.FC<MultiSelectProps> = ({ options, value, onChange, placeholder }) => {
  const handleChange = (selectedOptions: any) => {
    if (Array.isArray(selectedOptions)) {
      onChange(selectedOptions.map((option) => option.value));
    } else {
      onChange([]);
    }
  };

  const selectedValues = options?.filter(option => value.includes(option.value));

  return (
    <Select
      isMulti
      options={options}
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      value={selectedValues}
      onChange={handleChange}
      placeholder={placeholder || 'Select options'}
    />
  );
};

export default MultiSelectReactSelect;
