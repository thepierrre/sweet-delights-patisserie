import { useState } from "react";

const useForm = (initialValues: any) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formValidity, setFormValidity] = useState({});

  const handleInputChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    const isValid = value.trim() !== "";
    setFormValues((prevValues: any) => ({ ...prevValues, [name]: value }));
    setFormValidity((prevValidity) => ({ ...prevValidity, [name]: isValid }));
  };

  const isFormValid = Object.values(formValidity).every((valid) => valid);

  return {
    formValues,
    formValidity,
    handleInputChange,
    isFormValid,
  };
};

export default useForm;
