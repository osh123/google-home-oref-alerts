const GoogleHome = require("google-home-push");
const https = require('https')
const ALERT_ZONES = [
	//Set alert zones here
	//example:
	//'תל אביב - דרום העיר ויפו',
	//'חולון'
];

const GOOGLE_HOMES_IPS = [
	//Set Google Homes IPs here
	//example:
	//'192.168.0.87'
];

async function fetchAlerts() {
	return new Promise((resolve, reject) => {
		const options = {
			hostname: 'www.oref.org.il',
			port: 443,
			path: '/WarningMessages/Alert/alerts.json?v=1',
			method: 'GET',
			headers: {
				'Referer': 'https://www.oref.org.il/',
				'X-Requested-With': 'XMLHttpRequest'
			}
		  }
		  
		  const req = https.request(options, res => {		  
			const body = []
			res.on('data', (chunk) => body.push(chunk))
			res.on('end', () => {
			  const resString = Buffer.concat(body).toString()
			  let jsonData = null;
			  try {
				jsonData = JSON.parse(resString);
			  } catch {}
			  if (jsonData != null && 'data' in jsonData) {
				resolve(jsonData['data']);
				return;
			  }
			  resolve([]);
			})
		  })
		  
		  req.on('error', error => {
			reject(error)
		  })
		  
		  req.end()	  
	});
	
}

async function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

async function sendGoogleHomeAlert(ip, text) {
	return new Promise(resolve => {
		let device = new GoogleHome(ip);
		device.speak(text);
		resolve();
	});
}

(async() => {
	while (true) {
		let alerts = await fetchAlerts(); 
		if (alerts.length == 0) {
			console.log(new Date(), 'No alerts 😀');
		} else {
			console.log(new Date(), 'Found alerts!', alerts);
			let relevantAlert = alerts.find(zone => ALERT_ZONES.indexOf(zone) !== -1);
			if (relevantAlert != undefined) {
				console.log(new Date(), "Found alert", relevantAlert, "notifying Google Homes...");
				for (let googleHomeIp of GOOGLE_HOMES_IPS) {
					sendGoogleHomeAlert(googleHomeIp, "ALERT! Please go into the safe zone!"); //No await here since we want to alert the next Google Home.
				}
				await sleep(5000);
			}
		}
		await sleep(1000);
	}
})();
