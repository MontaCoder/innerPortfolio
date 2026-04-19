import React, { useEffect, useState, useCallback } from 'react';
import colors from '../../constants/colors';
import twitterIcon from '../../assets/pictures/contact-twitter.png';
import ghIcon from '../../assets/pictures/contact-gh.png';
import inIcon from '../../assets/pictures/contact-in.png';
import emailjs from '@emailjs/browser';

export interface ContactProps {}

// function to validate email
const validateEmail = (email: string) => {
    const re =
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

interface SocialBoxProps {
    icon: string;
    link: string;
    label: string;
}

const SocialBox: React.FC<SocialBoxProps> = ({ link, icon, label }) => {
    return (
        <a rel="noreferrer" target="_blank" href={link} aria-label={label}>
            <div className="big-button-container" style={styles.social}>
                <img src={icon} alt="" style={styles.socialImage} />
            </div>
        </a>
    );
};

const Contact: React.FC<ContactProps> = () => {
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formMessageColor, setFormMessageColor] = useState('');

    const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    useEffect(() => {
        if (validateEmail(email) && name.length > 0 && message.length > 0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, name, message]);

    const handleSubmit = useCallback(() => {
        if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
            setFormMessage(
                'Contact form is temporarily unavailable. Please email me directly.'
            );
            setFormMessageColor(colors.red);
            return;
        }

        if (isFormValid) {
            setIsLoading(true);
            emailjs
                .send(
                    emailServiceId,
                    emailTemplateId,
                    {
                        company,
                        email,
                        name,
                        message,
                    },
                    emailPublicKey
                )
                .then((res) => {
                    if (res.status === 200) {
                        setFormMessage(
                            `Message successfully sent. Thank you ${name}!`
                        );
                        setCompany('');
                        setEmail('');
                        setName('');
                        setMessage('');
                        setFormMessageColor(colors.blue);
                        setIsLoading(false);
                    } else {
                        setFormMessage(
                            'There was an error sending your message. Please try again.'
                        );
                        setFormMessageColor(colors.red);
                        setIsLoading(false);
                    }
                })
                .catch(() => {
                    setFormMessage(
                        'There was an error sending your message. Please try again.'
                    );
                    setFormMessageColor(colors.red);
                    setIsLoading(false);
                });
        } else {
            setFormMessage('Form unable to validate, please try again.');
            setFormMessageColor(colors.red);
        }
    }, [
        company,
        email,
        name,
        message,
        isFormValid,
        emailServiceId,
        emailTemplateId,
        emailPublicKey,
    ]);

    useEffect(() => {
        if (formMessage.length === 0) return;

        const timerId = window.setTimeout(() => {
            setFormMessage('');
            setFormMessageColor('');
        }, 4000);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [formMessage]);

    return (
        <div className="site-page-content">
            <div style={styles.header}>
                <h1>Contact</h1>
                <div style={styles.socials}>
                    <SocialBox
                        icon={ghIcon}
                        link={'https://github.com/MontaCoder'}
                        label={'Open GitHub profile'}
                    />
                    <SocialBox
                        icon={inIcon}
                        link={'https://www.linkedin.com/in/montassarhajri/'}
                        label={'Open LinkedIn profile'}
                    />
                    <SocialBox
                        icon={twitterIcon}
                        link={'https://www.x.com/MontaCoder/'}
                        label={'Open X profile'}
                    />
                </div>
            </div>
            <div className="text-block">
                <p>
                    I am currently open to freelance work, however if you have
                    any opportunities, feel free to reach out - I would love to
                    chat! You can reach me via my personal email, or fill out
                    the form below!
                </p>
                <br />
                <p>
                    <b>Email: </b>
                    <a href="mailto:Montassarhajri@outlook.com">
                        Montassarhajri@outlook.com
                    </a>
                </p>

                <div style={styles.form}>
                    <label htmlFor="contact-name">
                        <p>
                            {!name && <span style={styles.star}>*</span>}
                            <b>Your name:</b>
                        </p>
                    </label>
                    <input
                        id="contact-name"
                        style={styles.formItem}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="contact-email">
                        <p>
                            {!validateEmail(email) && (
                                <span style={styles.star}>*</span>
                            )}
                            <b>Email:</b>
                        </p>
                    </label>
                    <input
                        id="contact-email"
                        style={styles.formItem}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="contact-company">
                        <p>
                            <b>Company (optional):</b>
                        </p>
                    </label>
                    <input
                        id="contact-company"
                        style={styles.formItem}
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <label htmlFor="contact-message">
                        <p>
                            {!message && <span style={styles.star}>*</span>}
                            <b>Message:</b>
                        </p>
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        placeholder="Message"
                        style={styles.formItem}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div style={styles.buttons}>
                        <button
                            className="site-button"
                            style={styles.button}
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            onClick={handleSubmit}
                        >
                            {!isLoading ? (
                                'Send Message'
                            ) : (
                                <p className="loading">Sending</p>
                            )}
                        </button>
                        <div style={styles.formInfo}>
                            <p
                                style={Object.assign(
                                    {},
                                    { color: formMessageColor }
                                )}
                            >
                                <b>
                                    <sub>
                                        {formMessage
                                            ? `${formMessage}`
                                            : ' All messages get forwarded straight to my personal email'}
                                    </sub>
                                </b>
                            </p>
                            <p>
                                <sub>
                                    {!isFormValid ? (
                                        <span>
                                            <b style={styles.star}>*</b> =
                                            required
                                        </span>
                                    ) : (
                                        '\xa0'
                                    )}
                                </sub>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    form: {
        flexDirection: 'column',
        marginTop: 32,
    },
    formItem: {
        marginTop: 4,
        marginBottom: 16,
    },
    socialImage: {
        width: 36,
        height: 36,
    },
    buttons: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formInfo: {
        textAlign: 'right',

        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingLeft: 24,
    },
    star: {
        paddingRight: 4,
        color: 'red',
    },
    button: {
        minWidth: 184,
        height: 32,
    },
    header: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    socials: {
        marginBottom: 16,
        justifyContent: 'flex-end',
    },
    social: {
        width: 4,
        height: 4,
        // borderRadius: 1000,

        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
};

export default Contact;
