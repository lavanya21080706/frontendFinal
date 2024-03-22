import React, { useState, useEffect } from 'react';
import musicIcon from '../../assets/musicIcon.png'
import styles from './LoginPage.module.css'

function LoginPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordErr, setPassErr] = useState(false)

    const handleContinue = () => {

        setEmailError(false)
        setPassErr(false);

        if (email.trim() === '') {
            setEmailError(true)
        }
        if (password.trim() === '') {
            setPassErr(true)
        }
    }


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    return (
        <div className={styles.loginContainer}>
            <div className={styles.content}>
                <div className={styles.music}>
                    <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                    <span className={styles.musicartt}>Musicart</span>
                </div>
                {isMobile && <p className={styles.welcomeText}>Welcome</p>}
                <div className={styles.formContainer}>
                    {isMobile ? (
                        <p className={styles.createAcc}><b>Sign in.</b> Already a customer?</p>
                    ) : (
                        <p className={styles.createAcc}>Sign in</p>
                    )}
                    <form className={styles.form}>
                        <label className={styles.label}><b>Enter your email or mobile number</b></label>
                        <input type='email' className={`${styles.input} ${emailError && styles.inputError}`} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        {emailError && <span className={styles.error}>*Required Field</span>}
                        <label className={styles.label}><b>Password</b></label>
                        <input type='password' className={`${styles.input} ${passwordErr && styles.inputError}`} value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        {passwordErr && <span className={styles.error}>*Required Field</span>}
                    </form>
                    <button className={styles.button} onClick={handleContinue}>Continue</button>
                    <p className={styles.terms}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                </div>
                <div className={styles.lineContainer}>
                    <div className={styles.line}/>
                    <span className={styles.text}>New to Musicart?</span>
                    <div className={styles.line}/>
                </div>

                <button className={styles.registerButton}>Create your Musicart account</button>
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>

        </div>
    )
}

export default LoginPage;