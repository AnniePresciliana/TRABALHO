var ContasDAO = {

	DB_KEY: "contas",
	NEW: 1,
	UPDATE: 2,

	list: [], 

	save: function(contas, tableController) {
		var list  = ContasDAO.list,
		    index = ContasDAO.getIndex(contas);
		
		if(index > -1) {
			list[index] = contas;
		ContasDAO.serializeAndSave();
			return ContasDAO.UPDATE;
		}
		else {
			list.push(contas);
			if(tableController) {
				tableController.addItem(contas);
			}
		}
		
		ContasDAO.serializeAndSave();

		return ContasDAO.NEW;
        
	},

	retrieve: function() {
		var list = ContasDAO.list;
		if(list && list.length > 0) {
			return list;
		}
		return null;
	},

	get: function(nome) {
		var list  = ContasDAO.list,
		    index = ContasDAO.getIndex({'nome': nome});

		if (index > -1) {
			var contas = list[index];
			return contas;
		}

		return null;
	},

	getIndex: function(contas) {
		var list = ContasDAO.list,
		    item = {};

		for (var i = 0; i < list.length; i++) {
			item = list[i];
			if(item.nome == contas.nome) {
				return i;
			}
		}

		return -1;
	},

	delete: function(nome) {
		var list  = ContasDAO.list,
		    index = ContasDAO.getIndex({'nome': nome});

		if (index > -1) {
			list.splice(index, 1);
			ContasDAO.serializeAndSave();
			return true;
		}

		return false;
	},

	serializeAndSave: function() {
		var list = ContasDAO.list;
		if(list && list.length > 0) {
			var json = JSON.stringify(ContasDAO.list);
			window.localStorage.setItem(ContasDAO.DB_KEY, json);
		}
	},

	unserializeAndParse: function() {
		var json = window.localStorage.getItem(ContasDAO.DB_KEY);
		if(json) {
			ContasDAO.list = JSON.parse(json);
		}
		else {
			ContasDAO.list = [];
		}
	}

};