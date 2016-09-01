class Bind {
    constructor(model, view, ...props){
      //[...props] estou usando Rest operator para os parametros cairem como array
      let proxy = ProxyFactory.create(model, props, (model) => view.update(model));

      //para atualizar a view pela primeira vez quando e rendenizada.
      view.update(model);

      return proxy;
    }
}
