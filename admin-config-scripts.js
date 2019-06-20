var master;
var x;

// Google edit symbol
const css = document.createElement("link");
css.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
css.setAttribute("rel", "stylesheet");
document.querySelector("head").appendChild(css);

var regions_div;
var list;
var attr_count;
var region_json = {region: [
	{
		
    	region_name: "text",
    	region_color: '#66ff99',
    	region_description: 'text content',
    	region_attributes: [{att_name: "language", att_type: true }, { att_name: "abc", att_type: false }]
    },
    {
    	
    	region_name: "graphic",
    	region_color: '#ff0000',
    	region_description: 'graphic content',
    	region_attributes: [{att_name: "language", att_type: false }, { att_name: "adbc", att_type: true }]
    },
    {
    	
        region_name: "equation",
        region_color: '#0000ff',
        region_description: 'Maths equations',
        region_attributes: [ {att_name: "lm", att_type: false }, { att_name: "abc", att_type: false }]
    },
    {
        
        region_name: "table",
        region_color: '#ffff00',
        region_description: 'Table content',
        region_attributes: [ {att_name: "abcd", att_type: true }, { att_name: "mabc", att_type: true }] 
    }
]};

function init(event) {
	master = document.getElementById(event["container"]);
	populate_pre_defined_regions();
	//show_popup();
	create_popup();
	attr_count = 0;
}

function populate_pre_defined_regions() {
	regions_div = document.createElement("div");
	regions_div.setAttribute("id", "region_area");
	let heading = document.createElement("h1");
	heading.setAttribute("id", "reg_head");
	heading.innerHTML = "Regions";

	list = document.createElement("ul");
	list.setAttribute("id", "list_regions");
	list.style = "list-style-type:none; overflow:hidden;";

	let item_1 = document.createElement("li");
	item_1.innerHTML = "<button onclick='edit_regions("+"text"+")'>Text<i class='material-icons' style='font-size:10px;'>border_color</i></button> <input type='checkbox' name='text' value='text' id='text'>";
	item_1.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_1);

	let item_2 = document.createElement("li");
	item_2.innerHTML = "<button onclick='edit_regions("+"graphic"+")'>Graphic<i class='material-icons' style='font-size:10px;'>border_color</i></button> <input type='checkbox' name='graphic' value='graphic' id='graphic'>";
	item_2.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_2);

	let item_3 = document.createElement("li");
	item_3.innerHTML = "<button onclick='edit_regions("+"equation"+")'>Equation<i class='material-icons' style='font-size:10px;'>border_color</i></button> <input type='checkbox' name='equation' value='equation' id='equation'>";
	item_3.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_3);

	let item_4 = document.createElement("li");
	item_4.innerHTML = "<button onclick='edit_regions("+"table"+")'>Table<i class='material-icons' style='font-size:10px;'>border_color</i></button> <input type='checkbox' name='table' value='table' id='table'>";
	item_4.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_4);

	let new_region = document.createElement("button");
	new_region.setAttribute("type", "btn btn-primary");
	new_region.setAttribute("onclick", "show_popup()");
	new_region.style = "margin-left: 4%;";
	new_region.innerHTML = "Add New Region";

	let rm_new_region = document.createElement("button");
	rm_new_region.setAttribute("type", "btn btn-primary");
	rm_new_region.setAttribute("onclick", "remove_popup()");
	rm_new_region.style = "margin-left: 10px;";
	rm_new_region.innerHTML = "Remove";

	let export_region = document.createElement("button");
	export_region.setAttribute("type", "btn btn-primary");
	export_region.setAttribute("onclick", "export_data()");
	export_region.style = "margin-left: 10px;";
	export_region.innerHTML = "EXPORT";

	regions_div.appendChild(heading);
	regions_div.appendChild(list);
	regions_div.appendChild(new_region);
	regions_div.appendChild(rm_new_region);
	regions_div.appendChild(export_region);
	master.appendChild(regions_div);
}

function save_data_to_local_file(data, filename) {
  var a      = document.createElement('a');
  a.href     = URL.createObjectURL(data);
  a.target   = '_blank';
  a.download = filename;

  // simulate a mouse click event
  var event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  a.dispatchEvent(event);
}

