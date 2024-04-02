import React, { useState, useEffect } from 'react';
import musicIcon from '../../assets/musicIcon.png'
import styles from './LoginPage.module.css'
import { useNavigate } from 'react-router-dom';
import {login}from '../../../api/auth'


function LoginPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordErr, setPassErr] = useState(false)
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();
   
  
    const handleContinue = async () => {
        setEmailError(false);
        setPassErr(false);
    
        if (email.trim() === '' && mobile.trim() === '') {
            setEmailError(true);
           
        }
    
        if (password.trim() === '') {
            setPassErr(true);
            return;
        }
    
        let data = {};
        if (email.trim() !== '') {
            // Check if email is valid
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
                data = { ...data, email: email }; // Include email if provided
            } else {
                data = { ...data, mobile: email }; // If not email, treat as mobile number
            }
        }
        if (mobile.trim() !== '') {
            data = { ...data, mobile: mobile }; // Include mobile if provided
        }
        data = { ...data, password: password };
    
        console.log(`Data: ${JSON.stringify(data)}`);
    
        const response = await login(data);
        if (response && response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.name);
            navigate('/');
          } else {
            // Handle unsuccessful login (optional)
            console.log("Login unsuccessful:", response ? response.errorMessage : "Response is undefined");
          }
        
      };

    
    

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
    const Register_navigation =()=>{
        navigate('/register')
    }
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

                <button className={styles.registerButton}onClick={Register_navigation}> Create your Musicart account</button>
            </div>
            <div className={styles.footer}>
                <p className={styles.footerText}>Musicart | All rights reserved</p>
            </div>  

        </div>
    )
}

export default LoginPage;
