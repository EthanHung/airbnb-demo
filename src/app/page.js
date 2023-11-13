import Image from 'next/image'
import styles from './styles.module.css'
import Star from '../../public/start.svg'


export default function Home() {
    const renderStars = (stars) => {
        return stars.map((star, index) => {
            return (
                <Image
                    className={styles.star}
                    key={index}
                    priority
                    src={Star}
                    alt="Good rating"
                />
            );
        })
    }

    return (
        <main className={styles.site}>
            <div className={styles.site__container}>
                <div className={styles.place__nameContainer}>
                    <h1 className={styles.place__name}>Yellow Submarine</h1>
                    <div className={styles.place__actionButtonContainer}>
                        <button className={styles.place__actionButton}>
                            Share
                        </button>
                        <button className={styles.place__actionButton}>
                            Save
                        </button>
                    </div>
                </div>

                <div className={styles.place__imageContainer}>
                    <img src="https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/0be3f493-fd2d-434e-b557-ad2c189b1543.jpeg?im_w=720" alt="" className={styles.place__imageRow}/>

                    <div className={styles.place__imageColumnContainer}>
                        <img src="https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/54a54b14-9c99-4b06-a89b-a825c73879d7.jpeg?im_w=720" alt="" className={styles.place__imageColumn}/>
                        <img src="https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/052ac320-b872-45f5-be91-15c76cdbccab.jpeg?im_w=720" alt="" className={styles.place__imageColumn}/>
                    </div>

                    <div className={styles.place__imageColumnContainer}>
                        <img src="https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/8005cfbd-4f7f-4e48-95a8-6c31c8861655.jpeg?im_w=720" alt="" className={styles.place__imageColumn}/>
                        <img src="https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/cfdf38c5-f9c0-4d45-bdaf-c7fdfa0953e5.jpeg?im_w=720" alt="" className={styles.place__imageColumn}/>
                    </div>
                </div>

                <div className={styles.contentRow}>
                    <div className={styles.contentFirstColumn}>

                        <div className={styles.place__locationContainer}>
                            <h1 className={styles.place__location} tabIndex="-1">Entire place in Marton, New Zealand</h1>
                            <ul className={styles.place__roomsAndGuest}>
                                <li className={styles.place__roomsAndGuestItem}>
                                    4 guests
                                </li>
                                <li className={styles.place__roomsAndGuestItem}>
                                    1 bedroom
                                </li>
                                <li className={styles.place__roomsAndGuestItem}>
                                    2 beds
                                </li>
                                <li className={styles.place__roomsAndGuestItem}>
                                    1 bath
                                </li>
                            </ul>
                        </div>
                        <div className={styles.customer_reviewContainerSmall}>
                            <div className={styles.customer_reviewGuestFavorite}>
                                Guest favorite
                            </div>
                            <div className={styles.customer_reviewComment}>
                                One of the most loved homes on Airbnb, according to guests
                            </div>
                            <div className={styles.customer_reviewRatingAndReviewContainer}>
                                <div className={styles.customer_reviewRatingAndReview}>
                                    <div>4.92</div>
                                    <div className={`${styles.customer_reviewRatingAndReviewAction} ${styles.customer_reviewRatingAndReviewActionStar} `}>
                                        { renderStars([1,1,1,1,1]) }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.customer_reviewRatingAndReviewContainer}>
                                <div className={styles.customer_reviewRatingAndReview}>
                                    <div>668</div>
                                    <div className={styles.customer_reviewRatingAndReviewAction}>
                                        <a href="#">
                                            Reviews
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentSecondColumn}>

                    </div>
                </div>
            </div>
        </main>
    )
}
