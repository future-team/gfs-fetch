//import {FetchInter} from './Fetch.inter';
import Request from './Request';
import Promise from 'Promise';


export interface FetchInter{
    run():any;
    mock?:Object;
}

export default class Fetch implements FetchInter{

    private loadingBar:any;
    private mock:any;

    /**
     * 构造函数
     * @param mock{object} mock实例化对象，需要实现
     * */
    constructor(mock:any,loadingBar:any){

        this.mock = mock;
        this.loadingBar = loadingBar;

        if(!this.mock ){
            this.mock = {
                getUrl:(url:string)=>{
                    console && console.warn('[Fetch mock getUrl]','未设置mock数据功能！');
                    return url;
                }
            };
        }

        if(!this.loadingBar){
            this.loadingBar = {
                run:()=>{
                    console && console.warn('[Fetch loadingBar run]','未设置loadingbar功能！');
                },
                end:()=>{
                    //console && console.warn('[Fetch loadingBar  end]','未设置loadingbar');
                }
            };
        }
    }

    fetch(url:string,params={},success = (data:{},xhr:any)=>{},error= (xhr:any)=>{},opts={
    } ){

        //todo 需要处理是否加载loadingbar的逻辑

        this.loadingBar.run();
        //todo 处理是否是走的mock链接

        opts.success = (data:{},xhr:any)=>{
            this.loadingBar.end();
            success && success(data,xhr);
        };
        opts.error =(xhr:any)=>{
            this.loadingBar.end();
            error && error(xhr);
        };
        opts.data = params;

        return new Request().fetch(this.mock.getUrl(url),opts );
    }

    /**
     * 执行异步操作
     * @param url{string} ajax请求路径
     * @param options{object} 包含dataType、asyn、method、timeout、credentials=include、header={}
     * @return promise
     * */
    run(url:string,options={body:{},method:'GET'} ){

        const _this = this;
        return new Promise<string>(function(resolve:any, reject:any) {

            _this.fetch(url,options.body,(data,xhr)=>{
                resolve(data,xhr);
            },(xhr)=>{
                reject(xhr);
            },options);
        });
    }
}