function export_data(){
	data = {region:[]};
	for(var i=0; i<region_json["region"].length; i++) {
		var name = region_json["region"][i]["region_name"];
		var check = document.getElementById(name);
		if(check.checked){
			data["region"].push(region_json["region"][i]);
		}
	}
	// alert(JSON.stringify(data));
	var all_region_data = [JSON.stringify(data)];
  	var blob_attr = {type: 'text/json;charset=utf-8'};
  	var all_region_data_blob = new Blob(all_region_data, blob_attr);
  	save_data_to_local_file(all_region_data_blob, "Regions.json");
}

function show_popup() {
	var new_region_div = document.getElementById("popup_panel");
	if(new_region_div){
		new_region_div.style.display = "block";
		// console.log('there');
	}
	else{
		create_popup();
		new_region_div = document.getElementById("popup_panel");
		new_region_div.style.display = "block";
		// console.log("not there");
	}
	var edit_panels = document.getElementById("popup_panel_edit");
	while(edit_panels){
		edit_panels.remove();
		edit_panels = document.getElementById("popup_panel_edit");
	}
}

function remove_popup() {
	var rm_region_div = document.getElementById("popup_panel");
	if(rm_region_div)
		rm_region_div.remove();

	rm_region_div = document.getElementById("popup_panel_edit");
	if(rm_region_div)
		rm_region_div.remove();
	create_popup();
	attr_count = 0;
}
function remove_edit_popup() {
	var rm_region_div = document.getElementById("popup_panel_edit");
	if(rm_region_div)
		rm_region_div.remove();
	create_popup();
	attr_count = 0;
}

function create_popup() {
	let division = document.createElement("div");
	division.setAttribute("id", "popup_panel");
	division.style = "display:none; width: 100%; overflow: hidden;"
	//let form = document.createElement("form");
	//form.setAttribute("id", "_form");

	var first_half_div = document.createElement("div");
	first_half_div.setAttribute("id", "first_half");
	first_half_div.setAttribute("style","width: 50%; float: left;");

	let name_div = document.createElement("div");
	name_div.setAttribute("class", "popup");
	name_div.innerHTML = "Name of the Region <br> ";
	let name = document.createElement("input");
	name.type = "text";
	name.id = "name";
	name.placeholder = "Name of the Region";
	name_div.appendChild(name);
	first_half_div.appendChild(name_div);

	let desc_div = document.createElement("div");
	desc_div.setAttribute("class", "popup");
	desc_div.innerHTML = "Description <br>";
	let desc = document.createElement("textarea");
	desc.type = "text";
	desc.id = "description";
	desc.placeholder = "Description";
	desc.setAttribute("cols", "40");
	desc.setAttribute("rows", "5");
	desc_div.appendChild(desc);
	first_half_div.appendChild(desc_div);

	let colour_div = document.createElement("div");
	colour_div.setAttribute("class", "popup");
	colour_div.innerHTML = "Color <br>";
	let colour = document.createElement("input");
	colour.type = "color";
	colour.id = "region_color";
	colour.value = "#ff0000";
	colour_div.appendChild(colour);
	first_half_div.appendChild(colour_div);

	let btn_div = document.createElement("div");
	btn_div.setAttribute("class", "popup");
	let save_btn = document.createElement("button");
	save_btn.type = "btn btn-primary";
	save_btn.innerHTML = "Save";
	save_btn.setAttribute("onclick", "add_new_region()");
	btn_div.appendChild(save_btn);
	first_half_div.appendChild(btn_div);

	var new_attr = document.createElement("div");
	new_attr.setAttribute("class", "popup");
	let new_attr_btn = document.createElement("button");
	new_attr_btn.type = "btn btn-primary";
	new_attr_btn.innerHTML = "Add Attribute";
	new_attr_btn.setAttribute("onclick", "add_new_attribute()");
	new_attr.appendChild(new_attr_btn);
	first_half_div.appendChild(new_attr);

	// second half
	var second_half_div = document.createElement("div");
	second_half_div.setAttribute("id", "second_half");
	second_half_div.setAttribute("style", "margin-left: 0px;")
	division.appendChild(first_half_div);
	division.appendChild(second_half_div);
	var region_area = document.getElementById("region_area");
	region_area.appendChild(division);

}

