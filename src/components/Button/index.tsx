import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

//quando não tem mudança na interface, podemos usar type ao invés de interface
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

//children é o que vem dentro do botão, ou seja, o texto "Enviar"
const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <Container type="button" {...props}>
        {children}
    </Container>
);

export default Button;
