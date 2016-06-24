var FornecedorDAO = {

	DB_KEY: "fornecedores",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(fornecedor, tableController) {
		var list  = FornecedorDAO.list,
		    index = FornecedorDAO.getIndex(fornecedor);
		
		if(index > -1) {
			list[index] = fornecedor;
		FornecedorDAO.serializeAndSave();
			return FornecedorDAO.UPDATE;
		}
		else {
			list.push(fornecedor);
			if(tableController) {
				tableController.addItem(fornecedor);
			}
		}
		
		FornecedorDAO.serializeAndSave();

		return FornecedorDAO.NEW;
	},

	retrieve: function() {
		var list = FornecedorDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = FornecedorDAO.list,
		    index = FornecedorDAO.getIndex({'nome': nome});

		if (index > -1) {
			var fornecedor = list[index];
			return fornecedor;
		}

		return null;
	},

	getIndex: function(fornecedor) {
		var list = FornecedorDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == fornecedor.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = FornecedorDAO.list,
		    index = FornecedorDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			FornecedorDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = FornecedorDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(FornecedorDAO.list);
			window.localStorage.setItem(FornecedorDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(FornecedorDAO.DB_KEY);
		if(json) {
			FornecedorDAO.list = JSON.parse(json);
		}
		else {
			FornecedorDAO.list = [];
		}
	}

};