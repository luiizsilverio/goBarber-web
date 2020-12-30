import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

type PartialAuthState = Partial<AuthState>;

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
}

type PartialAuthContextData = Partial<AuthContextData>;

const AuthContext = createContext<PartialAuthContextData>({});

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<PartialAuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');
        if (token && user) {
            return { token, user: JSON.parse(user) }
        }

        return {};
    });

    const signIn = useCallback(async ({ email, password }) => {
        console.log('signin', email, password);
        const response = await api.post('sessions', {
            email,
            password,
        });

        //console.log(response.data);
        const { token, user } = response.data;
        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
