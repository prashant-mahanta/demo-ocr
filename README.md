# Demo-OCR

Download the JavaScript file, **scripts.js**, to your local machine.
```sh
$ curl -o scripts.js https://raw.githubusercontent.com/prashant-mahanta/demo-ocr/master/scripts.js
```

Copy this file to your working directory. The **scripts.js** can be initialized by using **_init()** function.
![Initializing Script](https://github.com/n-ambati/demo-ocr/blob/master/ocr/Screenshot%202019-05-31%20at%202.55.10%20PM.png)

The _init() function requires a JavaScript object as an input argument.
The object should contain an 'id' of the container allocated for rendering the regions as the value of the property
**region_div**.
```sh
region_div: "<id>"
```

Include the information like name of the region, the color to be assigned for it, the description and the attributes
of the region
```sh
region: [
          {
            region_id: 1,
            region_name: "text",
            region_color: '#66ff99',
            region_description: 'text content',
            region_attributes: [ {att_name: "language", att_type: true } ]
          }];
```
