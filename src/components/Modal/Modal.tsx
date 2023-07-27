import React, { PropsWithChildren } from "react";

import { Portal } from "components/Portal";

import css from './modal.module.scss';

export const Modal: React.FC<PropsWithChildren> = ({ children }) => {
    return <Portal>
        <div className={css.backdrop}>
            <div className={css.content}>
                {children}
            </div>
        </div>
    </Portal>;
}
