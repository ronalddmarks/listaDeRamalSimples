/ * Prototype framework JavaScript, versão 1.7.3
 * (C) 2005-2010 Sam Stephenson
 *
 * Prototype é distribuído gratuitamente sob os termos de uma licença MIT-estilo.
 * Para mais detalhes, consulte o site do Protótipo: http://www.prototypejs.org/
 *
 * ------------------------------------------------- ------------------------- * /

var Prototype = {

  Versão: '1.7.3',

  Browser: (function () {
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call (window.opera) == '[objeto Opera]';
    Retorna {
      IE: !! window.attachEvent && isOpera,
      Opera: isOpera,
      WebKit: ua.indexOf ( 'AppleWebKit /')> -1,
      Gecko: ua.indexOf ( 'Gecko')> -1 && ua.indexOf ( 'KHTML') === -1,
      MobileSafari: /Apple.*Mobile/.test(ua)
    }
  }) (),

  BrowserFeatures: {
    XPath: !! document.evaluate,

    SelectorsAPI: !! document.querySelector,

    ElementExtensions: (function () {
      var construtor = window.Element || window.HTMLElement;
      retorno !! (construtor && constructor.prototype);
    }) (),
    SpecificElementExtensions: (function () {
      if (typeof window.HTMLDivElement! == 'indefinido')
        return true;

      var div = document.createElement ( 'div'),
          form = document.createElement ( "forma"),
          isSupported = false;

      if ((div [ '__ proto__'] div [ '__ proto__'] &&! == form [ '__ proto__'])) {
        isSupported = true;
      }

      div = form = null;

      voltar isSupported;
    }) ()
  },

  ScriptFragment: '<script [^>] *> ([\\ S \\ s] *?) <\ / \\ S *> script',
  JSONFilter: / ^ \ / \ * - seguro - ([\ s \ S] *) \ * \ / \ s * $ /,

  emptyFunction: function () {},

  K: function (x) {return x}
};

Se (Prototype.Browser.MobileSafari)
  Prototype.BrowserFeatures.SpecificElementExtensions = false;
/ * Com base na implementação de herança de Alex Arnell. * /

