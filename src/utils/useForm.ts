import React from 'react';
import { GridEventType } from '../types';

const useForm = (data: GridEventType) => {
  const [formData, setFormData] = React.useState<GridEventType>(data);

  const updateFormProp = (key: keyof GridEventType, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  return { updateFormProp, formData };
};

export default useForm;
