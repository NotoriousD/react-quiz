import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import Button from '@mui/material/Button';

import { API } from 'api/API';
import { FormFields, Document, questionnaireText } from 'types';

import { Container } from "components/Container";

import { Group } from './modules/Group';

import css from './questionnarie.module.scss';

interface Questionnarie {
    data: string;
    score: number;
    fullName: string;
    timestamp: number;
}

export const QuestionnariePage: React.FC = () => {
    const [data, setData] = useState<Questionnarie | null>(null);
    const [documents, setDocuments] = useState<Document[] | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getQuestionnarie = useCallback(async () => {
        const response = await API.getQuestionnarie({ requestId: id as string });

        if (response) {
            setData(response);
        }
    }, [id]);

    const getQuestionnarieImages = useCallback(async () => {
        const response = await API.getQuizFiles({ requestId: id as string });

        if (response) {
            setDocuments(response.data);
        }
    }, [id]);

    useEffect(() => {
        if (id && !data) {
            getQuestionnarie();
            getQuestionnarieImages()
        }
    }, [id, data, getQuestionnarie, getQuestionnarieImages]);

    const questionnarie = useMemo((): FormFields | null => {
        if (data) {
            const buff = Buffer.from(data.data, 'base64').toString('utf8');
            return JSON.parse(buff);
        }

        return null;
    }, [data]);

    return <div className={css.root}>
        <div className={css.back}>
            <Button
                variant="contained"
                className={css.btn}
                size="small"
                onClick={() => navigate(-1)}
            >
                Повернутися
            </Button>
        </div>
        <Container>
            <div className={css.content}>
                <div className={css.fullName}>{data?.fullName || 'None'} <div>Загальна оцінка: <strong>{data?.score}</strong></div></div>
                <hr />
                {questionnarie && documents && Object.entries(questionnaireText).map(([key, value]) => (
                    <Group name={key as keyof FormFields} key={key} title={value} data={questionnarie} documents={documents} />
                ))}
            </div>
        </Container>
    </div>;
}
