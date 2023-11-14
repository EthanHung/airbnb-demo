'use client';

import Image from 'next/image'
import styles from './styles.module.css'
import Star from '../../public/start.svg'
import {useEffect, useState} from 'react'
import axios from 'axios'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

export default function Home() {
    dayjs.extend(relativeTime)

    const [place, setPlace] = useState({
        'name': '',
        'location': '',
        'images': [],
        'rooms_and_guest': {
            'capcity': 0,
            'bedroom': 0,
            'beds': 0,
            'bath': 0
        },
        'place_images': []
    });

    const [customerReview, setCustomerReview] = useState({
        customer_comment_title: '',
        customer_comment_details: '',
        score: 0,
        rating: [0, 0, 0, 0, 0,],
        reviews_count: 0,
    });

    const [hosting, setHosting] = useState({
        name: '',
        avatar: 'https://placehold.co/600x400',
        haveBadge: false,
        period: new Date(),
        hosting_type: '',
        benefits: []
    });


    const [disclaimer, setDisclaimer] = useState({__html: ''});

    const [preOrder, setPreOrder] = useState({
        'price': 0,
        'service_charge': 0,
        'currency': 'HKD',
        'package_type': 'na',
    });

    const renderStars = (stars) => {
        return stars.map((star, index) => {
            return (
                <Image
                    className={styles.star}
                    key={index}
                    priority
                    src={Star}
                    alt='Good rating'
                />
            );
        })
    };

    const getPlaceDetails = () => {
        axios.get('/api/place').then((response) => {
            const data = response.data;
            let place_image_item = [];
            data.place_images = [];

            data.images.forEach((image, index) => {
                if (index === 0) {
                    data.place_images.push(image);
                    return;
                }

                place_image_item.push(image);

                if (index % 2 === 0) {
                    data.place_images.push(place_image_item);
                    place_image_item = [];
                }

            })
            setPlace(data);
        });
    };

    const getCustomerReview = async () => {
        try {
            const res = await axios.get('/api/customer-review');
            return (await res.data);
        } catch (err) {
            console.error('err', err);
        }
    };

    const renderImageGallery = (image, i) => {
        // return null;
        if (Array.isArray(image)) {
            return (
                <div className={styles.place__imageColumnContainer} key={i}>
                    {
                        image.map((img, index) => (
                            <img
                                src={img.image_source}
                                key={index}
                                alt={index}
                                className={styles.place__imageColumn}
                            />
                        ))
                    }
                </div>
            );
        } else {
            return <img
                src={image.image_source}
                alt=''
                className={styles.place__imageRow}
                key={i}
            />;
        }
    };

    useEffect(() => {
        getPlaceDetails();
        getCustomerReview().then(result => {
            // console.log('customerReview', result)
            setCustomerReview(result);
        });

        axios.get('/api/hosting').then(result => {
            setHosting(result.data);
        });

        fetch('/api/disclaimer').then(async (result) => {
            setDisclaimer({__html: (await result.json()).data});
        });

        fetch('/api/pre-order').then(async (result) => {
            setPreOrder(await result.json());
        });

    }, []);

    return (
        <main className={styles.site}>
            <div className={styles.site__container}>
                <div className={styles.place__nameContainer}>
                    <h1 className={styles.place__name}>
                        {place.name}
                    </h1>
                    <div className={styles.place__actionButtonContainer}>
                        <button className={styles.place__actionButton}>
                            Share
                        </button>
                        <button className={styles.place__actionButton}>
                            Save
                        </button>
                    </div>
                </div>

                {
                    place.images.length > 0 ?
                        (
                            <div className={styles.place__imageContainer}>
                                {place.place_images.map((images, index) => renderImageGallery(images, index))}
                            </div>
                        )
                        :
                        <div>Loading the image</div>
                }

                <div className={styles.contentRow}>
                    <div className={styles.contentFirstColumn}>

                        <div className={styles.place__locationContainer}>
                            <h1 className={styles.place__location} tabIndex='-1'>{place.location}</h1>
                            <ul className={styles.place__roomsAndGuest}>
                                <li className={styles.place__roomsAndGuestItem}>
                                    {place.rooms_and_guest.capcity} guests
                                </li>
                                <li className={styles.place__roomsAndGuestItem}>
                                    {place.rooms_and_guest.bedroom} bedroom
                                </li>
                                <li className={styles.place__roomsAndGuestItem}>
                                    {place.rooms_and_guest.beds} beds
                                </li>
                                <li className={styles.place__roomsAndGuestItem}>
                                    {place.rooms_and_guest.bath} bath
                                </li>
                            </ul>
                        </div>
                        <div className={styles.customer_reviewContainerSmall}>
                            <div className={styles.customer_reviewGuestFavorite}>
                                {customerReview.customer_comment_title}
                            </div>
                            <div className={styles.customer_reviewComment}>
                                {customerReview.customer_comment_details}
                            </div>
                            <div className={styles.customer_reviewRatingAndReviewContainer}>
                                <div className={styles.customer_reviewRatingAndReview}>
                                    <div>{customerReview.score}</div>
                                    <div
                                        className={
                                            `${styles.customer_reviewRatingAndReviewAction} ${styles.customer_reviewRatingAndReviewActionStar} `
                                        }
                                    >
                                        {renderStars(customerReview.rating)}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.customer_reviewRatingAndReviewContainer}>
                                <div className={styles.customer_reviewRatingAndReview}>
                                    <div>{customerReview.reviews_count}</div>
                                    <div className={styles.customer_reviewRatingAndReviewAction}>
                                        <a href='#'>
                                            Reviews
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.hostingContainer}>
                            <div className={styles.hosting}>
                                <img src={hosting.avatar} alt='host profile image' className={styles.hostingImg}/>
                                {
                                    hosting.haveBadge && (<div className={styles.hostingBadge}></div>)
                                }
                            </div>
                            <div className={styles.hosting__renter}>
                                <div className={styles.hostedBy}>
                                    {`Hosted by ${hosting.name}`}
                                </div>
                                <ul className={styles.hostingDetails}>
                                    <li className={styles.hostingDetailItem}>{hosting.hosting_type}</li>
                                    <li className={styles.hostingDetailItem}>
                                        {
                                            dayjs(hosting.period).from(dayjs()).replace(' ago', '')
                                        } hosting
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.hosting__descriptions}>
                            {
                                hosting.benefits.map((benefit, index) => {
                                    return (
                                        <div className={`${styles.row} ${styles.hosting__descriptionsRow}`} key={index}>
                                            <div className={styles.row__img}>
                                                <Image
                                                    width={'24'}
                                                    height={'48'}
                                                    priority
                                                    src={benefit.icon}
                                                    alt={benefit.title}
                                                />
                                            </div>
                                            <div className={styles.row__column}>
                                                <div>{benefit.title}</div>
                                                <div>{benefit.descriptions}</div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className={styles.translator}>
                            Some info has been automatically translated. <a href='#'>Show original language</a>
                        </div>
                        <div className={styles.disclaimerContainer}>
                            <p className={styles.disclaimer} dangerouslySetInnerHTML={disclaimer}></p>

                            <div className={styles.showMoreContainer}>
                                <a href='#' className={styles.showMore}>Show more</a>
                                {/*<Image*/}
                                {/*    width={'12'}*/}
                                {/*    height={'12'}*/}
                                {/*    className={styles.showMoreArrow}*/}
                                {/*    priority*/}
                                {/*    src={'/arrow-right.svg'}*/}
                                {/*    alt='Good rating'*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentSecondColumn}>
                        <div className={styles.pre_orderContainer}>
                            <div className={styles.priceContainer}>
                                <span className={styles.price}>
                                    {`$${preOrder.price ? preOrder.price.toLocaleString() : preOrder.price} ${preOrder.currency}`}
                                </span>
                                <span className={styles.price__unit}>
                                    {preOrder.package_type}
                                </span>
                            </div>
                            {/*<div className={`${styles.row} ${styles.pre_order}`}>*/}
                            {/*    <div className={`${styles.row__column} ${styles.pre_orderColumn}`}>*/}
                            {/*        <div className={styles.pre_orderInput}>*/}
                            {/*            <button*/}
                            {/*                className={`${styles.row__column} ${styles.pre_orderInputButton}`}*/}
                            {/*                name={'check-in'}*/}
                            {/*                onClick={handleClick}*/}
                            {/*            >*/}
                            {/*                <label htmlFor='check-in'>Check-in</label>*/}
                            {/*            </button>*/}
                            {/*        </div>*/}

                            {/*    </div>*/}
                            {/*    <div className={`${styles.row__column} ${styles.pre_orderColumn}`}>*/}
                            {/*        <div className={styles.pre_orderInput}>*/}
                            {/*            <button*/}
                            {/*                className={`${styles.row__column} ${styles.pre_orderInputButton}`}*/}
                            {/*                name={'Check-out'}*/}
                            {/*                onClick={handleClick}*/}
                            {/*            >*/}
                            {/*                <label htmlFor='Check-out'>Check-out</label>*/}
                            {/*            </button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={`${styles.row}  ${styles.pre_orderPriceItem}`}>
                                <button className={styles.reserve__button}>Reserve</button>
                            </div>
                            <div
                                className={`${styles.row} ${styles.justifyContentCenter} ${styles.pre_orderPriceItem}`}>
                                <div className={styles.pre_orderHints}>You won't be charged yet</div>
                            </div>
                            <div
                                className={`${styles.row} ${styles.justifyContentSpaceBetween} ${styles.pre_orderPriceItem}`}>
                                <span>
                                    {`$${preOrder.price} ${preOrder.currency} x 1 ${preOrder.package_type}`}
                                </span>
                                <span>
                                    {`$${preOrder.price} ${preOrder.currency}`}
                                </span>
                            </div>
                            <div
                                className={`${styles.row} ${styles.justifyContentSpaceBetween} ${styles.pre_orderPriceItem}`}>
                                <span>Airbnb service fee</span>
                                <span>{`$${preOrder.service_charge} ${preOrder.currency}`}</span>
                            </div>
                            <div
                                className={`${styles.row} ${styles.justifyContentSpaceBetween} ${styles.pre_orderPriceTotalItem}`}>
                                <span>Total before taxes</span>
                                <span>{`$${preOrder.service_charge + preOrder.price} ${preOrder.currency}`}</span>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
