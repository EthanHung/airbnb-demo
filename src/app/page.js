'use client';

import Image from 'next/image'
import styles from './styles.module.css'
import Star from '../../public/start.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [place, setPlace] = useState({
        "name": "",
        "location": "",
        "images": [
        ],
        "rooms_and_guest": {
            "capcity": 0,
            "bedroom": 0,
            "beds": 0,
            "bath": 0
        },
        "place_images": []
    });

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

    const handleClick = () => {
        console.log('hi')
    }

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
            console.log('response.data', response.data)
        });
    };

    const renderImageGallery = (image) => {
        if (Array.isArray(image)) {
            return (
                <div className={styles.place__imageColumnContainer}>
                    {
                        image.map(img => <img src={img.image_source} alt="" className={styles.place__imageColumn}/>)
                    }
                </div>
            );
        } else {
            return <img src={image.image_source} alt="" className={styles.place__imageRow}/>;
        }
    };

    useEffect(() => {
        getPlaceDetails();
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
                                { place.place_images.map(images => renderImageGallery(images)) }
                            </div>
                        )
                        :
                        <div>Loading the image</div>
                }

                <div className={styles.contentRow}>
                    <div className={styles.contentFirstColumn}>

                        <div className={styles.place__locationContainer}>
                            <h1 className={styles.place__location} tabIndex="-1">{place.location}</h1>
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
                                    {place.rooms_and_guest.bath } bath
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
                                    <div
                                        className={`${styles.customer_reviewRatingAndReviewAction} ${styles.customer_reviewRatingAndReviewActionStar} `}>
                                        {renderStars([1, 1, 1, 1, 1])}
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
                        <div className={styles.hostingContainer}>
                            <div className={styles.hosting}>
                                <img
                                    src="https://a0.muscache.com/im/pictures/user/ea18a975-cd68-4f42-b032-1fa10366ae05.jpg?im_w=240"
                                    alt="" className={styles.hostingImg}/>
                                <div className={styles.hostingBadge}></div>
                            </div>
                            <div className={styles.hosting__renter}>
                                <div className={styles.hostedBy}>
                                    Hosted by Keith & Jen
                                </div>
                                <ul className={styles.hostingDetails}>
                                    <li className={styles.hostingDetailItem}>Superhost</li>
                                    <li className={styles.hostingDetailItem}>7 years hosting</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.hosting__descriptions}>
                            <div className={styles.row}>
                                <div className={styles.row__img}>
                                    <Image
                                        width={'24'}
                                        height={'48'}
                                        priority
                                        src={'badge-no-color.svg'}
                                        alt="Good rating"
                                    />
                                </div>
                                <div className="row__column">
                                    <div>Keith & Jen is a Superhost</div>
                                    <div>Superhosts are experienced, highly rated Hosts.</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.translator}>
                            Some info has been automatically translated. <a href="#">Show original language</a>
                        </div>
                        <div className={styles.disclaimerContainer}>
                            <p className={styles.disclaimer}>
                                NO CLEANING FEE
                                <br/>
                                Ticked off your bucket list, but still need more?
                                <br/>
                                1960's: All aboard for the magical mystery tour with the Beatles and their Yellow
                                Submarine, powered by love; because that's what makes the world go round
                                Cold War superpower scenario: "Hunt for Red October"puts you in charge of nuclear
                                mutually assured destruction,will soviet or US flinch first?
                                1943 North Atlantic: you are unterseeboot commander happy hunting stricken conveys with
                                torpedo's, then oops..depth charges,blind panic
                                <br/>
                                The space
                                .. your diesel/electric metal box emergency dives to crush depth to wriggle free from
                                depth charges pounding against the hull,classic "Das Boot" stuff.
                                <br/>
                                -1850's captain Nemo of the steam powered steampunk Nautilus must fend off monsters of
                                the deep.
                                <br/>
                                Guest access
                                It really is BIG inside...The Yellow Submarine floats in a sea of green suspended among
                                redwood trees, you can't miss it!
                                The submarine is yours to relax and play in... enter via ramp/jetty to the front
                                bulkhead door to a victorian steam punk lounge & galley, then up periscope to
                                control/bridge, or midships to U Boat sleeping quarters/torpedos and then beatles themed
                                bathroom at rear
                                <br/>
                                Other things to note
                                Yes..breakfast supplies are in the galley.
                                Cellphone/internet use is of course impossible onboard a submarine (you will thank us
                                for this,kids will forget their devices)
                                ....thankyou for stepping out....you may just revert to your childhood...and if you have
                                children on board,remember they will need 100% supervision............
                                but you will be rewarded with an overnight experience you won't stop talking about...so
                                let's get started!
                                Captain Nemo runs a tight and tidy ship...crew making a mess will be confined to the
                                mess,won't see the surface or shore leave this side of eternity!
                                PLEASE TAKE ALL YOUR POSESSIONS WHEN YOU DISEMBARK THIS VESSEL
                            </p>

                            <div className={styles.showMoreContainer}>
                                <a href="#" className={styles.showMore}>Show more</a>
                                {/*<Image*/}
                                {/*    width={'12'}*/}
                                {/*    height={'12'}*/}
                                {/*    className={styles.showMoreArrow}*/}
                                {/*    priority*/}
                                {/*    src={'/arrow-right.svg'}*/}
                                {/*    alt="Good rating"*/}
                                {/*/>*/}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentSecondColumn}>
                        <div className={styles.pre_orderContainer}>
                            <div className={styles.priceContainer}>
                                <span className={styles.price}>$1,238 HKD</span>
                                <span className={styles.price__unit}>night</span>
                            </div>
                            {/*<div className={`${styles.row} ${styles.pre_order}`}>*/}
                            {/*    <div className={`${styles.row__column} ${styles.pre_orderColumn}`}>*/}
                            {/*        <div className={styles.pre_orderInput}>*/}
                            {/*            <button*/}
                            {/*                className={`${styles.row__column} ${styles.pre_orderInputButton}`}*/}
                            {/*                name={"check-in"}*/}
                            {/*                onClick={handleClick}*/}
                            {/*            >*/}
                            {/*                <label htmlFor="check-in">Check-in</label>*/}
                            {/*            </button>*/}
                            {/*        </div>*/}

                            {/*    </div>*/}
                            {/*    <div className={`${styles.row__column} ${styles.pre_orderColumn}`}>*/}
                            {/*        <div className={styles.pre_orderInput}>*/}
                            {/*            <button*/}
                            {/*                className={`${styles.row__column} ${styles.pre_orderInputButton}`}*/}
                            {/*                name={"Check-out"}*/}
                            {/*                onClick={handleClick}*/}
                            {/*            >*/}
                            {/*                <label htmlFor="Check-out">Check-out</label>*/}
                            {/*            </button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={`${styles.row}  ${styles.pre_orderPriceItem}`}>
                                <button className={styles.reserve__button}>Reserve</button>
                            </div>
                            <div className={`${styles.row} ${styles.justifyContentCenter} ${styles.pre_orderPriceItem}`}>
                                <div className={styles.pre_orderHints}>You won't be charged yet</div>
                            </div>
                            <div className={`${styles.row} ${styles.justifyContentSpaceBetween} ${styles.pre_orderPriceItem}`}>
                                <span>$1,238 HKD x 1 night</span>
                                <span>$1,238 HKD</span>
                            </div>
                            <div className={`${styles.row} ${styles.justifyContentSpaceBetween} ${styles.pre_orderPriceItem}`}>
                                <span>Airbnb service fee</span>
                                <span>$175 HKD</span>
                            </div>
                            <div className={`${styles.row} ${styles.justifyContentSpaceBetween} ${styles.pre_orderPriceTotalItem}`}>
                                <span>Total before taxes</span>
                                <span>$1,413 HKD</span>
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
