import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
        // define o  formato da validação
        const schema = Yup.object().shape({
            name: Yup.string()
                .required('Nome obrigatório'),
            email: Yup.string()
                .required('E-mail obrigatório')
                .email('Digite um e-mail válido'),
            password: Yup.string()
                .min(6, 'Informe no mínimo 6 dígitos'),
        });

        formRef.current?.setErrors({}); //limpa os erros
        try {
            //await schema.validate(data); // pára no primeiro erro
            await schema.validate(data, {
                abortEarly: false,  // faz todas as validações; não pára no primeiro erro
            });
        }
        catch (err) {
            //console.log(err.errors);
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef}
                    onSubmit={handleSubmit}
                    //initialData={{ name: 'Luiz' }}
                >
                    <h1>Faça seu cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="login">
                    <FiArrowLeft />
                    Voltar para logon
                </a>
            </Content>
        </Container>
    )
};

export default SignUp;
