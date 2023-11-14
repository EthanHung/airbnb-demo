import { NextResponse } from "next/server";
import Hosting from '../../db/model/Hosting';

export async function GET(request) {
    return NextResponse.json(await Hosting.findOne({}), { status: 200 });
}

export async function POST(request) {
    const hosting = new Hosting({
        name: 'Keith & Jen',
        period: '2016-12-01',
        hosting_type: 'Superhost',
        haveBadge: true,
        avatar: 'https://a0.muscache.com/im/pictures/user/ea18a975-cd68-4f42-b032-1fa10366ae05.jpg?im_w=240',
        benefits: [
            {
                title: 'Keith & Jen is a Superhost',
                descriptions: 'Superhosts are experienced, highly rated Hosts.',
                type: 'award',
                icon: 'http://localhost:3000/badge-no-color.svg',
            },
            {
                title: 'Great location',
                descriptions: '95% of recent guests gave the location a 5-star rating.',
                type: 'feature',
                icon: 'http://localhost:3000/greate-location.svg',
            },
            {
                title: 'Free cancellation before February 22',
                descriptions: '',
                type: 'feature',
                icon: 'http://localhost:3000/cancel-booking.svg',
            }
        ]
    });

    return NextResponse.json(await hosting.save(), { status: 200 });
}
