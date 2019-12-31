import {deliver} from 'react-deliverer';

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(new Date());
        }, time);
    });
}

@deliver('demo_home')
class HomeModel {
    loading = false;
    time = null;
    * getTime() {
        this.loading = true;
        this.time = yield wait(1000);
        this.loading = false;
        this.time = yield wait(1000);
        this.time = yield wait(1000);
        this.time = yield wait(1000);
    }
}
export default new HomeModel();