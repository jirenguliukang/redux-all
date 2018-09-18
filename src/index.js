
import {createStore,applyMiddleware} from "./redux"
// ReactDOM.render(<App />, document.getElementById('root'));
 let counter=(state=1,action)=>{
     if(action){
        switch (action.type){
            case "ADD":
            return state+1
            case "SUB":
            return state-1
            default:
            return state
        }
     }
    else{
        return state
    }
 }


 let logger1=store=>next=>action=>{
    console.log("logger1 before",store.getState());
    next(action);
    console.log("logger1 after",store.getState());
};
let logger2=store=>next=>action=>{
    console.log("logger2 before",store.getState());
    next(action);
    console.log("logger2 after",store.getState());
}


// let logger=function(store){
//     return function(next){ //next =dispatch
//        return function(action){

//        }
//     } 
// }


//  let finalCreateStore=applyMiddleware(logger);
//  let store = createStore(counter);
//  console.log(store.getState());
//  store.dispatch({"type":"ADD"});

// let thunk = store => next => action =>{
//     if(typeof action === "function"){
//          return action(next);
//     } 
//     return next(action);
// }



//如果放入多个中间件的时候，从左到右依次执行
let store = applyMiddleware(logger1,logger2)(createStore)(counter);
store.subscribe(function(){
    console.log(store.getState());
})
store.dispatch({"type":"ADD"});
// store.dispatch(function(dispatch){
//     setTimeout(function(){
//         dispatch({"type":"ADD"});
//     }, 3000);
// })