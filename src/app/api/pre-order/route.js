import { NextResponse } from "next/server";
import PreOrder from "../../db/model/PreOrder";

// To handle a GET request to /api
export async function GET(request) {
    return NextResponse.json(await PreOrder.findOne({}), { status: 200 });
}

export async function POST(request) {
    const preOrder = new PreOrder({
        price: 1248,
        service_charge: 180,
        currency: 'HKD',
        package_type: 'night',
    });

    return NextResponse.json(await preOrder.save(), { status: 200 });
}
