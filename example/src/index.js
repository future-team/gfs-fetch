/*
import Hello from '../../src/Hello.ts';


const hello = new Hello();

document.body.innerHTML = hello.getMessage();*/

import {Fetch} from '../../src/index';

var fetch:Fetch;
fetch = new Fetch();

fetch.run('/mocks/ajax.json').then((data)=>{
    console.dir(data);
});
