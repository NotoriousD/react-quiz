import React, { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { getDataFromStorage, setDataToStorage } from "helpers/sessionStorage";

import { ErrorMessage } from "components/ErrorMessage";

import css from './loginPage.module.scss';
import { Navigate } from "react-router-dom";

interface Auth {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = getDataFromStorage('token');

    const schema = yup.object().shape({
        username: yup.string().required("Поле є обов'язковим"),
        password: yup.string().required("Поле є обов'язковим")
    });

    const { handleSubmit, formState: { errors }, control } = useForm<Auth>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleAuthorization = async (auth: Auth) => {
        try {
            const response = await axios.post('https://help-ukraine.org.ua/wp-json/jwt-auth/v1/token', auth);
            if (response.data?.data) {
                return response.data.data;
            }
        } catch (e) {
            //@ts-ignore
            setError(e.response.data.message);
            setSubmitting(false);
        }
    }

    const handleLogin = async (data: Auth) => {
        setError(null);
        setSubmitting(true);
        const response = await handleAuthorization(data);
        if (response.token) {
            setSubmitting(false);
            setDataToStorage('token', response.token);
            navigate('/admin/list');
        }
    };

    if (token) {
        return <Navigate to="/admin/list" />
    }

    return <div className={css.root}>
        <form onSubmit={handleSubmit(handleLogin)} className={css.form}>
            <div className={css.title}>
                Авторизація
            </div>
            {error && (
                <ErrorMessage
                    message={error}
                />
            )}
            <div className={css.row}>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Username"
                            className={css.textField}
                        />
                    )}
                />
                {errors?.username && (
                    <ErrorMessage
                        message={String(errors?.username.message)}
                    />
                )}
            </div>
            <div className={css.row}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Password"
                            className={css.textField}
                            type="password"
                        />
                    )}
                />
                {errors?.password && (
                    <ErrorMessage
                        message={String(errors?.password.message)}
                    />
                )}
            </div>
            <div className={css.row}>
                <Button
                    variant="contained"
                    className={css.btn}
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Авторизуватися
                </Button>
            </div>
        </form>
    </div>;
}
