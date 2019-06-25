# Demo-OCR
Include the *seg-tool-styles.css* file into the <*head*> tag of your HTML file.
```HTML
<link rel="stylesheet" href="admin-config-styles.css">
```
Include the *seg-tool-scripts.js* file at the end of your HTML file.
```HTML
<script type="text/javascript" src="seg-tool-scripts.js"></script>
```
 
 The *scripts.js* file can be initialized using *_init()* function. It requires a javascript object as an input.
 ```HTML
<script type="text/javascript">

      var data = {
        container_id: "master",
        shapes: [
          {
            name: 'rectangle',
            code: 'rect',
            region_shape: 'RECT'
          },
          {
            name: 'circle',
            code: 'circle',
            region_shape: 'CIRCLE'
          },
          {
            name: 'polygon',
            code: 'polygon',
            region_shape: 'POLYGON'
          },
          {
            name: 'ellipse',
            code: 'ellipse',
            region_shape: 'ELLIPSE'
          },

        ]
      };

      // get the saved JSON data to this variable(json_data)
      var json_data = '{}';
      try{
        var read_json = JSON.parse(json_data); 
      }
      catch(err){
        read_json = {region:[]}
      }


      data["region"] = read_json["region"];

      // initialize the seg tool
      _init_seg_tool(data);

    </script>
 ```
 
 The object should have the following properties:   
 * *container_id*
 * *region*
 * *shapes*    
 
The *container_id* property carries the id of the container for rendering the tool.
```Javascript
container_id: "container id"
```

The *region* is an array of objects, each object specifying a region.
```Javascript
region: [
          {
            region_id: id,
            region_name: "Name of the region",
            region_color: 'Color',
            region_description: 'Description',
            region_attributes: [array of attribute objects]
          },
          {
            region_id: id,
            region_name: "Name of the region",
            region_color: 'Color',
            region_description: 'Description',
            region_attributes: [array of attribute objects]
          },
          .
          .
          .]
```


*shapes* is similar to *region* property, an array of objects, with each object defining a shape to be rendered.
```Javascript
shapes: [
          {
            name: 'rectangle',
            code: 'rect',
            region_shape: 'RECT'
          },
          {
            name: 'circle',
            code: 'circle',
            region_shape: 'CIRCLE'
          },
          .
          .
          .]
```



## This will how your final data will look like when you will be passing it to the _init function
```Javascript
_init({
        container_id: "master",
        region: [
          {
            region_id: 1,
            region_name: "text",
            region_color: '#66ff99',
            region_description: 'text content',
            region_attributes: [ {att_name: "language", att_type: true }, { att_name: "abc", att_type: false }]
          },
          {
            region_id: 2,
            region_name: "graphic",
            region_color: '#ff0000',
            region_description: 'graphic content',
            region_attributes: [{att_name: "language", att_type: false }, { att_name: "adbc", att_type: true }]
          },
          {
            region_id: 3,
            region_name: "equation",
            region_color: '#0000ff',
            region_description: 'Maths equations',
            region_attributes: [ {att_name: "lm", att_type: false }, { att_name: "abc", att_type: false }]
          },
          {
            region_id: 4,
            region_name: "table",
            region_color: '#ffff00',
            region_description: 'Table content',
            region_attributes: [ {att_name: "abcd", att_type: true }, { att_name: "mabc", att_type: true }]
          }
        ],
        shapes: [
          {
            name: 'rectangle',
            code: 'rect',
            region_shape: 'RECT'
          },
          {
            name: 'circle',
            code: 'circle',
            region_shape: 'CIRCLE'
          },
          {
            name: 'polygon',
            code: 'polygon',
            region_shape: 'POLYGON'
          },
          {
            name: 'ellipse',
            code: 'ellipse',
            region_shape: 'ELLIPSE'
          },

        ]
      });
```
