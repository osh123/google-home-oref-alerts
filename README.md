# Google Home Oref Alerts - Missle alerts from Israeli Home front.

## Setup ##

1. `npm install`
2. Set the `ALERT_ZONES` constant to the areas from which you want to get the alerts, you can get your area name from [here](https://www.oref.org.il//12481-he/Pakar.aspx?hash=12482).

```javascript
const ALERT_ZONES = [
	'תל אביב - דרום העיר ויפו',
	'חולון'
];
```
3. Get the Google Home IP adresses and update them in `GOOGLE_HOME_IPS` constant:
```javascript
const GOOGLE_HOMES_IPS = [
	'192.168.0.87',
  '192.168.0.94'
];
```
## General Information
Google Home Oref Alerts should run all the time in order for alerts to go off, it should run on the same LAN as the Google Home clients.

I hope you won't get any alerts ♥️
