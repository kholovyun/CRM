import styles from "./Home.module.css";

export const Home = () => {
    return (
        <div className={styles.home}>
            <div>
                <h1>Надежный партнер в заботе о Вашем ребенке</h1>
                <div>
                    <button>Вход</button>
                    <a href="">Подписка {"--->"}</a>
                </div>
            </div>
            <div>
                IMG
            </div>
        </div>
    );
};
