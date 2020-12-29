import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string; //isso torna a propriedade name obrigatória
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...props }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    // se declarar a função como function, toda vez
    // que renderizar a tela, vai recriar a function.
    // useCallback permite que só seja criada uma vez.
    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        if (inputRef.current?.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return (
        <Container temErro={!!error} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20}/>}
            <input
                defaultValue={defaultValue}
                ref={inputRef}
                {...props}
                onFocus={() => setIsFocused(true)}
                onBlur={handleInputBlur}
            />
            {error && (
                <Error title={error}>
                    <FiAlertCircle color="c53030" size={20} />
                </Error>
            )}
        </Container>
    );
};

export default Input;
