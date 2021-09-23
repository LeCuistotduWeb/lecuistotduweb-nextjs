import React, {} from 'react'
import styles from "../../styles/layouts/admin.module.scss"
import AdminLayout from "../../layouts/AdminLayout";

const AdminDashboard = (props) => {
    return (
        <AdminLayout title={"Works page"}>
            <section className={styles.grid}>
                <article className={styles.article}></article>
                <article className={styles.article}></article>
                <article className={styles.article}></article>
                <article className={styles.article}></article>
                <article className={styles.article}></article>
            </section>
        </AdminLayout>
    );
}

export default AdminDashboard