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

const AboutCookies = () => {
  return <div className={aboutCookiesContainer}>
    <EnteredHeader />
    <div className={main}>
      <div className={title}>Cookie Preferences</div>
      <div className={contact}>
        <span> Contact Us：</span>
        <span style={{ color: '#1E1E69' }}>hello@Cusob.com</span>
      </div>
      <div className={content}>
          <section>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Thank you for visiting CusOb ("we," "us," or "our"). This Cookie Preferences page outlines how we use cookies and similar technologies on our Email Marketing Software SAAS Platform and website, and how you can manage your preferences.
          </section>
        <h3>
            1. What are Cookies?
        </h3>
        <section>
            Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
        </section>
        <h3>
            2. Types of Cookies We Use
        </h3>
          <section>
              We use the following types of cookies on our website:
          </section>
          <section>
              Essential Cookies: These cookies are necessary for the website to function properly.
          </section>
          <section>
              Analytics Cookies: These cookies help us analyze how users interact with our website, so we can improve our services.
          </section>
          <section>
              Marketing Cookies: These cookies are used to track visitors across websites, with the intention of displaying ads that are relevant and engaging for the individual user.
          </section>
        <h3 className={extraH3}>
            3. Your Cookie Preferences
        </h3>
        <section>
            You can manage your cookie preferences by adjusting the settings in your web browser. Please note that blocking certain types of cookies may impact your experience on our website.
        </section>
        <h3>
            4. Consent
        </h3>
        <section>
            By using our website, you consent to the use of cookies as described in this Cookie Preferences page. If you do not consent to the use of cookies, please adjust your browser settings accordingly or refrain from using our website.
        </section>
        <h3>
            5. Changes to this Policy
        </h3>
        <section>
            We may update this Cookie Preferences page from time to time. We will notify you of any changes by posting the updated policy on this page.
        </section>
        <h3>
            6. Contact Us
        </h3>
        <section>
            If you have any questions about our use of cookies or this Cookie Preferences page, please contact us at legal@cusob.com.
            This Cookie Preferences page is effective as of [5/1/2024]
        </section>

      </div>
    </div>
  </div>
};

export default AboutCookies;