function add_new_region() {
	var name = document.getElementById("name").value;
	var desc = document.getElementById("description").value;
	var color = document.getElementById("region_color").value;
	var list = document.getElementById("list_regions");
	let item = document.createElement("li");
	// console.log(name);
	// console.log(desc);
	// console.log(color);
	if (name!=="" && desc!=="" && color!=""){
		var region = {}
		region["region_name"] = name;
		region["region_color"] = color;
		region["region_description"] = desc;
		region["region_attributes"] = [];
		for (var i=1; i<=attr_count; i++){
			var attr = {};
			var attr_name = document.getElementById("attr_name_"+i).value;
			if(attr_name){
				var attr_type = document.getElementById("attr_type_"+i);
				if (attr_type.checked == true) {
					attr["att_name"] = attr_name;
					attr["att_type"] = true;
				}
				else {
					attr["att_name"] = attr_name;
					attr["att_type"] = false;
				}
				region["region_attributes"].push(attr);
			}
		}
		region_json["region"].push(region);

	 	item.innerHTML = "<button onclick='edit_regions("+name+")'>" + name + "<i class='material-icons' style='font-size:10px;'>border_color</i></button>" + "<input type='checkbox' value='"+name+"' id='"+name+"' title='"+desc+"'>";
		// item.name = x.elements[0].value;
		item.style = "display: inline-block; margin: 10px;";
		list.appendChild(item);
		remove_popup();
	}
}

function add_new_attribute() {
	attr_count++;
	var second = document.getElementById("second_half");
	var div_n = document.createElement("div");
	div_n.setAttribute("id", "attr"+attr_count);
	div_n.innerHTML = "Attribute Name: <input type='text' id='attr_name_"+attr_count+"' placeholder='attribute name'> &nbsp;&nbsp;Attribute Type:<input type='checkbox' id='attr_type_"+attr_count+"' title='Mandatory or Optional'> <button type='button' onclick=removeAttr('"+attr_count+"')>remove</button>";
	second.appendChild(div_n);
	// console.log(second);
}

function fill_earlier_attributes(value) {

	for (var i=0; i<region_json["region"].length; i++){

		if(region_json["region"][i]["region_name"] === value){
			
			for (var j=0; j<region_json["region"][i]["region_attributes"].length; j++){
				console.log("fill ");
				edit_attribute(region_json["region"][i]["region_attributes"][j]["att_name"], region_json["region"][i]["region_attributes"][j]["att_type"]);
			}
		}
	}
}
function edit_attribute(value, att_type) {
	attr_count++;
	var second = document.getElementById("second_half");
	var div_n = document.createElement("div");
	div_n.setAttribute("id", "attr"+attr_count);
	div_n.innerHTML = "Attribute Name: <input type='text' id='attr_name_"+attr_count+"' value='"+value+"' placeholder='attribute name'> &nbsp;&nbsp;Attribute Type:<input type='checkbox' id='attr_type_"+attr_count+"' title='Mandatory or Optional'> <button type='button' onclick=removeAttr('"+attr_count+"')>remove</button>";
	second.appendChild(div_n);
	var check = document.getElementById("attr_type_"+attr_count);
	if(att_type)
		check.checked = true;
	else
		check.checked = false;
	console.log(second);
}

function removeAttr(id) {
	// console.log("remove");
	var attr_r = document.getElementById("attr"+id);
	attr_r.remove();
}

