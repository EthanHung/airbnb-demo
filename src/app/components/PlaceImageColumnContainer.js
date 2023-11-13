
import styles from '../styles.module.css'

const PlaceImageColumnContainer = () => {
    return (
        <div className={styles.place__imageColumnContainer}>
            <img
                src={image_source}
                alt="" className={styles.place__imageColumn}/>
        </div>
    );
};

export default PlaceImageColumnContainer;
