import React, { memo, useEffect } from "react";
import { useTimer } from "react-timer-hook";

import css from './timer.module.scss';

export const Timer: React.FC<{ time: Date }> = memo(({ time }) => {

    const { seconds, minutes, restart } = useTimer({ expiryTimestamp: time, })

    useEffect(() => {
        restart(time);
    }, [time, restart]);

    return <div className={css.root}>
        <div className={css.timer}>
            Термін дії QR-коду: <strong>{minutes} : {seconds}</strong>
        </div>
    </div>;
});
