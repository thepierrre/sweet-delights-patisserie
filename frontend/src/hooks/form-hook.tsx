import { useEffect, useState } from "react";

const useForm = (initialValues: any) => {
  // Set default values for category and paymentOption if not provided
  const defaultValues = {
    ...initialValues,
    category: initialValues.category || "Cupcakes",
    paymentOption: initialValues.paymentOption || "cash",
  };

  const [formValues, setFormValues] = useState(defaultValues);
  const [formValidity, setFormValidity] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const initialValidity = Object.fromEntries(
      Object.keys(defaultValues).map((key) => [
        key,
        isInputValid(key, defaultValues[key]),
      ])
    );
    setFormValidity(initialValidity);
  }, []);

  const isInputValid = (name: any, value: any) => {
    if (name !== "isRecommended") {
      if (typeof value === "number") {
        return true; // Numeric fields are always considered valid
      } else {
        return value !== undefined ? value.trim() !== "" : false;
      }
    } else {
      return true;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    const target = event.target;
    const { name, value, checked, type } = target;
    const isValid = isInputValid(name, type === "checkbox" ? checked : value);
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormValidity((prevValidity) => ({ ...prevValidity, [name]: isValid }));
    // console.log(formValues);
  };

  const isFormValid = Object.values(formValidity).every((valid) => valid);

  return {
    formValues,
    setFormValues,
    formValidity,
    handleInputChange,
    isFormValid,
    isFormSubmitted,
    setIsFormSubmitted,
  };
};

export default useForm;
