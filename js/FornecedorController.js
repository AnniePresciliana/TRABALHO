var Index = {
    
    init: function() {
        Index.setForm();
        Index.listFornecedor();
    },
    
    //seter o formulario com o onsubmit
    
    setForm: function(){
        var form = document.getElementById('form');
        if(form){
            form.onsubmit = function(){
                Index.saveFornecedor(form);
                return false;
            };
        }
    },
    
    

    //salva os dados
    
    saveFornecedor: function(form){
        var fornecedor = {};
        fornecedor.nome = form.nome.value;
        fornecedor.telefone = form.tel.value;
        fornecedor.data = form.dta.value;
        fornecedor.codigo = form.cod.value;
        fornecedor.cnpj =form.cnpj.value;
        if (FornecedorDAO.save(fornecedor) == FornecedorDAO.NEW) {
           TableController.addItem(fornecedor,Index.edit,Index.delete);
        } else{ 
           TableController.clearList();
            Index.listFornecedor();
        }    
               
            form.nome.value = form.tcc.value = form.orientador.value = "";

 },
 
    setTable: function(){
        var table = document.getElementById('tabela-fornecedores');
        TableController.setTable(table);
    },
        
        listFornecedor: function () {
            Index.setTable();
            var fornecedorList = FornecedorDAO.retrieve();
           if (fornecedorList && fornecedorList.length) {
			TableController.addList(fornecedorList, Index.edit, Index.delete);
		}
	},
    //editar os campos do usuario(aluno)
 
        	edit: function(nome) {
		if(confirm("Você deseja editar o usuário " + nome + " ?")) {
			var fornecedor = FornecedorDAO.get(nome);
			if (fornecedor) {
				var form = document.getElementById('form');
                    form.nome.value = fornecedor.nome;
                    form.tel.value =  fornecedor.telefone;
                    form.dta.value = fornecedor.data;
                    form.cod.value =  fornecedor.codigo;
                    form.cnpj.value=fornecedor.cnpj;
                    
            }
        }
},

    //deletar o usuario(aluno)

delete: function(nome, element) {
		if(confirm("Você deseja deletar o usuário " + nome + " ?")) {
			var fornecedor = FornecedorDAO.get(nome);
			if (fornecedor) {
				if(FornecedorDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};


//initialization
FornecedorDAO.unserializeAndParse();
Index.init();