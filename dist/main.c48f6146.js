// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"C:/Users/CHAE-EUN/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"C:/Users/CHAE-EUN/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"C:/Users/CHAE-EUN/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"C:/Users/CHAE-EUN/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/js/main.js":[function(require,module,exports) {
"use strict";

require("../scss/main.scss");

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var X_IMAGE = "/x.93083e62.svg";
/*
1. Card Delete
 - X 버튼을 눌렀을 때, 카드가 삭제됨.

2. Category Create
 - 카테고리를 입력하고 + 버튼을 눌렀을 때, 카테고리가 생성됨.
 - 이름을 비워놓았으면 알람, 이미 존재하는 카테고리면 알람

3. Modal Show
 - 카테고리에 있는 + 버튼을 눌렀을 때, 모달을 보여줌

4. Modal Close
 - 모달에서 취소를 눌렀을 때, 모달을 숨김

5. Options Create
 - 모달에서 셀렉트 박스의 옵션을 채워넣기

6. Card Create
 - 모달에서 저장을 했을 때, 카드가 생성됨

7. Category Delete
 - 카테고리 이름을 비웠을 때, 카테고리 삭제
 - 확인 메세지를 통해 삭제 여부 확인

 
8. LocalStorage Load
 - 로컬스토리지에서 투두리스트 불러오기
 - example) {"개발":[{"title":"자스민 2주차 과제","description":"노마드 코더 메인페이지 클로닝 하기"},{"title":"자스민 1주차 과제","description":"유튜브 메인페이지 클로닝 하기"}],"집안일":[{"title":"장보기","description":"세제, 치약 사기"},{"title":"설거지","description":"라면 포트 설거지하기"},{"title":"청소","description":"화장실 청소하기"}],"업무":[{"title":"프론트 작업","description":"모바일 프론트 작업 및 리팩토링"}]}

9. Event Check
 - 새로 생성되는 객체에 대해 이벤트 달아주기

10. LocalStorage Update
 - 투두리스트에 변경점이 생길 때마다 로컬스토리지를 업데이트

11. Auto Increse Textarea
 - 자동으로 높이가 늘어나는 Textarea
*/

window.onload = function () {
  var cardDeleteBtn = document.querySelectorAll(".card .delete-btn");
  /*DOM선택*/

  console.log(cardDeleteBtn);
  cardDeleteBtn.forEach(function (cardDeleteBtn) {
    /*클릭했을때 원소 삭제 이벤트*/
    cardDeleteBtn.addEventListener("click", cardDeleteHandler);
  });
  var categoryAddBtn = document.querySelector(".category-add-btn");
  /* 버튼 하나만 존재해서 all안붙임 */

  categoryAddBtn.addEventListener("click", categoryAddHandler);
  var cardAddBtns = document.querySelectorAll(".column .add-btn");
  cardAddBtns.forEach(function (cardAddBtn) {
    cardAddBtn.addEventListener("click", showModalHandler);
  });
  var cancelBtn = document.querySelector(".modal .cancel-btn");
  cancelBtn.addEventListener("click", closeModalHandler);
  var cardAddBtn = document.querySelector(".modal .save-btn");
  cardAddBtn = (_readOnlyError("cardAddBtn"), addEventListener("click", cardAddHandler));
  var categoryInputs = document.querySelectorAll(".column .category");
  categoryInputs.forEach(function (categoryInput) {
    categoryInput.addEventListener("change", changeCategoryHandler);
  });
  loadLocalStorage();
};
/* 1 (삭제) */


var findTargetClass = function findTargetClass(node, targetClass) {
  /*노드를 가지고 있는지 판단*/
  while (node.classList.contains(targetClass) == false) {
    node = node.parentNode;
  }

  return node;
};

var cardDeleteHandler = function cardDeleteHandler(event) {
  var card = findTargetClass(event.target, "card");
  card.remove();
};
/* end 1 */

/* 2 (카테고리 추가) */


var createColumn = function createColumn(categoryTitle) {
  //valina js로 만들어주기
  var column = document.createElement("div");
  column.classList.add("column");
  var todoCategory = document.createElement("div");
  todoCategory.classList.add("todo-category");
  var categoryInput = document.createElement("input");
  categoryInput.classList.add("category");
  categoryInput.value = categoryTitle;
  var addBt = document.createElement("img");
  addBt.classList.add("add-btn");
  addBt.src = X_IMAGE; //합쳐주는 작업

  todoCategory.appendChild(categoryInput);
  todoCategory.appendChild(addBt);
  column.appendChild(todoCategory);
  return column;
};

