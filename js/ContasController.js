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
        contas.valor = form.valor.value;
        contas.dta = form.dta.value;
        contas.idstatus = form.idstatus.value;
        contas.formapg =form.formapg.value;
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
            var contasList = ContasDAO.retrieve();
           if (contasList && contasList.length) {
			TableController.addList(contasList, Index.edit, Index.delete);
		}
	},
    //editar os campos do usuario
 
        	edit: function(nome) {
		if(confirm("Você deseja editar a conta " + nome + " ?")) {
			var conta = ContaDAO.get(nome);
			if (conta) {
				var form = document.getElementById('form');
                    form.nome.value = conta.nome;
                    form.valor.value =  conta.valor;
                    form.dta.value =  conta.dta;
                    form.idstatus.value =  conta.idstatus;
                    form.formapg.value = conta.formapg;
                    
            }
        }
},

    //deletar o conta

delete: function(nome, element) {
		if(confirm("Você deseja deletar a conta " + nome + " ?")) {
			var conta = ContaDAO.get(nome);
			if (conta) {
				if(ContasDAO.delete(nome)) {
					var row = element.parentNode.parentNode;
					row.parentNode.removeChild(row);
				}
			}	
		}
	}
};


//initialization
ContasDAO.unserializeAndParse();
Index.init();