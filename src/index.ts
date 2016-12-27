import Fetch from './Fetch';

let fetchObj:any; 

if(!fetchObj)
    fetchObj = new Fetch(null,null);

export default fetchObj;
export {default as Fetch} from './Fetch';

