import {Dispatcher} from 'flux';
// export default new Dispatcher();
class AppDispatcher extends Dispatcher{
    dispatch(action = {}){
        console.log("Dispatched", action);
        super.dispatch(action);
    }
}
export default new AppDispatcher();