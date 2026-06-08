import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { imageUrl } = await req.json();

        const formData = new FormData();

        formData.append(
            "api_key",
            process.env.FACE_API_KEY!
        );

        formData.append(
            "api_secret",
            process.env.FACE_API_SECRET!
        );

        formData.append(
            "image_url",
            imageUrl
        );

        formData.append(
            "return_attributes",
            "gender,age,smiling,eyestatus"
        );

        const response = await fetch(
            "https://api-us.faceplusplus.com/facepp/v3/detect",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Face detection failed",
            },
            {
                status: 500,
            }
        );
    }
}