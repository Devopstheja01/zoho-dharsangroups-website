import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function PartnersPage() {
    return (
        <main className={styles.main}>
            <Navbar />

            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>Partner with DharsanGroups</h1>
                    <p className={styles.subtitle}>
                        Expand your tailoring business by joining our exclusive network.
                    </p>
                </div>
            </header>

            <section className={`container ${styles.content}`}>
                <div className={styles.grid}>
                    <div className={styles.infoColumn}>
                        <h2>Benefits of Joining</h2>
                        <div className={styles.benefit}>
                            <h3>Increased Visibility</h3>
                            <p>Get discovered by customers looking for premium tailoring in your area.</p>
                        </div>
                        <div className={styles.benefit}>
                            <h3>Consistent Orders</h3>
                            <p>Receive steady work through our online booking system.</p>
                        </div>
                        <div className={styles.benefit}>
                            <h3>Brand Association</h3>
                            <p>Be part of a trusted premium fashion brand.</p>
                        </div>
                    </div>

                    <div className={styles.formColumn}>
                        <div className={styles.card}>
                            <h2>Registration Form</h2>
                            <form className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label>Shop Name</label>
                                    <input type="text" className={styles.input} placeholder="e.g. Royal Tailors" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Owner Name</label>
                                    <input type="text" className={styles.input} placeholder="Your Name" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Contact Number</label>
                                    <input type="tel" className={styles.input} placeholder="+91..." />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Shop Address</label>
                                    <textarea className={styles.textarea} rows={3} placeholder="Full address..."></textarea>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Specialization</label>
                                    <select className={styles.input}>
                                        <option>Men's Suits</option>
                                        <option>Women's Ethnic</option>
                                        <option>Alterations</option>
                                        <option>All of the above</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit Application</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
