function HTMLTemplate(str){
    var input = null;
    var EOF = {};
    var element = null;
    var attr = "";
    var attributeNode = null;
    var state = data;
    var text = null;
    var tag = "";
    var errors = [];
    var isEndTag = false;
    var stack = [];
    var i;
    var attrSetter = null;
    var parameterName = null;
    var parameters = null;
    
    function AttributeSetter(attributeNode) {
        this.parts = [];
        this.appendPart = function(part){
            this.parts.push(part);
        }
        this.apply = function(){
            attributeNode.value = this.parts.join("");
        }
    }

    function consumeCharacterReference(additionalAllowedCharacter){
        var c = input[i];
        if(c=="\t"||c=="\n"||c=="\f"||c==" "||c=="<"||c=="&"||c==EOF||c==additionalAllowedCharacter) {
            return;
        }
        if(c=="#") {
            c = consume(1);
            var range = /[0-9]/;
            var num = [];
            var n = 10;
            
            if(c=="x"||c=="X") {
                c = consume(1);
                range = /[a-fA-F0-9]/;
                n = 16;
            }
            
            while(c.match(range)) {
                num.push(c);
                c=consume(1)
            }
            if(c==";")
                consume(1);
            
            return String.fromCharCode(parseInt(num.join(""),n));
        }
    }
    function unconsume(n) {
        i-=n;
        return input[i];
    }
    function consume(n) {
        i+=n;
        return input[i];
    }
    function next(n) {
        if(i+n>input.length)
            return input.slice(i,input.length-i);
        input.slice(i,n);
    }
    function error(){
    }
    function _assert(flag) {
        if(!flag)
            debugger;
    }
    var data = function(c){
        if(c=="&") {
            c = consumeCharacterReference();
            if(c) {
                if(text) 
                    text.appendData(c);
                else {
                    text = document.createTextNode(c);
                    element.appendChild(text);
                }
            }
            else {
                if(text) 
                    text.appendData("&");
                else {
                    text = document.createTextNode("&");
                    element.appendChild(text);                
                }
            }
                
            return data;
        }
        else if(c=="<") {
            text = null;
            return tagOpen;
        }
        else if(c=="\0") {
            error();
        }
        else if(c=="$") {
            return afterDollarInText;            
        }
        else if(c==EOF) {
            text = null;
        }
        else {
            if(text) 
                text.appendData(c);
            else {
                text = document.createTextNode(c);
                element.appendChild(text);
            }
            return data;
        }
    };

    var tagOpen = function(c){
        isEndTag = false;
        if(c=="!") {
            error();
        }
        else if(c=="/") {
            isEndTag = true;
            return endTagOpen;
        }
        else if(c.match(/[a-zA-Z]/)) {
            tag = c.toLowerCase();
            return tagName;
        }
        else if(c=="?") {
            error();
        }
        else {
            error();
            return data("<");
        }
    };


    var endTagOpen = function(c){
    
        if(c.match(/[a-zA-Z]/)) {
            tag = c.toLowerCase();
            return tagName;
        }
        else if(c==">") {
            error();
            return data;
        }
        else if(c==EOF) {
            error();
            data("<");
            data("/");
            return data(EOF);
        }
        else {
            return bogusCommentState;
        }
    };
    var tagName = function(c){
        if(c=="\n"||c=="\f"||c=="\t"||c==" ") {
            stack.push(element);            
            element = document.createElement(tag);
            stack[stack.length-1].appendChild(element);

            

            return beforeAttributeName;
        }
        else if(c=="/") {
            stack.push(element);
            element = document.createElement(tag);
            stack[stack.length-1].appendChild(element);
            
            return selfclosingStartTag;
        }
        else if(c==">") {
            if(isEndTag) {
                _assert(tag == element.tagName.toLowerCase());
                element = stack.pop();
            }
            else {            
                stack.push(element);            
                element = document.createElement(tag);
                stack[stack.length-1].appendChild(element);

            }
            return data;
        }
        else if(c.match(/[a-zA-Z]/)) {
            tag += c.toLowerCase();
            return tagName;
        }
        else if(c=="\0") {
            error();
            tag += "\uFFFD";
            return tagName;
        }
        else if(c==EOF) {
            error();
            return data(EOF);
        }
        else {
            return rcdata;
        }
    };

    var beforeAttributeName = function(c){
        if(c=="\n"||c=="\f"||c=="\t"||c==" ") {
            return beforeAttributeName;
        }
        else if(c=="/") {
            return selfclosingStartTag;
        }
        else if(c==">") {
            return data;
        }
        else if(c.match(/[a-zA-Z]/)) {
            attr += c.toLowerCase();
            return attributeName;
        }
        else if(c=="\0") {
            return data;
        }
        else if(c=="\""||c=="\'"||c=="<"||c=="=") {
            return data;
        }
        else if(c==EOF) {
            return data(EOF);
        }
        else {
            attr = "";
            return attributeName;
        }
    };
    var attributeName = function(c){
        if(c=="\n"||c=="\f"||c=="\t"||c==" ") {
            attributeNode = document.createAttribute(attr);
            element.setAttributeNode(attributeNode);
            attr = "";
            return afterAttributeName;
        }
        else if(c=="/") {
            attributeNode = document.createAttribute(attr);
            element.setAttributeNode(attributeNode);
            attr = "";
            return selfclosingStartTag;
        }
        else if(c=="=") {
            attributeNode = document.createAttribute(attr);
            element.setAttributeNode(attributeNode);
            attr = "";
            return beforeAttributeValue;
        }
        else if(c==">") {
            attributeNode = document.createAttribute(attr);
            element.setAttributeNode(attributeNode);
            attr = "";
            return data;
        }
        else if(c.match(/[a-zA-Z]/)) {
            attr += c.toLowerCase();
            return attributeName;
        }
        else if(c=="\0") {
            error();
            attr += "\uFFFD";
            return attributeName;
        }
        else if(c=="\""||c=="\'"||c=="<") {
            error();
            attr += c;
            return attributeName;
        }
        else if(c==EOF) {
            error();
            return data(EOF);
        }        
        else {
            attr += c;
            return attributeName;
        }
    };
    var afterAttributeName = function(c){
        if(c=="\n"||c=="\f"||c=="\t"||c==" ") {
            return afterAttributeName;
        }
        else if(c=="/") {
            return selfclosingStartTag;
        }
        else if(c=="=") {            
            return beforeAttributeName;
        }
        else if(c==">") {
            return data;
        }
        else if(c.match(/[a-zA-Z]/)) {
            attr = c.toLowerCase();
            return attributeName;
        }
        else if(c=="\0") {
            error();
            attr = "\uFFFD";
            return attributeName;
        }
        else if(c=="\""||c=="\'"||c=="<") {
            error();
            attr = c;
            return attributeName;
        }
        else if(c==EOF) {
            error();
            return data(EOF);
        }        
        else {
            attr = c;
            return attributeName;
        }
    };
    var beforeAttributeValue = function(c){
        if(c=="\n"||c=="\f"||c=="\t"||c==" ") {
            return afterAttributeName;
        }
        else if(c=="\"") {
            return attributeValueDQ;
        }
        else if(c=="&") {
            return attributeValueUQ(c);
        }
        else if(c=="'") {
            return attributeValueSQ;
        }
        else if(c=="\0") {
            error();
            attributeNode.value += "\uFFFD";
            return attributeValueUQ;
        }
        else if(c==">") {
            error();
            return data;
        }
        else if(c=="`"||c=="<"||c=="=") {
            error();
            return attributeName;
        }
        else if(c==EOF) {
            error();
            return data(EOF);
        }        
        else {
            attributeNode.value += c;
            return attributeValueUQ;
        }
    };
    var attributeValueDQ = function(c){
        if(c=="\"") {
            if(attrSetter) {
                attrSetter.appendPart(attributeNode.value);
            }
            attrSetter = null;
            return afterAttributeValueQ;
        }
        else if(c=="$") {
            return afterDollarInAttributeValueDQ;
        }
        else if(c=="&") {
            var c = consumeCharacterReference("\"");
            if(!c)
                attributeNode.value += "&";
            else
                attributeNode.value += c;
            return attributeValueDQ;
        }
        else if(c=="\0") {
            error();
            attributeNode.value += "\uFFFD";
            return attributeValueUQ;
        }
        else if(c==EOF) {
            error();
            return data(EOF);
        }        
        else {
            attributeNode.value += c;
            return attributeValueDQ;
        }
    };
    var attributeValueSQ = function(c){
        if(c=="\'") {
            if(attrSetter) {
                attrSetter.appendPart(attributeNode.value);
            }
            attrSetter = null;
            return afterAttributeValue;
        }
        else if(c=="$") {
            return afterDollarInAttributeValueSQ;
        }
        else if(c=="&") {
            var c = consumeCharacterReference("\'");
            if(!c)
                attributeNode.value += "&";
            else
                attributeNode.value += c;
            return attributeValueUQ;
        }
        else if(c=="\0") {
            error();
            attributeNode.value += "\uFFFD";
            return attributeValueUQ;
        }
        else if(c==EOF) {
            error();
            return data(EOF);
        }        
        else {
            attributeNode.value += c;
            return attributeValueSQ;
        }
    };
    var attributeValueUQ = function(c){
        if(c=="\n"||c=="\f"||c=="\t"||c==" ") {
            if(attrSetter) {
                attrSetter.appendPart(attributeNode.value);
            }
            attrSetter = null;
            return beforeAttributeName;
        }
        else if(c=="$") {
            return afterDollarInAttributeValueUQ;
        }
        else if(c=="&") {
            consumeCharacterReference(">");
            return attributeValueUQ;
        }
        else if(c=="\0") {
            error();
            attributeNode.value += "\uFFFD";
            return attributeValueUQ;
        }
        else if(c=="\""||c=="'"||c=="<"||c=="="||c=="`") {
            error();
            attributeNode.value += c;            
            return attributeValueUQ;
        }
        else if(c==EOF) {
            return data(EOF);
        }        
        else {
            attributeNode.value += c;
            return attributeValueUQ;
        }
    };
    var afterAttributeValueQ = function(c){
        if(c=="\n"||c=="\f"||c=="\t"||c==" ") {
            return beforeAttributeName;
        }
        else if(c=="/") {
            return selfclosingStartTag;
        }
        else if(c==">") {
            return data;
        }
        else if(c==EOF) {
            return data(EOF);
        }
        else {
            error();
            return beforeAttributeName(c);
        }
    };
    var selfclosingStartTag = function(c){
        if(c==">") {
            element = stack.pop();
            return data;
        }
        else if(c==EOF) {
            error();
            return data(EOF);
        }
        else {
            error();
            return beforeAttributeName(c);
        }
    };
    var afterDollarInText = function(c) {
        if(c=="{") {
            return parameterInText;
        }
        else {
            //TODO:
        }
    };
    var parameterInText = function(c) {
        if(c=="}") {
            text = document.createTextNode("");
            var name = parameterName.join("")
            if(parameters[name])
                parameters[name].push(text);
            else parameters[name] = [text];
            element.appendChild(text);
            parameterName = [];
            text = null;
            return data;
        }
        else {
            if(parameterName===null)
                parameterName = [];
            parameterName.push(c);
            return parameterInText;
        }
    }
    var afterDollarInAttributeValueDQ = function(c) {
        if(c=="{") {
            return parameterInAttributeValueDQ
        }
        else {
            //TODO:
        }
    }
    var afterDollarInAttributeValueSQ = function(c) {
        if(c=="{") {
            return parameterInAttributeValueSQ
        }
        else {
            //TODO:
        }
    }
    var afterDollarInAttributeValueUQ = function(c) {
        if(c=="{") {
            return parameterInAttributeValueUQ
        }
        else {
            //TODO:
        }
    }
    var parameterInAttributeValueDQ = function(c) {
        if(c=="}") {
            if(!attrSetter) {
                attrSetter = new AttributeSetter(attributeNode);      
            }
            attrSetter.appendPart(attributeNode.value);
            attributeNode.value = "";
            var text = {
                setter:attrSetter,
                value:"",
                set textContent(v){
                    this.value = v;
                    this.setter.apply();
                },
                toString:function(){ return this.value;}
            };
            var parameterAttr = parameterName.join("").split("|")
            var name = parameterAttr[0]
            if(parameters[name])
                parameters[name].push(text);
            else parameters[name] = [text];
            parameterName = [];
            attrSetter.appendPart(text);
            text = null;

            if(parameterAttr[1]) {
                void function(element,attributeName){
                    element.addEventListener(parameterAttr[1],function(){
                        setBack(name,element[attributeName])
                    },false);
                }(element,attributeNode.name);
            }

            return attributeValueDQ;
        }
        else {
            if(parameterName===null)
                parameterName = [];
            parameterName.push(c);
            return parameterInAttributeValueDQ;
        }
    }
    var parameterInAttributeValueSQ = function(c) {
        if(c=="}") {
            if(!attrSetter) {
                attrSetter = new AttributeSetter(attributeNode);      
            }
            attrSetter.appendPart(attributeNode.value);
            attributeNode.value = "";
            var text = {
                setter:attrSetter,
                value:"",
                set textContent(v){
                    this.value = v;
                    this.setter.apply();
                },
                toString:function(){ return this.value;}
            };
            var name = parameterName.join("")
            if(parameters[name])
                parameters[name].push(text);
            else parameters[name] = [text];
            parameterName = [];
            attrSetter.appendPart(text);
            text = null;
            return attributeValueSQ;
        }
        else {
            if(parameterName===null)
                parameterName = [];
            parameterName.push(c);
            return parameterInAttributeValueSQ;
        }
    }
    var parameterInAttributeValueUQ = function(c) {
        if(c=="}") {
            if(!attrSetter) {
                attrSetter = new AttributeSetter(attributeNode);
            }      
            attrSetter.appendPart(attributeNode.value);
            attributeNode.value = "";
            var text = {
                setter:attrSetter,
                value:"",
                set textContent(v){
                    this.value = v;
                    this.setter.apply();
                },
                toString:function(){ return this.value;}
            };
            var name = parameterName.join("")
            if(parameters[name])
                parameters[name].push(text);
            else parameters[name] = [text];
            parameterName = [];
            attrSetter.appendPart(text);
            text = null;
            return attributeValueUQ;
        }
        else {
            if(parameterName===null)
                parameterName = [];
            parameterName.push(c);
            return parameterInAttributeValueUQ;
        }
    }
    
    function parse(){
        input = str.split("");
        input.push(EOF);
        
        
        var root = document.createDocumentFragment();
        
        state = data;        
        element = root;
        stack = [];
                      
        i = 0;
        while(i<input.length) {
            state = state(input[i++]);            
        }
        
        return root;
    }
    
    var fragment = null;
    var setBack = function(){};

    this.apply = function(obj) {
        input = null;        
        element = null;
        attr = "";
        attributeNode = null;
        state = data;
        text = null;
        tag = "";
        errors = [];
        isEndTag = false;
        stack = [];
        i;
        parameters = Object.create(null);
        fragment = parse(str);
        this.bind(obj);
        setBack = function(name,value) {
            obj[name] = value;
        }
        if(obj.addEventListener) {
            obj.addEventListener("propertyChange",function(e){
                parameters[e.propertyName].forEach(function(textNode){
                    textNode.textContent = obj[e.propertyName];
                });
            },false);
        }

        return fragment;
    };
    Object.defineProperty(this,"fragment",{
        getter:function(){
            return fragment;
        }
    });
    
    this.bind = function(obj) {
        if(fragment==null)
            return;
        Object.keys(parameters).forEach(function(prop){
            parameters[prop].forEach(function(textNode){
                textNode.textContent = obj[prop];
            });
        });
    };
}
