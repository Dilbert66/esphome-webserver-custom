import "./chunk-T2T6Q22Z.js";

// ../../node_modules/@lit/reactive-element/development/css-tag.js
var NODE_MODE = false;
var global = NODE_MODE ? globalThis : window;
var supportsAdoptingStyleSheets = global.ShadowRoot && (global.ShadyCSS === void 0 || global.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var constructionToken = Symbol();
var cssTagCache = /* @__PURE__ */ new WeakMap();
var CSSResult = class {
  constructor(cssText, strings, safeToken) {
    this["_$cssResult$"] = true;
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
    this._strings = strings;
  }
  get styleSheet() {
    let styleSheet = this._styleSheet;
    const strings = this._strings;
    if (supportsAdoptingStyleSheets && styleSheet === void 0) {
      const cacheable = strings !== void 0 && strings.length === 1;
      if (cacheable) {
        styleSheet = cssTagCache.get(strings);
      }
      if (styleSheet === void 0) {
        (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
        if (cacheable) {
          cssTagCache.set(strings, styleSheet);
        }
      }
    }
    return styleSheet;
  }
  toString() {
    return this.cssText;
  }
};
var textFromCSSResult = (value) => {
  if (value["_$cssResult$"] === true) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`);
  }
};
var unsafeCSS = (value) => new CSSResult(typeof value === "string" ? value : String(value), void 0, constructionToken);
var css = (strings, ...values) => {
  const cssText = strings.length === 1 ? strings[0] : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, strings, constructionToken);
};
var adoptStyles = (renderRoot, styles) => {
  if (supportsAdoptingStyleSheets) {
    renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  } else {
    styles.forEach((s) => {
      const style = document.createElement("style");
      const nonce = global["litNonce"];
      if (nonce !== void 0) {
        style.setAttribute("nonce", nonce);
      }
      style.textContent = s.cssText;
      renderRoot.appendChild(style);
    });
  }
};
var cssResultFromStyleSheet = (sheet) => {
  let cssText = "";
  for (const rule of sheet.cssRules) {
    cssText += rule.cssText;
  }
  return unsafeCSS(cssText);
};
var getCompatibleStyle = supportsAdoptingStyleSheets || NODE_MODE && global.CSSStyleSheet === void 0 ? (s) => s : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;

// ../../node_modules/@lit/reactive-element/development/reactive-element.js
var _a;
var _b;
var _c;
var _d;
var _e;
var NODE_MODE2 = false;
var global2 = NODE_MODE2 ? globalThis : window;
if (NODE_MODE2) {
  (_a = global2.customElements) !== null && _a !== void 0 ? _a : global2.customElements = customElements;
}
var DEV_MODE = true;
var requestUpdateThenable;
var issueWarning;
var trustedTypes = global2.trustedTypes;
var emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : "";
var polyfillSupport = DEV_MODE ? global2.reactiveElementPolyfillSupportDevMode : global2.reactiveElementPolyfillSupport;
if (DEV_MODE) {
  const issuedWarnings = (_b = global2.litIssuedWarnings) !== null && _b !== void 0 ? _b : global2.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
  issueWarning("dev-mode", `Lit is in dev mode. Not recommended for production!`);
  if (((_c = global2.ShadyDOM) === null || _c === void 0 ? void 0 : _c.inUse) && polyfillSupport === void 0) {
    issueWarning("polyfill-support-missing", `Shadow DOM is being polyfilled via \`ShadyDOM\` but the \`polyfill-support\` module has not been loaded.`);
  }
  requestUpdateThenable = (name) => ({
    then: (onfulfilled, _onrejected) => {
      issueWarning("request-update-promise", `The \`requestUpdate\` method should no longer return a Promise but does so on \`${name}\`. Use \`updateComplete\` instead.`);
      if (onfulfilled !== void 0) {
        onfulfilled(false);
      }
    }
  });
}
var debugLogEvent = DEV_MODE ? (event) => {
  const shouldEmit = global2.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global2.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
} : void 0;
var JSCompiler_renameProperty = (prop, _obj) => prop;
var defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        value = value ? emptyStringForBooleanAttribute : null;
        break;
      case Object:
      case Array:
        value = value == null ? value : JSON.stringify(value);
        break;
    }
    return value;
  },
  fromAttribute(value, type) {
    let fromValue = value;
    switch (type) {
      case Boolean:
        fromValue = value !== null;
        break;
      case Number:
        fromValue = value === null ? null : Number(value);
        break;
      case Object:
      case Array:
        try {
          fromValue = JSON.parse(value);
        } catch (e) {
          fromValue = null;
        }
        break;
    }
    return fromValue;
  }
};
var notEqual = (value, old) => {
  return old !== value && (old === old || value === value);
};
var defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
var finalized = "finalized";
var ReactiveElement = class extends HTMLElement {
  constructor() {
    super();
    this.__instanceProperties = /* @__PURE__ */ new Map();
    this.isUpdatePending = false;
    this.hasUpdated = false;
    this.__reflectingProperty = null;
    this.__initialize();
  }
  static addInitializer(initializer) {
    var _a4;
    this.finalize();
    ((_a4 = this._initializers) !== null && _a4 !== void 0 ? _a4 : this._initializers = []).push(initializer);
  }
  static get observedAttributes() {
    this.finalize();
    const attributes = [];
    this.elementProperties.forEach((v, p) => {
      const attr = this.__attributeNameForProperty(p, v);
      if (attr !== void 0) {
        this.__attributeToPropertyMap.set(attr, p);
        attributes.push(attr);
      }
    });
    return attributes;
  }
  static createProperty(name, options = defaultPropertyDeclaration) {
    var _a4;
    if (options.state) {
      options.attribute = false;
    }
    this.finalize();
    this.elementProperties.set(name, options);
    if (!options.noAccessor && !this.prototype.hasOwnProperty(name)) {
      const key = typeof name === "symbol" ? Symbol() : `__${name}`;
      const descriptor = this.getPropertyDescriptor(name, key, options);
      if (descriptor !== void 0) {
        Object.defineProperty(this.prototype, name, descriptor);
        if (DEV_MODE) {
          if (!this.hasOwnProperty("__reactivePropertyKeys")) {
            this.__reactivePropertyKeys = new Set((_a4 = this.__reactivePropertyKeys) !== null && _a4 !== void 0 ? _a4 : []);
          }
          this.__reactivePropertyKeys.add(name);
        }
      }
    }
  }
  static getPropertyDescriptor(name, key, options) {
    return {
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdate(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(name) {
    return this.elementProperties.get(name) || defaultPropertyDeclaration;
  }
  static finalize() {
    if (this.hasOwnProperty(finalized)) {
      return false;
    }
    this[finalized] = true;
    const superCtor = Object.getPrototypeOf(this);
    superCtor.finalize();
    if (superCtor._initializers !== void 0) {
      this._initializers = [...superCtor._initializers];
    }
    this.elementProperties = new Map(superCtor.elementProperties);
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
    if (this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...Object.getOwnPropertySymbols(props)
      ];
      for (const p of propKeys) {
        this.createProperty(p, props[p]);
      }
    }
    this.elementStyles = this.finalizeStyles(this.styles);
    if (DEV_MODE) {
      const warnRemovedOrRenamed = (name, renamed = false) => {
        if (this.prototype.hasOwnProperty(name)) {
          issueWarning(renamed ? "renamed-api" : "removed-api", `\`${name}\` is implemented on class ${this.name}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
        }
      };
      warnRemovedOrRenamed("initialize");
      warnRemovedOrRenamed("requestUpdateInternal");
      warnRemovedOrRenamed("_getUpdateComplete", true);
    }
    return true;
  }
  static finalizeStyles(styles) {
    const elementStyles = [];
    if (Array.isArray(styles)) {
      const set = new Set(styles.flat(Infinity).reverse());
      for (const s of set) {
        elementStyles.unshift(getCompatibleStyle(s));
      }
    } else if (styles !== void 0) {
      elementStyles.push(getCompatibleStyle(styles));
    }
    return elementStyles;
  }
  static __attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  __initialize() {
    var _a4;
    this.__updatePromise = new Promise((res) => this.enableUpdating = res);
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.__saveInstanceProperties();
    this.requestUpdate();
    (_a4 = this.constructor._initializers) === null || _a4 === void 0 ? void 0 : _a4.forEach((i) => i(this));
  }
  addController(controller) {
    var _a4, _b4;
    ((_a4 = this.__controllers) !== null && _a4 !== void 0 ? _a4 : this.__controllers = []).push(controller);
    if (this.renderRoot !== void 0 && this.isConnected) {
      (_b4 = controller.hostConnected) === null || _b4 === void 0 ? void 0 : _b4.call(controller);
    }
  }
  removeController(controller) {
    var _a4;
    (_a4 = this.__controllers) === null || _a4 === void 0 ? void 0 : _a4.splice(this.__controllers.indexOf(controller) >>> 0, 1);
  }
  __saveInstanceProperties() {
    this.constructor.elementProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        this.__instanceProperties.set(p, this[p]);
        delete this[p];
      }
    });
  }
  createRenderRoot() {
    var _a4;
    const renderRoot = (_a4 = this.shadowRoot) !== null && _a4 !== void 0 ? _a4 : this.attachShadow(this.constructor.shadowRootOptions);
    adoptStyles(renderRoot, this.constructor.elementStyles);
    return renderRoot;
  }
  connectedCallback() {
    var _a4;
    if (this.renderRoot === void 0) {
      this.renderRoot = this.createRenderRoot();
    }
    this.enableUpdating(true);
    (_a4 = this.__controllers) === null || _a4 === void 0 ? void 0 : _a4.forEach((c) => {
      var _a5;
      return (_a5 = c.hostConnected) === null || _a5 === void 0 ? void 0 : _a5.call(c);
    });
  }
  enableUpdating(_requestedUpdate) {
  }
  disconnectedCallback() {
    var _a4;
    (_a4 = this.__controllers) === null || _a4 === void 0 ? void 0 : _a4.forEach((c) => {
      var _a5;
      return (_a5 = c.hostDisconnected) === null || _a5 === void 0 ? void 0 : _a5.call(c);
    });
  }
  attributeChangedCallback(name, _old, value) {
    this._$attributeToProperty(name, value);
  }
  __propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    var _a4;
    const attr = this.constructor.__attributeNameForProperty(name, options);
    if (attr !== void 0 && options.reflect === true) {
      const converter = ((_a4 = options.converter) === null || _a4 === void 0 ? void 0 : _a4.toAttribute) !== void 0 ? options.converter : defaultConverter;
      const attrValue = converter.toAttribute(value, options.type);
      if (DEV_MODE && this.constructor.enabledWarnings.indexOf("migration") >= 0 && attrValue === void 0) {
        issueWarning("undefined-attribute-value", `The attribute value for the ${name} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);
      }
      this.__reflectingProperty = name;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this.__reflectingProperty = null;
    }
  }
  _$attributeToProperty(name, value) {
    var _a4;
    const ctor = this.constructor;
    const propName = ctor.__attributeToPropertyMap.get(name);
    if (propName !== void 0 && this.__reflectingProperty !== propName) {
      const options = ctor.getPropertyOptions(propName);
      const converter = typeof options.converter === "function" ? { fromAttribute: options.converter } : ((_a4 = options.converter) === null || _a4 === void 0 ? void 0 : _a4.fromAttribute) !== void 0 ? options.converter : defaultConverter;
      this.__reflectingProperty = propName;
      this[propName] = converter.fromAttribute(
        value,
        options.type
      );
      this.__reflectingProperty = null;
    }
  }
  requestUpdate(name, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name !== void 0) {
      options = options || this.constructor.getPropertyOptions(name);
      const hasChanged = options.hasChanged || notEqual;
      if (hasChanged(this[name], oldValue)) {
        if (!this._$changedProperties.has(name)) {
          this._$changedProperties.set(name, oldValue);
        }
        if (options.reflect === true && this.__reflectingProperty !== name) {
          if (this.__reflectingProperties === void 0) {
            this.__reflectingProperties = /* @__PURE__ */ new Map();
          }
          this.__reflectingProperties.set(name, options);
        }
      } else {
        shouldRequestUpdate = false;
      }
    }
    if (!this.isUpdatePending && shouldRequestUpdate) {
      this.__updatePromise = this.__enqueueUpdate();
    }
    return DEV_MODE ? requestUpdateThenable(this.localName) : void 0;
  }
  async __enqueueUpdate() {
    this.isUpdatePending = true;
    try {
      await this.__updatePromise;
    } catch (e) {
      Promise.reject(e);
    }
    const result = this.scheduleUpdate();
    if (result != null) {
      await result;
    }
    return !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a4, _b4;
    if (!this.isUpdatePending) {
      return;
    }
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({ kind: "update" });
    if (!this.hasUpdated) {
      if (DEV_MODE) {
        const shadowedProperties = [];
        (_a4 = this.constructor.__reactivePropertyKeys) === null || _a4 === void 0 ? void 0 : _a4.forEach((p) => {
          var _a5;
          if (this.hasOwnProperty(p) && !((_a5 = this.__instanceProperties) === null || _a5 === void 0 ? void 0 : _a5.has(p))) {
            shadowedProperties.push(p);
          }
        });
        if (shadowedProperties.length) {
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${shadowedProperties.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
        }
      }
    }
    if (this.__instanceProperties) {
      this.__instanceProperties.forEach((v, p) => this[p] = v);
      this.__instanceProperties = void 0;
    }
    let shouldUpdate = false;
    const changedProperties = this._$changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.willUpdate(changedProperties);
        (_b4 = this.__controllers) === null || _b4 === void 0 ? void 0 : _b4.forEach((c) => {
          var _a5;
          return (_a5 = c.hostUpdate) === null || _a5 === void 0 ? void 0 : _a5.call(c);
        });
        this.update(changedProperties);
      } else {
        this.__markUpdated();
      }
    } catch (e) {
      shouldUpdate = false;
      this.__markUpdated();
      throw e;
    }
    if (shouldUpdate) {
      this._$didUpdate(changedProperties);
    }
  }
  willUpdate(_changedProperties) {
  }
  _$didUpdate(changedProperties) {
    var _a4;
    (_a4 = this.__controllers) === null || _a4 === void 0 ? void 0 : _a4.forEach((c) => {
      var _a5;
      return (_a5 = c.hostUpdated) === null || _a5 === void 0 ? void 0 : _a5.call(c);
    });
    if (!this.hasUpdated) {
      this.hasUpdated = true;
      this.firstUpdated(changedProperties);
    }
    this.updated(changedProperties);
    if (DEV_MODE && this.isUpdatePending && this.constructor.enabledWarnings.indexOf("change-in-update") >= 0) {
      issueWarning("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
    }
  }
  __markUpdated() {
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.__updatePromise;
  }
  shouldUpdate(_changedProperties) {
    return true;
  }
  update(_changedProperties) {
    if (this.__reflectingProperties !== void 0) {
      this.__reflectingProperties.forEach((v, k) => this.__propertyToAttribute(k, this[k], v));
      this.__reflectingProperties = void 0;
    }
    this.__markUpdated();
  }
  updated(_changedProperties) {
  }
  firstUpdated(_changedProperties) {
  }
};
_e = finalized;
ReactiveElement[_e] = true;
ReactiveElement.elementProperties = /* @__PURE__ */ new Map();
ReactiveElement.elementStyles = [];
ReactiveElement.shadowRootOptions = { mode: "open" };
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({ ReactiveElement });
if (DEV_MODE) {
  ReactiveElement.enabledWarnings = ["change-in-update"];
  const ensureOwnWarnings = function(ctor) {
    if (!ctor.hasOwnProperty(JSCompiler_renameProperty("enabledWarnings", ctor))) {
      ctor.enabledWarnings = ctor.enabledWarnings.slice();
    }
  };
  ReactiveElement.enableWarning = function(warning) {
    ensureOwnWarnings(this);
    if (this.enabledWarnings.indexOf(warning) < 0) {
      this.enabledWarnings.push(warning);
    }
  };
  ReactiveElement.disableWarning = function(warning) {
    ensureOwnWarnings(this);
    const i = this.enabledWarnings.indexOf(warning);
    if (i >= 0) {
      this.enabledWarnings.splice(i, 1);
    }
  };
}
((_d = global2.reactiveElementVersions) !== null && _d !== void 0 ? _d : global2.reactiveElementVersions = []).push("1.6.3");
if (DEV_MODE && global2.reactiveElementVersions.length > 1) {
  issueWarning("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}

// ../../node_modules/lit-html/development/lit-html.js
var _a2;
var _b2;
var _c2;
var _d2;
var DEV_MODE2 = true;
var ENABLE_EXTRA_SECURITY_HOOKS = true;
var ENABLE_SHADYDOM_NOPATCH = true;
var NODE_MODE3 = false;
var global3 = NODE_MODE3 ? globalThis : window;
var debugLogEvent2 = DEV_MODE2 ? (event) => {
  const shouldEmit = global3.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global3.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
} : void 0;
var debugLogRenderId = 0;
var issueWarning2;
if (DEV_MODE2) {
  (_a2 = global3.litIssuedWarnings) !== null && _a2 !== void 0 ? _a2 : global3.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning2 = (code, warning) => {
    warning += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!global3.litIssuedWarnings.has(warning)) {
      console.warn(warning);
      global3.litIssuedWarnings.add(warning);
    }
  };
  issueWarning2("dev-mode", `Lit is in dev mode. Not recommended for production!`);
}
var wrap = ENABLE_SHADYDOM_NOPATCH && ((_b2 = global3.ShadyDOM) === null || _b2 === void 0 ? void 0 : _b2.inUse) && ((_c2 = global3.ShadyDOM) === null || _c2 === void 0 ? void 0 : _c2.noPatch) === true ? global3.ShadyDOM.wrap : (node) => node;
var trustedTypes2 = global3.trustedTypes;
var policy = trustedTypes2 ? trustedTypes2.createPolicy("lit-html", {
  createHTML: (s) => s
}) : void 0;
var identityFunction = (value) => value;
var noopSanitizer = (_node, _name, _type) => identityFunction;
var setSanitizer = (newSanitizer) => {
  if (!ENABLE_EXTRA_SECURITY_HOOKS) {
    return;
  }
  if (sanitizerFactoryInternal !== noopSanitizer) {
    throw new Error(`Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.`);
  }
  sanitizerFactoryInternal = newSanitizer;
};
var _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
  sanitizerFactoryInternal = noopSanitizer;
};
var createSanitizer = (node, name, type) => {
  return sanitizerFactoryInternal(node, name, type);
};
var boundAttributeSuffix = "$lit$";
var marker = `lit$${String(Math.random()).slice(9)}$`;
var markerMatch = "?" + marker;
var nodeMarker = `<${markerMatch}>`;
var d = NODE_MODE3 && global3.document === void 0 ? {
  createTreeWalker() {
    return {};
  }
} : document;
var createMarker = () => d.createComment("");
var isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
var isArray = Array.isArray;
var isIterable = (value) => isArray(value) || typeof (value === null || value === void 0 ? void 0 : value[Symbol.iterator]) === "function";
var SPACE_CHAR = `[ 	
\f\r]`;
var ATTR_VALUE_CHAR = `[^ 	
\f\r"'\`<>=]`;
var NAME_CHAR = `[^\\s"'>=/]`;
var textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var COMMENT_START = 1;
var TAG_NAME = 2;
var DYNAMIC_TAG_NAME = 3;
var commentEndRegex = /-->/g;
var comment2EndRegex = />/g;
var tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, "g");
var ENTIRE_MATCH = 0;
var ATTRIBUTE_NAME = 1;
var SPACES_AND_EQUALS = 2;
var QUOTE_CHAR = 3;
var singleQuoteAttrEndRegex = /'/g;
var doubleQuoteAttrEndRegex = /"/g;
var rawTextElement = /^(?:script|style|textarea|title)$/i;
var HTML_RESULT = 1;
var SVG_RESULT = 2;
var ATTRIBUTE_PART = 1;
var CHILD_PART = 2;
var PROPERTY_PART = 3;
var BOOLEAN_ATTRIBUTE_PART = 4;
var EVENT_PART = 5;
var ELEMENT_PART = 6;
var COMMENT_PART = 7;
var tag = (type) => (strings, ...values) => {
  if (DEV_MODE2 && strings.some((s) => s === void 0)) {
    console.warn("Some template strings are undefined.\nThis is probably caused by illegal octal escape sequences.");
  }
  return {
    ["_$litType$"]: type,
    strings,
    values
  };
};
var html = tag(HTML_RESULT);
var svg = tag(SVG_RESULT);
var noChange = Symbol.for("lit-noChange");
var nothing = Symbol.for("lit-nothing");
var templateCache = /* @__PURE__ */ new WeakMap();
var walker = d.createTreeWalker(d, 129, null, false);
var sanitizerFactoryInternal = noopSanitizer;
function trustFromTemplateString(tsa, stringFromTSA) {
  if (!Array.isArray(tsa) || !tsa.hasOwnProperty("raw")) {
    let message = "invalid template strings array";
    if (DEV_MODE2) {
      message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, "\n");
    }
    throw new Error(message);
  }
  return policy !== void 0 ? policy.createHTML(stringFromTSA) : stringFromTSA;
}
var getTemplateHtml = (strings, type) => {
  const l = strings.length - 1;
  const attrNames = [];
  let html2 = type === SVG_RESULT ? "<svg>" : "";
  let rawTextEndRegex;
  let regex = textEndRegex;
  for (let i = 0; i < l; i++) {
    const s = strings[i];
    let attrNameEndIndex = -1;
    let attrName;
    let lastIndex = 0;
    let match;
    while (lastIndex < s.length) {
      regex.lastIndex = lastIndex;
      match = regex.exec(s);
      if (match === null) {
        break;
      }
      lastIndex = regex.lastIndex;
      if (regex === textEndRegex) {
        if (match[COMMENT_START] === "!--") {
          regex = commentEndRegex;
        } else if (match[COMMENT_START] !== void 0) {
          regex = comment2EndRegex;
        } else if (match[TAG_NAME] !== void 0) {
          if (rawTextElement.test(match[TAG_NAME])) {
            rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, "g");
          }
          regex = tagEndRegex;
        } else if (match[DYNAMIC_TAG_NAME] !== void 0) {
          if (DEV_MODE2) {
            throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
          }
          regex = tagEndRegex;
        }
      } else if (regex === tagEndRegex) {
        if (match[ENTIRE_MATCH] === ">") {
          regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
          attrNameEndIndex = -1;
        } else if (match[ATTRIBUTE_NAME] === void 0) {
          attrNameEndIndex = -2;
        } else {
          attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
          attrName = match[ATTRIBUTE_NAME];
          regex = match[QUOTE_CHAR] === void 0 ? tagEndRegex : match[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
        }
      } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
        regex = tagEndRegex;
      } else if (regex === commentEndRegex || regex === comment2EndRegex) {
        regex = textEndRegex;
      } else {
        regex = tagEndRegex;
        rawTextEndRegex = void 0;
      }
    }
    if (DEV_MODE2) {
      console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, "unexpected parse state B");
    }
    const end = regex === tagEndRegex && strings[i + 1].startsWith("/>") ? " " : "";
    html2 += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? (attrNames.push(void 0), i) : end);
  }
  const htmlResult = html2 + (strings[l] || "<?>") + (type === SVG_RESULT ? "</svg>" : "");
  return [trustFromTemplateString(strings, htmlResult), attrNames];
};
var Template = class {
  constructor({ strings, ["_$litType$"]: type }, options) {
    this.parts = [];
    let node;
    let nodeIndex = 0;
    let attrNameIndex = 0;
    const partCount = strings.length - 1;
    const parts = this.parts;
    const [html2, attrNames] = getTemplateHtml(strings, type);
    this.el = Template.createElement(html2, options);
    walker.currentNode = this.el.content;
    if (type === SVG_RESULT) {
      const content = this.el.content;
      const svgElement = content.firstChild;
      svgElement.remove();
      content.append(...svgElement.childNodes);
    }
    while ((node = walker.nextNode()) !== null && parts.length < partCount) {
      if (node.nodeType === 1) {
        if (DEV_MODE2) {
          const tag2 = node.localName;
          if (/^(?:textarea|template)$/i.test(tag2) && node.innerHTML.includes(marker)) {
            const m = `Expressions are not supported inside \`${tag2}\` elements. See https://lit.dev/msg/expression-in-${tag2} for more information.`;
            if (tag2 === "template") {
              throw new Error(m);
            } else
              issueWarning2("", m);
          }
        }
        if (node.hasAttributes()) {
          const attrsToRemove = [];
          for (const name of node.getAttributeNames()) {
            if (name.endsWith(boundAttributeSuffix) || name.startsWith(marker)) {
              const realName = attrNames[attrNameIndex++];
              attrsToRemove.push(name);
              if (realName !== void 0) {
                const value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                const statics = value.split(marker);
                const m = /([.?@])?(.*)/.exec(realName);
                parts.push({
                  type: ATTRIBUTE_PART,
                  index: nodeIndex,
                  name: m[2],
                  strings: statics,
                  ctor: m[1] === "." ? PropertyPart : m[1] === "?" ? BooleanAttributePart : m[1] === "@" ? EventPart : AttributePart
                });
              } else {
                parts.push({
                  type: ELEMENT_PART,
                  index: nodeIndex
                });
              }
            }
          }
          for (const name of attrsToRemove) {
            node.removeAttribute(name);
          }
        }
        if (rawTextElement.test(node.tagName)) {
          const strings2 = node.textContent.split(marker);
          const lastIndex = strings2.length - 1;
          if (lastIndex > 0) {
            node.textContent = trustedTypes2 ? trustedTypes2.emptyScript : "";
            for (let i = 0; i < lastIndex; i++) {
              node.append(strings2[i], createMarker());
              walker.nextNode();
              parts.push({ type: CHILD_PART, index: ++nodeIndex });
            }
            node.append(strings2[lastIndex], createMarker());
          }
        }
      } else if (node.nodeType === 8) {
        const data = node.data;
        if (data === markerMatch) {
          parts.push({ type: CHILD_PART, index: nodeIndex });
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            parts.push({ type: COMMENT_PART, index: nodeIndex });
            i += marker.length - 1;
          }
        }
      }
      nodeIndex++;
    }
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "template prep",
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings
    });
  }
  static createElement(html2, _options) {
    const el = d.createElement("template");
    el.innerHTML = html2;
    return el;
  }
};
function resolveDirective(part, value, parent = part, attributeIndex) {
  var _a4, _b4, _c4;
  var _d3;
  if (value === noChange) {
    return value;
  }
  let currentDirective = attributeIndex !== void 0 ? (_a4 = parent.__directives) === null || _a4 === void 0 ? void 0 : _a4[attributeIndex] : parent.__directive;
  const nextDirectiveConstructor = isPrimitive(value) ? void 0 : value["_$litDirective$"];
  if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
    (_b4 = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective["_$notifyDirectiveConnectionChanged"]) === null || _b4 === void 0 ? void 0 : _b4.call(currentDirective, false);
    if (nextDirectiveConstructor === void 0) {
      currentDirective = void 0;
    } else {
      currentDirective = new nextDirectiveConstructor(part);
      currentDirective._$initialize(part, parent, attributeIndex);
    }
    if (attributeIndex !== void 0) {
      ((_c4 = (_d3 = parent).__directives) !== null && _c4 !== void 0 ? _c4 : _d3.__directives = [])[attributeIndex] = currentDirective;
    } else {
      parent.__directive = currentDirective;
    }
  }
  if (currentDirective !== void 0) {
    value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
  }
  return value;
}
var TemplateInstance = class {
  constructor(template, parent) {
    this._$parts = [];
    this._$disconnectableChildren = void 0;
    this._$template = template;
    this._$parent = parent;
  }
  get parentNode() {
    return this._$parent.parentNode;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _clone(options) {
    var _a4;
    const { el: { content }, parts } = this._$template;
    const fragment = ((_a4 = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a4 !== void 0 ? _a4 : d).importNode(content, true);
    walker.currentNode = fragment;
    let node = walker.nextNode();
    let nodeIndex = 0;
    let partIndex = 0;
    let templatePart = parts[0];
    while (templatePart !== void 0) {
      if (nodeIndex === templatePart.index) {
        let part;
        if (templatePart.type === CHILD_PART) {
          part = new ChildPart(node, node.nextSibling, this, options);
        } else if (templatePart.type === ATTRIBUTE_PART) {
          part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
        } else if (templatePart.type === ELEMENT_PART) {
          part = new ElementPart(node, this, options);
        }
        this._$parts.push(part);
        templatePart = parts[++partIndex];
      }
      if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
        node = walker.nextNode();
        nodeIndex++;
      }
    }
    walker.currentNode = d;
    return fragment;
  }
  _update(values) {
    let i = 0;
    for (const part of this._$parts) {
      if (part !== void 0) {
        debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
          kind: "set part",
          part,
          value: values[i],
          valueIndex: i,
          values,
          templateInstance: this
        });
        if (part.strings !== void 0) {
          part._$setValue(values, part, i);
          i += part.strings.length - 2;
        } else {
          part._$setValue(values[i]);
        }
      }
      i++;
    }
  }
};
var ChildPart = class {
  constructor(startNode, endNode, parent, options) {
    var _a4;
    this.type = CHILD_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this._$startNode = startNode;
    this._$endNode = endNode;
    this._$parent = parent;
    this.options = options;
    this.__isConnected = (_a4 = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a4 !== void 0 ? _a4 : true;
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      this._textSanitizer = void 0;
    }
  }
  get _$isConnected() {
    var _a4, _b4;
    return (_b4 = (_a4 = this._$parent) === null || _a4 === void 0 ? void 0 : _a4._$isConnected) !== null && _b4 !== void 0 ? _b4 : this.__isConnected;
  }
  get parentNode() {
    let parentNode = wrap(this._$startNode).parentNode;
    const parent = this._$parent;
    if (parent !== void 0 && (parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 11) {
      parentNode = parent.parentNode;
    }
    return parentNode;
  }
  get startNode() {
    return this._$startNode;
  }
  get endNode() {
    return this._$endNode;
  }
  _$setValue(value, directiveParent = this) {
    var _a4;
    if (DEV_MODE2 && this.parentNode === null) {
      throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
    }
    value = resolveDirective(this, value, directiveParent);
    if (isPrimitive(value)) {
      if (value === nothing || value == null || value === "") {
        if (this._$committedValue !== nothing) {
          debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
            kind: "commit nothing to child",
            start: this._$startNode,
            end: this._$endNode,
            parent: this._$parent,
            options: this.options
          });
          this._$clear();
        }
        this._$committedValue = nothing;
      } else if (value !== this._$committedValue && value !== noChange) {
        this._commitText(value);
      }
    } else if (value["_$litType$"] !== void 0) {
      this._commitTemplateResult(value);
    } else if (value.nodeType !== void 0) {
      if (DEV_MODE2 && ((_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.host) === value) {
        this._commitText(`[probable mistake: rendered a template's host in itself (commonly caused by writing \${this} in a template]`);
        console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
        return;
      }
      this._commitNode(value);
    } else if (isIterable(value)) {
      this._commitIterable(value);
    } else {
      this._commitText(value);
    }
  }
  _insert(node) {
    return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
  }
  _commitNode(value) {
    var _a4;
    if (this._$committedValue !== value) {
      this._$clear();
      if (ENABLE_EXTRA_SECURITY_HOOKS && sanitizerFactoryInternal !== noopSanitizer) {
        const parentNodeName = (_a4 = this._$startNode.parentNode) === null || _a4 === void 0 ? void 0 : _a4.nodeName;
        if (parentNodeName === "STYLE" || parentNodeName === "SCRIPT") {
          let message = "Forbidden";
          if (DEV_MODE2) {
            if (parentNodeName === "STYLE") {
              message = `Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css\`...\` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.`;
            } else {
              message = `Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.`;
            }
          }
          throw new Error(message);
        }
      }
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "commit node",
        start: this._$startNode,
        parent: this._$parent,
        value,
        options: this.options
      });
      this._$committedValue = this._insert(value);
    }
  }
  _commitText(value) {
    if (this._$committedValue !== nothing && isPrimitive(this._$committedValue)) {
      const node = wrap(this._$startNode).nextSibling;
      if (ENABLE_EXTRA_SECURITY_HOOKS) {
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(node, "data", "property");
        }
        value = this._textSanitizer(value);
      }
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "commit text",
        node,
        value,
        options: this.options
      });
      node.data = value;
    } else {
      if (ENABLE_EXTRA_SECURITY_HOOKS) {
        const textNode = d.createTextNode("");
        this._commitNode(textNode);
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(textNode, "data", "property");
        }
        value = this._textSanitizer(value);
        debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
          kind: "commit text",
          node: textNode,
          value,
          options: this.options
        });
        textNode.data = value;
      } else {
        this._commitNode(d.createTextNode(value));
        debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
          kind: "commit text",
          node: wrap(this._$startNode).nextSibling,
          value,
          options: this.options
        });
      }
    }
    this._$committedValue = value;
  }
  _commitTemplateResult(result) {
    var _a4;
    const { values, ["_$litType$"]: type } = result;
    const template = typeof type === "number" ? this._$getTemplate(result) : (type.el === void 0 && (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)), type);
    if (((_a4 = this._$committedValue) === null || _a4 === void 0 ? void 0 : _a4._$template) === template) {
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "template updating",
        template,
        instance: this._$committedValue,
        parts: this._$committedValue._$parts,
        options: this.options,
        values
      });
      this._$committedValue._update(values);
    } else {
      const instance = new TemplateInstance(template, this);
      const fragment = instance._clone(this.options);
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "template instantiated",
        template,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      instance._update(values);
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "template instantiated and updated",
        template,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      this._commitNode(fragment);
      this._$committedValue = instance;
    }
  }
  _$getTemplate(result) {
    let template = templateCache.get(result.strings);
    if (template === void 0) {
      templateCache.set(result.strings, template = new Template(result));
    }
    return template;
  }
  _commitIterable(value) {
    if (!isArray(this._$committedValue)) {
      this._$committedValue = [];
      this._$clear();
    }
    const itemParts = this._$committedValue;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      if (partIndex === itemParts.length) {
        itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
      } else {
        itemPart = itemParts[partIndex];
      }
      itemPart._$setValue(item);
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
      itemParts.length = partIndex;
    }
  }
  _$clear(start = wrap(this._$startNode).nextSibling, from) {
    var _a4;
    (_a4 = this._$notifyConnectionChanged) === null || _a4 === void 0 ? void 0 : _a4.call(this, false, true, from);
    while (start && start !== this._$endNode) {
      const n = wrap(start).nextSibling;
      wrap(start).remove();
      start = n;
    }
  }
  setConnected(isConnected) {
    var _a4;
    if (this._$parent === void 0) {
      this.__isConnected = isConnected;
      (_a4 = this._$notifyConnectionChanged) === null || _a4 === void 0 ? void 0 : _a4.call(this, isConnected);
    } else if (DEV_MODE2) {
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
    }
  }
};
var AttributePart = class {
  constructor(element, name, strings, parent, options) {
    this.type = ATTRIBUTE_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this.element = element;
    this.name = name;
    this._$parent = parent;
    this.options = options;
    if (strings.length > 2 || strings[0] !== "" || strings[1] !== "") {
      this._$committedValue = new Array(strings.length - 1).fill(new String());
      this.strings = strings;
    } else {
      this._$committedValue = nothing;
    }
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      this._sanitizer = void 0;
    }
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value, directiveParent = this, valueIndex, noCommit) {
    const strings = this.strings;
    let change = false;
    if (strings === void 0) {
      value = resolveDirective(this, value, directiveParent, 0);
      change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange;
      if (change) {
        this._$committedValue = value;
      }
    } else {
      const values = value;
      value = strings[0];
      let i, v;
      for (i = 0; i < strings.length - 1; i++) {
        v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
        if (v === noChange) {
          v = this._$committedValue[i];
        }
        change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
        if (v === nothing) {
          value = nothing;
        } else if (value !== nothing) {
          value += (v !== null && v !== void 0 ? v : "") + strings[i + 1];
        }
        this._$committedValue[i] = v;
      }
    }
    if (change && !noCommit) {
      this._commitValue(value);
    }
  }
  _commitValue(value) {
    if (value === nothing) {
      wrap(this.element).removeAttribute(this.name);
    } else {
      if (ENABLE_EXTRA_SECURITY_HOOKS) {
        if (this._sanitizer === void 0) {
          this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "attribute");
        }
        value = this._sanitizer(value !== null && value !== void 0 ? value : "");
      }
      debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
        kind: "commit attribute",
        element: this.element,
        name: this.name,
        value,
        options: this.options
      });
      wrap(this.element).setAttribute(this.name, value !== null && value !== void 0 ? value : "");
    }
  }
};
var PropertyPart = class extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = PROPERTY_PART;
  }
  _commitValue(value) {
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      if (this._sanitizer === void 0) {
        this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "property");
      }
      value = this._sanitizer(value);
    }
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit property",
      element: this.element,
      name: this.name,
      value,
      options: this.options
    });
    this.element[this.name] = value === nothing ? void 0 : value;
  }
};
var emptyStringForBooleanAttribute2 = trustedTypes2 ? trustedTypes2.emptyScript : "";
var BooleanAttributePart = class extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = BOOLEAN_ATTRIBUTE_PART;
  }
  _commitValue(value) {
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit boolean attribute",
      element: this.element,
      name: this.name,
      value: !!(value && value !== nothing),
      options: this.options
    });
    if (value && value !== nothing) {
      wrap(this.element).setAttribute(this.name, emptyStringForBooleanAttribute2);
    } else {
      wrap(this.element).removeAttribute(this.name);
    }
  }
};
var EventPart = class extends AttributePart {
  constructor(element, name, strings, parent, options) {
    super(element, name, strings, parent, options);
    this.type = EVENT_PART;
    if (DEV_MODE2 && this.strings !== void 0) {
      throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
    }
  }
  _$setValue(newListener, directiveParent = this) {
    var _a4;
    newListener = (_a4 = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a4 !== void 0 ? _a4 : nothing;
    if (newListener === noChange) {
      return;
    }
    const oldListener = this._$committedValue;
    const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
    const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit event listener",
      element: this.element,
      name: this.name,
      value: newListener,
      options: this.options,
      removeListener: shouldRemoveListener,
      addListener: shouldAddListener,
      oldListener
    });
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.name, this, oldListener);
    }
    if (shouldAddListener) {
      this.element.addEventListener(this.name, this, newListener);
    }
    this._$committedValue = newListener;
  }
  handleEvent(event) {
    var _a4, _b4;
    if (typeof this._$committedValue === "function") {
      this._$committedValue.call((_b4 = (_a4 = this.options) === null || _a4 === void 0 ? void 0 : _a4.host) !== null && _b4 !== void 0 ? _b4 : this.element, event);
    } else {
      this._$committedValue.handleEvent(event);
    }
  }
};
var ElementPart = class {
  constructor(element, parent, options) {
    this.element = element;
    this.type = ELEMENT_PART;
    this._$disconnectableChildren = void 0;
    this._$parent = parent;
    this.options = options;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value) {
    debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
      kind: "commit to element binding",
      element: this.element,
      value,
      options: this.options
    });
    resolveDirective(this, value);
  }
};
var _$LH = {
  _boundAttributeSuffix: boundAttributeSuffix,
  _marker: marker,
  _markerMatch: markerMatch,
  _HTML_RESULT: HTML_RESULT,
  _getTemplateHtml: getTemplateHtml,
  _TemplateInstance: TemplateInstance,
  _isIterable: isIterable,
  _resolveDirective: resolveDirective,
  _ChildPart: ChildPart,
  _AttributePart: AttributePart,
  _BooleanAttributePart: BooleanAttributePart,
  _EventPart: EventPart,
  _PropertyPart: PropertyPart,
  _ElementPart: ElementPart
};
var polyfillSupport2 = DEV_MODE2 ? global3.litHtmlPolyfillSupportDevMode : global3.litHtmlPolyfillSupport;
polyfillSupport2 === null || polyfillSupport2 === void 0 ? void 0 : polyfillSupport2(Template, ChildPart);
((_d2 = global3.litHtmlVersions) !== null && _d2 !== void 0 ? _d2 : global3.litHtmlVersions = []).push("2.8.0");
if (DEV_MODE2 && global3.litHtmlVersions.length > 1) {
  issueWarning2("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
var render = (value, container, options) => {
  var _a4, _b4;
  if (DEV_MODE2 && container == null) {
    throw new TypeError(`The container to render into may not be ${container}`);
  }
  const renderId = DEV_MODE2 ? debugLogRenderId++ : 0;
  const partOwnerNode = (_a4 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a4 !== void 0 ? _a4 : container;
  let part = partOwnerNode["_$litPart$"];
  debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
    kind: "begin render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  if (part === void 0) {
    const endNode = (_b4 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _b4 !== void 0 ? _b4 : null;
    partOwnerNode["_$litPart$"] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, void 0, options !== null && options !== void 0 ? options : {});
  }
  part._$setValue(value);
  debugLogEvent2 === null || debugLogEvent2 === void 0 ? void 0 : debugLogEvent2({
    kind: "end render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  return part;
};
if (ENABLE_EXTRA_SECURITY_HOOKS) {
  render.setSanitizer = setSanitizer;
  render.createSanitizer = createSanitizer;
  if (DEV_MODE2) {
    render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
  }
}

// ../../node_modules/lit-element/development/lit-element.js
var _a3;
var _b3;
var _c3;
var UpdatingElement = ReactiveElement;
var DEV_MODE3 = true;
var issueWarning3;
if (DEV_MODE3) {
  const issuedWarnings = (_a3 = globalThis.litIssuedWarnings) !== null && _a3 !== void 0 ? _a3 : globalThis.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning3 = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
}
var LitElement = class extends ReactiveElement {
  constructor() {
    super(...arguments);
    this.renderOptions = { host: this };
    this.__childPart = void 0;
  }
  createRenderRoot() {
    var _a4;
    var _b4;
    const renderRoot = super.createRenderRoot();
    (_a4 = (_b4 = this.renderOptions).renderBefore) !== null && _a4 !== void 0 ? _a4 : _b4.renderBefore = renderRoot.firstChild;
    return renderRoot;
  }
  update(changedProperties) {
    const value = this.render();
    if (!this.hasUpdated) {
      this.renderOptions.isConnected = this.isConnected;
    }
    super.update(changedProperties);
    this.__childPart = render(value, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a4;
    super.connectedCallback();
    (_a4 = this.__childPart) === null || _a4 === void 0 ? void 0 : _a4.setConnected(true);
  }
  disconnectedCallback() {
    var _a4;
    super.disconnectedCallback();
    (_a4 = this.__childPart) === null || _a4 === void 0 ? void 0 : _a4.setConnected(false);
  }
  render() {
    return noChange;
  }
};
LitElement["finalized"] = true;
LitElement["_$litElement$"] = true;
(_b3 = globalThis.litElementHydrateSupport) === null || _b3 === void 0 ? void 0 : _b3.call(globalThis, { LitElement });
var polyfillSupport3 = DEV_MODE3 ? globalThis.litElementPolyfillSupportDevMode : globalThis.litElementPolyfillSupport;
polyfillSupport3 === null || polyfillSupport3 === void 0 ? void 0 : polyfillSupport3({ LitElement });
if (DEV_MODE3) {
  LitElement["finalize"] = function() {
    const finalized2 = ReactiveElement.finalize.call(this);
    if (!finalized2) {
      return false;
    }
    const warnRemovedOrRenamed = (obj, name, renamed = false) => {
      if (obj.hasOwnProperty(name)) {
        const ctorName = (typeof obj === "function" ? obj : obj.constructor).name;
        issueWarning3(renamed ? "renamed-api" : "removed-api", `\`${name}\` is implemented on class ${ctorName}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
      }
    };
    warnRemovedOrRenamed(this, "render");
    warnRemovedOrRenamed(this, "getStyles", true);
    warnRemovedOrRenamed(this.prototype, "adoptStyles");
    return true;
  };
}
var _$LE = {
  _$attributeToProperty: (el, name, value) => {
    el._$attributeToProperty(name, value);
  },
  _$changedProperties: (el) => el._$changedProperties
};
((_c3 = globalThis.litElementVersions) !== null && _c3 !== void 0 ? _c3 : globalThis.litElementVersions = []).push("3.3.3");
if (DEV_MODE3 && globalThis.litElementVersions.length > 1) {
  issueWarning3("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}

// ../../node_modules/lit-html/development/is-server.js
var NODE_MODE4 = false;
var isServer = NODE_MODE4;
export {
  CSSResult,
  LitElement,
  ReactiveElement,
  UpdatingElement,
  _$LE,
  _$LH,
  adoptStyles,
  css,
  defaultConverter,
  getCompatibleStyle,
  html,
  isServer,
  noChange,
  notEqual,
  nothing,
  render,
  supportsAdoptingStyleSheets,
  svg,
  unsafeCSS
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=lit.js.map
