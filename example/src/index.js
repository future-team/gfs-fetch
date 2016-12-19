/*
import Hello from '../../src/Hello.ts';


const hello = new Hello();

document.body.innerHTML = hello.getMessage();*/
import {Fetch} from '../../src/index';

var fetch;
fetch = new Fetch();

var root = document.getElementById('root');
document.getElementById('getAjax').onclick = function(){
    fetch.run('/mocks/ajax.json').then((data)=>{
        root.innerHTML = data.message;
    });
};

document.getElementById('ajaxError').onclick = function(){

    fetch.run('/mocks/ajax.jsons').then((data)=>{

    },function(ex){
        root.innerHTML = `<font color="red">${ex.responseText}</font>`;
    });
};