let json_completo = `
{
	"name":"complexo",
	"method":"get",
	"action":"consegui.html",
	"autocomplete":true,
	"items":[
	   {
		  "element":"input",
		  "type":"text",
		  "name":"cidade",
		  "placeholder":"informe aqui o seu nome",
		  "prelabel":"Nome:"
	   },
	   {
		  "element":"input",
		  "type":"text",
		  "name":"cidade",
		  "placeholder":"informe aqui a sua cidade",
		  "prelabel":"Cidade:"
	   },
	   {
		  "element":"select",
		  "name":"idade",
		  "children":[
			 {
				"element":"option",
				"value":"less18",
				"innerhtml":"Menos de 18 anos"
			 },
			 {
				"element":"option",
				"value":"18a59",
				"innerhtml":"18 a 59"
			 },
			 {
				"element":"option",
				"value":"60a64",
				"innerhtml":"60 a 64"
			 },
			 {
				"element":"option",
				"value":"65a69",
				"innerhtml":"65 a 69"
			 },
			 {
				"element":"option",
				"value":"70a74",
				"innerhtml":"70 a 74"
			 },
			 {
				"element":"option",
				"value":"75more",
				"innerhtml":"75 ou mais"
			 }
		  ],
		  "prelabel":"Qual a sua idade?"
	   },
	   {
		  "element":"input",
		  "type":"checkbox",
		  "value":"saude",
		  "name":"areaatuacao",
		  "id":"cb-saude",
		  "prelabel":"Qual a sua área de atuação?",
		  "poslabel":"Saúde"
	   },
	   {
		  "element":"input",
		  "type":"checkbox",
		  "value":"educacao",
		  "name":"areaatuacao",
		  "id":"cb-educacao",
		  "poslabel":"Educação"
	   },
	   {
		  "element":"input",
		  "type":"checkbox",
		  "value":"seguranca",
		  "name":"areaatuacao",
		  "id":"cb-seguranca",
		  "poslabel":"Segurança"
	   },
	   {
		  "element":"input",
		  "type":"checkbox",
		  "value":"outro",
		  "name":"areaatuacao",
		  "id":"cb-outro",
		  "poslabel":"Outra"
	   },
	   {
		  "element":"input",
		  "type":"radio",
		  "value":"sim",
		  "name":"comorbidades",
		  "id":"comorbidades-sim",
		  "prelabel":"Você tem alguma comorbidade que agrave a COVID-19?",
		  "poslabel":"Sim"
	   },
	   {
		  "element":"input",
		  "type":"radio",
		  "value":"nao",
		  "name":"comorbidades",
		  "id":"comorbidades-nao",
		  "poslabel":"Não"
	   },
	   {
		  "element":"input",
		  "type":"radio",
		  "value":"sim",
		  "name":"gestante",
		  "id":"gestante-sim",
		  "prelabel":"Você é gestante?",
		  "poslabel":"Sim"
	   },
	   {
		  "element":"input",
		  "type":"radio",
		  "value":"nao",
		  "name":"gestante",
		  "id":"gestante-nao",
		  "poslabel":"Não"
	   },
	   {
		  "element":"input",
		  "type":"submit",
		  "value":"Enviar"
	   }
	]
 }
`

function parse_to_element(json, form) {   
    
    let elem = document.createElement(json['element']);    
    let br = document.createElement('br');
    let padding = document.createAttribute('style');
    
    let section = document.createElement('section'); //<section> </section>
    let tagClass = document.createAttribute('class');

    
    section.appendChild(elem); // criação de um section para cada imput
    form.appendChild(section); // inserção de section dentro do form
    

    if('type' in json){
        elem.type = json['type'];
        // padding.value = 'padding-left: 10px';
    }
    if('value' in json) {
        elem.value = json['value'];
    }
    if('name' in json) {
        elem.name = json['name'];
    }
    if('placeholder' in json) {
        elem.placeholder = json['placeholder'];
    }
    if('id' in json) {
        elem.id = json['id'];
    }          

    if('prelabel' in json) {
        let prelabel = document.createElement('label');
        
        if('id' in json)
            prelabel.htmlFor = json['id'];
        if(elem.type == 'checkbox' || elem.type == 'radio'){
            prelabel.innerHTML = json['prelabel']+'<br>';   
        }
        else
            prelabel.innerHTML = json['prelabel'];  
       
        // form.appendChild(prelabel);
            section.appendChild(prelabel);
    }   

    form.appendChild(elem);
    if('children' in json) {
        for(let i = 0; i < json['children'].length; i++){
            parse_to_element(json['children'][i], elem);
        }
    }
    if('innerhtml' in json) {
        elem.innerHTML = json['innerhtml'];
    }
    
    // form.appendChild(elem);
    section.appendChild(elem)
    
    if('poslabel' in json) {
        let poslabel = document.createElement('label');
        if('id' in json)
            poslabel.htmlFor = json['id'];
        
        poslabel.innerHTML = json['poslabel'];
        form.appendChild(poslabel);    
        section.appendChild(poslabel);
    }
    
    section.appendChild(br);
    // form.appendChild(br);

    // form.innerHTML = "</div>";
    section.appendChild(element);    
    document.form.appendChild(section);
    
}

function parse_to_form(json, elem) {
    let form = document.createElement('form'); // <form> </form>   

    if('name' in json)
        form.name = json['name']; // <form name="nome"></form>
    if('method' in json)
        form.method = json['method'];
    if('action' in json)
        form.action = json['action'];
    if('autocomplete' in json)
        form.autocomplete = json['autocomplete'];
    if('css' in json)
        form.style = json['css'];
    if('items' in json) {
        for(var i = 0; i < json['items'].length; i++) { 
            // form.appendChild(section);           
            parse_to_element(json['items'][i], form);
            console.log(json['items'][i]);
            console.log(form);
        }
        
    }

    // form.appendChild(section);
    elem.appendChild(form);
}

function parse(elemOutputId) {
    let elem = document.getElementById(elemOutputId);
    let json = JSON.parse(json_completo);
    parse_to_form(json, elem);
}