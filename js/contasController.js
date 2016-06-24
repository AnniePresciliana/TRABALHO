var Index = {
    
    init: function() {
        Index.setForm();
        Index.listContas();
    },
    
    //seter o formulario com o onsubmit
    
    setForm: function(){
        var form = document.getElementById('form');
        if(form){
            form.onsubmit = function(){
                Index.saveContas(form);
                return false;
            };
        }
    },
    
    

    //salva os dados
    
    saveContas: function(form){
        var contas = {};
        contas.nome = form.nome.value;
        contas.telefone = form.tel.value;
        contas.data = form.dta.value;
        contas.codigo = form.cod.value;
        contas.cnpj =form.cnpj.value;
        if (ContasDAO.save(contas) == ContasDAO.NEW) {
           TableController.addItem(contas,Index.edit,Index.delete);
        } else{ 
           TableController.clearList();
            Index.listContas();
        }    
               
         

 },
 
    setTable: function(){
        var table = document.getElementById('tabela-contas');
        TableController.setTable(table);
    },
        
        listContas: function () {
            Index.setTable();
            var contaList = ContasDAO.retrieve();
           if (contaList && contasList.length) {
			TableController.addList(contasList, Index.edit, Index.delete);
		}
	},
    //editar os campos do usuario
 
        	edit: function(nome) {
		if(confirm("Você deseja editar a coonta " + nome + " ?")) {
			var conta = ContaDAO.get(nome);
			if (conta) {
				var form = document.getElementById('form');
                    form.nome.value = conta.nome;
                    form.tel.value =  conta.telefone;
                    form.dta.value =  conta.data;
                    form.cod.value =  conta.codigo;
                    form.cnpj.value = conta.cnpj;
                    
            }
        }
},

    //deletar o conta

delete: function(nome, element) {
		if(confirm("Você deseja deletar a conta " + nome + " ?")) {
			var conta = ContaDAO.get(nome);
			if (conta) {
				if(ContarDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};


//initialization
ContaDAO.unserializeAndParse();
Index.init();