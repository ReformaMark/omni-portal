import { useState } from 'react';

export const usePasswordVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return {
        inputType: isVisible ? "text" : "password",
        isVisible,
        toggleVisibility
    };
};