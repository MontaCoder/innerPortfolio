import React, { useCallback, useEffect, useMemo, useState } from 'react';
import colors from '../../constants/colors';
import twitterIcon from '../../assets/pictures/contact-twitter.png';
import ghIcon from '../../assets/pictures/contact-gh.png';
import inIcon from '../../assets/pictures/contact-in.png';
import printerGif from '../../assets/resume/printer.gif';
import emailjs from '@emailjs/browser';
import { useMontaSession } from '../../session/montaSession';

export interface ContactProps {
    embedded?: boolean;
}

export const validateEmail = (email: string) => {
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

const Contact: React.FC<ContactProps> = ({ embedded }) => {
    const session = useMontaSession();
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formMessageColor, setFormMessageColor] = useState('');
    const [receiptId, setReceiptId] = useState('');
    const [shareMessage, setShareMessage] = useState('');

    const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const visitorBadge = useMemo(() => {
        const visitedCount = session.visitedAppKeys.length;
        const unlockedCount = session.unlockedAppKeys.length;
        const achievementCount = session.achievements.length;

        return [
            'MontaOS Visitor Card',
            `Apps discovered: ${visitedCount}`,
            `Hidden unlocks: ${unlockedCount}`,
            `Achievements: ${achievementCount}`,
            `Generated: ${new Date().toLocaleString()}`,
        ].join('\n');
    }, [session]);

    useEffect(() => {
        setIsFormValid(validateEmail(email) && name.length > 0 && message.length > 0);
    }, [email, name, message]);

    const showReceipt = useCallback((visitorName: string) => {
        const nextReceiptId = `GB-${Date.now().toString().slice(-6)}`;
        setReceiptId(nextReceiptId);
        setFormMessage(`Guestbook receipt ${nextReceiptId} saved. Thank you ${visitorName}!`);
        setFormMessageColor(colors.blue);
    }, []);

    const handleSubmit = useCallback(() => {
        if (!isFormValid) {
            setFormMessage('Form unable to validate, please try again.');
            setFormMessageColor(colors.red);
            return;
        }

        if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
            setFormMessage(
                'Guestbook mail is temporarily unavailable. Please email me directly.'
            );
            setFormMessageColor(colors.red);
            return;
        }

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
                    showReceipt(name);
                    setCompany('');
                    setEmail('');
                    setName('');
                    setMessage('');
                } else {
                    setFormMessage(
                        'There was an error sending your message. Please try again.'
                    );
                    setFormMessageColor(colors.red);
                }
            })
            .catch(() => {
                setFormMessage(
                    'There was an error sending your message. Please try again.'
                );
                setFormMessageColor(colors.red);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [
        company,
        email,
        name,
        message,
        isFormValid,
        emailServiceId,
        emailTemplateId,
        emailPublicKey,
        showReceipt,
    ]);

    const copyVisitorBadge = async () => {
        try {
            await navigator.clipboard.writeText(visitorBadge);
            setShareMessage('Visitor card copied.');
        } catch {
            setShareMessage('Clipboard unavailable. Select the card text manually.');
        }
    };

    useEffect(() => {
        if (formMessage.length === 0) return;

        const timerId = window.setTimeout(() => {
            setFormMessage('');
            setFormMessageColor('');
        }, 4800);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [formMessage]);

    useEffect(() => {
        if (!shareMessage) return;

        const timerId = window.setTimeout(() => {
            setShareMessage('');
        }, 3200);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [shareMessage]);

    return (
        <div
            className="site-page-content"
            style={embedded ? styles.embeddedPage : undefined}
        >
            <div style={styles.header}>
                <div style={styles.headerText}>
                    <h1>Guestbook.exe</h1>
                    <h3>Leave a note or print a visitor card</h3>
                    <p style={styles.intro}>
                        Sign the guestbook, email me directly, or generate a
                        tiny MontaOS session card from what you discovered.
                    </p>
                </div>
                <div style={styles.socials}>
                    <SocialBox
                        icon={ghIcon}
                        link="https://github.com/MontaCoder"
                        label="Open GitHub profile"
                    />
                    <SocialBox
                        icon={inIcon}
                        link="https://www.linkedin.com/in/montassarhajri/"
                        label="Open LinkedIn profile"
                    />
                    <SocialBox
                        icon={twitterIcon}
                        link="https://www.x.com/MontaCoder/"
                        label="Open X profile"
                    />
                </div>
            </div>

            <div style={styles.shell}>
                <div className="big-button-container" style={styles.formPanel}>
                    <div style={styles.panelHeader}>
                        <p className="showcase-header">GUESTBOOK ENTRY</p>
                    </div>
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
                                type="button"
                                disabled={!isFormValid || isLoading}
                                onClick={handleSubmit}
                            >
                                {!isLoading ? (
                                    'Sign Guestbook'
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
                                            {formMessage ||
                                                'All messages forward to my personal email.'}
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

                <div style={styles.artifactColumn}>
                    <div className="big-button-container" style={styles.receiptPanel}>
                        <img
                            src={printerGif}
                            alt=""
                            style={styles.printer}
                        />
                        <div style={styles.receiptText}>
                            <p className="showcase-header" style={styles.kicker}>
                                PRINT DESK
                            </p>
                            <h3>Visitor Card</h3>
                            <pre style={styles.badge}>{visitorBadge}</pre>
                            <div style={styles.artifactButtons}>
                                <button
                                    type="button"
                                    className="site-button"
                                    onClick={copyVisitorBadge}
                                >
                                    Copy Card
                                </button>
                                <button
                                    type="button"
                                    className="site-button"
                                    onClick={() => window.print()}
                                >
                                    Print
                                </button>
                            </div>
                            <p style={styles.shareMessage}>
                                {shareMessage || '\xa0'}
                            </p>
                        </div>
                    </div>

                    {receiptId && (
                        <div
                            className="big-button-container"
                            style={styles.confirmation}
                        >
                            <p className="showcase-header" style={styles.kicker}>
                                RECEIPT
                            </p>
                            <h3>{receiptId}</h3>
                            <p>
                                Guestbook entry transmitted. This receipt lives
                                only in your current browser session.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    embeddedPage: {
        marginLeft: 0,
        padding: 24,
    },
    header: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 18,
        flexWrap: 'wrap',
    },
    headerText: {
        flexDirection: 'column',
        gap: 8,
        flex: 1,
        minWidth: 280,
    },
    intro: {
        maxWidth: 720,
    },
    socials: {
        justifyContent: 'flex-end',
        gap: 8,
        flexWrap: 'wrap',
    },
    social: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    socialImage: {
        width: 36,
        height: 36,
    },
    shell: {
        width: '100%',
        gap: 16,
        alignItems: 'stretch',
    },
    formPanel: {
        flex: 1,
        minWidth: 0,
        flexDirection: 'column',
        gap: 12,
    },
    panelHeader: {
        backgroundColor: colors.blue,
        padding: 6,
        margin: -8,
        marginBottom: 4,
    },
    form: {
        flexDirection: 'column',
        marginTop: 8,
    },
    formItem: {
        marginTop: 4,
        marginBottom: 16,
    },
    buttons: {
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap',
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
    artifactColumn: {
        width: 360,
        flexDirection: 'column',
        gap: 14,
        flexShrink: 0,
    },
    receiptPanel: {
        flexDirection: 'column',
        gap: 12,
    },
    printer: {
        width: 80,
        height: 80,
        imageRendering: 'pixelated',
    },
    receiptText: {
        flexDirection: 'column',
        gap: 8,
    },
    kicker: {
        color: '#000',
    },
    badge: {
        whiteSpace: 'pre-wrap',
        backgroundColor: '#fff',
        border: '1px solid #808080',
        padding: 10,
        fontFamily: 'MSSerif',
        fontSize: 14,
        margin: 0,
    },
    artifactButtons: {
        gap: 8,
        flexWrap: 'wrap',
    },
    shareMessage: {
        fontFamily: 'MSSerif',
        fontSize: 13,
        color: colors.blue,
    },
    confirmation: {
        flexDirection: 'column',
        gap: 8,
        backgroundColor: '#fbffc4',
    },
};

export default Contact;

