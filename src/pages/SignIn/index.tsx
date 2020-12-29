import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useContext(AuthContext);

    const handleSubmit = useCallback(async (data: object) => {
        // define o  formato da validação
        const schema = Yup.object().shape({
            email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
            password: Yup.string()
                .required('Senha não informada'),
        });

        formRef.current?.setErrors({}); //limpa os erros
        try {
            //await schema.validate(data); // pára no primeiro erro
            await schema.validate(data, {
                abortEarly: false,  // faz todas as validações; não pára no primeiro erro
            });

            signIn();
        }
        catch (err) {
            //console.log(err.errors);
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, [signIn]);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email"
                        icon={FiMail}
                        placeholder="E-mail"
                    />
                    <Input name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="login">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>

            <Background />
        </Container>
    );
};

export default SignIn;