var Class = (function () {

  var IS_DONTENUM_BUGGY = (function () {
    for (var p em {toString: 1}) {
      if (p === 'toString') return false;
    }
    return true;
  }) ();

  subclasse function () {};
  função create () {
    var pai = null, propriedades = $ a (argumentos);
    if (Object.isFunction (propriedades [0]))
      parent = properties.shift ();

    klass function () {
      this.initialize.apply (this, argumentos);
    }

    Object.extend (Klass, Class.Methods);
    klass.superclass = mãe;
    klass.subclasses = [];

    Se (progenitor) {
      subclass.prototype = parent.prototype;
      klass.prototype = nova subclasse;
      parent.subclasses.push (Klass);
    }

    for (var i = 0, comprimento = properties.length; i <comprimento; i ++)
      klass.addMethods (propriedades [i]);

    Se (klass.prototype.initialize!)
      klass.prototype.initialize = Prototype.emptyFunction;

    klass.prototype.constructor = klass;
    voltar klass;
  }

  addMethods função (fonte) {
    var ancestral = this.superclass && this.superclass.prototype,
        properties = Object.keys (fonte);

    Se (IS_DONTENUM_BUGGY) {
      Se (source.toString! = Object.prototype.toString)
        properties.push ( "toString");
      Se (source.valueOf! = Object.prototype.valueOf)
        properties.push ( "valueOf");
    }

    for (var i = 0, comprimento = properties.length; i <comprimento; i ++) {
      var property = propriedades [i], value = source [propriedade];
      if (ancestral && Object.isFunction (valor) &&
          value.argumentNames () [0] == "$ super") {
        método var = value;
        value = (function (m) {
          de retorno da função () {return ancestral [m] .Aplique (este, argumentos); };
        }) (Propriedade) .Wrap (método);

        value.valueOf = (function (método) {
          função return () {return method.valueOf.call (método); };
        })(Método);

        Value.ToString = (function (método) {
          função return () {return method.toString.call (método); };
        })(Método);
      }
      this.prototype [propriedade] = value;
    }

    devolver este;
  }

  Retorna {
    create: criar,
    Métodos: {
      addMethods: addMethods
    }
  };
}) ();
(Function () {

  var _toString = Object.prototype.toString,
      _hasOwnProperty = Object.prototype.hasOwnProperty,
      NULL_TYPE = 'nulo',
      UNDEFINED_TYPE = 'indefinido',
      BOOLEAN_TYPE = 'booleano',
      NUMBER_TYPE = 'Número',
      String_type = 'String',
      Object_type = "objeto",
      FUNCTION_CLASS = '[objeto Function]',
      BOOLEAN_CLASS = '[objeto Boolean]',
      NUMBER_CLASS = '[objeto Number]',
      STRING_CLASS = '[objeto String]',
      ARRAY_CLASS = '[objeto Array]',
      DATE_CLASS = '[objeto Date]',
      NATIVE_JSON_STRINGIFY_SUPPORT = window.JSON &&
        typeof 'função' JSON.stringify === &&
        JSON.stringify (0) === '0' &&
        typeof JSON.stringify (Prototype.K) === 'indefinido';



  var DONT_ENUMS = [ 'toString', 'toLocaleString', 'valueOf',
   'HasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'construtor'];

  var IS_DONTENUM_BUGGY = (function () {
    for (var p em {toString: 1}) {
      if (p === 'toString') return false;
    }
    return true;
  }) ();

  Tipo de função (o) {
    switch (o) {
      caso nulo: retorno NULL_TYPE;
      caso (void 0): return UNDEFINED_TYPE;
    }
    Tipo de var = typeof o;
    switch (tipo) {
      caso 'booleano': retorno BOOLEAN_TYPE;
      caso 'número': retorno NUMBER_TYPE;
      caso 'string': retorno string_type;
    }
    voltar OBJECT_TYPE;
  }

  função de extensão (destino, origem) {
    for (var na fonte)
      destino [propriedade] = source [propriedade];
    voltar destino;
  }

  função de inspecionar (objeto) {
    experimentar {
      if (isUndefined (objeto)) return 'indefinido';
      if (objeto === null) return 'nulo';
      voltar object.inspect? object.inspect (): String (objeto);
    } Catch (e) {
      se (e instanceof RangeError) return '...';
      throw e;
    }
  }

  função toJSON (value) {
    voltar Str ( '', { '': valor}, []);
  }

  função Str (chave, suporte, pilha) {
    var value = titular [key];
    if (Tipo (valor) === OBJECT_TYPE && typeof value.toJSON === 'função') {
      value = value.toJSON (chave);
    }

    var _class = _toString.call (valor);

    switch (_class) {
      caso NUMBER_CLASS:
      caso BOOLEAN_CLASS:
      caso STRING_CLASS:
        value = value.valueOf ();
    }

    switch (value) {
      caso nulo: return 'nulo';
      caso verdadeira: return 'true';
      caso falso: return 'falso';
    }

    Tipo de var = valor typeof;
    switch (tipo) {
      caso 'string':
        voltar value.inspect (true);
      número do processo':
        voltar isFinite (valor)? String (valor): 'null';
      caso "objeto":

        for (var i = 0, comprimento = stack.length; i <comprimento; i ++) {
          if (empilhar [i] Valor ===) {
            throw new TypeError ( "referência cíclica para '" + valor + "' em objeto");
          }
        }
        stack.push (valor);

        var = parciais [];
        Se (_class === ARRAY_CLASS) {
          for (var i = 0, comprimento = value.length; i <comprimento; i ++) {
            var str = Str (i, o valor, pilha);
            partial.push (typeof str === 'indefinido' 'nulo':? str);
          }
          parcial = '[' + partial.join ( ',') + ']';
        } outro {
          chaves var = Object.keys (value);
          for (var i = 0, comprimento = keys.length; i <comprimento; i ++) {
            var key = teclas [i], str = Str (chave, valor, pilha);
            if (typeof str! == "undefined") {
               partial.push (key.inspect (true) + ':' + str);
             }
          }
          parcial = "{" + partial.join ( ',') + '}';
        }
        stack.pop ();
        a devolução parcial;
    }
  }

  stringify função (objeto) {
    voltar JSON.stringify (objeto);
  }

  toQueryString função (objeto) {
    return $ H (objeto) .toQueryString ();
  }

  função ToHTML (objeto) {
    retornar objeto && object.toHTML? object.toHTML (): String.interpret (objeto);
  }

  teclas de função (objeto) {
    if (! Tipo (objeto) == OBJECT_TYPE) {throw new TypeError (); }
    Resultados var = [];
    for (var no objeto) {
      if (_hasOwnProperty.call (objeto, propriedade))
        results.push (propriedade);
    }

    Se (IS_DONTENUM_BUGGY) {
      for (var i = 0; property = DONT_ENUMS [i]; i ++) {
        if (_hasOwnProperty.call (objeto, propriedade))
          results.push (propriedade);
      }
    }

    retornar resultados;
  }

  os valores da função (objeto) {
    Resultados var = [];
    for (var no objeto)
      results.push (object [propriedade]);
    retornar resultados;
  }

  clone function (objeto) {
    retorno estender ({}, objeto);
  }

  função isElement (objeto) {
    voltar !! (objeto && object.nodeType == 1);
  }

  Função IsArray (objeto) {
    voltar _toString.call (objeto) === ARRAY_CLASS;
  }

  ( 'Função' typeof Array.isArray ==) var hasNativeIsArray =
    && Array.isArray ([]) && Array.isArray ({})!;

  Se (hasNativeIsArray) {
    IsArray = Array.isArray;
  }

  função isHash (objeto) {
    retornar objeto instanceof Hash;
  }

  isFunction função (objeto) {
    voltar _toString.call (objeto) === FUNCTION_CLASS;
  }

  função isString (objeto) {
    voltar _toString.call (objeto) === STRING_CLASS;
  }

  função ISNUMBER (objeto) {
    voltar _toString.call (objeto) === NUMBER_CLASS;
  }

  IsDate função (objeto) {
    voltar _toString.call (objeto) === DATE_CLASS;
  }

  função isUndefined (objeto) {
    voltar typeof objeto === "indefinido";
  }

  estender (Object, {
    estender: estender,
    inspeccionar: inspecionar,
    toJSON: NATIVE_JSON_STRINGIFY_SUPPORT? stringify: toJSON,
    toQueryString: toQueryString,
    ToHTML: ToHTML,
    chaves: Object.keys || chaves,
    valores: valores,
    clone: ​​clone,
    isElement: isElement,
    IsArray: IsArray,
    isHash: isHash,
    isFunction: isFunction,
    isString: isString,
    ISNUMBER: ISNUMBER,
    ISDATE: ISDATE,
    isUndefined: isUndefined
  });
}) ();
Object.extend (Function.prototype, (function () {
  var fatia = Array.prototype.slice;

  atualização de função (array, args) {
    var arrayLength = array.length, comprimento = args.length;
    while (length--) array [arrayLength + length] = args [length];
    retornar array;
  }

  merge função (array, args) {
    array = slice.call (array, 0);
    voltar atualização (matriz, args);
  }

  argumentNames function () {
    var names = this.toString (). match (/ ^ [\ s \ (] * A função [^ (] * \ (([^)] *) \) /) [1]
      .replace (? /\/\/.* [\ r \ n] | \ / \ * (: |?.? [\ r \ n]) * \ * \ // g, '')
      .replace (/ \ s + / g, '') .Split ( ',');
    voltar names.length == 1 &&! nomes [0]? []: Nomes;
  }


  ligam função (contexto) {
    if (arguments.length <2 && Object.isUndefined (argumentos [0]))
      devolver este;

    if (! Object.isFunction (this))
      throw new TypeError ( "O objeto não é exigível.");

    var nop = function () {};
    var __method = isso, args = slice.call (argumentos, 1);

    var bound = function () {
      var a = merge (args, argumentos);
      var c = esta instanceof ligado? isto: contexto;
      regresso __method.apply (c, a);
    };

    nop.prototype = this.prototype;
    bound.prototype = new nop ();

    retornar ligado;
  }

  função bindAsEventListener (contexto) {
    var __method = isso, args = slice.call (argumentos, 1);
    função de retorno (event) {
      var a = atualização ([evento || window.event], args);
      voltar __method.apply (contexto, a);
    }
  }

  caril function () {
    (! Arguments.length) se devolver este;
    var __method = isso, args = slice.call (argumentos, 0);
    função return () {
      var a = merge (args, argumentos);
      regresso __method.apply (isto, a);
    }
  }

  atraso de função (tempo limite) {
    var __method = isso, args = slice.call (argumentos, 1);
    timeout = Tempo Limite * 1000;
    voltar window.setTimeout (function () {
      voltar __method.apply (__ método, args);
    }, tempo esgotado);
  }

  Adiar function () {
    var args = atualização ([0.01], argumentos);
    voltar this.delay.apply (this, args);
  }

  envoltório de função (invólucro) {
    var __method = this;
    função return () {
      var a = atualização ([__ method.bind (this)], os argumentos);
      regresso wrapper.apply (isto, a);
    }
  }

  metodizar function () {
    if (this._methodized) return this._methodized;
    var __method = this;
    voltar this._methodized = function () {
      var a = atualização ([Esta], argumentos);
      voltar __method.apply (null, a);
    };
  }

  var extensões = {
    argumentNames: argumentNames,
    bindAsEventListener: bindAsEventListener,
    caril: caril,
    atraso: atraso,
    adiar: adiar,
    envolvê: envoltório,
    metodizar: metodizar
  };

  if (! Function.prototype.bind)
    extensions.bind = ligamento;

  retornar extensões;
}) ());



(Function (proto) {


  toISOString function () {
    voltar this.getUTCFullYear () + '-' +
      (This.getUTCMonth () + 1) .toPaddedString (2) + '-' +
      this.getUTCDate (). toPaddedString (2) + 'T' +
      this.getUTCHours () toPaddedString (2) +. ':' +
      this.getUTCMinutes () toPaddedString (2) +. ':' +
      this.getUTCSeconds () toPaddedString (2) + 'Z'.;
  }


  toJSON function () {
    regresso this.toISOString ();
  }

  Se (proto.toISOString!) proto.toISOString = toISOString;
  Se (proto.toJSON!) proto.toJSON = toJSON;

}) (Date.prototype);


RegExp.prototype.match = RegExp.prototype.test;

RegExp.escape = function (str) {
  retornar Cadeia .replace (str) (/ ([.?! * + ^ =: $ {} () | [\] \ / \\]) / g, '\\ $ 1');
};
var PeriodicalExecuter = Class.create ({
  inicializar: function (callback, frequência) {
    this.callback = callback;
    this.frequency = frequência;
    this.currentlyExecuting = false;

    this.registerCallback ();
  },

  RegisterCallback: function () {
    this.timer = setInterval (this.onTimerEvent.bind (this), this.frequency * 1000);
  },

  execute: function () {
    this.callback (this);
  },

  parar: function () {
    se o retorno (this.timer!);
    clearInterval (this.timer);
    this.timer = null;
  },

  onTimerEvent: function () {
    if (! this.currentlyExecuting) {
      experimentar {
        this.currentlyExecuting = true;
        this.execute ();
        this.currentlyExecuting = false;
      } Catch (e) {
        this.currentlyExecuting = false;
        throw e;
      }
    }
  }
});
Object.extend (String, {
  interpretar: function (value) {
    valor de retorno == null? '': String (valor);
  },
  SpecialChar: {
    '\ B': '\\ b',
    '\ T': '\\ t',
    '\ N': '\\ n',
    '\ F': '\\ f',
    '\ R': '\\ r',
    '\\': '\\\\'
  }
});

Object.extend (String.prototype, (function () {
  var NATIVE_JSON_PARSE_SUPPORT = window.JSON &&
    typeof 'função' JSON.parse === &&
    . JSON.parse ( "{" teste ": true} ') de teste;

  função prepareReplacement (substituição) {
    se a substituição (Object.isFunction (substituição)) return;
    template var = new Template (substituição);
    function (jogo) {return template.evaluate (match)} return;
  }

  função isNonEmptyRegExp (regexp) {
    voltar regexp.source && regexp.source == '(:)?!';
  }


  gsub função (modelo, substituição) {
    var result = '', source = presente, fósforo;
    substituição = prepareReplacement (substituição);

    if (Object.isString (padrão))
      padrão = RegExp.escape (padrão);

    if (! (pattern.length || isNonEmptyRegExp (padrão))) {
      substituição = substituição ( '');
      voltar substituição + source.split ( '') se juntar (substituição) + substituição.;
    }

    while (source.length> 0) {
      match = source.match (padrão)
      if (jogo && jogo [0] .length> 0) {
        resultado + = source.slice (0, match.index);
        resultado + = String.interpret (substituição (partida));
        source = source.slice (match.index + match [0] .length);
      } outro {
        resultado + = origem, source = '';
      }
    }
    retornar resultado;
  }

  sub função (modelo, substituição, contagem) {
    substituição = prepareReplacement (substituição);
    count = Object.isUndefined (contagem)? 1: contagem;

    voltar this.gsub (padrão, função (match) {
      if (--count <0) jogo de volta [0];
      retornar de substituição (jogo);
    });
  }

  verificação de função (padrão, iterator) {
    this.gsub (teste padrão, iterator);
    voltar String (this);
  }

  truncar função (comprimento, truncagem) {
    comprimento = comprimento || 30;
    truncamento = Object.isUndefined (truncagem)? '...': Truncamento;
    voltar this.length> comprimento?
      this.slice (0, comprimento - truncation.length) + truncamento: String (this);
  }

  tira function () {
    voltar this.replace (/ ^ \ s + /, '') .replace (/ \ s + $ /, '');
  }

  stripTags function () {
    voltar this.replace (/ <\ w + (\ s + ( "[^"] * "|" [^ "] * | [^>]) +) (\ /)> |? <\ / \ w +> / gi, '');
  }

  stripScripts function () {
    voltar this.replace (new RegExp (Prototype.ScriptFragment, 'img'), '');
  }

  extractScripts function () {
    var matchAll = new RegExp (Prototype.ScriptFragment, 'img'),
        matchOne = new RegExp (Prototype.ScriptFragment, 'im');
    return (this.match (matchAll) || []). mapa (function (scriptTag) {
      return (scriptTag.match (matchOne) || [ '', '']) [1];
    });
  }

  evalScripts function () {
    voltar this.extractScripts () mapa (function (roteiro) {eval retorno (roteiro);}).;
  }

  funcionar escapeHTML () {
    voltar this.replace (/ & / g, '& amp;') replace (/ </ g, '& lt;') substituir. (/>. / g, '& gt;');
  }

  unescapeHTML function () {
    voltar this.stripTags () replace (/ & lt; / g,.. '<'). replace (/ & gt; / g, '>') replace (/ & amp; / g, '&');
  }


  toQueryParams função (separador) {
    var match = this.strip () jogo (/([^?#]*)(#.*)?$/.);
    if (jogo!) return {};

    retornar jogo [1] .Split (separador || 'e'). injectar ({}, function (hash par) {
      if ((par = pair.split ( '=')) [0]) {
        chave var = decodeURIComponent (pair.shift ()),
            value = pair.length> 1? pair.join ( '='): par [0];

        if (valor! = undefined) {
          value = value.gsub ( '+', '');
          value = decodeURIComponent (valor);
        }

        if (chave na de hash) {
          se de hash [key] = [de hash [chave]] (Object.isArray (haxixe [key])!);
          de hash [key] .push (valor);
        }
        outra de hash [key] = value;
      }
      retornar de hash;
    });
  }

  funcionar toArray () {
    regresso this.split ( '');
  }

  succ function () {
    regresso this.slice (0, this.length - 1) +
      String.fromCharCode (this.charCodeAt (this.length - 1) + 1);
  }

  Tempos de funções (contagem) {
    regresso contagem <1? '': New Array (contagem + 1) .join (this);
  }

  camelize function () {
    voltar this.replace (g /-+(.)?/, function (fósforo, chr) {
      voltar chr? chr.toUpperCase (): '';
    });
  }

  função de capitalizar () {
    regresso this.charAt (0) .toUpperCase () + this.substring (1) .toLowerCase ();
  }

  sublinhado function () {
    regresso this.replace (/ :: / g, '/')
               .replace (/ ([AZ] +) ([AZ] [az]) / g, '$ 1_ $ 2')
               .replace (/ ([az \ d]) ([AZ]) / g, '$ 1_ $ 2')
               .replace (/ - / g, '_')
               .toLowerCase ();
  }

  dasherize function () {
    voltar this.replace (/ _ / g, '-');
  }

  função de inspecionar (useDoubleQuotes) {
    var escapedString = this.replace (/ [\ x00- \ x1f \\] / g, função (personagem) {
      if (personagem em String.specialChar) {
        voltar String.specialChar [personagem];
      }
      retorno '\\ U00' + character.charCodeAt () toPaddedString (2, 16).;
    });
    if (useDoubleQuotes) return ' "' + escapedString.replace (/" / g, '\\ "') + '"';
    retorno " '" + escapedString.replace (/' / g, '\\\' ') + "'";
  }

  função unfilterJSON (filtro) {
    voltar this.replace (filtro || Prototype.JSONFilter, '$ 1');
  }

  isJSON function () {
    var str = this;
    if (str.blank ()) return false;
    str = str.replace (/ \\ (:? [ "\\\ / bfnrt] | u [0-9a-fA-F] {4}) / g, '@');
    str = str.replace (/ "[^" \\\ n \ r] * "| verdadeiro | falso | nula | - \ d + (?:?.? \ \ d *) (: [ee] [+ \ ? -?] \ d +) / g, ']');
    str = str.replace (? / (: ^ |: |,) (: \ s * \ [) + / g, '');
    retorno (/^[\],:{}\s]*$/).test(str);
  }

  função evalJSON (sanitize) {
    var json = this.unfilterJSON (),
        cx = /[\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\u0000]/g;
    if (cx.test (JSON)) {
      json = json.replace (cx, função (a) {
        . Retorno '\\ u' + ( '0000' + a.charCodeAt (0) .toString (16)) slice (-4);
      });
    }
    experimentar {
      if (! higienizar || json.isJSON ()) return eval ( '(' + json + ')');
    } Catch (e) {}
    throw new SyntaxError ( 'string JSON mal formada:' + this.inspect ());
  }

  parseJSON function () {
    var json = this.unfilterJSON ();
    voltar JSON.parse (JSON);
  }

  função include (padrão) {
    voltar this.indexOf (padrão)> -1;
  }

  função startsWith (padrão, posição) {
    posição = Object.isNumber (posição)? Posição: 0;
    voltar this.lastIndexOf (padrão, posição) === posição;
  }

  endsWith função (padrão, posição) {
    padrão = String (padrão);
    posição = Object.isNumber (posição)? Posição: this.length;
    if (posição <0) position = 0;
    if (posição> this.length) position = this.length;
    var d = posição - pattern.length;
    retorno d> = 0 && this.indexOf (padrão, d) === d;
  }

  funcionar vazio () {
    devolver este == '';
  }

  funcionar em branco () {
    regresso /^\s*$/.test(this);
  }

  interpolate função (objeto, padrão) {
    voltar novo modelo (isso, padrão) Avaliar (objeto);
  }

  Retorna {
    gsub: gsub,
    sub: sub,
    de digitalização: Digitalização,
    truncate: truncate,
    tira: String.prototype.trim || faixa,
    stripTags: stripTags,
    stripScripts: stripScripts,
    extractScripts: extractScripts,
    evalScripts: evalScripts,
    escapeHTML: escapeHTML,
    unescapeHTML: unescapeHTML,
    toQueryParams: toQueryParams,
    parseQuery: toQueryParams,
    toArray: toArray,
    succ: succ,
    vezes: épocas,
    camelize: camelize,
    capitalizar: capitalizar,
    sublinhado: sublinhado,
    dasherize: dasherize,
    inspeccionar: inspecionar,
    unfilterJSON: unfilterJSON,
    isJSON: isJSON,
    evalJSON: NATIVE_JSON_PARSE_SUPPORT? parseJSON: evalJSON,
    incluem: incluem,
    startsWith: String.prototype.startsWith || começa com,
    endsWith: String.prototype.endsWith || termina com,
    vazio: vazio,
    em branco: em branco,
    interpolação: interpolação
  };
}) ());

var Template = Class.create ({
  inicializar: function (modelo, teste padrão) {
    this.template template.toString = ();
    this.pattern = padrão || Template.Pattern;
  },

  avaliar: function (objeto) {
    if (objeto && Object.isFunction (object.toTemplateReplacements))
      object.toTemplateReplacements objeto = ();

    voltar this.template.gsub (this.pattern, função (match) {
      if (objeto == null) return (match [1] + '');

      var antes = jogo [1] || '';
      if (antes == '\\') jogo de volta [2];

      var ctx = objeto, expr = jogo [3],
          padrão = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

      match = pattern.exec (expr);
      if (jogo == null) return antes;

      while (combinar! = null) {
        var comp = jogo [1] .startsWith ( '[')? match [2] .replace (/ \\\\] / g, ']'): combinar [1];
        ctx = CTX [comp];
        if (== null ctx || '' == jogo [3]) break;
        expr = expr.substring ( '[' == jogo [3] corresponde [1] .length:? corresponder [0] .length);
        match = pattern.exec (expr);
      }

      retornar antes + String.interpret (CTX);
    });
  }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;

var $ pausa = {};

var Enumerable = (function () {
  funcionar cada (iterator, context) {
    experimentar {
      this._each (iterator, contexto);
    } Catch (e) {
      se lance e (e = $ pausa!);
    }
    devolver este;
  }

  função eachSlice (número, iterator, context) {
    var index = -número, fatias = [], array = this.toArray ();
    if (número <1) matriz de retorno;
    while ((índice de + = número) <array.length)
      slices.push (Array.slice (index, índice + número));
    voltar slices.collect (iterator, contexto);
  }

  Função Todos (iterator, context) {
    iterator = iterador || Prototype.K;
    var result = true;
    this.each (function (value, index) {
      resultado = resultado && !! iterator.call (contexto, o valor, índice, this);
      se lance $ pausa (resultado!);
    }, esta);
    retornar resultado;
  }

  funcionar qualquer (iterator, context) {
    iterator = iterador || Prototype.K;
    var result = false;
    this.each (function (value, index) {
      if (resultado = !! iterator.call (contexto, valor, índice, this))
        jogue $ quebrar;
    }, esta);
    retornar resultado;
  }

  função de recolher (iterator, context) {
    iterator = iterador || Prototype.K;
    Resultados var = [];
    this.each (function (value, index) {
      results.push (iterator.call (contexto, valor, índice, this));
    }, esta);
    retornar resultados;
  }

  função de detectar (iterator, context) {
    var result;
    this.each (function (value, index) {
      if (iterator.call (contexto, valor, índice, this)) {
        resultado = value;
        jogue $ quebrar;
      }
    }, esta);
    retornar resultado;
  }

  findAll função (iterator, context) {
    Resultados var = [];
    this.each (function (value, index) {
      if (iterator.call (contexto, valor, índice, this))
        results.push (valor);
    }, esta);
    retornar resultados;
  }

  grep função (filtro, iterator, context) {
    iterator = iterador || Prototype.K;
    Resultados var = [];

    Se (Object.isString (filtro))
      Filtro = new RegExp (RegExp.escape (filtro));

    this.each (function (value, index) {
      if (filter.match (valor))
        results.push (iterator.call (contexto, valor, índice, this));
    }, esta);
    retornar resultados;
  }

  função include (objeto) {
    if (Object.isFunction (this.indexOf) && this.indexOf (objeto)! = -1)
      return true;

    var found = false;
    this.each (function (value) {
      if (valor == objeto) {
        encontrado = true;
        jogue $ quebrar;
      }
    });
    retornar encontrado;
  }

  função inGroupsOf (número, fillWith) {
    fillWith = Object.isUndefined (fillWith)? nulo: fillWith;
    voltar this.eachSlice (número, função (fatia) {
      while (slice.length <number) slice.push (fillWith);
      voltar fatia;
    });
  }

  injete função (memorando, iterator, context) {
    this.each (function (value, index) {
      memo = iterator.call (contexto, memo, o valor, índice, this);
    }, esta);
    voltar memo;
  }

  invocação de função (método) {
    var args = $ A (argumentos) .slice (1);
    voltar this.map (function (value) {
      valor de retorno [método] .Aplique (valor, args);
    });
  }

  função max (iterator, context) {
    iterator = iterador || Prototype.K;
    var result;
    this.each (function (value, index) {
      value = iterator.call (contexto, o valor, índice, this);
      if (resultado == null || valor> = resultado)
        resultado = value;
    }, esta);
    retornar resultado;
  }

  min função (iterador, o contexto) {
    iterator = iterador || Prototype.K;
    var result;
    this.each (function (value, index) {
      value = iterator.call (contexto, o valor, índice, this);
      if (resultado == null || valor <result)
        resultado = value;
    }, esta);
    retornar resultado;
  }

  partição de função (iterator, context) {
    iterator = iterador || Prototype.K;
    var trues = [], falsos = [];
    this.each (function (value, index) {
      (Iterator.call (contexto, o valor, índice, isso)?
        Trues: falsos) .push (valor);
    }, esta);
    voltar [verdades, falsos];
  }

  Arranque função (propriedade) {
    Resultados var = [];
    this.each (function (value) {
      results.push (valor [da propriedade]);
    });
    retornar resultados;
  }

  função Rejeitar (iterator, context) {
    Resultados var = [];
    this.each (function (value, index) {
      if (! iterator.call (contexto, valor, índice, this))
        results.push (valor);
    }, esta);
    retornar resultados;
  }

  função sortBy (iterator, context) {
    voltar this.map (function (value, index) {
      Retorna {
        valor: valor,
        critérios: iterator.call (contexto, o valor, o índice, este)
      };
    }, This) .Sort (function (esquerda, direita) {
      var a = left.criteria, b = right.criteria;
      retornar a <b? -1: A> b? 1: 0;
    .}) Arrancar ( 'value');
  }

  funcionar toArray () {
    regresso this.map ();
  }

  função zip () {
    var iterator = Prototype.K, args = $ a (argumentos);
    Se (Object.isFunction (args.last ()))
      iterator = args.pop ();

    var colecções = [isso] .concat (args) .map ($ A);
    voltar this.map (function (value, index) {
      voltar iterator (collections.pluck (index));
    });
  }

  tamanho function () {
    voltar this.toArray () comprimento.;
  }

  função de inspecionar () {
    return '# <Enumerable:'. + this.toArray () fiscalizar () + '>';
  }









  Retorna {
    cada um: cada,
    eachSlice: eachSlice,
    tudo: tudo,
    every: tudo,
    any: qualquer,
    alguns: alguns,
    coletar: coletar,
    Mapa: coletar,
    detectar: ​​detectar,
    findAll: findAll,
    selecione: findAll,
    filtrar: findAll,
    grep: grep,
    incluem: incluem,
    membro: incluem,
    inGroupsOf: inGroupsOf,
    injectar: ​​injetar,
    invocar: invocar,
    máx: max,
    min: min,
    partição: partição,
    Arranque: arranque,
    rejeitar: rejeição,
    sortBy: sortBy,
    toArray: toArray,
    entradas: toArray,
    zip: zip,
    size: tamanho,
    inspeccionar: inspecionar,
    encontrar: detectar
  };
}) ();

função $ A (iterable) {
  (! Iterable) se voltar [];
  if ( 'toArray' em Object (iterable)) retornar iterable.toArray ();
  comprimento var = iterable.length || 0, resultado = new Array (comprimento);
  while (length--) resultados [length] = iterable [length];
  retornar resultados;
}


Função $ w (string) {
  Se voltar [] (Object.isString (string)!);
  string = string.strip ();
  voltar corda? string.split (/ \ s + /): [];
}

Array.from = $ A;


(Function () {
  var arrayProto = Array.prototype,
      fatia = arrayProto.slice,
      _each = arrayProto.forEach; // Use navegador nativo JS 1,6 implementação se disponível

  funcionar cada (iterator, context) {
    for (var i = 0, comprimento = this.length >>> 0; i <comprimento; i ++) {
      if (i neste) iterator.call (contexto, este [i], i, this);
    }
  }
  Se cada _each = (_each!);

  função clear () {
    this.length = 0;
    devolver este;
  }

  funcionar primeiro () {
    retornar este [0];
  }

  última função () {
    retornar este [this.length - 1];
  }

  funcionar compact () {
    voltar this.select (function (value) {
      valor voltar! = null;
    });
  }

  achatar function () {
    voltar this.inject ([], a função (array, value) {
      if (Object.isArray (valor))
        Array.concat retornar (value.flatten ());
      Array.push (valor);
      retornar array;
    });
  }

  função sem () {
    valores var = slice.call (argumentos, 0);
    voltar this.select (function (value) {
      voltar values.include (valor)!;
    });
  }

  função inversa (em linha) {
    voltar (em linha === false this.toArray (): isso?) ._ reverse ();
  }

  uniq função (ordenadas) {
    voltar this.inject ([], a função (array, valor, index) {
      if (0 == índice || (classificadas array.last () = Valor:?! array.include (valor)))
        Array.push (valor);
      retornar array;
    });
  }

  Intersect função (array) {
    voltar this.uniq (). findAll (function (item) {
      voltar Array.indexOf (item) == -1!;
    });
  }


  clone function () {
    slice.call voltar (este, 0);
  }

  tamanho function () {
    voltar this.length;
  }

  função de inspecionar () {
    retorno '[' + this.map (Object.inspect) .join ( ',') + ']';
  }

  função indexOf (item, i) {
    if (esta == null) throw new TypeError ();

    var array = Object (este), comprimento = array.length >>> 0;
    if (comprimento === 0) return 1;

    i = Number (i);
    Se (isNaN (i)) {
      i = 0;
    } Else if (i! == 0 && isFinite (i)) {
      i = (i> 0 1:? -1) * Math.floor (Math.abs (i));
    }

    if (i> comprimento) return 1;

    var i = k> = 0? i: Math.max (comprimento - Math.abs (I), 0);
    para (; k <comprimento; k ++)
      if (k na matriz && matriz [k] === item) retorno k;
    retornar -1;
  }


  função lastIndexOf (item, i) {
    if (esta == null) throw new TypeError ();

    var array = Object (este), comprimento = array.length >>> 0;
    if (comprimento === 0) return 1;

    if (! Object.isUndefined (i)) {
      i = Number (i);
      Se (isNaN (i)) {
        i = 0;
      } Else if (i! == 0 && isFinite (i)) {
        i = (i> 0 1:? -1) * Math.floor (Math.abs (i));
      }
    } outro {
      i = comprimento;
    }

    var i = k> = 0? Math.min (i, length - 1):
     comprimento - Math.abs (I);

    for (; k> = 0; k--)
      if (k na matriz && matriz [k] === item) retorno k;
    retornar -1;
  }

  concat função (_) {
    matriz de var = [], itens = slice.call (argumentos, 0), item n = 0;
    items.unshift (this);
    for (var i = 0, comprimento = items.length; i <comprimento; i ++) {
      item = itens [i];
      if (Object.isArray (item) &&! ( 'receptor' no item)) {
        para (var J = 0, = arrayLength item.length; J <arrayLength; j ++) {
          if (j no item) array [n] = item [j];
          N ++;
        }
      } outro {
        array [n ++] = item;
      }
    }
    Array.length = N;
    retornar array;
  }


  função wrapNative (método) {
    função return () {
      if (arguments.length === 0) {
        regresso method.call (isto, Prototype.K);
      } Else if (argumentos [0] === undefined) {
        var args = slice.call (argumentos, 1);
        args.unshift (Prototype.K);
        voltar method.apply (isto, args);
      } outro {
        voltar method.apply (este, argumentos);
      }
    };
  }


  mapa de funções (iterator) {
    if (esta == null) throw new TypeError ();
    iterator = iterador || Prototype.K;

    var object = Object (this);
    Resultados var = [], argumentos contexto = [1], n = 0;

    for (var i = 0, comprimento = object.length >>> 0; i <comprimento; i ++) {
      Se (i no objecto) {
        resultados [n] = iterator.call (contexto, objeto [i], i, objeto);
      }
      N ++;
    }
    results.length = N;
    retornar resultados;
  }

  Se (arrayProto.map) {
    map = wrapNative (Array.prototype.map);
  }

  Filtro de função (iterator) {
    if (esta == null ||! Object.isFunction (iterator))
      throw new TypeError ();

    var object = Object (this);
    Resultados var = [], o contexto = argumentos [1], de valor;

    for (var i = 0, comprimento = object.length >>> 0; i <comprimento; i ++) {
      Se (i no objecto) {
        value = objeto [i];
        if (iterator.call (contexto, o valor, i, objeto)) {
          results.push (valor);
        }
      }
    }
    retornar resultados;
  }

  Se (arrayProto.filter) {
    filtrar = Array.prototype.filter;
  }

  funcionar alguns (iteradora) {
    if (esta == null) throw new TypeError ();
    iterator = iterador || Prototype.K;
    var context = argumentos [1];

    var object = Object (this);
    for (var i = 0, comprimento = object.length >>> 0; i <comprimento; i ++) {
      if (i no objeto && iterator.call (contexto, objeto [i], i, objeto)) {
        return true;
      }
    }

    return false;
  }

  Se (arrayProto.some) {
    alguns = wrapNative (Array.prototype.some);
  }

  funcionar cada (iterator) {
    if (esta == null) throw new TypeError ();
    iterator = iterador || Prototype.K;
    var context = argumentos [1];

    var object = Object (this);
    for (var i = 0, comprimento = object.length >>> 0; i <comprimento; i ++) {
      if (i no objeto &&! iterator.call (contexto, objeto [i], i, objeto)) {
        return false;
      }
    }

    return true;
  }

  Se (arrayProto.every) {
    cada = wrapNative (Array.prototype.every);
  }


  Object.extend (arrayProto, Enumerable);

  if (arrayProto.entries === Enumerable.entries) {
    eliminar arrayProto.entries;
  }

  if (! arrayProto._reverse)
    arrayProto._reverse = arrayProto.reverse;

  Object.extend (arrayProto, {
    _each: _each,

    Mapa: mapa,
    recolher: mapear,
    selecione: filtro,
    Filtro: filtro,
    findAll: filtro,
    Alguns alguns,
    qualquer: alguns,
    todos: cada,
    tudo: cada,

    clara: claro,
    primeira: em primeiro lugar,
    última: passado,
    compacto: compacta,
    achatar: alise,
    sem: sem,
    reversa: reverse,
    uniq: uniq,
    se cruzam: se cruzam,
    clone: ​​clone,
    toArray: clone,
    size: tamanho,
    inspeccionar: inspecionar
  });

  var CONCAT_ARGUMENTS_BUGGY = (function () {
    voltar [] .concat (argumentos) [0] [0] == 1!;
  }) (1,2);

  if (CONCAT_ARGUMENTS_BUGGY) arrayProto.concat = concat;

  se arrayProto.indexOf = indexOf (arrayProto.indexOf!);
  se arrayProto.lastIndexOf = lastIndexOf (arrayProto.lastIndexOf!);
}) ();
Função $ H (objeto) {
  retornar nova Hash (objeto);
};

var Hash = Class.create (Enumerable, (function () {
  initialize função (objeto) {
    this._object = Object.isHash (objeto)? object.toObject (): Object.clone (objeto);
  }


  _each função (iterator, context) {
    var i = 0;
    for (var chave na this._object) {
      var value = this._object [key], par = [key, value];
      pair.key = chave;
      pair.value = value;
      iterator.call (contexto, par, i);
      i ++;
    }
  }

  conjunto de funções (key, value) {
    voltar this._object [key] = value;
  }

  função get (key) {
    if (this._object [key]! == Object.prototype [key])
      voltar this._object [key];
  }

  função unset (key) {
    var value = this._object [key];
    eliminar this._object [key];
    valor de retorno;
  }

  funcionar toObject () {
    regresso Object.clone (this._object);
  }



  teclas de função() {
    voltar this.pluck ( 'chave');
  }

  valores function () {
    voltar this.pluck ( 'value');
  }

  Índice de função (value) {
    var match = this.detect (function (par) {
      retornar valor pair.value ===;
    });
    retornar jogo && match.key;
  }

  merge função (objeto) {
    voltar this.clone () update (objeto).;
  }

  atualização de função (objeto) {
    retornar nova Hash (objeto) .inject (this, function (resultado, par) {
      result.set (pair.key, pair.value);
      retornar resultado;
    });
  }

  toQueryPair função (key, value) {
    if (Object.isUndefined (valor)) tecla de retorno;

    value = String.interpret (valor);

    value = value.gsub (/ (\ r) \ n /, '\ r \ n'?);
    value = encodeURIComponent (valor);
    value = value.gsub (/% 20 /, '+');
    retornar chave + '=' + valor;
  }

  toQueryString function () {
    voltar this.inject ([], a função (resultados, par) {
      var key = encodeURIComponent (pair.key), os valores = pair.value;

      if (valores && valores typeof == 'objeto') {
        if (Object.isArray (valores)) {
          var queryValues ​​= [];
          for (var i = 0, len = values.length, valor; i <len; i ++) {
            VALUE = valores [i];
            queryValues.push (toQueryPair (chave, valor));
          }
          retornar (results.concat queryValues);
        }
      } Else results.push (toQueryPair (chave, valores));
      retornar resultados;
    }).Junte-se('&');
  }

  função de inspecionar () {
    return '# <Hash: {' + this.map (function (par) {
      voltar pair.map .join (Object.inspect) ( ':');
    .}) Juntar-se ( ',') + '}>';
  }

  clone function () {
    retornar nova Hash (this);
  }

  Retorna {
    inicializar: inicializar,
    _each: _each,
    set: set,
    obter: obtenha,
    unset: unset,
    toObject: toObject,
    toTemplateReplacements: toObject,
    chaves: chaves,
    valores: valores,
    index: índice,
    fusão: fundir,
    update: atualização,
    toQueryString: toQueryString,
    inspeccionar: inspecionar,
    toJSON: toObject,
    clone: ​​clone
  };
}) ());

Hash.from $ = H;
Object.extend (Number.prototype, (function () {
  toColorPart function () {
    regresso this.toPaddedString (2, 16);
  }

  succ function () {
    devolver este + 1;
  }

  tempos de função (iterador, o contexto) {
    .each $ R (isto, true 0,) (iterator, contexto);
    devolver este;
  }

  toPaddedString função (comprimento, radix) {
    cadeia var = this.toString (radix || 10);
    '0'.times de retorno (comprimento - string.length) + cordas;
  }

  abs function () {
    voltar Math.abs (this);
  }

  função round () {
    voltar Math.round (this);
  }

  ceil function () {
    voltar Math.ceil (this);
  }

  andar function () {
    voltar Math.floor (this);
  }

  Retorna {
    toColorPart: toColorPart,
    succ: succ,
    vezes: épocas,
    toPaddedString: toPaddedString,
    abs: abs,
    rodada: redondo,
    ceil: ceil,
    Piso:
  };
}) ());

Função $ R (início, fim, exclusivo) {
  retornar nova ObjectRange (início, fim exclusivo);
}

var ObjectRange = Class.create (Enumerable, (function () {
  initialize função (início, fim exclusivo) {
    this.start = partida;
    this.end = end;
    this.exclusive = exclusive;
  }

  _each função (iterator, context) {
    var value = this.start, i;
    for (i = 0; this.include (valor); i ++) {
      iterator.call (contexto, o valor, i);
      value = value.succ ();
    }
  }

  função include (value) {
    if (valor <this.start)
      return false;
    Se (this.exclusive)
      valor de retorno <this.end;
    valor de retorno <= this.end;
  }

  Retorna {
    inicializar: inicializar,
    _each: _each,
    incluem: include
  };
}) ());



var Abstract = {};


var Try = {
  estes: function () {
    var returnValue;

    for (var i = 0, comprimento = arguments.length; i <comprimento; i ++) {
      var lambda = argumentos [i];
      experimentar {
        returnValue = lambda ();
        pausa;
      } Catch (e) {}
    }

    voltar returnValue;
  }
};

var Ajax = {
  getTransport: function () {
    voltar Try.these (
      function () {return new XMLHttpRequest ()},
      function () {return new ActiveXObject ( 'MSXML2.XMLHTTP')},
      function () {return new ActiveXObject ( 'Microsoft.XMLHTTP')}
    ) || falso;
  },

  activeRequestCount: 0
};

Ajax.Responders = {
  respondedores: [],

  _each: function (iterator, context) {
    this.responders._each (iterator, contexto);
  },

  registar: function (respondedor) {
    if (! this.include (respondedor))
      this.responders.push (respondedor);
  },

  unregister: function (respondedor) {
    this.responders = this.responders.without (respondedor);
  },

  expedição: function (callback, pedido, transporte, json) {
    this.each (function (respondedor) {
      if (Object.isFunction (respondedor [retorno de chamada])) {
        experimentar {
          responder [callback] .Aplique (que responde, [pedido, transporte, json]);
        } Catch (e) {}
      }
    });
  }
};

Object.extend (Ajax.Responders, Enumerable);

Ajax.Responders.register ({
  onCreate: function () {} Ajax.activeRequestCount ++,
  onComplete: function () {} Ajax.activeRequestCount--
});
Ajax.Base = Class.create ({
  inicializar: function (options) {
    this.options = {
      método: 'post',
      assíncrona: true,
      contentType: "application / x-www-form-urlencoded",
      encoding: 'UTF-8',
      parâmetros: '',
      evalJSON: true,
      evalJS: true
    };
    Object.extend (this.options, opções || {});

    this.options.method this.options.method.toLowerCase = ();

    Se (Object.isHash (this.options.parameters))
      this.options.parameters this.options.parameters.toObject = ();
  }
});
Ajax.Request = Class.create (Ajax.Base, {
  _complete: false,

  inicializar: function ($ super, url, options) {
    $ super (opções);
    this.transport Ajax.getTransport = ();
    this.request (url);
  },

  solicitação: function (url) {
    this.url = url;
    this.method = this.options.method;
    var params = Object.isString (this.options.parameters)?
          this.options.parameters:
          Object.toQueryString (this.options.parameters);

    if (! [ 'get', 'post']. include (this.method)) {
      params + = (params '&': ''?) + "_method =" + this.method;
      this.method = 'post';
    }

    if (params && this.method === 'get') {
      this.url + = ( '?'?: '?' this.url.include () 'e') + params;
    }

    this.parameters params.toQueryParams = ();

    experimentar {
      var resposta = new Ajax.Response (this);
      if (this.options.onCreate) this.options.onCreate (resposta);
      Ajax.Responders.dispatch ( 'onCreate', esta, resposta);

      this.transport.open (this.method.toUpperCase (), this.url,
        this.options.asynchronous);

      Se (this.options.asynchronous) this.respondToReadyState.bind (este) .defer (1);

      this.transport.onreadystatechange = this.onStateChange.bind (this);
      this.setRequestHeaders ();

      this.body = this.method == 'post'? (this.options.postBody || params): null;
      this.transport.send (this.body);

      / * Força Firefox para lidar com estado de prontidão 4 para solicitações síncronas * /
      if (! this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange ();

    }
    catch (e) {
      this.dispatchException (e);
    }
  },

  onStateChange: function () {
    var readyState = this.transport.readyState;
    if (readyState> 1 &&! ((readyState == 4) && this._complete))
      this.respondToReadyState (this.transport.readyState);
  },

  setRequestHeaders: function () {
    var = {cabeçalhos
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Aceitar': 'text / javascript, text / html, application / xml, text / xml, * / *'
    };

    if ( 'post' == this.method) {
      cabeçalhos [ 'Content-type'] = + this.options.contentType
        (This.options.encoding '; charset =' + this.options.encoding:? '');

      / * Force "Connection: close" para mais antigos navegadores Mozilla para trabalhar
       * Em torno de um bug onde XMLHttpRequest envia uma incorrecta
       * Cabeçalho Content-comprimento. Veja Mozilla Bugzilla # 246651.
       * /
      if (this.transport.overrideMimeType &&
          (Navigator.userAgent.match (/ gecko \ / (\ d {4}) /) || [0,2005]) [1] <2005)
            cabeçalhos [ 'Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'objeto') {
      var extras = this.options.requestHeaders;

      Se (Object.isFunction (extras.push))
        for (var i = 0, comprimento = extras.length; i <comprimento; i + = 2)
          cabeçalhos [extras [i]] = extras [i + 1];
      outro
        $ H (extras) .each (function (par) {cabeçalhos [pair.key] = pair.value});
    }

    for (var nome nos cabeçalhos)
      if (cabeçalhos [nome]! = null)
        this.transport.setRequestHeader (nome, cabeçalhos [nome]);
  },

  success: function () {
    estatuto var = this.getStatus ();
    voltar! estatuto || (Status> = 200 && estatuto <300) || Status == 304;
  },

  getStatus: function () {
    experimentar {
      if (this.transport.status === 1223) devolver 204;
      voltar this.transport.status || 0;
    } Catch (e) {return 0}
  },

  respondToReadyState: function (readyState) {
    Estado var = Ajax.Request.Events [readyState], a resposta = new Ajax.Response (this);

    if (estado == 'Complete') {
      experimentar {
        this._complete = true;
        (This.options [ 'on' + Response.Status]
         || this.options [ 'sobre' + (? this.success () 'Sucesso': 'Falha')]
         || Prototype.emptyFunction) (resposta, response.headerJSON);
      } Catch (e) {
        this.dispatchException (e);
      }

      var contentType = response.getHeader ( 'Content-type');
      if (this.options.evalJS == 'força'
          || (This.options.evalJS && this.isSameOrigin () && contentType
          && ContentType.match (/ ^ \ s * (texto | aplicação) \ / (x -) (java | ECMA) de roteiro (;?.? *) \ S * $ / i)))
        this.evalResponse ();
    }

    experimentar {
      (This.options [ 'sobre' + estado] || Prototype.emptyFunction) (resposta, response.headerJSON);
      Ajax.Responders.dispatch ( 'on' + estado, esta, resposta, response.headerJSON);
    } Catch (e) {
      this.dispatchException (e);
    }

    if (estado == 'Complete') {
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  isSameOrigin: function () {
    var m = this.url.match (/ ^ \ s * https: \ / \ / [^ \ /] * /);
    voltar! m || (M [0] == '# {protocolo} // # {domain} # {port} ". Interpolar ({
      protocolo: location.protocol,
      domain: document.domain,
      port: location.port? ':' + Location.port: ''
    }));
  },

  getHeader: function (nome) {
    experimentar {
      voltar this.transport.getResponseHeader (nome) || nulo;
    } Catch (e) {return null; }
  },

  evalResponse: function () {
    experimentar {
      voltar eval ((this.transport.responseText || '') .unfilterJSON ());
    } Catch (e) {
      this.dispatchException (e);
    }
  },

  dispatchException: function (exceção) {
    (This.options.onException || Prototype.emptyFunction) (esta, exceção);
    Ajax.Responders.dispatch ( 'onException', este, exceção);
  }
});

Ajax.Request.Events =
  [ 'Não inicializada', 'carregar', 'Loaded', 'Interativo', 'completa'];








Ajax.Response = Class.create ({
  inicializar: function (request) {
    this.request = pedido;
    transporte var = this.transport = request.transport,
        readyState = this.readyState = transport.readyState;

    if ((readyState> 2 &&! Prototype.Browser.IE) || == readyState 4) {
      this.status this.getStatus = ();
      this.statusText this.getStatusText = ();
      this.responseText = String.interpret (transport.responseText);
      this.headerJSON this._getHeaderJSON = ();
    }

    Se (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML = Object.isUndefined (xml)? nulo: xml;
      this.responseJSON this._getResponseJSON = ();
    }
  },

  status: 0,

  statusText: '',

  getStatus: Ajax.Request.prototype.getStatus,

  getStatusText: function () {
    experimentar {
      voltar this.transport.statusText || '';
    } Catch (e) {return ''}
  },

  getHeader: Ajax.Request.prototype.getHeader,

  getallheaders: function () {
    experimentar {
      regresso this.getAllResponseHeaders ();
    } Catch (e) {return null}
  },

  getResponseHeader: function (nome) {
    voltar this.transport.getResponseHeader (nome);
  },

  getAllResponseHeaders: function () {
    regresso this.transport.getAllResponseHeaders ();
  },

  _getHeaderJSON: function () {
    var json = this.getHeader ( 'X-JSON');
    Se return null (JSON!);

    experimentar {
      json = decodeURIComponent (escape (JSON));
    } Catch (e) {
    }

    experimentar {
      voltar json.evalJSON (this.request.options.sanitizeJSON ||
        ! This.request.isSameOrigin ());
    } Catch (e) {
      this.request.dispatchException (e);
    }
  },

  _getResponseJSON: function () {
    var options = this.request.options;
    if (! options.evalJSON || (options.evalJSON! = 'força' &&
      ! (This.getHeader ( 'Content-type') || '') .include ( 'application / json')) ||
        this.responseText.blank ())
          return null;
    experimentar {
      voltar this.responseText.evalJSON (options.sanitizeJSON ||
        ! This.request.isSameOrigin ());
    } Catch (e) {
      this.request.dispatchException (e);
    }
  }
});

Ajax.Updater = Class.create (Ajax.Request, {
  inicializar: function ($ super, recipiente, url, options) {
    this.container = {
      sucesso: (container.success || container),
      failure: (container.failure || (container.success nulo:? container))
    };

    options = Object.clone (opções);
    var onComplete = options.onComplete;
    options.onComplete = (function (resposta, JSON) {
      this.updateContent (response.responseText);
      if (Object.isFunction (onComplete)) onComplete (resposta, JSON);
    .}) Ligar (this);

    $ Super (url, opções);
  },

  updateContent: function (responseText) {
    var receptor = this.container [this.success ()? "Sucesso": "fracasso"],
        opções = this.options;

    (! Options.evalScripts) se responseText = responseText.stripScripts ();

    if (receptor = $ (receptor)) {
      Se (options.insertion) {
        Se (Object.isString (options.insertion)) {
          var inserção = {}; inserção [options.insertion] = responseText;
          receiver.insert (de inserção);
        }
        outra options.insertion (receptor, responseText);
      }
      outra receiver.update (responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create (Ajax.Base, {
  inicializar: function ($ super, recipiente, url, options) {
    $ super (opções);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = {};
    this.container = contentor;
    this.url = url;

    this.start ();
  },

  começar: function () {
    this.options.onComplete = this.updateComplete.bind (this);
    this.onTimerEvent ();
  },

  parar: function () {
    this.updater.options.onComplete = indefinido;
    clearTimeout (this.timer);
    (This.onComplete || Prototype.emptyFunction) .Aplique (this, argumentos);
  },

  updateComplete: function (response) {
    Se (this.options.decay) {
      this.decay = (== response.responseText this.lastText?
        this.decay * this.options.decay: 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind (this) .delay (this.decay * this.frequency);
  },

  onTimerEvent: function () {
    this.updater = new Ajax.Updater (this.container, this.url, this.options);
  }
});

(Function (GLOBAL) {

  var indefinido;
  var FATIA = Array.prototype.slice;

  var DIV = document.createElement ( 'div');


  função $ (elemento) {
    Se (arguments.length> 1) {
      for (var i = 0, elementos = [], comprimento = arguments.length; i <comprimento; i ++)
        elements.push ($ (argumentos [i]));
      elementos retornar;
    }

    if (Object.isString (elemento))
      element = document.getElementById (elemento);
    voltar Element.extend (elemento);
  }

  GLOBAL $ = $.;


  if (! GLOBAL.Node) GLOBAL.Node = {};

  if (! GLOBAL.Node.ELEMENT_NODE) ​​{
    Object.extend (GLOBAL.Node, {
      ELEMENT_NODE: 1,
      ATTRIBUTE_NODE: 2,
      TEXT_NODE: 3,
      CDATA_SECTION_NODE: 4,
      ENTITY_REFERENCE_NODE: 5,
      ENTITY_NODE: 6,
      PROCESSING_INSTRUCTION_NODE: 7,
      COMMENT_NODE: 8,
      DOCUMENT_NODE: 9,
      DOCUMENT_TYPE_NODE: 10,
      DOCUMENT_FRAGMENT_NODE: 11,
      NOTATION_NODE: 12
    });
  }

  var ELEMENT_CACHE = {};

  funcionar shouldUseCreationCache (tagName, atributos) {
    if (tagName === 'selecionar') return false;
    if ( 'tipo' em atributos) return false;
    return true;
  }

  var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX = (function () {
    experimentar {
      var el = document.createElement ( '<input name = "x">');
      voltar el.tagName.toLowerCase () === 'input' && el.name === 'x';
    }
    catch (err) {
      return false;
    }
  }) ();


  var oldElement = GLOBAL.Element;
  Função do elemento (tagName, atributos) {
    atributos = atributos || {};
    tagName tagName.toLowerCase = ();

    Se (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX && attributes.name) {
      tagName = '<' + tagName + 'name = "" + attributes.name +' "> ';
      eliminar attributes.name;
      voltar Element.writeAttribute (document.createElement (tagName), atributos);
    }

    if (! ELEMENT_CACHE [tagName])
      ELEMENT_CACHE [tagName] = Element.extend (document.createElement (tagName));

    nó var = shouldUseCreationCache (tagName, atributos)?
     ELEMENT_CACHE [tagName] .cloneNode (false): document.createElement (tagName);

    voltar Element.writeAttribute (nó, atributos);
  }

  GLOBAL.Element = Elemento;

  Object.extend (GLOBAL.Element, oldElement || {});
  Se (oldElement) GLOBAL.Element.prototype = oldElement.prototype;

  Element.Methods = {ByTag: {}, Simulado: {}};

  métodos var = {};

  var INSPECT_ATTRIBUTES = {id: 'id', className: 'classe'};
  função de inspecionar (elemento) {
    elemento = $ (elemento);
    var result = '<' + element.tagName.toLowerCase ();

    atributo var, de valor;
    for (var em INSPECT_ATTRIBUTES) {
      atributo = INSPECT_ATTRIBUTES [propriedade];
      value = (elemento [propriedade] || '') .ToString ();
      if (value) resultado + = '' + atributo + '=' + value.inspect (true);
    }

    resultado de retorno + '>';
  }

  methods.inspect = inspecionar;


  funcionar visível (elemento) {
    return $ (elemento) .getStyle ( 'display') == 'none';
  }

  seletora de função (elemento, bool) {
    elemento = $ (elemento);
    if (typeof bool! == 'booleano')
      bool = Element.visible (elemento)!;
    Elemento [bool? 'Show': 'esconder'] (elemento);

    elemento de retorno;
  }

  hide função (elemento) {
    elemento = $ (elemento);
    element.style.display = 'none';
    elemento de retorno;
  }

  função show (elemento) {
    elemento = $ (elemento);
    element.style.display = '';
    elemento de retorno;
  }


  Object.extend (métodos, {
    visible: visível,
    alternar: alternância,
    esconder: esconder,
    show: mostrar
  });


  função remove (elemento) {
    elemento = $ (elemento);
    element.parentNode.removeChild (elemento);
    elemento de retorno;
  }

  var SELECT_ELEMENT_INNERHTML_BUGGY = (function () {
    var el = document.createElement ( "select"),
        isBuggy = true;
    el.innerHTML = "<value option = \" test \ "> test </ option>";
    if (el.options && el.options [0]) {
      isBuggy = el.options [0] .nodeName.toUpperCase () == "OPÇÃO!";
    }
    el = null;
    voltar isBuggy;
  }) ();

  var TABLE_ELEMENT_INNERHTML_BUGGY = (function () {
    experimentar {
      var el = document.createElement ( "table");
      if (el && el.tBodies) {
        el.innerHTML = "<tbody> <tr> <td> test </ td> </ tr> </ tbody>";
        var isBuggy = typeof el.tBodies [0] == "undefined";
        el = null;
        voltar isBuggy;
      }
    } Catch (e) {
      return true;
    }
  }) ();

  var LINK_ELEMENT_INNERHTML_BUGGY = (function () {
    experimentar {
      var el = document.createElement ( 'div');
      el.innerHTML = "<link />";
      var isBuggy = (=== el.childNodes.length 0);
      el = null;
      voltar isBuggy;
    } Catch (e) {
      return true;
    }
  }) ();

  var ANY_INNERHTML_BUGGY = SELECT_ELEMENT_INNERHTML_BUGGY ||
   TABLE_ELEMENT_INNERHTML_BUGGY || LINK_ELEMENT_INNERHTML_BUGGY;

  var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING = (function () {
    var s = document.createElement ( "script"),
        isBuggy = false;
    experimentar {
      s.appendChild (document.createTextNode ( ""));
      isBuggy =! s.firstChild ||
        ! S.firstChild && s.firstChild.nodeType == 3;
    } Catch (e) {
      isBuggy = true;
    }
    s = null;
    voltar isBuggy;
  }) ();

  atualização de função (elemento, conteúdo) {
    elemento = $ (elemento);

    descendentes var = element.getElementsByTagName ( '*'),
     i = descendants.length;
    while (i--) purgeElement (descendentes [i]);

    if (conteúdo && content.toElement)
      content = content.toElement ();

    if (Object.isElement (conteúdo))
      voltar element.update () insere (conteúdo).;


    content = Object.toHTML (conteúdo);
    var tagName element.tagName.toUpperCase = ();

    if (tagName === 'script' && SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING) {
      element.text = conteúdo;
      elemento de retorno;
    }

    Se (ANY_INNERHTML_BUGGY) {
      Se (tagName em INSERTION_TRANSLATIONS.tags) {
        while (element.firstChild)
          element.removeChild (element.firstChild);

        nodos var = getContentFromAnonymousElement (TagName, content.stripScripts ());
        for (var i = 0, nó; nó = nós [i]; i ++)
          element.appendChild (nó);

      } Else if (LINK_ELEMENT_INNERHTML_BUGGY && Object.isString (conteúdo) && content.indexOf ( '<link')> -1) {
        while (element.firstChild)
          element.removeChild (element.firstChild);

        var nós = getContentFromAnonymousElement (tagName,
         content.stripScripts (), true);

        for (var i = 0, nó; nó = nós [i]; i ++)
          element.appendChild (nó);
      } outro {
        element.innerHTML content.stripScripts = ();
      }
    } outro {
      element.innerHTML content.stripScripts = ();
    }

    content.evalScripts.bind (conteúdo) .defer ();
    elemento de retorno;
  }

  substituir a função (elemento, conteúdo) {
    elemento = $ (elemento);

    if (conteúdo && content.toElement) {
      content = content.toElement ();
    } Else if (! Object.isElement (conteúdo)) {
      content = Object.toHTML (conteúdo);
      gama var = element.ownerDocument.createRange ();
      range.selectNode (elemento);
      content.evalScripts.bind (conteúdo) .defer ();
      content = range.createContextualFragment (content.stripScripts ());
    }

    element.parentNode.replaceChild (conteúdo, elemento);
    elemento de retorno;
  }

  var = {INSERTION_TRANSLATIONS
    antes: function (elemento, nó) {
      element.parentNode.insertBefore (nó, elemento);
    },
    top: function (elemento, nó) {
      element.insertBefore (nó, element.firstChild);
    },
    bottom: function (elemento, nó) {
      element.appendChild (nó);
    },
    depois: function (elemento, nó) {
      element.parentNode.insertBefore (nó, element.nextSibling);
    },

    tags: {
      TABELA: [ '<table>', '</ table>', 1 ],
      TBODY: [ '<table> <tbody>', '</ tbody> </ table>', 2],
      TR: [ '<table> <tbody> <tr>', '</ tr> </ tbody> </ table>', 3],
      TD: [ '<table> <tbody> <tr> <td>', '</ td> </ tr> </ tbody> </ table>', 4],
      SELECT: [ '<select>', '</ select>', 1]
    }
  };

  var tag = INSERTION_TRANSLATIONS.tags;

  Object.extend (tags, {
    THEAD: tags.TBODY,
    TFOOT: tags.TBODY,
    TH: tags.TD
  });

  replace_IE função (elemento, conteúdo) {
    elemento = $ (elemento);
    if (conteúdo && content.toElement)
      content = content.toElement ();
    if (Object.isElement (conteúdo)) {
      element.parentNode.replaceChild (conteúdo, elemento);
      elemento de retorno;
    }

    content = Object.toHTML (conteúdo);
    var parent = element.parentNode, tagName = parent.tagName.toUpperCase ();

    Se (tagName em INSERTION_TRANSLATIONS.tags) {
      var nextSibling = Element.next (elemento);
      fragmentos var = getContentFromAnonymousElement (
       tagName, content.stripScripts ());

      parent.removeChild (elemento);

      var iterator;
      Se (nextSibling)
        iterator = function (nó) {parent.insertBefore (nó, nextSibling)};
      outro
        iterator = function (nó) {parent.appendChild (nó); }

      fragments.each (iterator);
    } outro {
      element.outerHTML content.stripScripts = ();
    }

    content.evalScripts.bind (conteúdo) .defer ();
    elemento de retorno;
  }

  Se ( "outerHTML 'em document.documentElement)
    substituir = replace_IE;

  função isContent (conteúdo) {
    if (Object.isUndefined (conteúdo) || conteúdo === null) return false;

    if (Object.isString (conteúdo) || Object.isNumber (conteúdo)) return true;
    if (Object.isElement (conteúdo)) return true;
    if (content.toElement || content.toHTML) return true;

    return false;
  }

  função insertContentAt (elemento, conteúdo, posição) {
    posição = position.toLowerCase ();
    método var = INSERTION_TRANSLATIONS [posição];

    if (conteúdo && content.toElement) content = content.toElement ();
    if (Object.isElement (conteúdo)) {
      Método (elemento, conteúdo);
      elemento de retorno;
    }

    content = Object.toHTML (conteúdo);
    var tagName = ((=== posição 'antes' || posição === 'depois')?
     element.parentNode: Elemento) .tagName.toUpperCase ();

    var childNodes = getContentFromAnonymousElement (TagName, content.stripScripts ());

    if (posição === 'top' || posição === 'depois') childNodes.reverse ();

    for (var i = 0, nó; nó = childNodes [i]; i ++)
      Método (elemento, nó);

    content.evalScripts.bind (conteúdo) .defer ();
  }

  Inserir função (elemento, inserções) {
    elemento = $ (elemento);

    Se (isContent (inserções))
      inserções = {fundo: inserções};

    for (var posição em inserções)
      insertContentAt (elemento, inserções [posição], posição);

    elemento de retorno;
  }

  envoltório de função (elemento, envoltório, atributos) {
    elemento = $ (elemento);

    if (Object.isElement (invólucro)) {
      $ (Invólucro) .writeAttribute (atributos || {});
    } Else if (Object.isString (invólucro)) {
      envoltório = new Elemento (invólucro, atributos);
    } outro {
      envoltório = new Elemento ( 'div', envoltório);
    }

    Se (element.parentNode)
      element.parentNode.replaceChild (envoltório, elemento);

    wrapper.appendChild (elemento);

    voltar invólucro;
  }

  função cleanWhitespace (elemento) {
    elemento = $ (elemento);
    var nó = element.firstChild;

    while (nó) {
      var nextNode = node.nextSibling;
      if (node.nodeType === Node.TEXT_NODE &&! / \ S / .test (node.nodeValue))
        element.removeChild (nó);
      nó = nextNode;
    }
    elemento de retorno;
  }

  funcionar vazio (elemento) {
    return $ (elemento) .innerHTML.blank ();
  }

  funcionar getContentFromAnonymousElement (tagName, html, força) {
    var t = INSERTION_TRANSLATIONS.tags [tagName], div = DIV;

    var solução = !! t;
    if (! solução && vigor) {
      solução alternativa = true;
      t = [ '', '', 0];
    }

    if (solução) {
      div.innerHTML = '& # 160;' + T [0] + html + t [1];
      div.removeChild (div.firstChild);
      for (var i = t [2]; Eu--;)
        div = div.firstChild;
    } outro {
      div.innerHTML = html;
    }

    return $ Um (div.childNodes);
  }

  clone function (elemento, profundidade) {
    if ((elemento = $ (elemento))!) return;
    var clone = element.cloneNode (de profundidade);
    Se (HAS_UNIQUE_ID_PROPERTY!) {
      clone._prototypeUID = undefined;
      if (de profundidade) {
        var descendentes = Element.select (clone, '*'),
         i = descendants.length;
        enquanto eu--)
          descendentes [i] ._ prototypeUID = undefined;
      }
    }
    regresso Element.extend (clone);
  }

  purgeElement função (elemento) {
    var uid = getUniqueElementID (elemento);
    if (uid) {
      Element.stopObserving (elemento);
      Se (HAS_UNIQUE_ID_PROPERTY!)
        element._prototypeUID = undefined;
      eliminar Element.Storage [uid];
    }
  }

  purgeCollection função (elementos) {
    var i = elements.length;
    enquanto eu--)
      purgeElement (elementos [i]);
  }

  funcionar purgeCollection_IE (elementos) {
    var i = elements.length, elemento, uid;
    enquanto eu--) {
      elemento = elementos [i];
      uid = getUniqueElementID (elemento);
      eliminar Element.Storage [uid];
      eliminar Event.cache [uid];
    }
  }

  Se (HAS_UNIQUE_ID_PROPERTY) {
    purgeCollection = purgeCollection_IE;
  }


  purga de função (elemento) {
    if ((elemento = $ (elemento))!) return;
    purgeElement (elemento);

    descendentes var = element.getElementsByTagName ( '*'),
     i = descendants.length;

    while (i--) purgeElement (descendentes [i]);

    return null;
  }

  Object.extend (métodos, {
    remove: remover,
    update: atualização,
    substituir: substituir,
    inserir: inserir,
    envolvê: envoltório,
    cleanWhitespace: cleanWhitespace,
    vazio: vazio,
    clone: ​​clone,
    purge: expurgo
  });



  função recursivelyCollect (elemento, propriedade, MaximumLength) {
    elemento = $ (elemento);
    MaximumLength = MaximumLength || -1;
    elementos var = [];

    while (elemento = elemento [propriedade]) {
      Se (element.nodeType === Node.ELEMENT_NODE)
        elements.push (Element.extend (elemento));

      if (elements.length === MaximumLength) break;
    }

    elementos retornar;
  }


  antepassados ​​de função (elemento) {
    voltar recursivelyCollect (elemento, 'parentNode');
  }

  descendentes de função (elemento) {
    voltar Element.select (elemento, '*');
  }

  função firstDescendant (elemento) {
    elemento = $ (elemento) .firstChild;
    while (elemento && element.nodeType! == Node.ELEMENT_NODE)
      elemento = element.nextSibling;

    return $ (elemento);
  }

  immediateDescendants função (elemento) {
    var results = [], criança = $ (elemento) .firstChild;

    while (criança) {
      Se (child.nodeType === Node.ELEMENT_NODE)
        results.push (Element.extend (criança));

      child = child.nextSibling;
    }

    retornar resultados;
  }

  previousSiblings função (elemento) {
    voltar recursivelyCollect (elemento, 'previousSibling');
  }

  nextSiblings função (elemento) {
    voltar recursivelyCollect (elemento, 'nextSibling');
  }

  irmãos de função (elemento) {
    elemento = $ (elemento);
    var anteriores = previousSiblings (elemento),
     next = nextSiblings (elemento);
    voltar previous.reverse () concat (ao lado).;
  }

  jogo de função (elemento, selector) {
    elemento = $ (elemento);

    if (Object.isString (selector))
      voltar Prototype.Selector.match (elemento, selector);

    voltar selector.match (elemento);
  }


  função _recursivelyFind (elemento, propriedade, expressão, índice) {
    elemento = $ (elemento), expressão = expressão || 0, index = índice || 0;
    if (Object.isNumber (expressão)) {
      index = expressão, expressão = null;
    }

    while (elemento = elemento [propriedade]) {
      if (element.nodeType == 1!) continue;
      if (expressão &&! Prototype.Selector.match (elemento, expressão))
        continuar;
      if (--índice> = 0) continue;

      voltar Element.extend (elemento);
    }
  }


  função up (elemento, expressão, índice) {
    elemento = $ (elemento);

    if (arguments.length === 1) return $ (element.parentNode);
    voltar _recursivelyFind (elemento, 'parentNode', expressão, index);
  }

  função Down (elemento, expressão, índice) {
    if (arguments.length === 1) voltar firstDescendant (elemento);
    elemento = $ (elemento), expressão = expressão || 0, index = índice || 0;

    if (Object.isNumber (expressão))
      index = expressão, expressão = '*';

    var nó = Prototype.Selector.select (expressão, elemento) [índice];
    voltar Element.extend (nó);
  }

  funcionar anterior (elemento, expressão, índice) {
    voltar _recursivelyFind (elemento, 'previousSibling', expressão, index);
  }

  funcionar seguinte (elemento, expressão, índice) {
    voltar _recursivelyFind (elemento, 'nextSibling', expressão, index);
  }

  funcionar select (elemento) {
    elemento = $ (elemento);
    expressões var = SLICE.call (argumentos, 1) .join ( ',');
    retornam Prototype.Selector.select (expressões, elemento);
  }

  funcionar adjacente (elemento) {
    elemento = $ (elemento);
    expressões var = SLICE.call (argumentos, 1) .join ( ',');
    var irmãos = Element.siblings (elemento), os resultados = [];
    for (var i = 0, irmão; irmão = irmãos [i]; i ++) {
      if (Prototype.Selector.match (irmão, expressões))
        results.push (irmão);
    }

    retornar resultados;
  }

  descendantOf_DOM função (elemento, ancestral) {
    elemento = $ (elemento), antepassado = $ (ancestral);
    (! Elemento || ancestral) se return false;
    while (elemento = element.parentNode)
      if (elemento === ancestral) return true;
    return false;
  }

  descendantOf_contains função (elemento, antepassado) {
    elemento = $ (elemento), antepassado = $ (ancestral);
    (! Elemento || ancestral) se return false;
    if (! ancestor.contains) descendantOf_DOM retorno (elemento, ancestral);
    voltar ancestor.contains (elemento) && ancestral == elemento!;
  }

  descendantOf_compareDocumentPosition função (elemento, ancestral) {
    elemento = $ (elemento), antepassado = $ (ancestral);
    (! Elemento || ancestral) se return false;
    retorno (element.compareDocumentPosition (ancestral) & 8) === 8;
  }

  var descendantOf;
  Se (DIV.compareDocumentPosition) {
    descendantOf = descendantOf_compareDocumentPosition;
  } else if (DIV.contains) {
    descendantOf = descendantOf_contains;
  } outro {
    descendantOf = descendantOf_DOM;
  }


  Object.extend (métodos, {
    recursivelyCollect: recursivelyCollect,
    antepassados: antepassados,
    descendentes: descendentes,
    firstDescendant: firstDescendant,
    immediateDescendants: immediateDescendants,
    previousSiblings: previousSiblings,
    nextSiblings: nextSiblings,
    Irmãos: irmãos,
    jogo: jogo,
    acima, acima,
    para baixo para baixo,
    Anterior: anterior,
    seguinte: em seguida,
    : SELECT,
    adjacente: adjacente,
    descendantOf: descendantOf,

    getElementsBySelector: select,

    childElements: immediateDescendants
  });


  var idCounter = 1;
  função de identificar (elemento) {
    elemento = $ (elemento);
    var id = Element.readAttribute (elemento, 'id');
    if (id) id retorno;

    fazer {id = 'anonymous_element_' + idCounter ++} while ($ (id));

    Element.writeAttribute (elemento, 'id', id);
    retornar id;
  }


  função readAttribute (elemento, nome) {
    return $ (elemento) .getAttribute (nome);
  }

  função readAttribute_IE (elemento, nome) {
    elemento = $ (elemento);

    mesa var = ATTRIBUTE_TRANSLATIONS.read;
    if (table.values ​​[nome])
      table.values ​​retorno [nome] (elemento, de nome);

    if (table.names [nome]) name = table.names [nome];

    if (name.include ( ':')) {
      if (element.attributes || element.attributes [nome]!) return null;
      voltar element.attributes [nome] .value;
    }

    voltar element.getAttribute (nome);
  }

  readAttribute_Opera função (elemento, nome) {
    if (nome === 'title') return element.title;
    voltar element.getAttribute (nome);
  }

  var PROBLEMATIC_ATTRIBUTE_READING = (function () {
    DIV.setAttribute ( 'onclick', []);
    var value = DIV.getAttribute ( 'onclick');
    var isFunction = Object.isArray (valor);
    DIV.removeAttribute ( 'onclick');
    voltar isFunction;
  }) ();

  Se (PROBLEMATIC_ATTRIBUTE_READING) {
    readAttribute = readAttribute_IE;
  } Else if (Prototype.Browser.Opera) {
    readAttribute = readAttribute_Opera;
  }


  função WriteAttribute (elemento, nome, valor) {
    elemento = $ (elemento);
    atributos var = {}, table = ATTRIBUTE_TRANSLATIONS.write;

    if (typeof nome === 'objeto') {
      atributos = nome;
    } outro {
      atributos [nome] = Object.isUndefined (valor)? valor real;
    }

    for (var attr em atributos) {
      name = table.names [attr] || attr;
      VALUE = atributos [attr];
      if (table.values ​​[attr]) {
        VALUE = table.values ​​[attr] (elemento, value);
        if (Object.isUndefined (valor)) continue;
      }
      if (valor === valor || falsa === null)
        element.removeAttribute (nome);
      else if (valor === true)
        element.setAttribute (nome, nome);
      outra element.setAttribute (nome, valor);
    }

    elemento de retorno;
  }

  var PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES = (function () {
    Se (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX!) {
      return false;
    }
    checkbox var = document.createElement ( '<input type = "checkbox">');
    checkbox.checked = true;
    nó var = checkbox.getAttributeNode ( 'checada');
    voltar! nó || ! Node.specified;
  }) ();

  hasAttribute função (elemento, atributo) {
    atributo = ATTRIBUTE_TRANSLATIONS.has [atributo] || atributo;
    nó var = $ (elemento) .getAttributeNode (atributo);
    retorno !! (nó && node.specified);
  }

  hasAttribute_IE função (elemento, atributo) {
    if (atributo === 'checada') {
      voltar element.checked;
    }
    voltar hasAttribute (elemento, atributo);
  }

  GLOBAL.Element.Methods.Simulated.hasAttribute =
   PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES?
   hasAttribute_IE: hasAttribute;

  classnames função (elemento) {
    retornar novos Element.ClassNames (elemento);
  }

  var regExpCache = {};
  getRegExpForClassName função (className) {
    if (regExpCache [className]) retornar regExpCache [className];

    var re = new RegExp ( "(^ | \\ S +)" + + className "(\\ S + | $)");
    regExpCache [className] = re;
    voltar re;
  }

  hasClassName função (elemento, className) {
    if ((elemento = $ (elemento))!) return;

    var elementClassName = element.className;

    if (elementClassName.length === 0) return false;
    if (elementClassName === className) return true;

    voltar getRegExpForClassName (className) .test (elementClassName);
  }

  addClassName função (elemento, className) {
    if ((elemento = $ (elemento))!) return;

    if (! hasClassName (elemento, className))
      element.className + = (element.className '': ''?) + className;

    elemento de retorno;
  }

  removeClassName função (elemento, className) {
    if ((elemento = $ (elemento))!) return;

    element.className = element.className.replace (
     getRegExpForClassName (className), '') .strip ();

    elemento de retorno;
  }

  função toggleClassName (elemento, className, bool) {
    if ((elemento = $ (elemento))!) return;

    if (Object.isUndefined (bool))
      ! Bool = hasClassName (elemento, className);

    var method = Elemento [bool? 'AddClassName': 'removeClassName'];
    método de retorno (elemento, className);
  }

  var ATTRIBUTE_TRANSLATIONS = {};

  var classProp = 'className', forProp = 'para';

  DIV.setAttribute (classProp, 'X');
  if (DIV.className! == 'X') {
    DIV.setAttribute ( 'class', 'x');
    if ( 'x' DIV.className ===)
      classProp = "classe";
  }

  var LABEL = document.createElement ( 'label');
  LABEL.setAttribute (forProp, 'X');
  if (LABEL.htmlFor! == 'x') {
    LABEL.setAttribute ( 'htmlFor', 'x');
    if (LABEL.htmlFor === 'x')
      forProp = 'htmlFor';
  }
  LABEL = null;

  _getAttr função (elemento, atributo) {
    voltar element.getAttribute (atributo);
  }

  função _getAttr2 (elemento, atributo) {
    regresso element.getAttribute (atributo, 2);
  }

  _getAttrNode função (elemento, atributo) {
    nó var = element.getAttributeNode (atributo);
    voltar nó? node.value: '';
  }

  _getFlag função (elemento, atributo) {
    return $ (elemento) .hasAttribute (atributo)? atributo: null;
  }

  DIV.onclick = Prototype.emptyFunction;
  var onclickValue = DIV.getAttribute ( 'onclick');

  var _getEv;

  if (String (onclickValue) .indexOf ( "{")> -1) {
    _getEv = function (elemento, atributo) {
      var value = element.getAttribute (atributo);
      se o retorno nula (valor!);
      value = Value.ToString ();
      value = value.split ( "{") [1];
      value = value.split ( '}') [0];
      regresso value.strip ();
    };
  }
  else if (onclickValue === '') {
    _getEv = function (elemento, atributo) {
      var value = element.getAttribute (atributo);
      se o retorno nula (valor!);
      regresso value.strip ();
    };
  }

  ATTRIBUTE_TRANSLATIONS.read = {
    nomes: {
      "Classe": classProp,
      'ClassName': classProp,
      'For': forProp,
      'HtmlFor': forProp
    },

    valores: {
      estilo: function (elemento) {
        regresso element.style.cssText.toLowerCase ();
      },
      Título: function (elemento) {
        voltar element.title;
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.write = {
    nomes: {
      className: 'classe',
      htmlFor: 'para',
      cellpadding: 'CellPadding',
      cellspacing: 'cellSpacing'
    },

    valores: {
      verificadas: function (elemento, value) {
        value = !! valor;
        element.checked = value;
        valor de retorno ? 'Checada': null;
      },

      estilo: function (elemento, value) {
        element.style.cssText = valor? valor : '';
      }
    }
  };

  ATTRIBUTE_TRANSLATIONS.has = {nomes: {}};

  Object.extend (ATTRIBUTE_TRANSLATIONS.write.names,
   ATTRIBUTE_TRANSLATIONS.read.names);

  var CAMEL_CASED_ATTRIBUTE_NAMES = $ w ( 'ColSpan rowSpan valign dateTime' +
   'AccessKey tabIndex ENCTYPE maxLength readOnly Longdesc frameBorder');

  for (var i = 0, attr; attr = CAMEL_CASED_ATTRIBUTE_NAMES [i]; i ++) {
    ATTRIBUTE_TRANSLATIONS.write.names [attr.toLowerCase ()] = attr;
    ATTRIBUTE_TRANSLATIONS.has.names [attr.toLowerCase ()] = attr;
  }

  Object.extend (ATTRIBUTE_TRANSLATIONS.read.values, {
    href: _getAttr2,
    src: _getAttr2,
    digite: _getAttr,
    action: _getAttrNode,
    deficientes: _getFlag,
    verificado: _getFlag,
    readonly: _getFlag,
    múltipla: _getFlag,
    onload: _getEv,
    onunload: _getEv,
    onclick: _getEv,
    ondblclick: _getEv,
    onmousedown: _getEv,
    onmouseup: _getEv,
    onmouseover: _getEv,
    onmousemove: _getEv,
    onmouseout: _getEv,
    onfocus: _getEv,
    onblur: _getEv,
    onkeypress: _getEv,
    onkeydown: _getEv,
    onkeyup: _getEv,
    onsubmit: _getEv,
    onreset: _getEv,
    onselect: _getEv,
    onchange: _getEv
  });


  Object.extend (métodos, {
    identificar: identificar,
    readAttribute: readAttribute,
    WriteAttribute: WriteAttribute,
    classnames: nomes de classes,
    hasClassName: hasClassName,
    addClassName: addClassName,
    removeClassName: removeClassName,
    toggleClassName: toggleClassName
  });


  função normalizeStyleName (estilo) {
    if (estilo === 'float' || estilo === 'styleFloat')
      retorno "cssFloat ';
    regresso style.camelize ();
  }

  função normalizeStyleName_IE (estilo) {
    if (estilo === 'float' || estilo === 'cssFloat')
      voltar 'styleFloat';
    regresso style.camelize ();
  }

  setStyle função (elemento, estilos) {
    elemento = $ (elemento);
    var elementStyle = element.style, fósforo;

    if (Object.isString (estilos)) {
      elementStyle.cssText + = ';' + estilos;
      if (styles.include ( 'opacidade')) {
        var opacidade = styles.match (/ opacidade:?.? \ s * (\ d \ \ d *) /) [1];
        Element.setOpacity (elemento, opacidade);
      }
      elemento de retorno;
    }

    for (var em estilos) {
      if (=== propriedade 'opacidade') {
        Element.setOpacity (elemento, estilos [propriedade]);
      } outro {
        var value = estilos [propriedade];
        if (propriedade === 'float' || propriedade === 'cssFloat') {
          property = Object.isUndefined (elementStyle.styleFloat)?
           'CssFloat': 'styleFloat';
        }
        elementStyle [propriedade] = valor;
      }
    }

    elemento de retorno;
  }


  getStyle função (elemento, estilo) {
    elemento = $ (elemento);
    style = normalizeStyleName (estilo);

    var value = element.style [estilo];
    if (! valor || valor === 'auto') {
      var css = document.defaultView.getComputedStyle (elemento, null);
      value = css? css [estilo]: null;
    }

    if (estilo === 'opacidade') valor de retorno? parseFloat (valor): 1,0;
    valor === 'auto' voltar? nulo: valor;
  }

  getStyle_Opera função (elemento, estilo) {
    switch (estilo) {
      caso 'height': case 'width':
        se nula (Element.visible (elemento)!) return;

        var dim = parseInt (getStyle (elemento, estilo), 10);

        if (dim! == elemento [ 'compensar' + style.capitalize ()])
          voltar 'px' dim +;

        voltar Element.measure (elemento, estilo);

      default: retornar getStyle (elemento, estilo);
    }
  }

  função getStyle_IE (elemento, estilo) {
    elemento = $ (elemento);
    style = normalizeStyleName_IE (estilo);

    var value = element.style [estilo];
    if (valor! && element.currentStyle) {
      value = element.currentStyle [estilo];
    }

    if (estilo === 'opacidade') {
      if (! STANDARD_CSS_OPACITY_SUPPORTED)
        voltar getOpacity_IE (elemento);
      valor de retorno mais? parseFloat (valor): 1,0;
    }

    if (valor === 'auto') {
      if ((estilo === 'width' || estilo === 'height') && Element.visible (elemento))
        voltar Element.measure (elemento, estilo) + 'px';
      return null;
    }

    valor de retorno;
  }

  função stripAlphaFromFilter_IE (filtro) {
    retorno (filtro || '') .replace (/ alpha \ ([^ \)] * \) / gi, '');
  }

  função hasLayout_IE (elemento) {
    if (! element.currentStyle ||! element.currentStyle.hasLayout)
      element.style.zoom = 1;
    elemento de retorno;
  }

  var STANDARD_CSS_OPACITY_SUPPORTED = (function () {
    DIV.style.cssText = "opacidade: 0,55";
    regresso /^0.55/.test(DIV.style.opacity);
  }) ();

  setOpacity função (elemento, value) {
    elemento = $ (elemento);
    if (== 1 || valor value === '') value = '';
    else if (<0,00001 valor) value = 0;
    element.style.opacity = value;
    elemento de retorno;
  }

  setOpacity_IE função (elemento, value) {
    Se (STANDARD_CSS_OPACITY_SUPPORTED)
      voltar setOpacity (elemento, value);

    elemento = hasLayout_IE ($ (elemento));
    filtro de var = Element.getStyle (elemento, "filtro"),
     style = element.style;

    if (== 1 || valor value === '') {
      filter = stripAlphaFromFilter_IE (filtro);
      if (filtro) style.filter = filtro;
      outra style.removeAttribute ( "filtro");
      elemento de retorno;
    }

    if (<0,00001 valor) value = 0;

    style.filter = stripAlphaFromFilter_IE (filtro) +
     'Alfa (opacidade =' + (valor * 100) + ')';

    elemento de retorno;
  }


  função getOpacity (elemento) {
    voltar Element.getStyle (elemento, 'opacidade');
  }

  função getOpacity_IE (elemento) {
    Se (STANDARD_CSS_OPACITY_SUPPORTED)
      voltar getOpacity (elemento);

    filtro de var = Element.getStyle (elemento, "filtro");
    if (filter.length === 0) return 1.0;
    .match var match = (filtro || '') (/ alpha \ (opacidade = (*) \) / i.);
    if (jogo && jogo [1]) retornar parseFloat (match [1]) / 100;
    retornar 1,0;
  }


  Object.extend (métodos, {
    setStyle: setStyle,
    getStyle: getStyle,
    setOpacity: setOpacity,
    getOpacity: getOpacity
  });

  Se ( "styleFloat 'em DIV.style) {
    methods.getStyle = getStyle_IE;
    methods.setOpacity = setOpacity_IE;
    methods.getOpacity = getOpacity_IE;
  }

  var UID = 0;

  GLOBAL.Element.Storage = {UID: 1};

  função getUniqueElementID (elemento) {
    if (elemento === janela) return 0;

    if (typeof element._prototypeUID === 'indefinido')
      element._prototypeUID = Element.Storage.UID ++;
    voltar element._prototypeUID;
  }

  função getUniqueElementID_IE (elemento) {
    if (elemento === janela) return 0;
    if (elemento == documento) return 1;
    voltar element.uniqueID;
  }

  var HAS_UNIQUE_ID_PROPERTY = ( 'uniqueID' em DIV);
  Se (HAS_UNIQUE_ID_PROPERTY)
    getUniqueElementID = getUniqueElementID_IE;

  função getStorage (elemento) {
    if ((elemento = $ (elemento))!) return;

    var uid = getUniqueElementID (elemento);

    if (! Element.Storage [uid])
      Element.Storage [uid] = $ H ();

    voltar Element.Storage [uid];
  }

  loja de função (elemento, key, value) {
    if ((elemento = $ (elemento))!) return;
    armazenamento var = getStorage (elemento);
    Se (=== arguments.length 2) {
      storage.update (chave);
    } outro {
      storage.set (chave, valor);
    }
    elemento de retorno;
  }

  função de recuperar (elemento, chave, defaultValue) {
    if ((elemento = $ (elemento))!) return;
    armazenamento var = getStorage (elemento), value = storage.get (chave);

    if (Object.isUndefined (valor)) {
      storage.set (key, defaultValue);
      value = defaultValue;
    }

    valor de retorno;
  }


  Object.extend (métodos, {
    getStorage: getStorage,
    store: loja,
    Recuperar: recupera
  });


  Métodos var = {}, ByTag = Element.Methods.ByTag,
   F = Prototype.BrowserFeatures;

  if (! F.ElementExtensions && ( '__proto__' em DIV)) {
    GLOBAL.HTMLElement = {};
    GLOBAL.HTMLElement.prototype = DIV [ '__ proto__'];
    F.ElementExtensions = true;
  }

  checkElementPrototypeDeficiency função (tagName) {
    if (typeof window.Element === 'indefinido') return false;
    if (HAS_EXTENDED_CREATE_ELEMENT_SYNTAX!) return false;
    var proto = window.Element.prototype;
    if (proto) {
      var id = '_' + (Math.random () + '') .slice (2),
       el = document.createElement (tagName);
      proto [id] = 'x';
      var isBuggy = (el [id] == 'x'!);
      eliminar proto [id];
      el = null;
      voltar isBuggy;
    }

    return false;
  }

  var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY =
   checkElementPrototypeDeficiency ( "objeto");

  funcionar extendElementWith (elemento, métodos) {
    for (var nos métodos) {
      valor var = métodos [de propriedade];
      if (Object.isFunction (valor) &&! (propriedade em elemento))
        elemento [propriedade] = value.methodize ();
    }
  }

  var ESTENDIDA = {};
  função elementIsExtended (elemento) {
    var uid = getUniqueElementID (elemento);
    retorno (uid em ESTENDIDO);
  }

  função de extensão (elemento) {
    se o elemento de retorno (elemento || elementIsExtended (elemento)!);
    Se (element.nodeType! == == Node.ELEMENT_NODE || elemento janela)
      elemento de retorno;

    métodos var = Object.clone (métodos),
     tagName element.tagName.toUpperCase = ();

    if (ByTag [tagName]) Object.extend (métodos, ByTag [tagName]);

    extendElementWith (elemento, métodos);
    ESTENDIDA [getUniqueElementID (elemento)] = true;
    elemento de retorno;
  }

  função extend_IE8 (elemento) {
    se o elemento de retorno (elemento || elementIsExtended (elemento)!);

    var t = element.tagName;
    Se (T && (/^(?:object|applet|embed)$/i.test(t))) {
      extendElementWith (elemento, Element.Methods);
      extendElementWith (elemento, Element.Methods.Simulated);
      extendElementWith (elemento, Element.Methods.ByTag [t.toUpperCase ()]);
    }

    elemento de retorno;
  }

  if (F.SpecificElementExtensions) {
    estender = HTMLOBJECTELEMENT_PROTOTYPE_BUGGY? extend_IE8: Prototype.K;
  }

  funcionar addMethodsToTagName (TagName, métodos) {
    tagName tagName.toUpperCase = ();
    if (! ByTag [tagName]) ByTag [tagName] = {};
    Object.extend (ByTag [tagName], métodos);
  }

  mergeMethods função (de destino, métodos, onlyIfAbsent) {
    if (Object.isUndefined (onlyIfAbsent)) onlyIfAbsent = false;
    for (var nos métodos) {
      valor var = métodos [de propriedade];
      Se continuar (Object.isFunction (valor)!);
      if (! onlyIfAbsent ||! (propriedade em destino))
        destino [propriedade] = value.methodize ();
    }
  }

  função findDOMClass (tagName) {
    var klass;
    var = {trans
      "OPTGROUP": "optgroup", "TEXTAREA": "TextArea", "P": "Parágrafo",
      "FIELDSET": "conjunto de campos", "UL": "UList", "OL": "OList", "DL": "DList",
      "DIR": "Directory", "H1": "Título", "H2": "Título", "H3": "Título",
      "H4": "Título", "H5": "Título", "H6": "Título", "Q": "citações",
      "INS": "Mod", "DEL": "Mod", "A": "Âncora", "IMG": "Imagem", "Legenda":
      "TableCaption", "COL": "TableCol", "COLGROUP": "TableCol", "THEAD":
      "TableSection", "TFOOT": "TableSection", "TBODY": "TableSection", "tr":
      "TableRow", "TH": "TableCell", "TD": "TableCell", "FRAMESET":
      "FrameSet", "IFRAME": "iframe"
    };
    if (trans [tagName]) Klass = 'HTML' + trans [tagName] + 'Element';
    if (janela [klass]) A janela de retorno [klass];
    klass = 'HTML' + tagName + 'Element';
    if (janela [klass]) A janela de retorno [klass];
    klass = 'HTML' + tagName.capitalize () + 'Elemento';
    if (janela [klass]) A janela de retorno [klass];

    var elemento = document.createElement (tagName),
     proto = elemento [ '__ proto__'] || element.constructor.prototype;

    elemento = null;
    voltar proto;
  }

  addMethods função (métodos) {
    if (arguments.length === 0) addFormMethods ();

    Se (=== arguments.length 2) {
      var tagname = métodos;
      Métodos = argumentos [1];
    }

    if (! tagName) {
      Object.extend (Element.Methods, métodos || {});
    } outro {
      Se (Object.isArray (tagName)) {
        for (var i = 0, tag, tag = tagName [i]; i ++)
          addMethodsToTagName (etiqueta, métodos);
      } outro {
        addMethodsToTagName (TagName, métodos);
      }
    }

    var ELEMENT_PROTOTYPE = window.HTMLElement? HTMLElement.prototype:
     Element.prototype;

    if (F.ElementExtensions) {
      mergeMethods (ELEMENT_PROTOTYPE, Element.Methods);
      mergeMethods (ELEMENT_PROTOTYPE, Element.Methods.Simulated, true);
    }

    if (F.SpecificElementExtensions) {
      for (var tag em Element.Methods.ByTag) {
        var klass = findDOMClass (tag);
        if (Object.isUndefined (Klass)) continue;
        mergeMethods (klass.prototype, ByTag [tag]);
      }
    }

    Object.extend (Element, Element.Methods);
    Object.extend (Element, Element.Methods.Simulated);
    eliminar Element.ByTag;
    eliminar Element.Simulated;

    Element.extend.refresh ();

    ELEMENT_CACHE = {};
  }

  Object.extend (GLOBAL.Element, {
    estender: estender,
    addMethods: addMethods
  });

  Se (estender === Prototype.K) {
    GLOBAL.Element.extend.refresh = Prototype.emptyFunction;
  } outro {
    GLOBAL.Element.extend.refresh = function () {
      if (Prototype.BrowserFeatures.ElementExtensions) return;
      Object.extend (Methods, Element.Methods);
      Object.extend (Methods, Element.Methods.Simulated);

      EXTENDED = {};
    };
  }

  addFormMethods function () {
    Object.extend (forma, Form.Methods);
    Object.extend (Form.Element, Form.Element.Methods);
    Object.extend (Element.Methods.ByTag, {
      "forma": Object.clone (Form.Methods),
      "input": Object.clone (Form.Element.Methods),
      "SELECT": Object.clone (Form.Element.Methods),
      "TEXTAREA": Object.clone (Form.Element.Methods),
      "BOTÃO": Object.clone (Form.Element.Methods)
    });
  }

  Element.addMethods (métodos);

  destroyCache_IE function () {
    DIV = null;
    ELEMENT_CACHE = null;
  }

  Se (window.attachEvent)
    window.attachEvent ( 'AoRemoverDaMemória', destroyCache_IE);

})(esta);
(Function () {

  toDecimal função (pctString) {
    var match = pctString.match (/ ^ (\ d +)% $ / i?);
    se nula (jogo!) return;
    retorno (Number (jogo) [1] / 100);
  }

  getRawStyle função (elemento, estilo) {
    elemento = $ (elemento);

    var value = element.style [estilo];
    if (! valor || valor === 'auto') {
      var css = document.defaultView.getComputedStyle (elemento, null);
      value = css? css [estilo]: null;
    }

    if (estilo === 'opacidade') valor de retorno? parseFloat (valor): 1,0;
    valor === 'auto' voltar? nulo: valor;
  }

  função getRawStyle_IE (elemento, estilo) {
    var value = element.style [estilo];
    if (valor! && element.currentStyle) {
      value = element.currentStyle [estilo];
    }
    valor de retorno;
  }

  função getContentWidth (elemento, contexto) {
    var boxWidth = element.offsetWidth;

    var bl = getPixelValue (elemento, 'borderLeftWidth', context) || 0;
    var br = getPixelValue (elemento, 'borderRightWidth', context) || 0;
    var pl = getPixelValue (elemento, 'paddingLeft', context) || 0;
    var pr = getPixelValue (elemento, 'paddingRight', context) || 0;

    voltar boxWidth - bl - br - pl - PR;
  }

  if (! Object.isUndefined (document.documentElement.curr entStyle) &&! Prototype.Browser.Opera) {
    getRawStyle = getRawStyle_IE;
  }


  função getPixelValue (valor, propriedade, contexto) {
    var elemento = null;
    if (Object.isElement (valor)) {
      elemento = value;
      value = getRawStyle (elemento, propriedade);
    }

    if (valor === nula || Object.isUndefined (valor)) {
      return null;
    }

    if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)) {
      voltar window.parseFloat (valor);
    }

    var isPercentage = value.include ( "%"), isViewport = (contexto === document.viewport);

    if (/\d/.test(value) && elemento && element.runtimeStyle &&! (isPercentage && isViewport)) {
      var style = element.style.left, rStyle = element.runtimeStyle.left;
      element.runtimeStyle.left = element.currentStyle.left;
      element.style.left = valor || 0;
      value = element.style.pixelLeft;
      element.style.left = estilo;
      element.runtimeStyle.left = rStyle;

      valor de retorno;
    }

    if (elemento && isPercentage) {
      context = contexto || element.parentNode;
      var decimal = toDecimal (valor), toda = null;

      var isHorizontal = property.include ( "esquerda") || property.include ( "direito") ||
       property.include ( 'width');

      var isVertical = property.include ( 'top') || property.include ( 'bottom') ||
        property.include ( 'altura');

      if (contexto === document.viewport) {
        Se (isHorizontal) {
          Toda = document.viewport.getWidth ();
        } Else if (isVertical) {
          Toda = document.viewport.getHeight ();
        }
      } outro {
        Se (isHorizontal) {
          .measure toda = $ (contexto) ( 'width');
        } Else if (isVertical) {
          Toda = $ (contexto) .measure ( 'altura');
        }
      }

      retorno (toda === null)? 0: toda * decimal;
    }

    return 0;
  }

  toCSSPixels função (número) {
    if (Object.isString (número) && number.endsWith ( 'px'))
      retornar número;
    retornar número + 'px';
  }

  função isDisplayed (elemento) {
    while (elemento && element.parentNode) {
      exibição var = element.getStyle ( 'display');
      if (=== display 'none') {
        return false;
      }
      elemento = $ (element.parentNode);
    }
    return true;
  }

  var hasLayout = Prototype.K;
  Se ( "currentStyle 'em document.documentElement) {
    hasLayout = function (elemento) {
      if (! element.currentStyle.hasLayout) {
        element.style.zoom = 1;
      }
      elemento de retorno;
    };
  }

  cssNameFor função (key) {
    chave se (key.include ( 'border')) = chave + '-width';
    regresso key.camelize ();
  }

  Element.Layout = Class.create (Hash, {
    inicializar: function ($ super, elemento, precompute) {
      $ Super ();
      this.element = $ (elemento);

      Element.Layout.PROPERTIES.each (function (propriedade) {
        this._set (propriedade, null);
      }, esta);

      Se (precompute) {
        this._preComputing = true;
        this._begin ();
        Element.Layout.PROPERTIES.each (this._compute, this);
        this._end ();
        this._preComputing = false;
      }
    },

    _set: function (propriedade, value) {
      voltar Hash.prototype.set.call (este, de propriedade, de valor);
    },

    definida: function (propriedade, value) {
      jogar "Propriedades de Element.Layout são somente leitura.";
    },

    obtém: function ($ super, propriedade) {
      var value = $ super (propriedade);
      valor de retorno === nulo? this._compute (propriedade): valor;
    },

    _begin: function () {
      if (this._isPrepared) () retorno;

      var elemento = this.element;
      if (isDisplayed (elemento)) {
        this._setPrepared (true);
        Retorna;
      }


      var = {originalStyles
        Posição: element.style.position || '',
        width: element.style.width || '',
        visibility: element.style.visibility || '',
        display: element.style.display || ''
      };

      element.store ( 'prototype_original_styles', originalStyles);

      posição var = getRawStyle (elemento, "posição"), width = element.offsetWidth;

      Se (largura === 0 || largura === null) {
        element.style.display = 'block';
        largura = element.offsetWidth;
      }

      var context = (posição === 'fixo')? document.viewport:
       element.parentNode;

      var = {tempStyles
        visibility: 'escondido',
        display: 'block'
      };

      if (posição == 'fixo'!) tempStyles.position = "absoluto";

      element.setStyle (tempStyles);

      var positionedWidth = element.offsetWidth, newWidth;
      Se (largura && (positionedWidth === largura)) {
        newWidth = getContentWidth (elemento, contexto);
      } Else if (posição === || posição "absoluta" === 'fixo') {
        newWidth = getContentWidth (elemento, contexto);
      } outro {
        var parent = element.parentNode, Playout = $ (pai) .getLayout ();

        newWidth = pLayout.get ( 'width') -
         this.get ( 'margin-left') -
         this.get ( 'esquerda border-") -
         this.get ( 'esquerda padding-") -
         this.get ( 'padding-right') -
         this.get ( 'border-right') -
         this.get ( 'margin-right');
      }

      element.setStyle ({width: newWidth + 'px'});

      this._setPrepared (true);
    },

    _END: ​​function () {
      var elemento = this.element;
      var originalStyles = element.retrieve ( 'prototype_original_styles');
      element.store ( 'prototype_original_styles', null);
      element.setStyle (originalStyles);
      this._setPrepared (false);
    },

    _compute: function (propriedade) {
      var cálculos = Element.Layout.COMPUTATIONS;
      if (! (propriedade em cálculos)) {
        jogar "Propriedade não foi encontrado.";
      }

      voltar this._set (propriedade, cálculos [da propriedade] .Call (this, this.element));
    },

    _isPrepared: function () {
      voltar this.element.retrieve ( 'prototype_element_layout_prepared', false);
    },

    _setPrepared: function (bool) {
      voltar this.element.store ( 'prototype_element_layout_prepared', bool);
    },

    toObject: function () {
      var args = $ a (argumentos);
      chaves var = (=== args.length 0)? Element.Layout.PROPERTIES:
       args.join ( '') .Split ( '');
      var obj = {};
      keys.each (function (key) {
        se o retorno (Element.Layout.PROPERTIES.include (key)!);
        var value = this.get (chave);
        if (valor! = null) obj [key] = value;
      }, esta);
      voltar obj;
    },

    toHash: function () {
      var obj = this.toObject.apply (este, argumentos);
      retornar nova Hash (obj);
    },

    toCSS: function () {
      var args = $ a (argumentos);
      chaves var = (=== args.length 0)? Element.Layout.PROPERTIES:
       args.join ( '') .Split ( '');
      var css = {};

      keys.each (function (key) {
        se o retorno (Element.Layout.PROPERTIES.include (key)!);
        if (Element.Layout.COMPOSITE_PROPERTIES.include) chave () return;

        var value = this.get (chave);
        if (valor! = null) css [cssNameFor (key)] = valor + 'px';
      }, esta);
      voltar css;
    },

    inspeccionar: function () {
      retorno "# <Element.Layout>";
    }
  });

  Object.extend (Element.Layout, {
    PROPRIEDADES: $ w ( 'width altura superior esquerdo inferior border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom padding- direito border-left border-right margin-left margin-right box-largura padding-box-height-border-box largura da borda-box-height-margin-caixa de largura de margem-box-height '),

    COMPOSITE_PROPERTIES: $ w ( "-padding-caixa de largura padding-box-height-margin-caixa de largura de margem-box-height-border-box largura da borda-box-height '),

    Computações: {
      'Height': function (elemento) {
        Se this._begin () (this._preComputing!);

        var bHeight = this.get ( 'border-box-height');
        Se (bHeight <= 0) {
          Se this._end () (this._preComputing!);
          return 0;
        }

        var bISP = this.get ( 'border-top'),
         bBottom = this.get ( 'border-bottom');

        var pTop = this.get ( 'padding-top "),
         pBottom = this.get ( 'padding-bottom');

        Se this._end () (this._preComputing!);

        voltar bHeight - bISP - bBottom - pTop - pBottom;
      },

      'Width': function (elemento) {
        Se this._begin () (this._preComputing!);

        var bWidth = this.get ( 'border-width-box');
        Se (bWidth <= 0) {
          Se this._end () (this._preComputing!);
          return 0;
        }

        var bLeft = this.get ( 'esquerda border-"),
         Brilhante = this.get ( 'border-right');

        var pLeft = this.get ( 'esquerda padding-"),
         pRight = this.get ( 'padding-right');

        Se this._end () (this._preComputing!);
        voltar bWidth - bLeft - brilhante - pLeft - pRight;
      },

      'Padding-box-height': function (elemento) {
        var height = this.get ( "altura"),
         pTop = this.get ( 'padding-top "),
         pBottom = this.get ( 'padding-bottom');

        altura de retorno + pTop + pBottom;
      },

      'Padding-box-width': function (elemento) {
        width = var this.get ( 'width'),
         pLeft = this.get ( 'esquerda padding-"),
         pRight = this.get ( 'padding-right');

        largura de retorno + pLeft + pRight;
      },

      'Border-box-height': function (elemento) {
        Se this._begin () (this._preComputing!);
        var height = element.offsetHeight;
        Se this._end () (this._preComputing!);
        altura retornar;
      },

      'Border-box-width': function (elemento) {
        Se this._begin () (this._preComputing!);
        var largura = element.offsetWidth;
        Se this._end () (this._preComputing!);
        regresso largura;
      },

      "Margin-box-height ': function (elemento) {
        var bHeight = this.get ( 'border-box-height'),
         mtop = this.get ( 'margin-top "),
         mBottom = this.get ( 'margin-bottom');

        if (bHeight <= 0) return 0;

        voltar bHeight + mtop + mBottom;
      },

      "Margin-box-width ': function (elemento) {
        var bWidth = this.get ( 'border-width-box "),
         mLeft = this.get ( 'margin-left'),
         mRight = this.get ( 'margin-right');

        if (bWidth <= 0) return 0;

        voltar bWidth + mLeft + mRight;
      },

      'Top': function (elemento) {
        var offset = element.positionedOffset ();
        voltar offset.top;
      },

      'Bottom': function (elemento) {
        compensada var = element.positionedOffset (),
         parent = element.getOffsetParent (),
         pHeight = parent.measure ( 'altura');

        var mHeight = this.get ( 'border-box-height');

        voltar pHeight - mHeight - offset.top;
      },

      "Esquerda": function (elemento) {
        var offset = element.positionedOffset ();
        voltar offset.left;
      },

      "Direito": function (elemento) {
        compensada var = element.positionedOffset (),
         parent = element.getOffsetParent (),
         pWidth = parent.measure ( 'width');

        var mWidth = this.get ( 'border-width-box');

        voltar pWidth - mWidth - offset.left;
      },

      'Padding-top': function (elemento) {
        voltar getPixelValue (elemento, 'paddingTop');
      },

      'Padding-bottom': function (elemento) {
        voltar getPixelValue (elemento, 'paddingBottom');
      },

      'Esquerda padding-": function (elemento) {
        voltar getPixelValue (elemento, 'paddingLeft');
      },

      'Padding-right': function (elemento) {
        voltar getPixelValue (elemento, 'paddingRight');
      },

      'Border-top': function (elemento) {
        voltar getPixelValue (elemento, 'borderTopWidth');
      },

      'Border-bottom': function (elemento) {
        voltar getPixelValue (elemento, 'borderBottomWidth');
      },

      'Esquerda border-": function (elemento) {
        voltar getPixelValue (elemento, 'borderLeftWidth');
      },

      'Border-right': function (elemento) {
        voltar getPixelValue (elemento, 'borderRightWidth');
      },

      "Margin-top ': function (elemento) {
        voltar getPixelValue (elemento, 'marginTop');
      },

      "Margin-bottom ': function (elemento) {
        voltar getPixelValue (elemento, 'marginBottom');
      },

      'Margin-left': function (elemento) {
        voltar getPixelValue (elemento, 'marginLeft');
      },

      "Margin-right ': function (elemento) {
        voltar getPixelValue (elemento, 'marginRight');
      }
    }
  });

  Se ( "getBoundingClientRect 'em document.documentElement) {
    Object.extend (Element.Layout.COMPUTATIONS, {
      "Direito": function (elemento) {
        var parent = hasLayout (element.getOffsetParent ());
        var rect = element.getBoundingClientRect (),
         pRect parent.getBoundingClientRect = ();

        return (pRect.right - rect.right) .round ();
      },

      'Bottom': function (elemento) {
        var parent = hasLayout (element.getOffsetParent ());
        var rect = element.getBoundingClientRect (),
         pRect parent.getBoundingClientRect = ();

        return (pRect.bottom - rect.bottom) .round ();
      }
    });
  }

  Element.Offset = Class.create ({
    inicializar: function (à esquerda, em cima) {
      this.left left.round = ();
      this.top top.round = ();

      este [0] = this.left;
      esta [1] = this.top;
    },

    relativeTo: function (offset) {
      retornar nova Element.Offset (
        this.left - offset.left,
        this.top - offset.top
      );
    },

    inspeccionar: function () {
      retorno "# <Element.Offset esquerda: # {esquerda} top: # {topo}>" interpoladas (this);.
    },

    toString: function () {
      retornar "[# {esquerda}, # {topo}]" interpoladas (this).;
    },

    toArray: function () {
      voltar [this.left, this.top];
    }
  });

  função getLayout (elemento, precompute) {
    retornar nova Element.Layout (elemento, precompute);
  }

  Medida da função (elemento, propriedade) {
    return $ (elemento) .getLayout () get (propriedade).;
  }

  função getHeight (elemento) {
    voltar Element.getDimensions .height (elemento);
  }

  função getWidth (elemento) {
    voltar Element.getDimensions .width (elemento);
  }

  getDimensions função (elemento) {
    elemento = $ (elemento);
    var display = Element.getStyle (elemento, 'display');

    if (visor && exposição! == 'none') {
      retornar {width: element.offsetWidth, altura: element.offsetHeight};
    }

    var style = element.style;
    var = {originalStyles
      visibility: style.visibility,
      Posição: style.position,
      display: style.display
    };

    var = {newStyles
      visibility: 'escondido',
      display: 'block'
    };

    if (originalStyles.position! == 'fixo')
      newStyles.position = "absoluto";

    Element.setStyle (elemento, newStyles);

    dimensões var = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    Element.setStyle (elemento, originalStyles);

    retornar dimensões;
  }

  função getOffsetParent (elemento) {
    elemento = $ (elemento);

    selfOrBody função (elemento) {
      voltar isHtml (elemento)? $ (Document.body): $ (elemento);
    }

    if (isDocument (elemento) || isDetached (elemento) || isBody (elemento) || isHtml (elemento))
      return $ (document.body);

    var isInline = (Element.getStyle (elemento, 'display') === 'inline');
    if (! isInline && element.offsetParent) selfOrBody retorno (element.offsetParent);

    while ((elemento = element.parentNode) && elemento! == document.body) {
      if (Element.getStyle (elemento, "posição")! == 'estática') {
        voltar selfOrBody (elemento);
      }
    }

    return $ (document.body);
  }


  função cumulativeOffset (elemento) {
    elemento = $ (elemento);
    var valueT = 0, valuel = 0;
    Se (element.parentNode) {
      Faz {
        valueT + = element.offsetTop || 0;
        valuel + = element.offsetLeft || 0;
        elemento = element.offsetParent;
      } While (elemento);
    }
    retornar nova Element.Offset (valuel, valueT);
  }

  função positionedOffset (elemento) {
    elemento = $ (elemento);

    layout de var = element.getLayout ();

    var valueT = 0, valuel = 0;
    Faz {
      valueT + = element.offsetTop || 0;
      valuel + = element.offsetLeft || 0;
      elemento = element.offsetParent;
      if (elemento) {
        if (isBody (elemento)) break;
        var p = Element.getStyle (elemento, "posição");
        if (p == 'estática'!) break;
      }
    } While (elemento);

    valuel - = layout.get ( 'margin-left');
    valueT - = layout.get ( 'margin-top');

    retornar nova Element.Offset (valuel, valueT);
  }

  função cumulativeScrollOffset (elemento) {
    var valueT = 0, valuel = 0;
    Faz {
      if (elemento === document.body) {
        var bodyScrollNode = document.documentElement || document.body.parentNode || document.body;
        valueT + =! Object.isUndefined (window.pageYOffset)? window.pageYOffset: bodyScrollNode.scrollTop || 0;
        valuel + =! Object.isUndefined (window.pageXOffset)? window.pageXOffset: bodyScrollNode.scrollLeft || 0;
        pausa;
      } outro {
        valueT + = element.scrollTop || 0;
        valuel + = element.scrollLeft || 0;
        elemento = element.parentNode;
      }
    } While (elemento);
    retornar nova Element.Offset (valuel, valueT);
  }

  função viewportOffset (forElement) {
    var valueT = 0, valuel = 0, = docBody document.body;

    forElement = $ (forElement);
    var elemento = forElement;
    Faz {
      valueT + = element.offsetTop || 0;
      valuel + = element.offsetLeft || 0;
      if (element.offsetParent == docBody &&
        Element.getStyle (elemento, "posição") ==) break 'absoluta';
    } While (elemento = element.offsetParent);

    elemento = forElement;
    Faz {
      if (elemento! = docBody) {
        valueT - = element.scrollTop || 0;
        valuel - = element.scrollLeft || 0;
      }
    } While (elemento = element.parentNode);
    retornar nova Element.Offset (valuel, valueT);
  }

  absolutizar função (elemento) {
    elemento = $ (elemento);

    if (Element.getStyle (elemento, "posição") === "absoluto") {
      elemento de retorno;
    }

    var offsetParent = getOffsetParent (elemento);
    var eOffset = element.viewportOffset (),
     pOffset offsetParent.viewportOffset = ();

    var offset = eOffset.relativeTo (pOffset);
    layout de var = element.getLayout ();

    element.store ( 'prototype_absolutize_original_styles ", {
      Posição: element.getStyle ( "posição"),
      esquerda: element.getStyle ( "esquerda"),
      top: element.getStyle ( 'top'),
      width: element.getStyle ( 'width'),
      height: element.getStyle ( 'height')
    });

    element.setStyle ({
      posição: "absoluto",
      top: offset.top + 'px',
      left: offset.left + 'px',
      width: layout.get ( 'width') + 'px',
      height: layout.get ( 'height') + 'px'
    });

    elemento de retorno;
  }

  relativizar função (elemento) {
    elemento = $ (elemento);
    if (Element.getStyle (elemento, "posição") === "relativa") {
      elemento de retorno;
    }

    var originalStyles =
     element.retrieve ( 'prototype_absolutize_original_styles');

    if (originalStyles) element.setStyle (originalStyles);
    elemento de retorno;
  }


  função scrollTo (elemento) {
    elemento = $ (elemento);
    var pos = Element.cumulativeOffset (elemento);
    window.scrollTo (pos.left, pos.top);
    elemento de retorno;
  }


  função makePositioned (elemento) {
    elemento = $ (elemento);
    posição var = Element.getStyle (elemento, "posição"), styles = {};
    if (posição === ||! posição "estática") {
      styles.position = "relativa";
      Se (Prototype.Browser.Opera) {
        styles.top = 0;
        styles.left = 0;
      }
      Element.setStyle (elemento, estilos);
      Element.store (elemento, 'prototype_made_positioned', true);
    }
    elemento de retorno;
  }

  função undoPositioned (elemento) {
    elemento = $ (elemento);
    armazenamento var = Element.getStorage (elemento),
     madePositioned = storage.get ( 'prototype_made_positioned');

    Se (madePositioned) {
      storage.unset ( 'prototype_made_positioned');
      Element.setStyle (elemento, {
        Posição: '',
        topo: '',
        inferior: '',
        esquerda: '',
        certo: ''
      });
    }
    elemento de retorno;
  }

  função makeClipping (elemento) {
    elemento = $ (elemento);

    armazenamento var = Element.getStorage (elemento),
     madeClipping = storage.get ( 'prototype_made_clipping');

    Se (Object.isUndefined (madeClipping)) {
      var estouro = Element.getStyle (elemento, 'estouro');
      storage.set ( 'prototype_made_clipping', overflow);
      if (estouro! == 'escondido')
        element.style.overflow = "escondido";
    }

    elemento de retorno;
  }

  função undoClipping (elemento) {
    elemento = $ (elemento);
    armazenamento var = Element.getStorage (elemento),
     transbordamento = storage.get ( 'prototype_made_clipping');

    if (! Object.isUndefined (overflow)) {
      storage.unset ( 'prototype_made_clipping');
      element.style.overflow = estouro || '';
    }

    elemento de retorno;
  }

  clonePosition função (elemento, fonte, opções) {
    options = Object.extend ({
      setLeft: true,
      settop: true,
      setWidth: true,
      setHeight: true,
      offsetTop: 0,
      offsetLeft: 0
    }, Opções || {});

    var docEl = document.documentElement;

    source = $ (fonte);
    elemento = $ (elemento);
    var p, delta, layout, estilos = {};

    Se (options.setLeft || options.setTop) {
      p = Element.viewportOffset (fonte);
      delta = [0, 0];
      if (Element.getStyle (elemento, "posição") === "absoluto") {
        var parent = Element.getOffsetParent (elemento);
        if (! pai == document.body) delta = Element.viewportOffset (pai);
      }
    }

    pageScrollXY function () {
      var x = 0, y = 0;
      Se (Object.isNumber (window.pageXOffset)) {
        X = window.pageXOffset;
        y = window.pageYOffset;
      } Else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        X = document.body.scrollLeft;
        y = document.body.scrollTop;
      } Else if (docEl && (docEl.scrollLeft || docEl.scrollTop)) {
        X = docEl.scrollLeft;
        y = docEl.scrollTop;
      }
      retornar {x: x, y: y};
    }

    var pageXY pageScrollXY = ();


    Se (options.setWidth || options.setHeight) {
      layout = Element.getLayout (fonte);
    }

    Se (options.setLeft)
      styles.left = (p [0] + pageXY.x - delta [0] + options.offsetLeft) + 'px';
    Se (options.setTop)
      styles.top = (p [1] + pageXY.y - delta [1] + options.offsetTop) + 'px';

    var currentLayout element.getLayout = ();

    Se (options.setWidth) {
      styles.width = layout.get ( 'width') + 'px';
    }
    Se (options.setHeight) {
      styles.height = layout.get ( 'height') + 'px';
    }

    voltar Element.setStyle (elemento, estilos);
  }


  Se (Prototype.Browser.IE) {
    getOffsetParent = getOffsetParent.wrap (
      function (proceder, elemento) {
        elemento = $ (elemento);

        if (isDocument (elemento) || isDetached (elemento) || isBody (elemento) || isHtml (elemento))
          return $ (document.body);

        posição var = element.getStyle ( "posição");
        if (! posição == 'estática') retornam prosseguir (elemento);

        element.setStyle ({position: "relativa"});
        var value = prosseguir (elemento);
        element.setStyle ({position: Posição});
        valor de retorno;
      }
    );

    positionedOffset = positionedOffset.wrap (function (proceder, elemento) {
      elemento = $ (elemento);
      if (! element.parentNode) retornam nova Element.Offset (0, 0);
      posição var = element.getStyle ( "posição");
      if (! posição == 'estática') retornam prosseguir (elemento);

      var offsetParent element.getOffsetParent = ();
      if (offsetParent && offsetParent.getStyle ( "posição") === 'fixo')
        hasLayout (offsetParent);

      element.setStyle ({position: "relativa"});
      var value = prosseguir (elemento);
      element.setStyle ({position: Posição});
      valor de retorno;
    });
  } Else if (Prototype.Browser.Webkit) {
    cumulativeOffset = function (elemento) {
      elemento = $ (elemento);
      var valueT = 0, valuel = 0;
      Faz {
        valueT + = element.offsetTop || 0;
        valuel + = element.offsetLeft || 0;
        Se (element.offsetParent == document.body) {
          if (Element.getStyle (elemento, "posição") == "absoluto") break;
        }

        elemento = element.offsetParent;
      } While (elemento);

      retornar nova Element.Offset (valuel, valueT);
    };
  }


  Element.addMethods ({
    getLayout: getLayout,
    medida: medida,
    getWidth: getWidth,
    getHeight: getHeight,
    getDimensions: getDimensions,
    getOffsetParent: getOffsetParent,
    cumulativeOffset: cumulativeOffset,
    positionedOffset: positionedOffset,
    cumulativeScrollOffset: cumulativeScrollOffset,
    viewportOffset: viewportOffset,
    absolutizar: absolutizar,
    relativizar: relativizar,
    scrollTo: scrollTo,
    makePositioned: makePositioned,
    undoPositioned: undoPositioned,
    makeClipping: makeClipping,
    undoClipping: undoClipping,
    clonePosition: clonePosition
  });

  função isBody (elemento) {
    voltar element.nodeName.toUpperCase () === "corpo";
  }

  função isHtml (elemento) {
    voltar element.nodeName.toUpperCase () === 'HTML';
  }

  isDocument função (elemento) {
    voltar element.nodeType === Node.DOCUMENT_NODE;
  }

  isDetached função (elemento) {
    elemento de voltar! == document.body &&
     ! Element.descendantOf (elemento, document.body);
  }

  Se ( "getBoundingClientRect 'em document.documentElement) {
    Element.addMethods ({
      viewportOffset: function (elemento) {
        elemento = $ (elemento);
        if (isDetached (elemento)) return new Element.Offset (0, 0);

        var rect = element.getBoundingClientRect (),
         docEl = document.documentElement;
        retornar nova Element.Offset (rect.left - docEl.clientLeft,
         rect.top - docEl.clientTop);
      }
    });
  }


}) ();

(Function () {

  var IS_OLD_OPERA = Prototype.Browser.Opera &&
   (Window.parseFloat (window.opera.version ()) <9,5);
  var ROOT = null;
  getRootElement function () {
    if (ROOT) ROOT retorno;
    ROOT = IS_OLD_OPERA? document.body: document.documentElement;
    voltar ROOT;
  }

  getDimensions function () {
    retorno {width: this.getWidth (), altura: this.getHeight ()};
  }

  funcionar getWidth () {
    regresso getRootElement () clientWidth.;
  }

  getHeight function () {
    regresso getRootElement () clientHeight.;
  }

  getScrollOffsets function () {
    var x = window.pageXOffset || document.documentElement.scrollLeft ||
     document.body.scrollLeft;
    var y = window.pageYOffset || document.documentElement.scrollTop ||
     document.body.scrollTop;

    retornar nova Element.Offset (x, y);
  }

  document.viewport = {
    getDimensions: getDimensions,
    getWidth: getWidth,
    getHeight: getHeight,
    getScrollOffsets: getScrollOffsets
  };

}) ();
janela. $$ = function () {
  expressão var = $ A (argumentos) .join ( ',');
  voltar Prototype.Selector.select (expressão, documento);
};

Prototype.Selector = (function () {

  função select () {
    throw new Error ( "Método" Prototype.Selector.select "deve ser definido. ');
  }

  jogo function () {
    throw new Error ( "Método" Prototype.Selector.match "deve ser definido. ');
  }

  encontrar a função (elementos, expressão, índice) {
    index = índice || 0;
    var match = Prototype.Selector.match, comprimento = elements.length, matchIndex = 0, i;

    for (i = 0; i <comprimento; i ++) {
      if (jogo (elementos [i], expressão) && índice == matchIndex ++) {
        voltar Element.extend (elementos [i]);
      }
    }
  }

  extendElements função (elementos) {
    for (var i = 0, comprimento = elements.length; i <comprimento; i ++) {
      Element.extend (elementos [i]);
    }
    elementos retornar;
  }


  var K = Prototype.K;

  Retorna {
    : SELECT,
    jogo: jogo,
    encontrar: encontrar,
    extendElements: (Element.extend === k)? K: extendElements,
    extendElement: Element.extend
  };
}) ();
Prototype._original_property = window.Sizzle;

; (Function () {
  função fakeDefine (fn) {
    Prototype._actual_sizzle = fn ();
  }
  fakeDefine.amd = true;

  if (typeof definir! == 'indefinido' && define.amd) {
    Prototype._original_define = definir;
    Prototype._actual_sizzle = null;
    window.define = fakeDefine;
  }
}) ();

/ *!
 * Sizzle CSS v1.10.18 Selector Motor
 * http://sizzlejs.com/
 *
 * Direitos autorais 2013 jQuery Foundation, Inc. e outros contribuidores
 * Lançado sob a licença MIT
 * http://jquery.org/license
 *
 * Data: 2014/02/05
 * /
(Function (janela) {

var i,
	apoio,
	expr,
	getText,
	isXML,
	compilar,
	selecionar,
	outermostContext,
	sortInput,
	hasDuplicate,

	setDocument,
	documento,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	fósforos,
	contém,

	expando = "chiar" + - (new Date ()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache (),
	tokenCache = createCache (),
	compilerCache = createCache (),
	sortOrder = function (a, b) {
		se (a === b) {
			hasDuplicate = true;
		}
		return 0;
	},

	strundefined = typeof indefinido,
	MAX_NEGATIVE = 1 << 31,

	hasOwn = ({}). hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	impulso = arr.push,
	fatia = arr.slice,
	indexOf = arr.indexOf || function (elem) {
		var i = 0,
			len = this.length;
		for (; i <len; i ++) {
			if (este [i] === elem) {
				voltar i;
			}
		}
		retornar -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


	espaços em branco = "[\\ x20 \\ t \\ r \\ n \\ f]",
	characterEncoding = "(?:. \\\\ | [\\ w-] | [^ \\ x00 - \\ xa0]) +",

	identificador = characterEncoding.replace ( "W", "W #"),

	atributos = "\\ [" + espaços em branco + "* (" + characterEncoding + ")" + espaços em branco +
		"* (: ([* ^ $ | ~!] =)?" + Espaços em branco + "* (: ([ '\?"]) ((:?. \\\\ | [^ \\\\] ) *) \\ 3 |? ( "+ identificador +") |) |) "+ espaços em branco +" * \\] ",

	pseudos = ":(" + characterEncoding + ": [) (() (\\ ((( '\]?":?.? \\\\ | [^ \\\\]) *) \\ 3 | . ((:?. \\\\ | [^ \\\\ () [\\]] | "+ attributes.replace (3, 8) +") *) | *) \\) |) ",

	rtrim = new RegExp ( "^" + espaços em branco + "+ | ((:? ^ | [^ \\\\]) (: \\\\) *)?". + espaços em branco + "+ $", "g "),

	rcomma = new RegExp ( "^" + espaços em branco + "*," + espaços em branco + "*"),
	rcombinators = new RegExp ( "^" + espaços em branco + "* ([> + ~] |" + espaços em branco + ")" + espaços em branco + "*"),

	rattributeQuotes = new RegExp ( "=" + espaços em branco + "* ([^ \\] '\"] *?) "+ espaços em branco +" * \\] "," g "),

	rpseudo = new RegExp (pseudos),
	ridentifier = new RegExp ( "^" + identificador + "$"),

	matchExpr = {
		"ID": new RegExp ( "^ # (" + characterEncoding + ")"),
		"Classe": new RegExp ( "^ \\ (." + CharacterEncoding + ")"),
		"TAG": new RegExp ( "^ (" + characterEncoding.replace ( "w", "w *") + ")"),
		"ATTR": new RegExp ( "^" + atributos),
		"Pseudo": new RegExp ( "^" + pseudos),
		"Criança": new RegExp ( "^ :( única | primeira | última | enésima | nth-last) - (criança | of-type) (?: \\ (" + Espaços em branco +
			"* (Mesmo | estranho | (([+ -] |) (\\ d *) n |)" + espaços em branco + "* (?: ([+ -] |)" + Espaços em branco +
			"* (\\ D +) |))" + espaços em branco + "* \\) |)", "i"),
		"Bool": new RegExp ( "^ (?:" booleans + + ") $", "i"),
		"NeedsContext": new RegExp ( "^" + espaços em branco + "* [> + ~] |: (mesmo | estranho | eq | gt | lt | enésima | primeira | última) (?: \\ (" +
			espaços em branco + "* (? (: - \\ d) \\ d *)" + espaços em branco + "? * \\) |) (= [^ -] | $)", "i")
	},

	rinputs = / ^ (?: entrada | select | textarea | botão) $ / i,
	rheader = / ^ h \ d $ / i,

	rnative = / ^ [^ {] + \ {\ s * \ [nativa \ w /,

	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = / [+ ~] /,
	rescape = / '| \\ / g,

	runescape = new RegExp ( "\\\\ ([\\ da-f] {1,6}" + espaços em branco + "|? (" + espaços em branco + ") |.)", "ig"),
	funescape = function (_, escapou escapedWhitespace) {
		var Alto = "0 x" + escapou - 0x10000;
		alto retorno! == alta || escapedWhitespace?
			escapado:
			alta <0?
				String.fromCharCode (alta + 0x10000):
				String.fromCharCode (alta >> 10 | 0xD800, alta & 0x3FF | 0xDC00);
	};

experimentar {
	push.apply (
		(Arr = slice.call (preferredDoc.childNodes)),
		preferredDoc.childNodes
	);
	arr [preferredDoc.childNodes.length] .nodeType;
} Catch (e) {
	empurrar = {se por: arr.Length?

		função (-alvo, els) {
			push_native.apply (-alvo, slice.call (els));
		}:

		função (-alvo, els) {
			var J = target.length,
				i = 0;
			while ((de destino [j ++] = els [i ++])) {}
			target.length J = - 1;
		}
	};
}

função Sizzle (selector, o contexto, os resultados, semente) {
	var jogo, elem, m, nodeType,
		i, grupos, velho, nid, newcontext, newSelector;

	if ((contexto context.ownerDocument || contexto:?! preferredDoc) == documento) {
		setDocument (contexto);
	}

	context = contexto || documento;
	resultados = resultados || [];

	if (! selector || selector typeof! == "string") {
		retornar resultados;
	}

	if ((nodeType = context.nodeType)! == 1 && nodeType! == 9) {
		Retorna [];
	}

	if (semente documentIsHTML &&!) {

		if ((match = rquickExpr.exec (selector))) {
			if ((m = jogo [1])) {
				Se (=== nodeType 9) {
					elem = context.getElementById (m);
					if (elem && elem.parentNode) {
						Se (elem.id === m) {
							results.push (elem);
							retornar resultados;
						}
					} outro {
						retornar resultados;
					}
				} outro {
					if (context.ownerDocument && (elem = context.ownerDocument.getElementById (m)) &&
						contém (contexto, elem) && elem.id === m) {
						results.push (elem);
						retornar resultados;
					}
				}

			} Else if (jogo [2]) {
				push.apply (resultados, context.getElementsByTagName (selector));
				retornar resultados;

			} Else if ((m = jogo [3]) && support.getElementsByClassName && context.getElementsByClassName) {
				push.apply (resultados, context.getElementsByClassName (m));
				retornar resultados;
			}
		}

		if (support.qsa && (! rbuggyQSA ||! rbuggyQSA.test (selector))) {
			nid = velhos = expando;
			newcontext = contexto;
			newSelector = nodeType === 9 && selector;

			if (nodeType === 1 && context.nodeName.toLowerCase ()! == "objeto") {
				grupos = tokenize (selector);

				if ((idade = context.getAttribute ( "id"))) {
					nid = old.replace (rescape, "\\ $ &");
				} outro {
					context.setAttribute ( "id", nid);
				}
				nid = "[id = '" + nid + "']";

				i = groups.length;
				enquanto eu-- ) {
					Grupos [i] = nid + toSelector (grupos [i]);
				}
				newcontext = rsibling.test (selector) && TestContext (context.parentNode) || contexto;
				newSelector = groups.join ( ",");
			}

			Se (newSelector) {
				experimentar {
					push.apply (resultados,
						newContext.querySelectorAll (newSelector)
					);
					retornar resultados;
				} Catch (qsaError) {
				} Finally {
					eu dobrei ) {
						context.removeAttribute ( "id");
					}
				}
			}
		}
	}

	voltar select (selector.replace (rtrim, "$ 1"), o contexto, os resultados, as sementes);
}

/ **
 * Criar caches de valores-chave de tamanho limitado
 * @returns {Function (String, Object)} Retorna os dados objeto depois armazená-lo em si mesmo com
 * Nome da propriedade string (sufixo-espaço) e (se o cache é maior do que Expr.cacheLength)
 * Excluindo a entrada mais antiga
 * /
createCache function () {
	chaves var = [];

	cache de função (chave, valor) {
		if (keys.push (tecla + "")> Expr.cacheLength) {
			excluir o cache [keys.shift ()];
		}
		retorno (cache [key + ""] = valor);
	}
	voltar cache;
}

/ **
 * Marque uma função para uso especial por Sizzle
 * @ Param {} Função fn A função para marcar
 * /
função markFunction (fn) {
	fn [expando] = true;
	voltar fn;
}

/ **
 * Teste de Suporte usando um elemento
 * @ Param {} Função fn Passou o div criado e espera um resultado boolean
 * /
assert função (fn) {
	var div = document.createElement ( "div");

	experimentar {
		voltar !! fn (div);
	} Catch (e) {
		return false;
	} Finally {
		Se (div.parentNode) {
			div.parentNode.removeChild (div);
		}
		div = null;
	}
}

/ **
 * Adiciona a mesma rotina de tratamento para todos os attrs especificados
 * @ Param {String} Attrs lista separada por tubulação de atributos
 * @ Param {} Função manipulador O método que será aplicado
 * /
addHandle função (attrs, manipulador) {
	var arr = attrs.split ( "|"),
		i = attrs.length;

	enquanto eu-- ) {
		Expr.attrHandle [arr [i]] = manipulador;
	}
}

/ **
 * Ordem do documento Cheques de dois irmãos
 * @ Param {} Elemento um
 * @ Param {} b Elemento
 * @returns {Número} Retorna inferior a 0 se a precede b, maior que 0 se um segue b
 * /
função siblingCheck (a, b) {
	var cur = b && um,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			(~ B.sourceIndex || MAX_NEGATIVE) -
			(~ A.sourceIndex || MAX_NEGATIVE);

	if (diff) {
		voltar diff;
	}

	if (cur) {
		while ((cur = cur.nextSibling)) {
			if (cur === b) {
				retornar -1;
			}
		}
	}

	devolver um? 1: 1;
}

/ **
 * Retorna uma função para usar em pseudos para os tipos de entrada
 * @ Param {String} tipo
 * /
função createInputPseudo (tipo) {
	função de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		Nome retornar === "input" && elem.type === tipo;
	};
}

/ **
 * Retorna uma função para usar em pseudos para botões
 * @ Param {String} tipo
 * /
função createButtonPseudo (tipo) {
	função de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		retorno (nome === "input" || nome === "botão") && elem.type === tipo;
	};
}

/ **
 * Retorna uma função para usar em pseudos para posicionais
 * @ Param {} Função fn
 * /
função createPositionalPseudo (fn) {
	voltar markFunction (function (argumento) {
		argumento = + argumento;
		voltar markFunction (function (sementes, fósforos) {
			var j,
				matchIndexes = fn ([], seed.length, argumento),
				i = matchIndexes.length;

			enquanto eu-- ) {
				if (semente [(j = matchIndexes [i])]) {
					semente [j] = (partidas [j] = semente [j]!);
				}
			}
		});
	});
}

/ **
 * Verifica um nó para validade como um contexto Sizzle
 * @ Param {Elemento | Object =} contexto
 * @returns {Elemento | Objeto | booleana} O nó de entrada se for aceitável, caso contrário, um valor Falsas
 * /
função TestContext (contexto) {
	voltar contexto && typeof context.getElementsByTagName == strundefined && contexto!;
}

apoio = Sizzle.support = {};

/ **
 * Detecta nós XML
 * @ Param {Elemento | Object} Elem um elemento ou um documento
 * @returns {Boolean} Verdadeiro elem sse é um nó XML não-HTML
 * /
isXML = Sizzle.isXML = function (elem) {
	var documentElement = elem && (elem.ownerDocument || elem) .documentElement;
	voltar documentElement? ! DocumentElement.nodeName == "HTML": false;
};

/ **
 * Define variáveis ​​relacionadas a documentos, uma vez com base no documento atual
 * @ Param {Elemento | Object} [doc] Um elemento ou objeto de documento a ser usado para definir o documento
 * @returns {Object} Retorna o documento atual
 * /
setDocument = Sizzle.setDocument = function (nó) {
	var hasCompare,
		doc = nó? node.ownerDocument || node: preferredDoc,
		parent = doc.defaultView;

	if (doc === documento || doc.nodeType! == 9 ||! doc.documentElement) {
		documento de devolução;
	}

	document = doc;
	docElem = doc.documentElement;

	documentIsHTML = isXML (doc!);

	if (pai && pai! == parent.top) {
		Se (parent.addEventListener) {
			parent.addEventListener ( "descarregar", function () {
				setDocument ();
			}, False);
		} Else if (parent.attachEvent) {
			parent.attachEvent ( "onunload", function () {
				setDocument ();
			});
		}
	}

	/* Atributos
	-------------------------------------------------- -------------------- * /

	support.attributes = assert (function (div) {
		div.className = "i";
		voltar div.getAttribute ( "className!");
	});

	/ * GetElement (s) por *
	-------------------------------------------------- -------------------- * /

	support.getElementsByTagName = assert (function (div) {
		div.appendChild (doc.createComment ( ""));
		regresso div.getElementsByTagName ( "*") de comprimento!.;
	});

	support.getElementsByClassName = rnative.test (doc.getElementsByClassName) && afirmar (function (div) {
		div.innerHTML = "<div class = 'a'> </ div> <div class =" a i "> </ div>";

		div.firstChild.className = "i";
		regresso div.getElementsByClassName ( "i") de comprimento ===. 2;
	});

	support.getById = assert (function (div) {
		docElem.appendChild (div) .id = expando;
		voltar! doc.getElementsByName || ! Doc.getElementsByName (expando) .length;
	});

	Se (support.getById) {
		Expr.find [ "ID"] = function (id, contexto) {
			if (typeof context.getElementById! == strundefined && documentIsHTML) {
				var m = context.getElementById (id);
				voltar m && m.parentNode? [M]: [];
			}
		};
		Expr.filter [ "ID"] = function (id) {
			var attrId = id.replace (runescape, funescape);
			função de retorno (elem) {
				voltar elem.getAttribute ( "id") === attrId;
			};
		};
	} outro {
		eliminar Expr.find [ "ID"];

		Expr.filter [ "ID"] = function (id) {
			var attrId = id.replace (runescape, funescape);
			função de retorno (elem) {
				nó var = typeof elem.getAttributeNode == strundefined && elem.getAttributeNode ( "id"!);
				voltar nó && node.value === attrId;
			};
		};
	}

	Expr.find [ "TAG"] = support.getElementsByTagName?
		function (tag, contexto) {
			if (typeof context.getElementsByTagName! == strundefined) {
				voltar context.getElementsByTagName (tag);
			}
		}:
		function (tag, contexto) {
			var elem,
				TMP = [],
				i = 0,
				resultados = context.getElementsByTagName (tag);

			Se (tag === "*") {
				while ((elem = resultados [i ++])) {
					Se (elem.nodeType === 1) {
						tmp.push (elem);
					}
				}

				voltar tmp;
			}
			retornar resultados;
		};

	Expr.find [ "classe"] = support.getElementsByClassName && função (className, context) {
		if (typeof context.getElementsByClassName! == strundefined && documentIsHTML) {
			voltar context.getElementsByClassName (className);
		}
	};

	/ * QSA / matchesSelector
	-------------------------------------------------- -------------------- * /


	rbuggyMatches = [];

	rbuggyQSA = [];

	if ((support.qsa = rnative.test (doc.querySelectorAll))) {
		afirmar (function (div) {
			div.innerHTML = "<select t = ''> <opção selecionada = ''> </ option> </ select>";

			Se (div.querySelectorAll ( "[T ^ = '']"). de comprimento) {
				rbuggyQSA.push ( "[* ^ $] =" + espaços em branco + "* (?: '' | \" \ ")");
			}

			if (! div.querySelectorAll ( "[seleccionado]"). de comprimento) {
				rbuggyQSA.push ( "\\ [" + espaços em branco + "* (?: valor |" + booleans + ")");
			}

			if (div.querySelectorAll (! ": checked") de comprimento.) {
				rbuggyQSA.push ( ": checked");
			}
		});

		afirmar (function (div) {
			input var = doc.createElement ( "input");
			input.setAttribute ( "tipo", "escondido");
			div.appendChild (entrada) .setAttribute ( "name", "D");

			if (div.querySelectorAll ( "[name = d]"). length) {
				rbuggyQSA.push ( "nome" + espaços em branco + "? * [* ^ $ | ~] =");
			}

			if (div.querySelectorAll (! ": habilitado") de comprimento.) {
				rbuggyQSA.push ( ": habilitado", ": pessoas com deficiência");
			}

			div.querySelectorAll ( "* ,: X");
			rbuggyQSA.push ( ", *:".);
		});
	}

	if ((support.matchesSelector = rnative.test ((corresponde = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector)))) {

		afirmar (function (div) {
			support.disconnectedMatch = matches.call (div, "div");

			matches.call (div, "[s = ''!]: x");
			rbuggyMatches.push (, pseudos "=!");
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp (rbuggyQSA.join ( "|"));
	rbuggyMatches = rbuggyMatches.length && new RegExp (rbuggyMatches.join ( "|"));

	/ * Contém
	-------------------------------------------------- -------------------- * /
	hasCompare = rnative.test (docElem.compareDocumentPosition);

	contém = hasCompare || rnative.test (docElem.contains)?
		função (a, b) {
			var adown = a.nodeType === 9? a.documentElement: um,
				BUP = b && b.parentNode;
			retornar um bup === || !! (BUP && === bup.nodeType 1 && (
				adown.contains?
					adown.contains (BUP):
					a.compareDocumentPosition && a.compareDocumentPosition (BUP) e 16
			));
		}:
		função (a, b) {
			se (b) {
				while ((b = b.parentNode)) {
					Se (b === a) {
						return true;
					}
				}
			}
			return false;
		};

	/ * Sorting
	-------------------------------------------------- -------------------- * /

	sortOrder = hasCompare?
	função (a, b) {

		se (a === b) {
			hasDuplicate = true;
			return 0;
		}

		var compare = a.compareDocumentPosition - b.compareDocumentPosition!;
		if (compare) {
			voltar comparar;
		}

		comparar = (a.ownerDocument || a) === (b.ownerDocument || b)?
			a.compareDocumentPosition (b):

			1;

		if (compare & 1 ||
			(! Support.sortDetached && b.compareDocumentPosition (a) === comparar)) {

			se (a doc === || a.ownerDocument === preferredDoc && contém (preferredDoc, a)) {
				retornar -1;
			}
			if (b === doc || b.ownerDocument === preferredDoc && contém (preferredDoc, b)) {
				retornar 1;
			}

			voltar sortInput?
				(IndexOf.call (sortInput, a) - indexOf.call (sortInput, b)):
				0;
		}

		voltar comparar e 4? -1: 1;
	}:
	função (a, b) {
		se (a === b) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			AUP = a.parentNode,
			BUP = b.parentNode,
			AP = [A],
			pb = [b];

		if (! AUP ||! bup) {
			retornar um doc ===? -1:
				b === doc? 1:
				AUP? -1:
				BUP? 1:
				sortInput?
				(IndexOf.call (sortInput, a) - indexOf.call (sortInput, b)):
				0;

		} Else if (AUP === bup) {
			regresso siblingCheck (a, b);
		}

		cur = a;
		while ((cur = cur.parentNode)) {
			ap.unshift (act);
		}
		cur = b;
		while ((cur = cur.parentNode)) {
			bp.unshift (act);
		}

		while (ap [i] === bp [i]) {
			i ++;
		}

		voltar i?
			siblingCheck (ap [i], bp [i]):

			ap [i] === preferredDoc? -1:
			bp [i] === preferredDoc? 1:
			0;
	};

	voltar doc;
};

Sizzle.matches = function (expr, elementos) {
	retorno Sizzle (expr, nulos, NULL, elementos);
};

Sizzle.matchesSelector = function (elem, expr) {
	if ((elem.ownerDocument || elem)! == documento) {
		setDocument (elem);
	}

	expr = expr.replace (rattributeQuotes, "= '$ 1']");

	if (support.matchesSelector && && documentIsHTML
		(! RbuggyMatches ||! RbuggyMatches.test (expr)) &&
		(! RbuggyQSA ||! RbuggyQSA.test (expr))) {

		experimentar {
			var ret = matches.call (elem, expr);

			if (ret || support.disconnectedMatch ||
					elem.document && elem.document.nodeType! == 11) {
				voltar ret;
			}
		} Catch (e) {}
	}

	retorno Sizzle (expr, documento, null, [elem]) .length> 0;
};

Sizzle.contains = function (contexto, elem) {
	if ((context.ownerDocument || contexto)! == documento) {
		setDocument (contexto);
	}
	retorno contém (contexto, elem);
};

Sizzle.attr = function (elem, nome) {
	if ((elem.ownerDocument || elem)! == documento) {
		setDocument (elem);
	}

	var fn = Expr.attrHandle [name.toLowerCase ()],
		val = fn && hasOwn.call (Expr.attrHandle, name.toLowerCase ())?
			fn (elem, nome, documentIsHTML!):
			Indefinido;

	retorno val! == indefinido?
		val:
		support.attributes || ! DocumentIsHTML?
			elem.getAttribute (nome):
			(Val = elem.getAttributeNode (nome)) && val.specified?
				val.value:
				nulo;
};

Sizzle.error = function (msg) {
	throw new Error ( "Erro de sintaxe, a expressão não reconhecido:" + msg);
};

/ **
 * Classificação de documentos e remoção de duplicatas
 * @ Param {} ArrayLike resultados
 * /
Sizzle.uniqueSort = function (resultados) {
	var elem,
		duplicados = [],
		j = 0,
		i = 0;

	hasDuplicate = support.detectDuplicates!;
	sortInput = support.sortStable && results.slice (0)!;
	results.sort (sortOrder);

	Se (hasDuplicate) {
		while ((elem = resultados [i ++])) {
			if (elem === resultados [i]) {
				J = duplicates.push (I);
			}
		}
		while (j--) {
			results.splice (duplicatas [j], 1);
		}
	}

	sortInput = null;

	retornar resultados;
};

/ **
 * A função de utilitário para recuperar o valor de texto de uma matriz de nós DOM
 * @ Param {array | Elemento} elem
 * /
getText = Sizzle.getText = function (elem) {
	nó var,
		RET = "",
		i = 0,
		nodeType = elem.nodeType;

	if (! nodeType) {
		while ((nó = elem [i ++])) {
			ret = + getText (nó);
		}
	} Else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
		if (typeof elem.textContent === "string") {
			voltar elem.textContent;
		} outro {
			for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				ret = + getText (elem);
			}
		}
	} Else if (nodeType === 3 || nodeType === 4) {
		voltar elem.nodeValue;
	}

	voltar ret;
};

Expr = Sizzle.selectors = {

	cacheLength: 50,

	createPseudo: markFunction,

	jogo: matchExpr,

	attrHandle: {},

	encontrar: {},

	relativo: {
		">": {Dir: "parentNode", em primeiro lugar: true},
		"": {Dir: "parentNode"},
		"+": {Dir: "previousSibling", em primeiro lugar: true},
		"~": {Dir: "previousSibling"}
	},

	Pré-filtro: {
		"ATTR": function (jogo) {
			match [1] = jogo [1] .replace (runescape, funescape);

			jogo [3] = (jogo [4] || jogo [5] || "") .replace (runescape, funescape);

			if (jogo [2] === "~ =") {
				jogo [3] = "" + jogo [3] + "";
			}

			regresso match.slice (0, 4);
		},

		"Criança": function (jogo) {
			/ * Jogos de matchExpr [ "criança"]
				1 Tipo (somente | enésima | ...)
				2 o (criança | of-tipo)
				3 argumento (mesmo | estranho | \ d * | \ d * n ([+ -] \ d +) |? ...)
				4 xn-componente do argumento xn + y ([+ -] \ d n * |?)
				5 sinal de xn-componente
				6 x de XN-componente
				7 sinal de componente y
				8 y de y-componente
			* /
			match [1] = jogo [1] .toLowerCase ();

			if (match [1] .slice (0, 3) === "enésima") {
				if (! jogo [3]) {
					Sizzle.error (match [0]);
				}

				? Jogo [4] = + (jogo [4] corresponde [5] + (match [6] || 1): 2 * (match [3] === "mesmo" || jogo [3] === " ímpar" ) );
				match [5] = + ((match [7] + jogo [8]) || jogo [3] === "estranho");

			} Else if (jogo [3]) {
				Sizzle.error (match [0]);
			}

			retornar jogo;
		},

		"Pseudo": function (jogo) {
			var excesso,
				! Unquoted = jogo [5] && jogo [2];

			if (matchExpr [ "criança"]. teste (match [0])) {
				return null;
			}

			if (jogo [3] && corresponder [4]! == undefined) {
				match [2] = jogo [4];

			} Else if (unquoted && rpseudo.test (sem aspas) &&
				(Excesso = tokenize (sem aspas, true)) &&
				(Excesso unquoted.indexOf = ( ")", unquoted.length - excesso) - unquoted.length)) {

				match [0] = jogo [0] .slice (0, excesso);
				match [2] = unquoted.slice (0, excesso);
			}

			regresso match.slice (0, 3);
		}
	},

	filtrar: {

		"TAG": function (nodeNameSelector) {
			var nodeName = nodeNameSelector.replace (runescape, funescape) .toLowerCase ();
			voltar nodeNameSelector === "*"?
				function () {return true; }:
				function (elem) {
					voltar elem.nodeName && elem.nodeName.toLowerCase () === nodeName;
				};
		},

		"Classe": function (className) {
			var pattern = classCache [className + ""];

			voltar padrão ||
				(Padrão = new RegExp ( "(^ |" + espaços em branco + ")" + className + "(" + espaços em branco + "| $)")) &&
				classCache (className, function (elem) {
					voltar pattern.test (typeof elem.className === "string" && elem.className || typeof elem.getAttribute == strundefined && elem.getAttribute ( "class") || ""!);
				});
		},

		"ATTR": function (nome, operador, verificação) {
			função de retorno (elem) {
				var resultado = Sizzle.attr (elem, nome);

				if (resultado == null) {
					operador de retornar === "=!";
				}
				if (! operador) {
					return true;
				}

				resultado + = "";

				voltar operador === "="? resultado === verificar:
					operador === "! ="? resultar == confira!:
					operador === "^ ="? verifique && result.indexOf (cheque) === 0:
					operador === "* ="? verifique && result.indexOf (cheque)> -1:
					operador === "$ ="? verifique && result.slice (-check.length) === verificar:
					operador === "~ ="? ( "" + Resultar + "") .indexOf (cheque)> -1:
					operador === "| ="? resultado === verificar || result.slice (0, check.length + 1) === verifique + "-":
					falso;
			};
		},

		"Criança": function (tipo, o que, argumento, em primeiro lugar, último) {
			var simples = type.slice (0, 3)! == "enésimo",
				forward = type.slice (-4)! == "passado",
				OfType = o que === "do tipo";

			retornar primeira === 1 && última === 0?

				function (elem) {
					voltar !! elem.parentNode;
				}:

				function (elem, contexto, xml) {
					cache de var, outerCache, nó, diff, nodeIndex, começar,
						dir = simples! == para a frente? "NextSibling": "previousSibling",
						parent = elem.parentNode,
						name = OfType && elem.nodeName.toLowerCase (),
						useCache = xml && OfType!;

					Se (progenitor) {

						if (simples) {
							while (dir) {
								nó = elem;
								while ((nó = nó [dir])) {
									if (OfType node.nodeName.toLowerCase () === nome:? node.nodeType === 1) {
										return false;
									}
								}
								start = dir = tipo === "apenas" && começar && "nextSibling!";
							}
							return true;
						}

						start = [para a frente? parent.firstChild: parent.lastChild];

						if (forward && useCache) {
							outerCache = parent [expando] || (Pai [expando] = {});
							cache = outerCache [tipo] || [];
							nodeIndex = Cache [0] === dirruns && cache de [1];
							diff = Cache [0] === dirruns && cache de [2];
							nó = nodeIndex && parent.childNodes [nodeIndex];

							while ((nó = ++ nodeIndex && nó && nó [dir] ||

								(Diff = nodeIndex = 0) || start.pop ())) {

								if (node.nodeType === 1 && ++ diff && nó === elem) {
									outerCache [tipo] = [dirruns, nodeIndex, diff];
									pausa;
								}
							}

						} Else if (useCache && (cache = (elem [expando] || (elem [expando] = {})) [tipo]) && cache de [0] === dirruns) {
							diff = Cache [1];

						} outro {
							while ((nó = ++ nodeIndex && nó && nó [dir] ||
								(Diff = nodeIndex = 0) || start.pop ())) {

								if ((OfType node.nodeName.toLowerCase () === nome:? node.nodeType === 1) && ++ diff) {
									Se (useCache) {
										(Nó [expando] || (nó [expando] = {})) [tipo] = [dirruns, diff];
									}

									if (nó === elem) {
										pausa;
									}
								}
							}
						}

						diff - = último;
						voltar diff === primeira || (Diff% no primeiro === 0 && diff / first> = 0);
					}
				};
		},

		"Pseudo": function (pseudo, argumento) {
			args var,
				fn = Expr.pseudos [pseudo] || Expr.setFilters [pseudo.toLowerCase ()] ||
					Sizzle.error ( "pseudo não suportado:" + pseudo);

			if (fn [expando]) {
				voltar fn (argumento);
			}

			Se (fn.length> 1) {
				args = [pseudo, pseudo, "", argumento];
				regresso Expr.setFilters.hasOwnProperty (pseudo.toLowerCase ())?
					markFunction (function (sementes, fósforos) {
						var IDX,
							combinado = fn (semente, argumento),
							i = matched.length;
						enquanto eu-- ) {
							idx = indexOf.call (semente, combinado [i]);
							semente [idx] = (partidas [idx] = combinado [i])!;
						}
					}):
					function (elem) {
						return fn (elem, 0, args);
					};
			}

			voltar fn;
		}
	},

	pseudos: {
		"Não": markFunction (function (selector) {
			var de entrada = [],
				Resultados = [],
				matcher = compilar (selector.replace (rtrim, "$ 1"));

			troca de correspondência [expando]?
				markFunction (function (sementes, fósforos, contexto, xml) {
					var elem,
						inigualável = matcher (sementes, null, xml, []),
						i = seed.length;

					enquanto eu-- ) {
						if ((elem = inigualável [i])) {
							! Semente [i] = (partidas [i] = elem);
						}
					}
				}):
				function (elem, contexto, xml) {
					input [0] = elem;
					Matcher (entrada, nulos, XML, resultados);
					voltar results.pop (!);
				};
		}),

		"Tem": markFunction (function (selector) {
			função de retorno (elem) {
				retorno Sizzle (selector, elem) .length> 0;
			};
		}),

		"Contém": markFunction (function (texto) {
			função de retorno (elem) {
				return (elem.textContent || elem.innerText || getText (elem)) .indexOf (texto)> -1;
			};
		}),

		"Lang": markFunction (function (lang) {
			if (! ridentifier.test (lang || "")) {
				Sizzle.error ( "lang não suportado:" + lang);
			}
			lang = lang.replace (runescape, funescape) .toLowerCase ();
			função de retorno (elem) {
				var elemLang;
				Faz {
					if ((elemLang = documentIsHTML?
						elem.lang:
						elem.getAttribute ( "xml: lang") || elem.getAttribute ( "Lang"))) {

						elemLang elemLang.toLowerCase = ();
						voltar elemLang === lang || elemLang.indexOf (lang + "-") === 0;
					}
				} While ((elem = elem.parentNode) && elem.nodeType === 1);
				return false;
			};
		}),

		"Alvo": function (elem) {
			var de hash = window.location && window.location.hash;
			retornar de hash && hash.slice (1) === elem.id;
		},

		"Root": function (elem) {
			voltar elem === docElem;
		},

		"Focus": function (elem) {
			voltar elem === document.activeElement && (! document.hasFocus || document.hasFocus ()) && !! (elem.type || elem.href || ~ elem.tabIndex);
		},

		"Habilitado": function (elem) {
			retorno elem.disabled === false;
		},

		"Desativado": function (elem) {
			retorno elem.disabled === true;
		},

		"Marcada": function (elem) {
			var nodeName elem.nodeName.toLowerCase = ();
			retorno (nodeName === "input" && !! elem.checked) || (NodeName === "opção" && !! elem.selected);
		},

		"Selecionado": function (elem) {
			Se (elem.parentNode) {
				elem.parentNode.selectedIndex;
			}

			retorno elem.selected === true;
		},

		"Vazio": function (elem) {
			for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				Se (elem.nodeType <6) {
					return false;
				}
			}
			return true;
		},

		"Pai": function (elem) {
			voltar Expr.pseudos [ "vazio"] (elem!);
		},

		"Header": function (elem) {
			regresso rheader.test (elem.nodeName);
		},

		"Input": function (elem) {
			regresso rinputs.test (elem.nodeName);
		},

		"Botão": function (elem) {
			var name = elem.nodeName.toLowerCase ();
			Nome retornar === "input" && elem.type === "botão" || nomear === "button";
		},

		"Texto": function (elem) {
			var attr;
			voltar elem.nodeName.toLowerCase () === "input" &&
				elem.type === "texto" &&

				((Attr = elem.getAttribute ( "tipo")) == null || attr.toLowerCase () === "text");
		},

		"Primeiro": createPositionalPseudo (function () {
			voltar [0];
		}),

		"Último": createPositionalPseudo (function (matchIndexes, comprimento) {
			voltar [length - 1];
		}),

		"Eq": createPositionalPseudo (function (matchIndexes, comprimento, argumento) {
			voltar [argumento <0? argumento + length: argumento];
		}),

		"Mesmo": createPositionalPseudo (function (matchIndexes, comprimento) {
			var i = 0;
			for (; i <comprimento; i + = 2) {
				matchIndexes.push (I);
			}
			voltar matchIndexes;
		}),

		"Estranha": createPositionalPseudo (function (matchIndexes, comprimento) {
			var i = 1;
			for (; i <comprimento; i + = 2) {
				matchIndexes.push (I);
			}
			voltar matchIndexes;
		}),

		"Lt": createPositionalPseudo (function (matchIndexes, comprimento, argumento) {
			var i = argumento <0? argumento + length: argumento;
			for (; --Eu> = 0;) {
				matchIndexes.push (I);
			}
			voltar matchIndexes;
		}),

		"Gt": createPositionalPseudo (function (matchIndexes, comprimento, argumento) {
			var i = argumento <0? argumento + length: argumento;
			for (; ++ i <comprimento;) {
				matchIndexes.push (I);
			}
			voltar matchIndexes;
		})
	}
};

Expr.pseudos [ "enésima"] = Expr.pseudos [ "eq"];

for (i in {rádio: true, checkbox: true, file: verdadeiro, a senha: verdadeiro, imagem: true}) {
	Expr.pseudos [i] = createInputPseudo (i);
}
for (i in {apresentar: verdadeiro, redefinir: true}) {
	Expr.pseudos [i] = createButtonPseudo (i);
}

setFilters function () {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters ();

tokenize função (selector, parseOnly) {
	var correspondida, jogo, símbolos, tipo,
		Sofar, grupos, pré-filtros,
		cache = tokenCache [selector + ""];

	if (cache) {
		voltar parseOnly? 0: cached.slice (0);
	}

	Sofar = selector;
	grupos = [];
	prefilters = Expr.preFilter;

	while (Sofar) {

		if (! combinado || (match = rcomma.exec (Sofar))) {
			if (jogo) {
				Sofar = soFar.slice (match [0] .length) || tão longe;
			}
			groups.push ((tokens = []));
		}

		combinado = false;

		if ((match = rcombinators.exec (Sofar))) {
			combinado = match.shift ();
			tokens.push ({
				valor: combinado,
				Tipo: combinar [0] .replace (rtrim, "")
			});
			Sofar = soFar.slice (matched.length);
		}

		for (digite Expr.filter) {
			if ((match = matchExpr [tipo] .exec (Sofar)) && (! prefilters [tipo] ||
				(Match = pré-filtros [tipo] (partida)))) {
				combinado = match.shift ();
				tokens.push ({
					valor: combinado,
					Tipo: tipo,
					jogos: jogo
				});
				Sofar = soFar.slice (matched.length);
			}
		}

		if (! combinado) {
			pausa;
		}
	}

	voltar parseOnly?
		soFar.length:
		tão longe ?
			Sizzle.error (selector):
			tokenCache (selector, grupos) .slice (0);
}

funcionar toSelector (tokens) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for (; i <len; i ++) {
		seletor + = fichas [i] .Value;
	}
	voltar selector;
}

addCombinator função (matcher, combinator, base) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = FEITO ++;

	voltar combinator.first?
		function (elem, contexto, xml) {
			while ((elem = elem [dir])) {
				Se (elem.nodeType === 1 || checkNonElements) {
					matcher retorno (elem, contexto, xml);
				}
			}
		}:

		function (elem, contexto, xml) {
			var oldCache, outerCache,
				newCache = [dirruns, doneName];

			if (xml) {
				while ((elem = elem [dir])) {
					Se (elem.nodeType === 1 || checkNonElements) {
						if (matcher (elem, contexto, xml)) {
							return true;
						}
					}
				}
			} outro {
				while ((elem = elem [dir])) {
					Se (elem.nodeType === 1 || checkNonElements) {
						outerCache = elem [expando] || (Elem [expando] = {});
						if ((oldCache = outerCache [dir]) &&
							oldCache [0] === && dirruns oldCache [1] === doneName) {

							retornar (newCache [2] = oldCache [2]);
						} outro {
							outerCache [dir] = newCache;

							if ((newCache [2] = matcher (elem, contexto, xml))) {
								return true;
							}
						}
					}
				}
			}
		};
}

funcionar elementMatcher (matchers) {
	voltar matchers.length> 1?
		function (elem, contexto, xml) {
			var i = matchers.length;
			enquanto eu-- ) {
				if (! matchers [i] (elem, contexto, xml)) {
					return false;
				}
			}
			return true;
		}:
		matchers [0];
}

multipleContexts função (seletor, contextos, resultados) {
	var i = 0,
		len = contexts.length;
	for (; i <len; i ++) {
		Chiar (selector, contextos [i], resultados);
	}
	retornar resultados;
}

condense função (inigualável, mapa, filtro, contexto, xml) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapeados = mapa! = null;

	for (; i <len; i ++) {
		if ((elem = inigualável [i])) {
			if (! filtrar || filtro (elem, contexto, xml)) {
				newUnmatched.push (elem);
				Se (mapeado) {
					map.push (I);
				}
			}
		}
	}

	voltar newUnmatched;
}

função setMatcher (pré-filtro, selector, de correspondência, postfilter, postFinder, postSelector) {
	if (postfilter &&! postfilter [expando]) {
		postfilter = setMatcher (pós-filtro);
	}
	Se (postFinder &&! postFinder [expando]) {
		postFinder = setMatcher (postFinder, postSelector);
	}
	voltar markFunction (function (semente, resultados, contexto, xml) {
		var temp, i, elem,
			preMap = [],
			postmap = [],
			preexistente = results.length,

			elems = semente || multipleContexts (selector || "*", context.nodeType [contexto]:? contexto, []),

			matcherIn = pré-filtro && (semente ||! selector)?
				condensar (elems, preMap, pré-filtro, o contexto, XML):
				elems,

			matcherOut = matcher?
				postFinder || (? Semente pré-filtro: preexistente || postfilter)?

					[]:

					resultados :
				matcherIn;

		Se (equiparador) {
			matcher (matcherIn, matcherOut, contexto, xml);
		}

		Se (postfilter) {
			temp = condense (matcherOut, postmap);
			postfilter (temp, [], o contexto, xml);

			i = temp.length;
			enquanto eu-- ) {
				if ((elem = temp [i])) {
					matcherOut [postmap [i]] = (matcherIn [postmap [i]] = elem!);
				}
			}
		}

		if (semente) {
			if (postFinder || pré-filtro) {
				Se (postFinder) {
					Temp = [];
					i = matcherOut.length;
					enquanto eu-- ) {
						if ((elem = matcherOut [i])) {
							temp.push ((matcherIn [i] = elem));
						}
					}
					postFinder (null, (matcherOut = []), temp, xml);
				}

				i = matcherOut.length;
				enquanto eu-- ) {
					if ((elem = matcherOut [i]) &&
						(Temp = postFinder indexOf.call (semente, elem):? PreMap [i])> -1) {

						semente [temporário] = (resultados [temporários] = elem!);
					}
				}
			}

		} outro {
			matcherOut = condense (
				resultados matcherOut ===?
					matcherOut.splice (preexistente, matcherOut.length):
					matcherOut
			);
			Se (postFinder) {
				postFinder (null, resultados, matcherOut, xml);
			} outro {
				push.apply (resultados, matcherOut);
			}
		}
	});
}

matcherFromTokens função (tokens) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative [fichas [0] .Type],
		implicitRelative = leadingRelative || Expr.relative [ ""],
		i = leadingRelative? 1: 0,

		matchContext = addCombinator (function (elem) {
			voltar elem === checkContext;
		}, ImplicitRelative, true),
		matchAnyContext = addCombinator (function (elem) {
			voltar indexOf.call (checkContext, elem)> -1;
		}, ImplicitRelative, true),
		matchers = [função (elem, contexto, xml) {
			retorno (! leadingRelative && (xml || contexto! == outermostContext)) || (
				(CheckContext = contexto) .nodeType?
					matchContext (elem, contexto, xml):
					matchAnyContext (elem, contexto, xml));
		}];

	for (; i <len; i ++) {
		if ((matcher = Expr.relative [tokens [i] .type])) {
			matchers = [addCombinator (elementMatcher (matchers), matcher)];
		} outro {
			matcher = Expr.filter [tokens [i] .type] .Aplique (null, os tokens [i] .matches);

			if (matcher [expando]) {
				J = ++ I;
				for (; j <len; j ++) {
					if (Expr.relative [fichas [j] .type]) {
						pausa;
					}
				}
				voltar setMatcher (
					i> 1 && elementMatcher (matchers),
					i> 1 && toSelector (
						tokens.slice (0, i - 1) .concat ({value: Símbolos [i - 2] .type === "*"? "": ""})
					) .replace (Rtrim, "$ 1"),
					matcher,
					i <j && matcherFromTokens (tokens.slice (i, j)),
					j <len && matcherFromTokens ((tokens = tokens.slice (j))),
					j <len && toSelector (fichas)
				);
			}
			matchers.push (de correspondência);
		}
	}

	voltar elementMatcher (matchers);
}

matcherFromGroupMatchers função (elementMatchers, setMatchers) {
	var bySet = setMatchers.length> 0,
		byElement = elementMatchers.length> 0,
		superMatcher = function (sementes, o contexto, xml, resultados, mais externa) {
			var elem, j, de correspondência,
				matchedCount = 0,
				i = "0",
				inigualável = semente && [],
				setMatched = [],
				contextBackup = outermostContext,
				elems = semente || byElement && Expr.find [ "TAG"] ( "*", mais externa),
				dirrunsUnique = (dirruns + = contextBackup == null 1:? Math.random () || 0.1),
				len = elems.length;

			if (mais externa) {
				! OutermostContext = contexto == documento && contexto;
			}

			para (;! i == len && (elem = elems [i]) = null; i ++) {
				if (byElement && elem) {
					j = 0;
					while ((matcher = elementMatchers [j ++])) {
						if (matcher (elem, contexto, xml)) {
							results.push (elem);
							pausa;
						}
					}
					if (mais externa) {
						dirruns = dirrunsUnique;
					}
				}

				Se (bySet) {
					if ((elem =! matcher && elem)) {
						matchedCount--;
					}

					if (semente) {
						unmatched.push (elem);
					}
				}
			}

			matchedCount + = I;
			if (bySet && i! == matchedCount) {
				j = 0;
				while ((matcher = setMatchers [j ++])) {
					matcher (incomparável, setMatched, contexto, xml);
				}

				if (semente) {
					if (matchedCount> 0) {
						enquanto eu-- ) {
							if (! (inigualável [i] || setMatched [i])) {
								setMatched [i] = pop.call (resultados);
							}
						}
					}

					setMatched = condensam (setMatched);
				}

				push.apply (resultados, setMatched);

				if (mais externa &&! semente && setMatched.length> 0 &&
					(MatchedCount setMatchers.length +)> 1) {

					Sizzle.uniqueSort (resultados);
				}
			}

			if (mais externa) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			incomparável retorno;
		};

	voltar bySet?
		markFunction (superMatcher):
		superMatcher;
}

compilar = Sizzle.compile = function (selector, jogo / * somente uso interno * /) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cache = compilerCache [selector + ""];

	if (! cache) {
		if (jogo!) {
			match = tokenize (selector);
		}
		i = match.length;
		enquanto eu-- ) {
			cache = matcherFromTokens (match [i]);
			if (em cache [expando]) {
				setMatchers.push (em cache);
			} outro {
				elementMatchers.push (em cache);
			}
		}

		cache = compilerCache (selectores, matcherFromGroupMatchers (elementMatchers, setMatchers));

		cached.selector = selector;
	}
	retornar em cache;
};

/ **
 * A função de seleção de baixo nível que trabalha com Sizzle do compilado
 * funções do seletor
 * @ Param {String | Função} selector Um selector ou uma pré-compilada
 * A função de selector construído com Sizzle.compile
 * @ Param {} Elemento contexto
 * @ Param {array} [resultados]
 * @ Param {array} [sementes] Um conjunto de elementos para o jogo contra
 * /
select = Sizzle.select = function (selector, o contexto, os resultados, semente) {
	var i, símbolos, símbolo, tipo, encontrar,
		"Função" compilado = selector typeof === && selector,
		! Match = semente && tokenize ((selector = compiled.selector || selector));

	resultados = resultados || [];

	Se (=== match.length 1) {

		fichas = jogo [0] = jogo [0] .slice (0);
		if (tokens.length> 2 && (Token = fichas [0]). tipo === "ID" &&
				support.getById && context.nodeType === 9 && && documentIsHTML
				Expr.relative [fichas [1] .type]) {

			context = (Expr.find [ "ID"] (token.matches [0] .replace (runescape, funescape), contexto) || []) [0];
			if (! contexto) {
				retornar resultados;

			} Else if (compilado) {
				context = context.parentNode;
			}

			selector = selector.slice (tokens.shift () value.length.);
		}

		i = matchExpr [ "needsContext"]. teste (selector)? 0: tokens.length;
		enquanto eu-- ) {
			tokens = fichas [i];

			if (Expr.relative [(type = token.type)]) {
				pausa;
			}
			if ((encontrar = Expr.find [tipo])) {
				if ((seed = find (
					token.matches [0] .replace (runescape, funescape),
					rsibling.test (tokens [0] .type) && TestContext (context.parentNode) || contexto
				))) {

					tokens.splice (i, 1);
					selector = seed.length && toSelector (tokens);
					Se (selector!) {
						push.apply (resultados, semente);
						retornar resultados;
					}

					pausa;
				}
			}
		}
	}

	(Compilado || compilar (selector, a partida)) (
		semente,
		contexto,
		! DocumentIsHTML,
		resultados,
		rsibling.test (selector) && TestContext (context.parentNode) || contexto
	);
	retornar resultados;
};


support.sortStable = expando.split ( "") sort (sortOrder) .join. ( "") === expando;

support.detectDuplicates = !! hasDuplicate;

setDocument ();

support.sortDetached = assert (function (div1) {
	voltar div1.compareDocumentPosition (document.createElement ( "div")) & 1;
});

if (! afirmar (function (div) {
	div.innerHTML = "<a href='#'> </a>";
	regresso div.firstChild.getAttribute ( "href") === "#";
})) {
	addHandle ( "tipo | href | altura | width", function (elem, nome, isXML) {
		if (! isXML) {
			voltar elem.getAttribute (nome, name.toLowerCase () === "tipo" 1: 2);
		}
	});
}

if (! support.attributes ||! afirmar (function (div) {
	div.innerHTML = "<input />";
	div.firstChild.setAttribute ( "value", "");
	voltar div.firstChild.getAttribute ( "value") === "";
})) {
	addHandle ( "value", function (elem, nome, isXML) {
		if (! isXML && elem.nodeName.toLowerCase () === "input") {
			voltar elem.defaultValue;
		}
	});
}

if (! afirmar (function (div) {
	voltar div.getAttribute ( "deficiente") == null;
})) {
	addHandle (booleans, função (elem, nome, isXML) {
		var val;
		if (! isXML) {
			voltar elem [nome] === verdade? name.toLowerCase ():
					(Val = elem.getAttributeNode (nome)) && val.specified?
					val.value:
				nulo;
		}
	});
}

if (typeof definir "função" === && define.amd) {
	define (function () {return Sizzle;});
} else if (typeof módulo! == "undefined" && module.exports) {
	module.exports = Sizzle;
} outro {
	window.Sizzle = Sizzle;
}

}) (Janela);

; (Function () {
  if (typeof chiar! == 'indefinido') {
    Retorna;
  }

  if (typeof definir! == 'indefinido' && define.amd) {
    window.Sizzle = Prototype._actual_sizzle;
    window.define = Prototype._original_define;
    eliminar Prototype._actual_sizzle;
    eliminar Prototype._original_define;
  } else if (typeof módulo! == && module.exports 'indefinido') {
    window.Sizzle = module.exports;
    module.exports = {};
  }
}) ();

; (Function (motor) {
  var extendElements = Prototype.Selector.extendElements;

  função select (selector, escopo) {
    extendElements retorno (motor (selector, o escopo || documentos));
  }

  jogo de função (elemento, selector) {
    voltar engine.matches (selector, [elemento]) comprimento ==. 1;
  }

  Prototype.Selector.engine = motor;
  Prototype.Selector.select = escolha;
  Prototype.Selector.match = jogo;
})(Chiar);

window.Sizzle = Prototype._original_property;
eliminar Prototype._original_property;

var Form = {
  redefinir: function (form) {
    form = $ (formulário);
    form.reset ();
    voltar forma;
  },

  serializeElements: function (elementos, opções) {
    if (typeof Opções = "objeto"!) options = {de hash: !! opções};
    else if (Object.isUndefined (options.hash)) options.hash = true;
    -chave var, valor apresentado = false, apresentar = options.submit, acumulador, inicial;

    Se (options.hash) {
      inicial = {};
      acumulador = function (resultado, chave, valor) {
        if (chave no resultado) {
          Se o resultado [key] = [resultado [chave]] (Object.isArray (resultado [key])!);
          resultado [key] = resultado [key] .concat (valor);
        } Else resultado [key] = value;
        retornar resultado;
      };
    } outro {
      = Iniciais '';
      acumulador = function (resultado, chave, valores) {
        se {valores = [valores];} (Object.isArray (valores)!)
        if (! values.length) {return resultado;}
        var encodedKey = encodeURIComponent (key) .gsub (/% 20 /, '+');
        retornar resultado + (resultado "&": "") + values.map (function (value) {
          value = value.gsub (/ (\ r) \ n /, '\ r \ n'?);
          value = encodeURIComponent (valor);
          value = value.gsub (/% 20 /, '+');
          voltar encodedKey + "=" + valor;
        }).Junte-se("&");
      };
    }

    elements.inject (inicial, função (resultado, elemento de retorno) {
      if (! element.disabled && element.name) {
        key = element.name; value = $ (elemento) .getValue ();
        if (valor! = null && element.type! = 'arquivo' && (element.type! = 'enviar' || (! submetido &&
            enviar! == false && (! enviar || == chave apresentar) && (submetido = true)))) {
          result = acumulador (resultado, chave, valor);
        }
      }
      retornar resultado;
    });
  }
};

Form.Methods = {
  serializar: function (form, opções) {
    Form.serializeElements retorno (Form.getElements (formulário), opções);
  },


  getElements: function (form) {
    elementos var = $ (formulário) .getElementsByTagName ( '*');
    var elemento, resultados = [], serializadores = Form.Element.Serializers;

    for (var i = 0; elemento = elementos [i]; i ++) {
      if (serializadores [element.tagName.toLowerCase ()])
        results.push (Element.extend (elemento));
    }
    retornar resultados;
  },

  getInputs: function (formulário, typeName, nome) {
    form = $ (formulário);
    entradas var = form.getElementsByTagName ( 'input');

    (! TypeName && nome) se o retorno $ A (inputs) .map (Element.extend);

    for (var i = 0, matchingInputs = [], comprimento = inputs.length; i <comprimento; i ++) {
      input var = entradas [i];
      if ((typeName && input.type! = typeName) || (nome && input.name! = nome))
        continuar;
      matchingInputs.push (Element.extend (entrada));
    }

    voltar matchingInputs;
  },

  desativar: function (form) {
    form = $ (formulário);
    Form.getElements (form) .invoke ( "desativar");
    voltar forma;
  },

  permitir: function (form) {
    form = $ (formulário);
    Form.getElements (form) .invoke ( 'permitir');
    voltar forma;
  },

  findFirstElement: function (form) {
    elementos var = $ (formulário) .getElements (). FindAll (function (elemento) {
      ! Retornar 'escondido' = element.type && element.disabled;
    });
    var firstByIndex = elements.findAll (function (elemento) {
      voltar element.hasAttribute ( 'tabIndex') && element.tabIndex> = 0;
    .}) SortBy (function (elemento) {return element.tabIndex}) primeiro (.);

    voltar firstByIndex? firstByIndex: elements.find (function (elemento) {
      regresso /^(?:input|select|textarea)$/i.test(element.tagName);
    });
  },

  focusFirstElement: function (form) {
    form = $ (formulário);
    var elemento form.findFirstElement = ();
    if (elemento) element.activate ();
    voltar forma;
  },

  solicitação: function (formulário, opções) {
    form = $ (form), opções = Object.clone (opções || {});

    var params = options.parameters, action = form.readAttribute ( 'action') || '';
    if (action.blank) () action = window.location.href;
    options.parameters = Form.serialize (true);

    Se (params) {
      if (Object.isString (params)) params = params.toQueryParams ();
      Object.extend (options.parameters, params);
    }

    if (form.hasAttribute ( "método") &&! options.method)
      options.method = form.method;

    retornar novos Ajax.Request (ação, opções);
  }
};

/ * ------------------------------------------------ -------------------------- * /


Form.Element = {
  foco: function (elemento) {
    $ (Elemento) .focus ();
    elemento de retorno;
  },

  selecione: function (elemento) {
    $ (Elemento) .Select ();
    elemento de retorno;
  }
};

Form.Element.Methods = {

  serializar: function (elemento) {
    elemento = $ (elemento);
    if (! element.disabled && element.name) {
      var value = element.getValue ();
      if (valor! = undefined) {
        var par = {};
        par [element.name] = value;
        voltar Object.toQueryString (par);
      }
    }
    Retorna '';
  },

  getValue: function (elemento) {
    elemento = $ (elemento);
    método var = element.tagName.toLowerCase ();
    Form.Element.Serializers retorno [método] (elemento);
  },

  setValue: function (elemento, value) {
    elemento = $ (elemento);
    método var = element.tagName.toLowerCase ();
    Form.Element.Serializers [método] (elemento, value);
    elemento de retorno;
  },

  clara: function (elemento) {
    $ (Elemento) .value = '';
    elemento de retorno;
  },

  presente: function (elemento) {
    return $ (elemento) .Value = '';
  },

  ativar: function (elemento) {
    elemento = $ (elemento);
    experimentar {
      element.focus ();
      if (Element.select && (element.tagName.toLowerCase ()! = 'input' ||
          ! (/ ^ (?: Botão | redefinição | enviar) $ / i.test (element.type))))
        Element.select ();
    } Catch (e) {}
    elemento de retorno;
  },

  desativar: function (elemento) {
    elemento = $ (elemento);
    element.disabled = true;
    elemento de retorno;
  },

  permitir: function (elemento) {
    elemento = $ (elemento);
    element.disabled = false;
    elemento de retorno;
  }
};

/ * ------------------------------------------------ -------------------------- * /

var campo = Form.Element;

var $ F = Form.Element.Methods.getValue;

/ * ------------------------------------------------ -------------------------- * /

Form.Element.Serializers = (function () {
  input function (elemento, value) {
    switch (element.type.toLowerCase ()) {
      caso 'checkbox':
      caso 'radio':
        voltar inputSelector (elemento, value);
      padrão:
        voltar valueSelector (elemento, value);
    }
  }

  inputSelector função (elemento, value) {
    if (Object.isUndefined (valor))
      retorno element.checked? element.value: null;
    outra element.checked = valor !!;
  }

  função valueSelector (elemento, value) {
    se element.value (Object.isUndefined (valor)) return;
    outra element.value = value;
  }

  função select (elemento, value) {
    if (Object.isUndefined (valor))
      retorno (element.type === 'select-one' selectOne:? SelectMany) (elemento);

    var opt, CurrentValue, single = Object.isArray (valor)!;
    for (var i = 0, comprimento = element.length; i <comprimento; i ++) {
      opt = element.options [i];
      CurrentValue = this.optionValue (opt);
      if (single) {
        if (CurrentValue == value) {
          opt.selected = true;
          Retorna;
        }
      }
      outra opt.selected = value.include (CurrentValue);
    }
  }

  selectOne função (elemento) {
    var index = element.selectedIndex;
    índice de retorno> = 0? optionvalue (element.options [índice]): null;
  }

  SelectMany função (elemento) {
    valores var, comprimento = element.length;
    se nula (comprimento!) return;

    para (var i = 0, os valores = []; i <comprimento; i ++) {
      var opt = element.options [i];
      if (opt.selected) values.push (optionvalue (opt));
    }
    valores de retorno;
  }

  optionvalue função (opt) {
    voltar Element.hasAttribute (opt, 'value')? opt.value: opt.text;
  }

  Retorna {
    entrada: entrada,
    inputSelector: inputSelector,
    textarea: valueSelector,
    : SELECT,
    selectOne: selectOne,
    SelectMany: SelectMany,
    optionvalue: optionvalue,
    botão: valueSelector
  };
}) ();

/ * ------------------------------------------------ -------------------------- * /


Abstract.TimedObserver = Class.create (PeriodicalExecuter, {
  inicializar: function ($ super, elemento, frequência, callback) {
    $ Super (callback, frequência);
    this.element = $ (elemento);
    this.lastValue this.getValue = ();
  },

  execute: function () {
    var value = this.getValue ();
    if (Object.isString (this.lastValue) && Object.isString (valor)?
        ! This.lastValue = value: String (this.lastValue) = String (valor)) {!
      this.callback (this.element, value);
      this.lastValue = value;
    }
  }
});

Form.Element.Observer = Class.create (Abstract.TimedObserver, {
  getValue: function () {
    regresso Form.Element.getValue (this.element);
  }
});

Form.Observer = Class.create (Abstract.TimedObserver, {
  getValue: function () {
    voltar Form.serialize (this.element);
  }
});

/ * ------------------------------------------------ -------------------------- * /

Abstract.EventObserver = Class.create ({
  inicializar: function (elemento, callback) {
    this.element = $ (elemento);
    this.callback = callback;

    this.lastValue this.getValue = ();
    if (this.element.tagName.toLowerCase () == 'form')
      this.registerFormCallbacks ();
    outro
      this.registerCallback (this.element);
  },

  onElementEvent: function () {
    var value = this.getValue ();
    if (this.lastValue! = value) {
      this.callback (this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function () {
    Form.getElements (this.element) .each (this.registerCallback, this);
  },

  RegisterCallback: function (elemento) {
    Se (element.type) {
      switch (element.type.toLowerCase ()) {
        caso 'checkbox':
        caso 'radio':
          Event.observe (elemento, 'clique', this.onElementEvent.bind (this));
          pausa;
        padrão:
          Event.observe (elemento, a "mudança", this.onElementEvent.bind (this));
          pausa;
      }
    }
  }
});

Form.Element.EventObserver = Class.create (Abstract.EventObserver, {
  getValue: function () {
    regresso Form.Element.getValue (this.element);
  }
});

Form.EventObserver = Class.create (Abstract.EventObserver, {
  getValue: function () {
    voltar Form.serialize (this.element);
  }
});
(Function (GLOBAL) {
  var DIV = document.createElement ( 'div');
  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'OnMouseEnter' em docEl
   && 'OnMouseLeave' em docEl;

  var evento = {
    KEY_BACKSPACE: 8,
    KEY_TAB: 9,
    KEY_RETURN: 13,
    KEY_ESC: 27,
    KEY_LEFT: 37,
    KEY_UP: 38,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_DELETE: 46,
    KEY_HOME: 36,
    KEY_END: ​​35,
    KEY_PAGEUP: 33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT: 45
  };


  var isIELegacyEvent = function (event) {return false; };

  Se (window.attachEvent) {
    Se (window.addEventListener) {
      isIELegacyEvent = function (event) {
        retornar (evento instanceof window.event!);
      };
    } outro {
      isIELegacyEvent = function (event) {return true; };
    }
  }

  var _isButton;

  _isButtonForDOMEvents função (evento, código) {
    voltar event.which? (Event.which === código + 1): (event.button === código);
  }

  var legacyButtonMap {= 0: 1, 1: 4, 2: 2};
  _isButtonForLegacyEvents função (evento, código) {
    voltar event.button === legacyButtonMap [code];
  }

  _isButtonForWebKit função (evento, código) {
    switch (código) {
      case 0: retornar event.which == 1 && event.metaKey;!
      case 1: voltar event.which == 2 || (Event.which == 1 && event.metaKey);
      case 2: retornar event.which == 3;
      default: return false;
    }
  }

  Se (window.attachEvent) {
    if (! window.addEventListener) {
      _isButton = _isButtonForLegacyEvents;
    } outro {
      _isButton = function (event, código) {
        voltar isIELegacyEvent (evento)? _isButtonForLegacyEvents (evento, código):
         _isButtonForDOMEvents (evento, código);
      }
    }
  } Else if (Prototype.Browser.WebKit) {
    _isButton = _isButtonForWebKit;
  } outro {
    _isButton = _isButtonForDOMEvents;
  }

  funcionar isLeftClick (event) {return _isButton (evento, 0)}

  funcionar isMiddleClick (event) {return _isButton (evento, 1)}

  funcionar isRightClick (event) {return _isButton (evento, 2)}

  elemento function (event) {
    voltar Element.extend (_element (evento));
  }

  _element function (event) {
    event = Event.extend (evento);

    nó var = event.target, type = Event.type,
     currentTarget = event.currentTarget;

    Se (currentTarget && currentTarget.tagName) {
      if (tipo === 'load' || tipo === 'error' ||
        (Tipo === 'clique' && currentTarget.tagName.toLowerCase () 'input' ===
          && CurrentTarget.type === 'radio'))
            nó = currentTarget;
    }

    voltar node.nodeType == Node.TEXT_NODE? node.parentNode: nó;
  }

  findElement função (evento, expressão) {
    var elemento = _element (evento), seletor = Prototype.Selector;
    (! Expressão) se voltar Element.extend (elemento);
    while (elemento) {
      if (Object.isElement (elemento) && selector.match (elemento, expressão))
        voltar Element.extend (elemento);
      elemento = element.parentNode;
    }
  }

  ponteiro de função (event) {
    retornar {x: pointerX (evento), y: pointerY (evento)};
  }

  função pointerX (event) {
    var docElement = document.documentElement,
     body = document.body || {ScrollLeft: 0};

    voltar event.pageX || (Event.clientX +
      (DocElement.scrollLeft || body.scrollLeft) -
      (DocElement.clientLeft || 0));
  }

  função pointerY (event) {
    var docElement = document.documentElement,
     body = document.body || {ScrollTop: 0};

    voltar event.pageY || (Event.clientY +
       (DocElement.scrollTop || body.scrollTop) -
       (DocElement.clientTop || 0));
  }


  função stop (event) {
    Event.extend (evento);
    event.preventDefault ();
    event.stopPropagation ();

    event.stopped = true;
  }


  Event.Methods = {
    isLeftClick: isLeftClick,
    isMiddleClick: isMiddleClick,
    isRightClick: isRightClick,

    elemento: elemento,
    findElement: findElement,

    ponteiro: ponteiro,
    pointerX: pointerX,
    pointerY: pointerY,

    para para
  };

  métodos var = Object.keys (Event.Methods) .inject ({}, function (m, nome) {
    m [nome] = Event.Methods [nome] .methodize ();
    retornar m;
  });

  Se (window.attachEvent) {
    função _relatedTarget (event) {
      var elemento;
      switch (Event.type) {
        caso 'mouseover':
        caso 'mouseenter':
          elemento = event.fromElement;
          pausa;
        caso 'mouseOut':
        caso 'mouseleave':
          elemento = event.toElement;
          pausa;
        padrão:
          return null;
      }
      voltar Element.extend (elemento);
    }

    var = {additionalMethods
      stopPropagation: function () {this.cancelBubble = true},
      preventDefault: function () {this.returnValue = false},
      inspeccionar: function () {return "[objeto de evento] '}
    };

    Event.extend = function (event, elemento) {
      if (evento!) return false;

      se o evento (isIELegacyEvent (evento)!) return;

      if (event._extendedByPrototype) evento de retorno;
      event._extendedByPrototype = Prototype.emptyFunction;

      ponteiro var = Event.pointer (evento);

      Object.extend (evento, {
        target: event.srcElement || elemento,
        relatedTarget: _relatedTarget (evento),
        pageX: pointer.x,
        pageY: pointer.y
      });

      Object.extend (evento, métodos);
      Object.extend (evento, additionalMethods);

      voltar evento;
    };
  } outro {
    Event.extend = Prototype.K;
  }

  Se (window.addEventListener) {
    Event.prototype = window.Event.prototype || document.createEvent ( 'HTMLEvents') .__ proto__;
    Object.extend (Event.prototype, métodos);
  }

  var = {EVENT_TRANSLATIONS
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  };

  getDOMEventName função (eventName) {
    EVENT_TRANSLATIONS retorno [eventName] || nome do evento;
  }

  Se (MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED)
    getDOMEventName = Prototype.K;

  função getUniqueElementID (elemento) {
    if (elemento === janela) return 0;

    if (typeof element._prototypeUID === 'indefinido')
      element._prototypeUID = Element.Storage.UID ++;
    voltar element._prototypeUID;
  }

  função getUniqueElementID_IE (elemento) {
    if (elemento === janela) return 0;
    if (elemento == documento) return 1;
    voltar element.uniqueID;
  }

  Se ( "uniqueID 'em DIV)
    getUniqueElementID = getUniqueElementID_IE;

  isCustomEvent função (eventName) {
    voltar eventName.include ( ':');
  }

  Event._isCustomEvent = isCustomEvent;

  getOrCreateRegistryFor função (elemento, uid) {
    var CACHE = GLOBAL.Event.cache;
    if (Object.isUndefined (uid))
      uid = getUniqueElementID (elemento);
    (! CACHE [uid]) se CACHE [uid] = {elemento: Elemento};
    voltar CACHE [uid];
  }

  destroyRegistryForElement função (elemento, uid) {
    if (Object.isUndefined (uid))
      uid = getUniqueElementID (elemento);
    eliminar GLOBAL.Event.cache [uid];
  }


  função de registro (elemento, eventName, manipulador) {
    Registro var = getOrCreateRegistryFor (elemento);
    se o registro [eventName] = [] (Registro [eventName]!);
    entradas var = Registro [eventName];

    var i = entries.length;
    enquanto eu--)
      if (entradas [i] .handler === manipulador) return null;

    var uid = getUniqueElementID (elemento);
    var responder = GLOBAL.Event._createResponder (uid, eventName, manipulador);
    entrada var = {
      responder: Responder,
      manipulador: manipulador
    };

    entries.push (entrada);
    retornar entrada;
  }

  função unregister (elemento, eventName, manipulador) {
    Registro var = getOrCreateRegistryFor (elemento);
    entradas var = Registro [eventName] || [];

    var i = entries.length, entrada;
    enquanto eu--) {
      if (entradas [i] .handler === manipulador) {
        entrada = entradas [i];
        pausa;
      }
    }

    if (entrada) {
      Índice var = entries.indexOf (entrada);
      entries.splice (index, 1);
    }

    Se (entries.length === 0) {
      excluir registro [eventName];
      if (Object.keys (Registro) .length === 1 && ( 'elemento' no registro))
        destroyRegistryForElement (elemento);
    }

    retornar entrada;
  }


  função de observar (elemento, eventName, manipulador) {
    elemento = $ (elemento);
    entrada var = registar (elemento, eventName, manipulador);

    se o elemento (entrada === null) return;

    var responder = entry.responder;
    if (isCustomEvent (eventName))
      observeCustomEvent (elemento, eventName, que responde);
    outro
      observeStandardEvent (elemento, eventName, que responde);

    elemento de retorno;
  }

  função observeStandardEvent (elemento, eventName, que responde) {
    var actualEventName = getDOMEventName (eventName);
    Se (element.addEventListener) {
      element.addEventListener (actualEventName, que responde, false);
    } outro {
      element.attachEvent ( 'on' + actualEventName, que responde);
    }
  }

  função observeCustomEvent (elemento, eventName, que responde) {
    Se (element.addEventListener) {
      element.addEventListener ( 'DataAvailable', que responde, false);
    } outro {
      element.attachEvent ( 'OnDataAvailable', que responde);
      element.attachEvent ( 'onlosecapture', que responde);
    }
  }

  função stopObserving (elemento, eventName, manipulador) {
    elemento = $ (elemento);
    var handlerGiven =! Object.isUndefined (manipulador),
     eventNameGiven = Object.isUndefined (eventName!);

    if (! eventNameGiven &&! handlerGiven) {
      stopObservingElement (elemento);
      elemento de retorno;
    }

    if (! handlerGiven) {
      stopObservingEventName (elemento, eventName);
      elemento de retorno;
    }

    var entrada = unregister (elemento, eventName, manipulador);

    se o elemento de retorno (entrada!);
    removeEvent (elemento, eventName, entry.responder);
    elemento de retorno;
  }

  função stopObservingStandardEvent (elemento, eventName, que responde) {
    var actualEventName = getDOMEventName (eventName);
    Se (element.removeEventListener) {
      element.removeEventListener (actualEventName, que responde, false);
    } outro {
      element.detachEvent ( 'on' + actualEventName, que responde);
    }
  }

  função stopObservingCustomEvent (elemento, eventName, que responde) {
    Se (element.removeEventListener) {
      element.removeEventListener ( 'DataAvailable', que responde, false);
    } outro {
      element.detachEvent ( 'OnDataAvailable', que responde);
      element.detachEvent ( 'onlosecapture', que responde);
    }
  }



  stopObservingElement função (elemento) {
    var uid = getUniqueElementID (elemento), Registro = GLOBAL.Event.cache [uid];
    se o retorno (registro!);

    destroyRegistryForElement (elemento, uid);

    entradas var, i;
    for (var eventName no registro) {
      if (eventName === 'elemento') continue;

      entries = Registro [eventName];
      i = entries.length;
      enquanto eu--)
        removeEvent (elemento, eventName, entradas [i] .responder);
    }
  }

  stopObservingEventName função (elemento, eventName) {
    Registro var = getOrCreateRegistryFor (elemento);
    entradas var = Registro [eventName];
    if (entradas) {
      excluir registro [eventName];
    }

    entries = entradas || [];

    var i = entries.length;
    enquanto eu--)
      removeEvent (elemento, eventName, entradas [i] .responder);

    for (var nome no registro) {
      if (nome === 'elemento') continue;
      Retorna; // Há um outro evento registrado
    }

    destroyRegistryForElement (elemento);
  }


  função removeEvent (elemento, eventName, manipulador) {
    if (isCustomEvent (eventName))
      stopObservingCustomEvent (elemento, eventName, manipulador);
    outro
      stopObservingStandardEvent (elemento, eventName, manipulador);
  }



  função getFireTarget (elemento) {
    if (! == elemento documento) elemento de retorno;
    if (document.createEvent &&! element.dispatchEvent)
      voltar document.documentElement;
    elemento de retorno;
  }

  fogo de função (elemento, eventName, memorando, bolha) {
    elemento = getFireTarget ($ (elemento));
    if (Object.isUndefined (bolha)) bolha = true;
    memo = memo || {};

    var event = fireEvent (elemento, eventName, memorando, bolha);
    voltar Event.extend (evento);
  }

  fireEvent_DOM função (elemento, eventName, memorando, bolha) {
    var event = document.createEvent ( 'HTMLEvents');
    event.initEvent ( 'DataAvailable', bolha, true);

    event.eventName = eventName;
    event.memo = memo;

    element.dispatchEvent (evento);
    voltar evento;
  }

  funcionar fireEvent_IE (elemento, eventName, memorando, bolha) {
    var event = document.createEventObject ();
    event.eventType = bolha? 'OnDataAvailable': 'onlosecapture';

    event.eventName = eventName;
    event.memo = memo;

    element.fireEvent (event.eventType, evento);
    voltar evento;
  }

  var fireEvent = document.createEvent? fireEvent_DOM: fireEvent_IE;



  Event.Handler = Class.create ({
    inicializar: function (elemento, eventName, selector, callback) {
      this.element = $ (elemento);
      this.eventName = eventName;
      this.selector = selector;
      this.callback = callback;
      this.handler = this.handleEvent.bind (this);
    },


    começar: function () {
      Event.observe (this.element, this.eventName, this.handler);
      devolver este;
    },

    parar: function () {
      Event.stopObserving (this.element, this.eventName, this.handler);
      devolver este;
    },

    handleEvent: function (event) {
      var elemento = Event.findElement (evento, this.selector);
      if (elemento) this.callback.call (this.element, evento, elemento);
    }
  });

  função no (elemento, eventName, selector, callback) {
    elemento = $ (elemento);
    if (Object.isFunction (selector) && Object.isUndefined (callback)) {
      callback = selector, seletor = null;
    }

    retornar nova Event.Handler (elemento, eventName, selector, callback) .start ();
  }

  Object.extend (evento, Event.Methods);

  Object.extend (Evento, {
    fogo fogo,
    observar: observar,
    stopObserving: stopObserving,
    On:
  });

  Element.addMethods ({
    fogo fogo,

    observar: observar,

    stopObserving: stopObserving,

    On:
  });

  Object.extend (documento, {
    fogo: fire.methodize (),

    observar: observe.methodize (),

    stopObserving: stopObserving.methodize (),

    em: on.methodize (),

    carregado: false
  });

  if (GLOBAL.Event) Object.extend (window.event, Evento);
  outra GLOBAL.Event = Evento;

  GLOBAL.Event.cache = {};

  destroyCache_IE function () {
    GLOBAL.Event.cache = null;
  }

  Se (window.attachEvent)
    window.attachEvent ( 'AoRemoverDaMemória', destroyCache_IE);

  DIV = null;
  docEl = null;
})(esta);

(Function (GLOBAL) {
  / * Código para a criação de respondedores evento livre de vazamento é baseado no trabalho de
   John David-Dalton. * /

  var docEl = document.documentElement;
  var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED = 'OnMouseEnter' em docEl
    && 'OnMouseLeave' em docEl;

  função isSimulatedMouseEnterLeaveEvent (eventName) {
    voltar! MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED &&
     ( 'Mouseleave' 'mouseenter' eventName === || eventName ===);
  }

  função createResponder (uid, eventName, manipulador) {
    if (Event._isCustomEvent (eventName))
      voltar createResponderForCustomEvent (uid, eventName, manipulador);
    if (isSimulatedMouseEnterLeaveEvent (eventName))
      voltar createMouseEnterLeaveResponder (uid, eventName, manipulador);

    função de retorno (event) {
      se o retorno (Event.cache!);

      var elemento = Event.cache [uid] .element;
      Event.extend (evento, elemento);
      handler.call (elemento, evento);
    };
  }

  função createResponderForCustomEvent (uid, eventName, manipulador) {
    função de retorno (event) {
      cache de var = Event.cache [uid];
      var elemento = cache do && cache.element;

      Se (Object.isUndefined (event.eventName))
        return false;

      if (event.eventName! == eventName)
        return false;

      Event.extend (evento, elemento);
      handler.call (elemento, evento);
    };
  }

  função createMouseEnterLeaveResponder (uid, eventName, manipulador) {
    função de retorno (event) {
      var elemento = Event.cache [uid] .element;

      Event.extend (evento, elemento);
      var parent = event.relatedTarget;

      while (pai && pai! == elemento) {
        try {parent = parent.parentNode; }
        catch (e) {parent = elemento; }
      }

      if (pai === elemento) retorno;
      handler.call (elemento, evento);
    }
  }

  GLOBAL.Event._createResponder = createResponder;
  docEl = null;
})(esta);

(Function (GLOBAL) {
  / * Suporte para o evento DOMContentLoaded é baseado no trabalho de Dan Webb,
     Matthias Miller, Dean Edwards, John Resig e Diego Perini. * /

  var temporizador;

  fireContentLoadedEvent function () {
    se o retorno (document.loaded);
    if (TIMER) window.clearTimeout (temporizador);
    document.loaded = true;
    document.fire ( 'dom: carregado');
  }

  checkReadyState function () {
    if (document.readyState === 'completa') {
      document.detachEvent ( 'onreadystatechange', checkReadyState);
      fireContentLoadedEvent ();
    }
  }

  pollDoScroll function () {
    experimentar {
      document.documentElement.doScroll ( "esquerda");
    } Catch (e) {
      TIMER = pollDoScroll.defer ();
      Retorna;
    }

    fireContentLoadedEvent ();
  }


  if (document.readyState === 'completa') {
    fireContentLoadedEvent ();
    Retorna;
  }

  Se (document.addEventListener) {
    document.addEventListener ( 'DOMContentLoaded', fireContentLoadedEvent, false);
  } outro {
    document.attachEvent ( 'onreadystatechange', checkReadyState);
    if (janela == superior) TIMER = pollDoScroll.defer ();
  }

  Event.observe (janela, 'load', fireContentLoadedEvent);
})(esta);


Element.addMethods ();
/*------------------------------- OBSOLETO ---------------- --------------- * /

Hash.toQueryString = Object.toQueryString;

var Alternar = {display: Element.toggle};

Element.addMethods ({
  childOf: Element.Methods.descendantOf
});

var = {Inserção
  Antes: function (elemento, conteúdo) {
    voltar Element.insert (elemento, {antes: conteúdo});
  },

  Top: function (elemento, conteúdo) {
    voltar Element.insert (elemento, {top: conteúdo});
  },

  Bottom: function (elemento, conteúdo) {
    voltar Element.insert (elemento, {bottom: conteúdo});
  },

  Depois: function (elemento, conteúdo) {
    voltar Element.insert (elemento, {depois: conteúdo});
  }
};

var $ continuar = new Error ( "jogue $ continuar" está obsoleta, use "retorno" ao invés ');

var Position = {
  includeScrollOffsets: falsos,

  preparar: function () {
    this.deltaX = window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY = window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  dentro: function (elemento, x, y) {
    if (this.includeScrollOffsets)
      voltar this.withinIncludingScrolloffsets (elemento, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = Element.cumulativeOffset (elemento);

    retorno (y> = this.offset [1] &&
            y <this.offset [1] + element.offsetHeight &&
            x> = this.offset [0] &&
            x <this.offset [0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function (elemento, x, y) {
    var offsetcache = Element.cumulativeScrollOffset (elemento);

    this.xcomp = x + offsetcache [0] - this.deltaX;
    this.ycomp = y + offsetcache [1] - this.deltaY;
    this.offset = Element.cumulativeOffset (elemento);

    retorno (this.ycomp> = this.offset [1] &&
            this.ycomp <this.offset [1] + element.offsetHeight &&
            this.xcomp> = this.offset [0] &&
            this.xcomp <this.offset [0] + element.offsetWidth);
  },

  sobreposição: function (modo, elemento) {
    se o retorno 0 (modo!);
    if (modo == 'vertical')
      return ((this.offset [1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (modo == 'horizontal')
      return ((this.offset [0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },


  cumulativeOffset: Element.Methods.cumulativeOffset,

  positionedOffset: Element.Methods.positionedOffset,

  absolutizar: function (elemento) {
    Position.prepare ();
    voltar Element.absolutize (elemento);
  },

  relativizar: function (elemento) {
    Position.prepare ();
    voltar Element.relativize (elemento);
  },

  realOffset: Element.Methods.cumulativeScrollOffset,

  offsetParent: Element.Methods.getOffsetParent,

  página: Element.Methods.viewportOffset,

  clone: ​​function (origem, destino, opções) {
    options = Opções || {};
    voltar Element.clonePosition (de destino, fonte, opções);
  }
};

/ * ------------------------------------------------ -------------------------- * /

if (! document.getElementsByClassName) document.getElementsByClassName = function (instanceMethods) {
  iter função (nome) {
    regresso name.blank ()? nulo: "[contém (concat ( '', @class, ''), '" + Nome + "")] ";
  }

  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath?
  function (elemento, className) {
    className = className.toString () tira (.);
    var cond = /\s/.test(className)? $ W (className) .map (ITER) .join ( ''): iter (className);
    voltar cond? document._getElementsByXPath ( './/*' + cond, elemento): [];
  }: Function (elemento, className) {
    className = className.toString () tira (.);
    elementos var = [], classnames = (/\s/.test(className) $ w (className):? null);
    se elementos de retorno (classnames && CLASSNAME!);

    nós var = $ (elemento) .getElementsByTagName ( '*');
    className = '' + className + '';

    for (var i = 0, criança, cn; child = nós [i]; i ++) {
      if (child.className && (cn = '' + child.className + '') && (cn.include (className) ||
          (Classnames && classNames.all (function (nome) {
            voltar name.toString () em branco () && cn.include ( '' + nome + '')!.;
          }))))
        elements.push (Element.extend (criança));
    }
    elementos retornar;
  };

  função de retorno (className, parentElement) {
    return $ (parentElement || document.body) .getElementsByClassName (className);
  };
} (Element.Methods);

/ * ------------------------------------------------ -------------------------- * /

Element.ClassNames Class.create = ();
Element.ClassNames.prototype = {
  inicializar: function (elemento) {
    this.element = $ (elemento);
  },

  _each: function (iterator, context) {
    this.element.className.split (/ \ s + /). seleccionar (function (nome) {
      voltar nome.length> 0;
    }) ._ Cada (iterator, contexto);
  },

  set: function (className) {
    this.element.className = className;
  },

  adicione: function (classNameToAdd) {
    if (this.include) (classNameToAdd) return;
    this.set ($ A (this) .concat (classNameToAdd) .join ( ''));
  },

  remova: function (classNameToRemove) {
    se o retorno (this.include classNameToRemove) (!);
    this.set ($ A (this) .sem (classNameToRemove) .join ( ''));
  },

  toString: function () {
    return $ Um (this) .join ( '');
  }
};

Object.extend (Element.ClassNames.prototype, Enumerable);

/ * ------------------------------------------------ -------------------------- * /

(Function () {
  window.Selector = Class.create ({
    inicializar: function (expressão) {
      this.expression expression.strip = ();
    },

    findElements: function (RootElement) {
      regresso Prototype.Selector.select (this.expression, RootElement);
    },

    jogo: function (elemento) {
      voltar Prototype.Selector.match (elemento, this.expression);
    },

    toString: function () {
      voltar this.expression;
    },

    inspeccionar: function () {
      retorno "# <Selector:" + this.expression + ">";
    }
  });

  Object.extend (Selector, {
    matchElements: function (elementos, expressão) {
      var match = Prototype.Selector.match,
          Resultados = [];

      for (var i = 0, comprimento = elements.length; i <comprimento; i ++) {
        var elemento = elementos [i];
        if (match (elemento, expressão)) {
          results.push (Element.extend (elemento));
        }
      }
      retornar resultados;
    },

    findElement: function (elementos, expressão, índice) {
      index = índice || 0;
      var matchIndex = 0, elemento;
      for (var i = 0, comprimento = elements.length; i <comprimento; i ++) {
        elemento = elementos [i];
        if (Prototype.Selector.match (elemento, expressão) && índice === matchIndex ++) {
          voltar Element.extend (elemento);
        }
      }
    },

    findChildElements: function (elemento, expressões) {
      var selector = expressions.toArray join () ( '.');
      voltar Prototype.Selector.select (selector, elemento || documento);
    }
  });
}) ();