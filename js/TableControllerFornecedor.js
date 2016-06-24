var TableController = {

	table: null,

	setTable: function(table) {
		this.table = table;
	},

	addItem: function(item, editCallback, deleteCallback) {
		if(item) {
			var
			 tbody = TableController.table.tBodies[0],
			    row = TableController.createNewRow(),
			    index = 0;
                
                row.cells[index++].innerHTML = item.nome;
                row.cells[index++].innerHTML = item.telefone;
                row.cells[index++].innerHTML = item.data;
				row.cells[index++].innerHTML = item.codigo;
                row.cells[index++].innerHTML = item.cnpj;
                
				TableController.createActions(row.cells[index++], item, editCallback, deleteCallback);
                

			tbody.appendChild(row);
		}
	},

	addList: function(list, editCallback, deleteCallback) {
		if(list && list.length > 0) {
			for (var i = 0; i < list.length; i++) {
				TableController.addItem(list[i], editCallback, deleteCallback);
			}
		}
	},

	clearList: function() {
		TableController.table.tBodies[0].innerHTML = "";
	},
	
	createNewRow: function() {
		var row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
		row.appendChild(document.createElement('td'));
        row.appendChild(document.createElement('td'));
		return row;
	},

	createActions: function(cell, item, editCallback, deleteCallback) {
		var editElement = document.createElement("span"),
		    deleteElement = document.createElement("span");

		editElement.innerHTML = "Edit";
		editElement.setAttribute("data-nome", item.nome);
		editElement.className = "btn btn-success";

		deleteElement.innerHTML = "Delete";
		deleteElement.setAttribute("data-nome", item.nome);
		deleteElement.className = "btn btn-danger";

		if(editCallback) {
			editElement.onclick = function(){
				var nome = editElement.getAttribute('data-nome');
				editCallback(nome);
			};
		}

		if(deleteCallback) {
			deleteElement.onclick = function(){
				var nome = deleteElement.getAttribute('data-nome');
				deleteCallback(nome, deleteElement);
			};
		}

		cell.appendChild(editElement);
		cell.appendChild(deleteElement);
	}
};