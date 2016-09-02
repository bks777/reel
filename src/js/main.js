console.info('init');
import Loader from './core/Loader';

let reel,
    promise = Loader.httpGet({url:'./res/config.json'})
        .then((config)=>{
            // reel = new App(JSON.parse(config));
        });