var categoryAddHandler = function categoryAddHandler() {
  //(1) input 값을 가져오기
  var categoryTitle = document.querySelector("input.category-title"); //input태으이면서 cartegory-title인

  console.log(categoryTitle.value); //(2) 값 검증 : 이름 없을 때, 중복되는 이름 있을때

  if (categoryTitle.value == "") {
    alert("카테고리 이름을 작성해주세요.");
    return;
  }

  var categories = document.querySelectorAll(".column .category");

  for (var i = 0; i < categories.length; i++) {
    if (categories[i].value == categoryTitle.value) {
      alert("이미 존재하는 카테고리입니다.");
      return;
    }
  } //(3) 컬럼 만들기


  var column = createColumn(categoryTitle.value);
  var todoContainer = document.querySelector(".todo-container");
  todoContainer.appendChild(column);
};
/* end 2 */

/* 5 */


var findCategory = function findCategory(event) {
  //DOM객체 안에서 querySelector사용하면 DOM객체 안의 것만 return
  var currentInput = event.target.parentNode.querySelector(".category");
  return currentInput.value;
};

var updateSelectbox = function updateSelectbox(event) {
  var selectBox = document.querySelector(".modal select");
  selectBox.innerText = "";
  var categories = document.querySelectorAll(".column .category");
  categories.forEach(function (category) {
    var categoryOption = document.createElement("option");
    categoryOption.innerText = category.value;
    selectBox.appendChild(categoryOption);
  }); //카테고리 이름을 클릭한 카테고리로 바꾸기

  var currentCategory = findCategory(event);
  selectBox.value = currentCategory;
};
/* end 5 */

/* 3 */


var showModalHandler = function showModalHandler(event) {
  var modalContainer = document.querySelector(".modal-container");
  var body = document.querySelector("body");
  console.log(modalContainer); //css에 display none걸어준거 삭제

  modalContainer.classList.remove("dp-none"); //스크롤 삭제, 원래 스크롤 위치에서 모달 보여줌

  modalContainer.style.top = '${window.scrollY}px';
  body.classList.add("stop-scroll");
  updateSelectbox(event);
};
/* 4 */


var closeModalHandler = function closeModalHandler() {
  var modalContainer = document.querySelector(".modal-container");
  var body = document.querySelector("body"); //css에 display none걸어준거 복구

  modalContainer.classList.add("dp-none"); //스크롤 복구

  body.classList.remove("stop-scroll");
};
/* end 4 */

/* 6 */
//저장버튼 안눌림!!!!


var createCard = function createCard(titleValue, DescValue) {
  var card = document.createElement("div");
  card.classList.add("card");
  var deleteBtn = document.createElement("img");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.src = X_IMAGE;
  var cardTitle = document.createElement("input");
  cardTitle.classList.add("title");
  cardTitle.value = titleValue;
  var divider = document.createElement("div");
  deleteBtn.classList.add("divider");
  var cardDescription = document.createElement("textarea");
  cardDescription.classList.add("description");
  cardDescription.value = DescValue;
  card.appendChild(deleteBtn);
  card.appendChild(cardTitle);
  card.appendChild(divider);
  card.appendChild(cardDescription);
  return card;
};

var addToCategory = function addToCategory(categoryValue, card) {
  var columns = document.querySelectorAll(".column");

  for (var i = 0; i < columns.length; i++) {
    var category = columns[i].querySelector(".category").value;

    if (categoryValue == category) {
      columns[i].appendChild(category);
      break;
    }
  }
};

var cardAddHandler = function cardAddHandler() {
  var selectBox = document.querySelector("modal select");
  var cardTitleInput = document.querySelector("modal input");
  var cardDescTextarea = document.querySelector("modal textarea");
  var card = createCard(cardTitleInput.value, cardDescTextarea.value);
  addToCategory(selectBox.value, card);
  closeModalHandler();
  selectBox.value = "";
  cardTitleInput.value = "";
  cardDescTextarea.value = "";
};
/* end 6 */

/* 7 */


var changeCategoryHandler = function changeCategoryHandler(event) {
  if (event.target.value == "") {
    var deleteConfirm = confirm("정말 카테고리를 삭제하시겠습니까???"); //확인 = return true, 취소 = return false

    if (deleteConfirm) {
      var column = findTargetClass(event.target, "column");
      column.remove();
    } else {
      event.target.focus(); //커서가 남는다.
    }
  }
};
/* end 7 */

/*8 페이지 저장하기*/


var loadLocalStorage = function loadLocalStorage() {
  var todoLists = localStorage.TODO_LIST;
  todoLists = JSON.parse(todoLists);
  todocontainer = document.querySelector(".todo-container");

  var _loop = function _loop() {
    console.log(category);
    console.log(todoLists[category]);
    var todoList = todoLists[category];
    var column = createColumn(category);
    todoList.forEach(function (todo) {
      var card = createCard(todo.title, todo.description);
      column.appendChild(card);
    });
    todoContainer.appendChild(column);
  };

  for (var category in todoList) {
    _loop();
  }
};
/*end 8*/
},{"../scss/main.scss":"src/scss/main.scss"}],"C:/Users/CHAE-EUN/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52689" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/CHAE-EUN/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/main.js"], null)
//# sourceMappingURL=/main.c48f6146.js.map