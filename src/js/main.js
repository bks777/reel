import Loader from './core/Loader';
import SlotMachine from './reel/SlotMachine';

let sm;
Loader.httpGet({url:'./res/config.json'})
.then((config)=>{
    sm = new SlotMachine(JSON.parse(config));
});