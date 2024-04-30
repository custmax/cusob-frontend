import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';

const {
    aboutCookiesContainer,
    main,
    title,
    contact,
    content,
    extraH3
} = styles;

const Terms = () => {
    return <div className={aboutCookiesContainer}>
        <EnteredHeader />
        <div className={main}>
            <div className={title}>Terms of Use</div>
            <div className={contact}>
                <span> Contact Us：</span>
                <span style={{ color: '#1E1E69' }}>hello@Cusob.com</span>
            </div>
            <div className={content}>
                <section>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Thank you for choosing CusOb ("we," "us," or "our"). These Terms of Use govern your use of our Email Marketing Software Platform and website.
                </section>
                <h3>
                    1. Acceptance of Terms
                </h3>
                <section>
                    By accessing or using our website and services, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </section>


                <h3>
                    2. Use of Services
                </h3>
                <section>
                    You may use our services for lawful purposes only. You are prohibited from using our services in any way that violates the rights of others or that interferes with the operation of our website.

                </section>
                <h3>
                    3. Intellectual Property
                </h3>
                <section>
                    All content and materials available on our website, including but not limited to text, graphics, logos, images, and software, are the property of CusOb or its licensors and are protected by copyright and other intellectual property laws.

                </section>
                <h3>
                    4. User Content
                </h3>
                <section>
                    By submitting content to our website, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute the content in any form, media, or technology.
                </section>
                <h3>
                    5. Limitation of Liability
                </h3>
                <section>
                    In no event shall CusOb or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our website or services.

                </section>
                <h3>
                    6. Indemnification
                </h3>
                <section>
                    You agree to indemnify and hold harmless CusOb and its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses arising out of or in any way related to your use of our website or services.
                </section>
                <h3>
                    7. Governing Law
                </h3>
                <section>
                    These Terms of Use shall be governed by and construed in accordance with the laws of [U.S.], without regard to its conflict of law provisions.
                </section>
                <h3>
                    8. Changes to this Agreement
                </h3>
                <section>
                    We reserve the right to modify or replace these Terms of Use at any time. It is your responsibility to review these terms periodically for changes. Your continued use of our website and services after any modifications indicates your acceptance of the updated terms.
                </section>
                <h3>
                    9. Contact Us
                </h3>
                <section>
                    If you have any questions about these Terms of Use, please contact us at legal@cusob.com.

                    These Terms of Use are effective as of 5/1/2024.
                </section>
            </div>
        </div>
    </div>
};

export default Terms;
