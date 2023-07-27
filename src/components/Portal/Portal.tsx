import React, { PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import css from './portal.module.scss';

export const Portal: React.FC<PropsWithChildren> = ({ children }) => {
    const container = useRef(document.createElement('div'));

    useEffect(() => {
        const containerEl = container.current;
        containerEl.classList.add(css.root);
        document.body.appendChild(containerEl);

        return () => {
            document.body.removeChild(containerEl);
        };
    }, []);

    return ReactDOM.createPortal(children, container.current);
};