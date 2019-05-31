# Demo-OCR

Download the JavaScript file, **scripts.js**, to your local machine.
```sh
$ curl -o scripts.js https://raw.githubusercontent.com/prashant-mahanta/demo-ocr/master/scripts.js
```

Copy this file to your working directory. The **scripts.js** can be initialized by using **_init()** function.
![Initializing Script](https://github.com/n-ambati/demo-ocr/blob/master/ocr/Screenshot%202019-05-31%20at%202.55.10%20PM.png)

The _init() function requires a JavaScript object as an input argument.
The object has two properties 'region_div' and 'region'.
region_div denotes the id of the container.
```sh
region_div: "<id>"
```
region is an array of objects. Each object should represent a region along with other properties.
```sh
region: [
          {
            region_id: <region id>,
            region_name: "<name of the region>",
            region_color: '<color associated with the region>',
            region_description: '<Description of the region>',
            region_attributes: [ {att_name: "<name of the attribute>", att_type: <boolean> } ]
          }];
```
region_attributes is an array of attribute objects.     
The att_type: true defines that the attribute is mandatory and     
att_type: false defines the attribute as optional.           
