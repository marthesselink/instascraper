const fs = require('fs');
const axios = require('axios');

let getImages = async() => {
  let accessToken = fs.readFileSync('instaToken.json');

	var config = {
	  method: 'get',
	  url: 'https://graph.instagram.com/me/media?fields=media_type,media_url&access_token=' + accessToken,
	};

	let getImagesRequest = await axios(config);

	const actiondata =  getImagesRequest.data.data;

	let imagesData = JSON.stringify(actiondata);
	fs.writeFileSync('images.json', imagesData);

	// console.log(actiondata);

	console.log("=========");
	console.log("Images scraped and written to file!");
	console.log("=========");
}

let refreshToken = async() => {
	let accessToken = fs.readFileSync('instaToken.json');

	var config = {
	  method: 'get',
	  url: 'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' + accessToken,
	};

	let refreshTokenRequest = await axios(config);

	const newToken = refreshTokenRequest.data.access_token;

	fs.writeFileSync('instaToken.json', newToken);

	console.log("=========");
	console.log("New Token:")
	console.log(newToken);
	console.log("=========");
}

console.log('scraper online!');

getImages();
refreshToken();

setInterval(getImages, 900000);
setInterval(refreshToken, 864000000);
