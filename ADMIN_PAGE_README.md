# ADMIN PAGE README
Include the *admin-config-styles.css* file into the <*head*> tag of your HTML file.
```HTML
<link rel="stylesheet" href="admin-config-styles.css">
```
Include the *admin-config-scripts.js* file into your HTML file.

```HTML
<script type="text/javascript" src="admin-config-scripts.js"></script>
```

The *admin-config-scripts.js* can be intialized using *init()* function. It requires a javascript object
```HTML
    <script type="text/javascript">
	 _init_admin_config({container: "master"})
    </script>
```
The object contains the div of the container where the admin tool will be rendered
```
container: "container_id"
```

# How to export the JSON data
## 1. 
You can click on the  *Export* button to get the JSON data of the selected regions. By clicking on that button a JSON file will be downloaded.

## 2.
To get the JSON data simply call the function *get_data()* you will get the JSON data of the selected regions as a string. You can convert it to JSON by following
```HTML
<script>
  // data of selected regions as JSON string
  var data = get_data();
  
  // to convert the string into JSON
  data = JSON.parse(data);
</script>
```
