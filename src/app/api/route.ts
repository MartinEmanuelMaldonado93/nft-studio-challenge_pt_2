import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const data = await fetch(
		"https://most-expensive-nft-artworks.p.rapidapi.com/artworks?page=1&sort=usd_price",
		{
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "617e3a44bfmsh068af74f6f9a92bp19a375jsn678322e5767d",
				"X-RapidAPI-Host": "most-expensive-nft-artworks.p.rapidapi.com",
				"content-type": "application/json",
				"Accept-Encoding": "gzip, deflate, *",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		}
	);

	const imagesResult: Artwork[] = await data.json();
	if (!imagesResult) {
		throw new Error("couldnt fetch");
	}

	const artListFiltered = imagesResult.filter((item) => {
		return item.image.endsWith(".jpg") || item.image.endsWith(".png");
	});

	return NextResponse.json({ artFiltered: artListFiltered });
}
