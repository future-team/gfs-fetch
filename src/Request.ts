//import {RequestInter} from './Request.inter';
import jqParam from 'jquery-param';


export  interface RequestInter{
    get():void;
    post():void;
}

export default class Request implements RequestInter{

    private xhrs:any[];

    constructor(){

    }

    protected getXMLHttpRequest() {
        let xhr = null;
        try {
            xhr = new ActiveXObject("microsoft.xmlhttp");
        } catch (e1) {
            try {
                //非IE浏览器
                xhr = new XMLHttpRequest();
            } catch (e2) {
                window.alert("您的浏览器不支持ajax，请更换！");
            }
        }
        return xhr;
    }

    noc(){

    }

    protected send(url:string,opts={} ){
        opts.success = opts.success || this.noc;
        opts.error = opts.error || this.noc;

        if(typeof(opts.dataType) =='undefined' ){
            opts.dataType = 'json';
        }

        if(typeof(opts.asyn) == 'undefined' ){
            opts.asyn = true;
        }

        let x = this.getXMLHttpRequest(),
            _this = this;
            //uid = 'uid_'+new Date().getTime()+(Math.random()*1e10).toFixed(0);

        x.open(opts.method || this.method, url,opts.asyn);
       // this.xhrs[uid]=x;

        if(opts.timeout){
            setTimeout(()=>{
                x.abort();
                //_this.removeXhr(uid);
            },opts.timeout);
        }

        if (opts.credentials === 'include') {
            x.withCredentials = true;
        }

        x.onreadystatechange = function() {

            switch (x.readyState){
                case 0:
                    opts.abort.call(x);
                    break;
                case 4:
                    //_this.removeXhr(uid);
                    if (x.status>=200&&x.status<300||x.status==304){
                        let ret;
                        if (/xml/i.test(x.getResponseHeader('content-type'))){
                            ret=x.responseXML;
                        }else if(opts.dataType && opts.dataType.toLowerCase() =='json' ){
                            ret = JSON.parse(x.responseText);//eval("("+x.responseText+")");
                        }else{
                            ret=x.responseText;
                        }
                        opts.success.call(x,ret,x);
                    }else{
                        opts.error.call(x,x);
                    }
                    break;
            }
        };
        opts.header = opts.header?opts.header:{};
        if (opts.method && opts.method.toUpperCase() === 'POST' && !opts.header['Content-Type'] ) {
            //x.setRequestHeader('Content-Type', 'application/json');
            //x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            opts.header['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if (!opts.cache&&opts.header&&!('If-Modified-Since' in opts.header)){
            //x.setRequestHeader("If-Modified-Since","Thu, 01 Jan 1970 00:00:00 GMT");
            opts.header['If-Modified-Since'] = "Thu, 01 Jan 1970 00:00:00 GMT";
        }
        x.setRequestHeader('Accept', '*/*');

        for (let t in opts.header){
            x.setRequestHeader(t,opts.header[t]);
        }
        x.send(opts.data || null );

        return x;
    }

    /*removeXhr(uid){
        if (uid in this.xhrs){
            delete this.xhrs[uid];
        }
    }

    abort(){
        let uid,xhr;
        for (uid in this.xhrs){
            xhr=this.xhrs[uid].abort();
            this.removeXhr(uid);
        }

        return this;
    }*/

    ajax(url:string,opts):any{

        if(opts.method && opts.method.toLowerCase() == 'post'){
            return this.post(url,opts);
        }else if(opts.method && opts.method.toLowerCase() == 'get'){
            return this.get(url,opts);
        }else{
            return this.send(url, opts);
        }
    }

    get(url:string, opts):any {
        opts = opts || {};
        opts.method = 'GET';

        var query = jqParam(opts.data);
        var sym = url.indexOf('?')!=-1 ? '&':'?';
        var fullUrl = url + (query.length ? sym + query : '');
        opts.data = null;
        return this.send(fullUrl, opts);

    }

    post(url:string, opts) {
        opts = opts || {};
        opts.method = 'POST';

        opts.data = typeof(opts.data)!='string'? jqParam(opts.data) : opts.data;
        return this.send(url, opts);
    }

    fetch(url:string ,opts){
        //let param = {};
        /*if(this.isMock() ){
            url = this.mockAddress+url.split('?')[0].toLowerCase()+'.json';
            opts.method = 'GET';
        }*/
        //url+='uuid='+(+new Date());

        return this.ajax(url,opts);
    }
}