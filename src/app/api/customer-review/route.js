import {NextResponse} from "next/server";
import CustomerReview from '../../db/model/CustomerReview';

export async function GET(request) {
    return NextResponse.json(await CustomerReview.findOne({}), {status: 200});
}

export async function POST(request) {
    const customerReview = new CustomerReview({
        customer_comment_title: 'Guest favorite',
        customer_comment_details: 'One of the most loved homes on Airbnb, according to guests',
        score: 4.92,
        rating: [1, 1, 1, 1, 1],
        reviews_count: 668,
    });

    return NextResponse.json(await customerReview.save(), {status: 200});
}
