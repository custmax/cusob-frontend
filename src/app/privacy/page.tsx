import EnteredHeader from '@/component/EnteredHeader';
import styles from './page.module.scss';

const {
  privacyContainer,
  main,
  title,
  contact,
  content
} = styles;

const Privacy = () => {
  return <div className={privacyContainer}>
    <EnteredHeader />
    <div className={main}>
      <div className={title}>Privacy</div>
      <div className={contact}>
        <span> Contact Us：</span>
        <span style={{ color: '#1E1E69' }}>hello@Cusob.com</span>
      </div>
      <div className={content}>
        <section>
          Your privacy is important to us. In the course of using our web site, you may provide us with personally identifiable information. This refers to information about you that can be used to contact or identify you, information that you input on our site and information on your use of and activities at our web site that may be connected with you (&#34;Personal Information&#34;). This privacy policy applies to all of the products, services and web sites offered by Customer Obsession Inc. and tells you how we collect, use, disclose and protect your Personal Information.
        </section>
        <section>
          Changes to our Privacy Policy
        </section>
        <section>
          If we change our privacy policy, we will post those changes on this page and update the &#34;Last Updated&#34; date above.
        </section>
        <section>
          Information We Collect
        </section>
        <section>
          We collect Personal Information from you when you provide it to us in forms and documents. For example, we may collect your name, phone number, credit card or other billing information, email address, home and business postal addresses and information regarding transactions you conduct using our web site. Our servers also automatically record information that your browser sends whenever you visit a web site.
        </section>
        <h3>
          Use of Cookies and Beacons
        </h3>
        <section>
          Cookies and web beacons are small files that enable us to capture and remember certain information. We use cookies and web beacons to enable certain features of our web site, to understand and save your preferences for future visits and to compile aggregate data about user traffic and behavior so that we can offer better experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. You can configure your software so it does not accept cookies, though you may not be able to access certain portions or features of our web site.
        </section>
        <h3>
          How We Use the Information We Collect
        </h3>
        <section>
          We use your Personal Information and automatically collected information (including information from cookies and web beacons) for the following purposes: (i) to deliver the services you request, (ii) to improve our web site, services, features and content, (iii) to enable you to enjoy and easily navigate our web site, (iv) to personalize your experience, (v) to provide or offer software updates and product announcements, (vi) to provide you with further information and offers from us or third parties that we believe you may find useful or interesting, including newsletters, marketing or promotional materials and other information on services and products offered by us or third parties, (vii) to monitor and analyze use of our web site and our services, (viii) to administer our web site, (ix) to generate and derive useful data and information concerning the interests, characteristics and web site use behavior of our users, and (x) to verify that visitors to our web site meet the criteria required to process their requests. We reserve the right to compile and share aggregated information about our users, transactions completed using our service, sales, and traffic, though we will not share this information in a manner that permits the identification of a specific user.
        </section>
        <h3>
          Protection of Your Personal Information
        </h3>
        <section>
          We take reasonable steps to maintain the safety of your Personal Information. For example, sensitive Personal Information is transmitted via Secure Socket Layer (SSL) technology and access to your account information requires a username and password. You must keep your password confidential and you should always logout and close your browser when you finish your session.
Though no service is impenetrable, our service is built on top of Amazon Web Services (AWS). Amazon maintains ISO 27001 and SAS70 Type II certification for the AWS infrastructure, and has years of experience managing and securing large-scale data centers. More details about AWS security are available at http://aws.amazon.com/security/. We cannot guarantee that any confidential or Personal Information you choose to include in documents you store on our systems are maintained at adequate levels of protection to meet specific needs or obligations you may have relating to that information.
Disclosure to Third Parties
We do not sell, transfer, or otherwise share your Personal Information to third parties or any data that you store using our services to any third party except as outlined in this privacy policy or with your consent. This does not include trusted third parties we partner with to assist us in operating our web site, conducting and improving our business, or servicing you, in which case we may provide access to your Personal Information only for purposes of performing these tasks. Additionally, we may sell, transfer or otherwise share some or all of our assets, including your Personal Information, in connection with a corporate transaction such as a merger, acquisition, reorganization or sale of assets. In any such event, you will receive notice if your data is transferred and becomes subject to a substantially different privacy policy. We may also release your Personal Information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property or safety. Non-personally identifiable information may be provided to other parties for marketing, advertising, or other uses.
Third Party Services
We may link to, include or offer third party products or services on or through our web site. If you choose to use any such third party services, we may facilitate sharing of your information and documents you choose to use with those services. Your use of those services is not governed by our Terms of Service or Privacy Policy. We do not control the services of those third parties or how they use your information and documents. Be sure to review the terms and conditions and privacy policies of those third parties before using their services.
Reviewing or Changing Personal Information
You can review or request changes to your Personal Information by logging into your account at www.email-marketing-hub.com or by contacting us at support@email-marketing-hub.com.
Choice/Opt-Out
We will typically send you messages that relate to transactions you conduct on our web site or that have important alerts and notices about your account or our services. You cannot opt out of these communications. Additionally, we may send you other communications such as (i) notices about your use of our services, including notices regarding violations of our terms of service, (ii) updates to our web site and services and (iii) promotional information regarding our services. You can opt out of receiving promotional emails by following the opt-out instructions provided in those emails or by contacting us at legal@email-marketing-hub.com with your specific request.
Terms and Conditions
Please also visit the Email-Marketing-Hub Terms of Service section establishing the use, disclaimers, and limitations of liability governing the use of our web site.
Contacting Us
Any questions concerning our privacy policy should be directed to legal@email-marketing-hub.com.
        </section>
      </div>
    </div>
  </div>
};

export default Privacy;
