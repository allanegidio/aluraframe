class ProxyFactory {
    static create(objectToCreate, propsToObserve, action){
      return new Proxy(objectToCreate, {
          get(target, prop, receiver) {
              if(propsToObserve.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                  return function() {
                       console.log(`interceptando ${prop}`);
                       //Aqui eu armazeno o reflect em uma variavel para aplicar
                       //as mudancas mesmo e nao precisar usar o return na action(target)
                       let funcaoComRetorno = Reflect.apply(target[prop], target, arguments);
                       action(target);
                       return funcaoComRetorno;
                  }
              }
              return Reflect.get(target, prop, receiver);
          },

          set(target, prop, value, receiver){
              //Aqui eu armazeno o reflect em uma variavel para aplicar
              //as mudancas mesmo se o if nao for //true
              let reflect = Reflect.set(target, prop, value, receiver);
              if(propsToObserve.includes(prop)){
                  target[prop] = value;
                  action(target);
              }
              return reflect;
          }
      });
    }

    static _ehFuncao(func){
      return typeof(func) == typeof(Function);
    }
}
