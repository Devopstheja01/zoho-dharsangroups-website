'use client';

import React, { useState } from 'react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (mobile: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isHuman, setIsHuman] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!mobile || mobile.length < 10) {
            setError('Please enter a valid mobile number');
            return;
        }
        if (!isHuman) {
            setError('Please verify you are human');
            return;
        }
        setError('');
        setStep('otp');
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === '1234') { // Mock OTP
            onLogin(mobile);
            onClose();
        } else {
            setError('Invalid OTP. Try 1234');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>

                <h2 className={styles.title}>Login / Register</h2>

                {step === 'phone' ? (
                    <form onSubmit={handleSendOtp} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Enter 10 digit number"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.captchaGroup}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={isHuman}
                                    onChange={(e) => setIsHuman(e.target.checked)}
                                />
                                <span>I am human (Mock Captcha)</span>
                            </label>
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className={styles.submitBtn}>
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className={styles.form}>
                        <p className={styles.info}>OTP sent to {mobile}</p>
                        <div className={styles.inputGroup}>
                            <label>Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP (Use 1234)"
                                className={styles.input}
                            />
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className={styles.submitBtn}>
                            Verify & Login
                        </button>
                        <button
                            type="button"
                            className={styles.backBtn}
                            onClick={() => setStep('phone')}
                        >
                            Back
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
