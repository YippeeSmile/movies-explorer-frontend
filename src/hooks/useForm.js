import { useCallback, useState } from "react";

export function useFormValidation() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValues({...values, [name]: value });
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        }, [setValues, setErrors, setIsValid]
    );

    return { values, setValues, handleChange, errors, setErrors, isValid, setIsValid, resetForm };
}