import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import cx from 'classnames';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as HelpLogoIcon } from 'assets/logo.svg';
import item1 from 'assets/item1.jpg';
import item2 from 'assets/item2.jpg';
import item3 from 'assets/item3.jpg';
import item5 from 'assets/item5.jpg';
import item6 from 'assets/item6.jpg';
import item7 from 'assets/item7.jpg';
import item8 from 'assets/item8.jpg';
import item9 from 'assets/item9.jpg';
import item10 from 'assets/item10.jpg';
import item11 from 'assets/item11.jpg';
import item12 from 'assets/item12.jpg';
import item13 from 'assets/item13.jpg';
import item14 from 'assets/item14.jpg';
import item15 from 'assets/item15.jpg';
import arrowLeft from 'assets/left.png';
import arrowRight from 'assets/right.png';

import { useAppDispatch } from "store";
import { authorizationWithoutDiia } from "store/auth/thunk";

import 'swiper/css';

import css from './homePage.module.scss';

interface Props {
    withDiia: boolean;
}

export const HomePage: React.FC<Props> = ({ withDiia }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleGoToAuth = () => {
        navigate(withDiia ? '/auth' : '/form/1');
    };

    const handleRedirect = () => {
        navigate('/public-announcement')
    }

    useEffect(() => {
        if (!withDiia) {
            dispatch(authorizationWithoutDiia());
        }
    }, [withDiia, dispatch]);

    return (
        <div className={css.root}>
            <div className={css.container}>
                <div className={css.logo}><HelpLogoIcon className={css.logoIcon} /></div>
                <div className={css.video}>
                    <iframe width="650" height="370" src="https://www.youtube.com/embed/rqtlCWzfXDk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <div className={css.videoText}>
                    Ми шукаємо 13 сімей, які втратили свою домівку та стали вимушеними переселенцями  внаслідок війни в Україні, аби забезпечити їх новою роботою та житлом.
                </div>
                <div className={css.swiperContainer}>
                    <button className={cx(css.arrow, css.arrowLeft, 'slide-prev')}>
                        <img src={arrowLeft} alt="попередній" />
                    </button>
                    <button className={cx(css.arrow, css.arrowRight, 'slide-next')}>
                        <img src={arrowRight} alt="наступний" />
                    </button>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.slide-prev',
                            nextEl: '.slide-next'
                        }}
                        modules={[Navigation]}
                    >
                        <SwiperSlide><img src={item1} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item2} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item3} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item5} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item6} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item7} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item8} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item9} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item10} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item11} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item12} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item13} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item14} className={css.itemImg} alt='' /></SwiperSlide>
                        <SwiperSlide><img src={item15} className={css.itemImg} alt='' /></SwiperSlide>

                    </Swiper>
                </div>
                <div className={css.text}>
                    Наш проєкт пропонує отримання нового житла та оплачуваної роботи у Новобасанській громаді, Чернігівської області, з подальшою передачею будинку у вашу приватну власність.
                </div>
                <div className={css.text}>
                    Головні умови — проживання в будинку та робота на посаді згідно кадровим потребам громади не менше 5 років
                </div>
                <ul className={css.list}>
                    <strong>Для того, щоб взяти участь у нашій програмі:</strong>
                    <li>ви повинні перебувати на обліку внутрішньо переміщених осіб та мати підтверджуючі документи, передбачені чинним законодавством України;</li>
                    <li>ви не маєте можливості користуватися власною житловою нерухомістю за місцем свого походження (попередньої реєстрації місця проживання) або в іншій країні;</li>
                    <li>ви та члени вашої сім'ї не відчужували, не дарували або не обмінювали нерухоме майно в Україні, за місцем походження або в іншій країні, за допомогою якого ви могли б вирішити свої житлові потреби;</li>
                    <li>ви та члени вашої сім'ї не володіють нерухомістю в Україні, за допомогою якої ви можете безпечно задовольнити свої житлові потреби;</li>
                    <li>ви та члени вашої сім'ї не є бенефіціарами іншої програми із забезпечення житлом, за допомогою якої ви могли б вирішити або вирішили свої житлові потреби;</li>
                    <li>ви та члени вашої сім'ї не мають достатнього рівня доходів, за допомогою яких могли б вирішити свої житлові потреби.</li>
                    <li>Мати одну з перелічених кваліфікацій: <strong>вчитель англійської мови <br />
                        сімейний лікар <br />
                        лікар-педіатр <br />
                        нотаріус <br />
                        програміст <br />
                        бухгалтер <br />
                        тренер <br />
                        механізатор <br />
                        електрик <br />
                        юрист <br />
                        хореограф </strong></li>
                </ul>
                <div className={cx(css.text, css.center)}>
                    <strong>Період прийому заявок від бенефіціарів на участь у конкурсі: з 07.07.2023 по 07.09.2023</strong>
                </div>
                <div className={cx(css.text, css.center)}>
                    <strong>Для участі у проєкті потрібно надати копію довідки ВПО через застосунок Дія та заповнити анкету.</strong>
                </div>
                <div className={css.btnWrapper}>
                    <Button
                        variant="contained"
                        className={css.btn}
                        type="button"
                        onClick={handleGoToAuth}
                    >
                        Взяти участь
                    </Button>
                </div>
                <div className={css.text}>
                    Ознайомитись детальними умовами участі можна по посиланню <span className={css.link} onClick={handleRedirect}>Умови участі</span>
                </div>
                <div className={css.text}>
                    Проєкт реалізований Благодійною організацією «Благодійним фондом <strong>«Район номер 1»</strong> та за фінансової підтримки міжнародної гуманітарної організації <strong>Help – Hilfe zur Selbsthilfe</strong> в Україні.
                </div>
            </div>
        </div>
    );
}
