import React from 'react';
import { Link } from 'react-router-dom';
import WelcomePage from './WelcomePage.module.css';

export default function Welcome({handleWelcome}) {
    
    return (
        <div className={WelcomePage.introbackground}> 
            <header className={WelcomePage.header}>
                <nav>
                    <ul className={WelcomePage['nav-list']}>
                        <li>HenryDogs</li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className={WelcomePage.container}>
                    <div className={`${WelcomePage.cards} ${WelcomePage.left}`}>
                    </div>
                    <div className={`${WelcomePage.cards} ${WelcomePage.center}`}>
                    </div>
                    <div className={`${WelcomePage.cards} ${WelcomePage.right}`}>
                    </div>
                    <div className={`${WelcomePage.cards} ${WelcomePage.four}`}>
                    </div>
                    <div className={`${WelcomePage.cards} ${WelcomePage.five}`}>
                    </div>
                </div>
                <div className={WelcomePage['main-text']}>
                    <h1>WELCOME</h1>
                    <h2><Link onClick={handleWelcome} to="/doglist">ENTER</Link></h2>
                </div>
            </main>
        </div>
    )
}