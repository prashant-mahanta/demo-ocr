# Demo-OCR

Include the *scripts.js* file into your code.
```sh
<script type="text/javascript" src="https://github.com/prashant-mahanta/demo-ocr/blob/master/scripts.js"></script>
```
 
 The *scripts.js* file can be initialized using *_init()* function. It requires a javascript object as an input.
 ```sh
 <script type="text/javascript">
     _init(<javascript object>)
 </script>
 ```
 
 The object should have the following properties:   
 * *region_div*
 * *region*
 * *shape_id*
 * *shapes*

The *region_div* property carries the id of the container for rendering regions.
```sh
region_div: "<container id>"
```

The *region* is an array of objects, each object specifying a region.
```sh
region: [
          {
            region_id: <id>,
            region_name: "<Name of the region>",
            region_color: '<Color>',
            region_description: '<Description>',
            region_attributes: [<array of attribute objects>]
          },
          {
            region_id: <id>,
            region_name: "<Name of the region>",
            region_color: '<Color>',
            region_description: '<Description>',
            region_attributes: [<array of attribute objects>]
          },
          .
          .
          .]
```
