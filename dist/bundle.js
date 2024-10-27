/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "node:module";
/******/ var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_http_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/http_server */ \"./src/http_server/index.ts\");\n/* harmony import */ var _src_ws_webSocketServer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/ws/webSocketServer */ \"./src/ws/webSocketServer.ts\");\n\n\nconst HTTP_PORT = process.env.HTTP_PORT || 8181;\nconsole.log(`Start static http server on the ${HTTP_PORT} port!`);\n_src_http_server__WEBPACK_IMPORTED_MODULE_0__.httpServer.listen(HTTP_PORT);\n(0,_src_ws_webSocketServer__WEBPACK_IMPORTED_MODULE_1__.setupWebSocketServer)();\n\n\n//# sourceURL=webpack://ws_task/./index.ts?");

/***/ }),

/***/ "./src/http_server/index.ts":
/*!**********************************!*\
  !*** ./src/http_server/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   httpServer: () => (/* binding */ httpServer)\n/* harmony export */ });\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst httpServer = http__WEBPACK_IMPORTED_MODULE_2__.createServer(function (req, res) {\n    const __dirname = path__WEBPACK_IMPORTED_MODULE_1__.resolve();\n    const file_path = path__WEBPACK_IMPORTED_MODULE_1__.join(__dirname, req.url === '/' ? 'front/index.html' : 'front' + req.url);\n    fs__WEBPACK_IMPORTED_MODULE_0__.readFile(file_path, function (err, data) {\n        if (err) {\n            res.writeHead(404);\n            res.end(JSON.stringify(err));\n            return;\n        }\n        res.writeHead(200);\n        res.end(data);\n    });\n});\n//httpServer receives data and print it to console\nhttpServer.on('data', (data) => {\n    console.log(data.toString());\n});\n\n\n//# sourceURL=webpack://ws_task/./src/http_server/index.ts?");

/***/ }),

/***/ "./src/ws/webSocketServer.ts":
/*!***********************************!*\
  !*** ./src/ws/webSocketServer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupWebSocketServer: () => (/* binding */ setupWebSocketServer)\n/* harmony export */ });\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ws */ \"ws\");\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction setupWebSocketServer() {\n    const wsHttpServer = http__WEBPACK_IMPORTED_MODULE_0__.createServer();\n    const wss = new ws__WEBPACK_IMPORTED_MODULE_1__.WebSocketServer({ server: wsHttpServer });\n    wsHttpServer.listen(3000, () => {\n        console.log('WebSocket server is running on port 3000');\n    });\n    wss.on('connection', (ws) => {\n        console.log('New player connected');\n        // WebSocket receives data and print it to console\n        ws.on('message', (data) => {\n            console.log(`Received message: ${data}`);\n            const message = JSON.parse(data.toString());\n            ws.send(JSON.stringify({\n                type: 'reg',\n                data: JSON.stringify({\n                    name: \"Player\",\n                    error: false,\n                    errorText: \"\"\n                })\n            }));\n            if (message.type === 'move') {\n                console.log(`Player move: ${message.data}`);\n                // Рассылаем ход всем клиентам\n                wss.clients.forEach((client) => {\n                    if (client.readyState === ws__WEBPACK_IMPORTED_MODULE_1__.WebSocket.OPEN) {\n                        client.send(JSON.stringify({ type: 'move', data: message.data }));\n                    }\n                });\n            }\n        });\n        ws.on('close', () => {\n            console.log('Player disconnected');\n        });\n    });\n}\n\n\n//# sourceURL=webpack://ws_task/./src/ws/webSocketServer.ts?");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("ws");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("path");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 
