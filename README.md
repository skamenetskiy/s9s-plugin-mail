## ClusterControl mail plugin
![Dependencies](https://david-dm.org/skamenetskiy/s9s-plugin-mail.svg)

Mail plugin for ClusterControl by @Severalnines

### Installation
----
Using plugins installer:
```bash
cd /path/to/cluster-control/nodejs/service
./plugins.js --install mail
```
or using npm:
```bash
cd /path/to/cluster-control/nodejs/service
npm install s9s-plugin-mail
```

### Incomming parameters
----
#### config
```json
{
	"to":["some@email.com","other@email.com"]
}
```
#### data
More information on the ```details``` and the ```contexts``` can be found [here](https://developer.pagerduty.com/documentation/integration/events/trigger).

```alarm_id``` - **int** (*required*) identifier of the alarm.

```alarm_name``` - **string** (*required*) alarm name.

```alarm_description``` - **string** (*required*) description of the alarm, max 1024 chars.

```cluster_id``` - **int** (*required*) affected cluster ID.

```client``` - **string** (*required*) alarm client (*"node-1" for example*).

```url``` - **string** (*required*) url to ClusterControl page (*to view the alarm*).

```details``` - **object** (*optional*) any key/value pair with alarm details.

```contexts``` - **object** (*optional*) alarm contexts - images/links ([documentation](https://developer.pagerduty.com/documentation/integration/events/trigger)).

```json
{
	"alarm_id":123,
	"alarm_name":"Short alarm name",
	"alarm_description":"Long description (1024 chars max)",
	"cluster_id":1,
	"client":"node-1",
	"url":"http://127.0.0.1/clustercontrol/",
	"details": {
		"some":"details",
		"go":"here",
		"a":"b",
		"c":"d"
	},
	"contexts":[
		{
			"type": "link",
			"href": "http://acme.pagerduty.com"
		},
		{
			"type": "link",
			"href": "http://acme.pagerduty.com",
			"text": "View the incident on PagerDuty"
		},
		{
			"type": "image",
			"src": "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1"
		},
		{
			"type": "image",
			"src": "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
			"href": "https://google.com"
		}
	]
}
```