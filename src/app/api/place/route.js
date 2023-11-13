import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
    let place = {
        name: 'Yellow Submarine',   // Yellow Submarine
        location: 'Entire place in Marton, New Zealand',   // Entire place in Marton, New Zealand
        images: [
            {
                image_source: 'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/0be3f493-fd2d-434e-b557-ad2c189b1543.jpeg?im_w=720', // https://....
                image_name: 'Additional photos', // Bedroom
                image_details: '' // 2 double beds
            },
            {
                image_source: 'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/54a54b14-9c99-4b06-a89b-a825c73879d7.jpeg?im_w=720', // https://....
                image_name: 'Exterior', // Bedroom
                image_details: '' // 2 double beds
            },
            {
                image_source: 'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/052ac320-b872-45f5-be91-15c76cdbccab.jpeg?im_w=720', // https://....
                image_name: 'Living room', // Bedroom
                image_details: '2 double beds' // 2 double beds
            },
            {
                image_source: 'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/8005cfbd-4f7f-4e48-95a8-6c31c8861655.jpeg?im_w=720', // https://....
                image_name: 'Living room', // Bedroom
                image_details: '2 double beds' // 2 double beds
            },
            {
                image_source: 'https://a0.muscache.com/im/pictures/miso/Hosting-20605023/original/cfdf38c5-f9c0-4d45-bdaf-c7fdfa0953e5.jpeg?im_w=720', // https://....
                image_name: 'Full kitchen', // Bedroom
                image_details: '' // 2 double beds
            }
        ],
        rooms_and_guest: {
            capcity: 4, // 4
            bedroom: 1, // 1
            beds: 2, // 2
            bath: 1, // 1
        }
    };

    // Do whatever you want
    return NextResponse.json(place, { status: 200 });
}
