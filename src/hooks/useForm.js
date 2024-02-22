const { useState } = require("react");

const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  const resetForm = () => {
    setFormState(initialState);
  };
  return { formState, handleChange, resetForm };
};
export default useForm;
