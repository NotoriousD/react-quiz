import React, { ReactNode, useMemo, useState } from "react";
import Button from '@mui/material/Button';
import cx from 'classnames';

import { FormFields, Document } from 'types';
import { assertToString, assertToObject, assertToFamilyInstance } from 'helpers/asserts';

import css from './group.module.scss';
import { Modal } from "components/Modal";

interface Props {
    name: keyof FormFields;
    title: string;
    data: FormFields;
    documents: Document[];
}

export const Group: React.FC<Props> = ({ name, title, data, documents }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentDoc, setCurrentDoc] = useState<Document | null>(null);
    const isFamilyKey = name === 'family';
    const questionnarie = data[name as keyof FormFields];

    const document = useMemo(() => {
        if (!isFamilyKey) {
            const doc = documents.filter(({ inputName }) => inputName === name);
            return doc ? doc : [];
        }
        return [];
    }, [name, isFamilyKey, documents]);

    const getFamilyDocument = (name: string, index: number) => {
        const doc = documents.find(({ inputName }) => inputName === `${name}-${index}`);
        return doc ? doc : null;
    }

    const handleDownloadScan = (doc: Document) => {
        window.open(`https://api.help-ukraine.org.ua${doc.path}`, '_blank')
    }

    const renderValue = (value: any): ReactNode => {
        if (typeof value === 'string' || typeof value === 'number') {
            return <div className={css.answer}>Додатково: <strong>{value}</strong></div>
        }

        if (Array.isArray(value)) {
            return value.map(({ name, value }) => (
                <div className={css.answer}>Додатково: <strong>{name} - {value}</strong></div>
            ));
        }

        if (typeof value === 'object' && 'name' in value && 'value' in value) {
            return <div className={css.answer}>Додатково: <strong>{value?.name} - {value?.value}</strong></div>
        }
    }

    const handleOpenModal = (doc: Document) => {
        setCurrentDoc(doc);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setCurrentDoc(null);
        setOpenModal(false);
    }

    const renderFields = (): ReactNode => (
        <div className={css.row}>
            <div className={css.col}>
                <div className={css.title}>{title}:</div>
                {assertToString(questionnarie) && (
                    <div className={css.answers}>
                        <div className={css.answer}>Відповідь: {questionnarie}</div>
                    </div>
                )}

                {assertToObject(questionnarie) && (
                    <>
                        <div className={css.answers}>
                            {Boolean(questionnarie.key) && <div className={css.answer}>Відповідь: {questionnarie.key}</div>}
                            {Boolean(questionnarie?.value) && renderValue(questionnarie.value)}
                            {Boolean(questionnarie?.score) && <div className={css.answer}>Оцінка: <strong>{questionnarie.score}</strong></div>}
                        </div>
                    </>
                )}
            </div>
            <div className={css.col}>
                {document.length ? (
                    <div className={css.doc}>
                        <div className={css.title}>Документ(и):</div>
                        {document.map((doc) => (
                            <div className={css.actions} key={doc.originalName}>
                                <Button
                                    variant="contained"
                                    className={css.btn}
                                    size="small"
                                    onClick={() => handleOpenModal(doc)}
                                >
                                    Переглянути документ
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={css.btn}
                                    size="small"
                                    onClick={() => handleDownloadScan(doc)}
                                >
                                    Завантажити документ
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );

    const renderFamilyFields = () => {
        return <div className={css.family}>
            <div className={css.answer}>Оцінка: {assertToFamilyInstance(questionnarie) && (<strong>{questionnarie.score}</strong>)}</div>
            <div className={css.title}>{title}:</div>
            <div className={css.table}>
                <div className={css.head}>
                    <div className={css.tableRow}>
                        <div className={css.th}>ПІБ</div>
                        <div className={css.th}>Вік</div>
                        <div className={css.th}>Дохід до 22 лютого 2022</div>
                        <div className={css.th}>Дохід після 22 лютого 2022</div>
                        <div className={css.th}>Тип відносин</div>
                        <div className={css.th}>Соціальний стан</div>
                    </div>
                </div>
                <div className={css.body}>
                    {assertToFamilyInstance(questionnarie) && questionnarie.data.map((member, index) => {
                        const pibDoc = getFamilyDocument('pibDoc', index);
                        const incomeBeforeDoc = getFamilyDocument('avgIncomeBeforeDoc', index);
                        const incomeAfterDoc = getFamilyDocument('avgIncomeAfterDoc', index);
                        return (
                            <div className={css.tableRow} key={member.pib + index}>
                                <div className={cx(css.td, css.withActions)}>
                                    {member.pib}
                                    {pibDoc && (
                                        <div className={css.actions}>
                                            <Button
                                                variant="contained"
                                                className={css.btn}
                                                size="small"
                                                onClick={() => handleOpenModal(pibDoc)}
                                            >
                                                Переглянути документ
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                className={css.btn}
                                                size="small"
                                                onClick={() => handleDownloadScan(pibDoc)}
                                            >
                                                Завантажити документ
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className={css.td}>{member.age}</div>
                                <div className={cx(css.td, css.withActions)}>
                                    {member.avgIncomeBefore} грн
                                    {incomeBeforeDoc && (
                                        <div className={css.actions}>
                                            <Button
                                                variant="contained"
                                                className={css.btn}
                                                size="small"
                                                onClick={() => handleOpenModal(incomeBeforeDoc)}
                                            >
                                                Переглянути документ
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                className={css.btn}
                                                size="small"
                                                onClick={() => handleDownloadScan(incomeBeforeDoc)}
                                            >
                                                Завантажити документ
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className={cx(css.td, css.withActions)}>
                                    {member.avgIncomeAfter} грн
                                    {incomeAfterDoc && (
                                        <div className={css.actions}>
                                            <Button
                                                variant="contained"
                                                className={css.btn}
                                                size="small"
                                                onClick={() => handleOpenModal(incomeAfterDoc)}
                                            >
                                                Переглянути документ
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                className={css.btn}
                                                size="small"
                                                onClick={() => handleDownloadScan(incomeAfterDoc)}
                                            >
                                                Завантажити документ
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className={css.td}>{member.relationship}</div>
                                <div className={css.td}>{member.socialStatus.key} {member.socialStatus.value && `- ${member.socialStatus.value}`}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    }

    return <div className={css.root}>
        {openModal && currentDoc && (
            <Modal>
                <img className={css.doc} src={`https://api.help-ukraine.org.ua${currentDoc.path}`} alt={currentDoc?.originalName} />
                <Button
                    variant="contained"
                    className={css.btn}
                    type="button"
                    onClick={handleCloseModal}
                >
                    Закрити
                </Button>
            </Modal>
        )}
        {!isFamilyKey && renderFields()}
        {isFamilyKey && renderFamilyFields()}
        <hr />
    </div>;
}
