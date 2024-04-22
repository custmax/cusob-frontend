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

const Policy = () => {
    return <div className={aboutCookiesContainer}>
        <EnteredHeader />
        <div className={main}>
            <div className={title}>Privacy</div>
            <div className={contact}>
                <span> Contact Us：</span>
                <span style={{ color: '#1E1E69' }}>support@Cusob.com</span>
            </div>
            <div className={content}>
                <section>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Thank you for choosing Cusob ("we," "us," or "our"). This Privacy Policy describes how we collect, use, and
                    disclose personal information when you use our email marketing software SAAS platform and website.Marketing Software SAAS Platform and website, and how you can manage your preferences.
                </section>
                <h3>
                    1. Information We Collect
                </h3>
                <section>
                    We collect personal information that you provide to us when you sign up for an account, use our services, or interact with our website. This may include:
                </section>
                <section>
                            • Contact information (such as name, email address, mailing address, phone number)
                </section>
                <section>
                            • Account information (such as username, password)
                </section>
                <section>
                            • Payment information (such as credit card details)
            </section>
                <section>
                            • Communications preferences
        </section>
                <section>
                            • Information about your use of our services (such as IP address, browser type, device information)
                </section>

                <h3>
                    2. How We Use Your Information
                </h3>
                <section>
                    We use the information we collect for the following purposes:
              <section>
                            • To provide and improve our services
              </section>
                    <section>
                            • To communicate with you about your account and our services
                    </section>
                        <section>
                            • To personalize your experience
                        </section>
                            <section>
                            • To process payments
                            </section>
                                <section>
                            • To comply with legal obligations
                                </section>
                                    <section>
                            • To protect our rights and interests
                                    </section>

                </section>
                <h3 className={extraH3}>
                    3. Sharing of Information
                </h3>
                <section>
                    We may share your personal information with third parties in the following circumstances:
                  <section>
                            • With service providers who assist us in providing our services
                  </section>
                    <section>
                            • With third parties as required by law or to protect our rights
                    </section>
                        <section>
                            • With your consent
                        </section>

                </section>
                <h3>
                    4. Sharing of Information
                </h3>
                <section>
                    We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </section>
                <h3>
                    5. Your Rights
                </h3>
                <section>
                    We may update this Cookie Preferences page from time to time. We will notify you of any changes by posting the updated policy on this page.
                </section>
                <h3>
                    6. International Transfers
                </h3>
                <section>
                    Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your information. Please contact us if you would like to exercise these rights.
                </section>
                <h3>
                    7. Changes to This Policy
                </h3>
                <section>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </section>
                <h3>
                    8. Contact Us
                </h3>
                <section>
                    If you have any questions about this Privacy Policy or our practices, please contact us at legal@cusob.com

                    By using our email marketing software SAAS platform and website, you consent to the terms of this Privacy Policy.

                    This Privacy Policy is effective as of 5/1/2024.
                </section>
            </div>
        </div>
    </div>
};

export default Policy;