function edit_regions(reg_name) {
	let i;
	// console.log("print");
	remove_popup();
	var rm_region_div = document.getElementById("popup_panel");
	if(rm_region_div)
		rm_region_div.remove();

	var edit_panels = document.getElementById("popup_panel_edit");
	while(edit_panels){
		edit_panels.remove();
		edit_panels = document.getElementById("popup_panel_edit");
	}
	attr_count = 0;
	for (i=0; i<region_json["region"].length; i++) {
		// console.log(region_json["region"][i]["region_name"]);
		// console.log(reg_name.value);
		if (region_json["region"][i]["region_name"] === reg_name.value) {
			// console.log(i);

			let division = document.createElement("div");
			division.setAttribute("id", "popup_panel_edit");
			division.style = "display:none; width: 100%; overflow: hidden;"


			var first_half_div = document.createElement("div");
			first_half_div.setAttribute("id", "first_half");
			first_half_div.setAttribute("style","width: 600px; float: left;");

			let name_div = document.createElement("div");
			name_div.setAttribute("class", "popup");
			name_div.innerHTML = "Name of the Region <br> ";
			let name = document.createElement("input");
			name.type = "text";
			name.id = "att_name";
			name.setAttribute("value", region_json["region"][i]["region_name"]);
			name.placeholder = "Name of the Region";
			// name.value = region_json["region"][i]["region_name"];
			name_div.appendChild(name);
			first_half_div.appendChild(name_div);

			let desc_div = document.createElement("div");
			desc_div.setAttribute("class", "popup");
			desc_div.innerHTML = "Description <br>";
			let desc = document.createElement("textarea");
			desc.type = "text";
			desc.id = "att_description";
			desc.placeholder = "Description";

			desc.value = region_json["region"][i]["region_description"];
			desc.setAttribute("cols", "40");
			desc.setAttribute("rows", "5");
			desc_div.appendChild(desc);
			first_half_div.appendChild(desc_div);

			let colour_div = document.createElement("div");
			colour_div.setAttribute("class", "popup");
			colour_div.innerHTML = "Color <br>";
			let colour = document.createElement("input");
			colour.type = "color";
			colour.id = "att_region_color";
			colour.value = region_json["region"][i]["region_color"];
			colour_div.appendChild(colour);
			first_half_div.appendChild(colour_div);

			let btn_div = document.createElement("div");
			btn_div.setAttribute("class", "popup");
			let save_btn = document.createElement("button");
			save_btn.type = "btn btn-primary";
			save_btn.innerHTML = "Save";
			save_btn.setAttribute("onclick", "change_region_details()");
			btn_div.appendChild(save_btn);
			first_half_div.appendChild(btn_div);

			var new_attr = document.createElement("div");
			new_attr.setAttribute("class", "popup");
			let new_attr_btn = document.createElement("button");
			new_attr_btn.type = "btn btn-primary";
			new_attr_btn.innerHTML = "Add Attribute";
			new_attr_btn.setAttribute("onclick", "add_new_attribute()");
			new_attr.appendChild(new_attr_btn);
			first_half_div.appendChild(new_attr);

			// second half
			var second_half_div = document.createElement("div");
			second_half_div.setAttribute("id", "second_half");
			second_half_div.setAttribute("style", "margin-left: 620px;")
			division.appendChild(first_half_div);
			division.appendChild(second_half_div);
			var region_area = document.getElementById("region_area");
			region_area.appendChild(division);
			fill_earlier_attributes(reg_name.value);
			division.style.display = "block";

			//break;
		}
	}
}

function change_region_details(){
	var name = document.getElementById("att_name").value;
	var desc = document.getElementById("att_description").value;
	var color = document.getElementById("att_region_color").value;
	// var list = document.getElementById("list_regions");
	// let item = document.createElement("li");
	// console.log(name);
	// console.log(desc);
	// console.log(color);
	if (name!=="" && desc!=="" && color!=""){
		var region = {}
		region["region_name"] = name;
		region["region_color"] = color;
		region["region_description"] = desc;
		region["region_attributes"] = [];
		for (var i=1; i<=attr_count; i++){
			var attr = {};
			var attr_name = document.getElementById("attr_name_"+i);
			if(attr_name){
				attr_name = attr_name.value;
				var attr_type = document.getElementById("attr_type_"+i);
				if (attr_type.checked == true) {
					attr["att_name"] = attr_name;
					attr["att_type"] = true;
				}
				else {
					attr["att_name"] = attr_name;
					attr["att_type"] = false;
				}
				region["region_attributes"].push(attr);
			}
		}
		// region_json["region"].push(region);

	 // 	item.innerHTML = "<button onclick='edit_regions("+name+")'>" + name + "<i class='material-icons' style='font-size:10px;'>border_color</i></button>" + "<input type='checkbox' value='"+name+"' id='"+name+"' title='"+desc+"'>";
		// // item.name = x.elements[0].value;
		// item.style = "display: inline-block; margin: 10px;";
		// list.appendChild(item);

		for(var i=0; i<region_json["region"].length; i++) {
			if(region_json["region"][i]["region_name"] == name){
				region_json["region"][i] = region;
				break;
			}
		}
		remove_edit_popup();
	}
}