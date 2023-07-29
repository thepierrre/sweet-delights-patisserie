// import { useEffect, useState } from "react";

// const useForm = (initialValues: any) => {
//   const [formValues, setFormValues] = useState(initialValues);
//   const [formValidity, setFormValidity] = useState({});
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   useEffect(() => {
//     // Initialize the formValidity based on the initial formValues
//     const initialValidity = Object.fromEntries(
//       Object.keys(initialValues).map((key) => [
//         key,
//         isInputValid(key, initialValues[key]),
//       ])
//     );
//     setFormValidity(initialValidity);
//   }, []);

//   const isInputValid = (name: string, value: any) => {
//     return name !== "isRecommended"
//       ? value !== undefined
//         ? value.trim() !== ""
//         : false
//       : true;
//   };

//   const handleInputChange = (event: React.ChangeEvent<any>) => {
//     const target = event.target;
//     const { name, value, checked, type } = target;
//     const isValid = isInputValid(name, type === "checkbox" ? checked : value);
//     setFormValues((prevValues: any) => ({
//       ...prevValues,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//     setFormValidity((prevValidity) => ({ ...prevValidity, [name]: isValid }));
//   };

//   const isFormValid = Object.values(formValidity).every((valid) => valid);

//   return {
//     formValues,
//     setFormValues,
//     formValidity,
//     handleInputChange,
//     isFormValid,
//     isFormSubmitted,
//     setIsFormSubmitted,
//   };
// };

// export default useForm;

import { useEffect, useState } from "react";

const useForm = (initialValues: any) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formValidity, setFormValidity] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    // Initialize the formValidity based on the initial formValues
    const initialValidity = Object.fromEntries(
      Object.keys(initialValues).map((key) => [
        key,
        isInputValid(key, initialValues[key]),
      ])
    );
    setFormValidity(initialValidity);
  }, []); // Empty dependency array to run the effect only once during mount

  const isInputValid = (name: string, value: any) => {
    return name !== "isRecommended"
      ? value !== undefined
        ? value.trim() !== ""
        : false
      : true;
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
