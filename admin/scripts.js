var master;
var x;
var regions_div;
var list;

function init(event) {
	master = document.getElementById(event["container"]);
	populate_pre_defined_regions();
	//show_popup();
}

function populate_pre_defined_regions() {
	regions_div = document.createElement("div");
	let heading = document.createElement("h1");
	heading.innerHTML = "Regions";

	list = document.createElement("ul");
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

	regions_div.appendChild(heading);
	regions_div.appendChild(list);
	regions_div.appendChild(new_region);
	master.appendChild(regions_div);
}

function show_popup() {
	let division = document.createElement("div");
	division.setAttribute("id", "popup_panel");
	division.style = "display:block;"
	//let form = document.createElement("form");
	//form.setAttribute("id", "_form");

	let name_div = document.createElement("div");
	name_div.setAttribute("class", "popup");
	name_div.innerHTML = "Name of the Region <br> ";
	let name = document.createElement("input");
	name.type = "text";
	name.name = "name";
	name.placeholder = "Name of the Region";
	name_div.appendChild(name);
	division.appendChild(name_div);

	let desc_div = document.createElement("div");
	desc_div.setAttribute("class", "popup");
	desc_div.innerHTML = "Description <br>";
	let desc = document.createElement("textarea");
	desc.type = "text";
	desc.name = "description";
	desc.placeholder = "Description";
	desc.setAttribute("cols", "40");
	desc.setAttribute("rows", "5");
	desc_div.appendChild(desc);
	division.appendChild(desc_div);

	let colour_div = document.createElement("div");
	colour_div.setAttribute("class", "popup");
	colour_div.innerHTML = "Color <br>";
	let colour = document.createElement("input");
	colour.type = "color";
	colour.name = "region_color";
	colour.value = "#ff0000";
	colour_div.appendChild(colour);
	division.appendChild(colour_div);

	let btn_div = document.createElement("div");
	btn_div.setAttribute("class", "popup");
	let save_btn = document.createElement("button");
	save_btn.type = "btn btn-primary";
	save_btn.innerHTML = "Save";
	save_btn.setAttribute("onclick", "add_new_region()");
	btn_div.appendChild(save_btn);
	division.appendChild(btn_div);

	
	master.appendChild(division);


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
	x = document.getElementById("popup_panel");
	let item = document.createElement("li");
	item.innerHTML = "Table <input type='checkbox' value='Table' id='table'>";
	item.name = x.elements[0].value;
	item.style = "display: inline-block; margin: 10px;";
	list.appendChild(item);
}

