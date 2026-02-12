'use client';
import styles from './style.module.css';

interface ProjectProps {
    index: number;
    title: string;
    setModal: (modal: { active: boolean; index: number }) => void;
    url?: string;
}

export default function Project({ index, title, setModal, url }: ProjectProps) {
    return (
        <div
            onMouseEnter={() => { setModal({ active: true, index }) }}
            onMouseLeave={() => { setModal({ active: false, index }) }}
            onClick={() => { if (url) window.open(url, '_blank') }}
            className={styles.project}
        >
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div>
    )
}
