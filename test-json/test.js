json_completo = `
{
   "name":"faleconosco",
   "method":"get",
   "action":"enviado.html",
   "autocomplete":true,
   "items":[
      {
         "element":"input",
         "type":"text",
         "name":"nome",
         "placeholder":"Digite seu nome",
         "id":"nome"
      },
      {
         "element":"input",
         "type":"text",
         "name":"cpf",
         "placeholder":"Digite seu cpf",
         "id":"cpf"
      },
      {
         "element":"select",
         "name":"gender",
         "children":[
            {
               "element":"option",
               "value":"F",
               "innerhtml":"Feminino"
            },
            {
               "element":"option",
               "value":"M",
               "innerhtml":"Masculino"
            }
         ]
      },
      {
         "element":"input",
         "type":"text",
         "name":"endereco",
         "placeholder":"Endereço completo: ",
         "id":"endereco"
      },
      {
         "element":"input",
         "type":"text",
         "name":"celular",
         "placeholder":"Celular: (xx) xxxxx-xxxx",
         "id":"celular"
      },
      {
         "element":"input",
         "type":"radio",
         "value":"ADS",
         "name":"curso",
         "id":"ads",
         "poslabel":"Análise e Desenvolvimento de Sistemas"
      },
      {
         "element":"input",
         "type":"radio",
         "value":"EC",
         "name":"curso",
         "id":"ec",
         "poslabel":"Engenharia de Computação"
      },
      {
         "element":"input",
         "type":"checkbox",
         "value":"algoritmos",
         "name":"disciplinas",
         "id":"algoritmos",
         "poslabel":"Algoritmos e Lógica de Programação"
      },
      {
         "element":"input",
         "type":"checkbox",
         "value":"estruturas",
         "name":"disciplinas",
         "id":"estruturas",
         "poslabel":"Estruturas de Dados"
      },
      {
         "element":"input",
         "type":"submit",
         "value":"Enviar",
         "name":"enviar"
      }
   ]
}
`

function parse_to_element(json, form) {

    var elem = document.createElement(json['element']);

    if('type' in json){
        elem.type = json['type'];
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
        var prelabel = document.createElement('label');
        prelabel.htmlFor = json['id'];
        prelabel.innerHTML = json['prelabel'];
        form.appendChild(prelabel);
    }
    if('children' in json) {
        for(var i = 0; i < json['children'].length; i++)
            parse_to_element(json['children'][i], elem);
    }
    if('innerhtml' in json) {
        elem.innerHTML = json['innerhtml'];
    }

    form.appendChild(elem);

    if('poslabel' in json) {
        var poslabel = document.createElement('label');
        poslabel.htmlFor = json['id'];
        poslabel.innerHTML = json['poslabel'];
        form.appendChild(poslabel);
    }
}

function parse_to_form(json, elem) {
    var form = document.createElement('form'); // <form> </form>
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
            parse_to_element(json['items'][i], form);
        }
    }
    elem.appendChild(form);
}

function parse(elemOutputId) {
    var elem = document.getElementById(elemOutputId);
    var json = JSON.parse(json_completo);
    parse_to_form(json, elem);
}