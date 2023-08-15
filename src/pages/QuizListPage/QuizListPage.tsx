import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

import { API } from 'api/API';

import { Container } from "components/Container";

import css from './quizListPage.module.scss';

interface Quiz {
    id: string;
    fullName?: string;
    score: number;
    timestamp?: number;
}

export const QuizListPage: React.FC = () => {
    const [quizList, setQuizList] = useState<Quiz[] | null>(null);
    const navigate = useNavigate();

    const getList = useCallback(async () => {
        const res = await API.getQuestionnarieList();

        if (res.data) {
            setQuizList(res.data);
        }

        return res;
    }, []);

    useEffect(() => {
        getList();
    }, [getList]);

    return <div className={css.root}>
        <Container>
            <div className={css.title}>Анкети</div>
            <div className={css.content}>
                <div className={css.table}>
                    <div className={css.head}>
                        <div className={css.row}>
                            <div className={cx(css.col, css.th)}>ФІО</div>
                            <div className={cx(css.col, css.th)}>Дата</div>
                            <div className={cx(css.col, css.th)}>Кіл-сть балів</div>
                            <div className={cx(css.col, css.th)}></div>
                        </div>
                    </div>
                    <div className={css.body}>
                        {quizList && quizList.map((quiz) => {
                            const date = quiz.timestamp ? dayjs(quiz.timestamp as number).format('MMM D, YYYY') : 'unknown'
                            return (
                                <div className={css.row} key={quiz.id}>
                                    <div className={cx(css.col, css.td)}>{quiz?.fullName || 'Test'}</div>
                                    <div className={cx(css.col, css.td)}>{date.toString()}</div>
                                    <div className={cx(css.col, css.td)}>{quiz.score}</div>
                                    <div className={cx(css.col, css.td)}>
                                        <Button
                                            variant="contained"
                                            className={css.btn}
                                            size="small"
                                            onClick={() => navigate(`/admin/list/${quiz.id}`)}
                                        >
                                            Переглянути
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Container>
    </div>;
}
