import React, { useState, useEffect } from 'react';
import styles from './Register.module.css';
import musicIcon from '../../assets/musicIcon.png'
import { useNavigate } from 'react-router-dom';
import {register} from '../../../api/auth';

function Register() {
    const [isMobile, setIsMobile] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPassErr] = useState(false);
    const navigate = useNavigate();

    const handleContinue = async () => {
        setNameError(false);
        setMobileError(false);
        setEmailError(false);
        setPassErr(false);

        if (name.trim() === '') {
            setNameError(true);
           
        }

        if (mobile.trim() === '') {
            setMobileError(true);
           
        }

        if (email.trim() === '') {
            setEmailError(true);
          
        }

        if (password.trim() === '') {
            setPassErr(true);
            return;
        }

        const data = {
            name: name,
            email: email,
            mobile: mobile,
            password: password
        };

        console.log('Data:', data);

        const response = await register(data);
        console.log(response.data)
        if (response && response.success) {
           
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.name);
                navigate('/');
              }
    };
    const navigate_login =()=>{
        navigate('/login')
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.music}>
                    <img src={musicIcon} alt="MusicIcon" className={styles.musicIcon} />
                    <span className={styles.musicartt}>Musicart</span>
                </div>
                {isMobile && <p className={styles.welcomeText}>Welcome</p>}
                <div className={styles.formContainer}>
                    {isMobile ? (
                        <p className={styles.createAcc}><b>Create account.</b> Don’t have an account?</p>
                    ) : (
                        <p className={styles.createAcc}>Create Account</p>
                    )}
                    <form className={styles.form}>
                        <label className={styles.label}><b>Your name</b></label>
                        <input type='text' className={`${styles.input} ${nameError && styles.inputError}`} value={name} onChange={(e) => setName(e.target.value)} />
                        {nameError && <span className={styles.error}>*Required Field</span>}
                        <label className={styles.label}><b>Mobile number</b></label>
                        <input type='number' className={`${styles.input} ${mobileError && styles.inputError}`} value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        {mobileError && <span className={styles.error}>*Required Field</span>}
                        <label className={styles.label}><b>Email Id</b></label>
                        <input type='email' className={`${styles.input} ${emailError && styles.inputError}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <span className={styles.error}>*Required Field</span>}
                        <label className={styles.label}><b>Password</b></label>
                        <input type='password' className={`${styles.input} ${passwordErr && styles.inputError}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                        {passwordErr && <span className={styles.error}>*Required Field</span>}
                    </form>
                    <p className={styles.desc}><b>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</b></p>
                    <button className={styles.button} onClick={handleContinue}>Continue</button>
                    <p className={styles.terms}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
                </div>
                <span className={styles.login}><b>Already have an account?</b><u onClick={navigate_login}>Sign in</u></span>
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>
        </div>
    );
}

export default Register;

