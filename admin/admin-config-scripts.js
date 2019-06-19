var master;
var x;
var regions_div;
var list;
var attr_count;
var region_json = {region: []};
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
	heading.innerHTML = "Regions";

	list = document.createElement("ul");
	list.setAttribute("id", "list_regions");
	list.style = "list-style-type:none; overflow:hidden;";

	let item_1 = document.createElement("li");
	item_1.innerHTML = "Text <input type='checkbox' name='text' value='Text' id='text'>";
	item_1.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_1);

	let item_2 = document.createElement("li");
	item_2.innerHTML = "Graphic <input type='checkbox' name='graphic' value='Graphic' id='graphic'>";
	item_2.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_2);

	let item_3 = document.createElement("li");
	item_3.innerHTML = "Equation <input type='checkbox' name='equation' value='Equation' id='equation'>";
	item_3.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_3);

	let item_4 = document.createElement("li");
	item_4.innerHTML = "Table <input type='checkbox' name='table' value='Table' id='table'>";
	item_4.style = "display: inline-block; margin: 10px;";
	list.appendChild(item_4);

	let new_region = document.createElement("button");
	new_region.setAttribute("type", "btn btn-primary");
	new_region.setAttribute("onclick", "show_popup()");
	new_region.innerHTML = "Add New Region";

	let rm_new_region = document.createElement("button");
	rm_new_region.setAttribute("type", "btn btn-primary");
	rm_new_region.setAttribute("onclick", "remove_popup()");
	rm_new_region.innerHTML = "Remove";

	regions_div.appendChild(heading);
	regions_div.appendChild(list);
	regions_div.appendChild(new_region);
	regions_div.appendChild(rm_new_region);
	master.appendChild(regions_div);
}

function show_popup() {
	var new_region_div = document.getElementById("popup_panel");
	new_region_div.style.display = "block";
}

function remove_popup() {
	var rm_region_div = document.getElementById("popup_panel");
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
	first_half_div.setAttribute("style","width: 600px; float: left;");

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
	second_half_div.setAttribute("style", "margin-left: 620px;")
	division.appendChild(first_half_div);
	division.appendChild(second_half_div);
	var region_area = document.getElementById("region_area");
	region_area.appendChild(division);


	/*switch (true) {
		case document.getElementById("text").checked :
			division.style.display = "block";
			break;
		case document.getElementById("graphic").checked :
			division.style.display = "block";
			break;
		case document.getElementById("equation").checked :
			division.style.display = "block";
			break;
		case document.getElementById("table").checked :
			division.style.display = "block";
			break;
		default :
			division.style.display = "none";
	} */
}

function add_new_region() {
	var name = document.getElementById("name").value;
	var desc = document.getElementById("description").value;
	var color = document.getElementById("region_color").value;
	var list = document.getElementById("list_regions");
	let item = document.createElement("li");

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

	 	item.innerHTML = name + "<input type='checkbox' value='"+name+"' id='"+name+"' title='"+desc+"'>";
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
}

function removeAttr(id) {
	console.log("remove");
	var attr_r = document.getElementById("attr"+id);
	attr_r.remove();
}