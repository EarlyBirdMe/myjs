Function.prototype.bind = function(scope) {
  var _function = this;
  
  return function() {
    return _function.apply(scope, arguments);
  }
}

object = {
  name: "object",
  
  action: function() {
    nestedAction = function(greeting) {
      console.log(greeting + " " + this.name);
    }.bind(this) // <- bound to "object"
    
    nestedAction("hello");
  }
}

object.action("hello");