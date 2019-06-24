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
			init({container: "master"})
		</script>
```
The object contains the div of the container where the admin tool will be rendered
```
container: "container_id"
```

# get_data() function to get the JSON data
