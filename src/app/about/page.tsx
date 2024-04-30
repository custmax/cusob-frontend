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
            <div className={title}>About</div>
            <div className={contact}>
                <span> Contact Us：</span>
                <span style={{ color: '#1E1E69' }}>hello@Cusob.com</span>
            </div>
            <div className={content}>
                <section >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Welcome to CusOb, where we're inspired by a blend of esteemed philosophies and innovative visions. Drawing from the foundational principles of industry leaders and dynamic organizations, we are dedicated to forging a new paradigm in entrepreneurship.
                </section>
                <section>
                    At our core, we embrace values rooted in customer-centricity, long-term value creation, and agile adaptability. By integrating these guiding principles, we strive to redefine the landscape of business operations and inspire transformative change.
                </section>
                <section>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    With a commitment to innovation, collaboration, and ethical leadership, we aim to empower businesses to thrive in an ever-evolving world. Join us on our journey as we pioneer a fresh perspective on entrepreneurship, shaping a future where success is defined by impact and sustainability. Together, let's unlock new possibilities and drive meaningful progress for businesses worldwide.
                </section>
            </div>
        </div>
    </div>
};

export default Terms;
