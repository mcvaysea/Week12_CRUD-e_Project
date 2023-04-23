// -- Function to Validate inputs for CRUD RMA form
function validateForm() {
	let itemDesc = document.getElementById("itemDesc").value;
	let serialNum = document.getElementById("serialNum").value;
	let locationCode = document.getElementById("locationCode").value;
	let authCode = document.getElementById("authCode").value;

	if (itemDesc == "") {
		alert("Please Enter Item Description");
		return false;
	}

	if (serialNum == "") {
		alert("Item Serial Number Required");
		return false;
	}

	if (locationCode == "") {
		alert("Please Enter Location Code");
		return false;
	}

	if (authCode == "") {
		alert("RMA Authorization Code Required");
		return false;
	}

	return true;
}

// -- Function to show submitted CRUD data
function showData() {
	let returnList;
	if (localStorage.getItem("returnList") == null) {
		returnList = [];
	} else {
		returnList = JSON.parse(localStorage.getItem("returnList"));
	}


	// -- Create RMA table of return items 
	let html = "";

	returnList.forEach(function (element, index) {
		html += "<tr>";
		html += "<td>" + element.itemDesc + "</td>";
		html += "<td>" + element.serialNum + "</td>";
		html += "<td>" + element.locationCode + "</td>";
		html += "<td>" + element.authCode + "</td>";

		html +=
			'<td><button onclick="deleteData(' +
			index +
			')" class="btn btn-danger">Delete</button><button onclick="updateData(' +
			index +
			')" class="btn btn-warning m-2">Edit</button></td>';

		html += "</tr>";
	});

	document.querySelector("#RMAList tbody").innerHTML = html;
}

// -- Load Storage Data Info
document.onload = showData();

// -- Function to add data to CRUD and create local storage point
function addData() {
	if (validateForm() == true) {
		let itemDesc = document.getElementById("itemDesc").value;
		let serialNum = document.getElementById("serialNum").value;
		let locationCode = document.getElementById("locationCode").value;
		let authCode = document.getElementById("authCode").value;

		let returnList;
		if (localStorage.getItem("returnList") == null) {
			returnList = [];
		} else {
			returnList = JSON.parse(localStorage.getItem("returnList"));
		}

		returnList.push({
			itemDesc: itemDesc,
			serialNum: serialNum,
			locationCode: locationCode,
			authCode: authCode,
		});

		localStorage.setItem("returnList", JSON.stringify(returnList));
		showData();
		document.getElementById("itemDesc").value = "";
		document.getElementById("serialNum").value = "";
		document.getElementById("locationCode").value = "";
		document.getElementById("authCode").value = "";
	}
}

// -- Function to delete data from CRUD
function deleteData(index) {
	let returnList;
	if (localStorage.getItem("returnList") == null) {
		returnList = [];
	} else {
		returnList = JSON.parse(localStorage.getItem("returnList"));
	}
	returnList.splice(index, 1);
	localStorage.setItem("returnList", JSON.stringify(returnList));
	showData();
}

// -- Function to update CRUD content
function updateData(index) {
	// -- Trigger update button for edit function
	document.getElementById("Submit").style.display = "none";
	document.getElementById("Update").style.display = "block";

	let returnList;
	if (localStorage.getItem("returnList") == null) {
		returnList = [];
	} else {
		returnList = JSON.parse(localStorage.getItem("returnList"));
	}
	document.getElementById("itemDesc").value = returnList[index].itemDesc;
	document.getElementById("serialNum").value = returnList[index].serialNum;
	document.getElementById("locationCode").value = returnList[index].locationCode;
	document.getElementById("authCode").value = returnList[index].authCode;

	document.querySelector("#Update").onclick = function () {
		if (validateForm() == true) {
			returnList[index].itemDesc = document.getElementById("itemDesc").value;
			returnList[index].serialNum = document.getElementById("serialNum").value;
			returnList[index].locationCode = document.getElementById("locationCode").value;
			returnList[index].authCode = document.getElementById("authCode").value;

			localStorage.setItem("returnList", JSON.stringify(returnList));

			showData();

			document.getElementById("itemDesc").value = "";
			document.getElementById("serialNum").value = "";
			document.getElementById("locationCode").value = "";
			document.getElementById("authCode").value = "";

			// -- Restore add buttons after edit function complete
			document.getElementById("Submit").style.display = "block";
			document.getElementById("Update").style.display = "none";
		}
	};
}
