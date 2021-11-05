/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "de9beceb2d83b913121c";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/loader/src/components/app.js":
/*!***********************************************!*\
  !*** ./examples/loader/src/components/app.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var san__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js");
  /* harmony import */ var san__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(san__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./examples/loader/src/utils.js");
  /* harmony import */ var san_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! san-store */ "./node_modules/san-store/dist/san-store.source.js");
  /* harmony import */ var san_store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(san_store__WEBPACK_IMPORTED_MODULE_2__);
  /* harmony import */ var _store_register_store_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/register-store-actions */ "./examples/loader/src/store/register-store-actions.js");
  /* harmony import */ var _child__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./child */ "./examples/loader/src/components/child.js");
  /* harmony import */ var _simple_child_san__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./simple-child.san */ "./examples/loader/src/components/simple-child.san.js");
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file app.js
   * @author clark-t
   */
  
  
  
  
  
   // 测试 identifier 各种赋值是否能够检测成功
  
  let sanRefer = san__WEBPACK_IMPORTED_MODULE_0___default.a;
  let {
    defineComponent: defineComp
  } = sanRefer;
  let def = defineComp;
  let component = def({
    template: `
          <div>
              <button on-click="count">hello {{name}}, click {{num || 0}} times</button>
              <child></child>
              <simple-child></simple-child>
              <div>haha</div>
          </div>
      `,
    initData: function () {
      return {
        name: 'App'
      };
    },
    attached: function () {
      _utils__WEBPACK_IMPORTED_MODULE_1__["default"].hello();
    },
    count: function () {
      san_store__WEBPACK_IMPORTED_MODULE_2__["store"].dispatch('count', (this.data.get('num') || 0) + 1);
    },
    components: {
      'child': _child__WEBPACK_IMPORTED_MODULE_4__["default"],
      'simple-child': _simple_child_san__WEBPACK_IMPORTED_MODULE_5__["default"]
    }
  });
  /* harmony default export */ __webpack_exports__["default"] = (san_store__WEBPACK_IMPORTED_MODULE_2__["connect"].san({
    num: 'num'
  })(component));
  console.log('App Loaded');
      if (true) {
          var __HOT_API__ = __webpack_require__(/*! ./lib/runtime/component-client-api.js */ "./lib/runtime/component-client-api.js");
          var __HOT_UTILS__ = __webpack_require__(/*! ./lib/runtime/utils.js */ "./lib/runtime/utils.js");
  
          var __SAN_COMPONENT__ = __HOT_UTILS__.getExports(module);
          if (__SAN_COMPONENT__.template || __SAN_COMPONENT__.prototype.template) {
              module.hot.accept();
              __HOT_API__.install(__webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js"));
  
              var __HMR_ID__ = '1cb4f819';
              if (!module.hot.data) {
                  __HOT_API__.createRecord(__HMR_ID__, __SAN_COMPONENT__);
              }
              else {
                  __HOT_API__.hotReload(__HMR_ID__, __SAN_COMPONENT__);
              }
          }
      }
      
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
  
  /***/ }),
  
  /***/ "./examples/loader/src/components/child-template.js":
  /*!**********************************************************!*\
    !*** ./examples/loader/src/components/child-template.js ***!
    \**********************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file child-template.js
   * @author clark-t
   */
  /* harmony default export */ __webpack_exports__["default"] = (`
  <div>
      <p>this is a {{name}} and click {{num}} times</p>
      <button on-click="clicked">click child</button>
  </div>
  `);
  
  /***/ }),
  
  /***/ "./examples/loader/src/components/child.js":
  /*!*************************************************!*\
    !*** ./examples/loader/src/components/child.js ***!
    \*************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* WEBPACK VAR INJECTION */(function(module) {function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file child.js
   * @author clark-t
   */
  let san = __webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js");
  
  let sanStore = __webpack_require__(/*! san-store */ "./node_modules/san-store/dist/san-store.source.js");
  
  let store = __webpack_require__(/*! ../store/custom.store */ "./examples/loader/src/store/custom.store.js");
  
  let template = __webpack_require__(/*! ./child-template */ "./examples/loader/src/components/child-template.js");
  
  store = store.__esModule ? store.default : store;
  template = template.__esModule ? template.default : template;
  let connect = sanStore.connect;
  
  class Child extends san.Component {
    initData() {
      return {
        name: 'Child'
      };
    }
  
    clicked() {
      this.actions.inc(this.data.get('num'));
    }
  
  }
  
  _defineProperty(Child, "template", template);
  
  let connector = connect.createConnector(store);
  /* harmony default export */ __webpack_exports__["default"] = (connector({
    num: 'num'
  }, {
    inc: 'inc'
  })(Child)); // console.log(Object.getPrototypeOf(module.exports) === san.Component)
  // console.log(Object.getPrototypeOf(Child) === san.Component)
  // console.log(store instanceof sanStore.Store)
  // console.log('Child Loaded');
      if (true) {
          var __HOT_API__ = __webpack_require__(/*! ./lib/runtime/component-client-api.js */ "./lib/runtime/component-client-api.js");
          var __HOT_UTILS__ = __webpack_require__(/*! ./lib/runtime/utils.js */ "./lib/runtime/utils.js");
  
          var __SAN_COMPONENT__ = __HOT_UTILS__.getExports(module);
          if (__SAN_COMPONENT__.template || __SAN_COMPONENT__.prototype.template) {
              module.hot.accept();
              __HOT_API__.install(__webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js"));
  
              var __HMR_ID__ = '39482b04';
              if (!module.hot.data) {
                  __HOT_API__.createRecord(__HMR_ID__, __SAN_COMPONENT__);
              }
              else {
                  __HOT_API__.hotReload(__HMR_ID__, __SAN_COMPONENT__);
              }
          }
      }
      
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
  
  /***/ }),
  
  /***/ "./examples/loader/src/components/simple-child.san.js":
  /*!************************************************************!*\
    !*** ./examples/loader/src/components/simple-child.san.js ***!
    \************************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleChild; });
  /* harmony import */ var san__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js");
  /* harmony import */ var san__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(san__WEBPACK_IMPORTED_MODULE_0__);
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file simple-child.san.js
   * @author clark-t
   */
  
  class SimpleChild extends san__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    initData() {
      return {
        name: 'SimpleChild'
      };
    }
  
  }
  
  _defineProperty(SimpleChild, "template", '<div>This is  {{name}}</div>');
  
  console.log('SimpleChild Loaded');
      if (true) {
          var __HOT_API__ = __webpack_require__(/*! ./lib/runtime/component-client-api.js */ "./lib/runtime/component-client-api.js");
          var __HOT_UTILS__ = __webpack_require__(/*! ./lib/runtime/utils.js */ "./lib/runtime/utils.js");
  
          var __SAN_COMPONENT__ = __HOT_UTILS__.getExports(module);
          if (__SAN_COMPONENT__.template || __SAN_COMPONENT__.prototype.template) {
              module.hot.accept();
              __HOT_API__.install(__webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js"));
  
              var __HMR_ID__ = '8e963f3e';
              if (!module.hot.data) {
                  __HOT_API__.createRecord(__HMR_ID__, __SAN_COMPONENT__);
              }
              else {
                  __HOT_API__.hotReload(__HMR_ID__, __SAN_COMPONENT__);
              }
          }
      }
      
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
  
  /***/ }),
  
  /***/ "./examples/loader/src/index.js":
  /*!**************************************!*\
    !*** ./examples/loader/src/index.js ***!
    \**************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  var san = __webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js");
  
  var App = __webpack_require__(/*! ./components/app */ "./examples/loader/src/components/app.js");
  
  App = App.__esModule ? App.default : App;
  var app = new App();
  app.attach(document.body);
  
  /***/ }),
  
  /***/ "./examples/loader/src/store/custom-store-actions.js":
  /*!***********************************************************!*\
    !*** ./examples/loader/src/store/custom-store-actions.js ***!
    \***********************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */ var san_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! san-update */ "./node_modules/san-update/index.min.js");
  /* harmony import */ var san_update__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(san_update__WEBPACK_IMPORTED_MODULE_0__);
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file custom-store-actions.js
   * @author clark-t
   */
  
  /* harmony default export */ __webpack_exports__["default"] = ({
    inc: function (num) {
      return Object(san_update__WEBPACK_IMPORTED_MODULE_0__["builder"])().set('num', num + 10);
    },
    dec: function (num) {
      return Object(san_update__WEBPACK_IMPORTED_MODULE_0__["builder"])().set('num', num - 1);
    }
  });
  console.log('Custom Store Action Loaded');
  
  /***/ }),
  
  /***/ "./examples/loader/src/store/custom.store.js":
  /*!***************************************************!*\
    !*** ./examples/loader/src/store/custom.store.js ***!
    \***************************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var san_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! san-store */ "./node_modules/san-store/dist/san-store.source.js");
  /* harmony import */ var san_store__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(san_store__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var _custom_store_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-store-actions */ "./examples/loader/src/store/custom-store-actions.js");
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file custom.store.js
   * @author clark-t
   */
  
  
  /* harmony default export */ __webpack_exports__["default"] = (new san_store__WEBPACK_IMPORTED_MODULE_0__["Store"]({
    initData: {
      num: 0
    },
    actions: _custom_store_actions__WEBPACK_IMPORTED_MODULE_1__["default"]
  }));
  console.log('Custom Store Loaded');
      if (true) {
          var __SAN_STORE_ID__ = '5b778822';
          var __SAN_STORE_CLIENT_API__ = __webpack_require__(/*! ./lib/runtime/store-client-api.js */ "./lib/runtime/store-client-api.js");
          var __UTILS__ = __webpack_require__(/*! ./lib/runtime/utils.js */ "./lib/runtime/utils.js");
          module.hot.accept();
          var __SAN_STORE_INSTANCE__ = __UTILS__.getExports(module) || __webpack_require__(/*! san-store */ "./node_modules/san-store/dist/san-store.source.js").store;
          __SAN_STORE_CLIENT_API__.update(__SAN_STORE_ID__, __SAN_STORE_INSTANCE__);
      }
      
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
  
  /***/ }),
  
  /***/ "./examples/loader/src/store/register-store-actions.js":
  /*!*************************************************************!*\
    !*** ./examples/loader/src/store/register-store-actions.js ***!
    \*************************************************************/
  /*! no exports provided */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var san_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! san-update */ "./node_modules/san-update/index.min.js");
  /* harmony import */ var san_update__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(san_update__WEBPACK_IMPORTED_MODULE_0__);
  /* harmony import */ var san_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! san-store */ "./node_modules/san-store/dist/san-store.source.js");
  /* harmony import */ var san_store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(san_store__WEBPACK_IMPORTED_MODULE_1__);
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file register-store-actions.js
   * @author clark-t
   */
  
  
  san_store__WEBPACK_IMPORTED_MODULE_1__["store"].addAction('count', function (num) {
    return Object(san_update__WEBPACK_IMPORTED_MODULE_0__["builder"])().set('num', num);
  });
  console.log('Register Store Actions Loaded');
      if (true) {
          var __SAN_STORE_ID__ = '65798868';
          var __SAN_STORE_CLIENT_API__ = __webpack_require__(/*! ./lib/runtime/store-client-api.js */ "./lib/runtime/store-client-api.js");
          var __UTILS__ = __webpack_require__(/*! ./lib/runtime/utils.js */ "./lib/runtime/utils.js");
          module.hot.accept();
          var __SAN_STORE_INSTANCE__ = __UTILS__.getExports(module) || __webpack_require__(/*! san-store */ "./node_modules/san-store/dist/san-store.source.js").store;
          __SAN_STORE_CLIENT_API__.update(__SAN_STORE_ID__, __SAN_STORE_INSTANCE__);
      }
      
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
  
  /***/ }),
  
  /***/ "./examples/loader/src/utils.js":
  /*!**************************************!*\
    !*** ./examples/loader/src/utils.js ***!
    \**************************************/
  /*! exports provided: default */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file utils.js
   * @author clark-t
   */
  /* harmony default export */ __webpack_exports__["default"] = ({
    hello: function () {
      console.log('== this is utils ==');
    }
  });
  
  /***/ }),
  
  /***/ "./lib/runtime/component-client-api.js":
  /*!*********************************************!*\
    !*** ./lib/runtime/component-client-api.js ***!
    \*********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(global) {/**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file component-client-api.js
   * @author clark-t
   */
  var utils = __webpack_require__(/*! ./utils */ "./lib/runtime/utils.js");
  
  var San;
  var map = {};
  var compatible;
  global.__SAN_HOT_MAP__ = map;
  
  function install(san) {
    if (compatible == null) {
      San = utils.esm(san);
      var versions = San.version.split('.');
      compatible = +versions[0] > 3 || +versions[1] > 8 || +versions[2] > 0;
    }
  
    if (!compatible) {
      throw new Error('[HMR] You are using a version of san-hot-loader that is ' + 'only compatible with san.js ^3.8.1');
    }
  }
  
  function createRecord(id, ComponentClass) {
    var desc = makeComponentHot(id, ComponentClass);
    map[id] = {
      Ctor: desc.Ctor,
      proto: desc.proto,
      instances: []
    };
  }
  
  var SAN_HOOK_ORIGIN = '__SAN_HOOK_ORIGIN__';
  
  function injectHook(options, name, callback) {
    var existing = options[name]; // 防止多次热更新之后出现套娃
  
    if (existing && existing[SAN_HOOK_ORIGIN]) {
      return;
    }
  
    options[name] = existing ? function () {
      existing.call(this);
      callback.call(this);
    } : callback;
    options[name][SAN_HOOK_ORIGIN] = true;
  }
  
  function makeComponentHot(id, ComponentClass) {
    ComponentClass = utils.esm(ComponentClass);
    var proto;
    var Ctor;
  
    if (typeof ComponentClass === 'function') {
      proto = ComponentClass.prototype;
      Ctor = ComponentClass;
    } else {
      proto = ComponentClass;
      Ctor = San.defineComponent(proto);
    }
  
    injectHook(proto, 'attached', function () {
      map[id].instances.push(this);
    });
    injectHook(proto, 'detached', function () {
      var instances = map[id].instances;
      instances.splice(instances.indexOf(this), 1);
    });
    return {
      proto: proto,
      Ctor: Ctor
    };
  }
  
  function hotReload(id, ComponentClass) {
    var newDesc = makeComponentHot(id, ComponentClass);
    var recDesc = map[id];
    var recANode;
    var recCmptReady;
    var newANode;
    var newCmptReady; // 热更新新旧组件构造函数相同的例子如下：
    // import template from './template.html'；
    // import ComponentClass from './app';
    // ComponentClass.template = template;
    // export default ComponentClass;
    //
    // 在单纯修改 template 的时候，热更新时新旧组件指向都是 ComponentClass 的地址，在这种情况下，需要采用特殊手段将 ComponentClass 的 template 和对应的 aNode 更新掉
  
    if (!isProtoChange(newDesc, recDesc)) {
      recANode = recDesc.proto.aNode;
      recCmptReady = recDesc.proto._cmptReady;
    }
  
    recDesc.Ctor = newDesc.Ctor;
    recDesc.proto = newDesc.proto;
    recDesc.instances.slice().forEach(function (instance) {
      var parentEl = instance.el.parentElement;
      var beforeEl = instance.el.nextElementSibling;
      var options = {
        subTag: instance.subTag,
        owner: instance.owner,
        scope: instance.scope,
        parent: instance.parent,
        source: instance.source
      };
      var newInstance;
  
      if (recANode != null) {
        recDesc.proto.aNode = recANode;
        recDesc.proto._cmptReady = recCmptReady;
        instance.dispose();
  
        if (newANode == null) {
          delete newDesc.proto.aNode;
          delete newDesc.proto._cmptReady;
        } else {
          newDesc.proto.aNode = newANode;
          newDesc.proto._cmptReady = newCmptReady;
        }
  
        newInstance = new newDesc.Ctor(options);
        newInstance.attach(parentEl, beforeEl);
  
        if (newANode == null) {
          newANode = newDesc.proto.aNode;
          newCmptReady = newDesc.proto._cmptReady;
        }
      } else {
        instance.dispose();
        newInstance = new newDesc.Ctor(options);
        newInstance.attach(parentEl, beforeEl); // 将父节点当中缓存的子组件实例给手动替换掉
        // 不然父组件往子组件里绑定的数据就不再变化了
  
        if (instance.parent) {
          instance.parentComponent.constructor.prototype.components[instance.subTag] = newDesc.Ctor;
          var parent = instance.parent;
          parent.children.splice(parent.children.indexOf(instance), 1, newInstance);
        }
      }
    });
  }
  
  function isProtoChange(newDesc, recDesc) {
    if (recDesc.Ctor === newDesc.Ctor) {
      return false;
    }
  
    var recProto = recDesc.proto;
    var newProto = newDesc.proto;
  
    if (recProto.constructor === newProto.constructor && recProto.constructor != null) {
      return false;
    }
  
    return true;
  }
  
  module.exports = {
    install: install,
    createRecord: createRecord,
    hotReload: hotReload,
    compatible: compatible
  };
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))
  
  /***/ }),
  
  /***/ "./lib/runtime/store-client-api.js":
  /*!*****************************************!*\
    !*** ./lib/runtime/store-client-api.js ***!
    \*****************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file store-client-api.js
   * @author clark-t
   */
  var actionCache = {};
  var storeCache = {};
  var initDataCache = {};
  
  function wrapStore(id, store) {
    if (actionCache[id]) {
      return;
    }
  
    actionCache[id] = {}; // 这里的bind方法会报错，'bind' of undefined,暂时还没有想到很好的方法解决这个问题
  
    var originalAddAction = store.addAction.bind(store);
  
    store.addAction = function (name, callback) {
      if (store.actions[name] && !actionCache[id][name]) {
        store.actions[name] = null;
        actionCache[id][name] = true;
      }
  
      originalAddAction(name, callback);
    };
  }
  
  function updateStore(id, store) {
    if (!storeCache[id]) {
      wrapStore(id, store);
      storeCache[id] = store;
      initDataCache[id] = deepClone(store.raw);
      done(id);
      return;
    }
  
    if (storeCache[id] === store) {
      done(id);
      return;
    }
  
    var newData = store.raw;
    var newActions = store.actions;
    var savedStore = storeCache[id];
    var savedData = initDataCache[id];
  
    if (!equal(newData, savedData)) {
      throw Error('san-store initData changed');
    }
  
    var actionNames = Object.keys(newActions);
  
    for (var i = 0; i < actionNames.length; i++) {
      var name = actionNames[i];
      savedStore.addAction(name, newActions[name]);
    }
  
    done(id);
  }
  
  function done(id) {
    actionCache[id] = {};
  }
  
  function getProto(obj) {
    return Object.prototype.toString.call(obj);
  }
  
  function equal(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
  
    if (Array.isArray(obj1)) {
      if (!Array.isArray(obj2)) {
        return false;
      }
  
      if (obj1.length !== obj2.length) {
        return false;
      }
  
      for (var i = 0; i < obj1.length; i++) {
        if (!equal(obj1[i], obj2[i])) {
          return false;
        }
      }
  
      return true;
    }
  
    var proto1 = getProto(obj1);
    var proto2 = getProto(obj2);
  
    if (proto1 !== proto2) {
      return false;
    } // 这里得考虑一下 对于 data 中存了 Set Map Date RegExp 这种类型的情况
  
  
    if (proto1 !== '[object Object]') {
      return false;
    }
  
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (var j = 0; j < keys1.length; j++) {
      if (keys1[j] !== keys2[j]) {
        return false;
      }
  
      var key = keys1[j];
  
      if (!equal(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }
  
  function deepClone(obj) {
    if (Array.isArray(obj)) {
      var arr = [];
  
      for (var i = 0; i < obj.length; i++) {
        arr.push(deepClone(obj[i]));
      }
  
      return arr;
    }
  
    var proto = getProto(obj); // 只对 Object 做深拷贝
  
    if (proto !== '[object Object]') {
      return obj;
    }
  
    var clone = {};
    var keys = Object.keys(obj);
  
    for (var j = 0; j < keys.length; j++) {
      var key = keys[j];
      clone[key] = deepClone(obj[key]);
    }
  
    return clone;
  }
  
  module.exports = {
    update: updateStore
  };
  
  /***/ }),
  
  /***/ "./lib/runtime/utils.js":
  /*!******************************!*\
    !*** ./lib/runtime/utils.js ***!
    \******************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  /**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file runtime utils
   * @author clark-t
   */
  function esm(obj) {
    return obj.__esModule ? obj.default : obj;
  }
  
  function getExports(mod) {
    return esm(mod.exports || Object.getPrototypeOf(mod).exports);
  }
  
  module.exports = {
    esm: esm,
    getExports: getExports
  };
  
  /***/ }),
  
  /***/ "./node_modules/ansi-html/index.js":
  /*!*****************************************!*\
    !*** ./node_modules/ansi-html/index.js ***!
    \*****************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  module.exports = ansiHTML; // Reference to https://github.com/sindresorhus/ansi-regex
  
  var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
  var _defColors = {
    reset: ['fff', '000'],
    // [FOREGROUD_COLOR, BACKGROUND_COLOR]
    black: '000',
    red: 'ff0000',
    green: '209805',
    yellow: 'e8bf03',
    blue: '0000ff',
    magenta: 'ff00ff',
    cyan: '00ffee',
    lightgrey: 'f0f0f0',
    darkgrey: '888'
  };
  var _styles = {
    30: 'black',
    31: 'red',
    32: 'green',
    33: 'yellow',
    34: 'blue',
    35: 'magenta',
    36: 'cyan',
    37: 'lightgrey'
  };
  var _openTags = {
    '1': 'font-weight:bold',
    // bold
    '2': 'opacity:0.5',
    // dim
    '3': '<i>',
    // italic
    '4': '<u>',
    // underscore
    '8': 'display:none',
    // hidden
    '9': '<del>' // delete
  
  };
  var _closeTags = {
    '23': '</i>',
    // reset italic
    '24': '</u>',
    // reset underscore
    '29': '</del>' // reset delete
  
  };
  [0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
    _closeTags[n] = '</span>';
  });
  /**
   * Converts text with ANSI color codes to HTML markup.
   * @param {String} text
   * @returns {*}
   */
  
  function ansiHTML(text) {
    // Returns the text if the string has no ANSI escape code.
    if (!_regANSI.test(text)) {
      return text;
    } // Cache opened sequence.
  
  
    var ansiCodes = []; // Replace with markup.
  
    var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
      var ot = _openTags[seq];
  
      if (ot) {
        // If current sequence has been opened, close it.
        if (!!~ansiCodes.indexOf(seq)) {
          // eslint-disable-line no-extra-boolean-cast
          ansiCodes.pop();
          return '</span>';
        } // Open tag.
  
  
        ansiCodes.push(seq);
        return ot[0] === '<' ? ot : '<span style="' + ot + ';">';
      }
  
      var ct = _closeTags[seq];
  
      if (ct) {
        // Pop sequence
        ansiCodes.pop();
        return ct;
      }
  
      return '';
    }); // Make sure tags are closed.
  
    var l = ansiCodes.length;
    l > 0 && (ret += Array(l + 1).join('</span>'));
    return ret;
  }
  /**
   * Customize colors.
   * @param {Object} colors reference to _defColors
   */
  
  
  ansiHTML.setColors = function (colors) {
    if (typeof colors !== 'object') {
      throw new Error('`colors` parameter must be an Object.');
    }
  
    var _finalColors = {};
  
    for (var key in _defColors) {
      var hex = colors.hasOwnProperty(key) ? colors[key] : null;
  
      if (!hex) {
        _finalColors[key] = _defColors[key];
        continue;
      }
  
      if ('reset' === key) {
        if (typeof hex === 'string') {
          hex = [hex];
        }
  
        if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
          return typeof h !== 'string';
        })) {
          throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000');
        }
  
        var defHexColor = _defColors[key];
  
        if (!hex[0]) {
          hex[0] = defHexColor[0];
        }
  
        if (hex.length === 1 || !hex[1]) {
          hex = [hex[0]];
          hex.push(defHexColor[1]);
        }
  
        hex = hex.slice(0, 2);
      } else if (typeof hex !== 'string') {
        throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000');
      }
  
      _finalColors[key] = hex;
    }
  
    _setTags(_finalColors);
  };
  /**
   * Reset colors.
   */
  
  
  ansiHTML.reset = function () {
    _setTags(_defColors);
  };
  /**
   * Expose tags, including open and close.
   * @type {Object}
   */
  
  
  ansiHTML.tags = {};
  
  if (Object.defineProperty) {
    Object.defineProperty(ansiHTML.tags, 'open', {
      get: function () {
        return _openTags;
      }
    });
    Object.defineProperty(ansiHTML.tags, 'close', {
      get: function () {
        return _closeTags;
      }
    });
  } else {
    ansiHTML.tags.open = _openTags;
    ansiHTML.tags.close = _closeTags;
  }
  
  function _setTags(colors) {
    // reset all
    _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]; // inverse
  
    _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]; // dark grey
  
    _openTags['90'] = 'color:#' + colors.darkgrey;
  
    for (var code in _styles) {
      var color = _styles[code];
      var oriColor = colors[color] || '000';
      _openTags[code] = 'color:#' + oriColor;
      code = parseInt(code);
      _openTags[(code + 10).toString()] = 'background:#' + oriColor;
    }
  }
  
  ansiHTML.reset();
  
  /***/ }),
  
  /***/ "./node_modules/ansi-regex/index.js":
  /*!******************************************!*\
    !*** ./node_modules/ansi-regex/index.js ***!
    \******************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  module.exports = function () {
    return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
  };
  
  /***/ }),
  
  /***/ "./node_modules/events/events.js":
  /*!***************************************!*\
    !*** ./node_modules/events/events.js ***!
    \***************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  
  var R = typeof Reflect === 'object' ? Reflect : null;
  var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  
  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  
  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }
  
  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  };
  
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  
  module.exports = EventEmitter;
  module.exports.once = once; // Backwards-compat with node 0.10.x
  
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  
  var defaultMaxListeners = 10;
  
  function checkListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function () {
      return defaultMaxListeners;
    },
    set: function (arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }
  
      defaultMaxListeners = arg;
    }
  });
  
  EventEmitter.init = function () {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }
  
    this._maxListeners = this._maxListeners || undefined;
  }; // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  
  
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
  
    this._maxListeners = n;
    return this;
  };
  
  function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  
  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
  
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  
    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.
  
    if (doError) {
      var er;
      if (args.length > 0) er = args[0];
  
      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      } // At least give some kind of context to the user
  
  
      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }
  
    var handler = events[type];
    if (handler === undefined) return false;
  
    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
  
      for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
    }
  
    return true;
  };
  
  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
  
    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
  
        events = target._events;
      }
  
      existing = events[type];
    }
  
    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      } // Check for listener leak
  
  
      m = _getMaxListeners(target);
  
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true; // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax
  
        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
  
    return target;
  }
  
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  
  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0) return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  
  function _onceWrap(target, type, listener) {
    var state = {
      fired: false,
      wrapFn: undefined,
      target: target,
      type: type,
      listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  
  EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  }; // Emits a 'removeListener' event if and only if the listener was removed.
  
  
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
  
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;
  
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }
  
      if (position < 0) return this;
      if (position === 0) list.shift();else {
        spliceOne(list, position);
      }
      if (list.length === 1) events[type] = list[0];
      if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }
  
    return this;
  };
  
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this; // not listening for removeListener, no need to emit
  
    if (events.removeListener === undefined) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== undefined) {
        if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
      }
  
      return this;
    } // emit removeListener for all listeners on all events
  
  
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      var key;
  
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
  
      this.removeAllListeners('removeListener');
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }
  
    listeners = events[type];
  
    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
      // LIFO order
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }
  
    return this;
  };
  
  function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  
  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  
  EventEmitter.prototype.listenerCount = listenerCount;
  
  function listenerCount(type) {
    var events = this._events;
  
    if (events !== undefined) {
      var evlistener = events[type];
  
      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }
  
    return 0;
  }
  
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  
  function arrayClone(arr, n) {
    var copy = new Array(n);
  
    for (var i = 0; i < n; ++i) copy[i] = arr[i];
  
    return copy;
  }
  
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  
    list.pop();
  }
  
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
  
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
  
    return ret;
  }
  
  function once(emitter, name) {
    return new Promise(function (resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }
  
      function resolver() {
        if (typeof emitter.removeListener === 'function') {
          emitter.removeListener('error', errorListener);
        }
  
        resolve([].slice.call(arguments));
      }
  
      ;
      eventTargetAgnosticAddListener(emitter, name, resolver, {
        once: true
      });
  
      if (name !== 'error') {
        addErrorHandlerIfEventEmitter(emitter, errorListener, {
          once: true
        });
      }
    });
  }
  
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
      eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
  }
  
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === 'function') {
      // EventTarget does not have `error` event semantics like Node
      // EventEmitters, we do not listen for `error` events here.
      emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
  
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }
  
  /***/ }),
  
  /***/ "./node_modules/html-entities/lib/html4-entities.js":
  /*!**********************************************************!*\
    !*** ./node_modules/html-entities/lib/html4-entities.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
  
  var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'AElig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
  var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];
  var alphaIndex = {};
  var numIndex = {};
  
  (function () {
    var i = 0;
    var length = HTML_ALPHA.length;
  
    while (i < length) {
      var a = HTML_ALPHA[i];
      var c = HTML_CODES[i];
      alphaIndex[a] = String.fromCharCode(c);
      numIndex[c] = a;
      i++;
    }
  })();
  
  var Html4Entities =
  /** @class */
  function () {
    function Html4Entities() {}
  
    Html4Entities.prototype.decode = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
        var chr;
  
        if (entity.charAt(0) === "#") {
          var code = entity.charAt(1).toLowerCase() === 'x' ? parseInt(entity.substr(2), 16) : parseInt(entity.substr(1));
  
          if (!isNaN(code) || code >= -32768) {
            if (code <= 65535) {
              chr = String.fromCharCode(code);
            } else {
              chr = surrogate_pairs_1.fromCodePoint(code);
            }
          }
        } else {
          chr = alphaIndex[entity];
        }
  
        return chr || s;
      });
    };
  
    Html4Entities.decode = function (str) {
      return new Html4Entities().decode(str);
    };
  
    Html4Entities.prototype.encode = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
      }
  
      return result;
    };
  
    Html4Entities.encode = function (str) {
      return new Html4Entities().encode(str);
    };
  
    Html4Entities.prototype.encodeNonUTF = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
  
        if (alpha) {
          result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
          if (cc >= surrogate_pairs_1.highSurrogateFrom && cc <= surrogate_pairs_1.highSurrogateTo) {
            result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
            i++;
          } else {
            result += '&#' + cc + ';';
          }
        } else {
          result += str.charAt(i);
        }
  
        i++;
      }
  
      return result;
    };
  
    Html4Entities.encodeNonUTF = function (str) {
      return new Html4Entities().encodeNonUTF(str);
    };
  
    Html4Entities.prototype.encodeNonASCII = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var c = str.charCodeAt(i);
  
        if (c <= 255) {
          result += str[i++];
          continue;
        }
  
        if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + c + ';';
        }
  
        i++;
      }
  
      return result;
    };
  
    Html4Entities.encodeNonASCII = function (str) {
      return new Html4Entities().encodeNonASCII(str);
    };
  
    return Html4Entities;
  }();
  
  exports.Html4Entities = Html4Entities;
  
  /***/ }),
  
  /***/ "./node_modules/html-entities/lib/html5-entities.js":
  /*!**********************************************************!*\
    !*** ./node_modules/html-entities/lib/html5-entities.js ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
  
  var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];
  var DECODE_ONLY_ENTITIES = [['NewLine', [10]]];
  var alphaIndex = {};
  var charIndex = {};
  createIndexes(alphaIndex, charIndex);
  
  var Html5Entities =
  /** @class */
  function () {
    function Html5Entities() {}
  
    Html5Entities.prototype.decode = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      return str.replace(/&(#?[\w\d]+);?/g, function (s, entity) {
        var chr;
  
        if (entity.charAt(0) === "#") {
          var code = entity.charAt(1) === 'x' ? parseInt(entity.substr(2).toLowerCase(), 16) : parseInt(entity.substr(1));
  
          if (!isNaN(code) || code >= -32768) {
            if (code <= 65535) {
              chr = String.fromCharCode(code);
            } else {
              chr = surrogate_pairs_1.fromCodePoint(code);
            }
          }
        } else {
          chr = alphaIndex[entity];
        }
  
        return chr || s;
      });
    };
  
    Html5Entities.decode = function (str) {
      return new Html5Entities().decode(str);
    };
  
    Html5Entities.prototype.encode = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
  
        if (charInfo) {
          var alpha = charInfo[str.charCodeAt(i + 1)];
  
          if (alpha) {
            i++;
          } else {
            alpha = charInfo[''];
          }
  
          if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
          }
        }
  
        result += str.charAt(i);
        i++;
      }
  
      return result;
    };
  
    Html5Entities.encode = function (str) {
      return new Html5Entities().encode(str);
    };
  
    Html5Entities.prototype.encodeNonUTF = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
  
        if (charInfo) {
          var alpha = charInfo[str.charCodeAt(i + 1)];
  
          if (alpha) {
            i++;
          } else {
            alpha = charInfo[''];
          }
  
          if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
          }
        }
  
        if (c < 32 || c > 126) {
          if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
            result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
            i++;
          } else {
            result += '&#' + c + ';';
          }
        } else {
          result += str.charAt(i);
        }
  
        i++;
      }
  
      return result;
    };
  
    Html5Entities.encodeNonUTF = function (str) {
      return new Html5Entities().encodeNonUTF(str);
    };
  
    Html5Entities.prototype.encodeNonASCII = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var c = str.charCodeAt(i);
  
        if (c <= 255) {
          result += str[i++];
          continue;
        }
  
        if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
          i += 2;
        } else {
          result += '&#' + c + ';';
          i++;
        }
      }
  
      return result;
    };
  
    Html5Entities.encodeNonASCII = function (str) {
      return new Html5Entities().encodeNonASCII(str);
    };
  
    return Html5Entities;
  }();
  
  exports.Html5Entities = Html5Entities;
  
  function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
  
    while (i--) {
      var _a = ENTITIES[i],
          alpha = _a[0],
          _b = _a[1],
          chr = _b[0],
          chr2 = _b[1];
      var addChar = chr < 32 || chr > 126 || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
      var charInfo = void 0;
  
      if (addChar) {
        charInfo = charIndex[chr] = charIndex[chr] || {};
      }
  
      if (chr2) {
        alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
        addChar && (charInfo[chr2] = alpha);
      } else {
        alphaIndex[alpha] = String.fromCharCode(chr);
        addChar && (charInfo[''] = alpha);
      }
    }
  
    i = DECODE_ONLY_ENTITIES.length;
  
    while (i--) {
      var _c = DECODE_ONLY_ENTITIES[i],
          alpha = _c[0],
          _d = _c[1],
          chr = _d[0],
          chr2 = _d[1];
      alphaIndex[alpha] = String.fromCharCode(chr) + (chr2 ? String.fromCharCode(chr2) : '');
    }
  }
  
  /***/ }),
  
  /***/ "./node_modules/html-entities/lib/index.js":
  /*!*************************************************!*\
    !*** ./node_modules/html-entities/lib/index.js ***!
    \*************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var xml_entities_1 = __webpack_require__(/*! ./xml-entities */ "./node_modules/html-entities/lib/xml-entities.js");
  
  exports.XmlEntities = xml_entities_1.XmlEntities;
  
  var html4_entities_1 = __webpack_require__(/*! ./html4-entities */ "./node_modules/html-entities/lib/html4-entities.js");
  
  exports.Html4Entities = html4_entities_1.Html4Entities;
  
  var html5_entities_1 = __webpack_require__(/*! ./html5-entities */ "./node_modules/html-entities/lib/html5-entities.js");
  
  exports.Html5Entities = html5_entities_1.Html5Entities;
  exports.AllHtmlEntities = html5_entities_1.Html5Entities;
  
  /***/ }),
  
  /***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
  /*!***********************************************************!*\
    !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports.fromCodePoint = String.fromCodePoint || function (astralCodePoint) {
    return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xD800, (astralCodePoint - 0x10000) % 0x400 + 0xDC00);
  };
  
  exports.getCodePoint = String.prototype.codePointAt ? function (input, position) {
    return input.codePointAt(position);
  } : function (input, position) {
    return (input.charCodeAt(position) - 0xD800) * 0x400 + input.charCodeAt(position + 1) - 0xDC00 + 0x10000;
  };
  exports.highSurrogateFrom = 0xD800;
  exports.highSurrogateTo = 0xDBFF;
  
  /***/ }),
  
  /***/ "./node_modules/html-entities/lib/xml-entities.js":
  /*!********************************************************!*\
    !*** ./node_modules/html-entities/lib/xml-entities.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
  
  var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
  };
  var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
  };
  var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
  };
  
  var XmlEntities =
  /** @class */
  function () {
    function XmlEntities() {}
  
    XmlEntities.prototype.encode = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      return str.replace(/[<>"'&]/g, function (s) {
        return CHAR_S_INDEX[s];
      });
    };
  
    XmlEntities.encode = function (str) {
      return new XmlEntities().encode(str);
    };
  
    XmlEntities.prototype.decode = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
        if (s.charAt(1) === '#') {
          var code = s.charAt(2).toLowerCase() === 'x' ? parseInt(s.substr(3), 16) : parseInt(s.substr(2));
  
          if (!isNaN(code) || code >= -32768) {
            if (code <= 65535) {
              return String.fromCharCode(code);
            } else {
              return surrogate_pairs_1.fromCodePoint(code);
            }
          }
  
          return '';
        }
  
        return ALPHA_INDEX[s] || s;
      });
    };
  
    XmlEntities.decode = function (str) {
      return new XmlEntities().decode(str);
    };
  
    XmlEntities.prototype.encodeNonUTF = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
  
        if (alpha) {
          result += "&" + alpha + ";";
          i++;
          continue;
        }
  
        if (c < 32 || c > 126) {
          if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
            result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
            i++;
          } else {
            result += '&#' + c + ';';
          }
        } else {
          result += str.charAt(i);
        }
  
        i++;
      }
  
      return result;
    };
  
    XmlEntities.encodeNonUTF = function (str) {
      return new XmlEntities().encodeNonUTF(str);
    };
  
    XmlEntities.prototype.encodeNonASCII = function (str) {
      if (!str || !str.length) {
        return '';
      }
  
      var strLength = str.length;
      var result = '';
      var i = 0;
  
      while (i < strLength) {
        var c = str.charCodeAt(i);
  
        if (c <= 255) {
          result += str[i++];
          continue;
        }
  
        if (c >= surrogate_pairs_1.highSurrogateFrom && c <= surrogate_pairs_1.highSurrogateTo) {
          result += '&#' + surrogate_pairs_1.getCodePoint(str, i) + ';';
          i++;
        } else {
          result += '&#' + c + ';';
        }
  
        i++;
      }
  
      return result;
    };
  
    XmlEntities.encodeNonASCII = function (str) {
      return new XmlEntities().encodeNonASCII(str);
    };
  
    return XmlEntities;
  }();
  
  exports.XmlEntities = XmlEntities;
  
  /***/ }),
  
  /***/ "./node_modules/loglevel/lib/loglevel.js":
  /*!***********************************************!*\
    !*** ./node_modules/loglevel/lib/loglevel.js ***!
    \***********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  * loglevel - https://github.com/pimterry/loglevel
  *
  * Copyright (c) 2013 Tim Perry
  * Licensed under the MIT license.
  */
  (function (root, definition) {
    "use strict";
  
    if (true) {
      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
          __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
          (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
          __WEBPACK_AMD_DEFINE_FACTORY__),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(this, function () {
    "use strict"; // Slightly dubious tricks to cut down minimized file size
  
    var noop = function () {};
  
    var undefinedType = "undefined";
    var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
    var logMethods = ["trace", "debug", "info", "warn", "error"]; // Cross-browser bind equivalent that works at least back to IE6
  
    function bindMethod(obj, methodName) {
      var method = obj[methodName];
  
      if (typeof method.bind === 'function') {
        return method.bind(obj);
      } else {
        try {
          return Function.prototype.bind.call(method, obj);
        } catch (e) {
          // Missing bind shim or IE8 + Modernizr, fallback to wrapping
          return function () {
            return Function.prototype.apply.apply(method, [obj, arguments]);
          };
        }
      }
    } // Trace() doesn't print the message in IE, so for that case we need to wrap it
  
  
    function traceForIE() {
      if (console.log) {
        if (console.log.apply) {
          console.log.apply(console, arguments);
        } else {
          // In old IE, native console methods themselves don't have apply().
          Function.prototype.apply.apply(console.log, [console, arguments]);
        }
      }
  
      if (console.trace) console.trace();
    } // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
  
  
    function realMethod(methodName) {
      if (methodName === 'debug') {
        methodName = 'log';
      }
  
      if (typeof console === undefinedType) {
        return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
      } else if (methodName === 'trace' && isIE) {
        return traceForIE;
      } else if (console[methodName] !== undefined) {
        return bindMethod(console, methodName);
      } else if (console.log !== undefined) {
        return bindMethod(console, 'log');
      } else {
        return noop;
      }
    } // These private functions always need `this` to be set properly
  
  
    function replaceLoggingMethods(level, loggerName) {
      /*jshint validthis:true */
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i];
        this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
      } // Define log.log as an alias for log.debug
  
  
      this.log = this.debug;
    } // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
  
  
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
      return function () {
        if (typeof console !== undefinedType) {
          replaceLoggingMethods.call(this, level, loggerName);
          this[methodName].apply(this, arguments);
        }
      };
    } // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
  
  
    function defaultMethodFactory(methodName, level, loggerName) {
      /*jshint validthis:true */
      return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }
  
    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
  
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }
  
      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
        if (typeof window === undefinedType || !storageKey) return; // Use localStorage if available
  
        try {
          window.localStorage[storageKey] = levelName;
          return;
        } catch (ignore) {} // Use session cookie as fallback
  
  
        try {
          window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
        } catch (ignore) {}
      }
  
      function getPersistedLevel() {
        var storedLevel;
        if (typeof window === undefinedType || !storageKey) return;
  
        try {
          storedLevel = window.localStorage[storageKey];
        } catch (ignore) {} // Fallback to cookies if local storage gives us nothing
  
  
        if (typeof storedLevel === undefinedType) {
          try {
            var cookie = window.document.cookie;
            var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
  
            if (location !== -1) {
              storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
            }
          } catch (ignore) {}
        } // If the stored level is not valid, treat it as if nothing was stored.
  
  
        if (self.levels[storedLevel] === undefined) {
          storedLevel = undefined;
        }
  
        return storedLevel;
      }
      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */
  
  
      self.name = name;
      self.levels = {
        "TRACE": 0,
        "DEBUG": 1,
        "INFO": 2,
        "WARN": 3,
        "ERROR": 4,
        "SILENT": 5
      };
      self.methodFactory = factory || defaultMethodFactory;
  
      self.getLevel = function () {
        return currentLevel;
      };
  
      self.setLevel = function (level, persist) {
        if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
          level = self.levels[level.toUpperCase()];
        }
  
        if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
          currentLevel = level;
  
          if (persist !== false) {
            // defaults to true
            persistLevelIfPossible(level);
          }
  
          replaceLoggingMethods.call(self, level, name);
  
          if (typeof console === undefinedType && level < self.levels.SILENT) {
            return "No console available for logging";
          }
        } else {
          throw "log.setLevel() called with invalid level: " + level;
        }
      };
  
      self.setDefaultLevel = function (level) {
        if (!getPersistedLevel()) {
          self.setLevel(level, false);
        }
      };
  
      self.enableAll = function (persist) {
        self.setLevel(self.levels.TRACE, persist);
      };
  
      self.disableAll = function (persist) {
        self.setLevel(self.levels.SILENT, persist);
      }; // Initialize with the right level
  
  
      var initialLevel = getPersistedLevel();
  
      if (initialLevel == null) {
        initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
  
      self.setLevel(initialLevel, false);
    }
    /*
     *
     * Top-level API
     *
     */
  
  
    var defaultLogger = new Logger();
    var _loggersByName = {};
  
    defaultLogger.getLogger = function getLogger(name) {
      if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
        throw new TypeError("You must supply a name when creating a logger.");
      }
  
      var logger = _loggersByName[name];
  
      if (!logger) {
        logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
      }
  
      return logger;
    }; // Grab the current global log variable in case of overwrite
  
  
    var _log = typeof window !== undefinedType ? window.log : undefined;
  
    defaultLogger.noConflict = function () {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
        window.log = _log;
      }
  
      return defaultLogger;
    };
  
    defaultLogger.getLoggers = function getLoggers() {
      return _loggersByName;
    }; // ES6 default export, for compatibility
  
  
    defaultLogger['default'] = defaultLogger;
    return defaultLogger;
  });
  
  /***/ }),
  
  /***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
  /*!**************************************************************************!*\
    !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
    \**************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
  ;
  
  (function (root) {
    /** Detect free variables */
    var freeExports =  true && exports && !exports.nodeType && exports;
    var freeModule =  true && module && !module.nodeType && module;
    var freeGlobal = typeof global == 'object' && global;
  
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
      root = freeGlobal;
    }
    /**
     * The `punycode` object.
     * @name punycode
     * @type Object
     */
  
  
    var punycode,
  
    /** Highest positive signed 32-bit float value */
    maxInt = 2147483647,
        // aka. 0x7FFFFFFF or 2^31-1
  
    /** Bootstring parameters */
    base = 36,
        tMin = 1,
        tMax = 26,
        skew = 38,
        damp = 700,
        initialBias = 72,
        initialN = 128,
        // 0x80
    delimiter = '-',
        // '\x2D'
  
    /** Regular expressions */
    regexPunycode = /^xn--/,
        regexNonASCII = /[^\x20-\x7E]/,
        // unprintable ASCII chars + non-ASCII chars
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
        // RFC 3490 separators
  
    /** Error messages */
    errors = {
      'overflow': 'Overflow: input needs wider integers to process',
      'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
      'invalid-input': 'Invalid input'
    },
  
    /** Convenience shortcuts */
    baseMinusTMin = base - tMin,
        floor = Math.floor,
        stringFromCharCode = String.fromCharCode,
  
    /** Temporary variable */
    key;
    /*--------------------------------------------------------------------------*/
  
    /**
     * A generic error utility function.
     * @private
     * @param {String} type The error type.
     * @returns {Error} Throws a `RangeError` with the applicable error message.
     */
  
    function error(type) {
      throw new RangeError(errors[type]);
    }
    /**
     * A generic `Array#map` utility function.
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function that gets called for every array
     * item.
     * @returns {Array} A new array of values returned by the callback function.
     */
  
  
    function map(array, fn) {
      var length = array.length;
      var result = [];
  
      while (length--) {
        result[length] = fn(array[length]);
      }
  
      return result;
    }
    /**
     * A simple `Array#map`-like wrapper to work with domain name strings or email
     * addresses.
     * @private
     * @param {String} domain The domain name or email address.
     * @param {Function} callback The function that gets called for every
     * character.
     * @returns {Array} A new string of characters returned by the callback
     * function.
     */
  
  
    function mapDomain(string, fn) {
      var parts = string.split('@');
      var result = '';
  
      if (parts.length > 1) {
        // In email addresses, only the domain name should be punycoded. Leave
        // the local part (i.e. everything up to `@`) intact.
        result = parts[0] + '@';
        string = parts[1];
      } // Avoid `split(regex)` for IE8 compatibility. See #17.
  
  
      string = string.replace(regexSeparators, '\x2E');
      var labels = string.split('.');
      var encoded = map(labels, fn).join('.');
      return result + encoded;
    }
    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     * @see `punycode.ucs2.encode`
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode.ucs2
     * @name decode
     * @param {String} string The Unicode input string (UCS-2).
     * @returns {Array} The new array of code points.
     */
  
  
    function ucs2decode(string) {
      var output = [],
          counter = 0,
          length = string.length,
          value,
          extra;
  
      while (counter < length) {
        value = string.charCodeAt(counter++);
  
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // high surrogate, and there is a next character
          extra = string.charCodeAt(counter++);
  
          if ((extra & 0xFC00) == 0xDC00) {
            // low surrogate
            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
          } else {
            // unmatched surrogate; only append this code unit, in case the next
            // code unit is the high surrogate of a surrogate pair
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
  
      return output;
    }
    /**
     * Creates a string based on an array of numeric code points.
     * @see `punycode.ucs2.decode`
     * @memberOf punycode.ucs2
     * @name encode
     * @param {Array} codePoints The array of numeric code points.
     * @returns {String} The new Unicode string (UCS-2).
     */
  
  
    function ucs2encode(array) {
      return map(array, function (value) {
        var output = '';
  
        if (value > 0xFFFF) {
          value -= 0x10000;
          output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
          value = 0xDC00 | value & 0x3FF;
        }
  
        output += stringFromCharCode(value);
        return output;
      }).join('');
    }
    /**
     * Converts a basic code point into a digit/integer.
     * @see `digitToBasic()`
     * @private
     * @param {Number} codePoint The basic numeric code point value.
     * @returns {Number} The numeric value of a basic code point (for use in
     * representing integers) in the range `0` to `base - 1`, or `base` if
     * the code point does not represent a value.
     */
  
  
    function basicToDigit(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
  
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
  
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
  
      return base;
    }
    /**
     * Converts a digit/integer into a basic code point.
     * @see `basicToDigit()`
     * @private
     * @param {Number} digit The numeric value of a basic code point.
     * @returns {Number} The basic code point whose value (when used for
     * representing integers) is `digit`, which needs to be in the range
     * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
     * used; else, the lowercase form is used. The behavior is undefined
     * if `flag` is non-zero and `digit` has no uppercase form.
     */
  
  
    function digitToBasic(digit, flag) {
      //  0..25 map to ASCII a..z or A..Z
      // 26..35 map to ASCII 0..9
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    }
    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     * @private
     */
  
  
    function adapt(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
  
      for (;
      /* no initialization */
      delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
  
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    }
    /**
     * Converts a Punycode string of ASCII-only symbols to a string of Unicode
     * symbols.
     * @memberOf punycode
     * @param {String} input The Punycode string of ASCII-only symbols.
     * @returns {String} The resulting string of Unicode symbols.
     */
  
  
    function decode(input) {
      // Don't use UCS-2
      var output = [],
          inputLength = input.length,
          out,
          i = 0,
          n = initialN,
          bias = initialBias,
          basic,
          j,
          index,
          oldi,
          w,
          k,
          digit,
          t,
  
      /** Cached calculation results */
      baseMinusT; // Handle the basic code points: let `basic` be the number of input code
      // points before the last delimiter, or `0` if there is none, then copy
      // the first basic code points to the output.
  
      basic = input.lastIndexOf(delimiter);
  
      if (basic < 0) {
        basic = 0;
      }
  
      for (j = 0; j < basic; ++j) {
        // if it's not a basic code point
        if (input.charCodeAt(j) >= 0x80) {
          error('not-basic');
        }
  
        output.push(input.charCodeAt(j));
      } // Main decoding loop: start just after the last delimiter if any basic code
      // points were copied; start at the beginning otherwise.
  
  
      for (index = basic > 0 ? basic + 1 : 0; index < inputLength;)
      /* no final expression */
      {
        // `index` is the index of the next character to be consumed.
        // Decode a generalized variable-length integer into `delta`,
        // which gets added to `i`. The overflow checking is easier
        // if we increase `i` as we go, then subtract off its starting
        // value at the end to obtain `delta`.
        for (oldi = i, w = 1, k = base;;
        /* no condition */
        k += base) {
          if (index >= inputLength) {
            error('invalid-input');
          }
  
          digit = basicToDigit(input.charCodeAt(index++));
  
          if (digit >= base || digit > floor((maxInt - i) / w)) {
            error('overflow');
          }
  
          i += digit * w;
          t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
  
          if (digit < t) {
            break;
          }
  
          baseMinusT = base - t;
  
          if (w > floor(maxInt / baseMinusT)) {
            error('overflow');
          }
  
          w *= baseMinusT;
        }
  
        out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
        // incrementing `n` each time, so we'll fix that now:
  
        if (floor(i / out) > maxInt - n) {
          error('overflow');
        }
  
        n += floor(i / out);
        i %= out; // Insert `n` at position `i` of the output
  
        output.splice(i++, 0, n);
      }
  
      return ucs2encode(output);
    }
    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     * @memberOf punycode
     * @param {String} input The string of Unicode symbols.
     * @returns {String} The resulting Punycode string of ASCII-only symbols.
     */
  
  
    function encode(input) {
      var n,
          delta,
          handledCPCount,
          basicLength,
          bias,
          j,
          m,
          q,
          k,
          t,
          currentValue,
          output = [],
  
      /** `inputLength` will hold the number of code points in `input`. */
      inputLength,
  
      /** Cached calculation results */
      handledCPCountPlusOne,
          baseMinusT,
          qMinusT; // Convert the input in UCS-2 to Unicode
  
      input = ucs2decode(input); // Cache the length
  
      inputLength = input.length; // Initialize the state
  
      n = initialN;
      delta = 0;
      bias = initialBias; // Handle the basic code points
  
      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];
  
        if (currentValue < 0x80) {
          output.push(stringFromCharCode(currentValue));
        }
      }
  
      handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
      // `basicLength` is the number of basic code points.
      // Finish the basic string - if it is not empty - with a delimiter
  
      if (basicLength) {
        output.push(delimiter);
      } // Main encoding loop:
  
  
      while (handledCPCount < inputLength) {
        // All non-basic code points < n have been handled already. Find the next
        // larger one:
        for (m = maxInt, j = 0; j < inputLength; ++j) {
          currentValue = input[j];
  
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
        // but guard against overflow
  
  
        handledCPCountPlusOne = handledCPCount + 1;
  
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error('overflow');
        }
  
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
  
        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];
  
          if (currentValue < n && ++delta > maxInt) {
            error('overflow');
          }
  
          if (currentValue == n) {
            // Represent delta as a generalized variable-length integer
            for (q = delta, k = base;;
            /* no condition */
            k += base) {
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
  
              if (q < t) {
                break;
              }
  
              qMinusT = q - t;
              baseMinusT = base - t;
              output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
              q = floor(qMinusT / baseMinusT);
            }
  
            output.push(stringFromCharCode(digitToBasic(q, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
  
        ++delta;
        ++n;
      }
  
      return output.join('');
    }
    /**
     * Converts a Punycode string representing a domain name or an email address
     * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
     * it doesn't matter if you call it on a string that has already been
     * converted to Unicode.
     * @memberOf punycode
     * @param {String} input The Punycoded domain name or email address to
     * convert to Unicode.
     * @returns {String} The Unicode representation of the given Punycode
     * string.
     */
  
  
    function toUnicode(input) {
      return mapDomain(input, function (string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    }
    /**
     * Converts a Unicode string representing a domain name or an email address to
     * Punycode. Only the non-ASCII parts of the domain name will be converted,
     * i.e. it doesn't matter if you call it with a domain that's already in
     * ASCII.
     * @memberOf punycode
     * @param {String} input The domain name or email address to convert, as a
     * Unicode string.
     * @returns {String} The Punycode representation of the given domain name or
     * email address.
     */
  
  
    function toASCII(input) {
      return mapDomain(input, function (string) {
        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
      });
    }
    /*--------------------------------------------------------------------------*/
  
    /** Define the public API */
  
  
    punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      'version': '1.4.1',
  
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      'ucs2': {
        'decode': ucs2decode,
        'encode': ucs2encode
      },
      'decode': decode,
      'encode': encode,
      'toASCII': toASCII,
      'toUnicode': toUnicode
    };
    /** Expose `punycode` */
    // Some AMD build optimizers, like r.js, check for specific condition patterns
    // like the following:
  
    if (true) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return punycode;
      }).call(exports, __webpack_require__, exports, module),
          __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(this);
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))
  
  /***/ }),
  
  /***/ "./node_modules/process/browser.js":
  /*!*****************************************!*\
    !*** ./node_modules/process/browser.js ***!
    \*****************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  // shim for using process in browser
  var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.
  
  var cachedSetTimeout;
  var cachedClearTimeout;
  
  function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
  }
  
  function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
  }
  
  (function () {
    try {
      if (typeof setTimeout === 'function') {
        cachedSetTimeout = setTimeout;
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
  
    try {
      if (typeof clearTimeout === 'function') {
        cachedClearTimeout = clearTimeout;
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      //normal enviroments in sane situations
      return setTimeout(fun, 0);
    } // if setTimeout wasn't available but was latter defined
  
  
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
  
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      //normal enviroments in sane situations
      return clearTimeout(marker);
    } // if clearTimeout wasn't available but was latter defined
  
  
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
  
    try {
      // when when somebody has screwed with setTimeout but no I.E. maddness
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
        return cachedClearTimeout.call(null, marker);
      } catch (e) {
        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
  
    draining = false;
  
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
  
    if (queue.length) {
      drainQueue();
    }
  }
  
  function drainQueue() {
    if (draining) {
      return;
    }
  
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
  
    while (len) {
      currentQueue = queue;
      queue = [];
  
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
  
      queueIndex = -1;
      len = queue.length;
    }
  
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  
  process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
  
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
  
    queue.push(new Item(fun, args));
  
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  }; // v8 likes predictible objects
  
  
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  
  Item.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  
  process.versions = {};
  
  function noop() {}
  
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  
  process.listeners = function (name) {
    return [];
  };
  
  process.binding = function (name) {
    throw new Error('process.binding is not supported');
  };
  
  process.cwd = function () {
    return '/';
  };
  
  process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
  };
  
  process.umask = function () {
    return 0;
  };
  
  /***/ }),
  
  /***/ "./node_modules/querystring-es3/decode.js":
  /*!************************************************!*\
    !*** ./node_modules/querystring-es3/decode.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
   // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  
  module.exports = function (qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};
  
    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }
  
    var regexp = /\+/g;
    qs = qs.split(sep);
    var maxKeys = 1000;
  
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }
  
    var len = qs.length; // maxKeys <= 0 means that we should not limit keys count
  
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }
  
    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr,
          vstr,
          k,
          v;
  
      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }
  
      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);
  
      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }
  
    return obj;
  };
  
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  
  /***/ }),
  
  /***/ "./node_modules/querystring-es3/encode.js":
  /*!************************************************!*\
    !*** ./node_modules/querystring-es3/encode.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  
  var stringifyPrimitive = function (v) {
    switch (typeof v) {
      case 'string':
        return v;
  
      case 'boolean':
        return v ? 'true' : 'false';
  
      case 'number':
        return isFinite(v) ? v : '';
  
      default:
        return '';
    }
  };
  
  module.exports = function (obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
  
    if (obj === null) {
      obj = undefined;
    }
  
    if (typeof obj === 'object') {
      return map(objectKeys(obj), function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
  
        if (isArray(obj[k])) {
          return map(obj[k], function (v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);
    }
  
    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  };
  
  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  
  function map(xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
  
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
  
    return res;
  }
  
  var objectKeys = Object.keys || function (obj) {
    var res = [];
  
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
    }
  
    return res;
  };
  
  /***/ }),
  
  /***/ "./node_modules/querystring-es3/index.js":
  /*!***********************************************!*\
    !*** ./node_modules/querystring-es3/index.js ***!
    \***********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
  exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");
  
  /***/ }),
  
  /***/ "./node_modules/san-store/dist/san-store.source.js":
  /*!*********************************************************!*\
    !*** ./node_modules/san-store/dist/san-store.source.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  (function webpackUniversalModuleDefinition(root, factory) {
    if (true) module.exports = factory();else {}
  })(this, function () {
    return (
      /******/
      function (modules) {
        // webpackBootstrap
  
        /******/
        // The module cache
  
        /******/
        var installedModules = {};
        /******/
  
        /******/
        // The require function
  
        /******/
  
        function __webpack_require__(moduleId) {
          /******/
  
          /******/
          // Check if module is in cache
  
          /******/
          if (installedModules[moduleId])
            /******/
            return installedModules[moduleId].exports;
          /******/
  
          /******/
          // Create a new module (and put it into the cache)
  
          /******/
  
          var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
  
            /******/
            l: false,
  
            /******/
            exports: {}
            /******/
  
          };
          /******/
  
          /******/
          // Execute the module function
  
          /******/
  
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          /******/
  
          /******/
          // Flag the module as loaded
  
          /******/
  
          module.l = true;
          /******/
  
          /******/
          // Return the exports of the module
  
          /******/
  
          return module.exports;
          /******/
        }
        /******/
  
        /******/
  
        /******/
        // expose the modules object (__webpack_modules__)
  
        /******/
  
  
        __webpack_require__.m = modules;
        /******/
  
        /******/
        // expose the module cache
  
        /******/
  
        __webpack_require__.c = installedModules;
        /******/
  
        /******/
        // identity function for calling harmony imports with the correct context
  
        /******/
  
        __webpack_require__.i = function (value) {
          return value;
        };
        /******/
  
        /******/
        // define getter function for harmony exports
  
        /******/
  
  
        __webpack_require__.d = function (exports, name, getter) {
          /******/
          if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {
              /******/
              configurable: false,
  
              /******/
              enumerable: true,
  
              /******/
              get: getter
              /******/
  
            });
            /******/
          }
          /******/
  
        };
        /******/
  
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
  
        /******/
  
  
        __webpack_require__.n = function (module) {
          /******/
          var getter = module && module.__esModule ?
          /******/
          function getDefault() {
            return module['default'];
          } :
          /******/
          function getModuleExports() {
            return module;
          };
          /******/
  
          __webpack_require__.d(getter, 'a', getter);
          /******/
  
  
          return getter;
          /******/
        };
        /******/
  
        /******/
        // Object.prototype.hasOwnProperty.call
  
        /******/
  
  
        __webpack_require__.o = function (object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
  
        /******/
        // __webpack_public_path__
  
        /******/
  
  
        __webpack_require__.p = "/dist";
        /******/
  
        /******/
        // Load entry module and return exports
  
        /******/
  
        return __webpack_require__(__webpack_require__.s = 6);
        /******/
      }(
      /************************************************************************/
  
      /******/
      [
      /* 0 */
  
      /***/
      function (module, exports, __webpack_require__) {
        "use strict";
  
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = emitDevtool;
  
        var _sanDevtool = __webpack_require__(4);
  
        var _sanDevtool2 = _interopRequireDefault(_sanDevtool);
  
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }
  
        function emitDevtool() {
          _sanDevtool2.default.apply(null, arguments);
        }
        /**
         * san-store
         * Copyright 2017 Baidu Inc. All rights reserved.
         *
         * @file Devtool emitter entry
         * @author luyuan
         */
  
        /***/
  
      },
      /* 1 */
  
      /***/
      function (module, exports, __webpack_require__) {
        "use strict";
  
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
  
        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
  
          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();
        /**
         * san-store
         * Copyright 2017 Baidu Inc. All rights reserved.
         *
         * @file store class
         * @author errorrik
         */
  
  
        var _flattenDiff = __webpack_require__(5);
  
        var _flattenDiff2 = _interopRequireDefault(_flattenDiff);
  
        var _parseName = __webpack_require__(2);
  
        var _parseName2 = _interopRequireDefault(_parseName);
  
        var _emitter = __webpack_require__(0);
  
        var _emitter2 = _interopRequireDefault(_emitter);
  
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }
  
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        /**
         * 唯一id的起始值
         *
         * @inner
         * @type {number}
         */
  
  
        var guidIndex = 1;
        /**
         * 获取唯一id
         *
         * @inner
         * @return {string} 唯一id
         */
  
        var guid = function guid() {
          return (++guidIndex).toString();
        };
        /**
         * Store 类，应用程序状态数据的容器
         *
         * @class
         */
  
  
        var Store = function () {
          /**
           * 构造函数
           *
           * @param {Object?} options 初始化参数
           * @param {Object?} options.initData 容器的初始化数据
           * @param {Object?} options.actions 容器的action函数集合
           * @param {boolean?} options.log 是否记录日志
           */
          function Store() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$initData = _ref.initData,
                initData = _ref$initData === undefined ? {} : _ref$initData,
                _ref$actions = _ref.actions,
                actions = _ref$actions === undefined ? {} : _ref$actions,
                _ref$log = _ref.log,
                log = _ref$log === undefined ? true : _ref$log,
                name = _ref.name;
  
            _classCallCheck(this, Store);
  
            this.raw = initData;
            this.actions = actions;
            this.log = log;
            this.name = name;
            this.listeners = [];
            this.stateChangeLogs = [];
            this.actionCtrl = new ActionControl(this);
          }
          /**
           * 获取 state
           *
           * @param {string} name state名称
           * @return {*}
           */
  
  
          _createClass(Store, [{
            key: 'getState',
            value: function getState(name) {
              name = (0, _parseName2.default)(name);
              var value = this.raw;
  
              for (var i = 0, l = name.length; value != null && i < l; i++) {
                value = value[name[i]];
              }
  
              return value;
            }
            /**
             * 监听 store 数据变化
             *
             * @param {Function} listener 监听器函数，接收diff对象
             */
  
          }, {
            key: 'listen',
            value: function listen(listener) {
              if (typeof listener === 'function') {
                this.listeners.push(listener);
              } // Alternatives for not receiving the events including default store
              // info from connector.
  
  
              (0, _emitter2.default)('store-listened', {
                store: this,
                listener: listener
              });
            }
            /**
             * 移除 store 数据变化监听器
             *
             * @param {Function} listener 监听器函数
             */
  
          }, {
            key: 'unlisten',
            value: function unlisten(listener) {
              var len = this.listeners.length;
  
              while (len--) {
                if (this.listeners[len] === listener) {
                  this.listeners.splice(len, 1);
                }
              } // Alternatives for not receiving the events including default store
              // info from connector.
  
  
              (0, _emitter2.default)('store-unlistened', {
                store: this,
                listener: listener
              });
            }
            /**
             * 触发 store 数据变化
             *
             * @private
             * @param {Array} diff 数据变更信息对象
             */
  
          }, {
            key: '_fire',
            value: function _fire(diff) {
              var _this = this;
  
              this.listeners.forEach(function (listener) {
                listener.call(_this, diff);
              });
            }
            /**
             * 添加一个 action
             *
             * @param {string} name action的名称
             * @param {Function} action action函数
             */
  
          }, {
            key: 'addAction',
            value: function addAction(name, action) {
              if (typeof action !== 'function') {
                return;
              }
  
              if (this.actions[name]) {
                throw new Error('Action ' + name + ' exists!');
              }
  
              this.actions[name] = action;
              (0, _emitter2.default)('store-action-added', {
                store: this,
                action: action
              });
            }
            /**
             * action 的 dispatch 入口
             *
             * @param {string} name action名称
             * @param {*} payload payload
             */
  
          }, {
            key: 'dispatch',
            value: function dispatch(name, payload) {
              return this._dispatch(name, payload);
            }
            /**
             * action 的 dispatch 入口
             *
             * @private
             * @param {string} name action名称
             * @param {*} payload payload
             * @param {string} parentId 所属父action的id
             */
  
          }, {
            key: '_dispatch',
            value: function _dispatch(name, payload, parentId) {
              var _this2 = this;
  
              var action = this.actions[name];
              var actionId = guid();
  
              if (typeof action !== 'function') {
                return;
              }
  
              this.actionCtrl.start(actionId, name, payload, parentId);
              var context = {
                getState: function getState(name) {
                  return _this2.getState(name);
                },
                dispatch: function dispatch(name, payload) {
                  return _this2._dispatch(name, payload, actionId);
                }
              };
              var actionReturn = action.call(this, payload, context);
              var updateInfo = void 0;
  
              if (actionReturn) {
                if (typeof actionReturn.then === 'function') {
                  return actionReturn.then(function (returns) {
                    _this2.actionCtrl.done(actionId);
  
                    return returns;
                  });
                }
  
                if (typeof actionReturn.buildWithDiff === 'function') {
                  var oldValue = this.raw;
                  updateInfo = actionReturn.buildWithDiff()(oldValue);
                  updateInfo[1] = (0, _flattenDiff2.default)(updateInfo[1]);
                  this.raw = updateInfo[0];
  
                  if (this.log) {
                    this.stateChangeLogs.push({
                      oldValue: oldValue,
                      newValue: updateInfo[0],
                      diff: updateInfo[1],
                      id: actionId
                    });
                  }
                }
              }
  
              this.actionCtrl.done(actionId);
  
              if (updateInfo) {
                this._fire(updateInfo[1]);
              }
  
              (0, _emitter2.default)('store-dispatched', {
                store: this,
                diff: updateInfo ? updateInfo[1] : null,
                name: name,
                payload: payload,
                actionId: actionId,
                parentId: parentId
              });
            }
          }]);
  
          return Store;
        }();
        /**
         * Action 控制类，用于 Store 控制 Action 运行过程
         *
         * @class
         */
  
  
        exports.default = Store;
  
        var ActionControl = function () {
          /**
           * 构造函数
           *
           * @param {Store} store 所属的store实例
           */
          function ActionControl(store) {
            _classCallCheck(this, ActionControl);
  
            this.list = [];
            this.len = 0;
            this.index = {};
            this.store = store;
          }
          /**
           * 开始运行 action
           *
           * @param {string} id action的id
           * @param {string} name action 名称
           * @param {*} payload payload
           * @param {string?} parentId 父action的id
           */
  
  
          _createClass(ActionControl, [{
            key: 'start',
            value: function start(id, name, payload, parentId) {
              var actionInfo = {
                id: id,
                name: name,
                parentId: parentId,
                childs: []
              };
  
              if (this.store.log) {
                actionInfo.startTime = new Date().getTime();
                actionInfo.payload = payload;
              }
  
              this.list[this.len] = actionInfo;
              this.index[id] = this.len++;
  
              if (parentId) {
                this.getById(parentId).childs.push(id);
              }
            }
            /**
             * action 运行完成
             *
             * @param {string} id action的id
             * @param {Function?} updateBuilder 状态更新函数生成器
             */
  
          }, {
            key: 'done',
            value: function done(id) {
              this.getById(id).selfDone = true;
              this.detectDone(id);
            }
            /**
             * 探测 action 是否完全运行完成，只有子 action 都运行完成才算运行完成
             *
             * @param {string} id action的id
             */
  
          }, {
            key: 'detectDone',
            value: function detectDone(id) {
              var _this3 = this;
  
              var actionInfo = this.getById(id);
              var childsDone = true;
              actionInfo.childs.forEach(function (child) {
                childsDone = _this3.getById(child).done && childsDone;
              });
  
              if (childsDone && actionInfo.selfDone) {
                actionInfo.done = true;
  
                if (this.store.log) {
                  actionInfo.endTime = new Date().getTime();
                }
  
                if (actionInfo.parentId) {
                  this.detectDone(actionInfo.parentId);
                }
              }
            }
          }, {
            key: 'getById',
            value: function getById(id) {
              return this.list[this.index[id]];
            }
          }]);
  
          return ActionControl;
        }();
        /***/
  
      },
      /* 2 */
  
      /***/
      function (module, exports, __webpack_require__) {
        "use strict";
  
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = parseName;
        /**
         * san-store
         * Copyright 2017 Baidu Inc. All rights reserved.
         *
         * @file 解析数据属性名
         * @author errorrik
         */
  
        /**
         * 解析数据属性名，返回数组形式的 terms
         *
         * @param {string} source 数据属性的字符串形式
         * @return {Array}
         */
  
        function parseName(source) {
          if (source instanceof Array) {
            return source;
          }
  
          if (typeof source !== 'string') {
            return [];
          } // 这个简易的非状态机的实现是有缺陷的
          // 比如 a['dd.cc'].b 这种就有问题了，不过我们不考虑这种场景
  
  
          var terms = source.split('.');
          var result = [];
  
          for (var i = 0, l = terms.length; i < l; i++) {
            var term = terms[i];
            var propAccessorStart = term.indexOf('[');
  
            if (propAccessorStart >= 0) {
              if (propAccessorStart > 0) {
                result.push(term.slice(0, propAccessorStart));
                term = term.slice(propAccessorStart);
              }
  
              while (term.charCodeAt(0) === 91) {
                var propAccessorEnd = term.indexOf(']');
  
                if (propAccessorEnd < 0) {
                  throw new Error('name syntax error: ' + source);
                }
  
                var propAccessorLiteral = term.slice(1, propAccessorEnd);
  
                if (/^[0-9]+$/.test(propAccessorLiteral)) {
                  // for number
                  result.push(+propAccessorLiteral);
                } else if (/^(['"])([^\1]+)\1$/.test(propAccessorLiteral)) {
                  // for string literal
                  result.push(new Function('return ' + propAccessorLiteral)());
                }
  
                term = term.slice(propAccessorEnd + 1);
              }
            } else {
              result.push(term);
            }
          }
  
          return result;
        }
        /***/
  
      },
      /* 3 */
  
      /***/
      function (module, exports, __webpack_require__) {
        "use strict";
  
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
  
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
          return typeof obj;
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        /**
         * san-store
         * Copyright 2017 Baidu Inc. All rights reserved.
         *
         * @file san组件的connect
         * @author errorrik
         */
  
  
        exports.default = createConnector;
  
        var _parseName = __webpack_require__(2);
  
        var _parseName2 = _interopRequireDefault(_parseName);
  
        var _store = __webpack_require__(1);
  
        var _store2 = _interopRequireDefault(_store);
  
        var _emitter = __webpack_require__(0);
  
        var _emitter2 = _interopRequireDefault(_emitter);
  
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }
        /**
         * san组件的connect
         *
         * @param {Object} mapStates 状态到组件数据的映射信息
         * @param {Object|Array?} mapActions store的action操作到组件actions方法的映射信息
         * @param {Store} store 指定的store实例
         * @return {function(ComponentClass)}
         */
  
  
        function connect(mapStates, mapActions, store) {
          var mapStateInfo = [];
  
          for (var key in mapStates) {
            if (mapStates.hasOwnProperty(key)) {
              var mapState = mapStates[key];
              var mapInfo = {
                dataName: key
              };
  
              switch (typeof mapState === 'undefined' ? 'undefined' : _typeof(mapState)) {
                case 'string':
                  mapInfo.stateName = (0, _parseName2.default)(mapState);
                  break;
  
                case 'function':
                  mapInfo.getter = mapState;
                  break;
  
                default:
                  mapInfo = null;
                  break;
              }
  
              mapInfo && mapStateInfo.push(mapInfo);
            }
          }
  
          (0, _emitter2.default)('store-connected', {
            mapStates: mapStates,
            mapActions: mapActions,
            store: store
          });
          return function (ComponentClass) {
            var componentProto = void 0;
  
            switch (typeof ComponentClass === 'undefined' ? 'undefined' : _typeof(ComponentClass)) {
              case 'function':
                componentProto = ComponentClass.prototype;
                break;
  
              case 'object':
                componentProto = ComponentClass;
                break;
            }
  
            if (!componentProto) {
              return;
            } // map states
  
  
            var inited = componentProto.inited;
  
            componentProto.inited = function () {
              var _this = this; // init data
  
  
              mapStateInfo.forEach(function (info) {
                if (typeof info.getter === 'function') {
                  _this.data.set(info.dataName, info.getter(store.getState()));
                } else {
                  _this.data.set(info.dataName, clone(store.getState(info.stateName)));
                }
              }); // listen store change
  
              this._storeListener = function (diff) {
                mapStateInfo.forEach(function (info) {
                  if (typeof info.getter === 'function') {
                    _this.data.set(info.dataName, info.getter(store.getState()));
  
                    return;
                  }
  
                  var updateInfo = calcUpdateInfo(info, diff);
  
                  if (updateInfo) {
                    if (updateInfo.spliceArgs) {
                      _this.data.splice(updateInfo.componentData, updateInfo.spliceArgs);
                    } else {
                      _this.data.set(updateInfo.componentData, clone(store.getState(updateInfo.storeData)));
                    }
                  }
                });
              };
  
              store.listen(this._storeListener);
              (0, _emitter2.default)('store-comp-inited', {
                mapStates: mapStates,
                mapActions: mapActions,
                store: store,
                component: this
              });
  
              if (typeof inited === 'function') {
                inited.call(this);
              }
            };
  
            var disposed = componentProto.disposed;
  
            componentProto.disposed = function () {
              store.unlisten(this._storeListener);
              this._storeListener = null;
              (0, _emitter2.default)('store-comp-disposed', {
                mapStates: mapStates,
                mapActions: mapActions,
                store: store,
                component: this
              });
  
              if (typeof disposed === 'function') {
                disposed.call(this);
              }
            }; // map actions
  
  
            if (!componentProto.actions) {
              componentProto.actions = {};
  
              if (mapActions instanceof Array) {
                mapActions.forEach(function (actionName) {
                  componentProto.actions[actionName] = function (payload) {
                    return store.dispatch(actionName, payload);
                  };
                });
              } else {
                var _loop = function _loop(_key) {
                  var actionName = mapActions[_key];
  
                  componentProto.actions[_key] = function (payload) {
                    return store.dispatch(actionName, payload);
                  };
                };
  
                for (var _key in mapActions) {
                  _loop(_key);
                }
              }
            }
  
            return ComponentClass;
          };
        }
  
        function clone(source) {
          if (source == null) {
            return source;
          }
  
          if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object') {
            if (source instanceof Array) {
              return source.map(function (item) {
                return clone(item);
              });
            } else if (source instanceof Date) {
              return new Date(source.getTime());
            }
  
            var result = {};
  
            for (var key in source) {
              result[key] = clone(source[key]);
            }
  
            return result;
          }
  
          return source;
        }
        /**
         * 判断 connect 的 state 是否需要更新
         *
         * @param {Object} info state的connect信息对象
         * @param {Array} diff 数据变更的diff信息
         * @return {boolean}
         */
  
  
        function calcUpdateInfo(info, diff) {
          if (info.stateName) {
            var stateNameLen = info.stateName.length;
  
            for (var i = 0, diffLen = diff.length; i < diffLen; i++) {
              var diffInfo = diff[i];
              var target = diffInfo.target;
              var matchThisDiff = true;
              var j = 0;
              var targetLen = target.length;
  
              for (; j < targetLen && j < stateNameLen; j++) {
                if (info.stateName[j] != target[j]) {
                  matchThisDiff = false;
                  break;
                }
              }
  
              if (matchThisDiff) {
                var updateInfo = {
                  componentData: info.dataName,
                  storeData: info.stateName
                };
  
                if (targetLen > stateNameLen) {
                  updateInfo.storeData = target;
                  updateInfo.componentData += '.' + target.slice(stateNameLen).join('.');
                }
  
                if (targetLen >= stateNameLen && diffInfo.splice) {
                  updateInfo.spliceArgs = [diffInfo.splice.index, diffInfo.splice.deleteCount];
  
                  if (diffInfo.splice.insertions instanceof Array) {
                    updateInfo.spliceArgs.push.apply(updateInfo.spliceArgs, diffInfo.splice.insertions);
                  }
                }
  
                return updateInfo;
              }
            }
          }
        }
        /**
         * createConnector 创建连接
         *
         * @param {Store} store store实例
         * @return {Function}
         */
  
  
        function createConnector(store) {
          if (store instanceof _store2.default) {
            return function (mapStates, mapActions) {
              return connect(mapStates, mapActions, store);
            };
          }
  
          throw new Error(store + ' must be an instance of Store!');
        }
        /***/
  
      },
      /* 4 */
  
      /***/
      function (module, exports, __webpack_require__) {
        "use strict";
  
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = emitDevtool;
        /**
         * san-store
         * Copyright 2017 Baidu Inc. All rights reserved.
         *
         * @file San Devtool emitter
         * @author luyuan
         */
  
        var isBrowser = typeof window !== 'undefined';
  
        function emitDevtool(name, args) {
          if (isBrowser && window['__san_devtool__']) {
            window['__san_devtool__'].emit(name, args);
          }
        }
        /***/
  
      },
      /* 5 */
  
      /***/
      function (module, exports, __webpack_require__) {
        "use strict";
  
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = flattenDiff;
        /**
         * san-store
         * Copyright 2017 Baidu Inc. All rights reserved.
         *
         * @file 把 san-update 给予的 diff 对象扁平化成数组
         * @author errorrik
         */
  
        /**
         * 把 san-update 给予的 diff 对象扁平化成数组
         *
         * @param {Object} diff diff 对象
         * @return {Array}
         */
  
        function flattenDiff(diff) {
          var flatDiff = [];
          var pos = [];
  
          function readDiffObject(source) {
            if (source.$change) {
              source.target = pos.slice(0);
              flatDiff.push(source);
              return;
            }
  
            for (var key in source) {
              if (source.hasOwnProperty(key)) {
                pos.push(key);
                readDiffObject(source[key]);
                pos.pop();
              }
            }
          }
  
          readDiffObject(diff);
          return flatDiff;
        }
        /***/
  
      },
      /* 6 */
  
      /***/
      function (module, exports, __webpack_require__) {
        "use strict";
  
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.connect = exports.Store = exports.version = exports.store = undefined;
  
        var _store = __webpack_require__(1);
  
        var _store2 = _interopRequireDefault(_store);
  
        var _createConnector = __webpack_require__(3);
  
        var _createConnector2 = _interopRequireDefault(_createConnector);
  
        var _emitter = __webpack_require__(0);
  
        var _emitter2 = _interopRequireDefault(_emitter);
  
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            default: obj
          };
        }
        /**
         * 默认的全局 Store 实例
         * 通常我们认为在一个应用应该具有一个全局唯一的 store，管理整个应用状态
         *
         * @type {Store}
         */
  
  
        var store = exports.store = new _store2.default({
          name: '__default__'
        }); // Alternatives for not receiving the events including default store info from
        // connector.
  
        /**
         * san-store
         * Copyright 2017 Baidu Inc. All rights reserved.
         *
         * @file 主模块
         * @author errorrik
         */
  
        (0, _emitter2.default)('store-default-inited', {
          store: store
        });
        /**
         * 版本号
         *
         * @type {string}
         */
  
        var version = exports.version = '1.1.3';
        exports.Store = _store2.default;
        var connect = exports.connect = {
          san: (0, _createConnector2.default)(store),
          createConnector: _createConnector2.default
        };
        /***/
      }
      /******/
      ])
    );
  });
  
  /***/ }),
  
  /***/ "./node_modules/san-update/index.min.js":
  /*!**********************************************!*\
    !*** ./node_modules/san-update/index.min.js ***!
    \**********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  !function (r, n) {
     true ? n(exports) : undefined;
  }(this, function (r) {
    var n = function (r) {
      var n = {};
  
      for (var e in r) n[e] = r[e];
  
      return n;
    },
        e = function (r, n) {
      for (var e = 0; e < r.length; e++) {
        var t = r[e];
        if (n(t)) return t;
      }
    },
        t = function (r) {
      if (!r) return !1;
  
      for (var n in r) if (r.hasOwnProperty(n)) return !0;
  
      return !1;
    },
        o = function (r, n) {
      for (var e = 0; e < r.length; e++) if (r[e] === n) return e;
  
      return -1;
    },
        i = function (r, n, e) {
      return {
        $change: r,
        oldValue: n,
        newValue: e
      };
    },
        u = function (r, n, e, t, o) {
      return {
        $change: "change",
        oldValue: r,
        newValue: n,
        splice: {
          index: e,
          deleteCount: t,
          insertions: o
        }
      };
    },
        a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (r) {
      return typeof r;
    } : function (r) {
      return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    },
        f = function (r, n, e) {
      return n in r ? Object.defineProperty(r, n, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : r[n] = e, r;
    },
        c = function () {
      function r(r, n) {
        var e = [],
            t = !0,
            o = !1,
            i = void 0;
  
        try {
          for (var u, a = r[Symbol.iterator](); !(t = (u = a.next()).done) && (e.push(u.value), !n || e.length !== n); t = !0);
        } catch (r) {
          o = !0, i = r;
        } finally {
          try {
            !t && a.return && a.return();
          } finally {
            if (o) throw i;
          }
        }
  
        return e;
      }
  
      return function (n, e) {
        if (Array.isArray(n)) return n;
        if (Symbol.iterator in Object(n)) return r(n, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        s = function (r) {
      return Array.isArray(r) ? r : Array.from(r);
    },
        l = function (r) {
      if (Array.isArray(r)) {
        for (var n = 0, e = Array(r.length); n < r.length; n++) e[n] = r[n];
  
        return e;
      }
  
      return Array.from(r);
    },
        y = {},
        p = {
      $set: function (r, n, e) {
        var t = r[n];
        return e === t ? [e, null] : [e, i(r.hasOwnProperty(n) ? "change" : "add", t, e)];
      },
      $push: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $push command on non array object is forbidden.");
        var o = t.concat([e]);
        return [o, u(t, o, t.length, 0, [e])];
      },
      $unshift: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $unshift command on non array object is forbidden.");
        var o = [e].concat(t);
        return [o, u(t, o, 0, 0, [e])];
      },
      $pop: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $pop command on non array object is forbidden.");
  
        if (t.length && (e === !0 || "function" == typeof e && e(t))) {
          var o = t.slice(0, -1);
          return [o, u(t, o, t.length, 1, [])];
        }
  
        return [t, null];
      },
      $shift: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $shift command on non array object is forbidden.");
  
        if (t.length && (e === !0 || "function" == typeof e && e(t))) {
          var o = t.slice(1);
          return [o, u(t, o, t.length, 1, [])];
        }
  
        return [t, null];
      },
      $removeAt: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $removeAt command on non array object is forbidden.");
        if (e >= t.length || e < 0) return [t, null];
        var o = t.slice(0, e).concat(t.slice(e + 1));
        return [o, u(t, o, e, 1, [])];
      },
      $remove: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $removeAt command on non array object is forbidden.");
        var i = o(t, e);
        if (i === -1) return [t, null];
        var a = t.slice(0, i).concat(t.slice(i + 1));
        return [a, u(t, a, i, 1, [])];
      },
      $splice: function (r, n, e) {
        var t = s(e),
            o = t[0],
            i = t[1],
            a = t.slice(2),
            f = r[n];
        if (!Array.isArray(f)) throw new Error("Usage of $splice command on non array object is forbidden.");
        var c = f.slice(0, o).concat(a).concat(f.slice(o + i));
        return [c, u(f, c, o, i, a)];
      },
      $map: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $map command on non array object is forbidden.");
        var o = t.map(e);
        return [o, i("change", t, o)];
      },
      $filter: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $filter command on non array object is forbidden.");
        var o = t.filter(e);
        return [o, i("change", t, o)];
      },
      $reduce: function (r, n, e) {
        var t = r[n];
        if (!Array.isArray(t)) throw new Error("Usage of $reduce command on non array object is forbidden.");
        var o = "function" == typeof e ? t.reduce(e) : t.reduce.apply(t, l(e));
        return [o, i("change", t, o)];
      },
      $merge: function (r, e, t) {
        var o = r[e] || {},
            u = n(o),
            a = {};
  
        for (var f in t) if (t.hasOwnProperty(f)) {
          var c = t[f],
              s = o[f];
  
          if (c !== s) {
            u[f] = c;
            var l = o.hasOwnProperty(f) ? "change" : "add";
            a[f] = i(l, s, c);
          }
        }
  
        return [u, a];
      },
      $defaults: function (r, e, t) {
        var o = r[e],
            u = n(o),
            a = {};
  
        for (var f in t) t.hasOwnProperty(f) && void 0 === u[f] && (u[f] = t[f], a[f] = i("add", void 0, t[f]));
  
        return [u, a];
      },
      $apply: function (r, n, e) {
        var t = e(r[n]);
        return [t, i(r.hasOwnProperty(n) ? "change" : "add", r[n], t)];
      },
      $omit: function (r, n, e) {
        var t = r[n];
        return e === !0 || "function" == typeof e && e(t) ? [y, i("remove", t, void 0)] : [t, null];
      },
      $composeBefore: function (r, n, e) {
        var t = r[n];
        if ("function" != typeof t) throw new Error("Usage of $composeBefore command on non function object is forbidden.");
        if ("function" != typeof e) throw new Error("Passing non function object to $composeBefore command is forbidden");
  
        var o = function () {
          return t(e.apply(void 0, arguments));
        };
  
        return [o, i("change", t, o)];
      },
      $composeAfter: function (r, n, e) {
        var t = r[n];
        if ("function" != typeof t) throw new Error("Usage of $composeAfter command on non function object is forbidden.");
        if ("function" != typeof e) throw new Error("Passing non function object to $composeAfter command is forbidden");
  
        var o = function () {
          return e(t.apply(void 0, arguments));
        };
  
        return [o, i("change", t, o)];
      }
    },
        d = Object.keys(p),
        v = d.map(function (r) {
      return r.slice(1);
    }),
        h = function r(n, o) {
      var i = e(d, function (r) {
        return o.hasOwnProperty(r);
      });
  
      if (i) {
        var u = {
          source: n
        },
            a = o[i];
        return p[i](u, "source", a);
      }
  
      var f = function (t) {
        var i = o[t],
            u = e(d, function (r) {
          return i.hasOwnProperty(r);
        });
        return u ? p[u](n, t, i[u]) : r(n[t] || {}, i);
      },
          s = function (r, n) {
        for (var e in o) if (!r.hasOwnProperty(e) && o.hasOwnProperty(e)) {
          var t = f(e),
              i = c(t, 2),
              u = i[0],
              a = i[1];
          n[e] = a, u !== y && (r[e] = u);
        }
  
        return [r, n];
      };
  
      if (Array.isArray(n)) {
        for (var l = [], v = {}, h = 0; h < n.length; h++) if (o.hasOwnProperty(h)) {
          var m = f(h),
              $ = c(m, 2),
              w = $[0],
              g = $[1];
          t(g) && (v[h] = g), w !== y && l.push(w);
        } else l.push(n[h]);
  
        return s(l, v);
      }
  
      var b = {},
          A = {};
  
      for (var j in n) if (o.hasOwnProperty(j)) {
        var O = f(j),
            P = c(O, 2),
            w = P[0],
            g = P[1];
        t(g) && (A[j] = g), w !== y && (b[j] = w);
      } else b[j] = n[j];
  
      return s(b, A);
    },
        m = function (r, n) {
      return h(r, n)[0];
    },
        $ = "[".charCodeAt(0),
        w = function (r) {
      if (Array.isArray(r)) return r;
  
      for (var n = (r + "").split("."), e = [], t = 0; t < n.length; t++) {
        var o = n[t],
            i = o.indexOf("[");
        if (i >= 0) for (i > 0 && (e.push(o.slice(0, i)), o = o.slice(i)); o.charCodeAt(0) === $;) {
          var u = o.indexOf("]");
          if (u < 0) throw new Error("Property path syntax error: " + r);
          var a = o.slice(1, u);
          if (/^[0-9]+$/.test(a)) e.push(+a);else {
            if (!/^(['"])([^\1]+)\1$/.test(a)) throw new Error("Property path syntax error: " + r);
            e.push(new Function("return " + a)());
          }
          o = o.slice(u + 1);
        } else e.push(o);
      }
  
      return e;
    },
        g = function (r, n) {
      if (null == r) return n;
  
      for (var e = w(r), t = {}, o = t, i = 0; i < e.length - 1; i++) o = o[e[i]] = {};
  
      return o[e[e.length - 1]] = n, t;
    },
        b = function (r, n, e) {
      return m(r, g(n, {
        $set: e
      }));
    },
        A = function (r, n, e) {
      return m(r, g(n, {
        $push: e
      }));
    },
        j = function (r, n, e) {
      return m(r, g(n, {
        $unshift: e
      }));
    },
        O = function (r, n, e) {
      return m(r, g(n, {
        $pop: e
      }));
    },
        P = function (r, n, e) {
      return m(r, g(n, {
        $shift: e
      }));
    },
        E = function (r, n, e) {
      return m(r, g(n, {
        $removeAt: e
      }));
    },
        U = function (r, n, e) {
      return m(r, g(n, {
        $remove: e
      }));
    },
        x = function (r, n, e, t) {
      for (var o = arguments.length, i = Array(o > 4 ? o - 4 : 0), u = 4; u < o; u++) i[u - 4] = arguments[u];
  
      var a = [e, t].concat(i);
      return m(r, g(n, {
        $splice: a
      }));
    },
        S = function (r, n, e) {
      return m(r, g(n, {
        $map: e
      }));
    },
        B = function (r, n, e) {
      return m(r, g(n, {
        $filter: e
      }));
    },
        D = function (r, n) {
      for (var e = arguments.length, t = Array(e > 2 ? e - 2 : 0), o = 2; o < e; o++) t[o - 2] = arguments[o];
  
      var i = 1 === t.length ? {
        $reduce: t[0]
      } : {
        $reduce: t
      };
      return m(r, g(n, i));
    },
        V = function (r, n, e) {
      return m(r, g(n, {
        $merge: e
      }));
    },
        C = function (r, n, e) {
      return m(r, g(n, {
        $defaults: e
      }));
    },
        W = function (r, n, e) {
      return m(r, g(n, {
        $apply: e
      }));
    },
        _ = function (r, n) {
      var e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
      return m(r, g(n, {
        $omit: e
      }));
    },
        k = function (r, n, e) {
      return m(r, g(n, {
        $composeBefore: e
      }));
    },
        F = function (r, n, e) {
      return m(r, g(n, {
        $composeAfter: e
      }));
    },
        I = function (r, n, e, t) {
      if (Array.isArray(e)) {
        var o = function () {
          var o = e.map(function (n) {
            return n(r);
          }),
              i = function (r) {
            return t.apply(void 0, l(o).concat([r]));
          };
  
          return {
            v: W(r, n, i)
          };
        }();
  
        if ("object" === ("undefined" == typeof o ? "undefined" : a(o))) return o.v;
      }
  
      var i = e(r),
          u = function (r) {
        return t(i, r);
      };
  
      return W(r, n, u);
    },
        M = {},
        T = function r(n, e) {
      return v.reduce(function (t, o) {
        return t[o] = function (t) {
          for (var i = arguments.length, u = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) u[a - 1] = arguments[a];
  
          var c = f({}, "$" + o, 1 === u.length ? u[0] : u),
              s = V(e, t, c);
          return r(n, s);
        }, t;
      }, {
        value: function () {
          return m(n, e);
        },
        withDiff: function () {
          return h(n, e);
        }
      });
    },
        q = function (r) {
      return T(r, M);
    },
        z = function r(n) {
      return v.reduce(function (e, t) {
        return e[t] = function (e) {
          for (var o = arguments.length, i = Array(o > 1 ? o - 1 : 0), u = 1; u < o; u++) i[u - 1] = arguments[u];
  
          var a = f({}, "$" + t, 1 === i.length ? i[0] : i),
              c = V(n, e, a);
          return r(c);
        }, e;
      }, {
        build: function () {
          var r = function (r) {
            return m(r, n);
          };
  
          return r.withDiff = function (r) {
            return h(r, n);
          }, r;
        },
        buildWithDiff: function () {
          return function (r) {
            return h(r, n);
          };
        }
      });
    },
        G = z({}),
        H = function () {
      return G;
    };
  
    r.chain = q, r.immutable = q, r.macro = H, r.builder = H, r.updateBuilder = H, r.update = m, r.withDiff = h, r.set = b, r.push = A, r.unshift = j, r.pop = O, r.shift = P, r.removeAt = E, r.remove = U, r.splice = x, r.map = S, r.filter = B, r.reduce = D, r.merge = V, r.defaults = C, r.apply = W, r.omit = _, r.composeBefore = k, r.composeAfter = F, r.applyWith = I, Object.defineProperty(r, "__esModule", {
      value: !0
    });
  });
  
  /***/ }),
  
  /***/ "./node_modules/san/dist/san.dev.js":
  /*!******************************************!*\
    !*** ./node_modules/san/dist/san.dev.js ***!
    \******************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(setImmediate) {/**
   * Copyright (c) Baidu Inc. All rights reserved.
   *
   * This source code is licensed under the MIT license.
   * See LICENSE file in the project root for license information.
   *
   * @file San 主文件
   */
  (function (root) {
    // 人工调整打包代码顺序，通过注释手工写一些依赖
    //     // require('./util/guid');
    //     // require('./util/empty');
    //     // require('./util/extend');
    //     // require('./util/inherits');
    //     // require('./util/each');
    //     // require('./util/contains');
    //     // require('./util/bind');
    //     // require('./browser/on');
    //     // require('./browser/un');
    //     // require('./browser/svg-tags');
    //     // require('./browser/create-el');
    //     // require('./browser/remove-el');
    //     // require('./util/next-tick');
    //     // require('./browser/ie');
    //     // require('./browser/ie-old-than-9');
    //     // require('./browser/input-event-compatible');
    //     // require('./browser/auto-close-tags');
    //     // require('./util/data-types.js');
    //     // require('./util/create-data-types-checker.js');
    //     // require('./parser/walker');
    //     // require('./parser/parse-template');
    //     // require('./runtime/change-expr-compare');
    //     // require('./runtime/data-change-type');
    //     // require('./runtime/default-filters');
    //     // require('./view/life-cycle');
    //     // require('./view/node-type');
    //     // require('./view/get-prop-handler');
    //     // require('./view/is-data-change-by-element');
    //     // require('./view/get-event-listener');
    //     // require('./view/create-node');
  
    /**
    * Copyright (c) Baidu Inc. All rights reserved.
    *
    * This source code is licensed under the MIT license.
    * See LICENSE file in the project root for license information.
    *
    * @file 唯一id
    */
  
    /**
     * 获取唯一id
     *
     * @type {number} 唯一id
     */
    var guid = 1; // exports = module.exports = guid;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 空函数
     */
  
    /**
     * 啥都不干
     */
  
    function empty() {} // exports = module.exports = empty;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 属性拷贝
     */
  
    /**
     * 对象属性拷贝
     *
     * @param {Object} target 目标对象
     * @param {Object} source 源对象
     * @return {Object} 返回目标对象
     */
  
  
    function extend(target, source) {
      for (var key in source) {
        /* istanbul ignore else  */
        if (source.hasOwnProperty(key)) {
          var value = source[key];
  
          if (typeof value !== 'undefined') {
            target[key] = value;
          }
        }
      }
  
      return target;
    } // exports = module.exports = extend;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 构建类之间的继承关系
     */
    // var extend = require('./extend');
  
    /**
     * 构建类之间的继承关系
     *
     * @param {Function} subClass 子类函数
     * @param {Function} superClass 父类函数
     */
  
  
    function inherits(subClass, superClass) {
      /* jshint -W054 */
      var subClassProto = subClass.prototype;
      var F = new Function();
      F.prototype = superClass.prototype;
      subClass.prototype = new F();
      subClass.prototype.constructor = subClass;
      extend(subClass.prototype, subClassProto);
      /* jshint +W054 */
    } // exports = module.exports = inherits;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 遍历数组
     */
  
    /**
     * 遍历数组集合
     *
     * @param {Array} array 数组源
     * @param {function(Any,number):boolean} iterator 遍历函数
     */
  
  
    function each(array, iterator) {
      if (array && array.length > 0) {
        for (var i = 0, l = array.length; i < l; i++) {
          if (iterator(array[i], i) === false) {
            break;
          }
        }
      }
    } // exports = module.exports = each;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 判断数组中是否包含某项
     */
    // var each = require('./each');
  
    /**
     * 判断数组中是否包含某项
     *
     * @param {Array} array 数组
     * @param {*} value 包含的项
     * @return {boolean}
     */
  
  
    function contains(array, value) {
      var result = false;
      each(array, function (item) {
        result = item === value;
        return !result;
      });
      return result;
    } // exports = module.exports = contains;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file bind函数
     */
  
    /**
     * Function.prototype.bind 方法的兼容性封装
     *
     * @param {Function} func 要bind的函数
     * @param {Object} thisArg this指向对象
     * @param {...*} args 预设的初始参数
     * @return {Function}
     */
  
  
    function bind(func, thisArg) {
      var nativeBind = Function.prototype.bind;
      var slice = Array.prototype.slice; // #[begin] allua
  
      if (nativeBind && func.bind === nativeBind) {
        // #[end]
        return nativeBind.apply(func, slice.call(arguments, 1)); // #[begin] allua
      }
      /* istanbul ignore next */
  
  
      var args = slice.call(arguments, 2);
      /* istanbul ignore next */
  
      return function () {
        return func.apply(thisArg, args.concat(slice.call(arguments)));
      }; // #[end]
    } // exports = module.exports = bind;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file DOM 事件挂载
     */
  
    /**
     * DOM 事件挂载
     *
     * @inner
     * @param {HTMLElement} el DOM元素
     * @param {string} eventName 事件名
     * @param {Function} listener 监听函数
     * @param {boolean} capture 是否是捕获阶段
     */
  
  
    function on(el, eventName, listener, capture) {
      // #[begin] allua
  
      /* istanbul ignore else */
      if (el.addEventListener) {
        // #[end]
        el.addEventListener(eventName, listener, capture); // #[begin] allua
      } else {
        el.attachEvent('on' + eventName, listener);
      } // #[end]
  
    } // exports = module.exports = on;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file DOM 事件卸载
     */
  
    /**
     * DOM 事件卸载
     *
     * @inner
     * @param {HTMLElement} el DOM元素
     * @param {string} eventName 事件名
     * @param {Function} listener 监听函数
     * @param {boolean} capture 是否是捕获阶段
     */
  
  
    function un(el, eventName, listener, capture) {
      // #[begin] allua
  
      /* istanbul ignore else */
      if (el.addEventListener) {
        // #[end]
        el.removeEventListener(eventName, listener, capture); // #[begin] allua
      } else {
        el.detachEvent('on' + eventName, listener);
      } // #[end]
  
    } // exports = module.exports = un;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 将字符串逗号切分返回对象
     */
    // var each = require('../util/each');
  
    /**
     * 将字符串逗号切分返回对象
     *
     * @param {string} source 源字符串
     * @return {Object}
     */
  
  
    function splitStr2Obj(source) {
      var result = {};
      each(source.split(','), function (key) {
        result[key] = key;
      });
      return result;
    } // exports = module.exports = splitStr2Obj;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file SVG标签表
     */
    // var splitStr2Obj = require('../util/split-str-2-obj');
  
    /**
     * svgTags
     *
     * @see https://www.w3.org/TR/SVG/svgdtd.html 只取常用
     * @type {Object}
     */
  
  
    var svgTags = splitStr2Obj('' // structure
    + 'svg,g,defs,desc,metadata,symbol,use,' // image & shape
    + 'image,path,rect,circle,line,ellipse,polyline,polygon,' // text
    + 'text,tspan,tref,textpath,' // other
    + 'marker,pattern,clippath,mask,filter,cursor,view,animate,' // font
    + 'font,font-face,glyph,missing-glyph,' // camel
    + 'animateColor,animateMotion,animateTransform,textPath,foreignObject'); // exports = module.exports = svgTags;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file DOM创建
     */
    // var svgTags = require('./svg-tags');
  
    /**
     * 创建 DOM 元素
     *
     * @param  {string} tagName tagName
     * @return {HTMLElement}
     */
  
    function createEl(tagName) {
      if (svgTags[tagName] && document.createElementNS) {
        return document.createElementNS('http://www.w3.org/2000/svg', tagName);
      }
  
      return document.createElement(tagName);
    } // exports = module.exports = createEl;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 移除DOM
     */
  
    /**
     * 将 DOM 从页面中移除
     *
     * @param {HTMLElement} el DOM元素
     */
  
  
    function removeEl(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    } // exports = module.exports = removeEl;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 在下一个时间周期运行任务
     */
    // 该方法参照了vue2.5.0的实现，感谢vue团队
    // SEE: https://github.com/vuejs/vue/blob/0948d999f2fddf9f90991956493f976273c5da1f/src/core/util/env.js#L68
    // var bind = require('./bind');
  
    /**
     * 下一个周期要执行的任务列表
     *
     * @inner
     * @type {Array}
     */
  
  
    var nextTasks = [];
    /**
     * 执行下一个周期任务的函数
     *
     * @inner
     * @type {Function}
     */
  
    var nextHandler;
    /**
     * 浏览器是否支持原生Promise
     * 对Promise做判断，是为了禁用一些不严谨的Promise的polyfill
     *
     * @inner
     * @type {boolean}
     */
  
    var isNativePromise = typeof Promise === 'function' && /native code/.test(Promise);
    /**
     * 在下一个时间周期运行任务
     *
     * @inner
     * @param {Function} fn 要运行的任务函数
     * @param {Object=} thisArg this指向对象
     */
  
    function nextTick(fn, thisArg) {
      if (thisArg) {
        fn = bind(fn, thisArg);
      }
  
      nextTasks.push(fn);
  
      if (nextHandler) {
        return;
      }
  
      nextHandler = function () {
        var tasks = nextTasks.slice(0);
        nextTasks = [];
        nextHandler = null;
  
        for (var i = 0, l = tasks.length; i < l; i++) {
          tasks[i]();
        }
      }; // 非标准方法，但是此方法非常吻合要求。
  
      /* istanbul ignore next */
  
  
      if (typeof setImmediate === 'function') {
        setImmediate(nextHandler);
      } // 用MessageChannel去做setImmediate的polyfill
      // 原理是将新的message事件加入到原有的dom events之后
      else if (typeof MessageChannel === 'function') {
          var channel = new MessageChannel();
          var port = channel.port2;
          channel.port1.onmessage = nextHandler;
          port.postMessage(1);
        } // for native app
        else if (isNativePromise) {
            Promise.resolve().then(nextHandler);
          } else {
            setTimeout(nextHandler, 0);
          }
    } // exports = module.exports = nextTick;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file ie版本号
     */
    // #[begin] allua
  
    /**
     * 从userAgent中ie版本号的匹配信息
     *
     * @type {Array}
     */
  
  
    var ieVersionMatch = typeof navigator !== 'undefined' && navigator.userAgent.match(/(msie|trident)(\s*|\/)([0-9]+)/i);
    /**
     * ie版本号，非ie时为0
     *
     * @type {number}
     */
  
    var ie = ieVersionMatch ?
    /* istanbul ignore next */
    ieVersionMatch[3] - 0 : 0;
  
    if (ie && !/msie/i.test(ieVersionMatch[1])) {
      ie += 4;
    } // #[end]
    // exports = module.exports = ie;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 是否 IE 并且小于 9
     */
    // var ie = require('./ie');
    // HACK:
    // 1. IE8下，设置innerHTML时如果以html comment开头，comment会被自动滤掉
    //    为了保证stump存在，需要设置完html后，createComment并appendChild/insertBefore
    // 2. IE8下，innerHTML还不支持custom element，所以需要用div替代，不用createElement
    // 3. 虽然IE8已经优化了字符串+连接，碎片化连接性能不再退化
    //    但是由于上面多个兼容场景都用 < 9 判断，所以字符串连接也沿用
    //    所以结果是IE8下字符串连接用的是数组join的方式
    // #[begin] allua
  
    /**
     * 是否 IE 并且小于 9
     */
  
  
    var ieOldThan9 = ie &&
    /* istanbul ignore next */
    ie < 9; // #[end]
    // exports = module.exports = ieOldThan9;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 触发元素事件
     */
  
    /**
     * 触发元素事件
     *
     * @inner
     * @param {HTMLElement} el DOM元素
     * @param {string} eventName 事件名
     */
  
    function trigger(el, eventName) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent(eventName, true, true);
      el.dispatchEvent(event);
    } // exports = module.exports = trigger;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解决 IE9 在表单元素中删除字符时不触发事件的问题
     */
    // var ie = require('./ie');
    // var on = require('./on');
    // var trigger = require('./trigger');
    // #[begin] allua
  
    /* istanbul ignore if */
  
  
    if (ie === 9) {
      on(document, 'selectionchange', function () {
        var el = document.activeElement;
  
        if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
          trigger(el, 'input');
        }
      });
    } // #[end]
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 自闭合标签表
     */
    // var splitStr2Obj = require('../util/split-str-2-obj');
  
    /**
     * 自闭合标签列表
     *
     * @type {Object}
     */
  
  
    var autoCloseTags = splitStr2Obj('area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr'); // exports = module.exports = autoCloseTags;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file data types
     */
    // var bind = require('./bind');
    // var empty = require('./empty');
    // var extend = require('./extend');
    // #[begin] error
  
    var ANONYMOUS_CLASS_NAME = '<<anonymous>>';
    /**
     * 获取精确的类型
     *
     * @NOTE 如果 obj 是一个 DOMElement，我们会返回 `element`；
     *
     * @param  {*} obj 目标
     * @return {string}
     */
  
    function getDataType(obj) {
      // 不支持element了。data应该是纯数据
      // if (obj && obj.nodeType === 1) {
      //     return 'element';
      // }
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    } // #[end]
  
    /**
     * 创建链式的数据类型校验器
     *
     * @param  {Function} validate 真正的校验器
     * @return {Function}
     */
  
  
    function createChainableChecker(validate) {
      /* istanbul ignore next */
      var chainedChecker = function () {};
  
      chainedChecker.isRequired = empty; // 只在 error 功能启用时才有实际上的 dataTypes 检测
      // #[begin] error
  
      validate = validate || empty;
  
      var checkType = function (isRequired, data, dataName, componentName, fullDataName) {
        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);
        /* istanbul ignore next */
  
        componentName = componentName || ANONYMOUS_CLASS_NAME; // 如果是 null 或 undefined，那么要提前返回啦
  
        if (dataValue == null) {
          // 是 required 就报错
          if (isRequired) {
            throw new Error('[SAN ERROR] ' + 'The `' + dataName + '` ' + 'is marked as required in `' + componentName + '`, ' + 'but its value is ' + dataType);
          } // 不是 required，那就是 ok 的
  
  
          return;
        }
  
        validate(data, dataName, componentName, fullDataName);
      };
  
      chainedChecker = bind(checkType, null, false);
      chainedChecker.isRequired = bind(checkType, null, true); // #[end]
  
      return chainedChecker;
    } // #[begin] error
  
    /**
     * 生成主要类型数据校验器
     *
     * @param  {string} type 主类型
     * @return {Function}
     */
  
  
    function createPrimaryTypeChecker(type) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName) {
        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);
  
        if (dataType !== type) {
          throw new Error('[SAN ERROR] ' + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type' + '(' + dataType + ' supplied to ' + componentName + ', ' + 'expected ' + type + ')');
        }
      });
    }
    /**
     * 生成 arrayOf 校验器
     *
     * @param  {Function} arrayItemChecker 数组中每项数据的校验器
     * @return {Function}
     */
  
  
    function createArrayOfChecker(arrayItemChecker) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName) {
        if (typeof arrayItemChecker !== 'function') {
          throw new Error('[SAN ERROR] ' + 'Data `' + dataName + '` of `' + componentName + '` has invalid ' + 'DataType notation inside `arrayOf`, expected `function`');
        }
  
        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);
  
        if (dataType !== 'array') {
          throw new Error('[SAN ERROR] ' + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type' + '(' + dataType + ' supplied to ' + componentName + ', ' + 'expected array)');
        }
  
        for (var i = 0, len = dataValue.length; i < len; i++) {
          arrayItemChecker(dataValue, i, componentName, fullDataName + '[' + i + ']');
        }
      });
    }
    /**
     * 生成 instanceOf 检测器
     *
     * @param  {Function|Class} expectedClass 期待的类
     * @return {Function}
     */
  
  
    function createInstanceOfChecker(expectedClass) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName) {
        var dataValue = data[dataName];
  
        if (dataValue instanceof expectedClass) {
          return;
        }
  
        var dataValueClassName = dataValue.constructor && dataValue.constructor.name ? dataValue.constructor.name :
        /* istanbul ignore next */
        ANONYMOUS_CLASS_NAME;
        /* istanbul ignore next */
  
        var expectedClassName = expectedClass.name || ANONYMOUS_CLASS_NAME;
        throw new Error('[SAN ERROR] ' + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type' + '(' + dataValueClassName + ' supplied to ' + componentName + ', ' + 'expected instance of ' + expectedClassName + ')');
      });
    }
    /**
     * 生成 shape 校验器
     *
     * @param  {Object} shapeTypes shape 校验规则
     * @return {Function}
     */
  
  
    function createShapeChecker(shapeTypes) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName) {
        if (getDataType(shapeTypes) !== 'object') {
          throw new Error('[SAN ERROR] ' + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid ' + 'DataType notation inside `shape`, expected `object`');
        }
  
        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);
  
        if (dataType !== 'object') {
          throw new Error('[SAN ERROR] ' + 'Invalid ' + componentName + ' data `' + fullDataName + '` of type' + '(' + dataType + ' supplied to ' + componentName + ', ' + 'expected object)');
        }
  
        for (var shapeKeyName in shapeTypes) {
          /* istanbul ignore else  */
          if (shapeTypes.hasOwnProperty(shapeKeyName)) {
            var checker = shapeTypes[shapeKeyName];
  
            if (typeof checker === 'function') {
              checker(dataValue, shapeKeyName, componentName, fullDataName + '.' + shapeKeyName);
            }
          }
        }
      });
    }
    /**
     * 生成 oneOf 校验器
     *
     * @param  {Array} expectedEnumValues 期待的枚举值
     * @return {Function}
     */
  
  
    function createOneOfChecker(expectedEnumValues) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName) {
        if (getDataType(expectedEnumValues) !== 'array') {
          throw new Error('[SAN ERROR] ' + 'Data `' + fullDataName + '` of `' + componentName + '` has invalid ' + 'DataType notation inside `oneOf`, array is expected.');
        }
  
        var dataValue = data[dataName];
  
        for (var i = 0, len = expectedEnumValues.length; i < len; i++) {
          if (dataValue === expectedEnumValues[i]) {
            return;
          }
        }
  
        throw new Error('[SAN ERROR] ' + 'Invalid ' + componentName + ' data `' + fullDataName + '` of value' + '(`' + dataValue + '` supplied to ' + componentName + ', ' + 'expected one of ' + expectedEnumValues.join(',') + ')');
      });
    }
    /**
     * 生成 oneOfType 校验器
     *
     * @param  {Array<Function>} expectedEnumOfTypeValues 期待的枚举类型
     * @return {Function}
     */
  
  
    function createOneOfTypeChecker(expectedEnumOfTypeValues) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName) {
        if (getDataType(expectedEnumOfTypeValues) !== 'array') {
          throw new Error('[SAN ERROR] ' + 'Data `' + dataName + '` of `' + componentName + '` has invalid ' + 'DataType notation inside `oneOf`, array is expected.');
        }
  
        var dataValue = data[dataName];
  
        for (var i = 0, len = expectedEnumOfTypeValues.length; i < len; i++) {
          var checker = expectedEnumOfTypeValues[i];
  
          if (typeof checker !== 'function') {
            continue;
          }
  
          try {
            checker(data, dataName, componentName, fullDataName); // 如果 checker 完成校验没报错，那就返回了
  
            return;
          } catch (e) {// 如果有错误，那么应该把错误吞掉
          }
        } // 所有的可接受 type 都失败了，才丢一个异常
  
  
        throw new Error('[SAN ERROR] ' + 'Invalid ' + componentName + ' data `' + dataName + '` of value' + '(`' + dataValue + '` supplied to ' + componentName + ')');
      });
    }
    /**
     * 生成 objectOf 校验器
     *
     * @param  {Function} typeChecker 对象属性值校验器
     * @return {Function}
     */
  
  
    function createObjectOfChecker(typeChecker) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName) {
        if (typeof typeChecker !== 'function') {
          throw new Error('[SAN ERROR] ' + 'Data `' + dataName + '` of `' + componentName + '` has invalid ' + 'DataType notation inside `objectOf`, expected function');
        }
  
        var dataValue = data[dataName];
        var dataType = getDataType(dataValue);
  
        if (dataType !== 'object') {
          throw new Error('[SAN ERROR] ' + 'Invalid ' + componentName + ' data `' + dataName + '` of type' + '(' + dataType + ' supplied to ' + componentName + ', ' + 'expected object)');
        }
  
        for (var dataKeyName in dataValue) {
          /* istanbul ignore else  */
          if (dataValue.hasOwnProperty(dataKeyName)) {
            typeChecker(dataValue, dataKeyName, componentName, fullDataName + '.' + dataKeyName);
          }
        }
      });
    }
    /**
     * 生成 exact 校验器
     *
     * @param  {Object} shapeTypes object 形态定义
     * @return {Function}
     */
  
  
    function createExactChecker(shapeTypes) {
      return createChainableChecker(function (data, dataName, componentName, fullDataName, secret) {
        if (getDataType(shapeTypes) !== 'object') {
          throw new Error('[SAN ERROR] ' + 'Data `' + dataName + '` of `' + componentName + '` has invalid ' + 'DataType notation inside `exact`');
        }
  
        var dataValue = data[dataName];
        var dataValueType = getDataType(dataValue);
  
        if (dataValueType !== 'object') {
          throw new Error('[SAN ERROR] ' + 'Invalid data `' + fullDataName + '` of type `' + dataValueType + '`' + '(supplied to ' + componentName + ', expected `object`)');
        }
  
        var allKeys = {}; // 先合入 shapeTypes
  
        extend(allKeys, shapeTypes); // 再合入 dataValue
  
        extend(allKeys, dataValue); // 保证 allKeys 的类型正确
  
        for (var key in allKeys) {
          /* istanbul ignore else  */
          if (allKeys.hasOwnProperty(key)) {
            var checker = shapeTypes[key]; // dataValue 中有一个多余的数据项
  
            if (!checker) {
              throw new Error('[SAN ERROR] ' + 'Invalid data `' + fullDataName + '` key `' + key + '` ' + 'supplied to `' + componentName + '`. ' + '(`' + key + '` is not defined in `DataTypes.exact`)');
            }
  
            if (!(key in dataValue)) {
              throw new Error('[SAN ERROR] ' + 'Invalid data `' + fullDataName + '` key `' + key + '` ' + 'supplied to `' + componentName + '`. ' + '(`' + key + '` is marked `required` in `DataTypes.exact`)');
            }
  
            checker(dataValue, key, componentName, fullDataName + '.' + key, secret);
          }
        }
      });
    } // #[end]
  
    /* eslint-disable fecs-valid-var-jsdoc */
  
  
    var DataTypes = {
      array: createChainableChecker(),
      object: createChainableChecker(),
      func: createChainableChecker(),
      string: createChainableChecker(),
      number: createChainableChecker(),
      bool: createChainableChecker(),
      symbol: createChainableChecker(),
      any: createChainableChecker,
      arrayOf: createChainableChecker,
      instanceOf: createChainableChecker,
      shape: createChainableChecker,
      oneOf: createChainableChecker,
      oneOfType: createChainableChecker,
      objectOf: createChainableChecker,
      exact: createChainableChecker
    }; // #[begin] error
  
    DataTypes = {
      any: createChainableChecker(),
      // 类型检测
      array: createPrimaryTypeChecker('array'),
      object: createPrimaryTypeChecker('object'),
      func: createPrimaryTypeChecker('function'),
      string: createPrimaryTypeChecker('string'),
      number: createPrimaryTypeChecker('number'),
      bool: createPrimaryTypeChecker('boolean'),
      symbol: createPrimaryTypeChecker('symbol'),
      // 复合类型检测
      arrayOf: createArrayOfChecker,
      instanceOf: createInstanceOfChecker,
      shape: createShapeChecker,
      oneOf: createOneOfChecker,
      oneOfType: createOneOfTypeChecker,
      objectOf: createObjectOfChecker,
      exact: createExactChecker
    };
    /* eslint-enable fecs-valid-var-jsdoc */
    // #[end]
    // module.exports = DataTypes;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 创建数据检测函数
     */
    // #[begin] error
  
    /**
     * 创建数据检测函数
     *
     * @param  {Object} dataTypes     数据格式
     * @param  {string} componentName 组件名
     * @return {Function}
     */
  
    function createDataTypesChecker(dataTypes, componentName) {
      /**
       * 校验 data 是否满足 data types 的格式
       *
       * @param  {*} data 数据
       */
      return function (data) {
        for (var dataTypeName in dataTypes) {
          /* istanbul ignore else  */
          if (dataTypes.hasOwnProperty(dataTypeName)) {
            var dataTypeChecker = dataTypes[dataTypeName];
  
            if (typeof dataTypeChecker !== 'function') {
              throw new Error('[SAN ERROR] ' + componentName + ':' + dataTypeName + ' is invalid; ' + 'it must be a function, usually from san.DataTypes');
            }
  
            dataTypeChecker(data, dataTypeName, componentName, dataTypeName);
          }
        }
      };
    } // #[end]
    // module.exports = createDataTypesChecker;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 字符串源码读取类
     */
  
    /**
     * 字符串源码读取类，用于模板字符串解析过程
     *
     * @class
     * @param {string} source 要读取的字符串
     */
  
  
    function Walker(source) {
      this.source = source;
      this.len = this.source.length;
      this.index = 0;
    }
    /**
     * 获取当前字符码
     *
     * @return {number}
     */
  
  
    Walker.prototype.currentCode = function () {
      return this.source.charCodeAt(this.index);
    };
    /**
     * 截取字符串片段
     *
     * @param {number} start 起始位置
     * @param {number} end 结束位置
     * @return {string}
     */
  
  
    Walker.prototype.cut = function (start, end) {
      return this.source.slice(start, end);
    };
    /**
     * 向前读取字符
     *
     * @param {number} distance 读取字符数
     */
  
  
    Walker.prototype.go = function (distance) {
      this.index += distance;
    };
    /**
     * 读取下一个字符，返回下一个字符的 code
     *
     * @return {number}
     */
  
  
    Walker.prototype.nextCode = function () {
      this.go(1);
      return this.currentCode();
    };
    /**
     * 获取相应位置字符的 code
     *
     * @param {number} index 字符位置
     * @return {number}
     */
  
  
    Walker.prototype.charCode = function (index) {
      return this.source.charCodeAt(index);
    };
    /**
     * 向前读取字符，直到遇到指定字符再停止
     * 未指定字符时，当遇到第一个非空格、制表符的字符停止
     *
     * @param {number=} charCode 指定字符的code
     * @return {boolean} 当指定字符时，返回是否碰到指定的字符
     */
  
  
    Walker.prototype.goUntil = function (charCode) {
      var code;
  
      while (this.index < this.len && (code = this.currentCode())) {
        switch (code) {
          case 32: // 空格 space
  
          case 9: // 制表符 tab
  
          case 13: // \r
  
          case 10:
            // \n
            this.index++;
            break;
  
          default:
            if (code === charCode) {
              this.index++;
              return 1;
            }
  
            return;
        }
      }
    };
    /**
     * 向前读取符合规则的字符片段，并返回规则匹配结果
     *
     * @param {RegExp} reg 字符片段的正则表达式
     * @param {boolean} isMatchStart 是否必须匹配当前位置
     * @return {Array?}
     */
  
  
    Walker.prototype.match = function (reg, isMatchStart) {
      reg.lastIndex = this.index;
      var match = reg.exec(this.source);
  
      if (match && (!isMatchStart || this.index === match.index)) {
        this.index = reg.lastIndex;
        return match;
      }
    }; // exports = module.exports = Walker;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 把 kebab case 字符串转换成 camel case
     */
  
    /**
     * 把 kebab case 字符串转换成 camel case
     *
     * @param {string} source 源字符串
     * @return {string}
     */
  
  
    function kebab2camel(source) {
      return source.replace(/-+(.)/ig, function (match, alpha) {
        return alpha.toUpperCase();
      });
    } // exports = module.exports = kebab2camel;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file bool属性表
     */
    // var splitStr2Obj = require('../util/split-str-2-obj');
  
    /**
     * bool属性表
     *
     * @type {Object}
     */
  
  
    var boolAttrs = splitStr2Obj('allowpaymentrequest,async,autofocus,autoplay,' + 'checked,controls,default,defer,disabled,formnovalidate,' + 'hidden,ismap,itemscope,loop,multiple,muted,nomodule,novalidate,' + 'open,readonly,required,reversed,selected,typemustmatch'); // exports = module.exports = boolAttrs;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 表达式类型
     */
  
    /**
     * 表达式类型
     *
     * @const
     * @type {Object}
     */
  
    var ExprType = {
      STRING: 1,
      NUMBER: 2,
      BOOL: 3,
      ACCESSOR: 4,
      INTERP: 5,
      CALL: 6,
      TEXT: 7,
      BINARY: 8,
      UNARY: 9,
      TERTIARY: 10,
      OBJECT: 11,
      ARRAY: 12,
      NULL: 13
    }; // exports = module.exports = ExprType;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 创建访问表达式对象
     */
    // var ExprType = require('./expr-type');
  
    /**
     * 创建访问表达式对象
     *
     * @param {Array} paths 访问路径
     * @return {Object}
     */
  
    function createAccessor(paths) {
      return {
        type: 4,
        paths: paths
      };
    } // exports = module.exports = createAccessor;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取字符串
     */
    // var ExprType = require('./expr-type');
  
    /**
     * 读取字符串
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readString(walker) {
      var startCode = walker.currentCode();
      var startIndex = walker.index;
      var charCode;
  
      walkLoop: while (charCode = walker.nextCode()) {
        switch (charCode) {
          case 92:
            // \
            walker.go(1);
            break;
  
          case startCode:
            walker.go(1);
            break walkLoop;
        }
      }
  
      var literal = walker.cut(startIndex, walker.index);
      return {
        type: 1,
        // 处理字符转义
        value: new Function('return ' + literal)()
      };
    } // exports = module.exports = readString;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取一元表达式
     */
    // var ExprType = require('./expr-type');
    // var readString = require('./read-string');
    // var readNumber = require('./read-number');
    // var readCall = require('./read-call');
    // var readParenthesizedExpr = require('./read-parenthesized-expr');
    // var readTertiaryExpr = require('./read-tertiary-expr');
  
  
    function postUnaryExpr(expr, operator) {
      switch (operator) {
        case 33:
          var value;
  
          switch (expr.type) {
            case 2:
            case 1:
            case 3:
              value = !expr.value;
              break;
  
            case 12:
            case 11:
              value = false;
              break;
  
            case 13:
              value = true;
              break;
          }
  
          if (value != null) {
            return {
              type: 3,
              value: value
            };
          }
  
          break;
  
        case 43:
          switch (expr.type) {
            case 2:
            case 1:
            case 3:
              return {
                type: 2,
                value: +expr.value
              };
          }
  
          break;
  
        case 45:
          switch (expr.type) {
            case 2:
            case 1:
            case 3:
              return {
                type: 2,
                value: -expr.value
              };
          }
  
          break;
      }
  
      return {
        type: 9,
        expr: expr,
        operator: operator
      };
    }
    /**
     * 读取一元表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readUnaryExpr(walker) {
      walker.goUntil();
      var currentCode = walker.currentCode();
  
      switch (currentCode) {
        case 33: // !
  
        case 43: // +
  
        case 45:
          // -
          walker.go(1);
          return postUnaryExpr(readUnaryExpr(walker), currentCode);
  
        case 34: // "
  
        case 39:
          // '
          return readString(walker);
  
        case 48: // number
  
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return readNumber(walker);
  
        case 40:
          // (
          return readParenthesizedExpr(walker);
        // array literal
  
        case 91:
          // [
          walker.go(1);
          var arrItems = [];
  
          while (!walker.goUntil(93)) {
            // ]
            var item = {};
            arrItems.push(item);
  
            if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
              item.spread = true;
            }
  
            item.expr = readTertiaryExpr(walker);
            walker.goUntil(44); // ,
          }
  
          return {
            type: 12,
            items: arrItems
          };
        // object literal
  
        case 123:
          // {
          walker.go(1);
          var objItems = [];
  
          while (!walker.goUntil(125)) {
            // }
            var item = {};
            objItems.push(item);
  
            if (walker.currentCode() === 46 && walker.match(/\.\.\.\s*/g)) {
              item.spread = true;
              item.expr = readTertiaryExpr(walker);
            } else {
              // #[begin] error
              var walkerIndexBeforeName = walker.index; // #[end]
  
              item.name = readUnaryExpr(walker); // #[begin] error
  
              if (item.name.type > 4) {
                throw new Error('[SAN FATAL] unexpect object name: ' + walker.cut(walkerIndexBeforeName, walker.index));
              } // #[end]
  
  
              if (walker.goUntil(58)) {
                // :
                item.expr = readTertiaryExpr(walker);
              } else {
                item.expr = item.name;
              }
  
              if (item.name.type === 4) {
                item.name = item.name.paths[0];
              }
            }
  
            walker.goUntil(44); // ,
          }
  
          return {
            type: 11,
            items: objItems
          };
      }
  
      return readCall(walker);
    } // exports = module.exports = readUnaryExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取数字
     */
    // var ExprType = require('./expr-type');
    // var readUnaryExpr = require('./read-unary-expr');
  
    /**
     * 读取数字
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readNumber(walker) {
      var match = walker.match(/\s*([0-9]+(\.[0-9]+)?)/g, 1);
  
      if (match) {
        return {
          type: 2,
          value: +match[1]
        };
      }
    } // exports = module.exports = readNumber;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取ident
     */
  
    /**
     * 读取ident
     * 这里的 ident 指标识符(identifier)，也就是通常意义上的变量名
     * 这里默认的变量名规则为：由美元符号($)、数字、字母或者下划线(_)构成的字符串
     *
     * @inner
     * @param {Walker} walker 源码读取对象
     * @return {string}
     */
  
  
    function readIdent(walker) {
      var match = walker.match(/\s*([\$0-9a-z_]+)/ig, 1); // #[begin] error
  
      if (!match) {
        throw new Error('[SAN FATAL] expect an ident: ' + walker.cut(walker.index));
      } // #[end]
  
  
      return match[1];
    } // exports = module.exports = readIdent;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取三元表达式
     */
    // var ExprType = require('./expr-type');
    // var readLogicalORExpr = require('./read-logical-or-expr');
  
    /**
     * 读取三元表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readTertiaryExpr(walker) {
      var conditional = readLogicalORExpr(walker);
      walker.goUntil();
  
      if (walker.currentCode() === 63) {
        // ?
        walker.go(1);
        var yesExpr = readTertiaryExpr(walker);
        walker.goUntil();
  
        if (walker.currentCode() === 58) {
          // :
          walker.go(1);
          return {
            type: 10,
            segs: [conditional, yesExpr, readTertiaryExpr(walker)]
          };
        }
      }
  
      return conditional;
    } // exports = module.exports = readTertiaryExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取访问表达式
     */
    // var ExprType = require('./expr-type');
    // var createAccessor = require('./create-accessor');
    // var readIdent = require('./read-ident');
    // var readTertiaryExpr = require('./read-tertiary-expr');
  
    /**
     * 读取访问表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readAccessor(walker) {
      var firstSeg = readIdent(walker);
  
      switch (firstSeg) {
        case 'true':
        case 'false':
          return {
            type: 3,
            value: firstSeg === 'true'
          };
  
        case 'null':
          return {
            type: 13
          };
      }
  
      var result = createAccessor([{
        type: 1,
        value: firstSeg
      }]);
      /* eslint-disable no-constant-condition */
  
      accessorLoop: while (1) {
        /* eslint-enable no-constant-condition */
        switch (walker.currentCode()) {
          case 46:
            // .
            walker.go(1); // ident as string
  
            result.paths.push({
              type: 1,
              value: readIdent(walker)
            });
            break;
  
          case 91:
            // [
            walker.go(1);
            result.paths.push(readTertiaryExpr(walker));
            walker.goUntil(93); // ]
  
            break;
  
          default:
            break accessorLoop;
        }
      }
  
      return result;
    } // exports = module.exports = readAccessor;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取调用
     */
    // var ExprType = require('./expr-type');
    // var readAccessor = require('./read-accessor');
    // var readTertiaryExpr = require('./read-tertiary-expr');
  
    /**
     * 读取调用
     *
     * @param {Walker} walker 源码读取对象
     * @param {Array=} defaultArgs 默认参数
     * @return {Object}
     */
  
  
    function readCall(walker, defaultArgs) {
      walker.goUntil();
      var result = readAccessor(walker);
      var args;
  
      if (walker.goUntil(40)) {
        // (
        args = [];
  
        while (!walker.goUntil(41)) {
          // )
          args.push(readTertiaryExpr(walker));
          walker.goUntil(44); // ,
        }
      } else if (defaultArgs) {
        args = defaultArgs;
      }
  
      if (args) {
        result = {
          type: 6,
          name: result,
          args: args
        };
      }
  
      return result;
    } // exports = module.exports = readCall;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取括号表达式
     */
    // var readTertiaryExpr = require('./read-tertiary-expr');
  
    /**
     * 读取括号表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readParenthesizedExpr(walker) {
      walker.go(1);
      var expr = readTertiaryExpr(walker);
      walker.goUntil(41); // )
  
      expr.parenthesized = true;
      return expr;
    } // exports = module.exports = readParenthesizedExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取乘法表达式
     */
    // var ExprType = require('./expr-type');
    // var readUnaryExpr = require('./read-unary-expr');
  
    /**
     * 读取乘法表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readMultiplicativeExpr(walker) {
      var expr = readUnaryExpr(walker);
  
      while (1) {
        walker.goUntil();
        var code = walker.currentCode();
  
        switch (code) {
          case 37: // %
  
          case 42: // *
  
          case 47:
            // /
            walker.go(1);
            expr = {
              type: 8,
              operator: code,
              segs: [expr, readUnaryExpr(walker)]
            };
            continue;
        }
  
        break;
      }
  
      return expr;
    } // exports = module.exports = readMultiplicativeExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取加法表达式
     */
    // var ExprType = require('./expr-type');
    // var readMultiplicativeExpr = require('./read-multiplicative-expr');
  
    /**
     * 读取加法表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readAdditiveExpr(walker) {
      var expr = readMultiplicativeExpr(walker);
  
      while (1) {
        walker.goUntil();
        var code = walker.currentCode();
  
        switch (code) {
          case 43: // +
  
          case 45:
            // -
            walker.go(1);
            expr = {
              type: 8,
              operator: code,
              segs: [expr, readMultiplicativeExpr(walker)]
            };
            continue;
        }
  
        break;
      }
  
      return expr;
    } // exports = module.exports = readAdditiveExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取关系判断表达式
     */
    // var ExprType = require('./expr-type');
    // var readAdditiveExpr = require('./read-additive-expr');
  
    /**
     * 读取关系判断表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readRelationalExpr(walker) {
      var expr = readAdditiveExpr(walker);
      walker.goUntil();
      var code = walker.currentCode();
  
      switch (code) {
        case 60: // <
  
        case 62:
          // >
          if (walker.nextCode() === 61) {
            code += 61;
            walker.go(1);
          }
  
          return {
            type: 8,
            operator: code,
            segs: [expr, readAdditiveExpr(walker)]
          };
      }
  
      return expr;
    } // exports = module.exports = readRelationalExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取相等比对表达式
     */
    // var ExprType = require('./expr-type');
    // var readRelationalExpr = require('./read-relational-expr');
  
    /**
     * 读取相等比对表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readEqualityExpr(walker) {
      var expr = readRelationalExpr(walker);
      walker.goUntil();
      var code = walker.currentCode();
  
      switch (code) {
        case 61: // =
  
        case 33:
          // !
          if (walker.nextCode() === 61) {
            code += 61;
  
            if (walker.nextCode() === 61) {
              code += 61;
              walker.go(1);
            }
  
            return {
              type: 8,
              operator: code,
              segs: [expr, readRelationalExpr(walker)]
            };
          }
  
          walker.go(-1);
      }
  
      return expr;
    } // exports = module.exports = readEqualityExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取逻辑与表达式
     */
    // var ExprType = require('./expr-type');
    // var readEqualityExpr = require('./read-equality-expr');
  
    /**
     * 读取逻辑与表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readLogicalANDExpr(walker) {
      var expr = readEqualityExpr(walker);
      walker.goUntil();
  
      if (walker.currentCode() === 38) {
        // &
        if (walker.nextCode() === 38) {
          walker.go(1);
          return {
            type: 8,
            operator: 76,
            segs: [expr, readLogicalANDExpr(walker)]
          };
        }
  
        walker.go(-1);
      }
  
      return expr;
    } // exports = module.exports = readLogicalANDExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 读取逻辑或表达式
     */
    // var ExprType = require('./expr-type');
    // var readLogicalANDExpr = require('./read-logical-and-expr');
  
    /**
     * 读取逻辑或表达式
     *
     * @param {Walker} walker 源码读取对象
     * @return {Object}
     */
  
  
    function readLogicalORExpr(walker) {
      var expr = readLogicalANDExpr(walker);
      walker.goUntil();
  
      if (walker.currentCode() === 124) {
        // |
        if (walker.nextCode() === 124) {
          walker.go(1);
          return {
            type: 8,
            operator: 248,
            segs: [expr, readLogicalORExpr(walker)]
          };
        }
  
        walker.go(-1);
      }
  
      return expr;
    } // exports = module.exports = readLogicalORExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解析表达式
     */
    // var Walker = require('./walker');
    // var readTertiaryExpr = require('./read-tertiary-expr');
  
    /**
     * 解析表达式
     *
     * @param {string} source 源码
     * @return {Object}
     */
  
  
    function parseExpr(source) {
      if (!source) {
        return;
      }
  
      if (typeof source === 'object' && source.type) {
        return source;
      }
  
      var expr = readTertiaryExpr(new Walker(source));
      expr.raw = source;
      return expr;
    } // exports = module.exports = parseExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解析调用
     */
    // var Walker = require('./walker');
    // var ExprType = require('./expr-type');
    // var readCall = require('./read-call');
  
    /**
     * 解析调用
     *
     * @param {string} source 源码
     * @param {Array=} defaultArgs 默认参数
     * @return {Object}
     */
  
  
    function parseCall(source, defaultArgs) {
      var expr = readCall(new Walker(source), defaultArgs);
  
      if (expr.type !== 6) {
        expr = {
          type: 6,
          name: expr,
          args: defaultArgs || []
        };
      }
  
      expr.raw = source;
      return expr;
    } // exports = module.exports = parseCall;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解析插值替换
     */
    // var Walker = require('./walker');
    // var readTertiaryExpr = require('./read-tertiary-expr');
    // var ExprType = require('./expr-type');
    // var readCall = require('./read-call');
  
    /**
     * 解析插值替换
     *
     * @param {string} source 源码
     * @return {Object}
     */
  
  
    function parseInterp(source) {
      var walker = new Walker(source);
      var interp = {
        type: 5,
        expr: readTertiaryExpr(walker),
        filters: [],
        raw: source
      };
  
      while (walker.goUntil(124)) {
        // |
        var callExpr = readCall(walker, []);
  
        switch (callExpr.name.paths[0].value) {
          case 'html':
            break;
  
          case 'raw':
            interp.original = 1;
            break;
  
          default:
            interp.filters.push(callExpr);
        }
      }
  
      return interp;
    } // exports = module.exports = parseInterp;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解码 HTML 字符实体
     */
  
  
    var ENTITY_DECODE_MAP = {
      lt: '<',
      gt: '>',
      nbsp: ' ',
      quot: '\"',
      emsp: '\u2003',
      ensp: '\u2002',
      thinsp: '\u2009',
      copy: '\xa9',
      reg: '\xae',
      zwnj: '\u200c',
      zwj: '\u200d',
      amp: '&'
    };
    /**
     * 解码 HTML 字符实体
     *
     * @param {string} source 要解码的字符串
     * @return {string}
     */
  
    function decodeHTMLEntity(source) {
      return source.replace(/&#([0-9]+);/g, function (match, code) {
        return String.fromCharCode(+code);
      }).replace(/&#x([0-9a-f]+);/ig, function (match, code) {
        return String.fromCharCode(parseInt(code, 16));
      }).replace(/&([a-z]+);/ig, function (match, code) {
        return ENTITY_DECODE_MAP[code] || match;
      });
    } // exports = module.exports = decodeHTMLEntity;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解析文本
     */
    // var Walker = require('./walker');
    // var ExprType = require('./expr-type');
    // var parseInterp = require('./parse-interp');
    // var decodeHTMLEntity = require('../util/decode-html-entity');
  
    /**
     * 对字符串进行可用于new RegExp的字面化
     *
     * @inner
     * @param {string} source 需要字面化的字符串
     * @return {string} 字符串字面化结果
     */
  
  
    function regexpLiteral(source) {
      return source.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+\\]/g, function (c) {
        return '\\' + c;
      });
    }
  
    var delimRegCache = {};
    /**
     * 解析文本
     *
     * @param {string} source 源码
     * @param {Array?} delimiters 分隔符。默认为 ['{{', '}}']
     * @return {Object}
     */
  
    function parseText(source, delimiters) {
      delimiters = delimiters || ['{{', '}}'];
      var regCacheKey = delimiters[0] + '>..<' + delimiters[1];
      var exprStartReg = delimRegCache[regCacheKey];
  
      if (!exprStartReg) {
        exprStartReg = new RegExp(regexpLiteral(delimiters[0]) + '\\s*([\\s\\S]+?)\\s*' + regexpLiteral(delimiters[1]), 'g');
        delimRegCache[regCacheKey] = exprStartReg;
      }
  
      var exprMatch;
      var walker = new Walker(source);
      var beforeIndex = 0;
      var expr = {
        type: 7,
        segs: []
      };
  
      function pushStringToSeg(text) {
        text && expr.segs.push({
          type: 1,
          literal: text,
          value: decodeHTMLEntity(text)
        });
      }
  
      var delimEndLen = delimiters[1].length;
  
      while ((exprMatch = walker.match(exprStartReg)) != null) {
        var interpSource = exprMatch[1];
        var interpLen = exprMatch[0].length;
  
        if (walker.cut(walker.index + 1 - delimEndLen, walker.index + 1) === delimiters[1]) {
          interpSource += walker.cut(walker.index, walker.index + 1);
          walker.go(1);
          interpLen++;
        }
  
        pushStringToSeg(walker.cut(beforeIndex, walker.index - interpLen));
        var interp = parseInterp(interpSource);
        expr.original = expr.original || interp.original;
        expr.segs.push(interp);
        beforeIndex = walker.index;
      }
  
      pushStringToSeg(walker.cut(beforeIndex));
  
      if (expr.segs.length === 1 && expr.segs[0].type === 1) {
        expr.value = expr.segs[0].value;
      }
  
      return expr;
    } // exports = module.exports = parseText;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解析指令
     */
    // var Walker = require('./walker');
    // var parseExpr = require('./parse-expr');
    // var parseCall = require('./parse-call');
    // var parseText = require('./parse-text');
    // var readAccessor = require('./read-accessor');
    // var readUnaryExpr = require('./read-unary-expr');
  
    /**
     * 指令解析器
     *
     * @inner
     * @type {Object}
     */
  
  
    var directiveParsers = {
      'for': function (value) {
        var walker = new Walker(value);
        var match = walker.match(/^\s*([$0-9a-z_]+)(\s*,\s*([$0-9a-z_]+))?\s+in\s+/ig, 1);
  
        if (match) {
          var directive = {
            item: match[1],
            value: readUnaryExpr(walker)
          };
  
          if (match[3]) {
            directive.index = match[3];
          }
  
          if (walker.match(/\s*trackby\s+/ig, 1)) {
            var start = walker.index;
            directive.trackBy = readAccessor(walker);
            directive.trackBy.raw = walker.cut(start, walker.index);
          }
  
          return directive;
        } // #[begin] error
  
  
        throw new Error('[SAN FATAL] for syntax error: ' + value); // #[end]
      },
      'ref': function (value, options) {
        return {
          value: parseText(value, options.delimiters)
        };
      },
      'if': function (value) {
        return {
          value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
      },
      'elif': function (value) {
        return {
          value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
      },
      'else': function () {
        return {
          value: {}
        };
      },
      'bind': function (value) {
        return {
          value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
      },
      'html': function (value) {
        return {
          value: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
        };
      },
      'transition': function (value) {
        return {
          value: parseCall(value)
        };
      }
    };
    /**
     * 解析指令
     *
     * @param {ANode} aNode 抽象节点
     * @param {string} name 指令名称
     * @param {string} value 指令值
     * @param {Object} options 解析参数
     * @param {Array?} options.delimiters 插值分隔符列表
     */
  
    function parseDirective(aNode, name, value, options) {
      if (name === 'else-if') {
        name = 'elif';
      }
  
      var parser = directiveParsers[name];
  
      if (parser) {
        (aNode.directives[name] = parser(value, options)).raw = value;
      }
    } // exports = module.exports = parseDirective;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解析抽象节点属性
     */
    // var each = require('../util/each');
    // var kebab2camel = require('../util/kebab2camel');
    // var boolAttrs = require('../browser/bool-attrs');
    // var ExprType = require('./expr-type');
    // var createAccessor = require('./create-accessor');
    // var parseExpr = require('./parse-expr');
    // var parseCall = require('./parse-call');
    // var parseText = require('./parse-text');
    // var parseDirective = require('./parse-directive');
  
    /**
     * 解析抽象节点属性
     *
     * @param {ANode} aNode 抽象节点
     * @param {string} name 属性名称
     * @param {string} value 属性值
     * @param {Object} options 解析参数
     * @param {Array?} options.delimiters 插值分隔符列表
     */
  
  
    function integrateAttr(aNode, name, value, options) {
      var prefixIndex = name.indexOf('-');
      var realName;
      var prefix;
  
      if (prefixIndex > 0) {
        prefix = name.slice(0, prefixIndex);
        realName = name.slice(prefixIndex + 1);
      }
  
      switch (prefix) {
        case 'on':
          var event = {
            name: realName,
            modifier: {}
          };
          aNode.events.push(event);
          var colonIndex;
  
          while ((colonIndex = value.indexOf(':')) > 0) {
            var modifier = value.slice(0, colonIndex); // eventHandler("dd:aa") 这种情况不能算modifier，需要辨识
  
            if (!/^[a-z]+$/i.test(modifier)) {
              break;
            }
  
            event.modifier[modifier] = true;
            value = value.slice(colonIndex + 1);
          }
  
          event.expr = parseCall(value, [createAccessor([{
            type: 1,
            value: '$event'
          }])]);
          break;
  
        case 'san':
        case 's':
          parseDirective(aNode, realName, value, options);
          break;
  
        case 'prop':
          integrateProp(aNode, realName, value, options);
          break;
  
        case 'var':
          if (!aNode.vars) {
            aNode.vars = [];
          }
  
          realName = kebab2camel(realName);
          aNode.vars.push({
            name: realName,
            expr: parseExpr(value.replace(/(^\{\{|\}\}$)/g, ''))
          });
          break;
  
        default:
          integrateProp(aNode, name, value, options);
      }
    }
    /**
     * 解析抽象节点绑定属性
     *
     * @inner
     * @param {ANode} aNode 抽象节点
     * @param {string} name 属性名称
     * @param {string} rawValue 属性值
     * @param {Object} options 解析参数
     * @param {Array?} options.delimiters 插值分隔符列表
     */
  
  
    function integrateProp(aNode, name, rawValue, options) {
      // parse two way binding, e.g. value="{=ident=}"
      var value = rawValue || '';
      var xMatch = value.match(/^\{=\s*(.*?)\s*=\}$/);
  
      if (xMatch) {
        aNode.props.push({
          name: name,
          expr: parseExpr(xMatch[1]),
          x: 1,
          raw: value
        });
        return;
      }
  
      var expr = parseText(value, options.delimiters); // 这里不能把只有一个插值的属性抽取
      // 因为插值里的值可能是html片段，容易被注入
      // 组件的数据绑定在组件init时做抽取
  
      switch (name) {
        case 'class':
        case 'style':
          each(expr.segs, function (seg) {
            if (seg.type === 5) {
              seg.filters.push({
                type: 6,
                name: createAccessor([{
                  type: 1,
                  value: '_' + name
                }]),
                args: []
              });
            }
          });
          break;
      }
  
      if (expr.type === 7) {
        switch (expr.segs.length) {
          case 0:
            if (boolAttrs[name]) {
              expr = {
                type: 3,
                value: true
              };
            }
  
            break;
  
          case 1:
            expr = expr.segs[0];
  
            if (expr.type === 5 && expr.filters.length === 0 && !expr.original) {
              expr = expr.expr;
            }
  
        }
      }
  
      aNode.props.push({
        name: name,
        expr: expr,
        raw: rawValue
      });
    } // exports = module.exports = integrateAttr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 解析模板
     */
    // var Walker = require('./walker');
    // var integrateAttr = require('./integrate-attr');
    // var parseText = require('./parse-text');
    // var svgTags = require('../browser/svg-tags');
    // var autoCloseTags = require('../browser/auto-close-tags');
    // #[begin] error
  
  
    function getXPath(stack, currentTagName) {
      var path = ['ROOT'];
  
      for (var i = 1, len = stack.length; i < len; i++) {
        path.push(stack[i].tagName);
      }
  
      if (currentTagName) {
        path.push(currentTagName);
      }
  
      return path.join('>');
    } // #[end]
  
    /* eslint-disable fecs-max-statements */
  
    /**
     * 解析 template
     *
     * @param {string} source template源码
     * @param {Object?} options 解析参数
     * @param {string?} options.trimWhitespace 空白文本的处理策略。none|blank|all
     * @param {Array?} options.delimiters 插值分隔符列表
     * @return {ANode}
     */
  
  
    function parseTemplate(source, options) {
      options = options || {};
      options.trimWhitespace = options.trimWhitespace || 'none';
      var rootNode = {
        directives: {},
        props: [],
        events: [],
        children: []
      };
  
      if (typeof source !== 'string') {
        return rootNode;
      }
  
      source = source.replace(/<!--([\s\S]*?)-->/mg, '').replace(/(^\s+|\s+$)/g, '');
      var walker = new Walker(source);
      var tagReg = /<(\/)?([a-z][a-z0-9-]*)\s*/ig;
      var attrReg = /([-:0-9a-z\[\]_]+)(\s*=\s*(([^'"<>\s]+)|'([^']*?)'|"([^"]*?)"))?\s*/ig;
      var tagMatch;
      var currentNode = rootNode;
      var stack = [rootNode];
      var stackIndex = 0;
      var beforeLastIndex = 0;
  
      while ((tagMatch = walker.match(tagReg)) != null) {
        var tagMatchStart = walker.index - tagMatch[0].length;
        var tagEnd = tagMatch[1];
        var tagName = tagMatch[2];
  
        if (!svgTags[tagName]) {
          tagName = tagName.toLowerCase();
        } // 62: >
        // 47: /
        // 处理 </xxxx >
  
  
        if (tagEnd) {
          if (walker.currentCode() === 62) {
            // 满足关闭标签的条件时，关闭标签
            // 向上查找到对应标签，找不到时忽略关闭
            var closeIndex = stackIndex; // #[begin] error
            // 如果正在闭合一个自闭合的标签，例如 </input>，报错
  
            if (autoCloseTags[tagName]) {
              throw new Error('' + '[SAN ERROR] ' + getXPath(stack, tagName) + ' is a `auto closed` tag, ' + 'so it cannot be closed with </' + tagName + '>');
            } // 如果关闭的 tag 和当前打开的不一致，报错
  
  
            if (stack[closeIndex].tagName !== tagName // 这里要把 table 自动添加 tbody 的情况给去掉
            && !(tagName === 'table' && stack[closeIndex].tagName === 'tbody')) {
              throw new Error('[SAN ERROR] ' + getXPath(stack) + ' is closed with ' + tagName);
            } // #[end]
  
  
            pushTextNode(source.slice(beforeLastIndex, tagMatchStart));
  
            while (closeIndex > 0 && stack[closeIndex].tagName !== tagName) {
              closeIndex--;
            }
  
            if (closeIndex > 0) {
              stackIndex = closeIndex - 1;
              currentNode = stack[stackIndex];
            }
  
            walker.go(1);
          } // #[begin] error
          else {
              // 处理 </xxx 非正常闭合标签
              // 如果闭合标签时，匹配后的下一个字符是 <，即下一个标签的开始，那么当前闭合标签未闭合
              if (walker.currentCode() === 60) {
                throw new Error('' + '[SAN ERROR] ' + getXPath(stack) + '\'s close tag not closed');
              } // 闭合标签有属性
  
  
              throw new Error('' + '[SAN ERROR] ' + getXPath(stack) + '\'s close tag has attributes');
            } // #[end]
  
        } else {
          var aElement = {
            directives: {},
            props: [],
            events: [],
            children: [],
            tagName: tagName
          };
          var tagClose = autoCloseTags[tagName]; // 解析 attributes
  
          /* eslint-disable no-constant-condition */
  
          while (1) {
            /* eslint-enable no-constant-condition */
            var nextCharCode = walker.currentCode(); // 标签结束时跳出 attributes 读取
            // 标签可能直接结束或闭合结束
  
            if (nextCharCode === 62) {
              walker.go(1);
              break;
            } // 遇到 /> 按闭合处理
  
  
            if (nextCharCode === 47 && walker.charCode(walker.index + 1) === 62) {
              walker.go(2);
              tagClose = 1;
              break;
            } // template 串结束了
            // 这时候，说明这个读取周期的所有内容，都是text
  
  
            if (!nextCharCode) {
              pushTextNode(walker.cut(beforeLastIndex));
              aElement = null;
              break;
            } // #[begin] error
            // 在处理一个 open 标签时，如果遇到了 <， 即下一个标签的开始，则当前标签未能正常闭合，报错
  
  
            if (nextCharCode === 60) {
              throw new Error('[SAN ERROR] ' + getXPath(stack, tagName) + ' is not closed');
            } // #[end]
            // 读取 attribute
  
  
            var attrMatch = walker.match(attrReg);
  
            if (attrMatch) {
              // #[begin] error
              // 如果属性有 =，但没取到 value，报错
              if (walker.charCode(attrMatch.index + attrMatch[1].length) === 61 && !attrMatch[2]) {
                throw new Error('' + '[SAN ERROR] ' + getXPath(stack, tagName) + ' attribute `' + attrMatch[1] + '` is not wrapped with ""');
              } // #[end]
  
  
              integrateAttr(aElement, attrMatch[1], attrMatch[2] ? attrMatch[4] || attrMatch[5] || attrMatch[6] : void 0, options);
            }
          }
  
          if (aElement) {
            pushTextNode(source.slice(beforeLastIndex, tagMatchStart)); // match if directive for else/elif directive
  
            var elseDirective = aElement.directives['else'] // eslint-disable-line dot-notation
            || aElement.directives.elif;
  
            if (elseDirective) {
              var parentChildrenLen = currentNode.children.length;
              var ifANode = null;
  
              while (parentChildrenLen--) {
                var parentChild = currentNode.children[parentChildrenLen];
  
                if (parentChild.textExpr) {
                  currentNode.children.splice(parentChildrenLen, 1);
                  continue;
                }
  
                ifANode = parentChild;
                break;
              } // #[begin] error
  
  
              if (!ifANode || !parentChild.directives['if']) {
                // eslint-disable-line dot-notation
                throw new Error('[SAN FATEL] else not match if.');
              } // #[end]
  
  
              if (ifANode) {
                ifANode.elses = ifANode.elses || [];
                ifANode.elses.push(aElement);
              }
            } else {
              if (aElement.tagName === 'tr' && currentNode.tagName === 'table') {
                var tbodyNode = {
                  directives: {},
                  props: [],
                  events: [],
                  children: [],
                  tagName: 'tbody'
                };
                currentNode.children.push(tbodyNode);
                currentNode = tbodyNode;
                stack[++stackIndex] = tbodyNode;
              }
  
              currentNode.children.push(aElement);
            }
  
            if (!tagClose) {
              currentNode = aElement;
              stack[++stackIndex] = aElement;
            }
          }
        }
  
        beforeLastIndex = walker.index;
      }
  
      pushTextNode(walker.cut(beforeLastIndex));
      return rootNode;
      /**
       * 在读取栈中添加文本节点
       *
       * @inner
       * @param {string} text 文本内容
       */
  
      function pushTextNode(text) {
        switch (options.trimWhitespace) {
          case 'blank':
            if (/^\s+$/.test(text)) {
              text = null;
            }
  
            break;
  
          case 'all':
            text = text.replace(/(^\s+|\s+$)/g, '');
            break;
        }
  
        if (text) {
          currentNode.children.push({
            textExpr: parseText(text, options.delimiters)
          });
        }
      }
    }
    /* eslint-enable fecs-max-statements */
    // exports = module.exports = parseTemplate;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 默认filter
     */
  
    /* eslint-disable fecs-camelcase */
  
  
    function defaultStyleFilter(source) {
      if (typeof source === 'object') {
        var result = '';
  
        for (var key in source) {
          /* istanbul ignore else  */
          if (source.hasOwnProperty(key)) {
            result += key + ':' + source[key] + ';';
          }
        }
  
        return result;
      }
  
      return source;
    }
    /**
     * 默认filter
     *
     * @const
     * @type {Object}
     */
  
  
    var DEFAULT_FILTERS = {
      /**
       * URL编码filter
       *
       * @param {string} source 源串
       * @return {string} 替换结果串
       */
      url: encodeURIComponent,
      _class: function (source) {
        if (source instanceof Array) {
          return source.join(' ');
        }
  
        return source;
      },
      _style: defaultStyleFilter,
      _xclass: function (outer, inner) {
        if (outer instanceof Array) {
          outer = outer.join(' ');
        }
  
        if (outer) {
          if (inner) {
            return inner + ' ' + outer;
          }
  
          return outer;
        }
  
        return inner;
      },
      _xstyle: function (outer, inner) {
        outer = outer && defaultStyleFilter(outer);
  
        if (outer) {
          if (inner) {
            return inner + ';' + outer;
          }
  
          return outer;
        }
  
        return inner;
      }
    };
    /* eslint-enable fecs-camelcase */
    // exports = module.exports = DEFAULT_FILTERS;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 表达式计算
     */
    // var ExprType = require('../parser/expr-type');
    // var extend = require('../util/extend');
    // var DEFAULT_FILTERS = require('./default-filters');
    // var evalArgs = require('./eval-args');
  
    /**
     * 计算表达式的值
     *
     * @param {Object} expr 表达式对象
     * @param {Data} data 数据容器对象
     * @param {Component=} owner 所属组件环境
     * @return {*}
     */
  
    function evalExpr(expr, data, owner) {
      if (expr.value != null) {
        return expr.value;
      }
  
      var value;
  
      switch (expr.type) {
        case 13:
          return null;
  
        case 9:
          value = evalExpr(expr.expr, data, owner);
  
          switch (expr.operator) {
            case 33:
              value = !value;
              break;
  
            case 43:
              value = +value;
              break;
  
            case 45:
              value = 0 - value;
              break;
          }
  
          return value;
  
        case 8:
          value = evalExpr(expr.segs[0], data, owner);
          var rightValue = evalExpr(expr.segs[1], data, owner);
          /* eslint-disable eqeqeq */
  
          switch (expr.operator) {
            case 37:
              value = value % rightValue;
              break;
  
            case 43:
              value = value + rightValue;
              break;
  
            case 45:
              value = value - rightValue;
              break;
  
            case 42:
              value = value * rightValue;
              break;
  
            case 47:
              value = value / rightValue;
              break;
  
            case 60:
              value = value < rightValue;
              break;
  
            case 62:
              value = value > rightValue;
              break;
  
            case 76:
              value = value && rightValue;
              break;
  
            case 94:
              value = value != rightValue;
              break;
  
            case 121:
              value = value <= rightValue;
              break;
  
            case 122:
              value = value == rightValue;
              break;
  
            case 123:
              value = value >= rightValue;
              break;
  
            case 155:
              value = value !== rightValue;
              break;
  
            case 183:
              value = value === rightValue;
              break;
  
            case 248:
              value = value || rightValue;
              break;
          }
          /* eslint-enable eqeqeq */
  
  
          return value;
  
        case 10:
          return evalExpr(expr.segs[evalExpr(expr.segs[0], data, owner) ? 1 : 2], data, owner);
  
        case 12:
          value = [];
  
          for (var i = 0, l = expr.items.length; i < l; i++) {
            var item = expr.items[i];
            var itemValue = evalExpr(item.expr, data, owner);
  
            if (item.spread) {
              itemValue && (value = value.concat(itemValue));
            } else {
              value.push(itemValue);
            }
          }
  
          return value;
  
        case 11:
          value = {};
  
          for (var i = 0, l = expr.items.length; i < l; i++) {
            var item = expr.items[i];
            var itemValue = evalExpr(item.expr, data, owner);
  
            if (item.spread) {
              itemValue && extend(value, itemValue);
            } else {
              value[evalExpr(item.name, data, owner)] = itemValue;
            }
          }
  
          return value;
  
        case 4:
          return data.get(expr);
  
        case 5:
          value = evalExpr(expr.expr, data, owner);
  
          if (owner) {
            for (var i = 0, l = expr.filters.length; i < l; i++) {
              var filter = expr.filters[i];
              var filterName = filter.name.paths[0].value;
  
              switch (filterName) {
                case 'url':
                case '_class':
                case '_style':
                  value = DEFAULT_FILTERS[filterName](value);
                  break;
  
                case '_xclass':
                case '_xstyle':
                  value = value = DEFAULT_FILTERS[filterName](value, evalExpr(filter.args[0], data, owner));
                  break;
  
                default:
                  value = owner.filters[filterName] && owner.filters[filterName].apply(owner, [value].concat(evalArgs(filter.args, data, owner)));
              }
            }
          }
  
          if (value == null) {
            value = '';
          }
  
          return value;
  
        case 6:
          if (owner && expr.name.type === 4) {
            var method = owner;
            var pathsLen = expr.name.paths.length;
  
            for (var i = 0; method && i < pathsLen; i++) {
              method = method[evalExpr(expr.name.paths[i], data, owner)];
            }
  
            if (method) {
              value = method.apply(owner, evalArgs(expr.args, data, owner));
            }
          }
  
          break;
  
        /* eslint-disable no-redeclare */
  
        case 7:
          var buf = '';
  
          for (var i = 0, l = expr.segs.length; i < l; i++) {
            var seg = expr.segs[i];
            buf += seg.value || evalExpr(seg, data, owner);
          }
  
          return buf;
      }
  
      return value;
    } // exports = module.exports = evalExpr;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 为函数调用计算参数数组的值
     */
    // var evalExpr = require('./eval-expr');
  
    /**
     * 为函数调用计算参数数组的值
     *
     * @param {Array} args 参数表达式列表
     * @param {Data} data 数据环境
     * @param {Component} owner 组件环境
     * @return {Array}
     */
  
  
    function evalArgs(args, data, owner) {
      var result = [];
  
      for (var i = 0; i < args.length; i++) {
        result.push(evalExpr(args[i], data, owner));
      }
  
      return result;
    } // exports = module.exports = evalArgs;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 比较变更表达式与目标表达式之间的关系
     */
    // var ExprType = require('../parser/expr-type');
    // var evalExpr = require('./eval-expr');
  
    /**
     * 判断变更表达式与多个表达式之间的关系，0为完全没关系，1为有关系
     *
     * @inner
     * @param {Object} changeExpr 目标表达式
     * @param {Array} exprs 多个源表达式
     * @param {Data} data 表达式所属数据环境
     * @return {number}
     */
  
  
    function changeExprCompareExprs(changeExpr, exprs, data) {
      for (var i = 0, l = exprs.length; i < l; i++) {
        if (changeExprCompare(changeExpr, exprs[i], data)) {
          return 1;
        }
      }
  
      return 0;
    }
    /**
     * 比较变更表达式与目标表达式之间的关系，用于视图更新判断
     * 视图更新需要根据其关系，做出相应的更新行为
     *
     * 0: 完全没关系
     * 1: 变更表达式是目标表达式的母项(如a与a.b) 或 表示需要完全变化
     * 2: 变更表达式是目标表达式相等
     * >2: 变更表达式是目标表达式的子项，如a.b.c与a.b
     *
     * @param {Object} changeExpr 变更表达式
     * @param {Object} expr 要比较的目标表达式
     * @param {Data} data 表达式所属数据环境
     * @return {number}
     */
  
  
    function changeExprCompare(changeExpr, expr, data) {
      var result = 0;
  
      if (!expr.changeCache) {
        expr.changeCache = {};
      }
  
      if (changeExpr.raw && !expr.dynamic) {
        if (expr.changeCache[changeExpr.raw] != null) {
          return expr.changeCache[changeExpr.raw];
        }
      }
  
      switch (expr.type) {
        case 4:
          var paths = expr.paths;
          var pathsLen = paths.length;
          var changePaths = changeExpr.paths;
          var changeLen = changePaths.length;
          result = 1;
  
          for (var i = 0; i < pathsLen; i++) {
            var pathExpr = paths[i];
            var pathExprValue = pathExpr.value;
  
            if (pathExprValue == null && changeExprCompare(changeExpr, pathExpr, data)) {
              result = 1;
              break;
            }
  
            if (result && i < changeLen
            /* eslint-disable eqeqeq */
            && (pathExprValue || evalExpr(pathExpr, data)) != changePaths[i].value
            /* eslint-enable eqeqeq */
            ) {
                result = 0;
              }
          }
  
          if (result) {
            result = Math.max(1, changeLen - pathsLen + 2);
          }
  
          break;
  
        case 9:
          result = changeExprCompare(changeExpr, expr.expr, data) ? 1 : 0;
          break;
  
        case 7:
        case 8:
        case 10:
          result = changeExprCompareExprs(changeExpr, expr.segs, data);
          break;
  
        case 12:
        case 11:
          for (var i = 0; i < expr.items.length; i++) {
            if (changeExprCompare(changeExpr, expr.items[i].expr, data)) {
              result = 1;
              break;
            }
          }
  
          break;
  
        case 5:
          if (changeExprCompare(changeExpr, expr.expr, data)) {
            result = 1;
          } else {
            for (var i = 0; i < expr.filters.length; i++) {
              if (changeExprCompareExprs(changeExpr, expr.filters[i].args, data)) {
                result = 1;
                break;
              }
            }
          }
  
          break;
  
        case 6:
          if (changeExprCompareExprs(changeExpr, expr.name.paths, data) || changeExprCompareExprs(changeExpr, expr.args, data)) {
            result = 1;
          }
  
          break;
      }
  
      if (changeExpr.raw && !expr.dynamic) {
        expr.changeCache[changeExpr.raw] = result;
      }
  
      return result;
    } // exports = module.exports = changeExprCompare;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 数据变更类型枚举
     */
  
    /**
     * 数据变更类型枚举
     *
     * @const
     * @type {Object}
     */
  
  
    var DataChangeType = {
      SET: 1,
      SPLICE: 2
    }; // exports = module.exports = DataChangeType;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 生命周期类
     */
  
    function lifeCycleOwnIs(name) {
      return this[name];
    }
    /* eslint-disable fecs-valid-var-jsdoc */
  
    /**
     * 节点生命周期信息
     *
     * @inner
     * @type {Object}
     */
  
  
    var LifeCycle = {
      start: {},
      compiled: {
        is: lifeCycleOwnIs,
        compiled: true
      },
      inited: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true
      },
      created: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true
      },
      attached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true
      },
      leaving: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        attached: true,
        leaving: true
      },
      detached: {
        is: lifeCycleOwnIs,
        compiled: true,
        inited: true,
        created: true,
        detached: true
      },
      disposed: {
        is: lifeCycleOwnIs,
        disposed: true
      }
    };
    /* eslint-enable fecs-valid-var-jsdoc */
    // exports = module.exports = LifeCycle;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 节点类型
     */
  
    /**
     * 节点类型
     *
     * @const
     * @type {Object}
     */
  
    var NodeType = {
      TEXT: 1,
      IF: 2,
      FOR: 3,
      ELEM: 4,
      CMPT: 5,
      SLOT: 6,
      TPL: 7,
      LOADER: 8
    }; // exports = module.exports = NodeType;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 获取 ANode props 数组中相应 name 的项
     */
  
    /**
     * 获取 ANode props 数组中相应 name 的项
     *
     * @param {Object} aNode ANode对象
     * @param {string} name name属性匹配串
     * @return {Object}
     */
  
    function getANodeProp(aNode, name) {
      var index = aNode.hotspot.props[name];
  
      if (index != null) {
        return aNode.props[index];
      }
    } // exports = module.exports = getANodeProp;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 获取属性处理对象
     */
    // var contains = require('../util/contains');
    // var empty = require('../util/empty');
    // var nextTick = require('../util/next-tick');
    // var svgTags = require('../browser/svg-tags');
    // var ie = require('../browser/ie');
    // var evalExpr = require('../runtime/eval-expr');
    // var getANodeProp = require('./get-a-node-prop');
    // var NodeType = require('./node-type');
  
    /**
     * HTML 属性和 DOM 操作属性的对照表
     *
     * @inner
     * @const
     * @type {Object}
     */
  
  
    var HTML_ATTR_PROP_MAP = {
      'readonly': 'readOnly',
      'cellpadding': 'cellPadding',
      'cellspacing': 'cellSpacing',
      'colspan': 'colSpan',
      'rowspan': 'rowSpan',
      'valign': 'vAlign',
      'usemap': 'useMap',
      'frameborder': 'frameBorder',
      'for': 'htmlFor'
    };
    /**
     * 默认的元素的属性设置的变换方法
     *
     * @inner
     * @type {Object}
     */
  
    function defaultElementPropHandler(el, value, name) {
      var propName = HTML_ATTR_PROP_MAP[name] || name;
      var valueNotNull = value != null; // input 的 type 是个特殊属性，其实也应该用 setAttribute
      // 但是 type 不应该运行时动态改变，否则会有兼容性问题
      // 所以这里直接就不管了
  
      if (propName in el) {
        el[propName] = valueNotNull ? value : '';
      } else if (valueNotNull) {
        el.setAttribute(name, value);
      }
  
      if (!valueNotNull) {
        el.removeAttribute(name);
      }
    }
  
    function svgPropHandler(el, value, name) {
      el.setAttribute(name, value);
    }
  
    function boolPropHandler(el, value, name) {
      var propName = HTML_ATTR_PROP_MAP[name] || name;
      el[propName] = !!value;
    } // #[begin] allua
    // see https://github.com/baidu/san/issues/495
  
  
    function placeholderHandler(el, value, name, element) {
      if (ie > 9 && !el.value && value) {
        element.__bkph = true;
        nextTick(function () {
          element.__bkph = false;
        });
      }
  
      defaultElementPropHandler(el, value, name);
    } // #[end]
  
    /* eslint-disable fecs-properties-quote */
  
    /**
     * 默认的属性设置变换方法
     *
     * @inner
     * @type {Object}
     */
  
  
    var defaultElementPropHandlers = {
      style: function (el, value) {
        el.style.cssText = value;
      },
      'class': function (el, value) {
        // eslint-disable-line
        if ( // #[begin] allua
        ie || // #[end]
        el.className !== value) {
          el.className = value;
        }
      },
      slot: empty,
      draggable: boolPropHandler
    };
    /* eslint-enable fecs-properties-quote */
  
    var analInputChecker = {
      checkbox: contains,
      radio: function (a, b) {
        return a === b;
      }
    };
  
    function analInputCheckedState(element, value) {
      var bindValue = getANodeProp(element.aNode, 'value');
      var bindType = getANodeProp(element.aNode, 'type');
  
      if (bindValue && bindType) {
        var type = evalExpr(bindType.expr, element.scope, element.owner);
  
        if (analInputChecker[type]) {
          var bindChecked = getANodeProp(element.aNode, 'checked');
  
          if (bindChecked != null && !bindChecked.hintExpr) {
            bindChecked.hintExpr = bindValue.expr;
          }
  
          return !!analInputChecker[type](value, element.data ? evalExpr(bindValue.expr, element.data, element) : evalExpr(bindValue.expr, element.scope, element.owner));
        }
      }
    }
  
    var elementPropHandlers = {
      input: {
        multiple: boolPropHandler,
        checked: function (el, value, name, element) {
          var state = analInputCheckedState(element, value);
          boolPropHandler(el, state != null ? state : value, 'checked', element); // #[begin] allua
          // 代码不用抽出来防重复，allua内的代码在现代浏览器版本会被编译时干掉，gzip也会处理重复问题
          // see: #378
  
          /* istanbul ignore if */
  
          if (ie && ie < 8 && !element.lifeCycle.attached) {
            boolPropHandler(el, state != null ? state : value, 'defaultChecked', element);
          } // #[end]
  
        },
        // #[begin] allua
        placeholder: placeholderHandler,
        // #[end]
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
      },
      option: {
        value: function (el, value, name, element) {
          defaultElementPropHandler(el, value, name, element);
  
          if (isOptionSelected(element, value)) {
            el.selected = true;
          }
        }
      },
      select: {
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
      },
      textarea: {
        // #[begin] allua
        placeholder: placeholderHandler,
        // #[end]
        readonly: boolPropHandler,
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        required: boolPropHandler
      },
      button: {
        disabled: boolPropHandler,
        autofocus: boolPropHandler,
        type: function (el, value) {
          if (value != null) {
            el.setAttribute('type', value);
          } else {
            el.removeAttribute('type');
          }
        }
      }
    };
  
    function isOptionSelected(element, value) {
      var parentSelect = element.parent;
  
      while (parentSelect) {
        if (parentSelect.tagName === 'select') {
          break;
        }
  
        parentSelect = parentSelect.parent;
      }
  
      if (parentSelect) {
        var selectValue = null;
        var prop;
        var expr;
  
        if ((prop = getANodeProp(parentSelect.aNode, 'value')) && (expr = prop.expr)) {
          selectValue = parentSelect.nodeType === 5 ? evalExpr(expr, parentSelect.data, parentSelect) : evalExpr(expr, parentSelect.scope, parentSelect.owner) || '';
        }
  
        if (selectValue === value) {
          return 1;
        }
      }
    }
    /**
     * 获取属性处理对象
     *
     * @param {string} tagName 元素tag
     * @param {string} attrName 属性名
     * @return {Object}
     */
  
  
    function getPropHandler(tagName, attrName) {
      if (svgTags[tagName]) {
        return svgPropHandler;
      }
  
      var tagPropHandlers = elementPropHandlers[tagName];
  
      if (!tagPropHandlers) {
        tagPropHandlers = elementPropHandlers[tagName] = {};
      }
  
      var propHandler = tagPropHandlers[attrName];
  
      if (!propHandler) {
        propHandler = defaultElementPropHandlers[attrName] || defaultElementPropHandler;
        tagPropHandlers[attrName] = propHandler;
      }
  
      return propHandler;
    } // exports = module.exports = getPropHandler;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 判断变更是否来源于元素
     */
  
    /**
     * 判断变更是否来源于元素，来源于元素时，视图更新需要阻断
     *
     * @param {Object} change 变更对象
     * @param {Element} element 元素
     * @param {string?} propName 属性名，可选。需要精确判断是否来源于此属性时传入
     * @return {boolean}
     */
  
  
    function isDataChangeByElement(change, element, propName) {
      var changeTarget = change.option.target;
      return changeTarget && changeTarget.node === element && (!propName || changeTarget.prop === propName);
    } // exports = module.exports = isDataChangeByElement;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 在对象上使用accessor表达式查找方法
     */
    // var evalExpr = require('../runtime/eval-expr');
  
    /**
     * 在对象上使用accessor表达式查找方法
     *
     * @param {Object} source 源对象
     * @param {Object} nameExpr 表达式
     * @param {Data} data 所属数据环境
     * @return {Function}
     */
  
  
    function findMethod(source, nameExpr, data) {
      var method = source;
  
      for (var i = 0; method != null && i < nameExpr.paths.length; i++) {
        method = method[evalExpr(nameExpr.paths[i], data)];
      }
  
      return method;
    } // exports = module.exports = findMethod;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 数据类
     */
    // var ExprType = require('../parser/expr-type');
    // var evalExpr = require('./eval-expr');
    // var DataChangeType = require('./data-change-type');
    // var createAccessor = require('../parser/create-accessor');
    // var parseExpr = require('../parser/parse-expr');
  
    /**
     * 数据类
     *
     * @class
     * @param {Object?} data 初始数据
     * @param {Model?} parent 父级数据容器
     */
  
  
    function Data(data, parent) {
      this.parent = parent;
      this.raw = data || {};
      this.listeners = [];
    } // #[begin] error
    // 以下两个函数只在开发模式下可用，在生产模式下不存在
  
    /**
     * DataTypes 检测
     */
  
  
    Data.prototype.checkDataTypes = function () {
      if (this.typeChecker) {
        this.typeChecker(this.raw);
      }
    };
    /**
     * 设置 type checker
     *
     * @param  {Function} typeChecker 类型校验器
     */
  
  
    Data.prototype.setTypeChecker = function (typeChecker) {
      this.typeChecker = typeChecker;
    }; // #[end]
  
    /**
     * 添加数据变更的事件监听器
     *
     * @param {Function} listener 监听函数
     */
  
  
    Data.prototype.listen = function (listener) {
      if (typeof listener === 'function') {
        this.listeners.push(listener);
      }
    };
    /**
     * 移除数据变更的事件监听器
     *
     * @param {Function} listener 监听函数
     */
  
  
    Data.prototype.unlisten = function (listener) {
      var len = this.listeners.length;
  
      while (len--) {
        if (!listener || this.listeners[len] === listener) {
          this.listeners.splice(len, 1);
        }
      }
    };
    /**
     * 触发数据变更
     *
     * @param {Object} change 变更信息对象
     */
  
  
    Data.prototype.fire = function (change) {
      if (change.option.silent || change.option.silence || change.option.quiet) {
        return;
      }
  
      for (var i = 0; i < this.listeners.length; i++) {
        this.listeners[i].call(this, change);
      }
    };
    /**
     * 获取数据项
     *
     * @param {string|Object?} expr 数据项路径
     * @param {Data?} callee 当前数据获取的调用环境
     * @return {*}
     */
  
  
    Data.prototype.get = function (expr, callee) {
      var value = this.raw;
  
      if (!expr) {
        return value;
      }
  
      if (typeof expr !== 'object') {
        expr = parseExpr(expr);
      }
  
      var paths = expr.paths;
      callee = callee || this;
      value = value[paths[0].value];
  
      if (value == null && this.parent) {
        value = this.parent.get(expr, callee);
      } else {
        for (var i = 1, l = paths.length; value != null && i < l; i++) {
          value = value[paths[i].value || evalExpr(paths[i], callee)];
        }
      }
  
      return value;
    };
    /**
     * 数据对象变更操作
     *
     * @inner
     * @param {Object|Array} source 要变更的源数据
     * @param {Array} exprPaths 属性路径
     * @param {number} pathsStart 当前处理的属性路径指针位置
     * @param {number} pathsLen 属性路径长度
     * @param {*} value 变更属性值
     * @param {Data} data 对应的Data对象
     * @return {*} 变更后的新数据
     */
  
  
    function immutableSet(source, exprPaths, pathsStart, pathsLen, value, data) {
      if (pathsStart >= pathsLen) {
        return value;
      }
  
      if (source == null) {
        source = {};
      }
  
      var pathExpr = exprPaths[pathsStart];
      var prop = evalExpr(pathExpr, data);
      var result = source;
  
      if (source instanceof Array) {
        var index = +prop;
        prop = isNaN(index) ? prop : index;
        result = source.slice(0);
        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data);
      } else if (typeof source === 'object') {
        result = {};
  
        for (var key in source) {
          /* istanbul ignore else  */
          if (key !== prop && source.hasOwnProperty(key)) {
            result[key] = source[key];
          }
        }
  
        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value, data);
      }
  
      if (pathExpr.value == null) {
        exprPaths[pathsStart] = {
          type: typeof prop === 'string' ? 1 : 2,
          value: prop
        };
      }
  
      return result;
    }
    /**
     * 设置数据项
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} value 数据值
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     */
  
  
    Data.prototype.set = function (expr, value, option) {
      option = option || {}; // #[begin] error
  
      var exprRaw = expr; // #[end]
  
      expr = parseExpr(expr); // #[begin] error
  
      if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data set: ' + exprRaw);
      } // #[end]
  
  
      if (this.get(expr) === value && !option.force) {
        return;
      }
  
      expr = {
        type: 4,
        paths: expr.paths.slice(0),
        raw: expr.raw
      };
      var prop = expr.paths[0].value;
      this.raw[prop] = immutableSet(this.raw[prop], expr.paths, 1, expr.paths.length, value, this);
      this.fire({
        type: 1,
        expr: expr,
        value: value,
        option: option
      }); // #[begin] error
  
      this.checkDataTypes(); // #[end]
    };
    /**
     * 合并更新数据项
     *
     * @param {string|Object} expr 数据项路径
     * @param {Object} source 待合并的数据值
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     */
  
  
    Data.prototype.merge = function (expr, source, option) {
      option = option || {}; // #[begin] error
  
      var exprRaw = expr; // #[end]
  
      expr = parseExpr(expr); // #[begin] error
  
      if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data merge: ' + exprRaw);
      }
  
      if (typeof this.get(expr) !== 'object') {
        throw new Error('[SAN ERROR] Merge Expects a Target of Type \'object\'; got ' + typeof oldValue);
      }
  
      if (typeof source !== 'object') {
        throw new Error('[SAN ERROR] Merge Expects a Source of Type \'object\'; got ' + typeof source);
      } // #[end]
  
  
      for (var key in source) {
        // eslint-disable-line
        this.set(createAccessor(expr.paths.concat([{
          type: 1,
          value: key
        }])), source[key], option);
      }
    };
    /**
     * 基于更新函数更新数据项
     *
     * @param {string|Object} expr 数据项路径
     * @param {Function} fn 数据处理函数
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     */
  
  
    Data.prototype.apply = function (expr, fn, option) {
      // #[begin] error
      var exprRaw = expr; // #[end]
  
      expr = parseExpr(expr); // #[begin] error
  
      if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data apply: ' + exprRaw);
      } // #[end]
  
  
      var oldValue = this.get(expr); // #[begin] error
  
      if (typeof fn !== 'function') {
        throw new Error('[SAN ERROR] Invalid Argument\'s Type in Data apply: ' + 'Expected Function but got ' + typeof fn);
      } // #[end]
  
  
      this.set(expr, fn(oldValue), option);
    };
    /**
     * 数组数据项splice操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {Array} args splice 接受的参数列表，数组项与Array.prototype.splice的参数一致
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     * @return {Array} 新数组
     */
  
  
    Data.prototype.splice = function (expr, args, option) {
      option = option || {}; // #[begin] error
  
      var exprRaw = expr; // #[end]
  
      expr = parseExpr(expr); // #[begin] error
  
      if (expr.type !== 4) {
        throw new Error('[SAN ERROR] Invalid Expression in Data splice: ' + exprRaw);
      } // #[end]
  
  
      expr = {
        type: 4,
        paths: expr.paths.slice(0),
        raw: expr.raw
      };
      var target = this.get(expr);
      var returnValue = [];
  
      if (target instanceof Array) {
        var index = args[0];
        var len = target.length;
  
        if (index > len) {
          index = len;
        } else if (index < 0) {
          index = len + index;
  
          if (index < 0) {
            index = 0;
          }
        }
  
        var newArray = target.slice(0);
        returnValue = newArray.splice.apply(newArray, args);
        this.raw = immutableSet(this.raw, expr.paths, 0, expr.paths.length, newArray, this);
        this.fire({
          expr: expr,
          type: 2,
          index: index,
          deleteCount: returnValue.length,
          value: returnValue,
          insertions: args.slice(2),
          option: option
        });
      } // #[begin] error
  
  
      this.checkDataTypes(); // #[end]
  
      return returnValue;
    };
    /**
     * 数组数据项push操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} item 要push的值
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     * @return {number} 新数组的length属性
     */
  
  
    Data.prototype.push = function (expr, item, option) {
      var target = this.get(expr);
  
      if (target instanceof Array) {
        this.splice(expr, [target.length, 0, item], option);
        return target.length + 1;
      }
    };
    /**
     * 数组数据项pop操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     * @return {*}
     */
  
  
    Data.prototype.pop = function (expr, option) {
      var target = this.get(expr);
  
      if (target instanceof Array) {
        var len = target.length;
  
        if (len) {
          return this.splice(expr, [len - 1, 1], option)[0];
        }
      }
    };
    /**
     * 数组数据项shift操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     * @return {*}
     */
  
  
    Data.prototype.shift = function (expr, option) {
      return this.splice(expr, [0, 1], option)[0];
    };
    /**
     * 数组数据项unshift操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} item 要unshift的值
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     * @return {number} 新数组的length属性
     */
  
  
    Data.prototype.unshift = function (expr, item, option) {
      var target = this.get(expr);
  
      if (target instanceof Array) {
        this.splice(expr, [0, 0, item], option);
        return target.length + 1;
      }
    };
    /**
     * 数组数据项移除操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {number} index 要移除项的索引
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     */
  
  
    Data.prototype.removeAt = function (expr, index, option) {
      this.splice(expr, [index, 1], option);
    };
    /**
     * 数组数据项移除操作
     *
     * @param {string|Object} expr 数据项路径
     * @param {*} value 要移除的项
     * @param {Object=} option 设置参数
     * @param {boolean} option.silent 静默设置，不触发变更事件
     */
  
  
    Data.prototype.remove = function (expr, value, option) {
      var target = this.get(expr);
  
      if (target instanceof Array) {
        var len = target.length;
  
        while (len--) {
          if (target[len] === value) {
            this.splice(expr, [len, 1], option);
            break;
          }
        }
      }
    }; // exports = module.exports = Data;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 获取声明式事件的监听函数
     */
    // var evalArgs = require('../runtime/eval-args');
    // var findMethod = require('../runtime/find-method');
    // var Data = require('../runtime/data');
  
    /**
     * 获取声明式事件的监听函数
     *
     * @param {Object} eventBind 绑定信息对象
     * @param {Component} owner 所属组件环境
     * @param {Data} data 数据环境
     * @param {boolean} isComponentEvent 是否组件自定义事件
     * @return {Function}
     */
  
  
    function getEventListener(eventBind, owner, data, isComponentEvent) {
      var args = eventBind.expr.args;
      return function (e) {
        e = isComponentEvent ? e : e || window.event;
        var method = findMethod(owner, eventBind.expr.name, data);
  
        if (typeof method === 'function') {
          method.apply(owner, args.length ? evalArgs(args, new Data({
            $event: e
          }, data), owner) : []);
        }
  
        if (eventBind.modifier.prevent) {
          e.preventDefault && e.preventDefault();
          return false;
        }
  
        if (eventBind.modifier.stop) {
          if (e.stopPropagation) {
            e.stopPropagation();
          } else {
            e.cancelBubble = true;
          }
        }
      };
    } // exports = module.exports = getEventListener;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 判断变更数组是否影响到数据引用摘要
     */
  
    /**
     * 判断变更数组是否影响到数据引用摘要
     *
     * @param {Array} changes 变更数组
     * @param {Object} dataRef 数据引用摘要
     * @return {boolean}
     */
  
  
    function changesIsInDataRef(changes, dataRef) {
      if (dataRef) {
        for (var i = 0; i < changes.length; i++) {
          var change = changes[i];
  
          if (!change.overview) {
            var paths = change.expr.paths;
            change.overview = paths[0].value;
  
            if (paths.length > 1) {
              change.extOverview = paths[0].value + '.' + paths[1].value;
              change.wildOverview = paths[0].value + '.*';
            }
          }
  
          if (dataRef[change.overview] || change.wildOverview && dataRef[change.wildOverview] || change.extOverview && dataRef[change.extOverview]) {
            return true;
          }
        }
      }
    } // exports = module.exports = changesIsInDataRef;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file insertBefore 方法的兼容性封装
     */
  
    /**
     * insertBefore 方法的兼容性封装
     *
     * @param {HTMLNode} targetEl 要插入的节点
     * @param {HTMLElement} parentEl 父元素
     * @param {HTMLElement?} beforeEl 在此元素之前插入
     */
  
  
    function insertBefore(targetEl, parentEl, beforeEl) {
      if (parentEl) {
        if (beforeEl) {
          parentEl.insertBefore(targetEl, beforeEl);
        } else {
          parentEl.appendChild(targetEl);
        }
      }
    } // exports = module.exports = insertBefore;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 元素的基本属性
     */
  
  
    var baseProps = {
      'class': 1,
      'style': 1,
      'id': 1
    }; // exports = module.exports = baseProps;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 元素子节点遍历操作类
     */
    // var removeEl = require('../browser/remove-el');
    // #[begin] reverse
  
    /**
     * 元素子节点遍历操作类
     *
     * @inner
     * @class
     * @param {HTMLElement} el 要遍历的元素
     */
  
    function DOMChildrenWalker(el) {
      this.children = [];
      this.index = 0;
      this.target = el;
      var child = el.firstChild;
      var next;
  
      while (child) {
        next = child.nextSibling;
  
        switch (child.nodeType) {
          case 3:
            if (/^\s*$/.test(child.data || child.textContent)) {
              removeEl(child);
            } else {
              this.children.push(child);
            }
  
            break;
  
          case 1:
          case 8:
            this.children.push(child);
        }
  
        child = next;
      }
  
      this.current = this.children[this.index];
      this.next = this.children[this.index + 1];
    }
    /**
     * 往下走一个元素
     */
  
  
    DOMChildrenWalker.prototype.goNext = function () {
      this.current = this.children[++this.index];
      this.next = this.children[this.index + 1];
    }; // #[end]
    // exports = module.exports = DOMChildrenWalker;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 元素节点类
     */
    // var changeExprCompare = require('../runtime/change-expr-compare');
    // var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
    // var evalExpr = require('../runtime/eval-expr');
    // var insertBefore = require('../browser/insert-before');
    // var LifeCycle = require('./life-cycle');
    // var NodeType = require('./node-type');
    // var baseProps = require('./base-props');
    // var reverseElementChildren = require('./reverse-element-children');
    // var isDataChangeByElement = require('./is-data-change-by-element');
    // var getPropHandler = require('./get-prop-handler');
    // var createNode = require('./create-node');
    // var elementOwnDetach = require('./element-own-detach');
    // var elementOwnDispose = require('./element-own-dispose');
    // var elementOwnOnEl = require('./element-own-on-el');
    // var elementOwnAttached = require('./element-own-attached');
    // var nodeSBindInit = require('./node-s-bind-init');
    // var nodeSBindUpdate = require('./node-s-bind-update');
    // var warnSetHTML = require('./warn-set-html');
    // var getNodePath = require('./get-node-path');
  
    /**
     * 元素节点类
     *
     * @class
     * @param {Object} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
     */
  
  
    function Element(aNode, parent, scope, owner, reverseWalker) {
      this.aNode = aNode;
      this.owner = owner;
      this.scope = scope;
      this.parent = parent;
      this.lifeCycle = LifeCycle.start;
      this.children = [];
      this._elFns = [];
      this.parentComponent = parent.nodeType === 5 ? parent : parent.parentComponent;
      this.tagName = aNode.tagName; // #[begin] allua
      // ie8- 不支持innerHTML输出自定义标签
  
      /* istanbul ignore if */
  
      if (ieOldThan9 && this.tagName.indexOf('-') > 0) {
        this.tagName = 'div';
      } // #[end]
  
  
      this._sbindData = nodeSBindInit(aNode.directives.bind, this.scope, this.owner);
      this.lifeCycle = LifeCycle.inited; // #[begin] reverse
  
      if (reverseWalker) {
        var currentNode = reverseWalker.current;
        /* istanbul ignore if */
  
        if (!currentNode) {
          throw new Error('[SAN REVERSE ERROR] Element not found. \nPaths: ' + getNodePath(this).join(' > '));
        }
        /* istanbul ignore if */
  
  
        if (currentNode.nodeType !== 1) {
          throw new Error('[SAN REVERSE ERROR] Element type not match, expect 1 but ' + currentNode.nodeType + '.\nPaths: ' + getNodePath(this).join(' > '));
        }
        /* istanbul ignore if */
  
  
        if (currentNode.tagName.toLowerCase() !== this.tagName) {
          throw new Error('[SAN REVERSE ERROR] Element tagName not match, expect ' + this.tagName + ' but meat ' + currentNode.tagName.toLowerCase() + '.\nPaths: ' + getNodePath(this).join(' > '));
        }
  
        this.el = currentNode;
        reverseWalker.goNext();
        reverseElementChildren(this, this.scope, this.owner);
        this.lifeCycle = LifeCycle.created;
  
        this._attached();
  
        this.lifeCycle = LifeCycle.attached;
      } // #[end]
  
    }
  
    Element.prototype.nodeType = 4;
    /**
     * 将元素attach到页面
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
  
    Element.prototype.attach = function (parentEl, beforeEl) {
      if (!this.lifeCycle.attached) {
        if (!this.el) {
          var sourceNode = this.aNode.hotspot.sourceNode;
          var props = this.aNode.props;
  
          if (sourceNode) {
            this.el = sourceNode.cloneNode(false);
            props = this.aNode.hotspot.dynamicProps;
          } else {
            this.el = createEl(this.tagName);
          }
  
          if (this._sbindData) {
            for (var key in this._sbindData) {
              if (this._sbindData.hasOwnProperty(key)) {
                getPropHandler(this.tagName, key)(this.el, this._sbindData[key], key, this);
              }
            }
          }
  
          for (var i = 0, l = props.length; i < l; i++) {
            var prop = props[i];
            var value = evalExpr(prop.expr, this.scope, this.owner);
  
            if (value || !baseProps[prop.name]) {
              prop.handler(this.el, value, prop.name, this);
            }
          }
  
          this.lifeCycle = LifeCycle.created;
        }
  
        insertBefore(this.el, parentEl, beforeEl);
  
        if (!this._contentReady) {
          var htmlDirective = this.aNode.directives.html;
  
          if (htmlDirective) {
            // #[begin] error
            warnSetHTML(this.el); // #[end]
  
            this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner);
          } else {
            for (var i = 0, l = this.aNode.children.length; i < l; i++) {
              var childANode = this.aNode.children[i];
              var child = childANode.Clazz ? new childANode.Clazz(childANode, this, this.scope, this.owner) : createNode(childANode, this, this.scope, this.owner);
              this.children.push(child);
              child.attach(this.el);
            }
          }
  
          this._contentReady = 1;
        }
  
        this._attached();
  
        this.lifeCycle = LifeCycle.attached;
      }
    };
  
    Element.prototype.detach = elementOwnDetach;
    Element.prototype.dispose = elementOwnDispose;
    Element.prototype._onEl = elementOwnOnEl;
  
    Element.prototype._leave = function () {
      if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
          var len = this.children.length;
  
          while (len--) {
            this.children[len].dispose(1, 1);
          }
  
          len = this._elFns.length;
  
          while (len--) {
            var fn = this._elFns[len];
            un(this.el, fn[0], fn[1], fn[2]);
          }
  
          this._elFns = null; // #[begin] allua
  
          /* istanbul ignore if */
  
          if (this._inputTimer) {
            clearInterval(this._inputTimer);
            this._inputTimer = null;
          } // #[end]
          // 如果没有parent，说明是一个root component，一定要从dom树中remove
  
  
          if (!this.disposeNoDetach || !this.parent) {
            removeEl(this.el);
          }
  
          this.lifeCycle = LifeCycle.detached;
          this.el = null;
          this.owner = null;
          this.scope = null;
          this.children = null;
          this.lifeCycle = LifeCycle.disposed;
  
          if (this._ondisposed) {
            this._ondisposed();
          }
        }
      }
    };
    /**
     * 视图更新
     *
     * @param {Array} changes 数据变化信息
     */
  
  
    Element.prototype._update = function (changes) {
      var dataHotspot = this.aNode.hotspot.data;
  
      if (dataHotspot && changesIsInDataRef(changes, dataHotspot)) {
        // update s-bind
        var me = this;
        this._sbindData = nodeSBindUpdate(this.aNode.directives.bind, this._sbindData, this.scope, this.owner, changes, function (name, value) {
          if (name in me.aNode.hotspot.props) {
            return;
          }
  
          getPropHandler(me.tagName, name)(me.el, value, name, me);
        }); // update prop
  
        var dynamicProps = this.aNode.hotspot.dynamicProps;
  
        for (var i = 0, l = dynamicProps.length; i < l; i++) {
          var prop = dynamicProps[i];
          var propName = prop.name;
  
          for (var j = 0, changeLen = changes.length; j < changeLen; j++) {
            var change = changes[j];
  
            if (!isDataChangeByElement(change, this, propName) && (changeExprCompare(change.expr, prop.expr, this.scope) || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.scope))) {
              prop.handler(this.el, evalExpr(prop.expr, this.scope, this.owner), propName, this);
              break;
            }
          }
        } // update content
  
  
        var htmlDirective = this.aNode.directives.html;
  
        if (htmlDirective) {
          var len = changes.length;
  
          while (len--) {
            if (changeExprCompare(changes[len].expr, htmlDirective.value, this.scope)) {
              // #[begin] error
              warnSetHTML(this.el); // #[end]
  
              this.el.innerHTML = evalExpr(htmlDirective.value, this.scope, this.owner);
              break;
            }
          }
        } else {
          for (var i = 0, l = this.children.length; i < l; i++) {
            this.children[i]._update(changes);
          }
        }
      }
    };
    /**
     * 执行完成attached状态的行为
     */
  
  
    Element.prototype._attached = elementOwnAttached; // exports = module.exports = Element;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 创建节点对应的 stump comment 元素
     */
  
    /**
     * 创建节点对应的 stump comment 主元素
     */
  
    function nodeOwnCreateStump() {
      this.el = this.el || document.createComment(this.id);
    } // exports = module.exports = nodeOwnCreateStump;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 销毁释放元素的子元素
     */
  
    /**
     * 销毁释放元素的子元素
     *
     * @param {Array=} children 子元素数组
     * @param {boolean=} noDetach 是否不要把节点从dom移除
     * @param {boolean=} noTransition 是否不显示过渡动画效果
     */
  
  
    function elementDisposeChildren(children, noDetach, noTransition) {
      var len = children && children.length;
  
      while (len--) {
        children[len].dispose(noDetach, noTransition);
      }
    } // exports = module.exports = elementDisposeChildren;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 简单执行销毁节点的行为
     */
    // var removeEl = require('../browser/remove-el');
    // var LifeCycle = require('./life-cycle');
    // var elementDisposeChildren = require('./element-dispose-children');
  
    /**
     * 简单执行销毁节点的行为
     *
     * @param {boolean=} noDetach 是否不要把节点从dom移除
     */
  
  
    function nodeOwnSimpleDispose(noDetach) {
      elementDisposeChildren(this.children, noDetach, 1);
  
      if (!noDetach) {
        removeEl(this.el);
      }
  
      this.el = null;
      this.owner = null;
      this.scope = null;
      this.children = null;
      this.lifeCycle = LifeCycle.disposed;
  
      if (this._ondisposed) {
        this._ondisposed();
      }
    } // exports = module.exports = nodeOwnSimpleDispose;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 异步组件类
     */
    // var guid = require('../util/guid');
    // var each = require('../util/each');
    // var insertBefore = require('../browser/insert-before');
    // var nodeOwnCreateStump = require('./node-own-create-stump');
    // var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
  
    /**
     * 异步组件类
     *
     * @class
     * @param {Object} options 初始化参数
     * @param {Object} loader 组件加载器
     */
  
  
    function AsyncComponent(options, loader) {
      this.options = options;
      this.loader = loader;
      this.id = guid++;
      this.children = []; // #[begin] reverse
  
      var reverseWalker = options.reverseWalker;
  
      if (reverseWalker) {
        var PlaceholderComponent = this.loader.placeholder;
  
        if (PlaceholderComponent) {
          this.children[0] = new PlaceholderComponent(options);
        }
  
        this._create();
  
        insertBefore(this.el, reverseWalker.target, reverseWalker.current);
        var me = this;
        this.loader.start(function (ComponentClass) {
          me.onload(ComponentClass);
        });
      }
  
      options.reverseWalker = null; // #[end]
    }
  
    AsyncComponent.prototype._create = nodeOwnCreateStump;
    AsyncComponent.prototype.dispose = nodeOwnSimpleDispose;
    /**
     * attach到页面
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
  
    AsyncComponent.prototype.attach = function (parentEl, beforeEl) {
      var PlaceholderComponent = this.loader.placeholder;
  
      if (PlaceholderComponent) {
        var component = new PlaceholderComponent(this.options);
        this.children[0] = component;
        component.attach(parentEl, beforeEl);
      }
  
      this._create();
  
      insertBefore(this.el, parentEl, beforeEl);
      var me = this;
      this.loader.start(function (ComponentClass) {
        me.onload(ComponentClass);
      });
    };
    /**
     * loader加载完成，渲染组件
     *
     * @param {Function=} ComponentClass 组件类
     */
  
  
    AsyncComponent.prototype.onload = function (ComponentClass) {
      if (this.el && ComponentClass) {
        var component = new ComponentClass(this.options);
        component.attach(this.el.parentNode, this.el);
        var parentChildren = this.options.parent.children;
  
        if (this.parentIndex == null || parentChildren[this.parentIndex] !== this) {
          each(parentChildren, function (child, index) {
            if (child instanceof AsyncComponent) {
              child.parentIndex = index;
            }
          });
        }
  
        parentChildren[this.parentIndex] = component;
      }
  
      this.dispose();
    };
    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
  
  
    AsyncComponent.prototype._update = function (changes) {
      this.children[0] && this.children[0]._update(changes);
    }; // exports = module.exports = AsyncComponent;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 通过组件反解创建节点的工厂方法
     */
    // var Element = require('./element');
    // var AsyncComponent = require('./async-component');
    // #[begin] reverse
  
    /**
     * 通过组件反解创建节点
     *
     * @param {ANode} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {DOMChildrenWalker} reverseWalker 子元素遍历对象
     * @return {Node}
     */
  
  
    function createReverseNode(aNode, parent, scope, owner, reverseWalker) {
      if (aNode.Clazz) {
        return new aNode.Clazz(aNode, parent, scope, owner, reverseWalker);
      }
  
      var ComponentOrLoader = owner.getComponentType ? owner.getComponentType(aNode, scope) : owner.components[aNode.tagName];
  
      if (ComponentOrLoader) {
        return typeof ComponentOrLoader === 'function' ? new ComponentOrLoader({
          source: aNode,
          owner: owner,
          scope: scope,
          parent: parent,
          subTag: aNode.tagName,
          reverseWalker: reverseWalker
        }) : new AsyncComponent({
          source: aNode,
          owner: owner,
          scope: scope,
          parent: parent,
          subTag: aNode.tagName,
          reverseWalker: reverseWalker
        }, ComponentOrLoader);
      }
  
      return new Element(aNode, parent, scope, owner, reverseWalker);
    } // #[end]
    // exports = module.exports = createReverseNode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 对元素的子节点进行反解
     */
    // var each = require('../util/each');
    // var DOMChildrenWalker = require('./dom-children-walker');
    // var createReverseNode = require('./create-reverse-node');
    // #[begin] reverse
  
    /**
     * 对元素的子节点进行反解
     *
     * @param {Object} element 元素
     */
  
  
    function reverseElementChildren(element, scope, owner) {
      var htmlDirective = element.aNode.directives.html;
  
      if (!htmlDirective) {
        var reverseWalker = new DOMChildrenWalker(element.el);
        var aNodeChildren = element.aNode.children;
  
        for (var i = 0, l = aNodeChildren.length; i < l; i++) {
          element.children.push(createReverseNode(aNodeChildren[i], element, scope, owner, reverseWalker));
        }
      }
    } // #[end]
    // exports = module.exports = reverseElementChildren;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 创建节点的工厂方法
     */
    // var Element = require('./element');
    // var AsyncComponent = require('./async-component');
  
    /**
     * 创建节点
     *
     * @param {ANode} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @return {Node}
     */
  
  
    function createNode(aNode, parent, scope, owner) {
      if (aNode.Clazz) {
        return new aNode.Clazz(aNode, parent, scope, owner);
      }
  
      var ComponentOrLoader = owner.getComponentType ? owner.getComponentType(aNode, scope) : owner.components[aNode.tagName];
  
      if (ComponentOrLoader) {
        return typeof ComponentOrLoader === 'function' ? new ComponentOrLoader({
          source: aNode,
          owner: owner,
          scope: scope,
          parent: parent,
          subTag: aNode.tagName
        }) : new AsyncComponent({
          source: aNode,
          owner: owner,
          scope: scope,
          parent: parent,
          subTag: aNode.tagName
        }, ComponentOrLoader);
      }
  
      aNode.Clazz = Element;
      return new Element(aNode, parent, scope, owner);
    } // exports = module.exports = createNode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 获取 element 的 transition 控制对象
     */
    // var evalArgs = require('../runtime/eval-args');
    // var findMethod = require('../runtime/find-method');
    // var NodeType = require('./node-type');
  
    /**
     * 获取 element 的 transition 控制对象
     *
     * @param {Object} element 元素
     * @return {Object?}
     */
  
  
    function elementGetTransition(element) {
      var directive = element.aNode.directives.transition;
      var owner = element.owner;
  
      if (element.nodeType === 5) {
        var cmptGivenTransition = element.source && element.source.directives.transition;
  
        if (cmptGivenTransition) {
          directive = cmptGivenTransition;
        } else {
          owner = element;
        }
      }
  
      var transition;
  
      if (directive && owner) {
        transition = findMethod(owner, directive.value.name);
  
        if (typeof transition === 'function') {
          transition = transition.apply(owner, evalArgs(directive.value.args, element.scope, owner));
        }
      }
  
      return transition || element.transition;
    } // exports = module.exports = elementGetTransition;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 将元素从页面上移除
     */
    // var elementGetTransition = require('./element-get-transition');
  
    /**
     * 将元素从页面上移除
     */
  
  
    function elementOwnDetach() {
      var lifeCycle = this.lifeCycle;
  
      if (lifeCycle.leaving) {
        return;
      }
  
      if (!this.disposeNoTransition) {
        var transition = elementGetTransition(this);
  
        if (transition && transition.leave) {
          if (this._toPhase) {
            this._toPhase('leaving');
          } else {
            this.lifeCycle = LifeCycle.leaving;
          }
  
          var me = this;
          transition.leave(this.el, function () {
            me._leave();
          });
          return;
        }
      }
  
      this._leave();
    } // exports = module.exports = elementOwnDetach;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 销毁释放元素
     */
  
    /**
     * 销毁释放元素
     *
     * @param {boolean=} noDetach 是否不要把节点从dom移除
     * @param {boolean=} noTransition 是否不显示过渡动画效果
     */
  
  
    function elementOwnDispose(noDetach, noTransition) {
      this.leaveDispose = 1;
      this.disposeNoDetach = noDetach;
      this.disposeNoTransition = noTransition;
      this.detach();
    } // exports = module.exports = elementOwnDispose;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 为元素的 el 绑定事件
     */
    // var on = require('../browser/on');
  
    /**
     * 为元素的 el 绑定事件
     *
     * @param {string} name 事件名
     * @param {Function} listener 监听器
     * @param {boolean} capture 是否是捕获阶段触发
     */
  
  
    function elementOwnOnEl(name, listener, capture) {
      capture = !!capture;
  
      this._elFns.push([name, listener, capture]);
  
      on(this.el, name, listener, capture);
    } // exports = module.exports = elementOwnOnEl;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 是否浏览器环境
     */
  
  
    var isBrowser = typeof window !== 'undefined'; // exports = module.exports = isBrowser;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 开发时的警告提示
     */
    // #[begin] error
  
    /**
     * 开发时的警告提示
     *
     * @param {string} message 警告信息
     */
  
    function warn(message) {
      message = '[SAN WARNING] ' + message;
      /* eslint-disable no-console */
  
      /* istanbul ignore next */
  
      if (typeof console === 'object' && console.warn) {
        console.warn(message);
      } else {
        // 防止警告中断调用堆栈
        setTimeout(function () {
          throw new Error(message);
        }, 0);
      }
      /* eslint-enable no-console */
  
    } // #[end]
    // exports = module.exports = warn;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file  事件绑定不存在的 warning
     */
    // var each = require('../util/each');
    // var warn = require('../util/warn');
    // #[begin] error
  
    /**
     * 事件绑定不存在的 warning
     *
     * @param {Object} eventBind 事件绑定对象
     * @param {Component} owner 所属的组件对象
     */
  
  
    function warnEventListenMethod(eventBind, owner) {
      var valid = true;
      var method = owner;
      each(eventBind.expr.name.paths, function (path) {
        method = method[path.value];
        valid = !!method;
        return valid;
      });
  
      if (!valid) {
        var paths = [];
        each(eventBind.expr.name.paths, function (path) {
          paths.push(path.value);
        });
        warn(eventBind.name + ' listen fail,"' + paths.join('.') + '" not exist');
      }
    } // #[end]
    // exports = module.exports = warnEventListenMethod;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 完成元素 attached 后的行为
     */
    // var empty = require('../util/empty');
    // var isBrowser = require('../browser/is-browser');
    // var trigger = require('../browser/trigger');
    // var NodeType = require('./node-type');
    // var elementGetTransition = require('./element-get-transition');
    // var getEventListener = require('./get-event-listener');
    // var warnEventListenMethod = require('./warn-event-listen-method');
  
    /**
     * 双绑输入框CompositionEnd事件监听函数
     *
     * @inner
     */
  
  
    function inputOnCompositionEnd() {
      if (!this.composing) {
        return;
      }
  
      this.composing = 0;
      trigger(this, 'input');
    }
    /**
     * 双绑输入框CompositionStart事件监听函数
     *
     * @inner
     */
  
  
    function inputOnCompositionStart() {
      this.composing = 1;
    }
  
    function getXPropOutputer(element, xProp, data) {
      return function () {
        xPropOutput(element, xProp, data);
      };
    }
  
    function getInputXPropOutputer(element, xProp, data) {
      return function () {
        // #[begin] allua
        if (element.__bkph) {
          element.__bkph = false;
          return;
        } // #[end]
  
  
        if (!this.composing) {
          xPropOutput(element, xProp, data);
        }
      };
    } // #[begin] allua
  
    /* istanbul ignore next */
  
  
    function getInputFocusXPropHandler(element, xProp, data) {
      return function () {
        element._inputTimer = setInterval(function () {
          xPropOutput(element, xProp, data);
        }, 16);
      };
    }
    /* istanbul ignore next */
  
  
    function getInputBlurXPropHandler(element) {
      return function () {
        clearInterval(element._inputTimer);
        element._inputTimer = null;
      };
    } // #[end]
  
  
    function xPropOutput(element, bindInfo, data) {
      /* istanbul ignore if */
      if (!element.lifeCycle.created) {
        return;
      }
  
      var el = element.el;
  
      if (element.tagName === 'input' && bindInfo.name === 'checked') {
        var bindValue = getANodeProp(element.aNode, 'value');
        var bindType = getANodeProp(element.aNode, 'type');
  
        if (bindValue && bindType) {
          switch (el.type.toLowerCase()) {
            case 'checkbox':
              data[el.checked ? 'push' : 'remove'](bindInfo.expr, el.value);
              return;
  
            case 'radio':
              el.checked && data.set(bindInfo.expr, el.value, {
                target: {
                  node: element,
                  prop: bindInfo.name
                }
              });
              return;
          }
        }
      }
  
      data.set(bindInfo.expr, el[bindInfo.name], {
        target: {
          node: element,
          prop: bindInfo.name
        }
      });
    }
    /**
     * 完成元素 attached 后的行为
     *
     * @param {Object} element 元素节点
     */
  
  
    function elementOwnAttached() {
      if (this._rootNode) {
        return;
      }
  
      var isComponent = this.nodeType === 5;
      var data = isComponent ? this.data : this.scope;
      /* eslint-disable no-redeclare */
      // 处理自身变化时双向绑定的逻辑
  
      var xProps = this.aNode.hotspot.xProps;
  
      for (var i = 0, l = xProps.length; i < l; i++) {
        var xProp = xProps[i];
  
        switch (xProp.name) {
          case 'value':
            switch (this.tagName) {
              case 'input':
              case 'textarea':
                if (isBrowser && window.CompositionEvent) {
                  this._onEl('change', inputOnCompositionEnd);
  
                  this._onEl('compositionstart', inputOnCompositionStart);
  
                  this._onEl('compositionend', inputOnCompositionEnd);
                } // #[begin] allua
  
                /* istanbul ignore else */
  
  
                if ('oninput' in this.el) {
                  // #[end]
                  this._onEl('input', getInputXPropOutputer(this, xProp, data)); // #[begin] allua
  
                } else {
                  this._onEl('focusin', getInputFocusXPropHandler(this, xProp, data));
  
                  this._onEl('focusout', getInputBlurXPropHandler(this));
                } // #[end]
  
  
                break;
  
              case 'select':
                this._onEl('change', getXPropOutputer(this, xProp, data));
  
                break;
            }
  
            break;
  
          case 'checked':
            switch (this.tagName) {
              case 'input':
                switch (this.el.type) {
                  case 'checkbox':
                  case 'radio':
                    this._onEl('click', getXPropOutputer(this, xProp, data));
  
                }
  
            }
  
            break;
        }
      }
  
      var owner = isComponent ? this : this.owner;
  
      for (var i = 0, l = this.aNode.events.length; i < l; i++) {
        var eventBind = this.aNode.events[i]; // #[begin] error
  
        warnEventListenMethod(eventBind, owner); // #[end]
  
        this._onEl(eventBind.name, getEventListener(eventBind, owner, data, eventBind.modifier), eventBind.modifier.capture);
      }
  
      if (isComponent) {
        for (var i = 0, l = this.nativeEvents.length; i < l; i++) {
          var eventBind = this.nativeEvents[i]; // #[begin] error
  
          warnEventListenMethod(eventBind, this.owner); // #[end]
  
          this._onEl(eventBind.name, getEventListener(eventBind, this.owner, this.scope), eventBind.modifier.capture);
        }
      }
  
      var transition = elementGetTransition(this);
  
      if (transition && transition.enter) {
        transition.enter(this.el, empty);
      }
    } // exports = module.exports = elementOwnAttached;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 初始化节点的 s-bind 数据
     */
    // var evalExpr = require('../runtime/eval-expr');
  
    /**
     * 初始化节点的 s-bind 数据
     *
     * @param {Object} sBind bind指令对象
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @return {boolean}
     */
  
  
    function nodeSBindInit(sBind, scope, owner) {
      if (sBind && scope) {
        return evalExpr(sBind.value, scope, owner);
      }
    } // exports = module.exports = nodeSBindInit;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 计算两个对象 key 的并集
     */
  
    /**
     * 计算两个对象 key 的并集
     *
     * @param {Object} obj1 目标对象
     * @param {Object} obj2 源对象
     * @return {Array}
     */
  
  
    function unionKeys(obj1, obj2) {
      var result = [];
      var key;
  
      for (key in obj1) {
        /* istanbul ignore else  */
        if (obj1.hasOwnProperty(key)) {
          result.push(key);
        }
      }
  
      for (key in obj2) {
        /* istanbul ignore else  */
        if (obj2.hasOwnProperty(key)) {
          !obj1[key] && result.push(key);
        }
      }
  
      return result;
    } // exports = module.exports = unionKeys;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 更新节点的 s-bind 数据
     */
    // var unionKeys = require('../util/union-keys');
    // var evalExpr = require('../runtime/eval-expr');
    // var changeExprCompare = require('../runtime/change-expr-compare');
  
    /**
     * 更新节点的 s-bind 数据
     *
     * @param {Object} sBind bind指令对象
     * @param {Object} oldBindData 当前s-bind数据
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {Array} changes 变更数组
     * @param {Function} updater 绑定对象子项变更的更新函数
     */
  
  
    function nodeSBindUpdate(sBind, oldBindData, scope, owner, changes, updater) {
      if (sBind) {
        var len = changes.length;
  
        while (len--) {
          if (changeExprCompare(changes[len].expr, sBind.value, scope)) {
            var newBindData = evalExpr(sBind.value, scope, owner);
  
            if (newBindData === oldBindData) {
              return oldBindData;
            }
  
            var keys = unionKeys(newBindData, oldBindData);
  
            for (var i = 0, l = keys.length; i < l; i++) {
              var key = keys[i];
              var value = newBindData[key];
  
              if (value !== oldBindData[key]) {
                updater(key, value);
              }
            }
  
            return newBindData;
          }
        }
  
        return oldBindData;
      }
    } // exports = module.exports = nodeSBindUpdate;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 判断元素是否不允许设置HTML
     */
    // some html elements cannot set innerHTML in old ie
    // see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
  
    /**
     * 判断元素是否不允许设置HTML
     *
     * @param {HTMLElement} el 要判断的元素
     * @return {boolean}
     */
  
  
    function noSetHTML(el) {
      return /^(col|colgroup|frameset|style|table|tbody|tfoot|thead|tr|select)$/i.test(el.tagName);
    } // exports = module.exports = noSetHTML;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file  获取节点 stump 的 comment
     */
    // var noSetHTML = require('../browser/no-set-html');
    // var warn = require('../util/warn');
    // #[begin] error
  
    /**
     * 获取节点 stump 的 comment
     *
     * @param {HTMLElement} el HTML元素
     */
  
  
    function warnSetHTML(el) {
      // dont warn if not in browser runtime
  
      /* istanbul ignore if */
      if (!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document)) {
        return;
      } // some html elements cannot set innerHTML in old ie
      // see: https://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx
  
  
      if (noSetHTML(el)) {
        warn('set html for element "' + el.tagName + '" may cause an error in old IE');
      }
    } // #[end]
    // exports = module.exports = warnSetHTML;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 获取节点在组件树中的路径
     */
    // var NodeType = require('./node-type');
    // #[begin] reverse
  
    /**
     * 获取节点在组件树中的路径
     *
     * @param {Node} node 节点对象
     * @return {Array}
     */
  
    /* istanbul ignore next */
  
  
    function getNodePath(node) {
      var nodePaths = [];
      var nodeParent = node;
  
      while (nodeParent) {
        switch (nodeParent.nodeType) {
          case 4:
            nodePaths.unshift(nodeParent.tagName);
            break;
  
          case 2:
            nodePaths.unshift('if');
            break;
  
          case 3:
            nodePaths.unshift('for[' + nodeParent.aNode.directives['for'].raw + ']'); // eslint-disable-line dot-notation
  
            break;
  
          case 6:
            nodePaths.unshift('slot[' + (nodeParent.name || 'default') + ']');
            break;
  
          case 7:
            nodePaths.unshift('template');
            break;
  
          case 5:
            nodePaths.unshift('component[' + (nodeParent.subTag || 'root') + ']');
            break;
  
          case 1:
            nodePaths.unshift('text');
            break;
        }
  
        nodeParent = nodeParent.parent;
      }
  
      return nodePaths;
    } // #[end]
    // exports = module.exports = getNodePath;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 给 devtool 发通知消息
     */
    // var isBrowser = require('../browser/is-browser');
    // #[begin] devtool
  
  
    var san4devtool;
    /**
     * 给 devtool 发通知消息
     *
     * @param {string} name 消息名称
     * @param {*} arg 消息参数
     */
  
    function emitDevtool(name, arg) {
      /* istanbul ignore if */
      if (isBrowser && san4devtool && san4devtool.debug && window.__san_devtool__) {
        window.__san_devtool__.emit(name, arg);
      }
    }
  
    emitDevtool.start = function (main) {
      san4devtool = main;
      emitDevtool('san', main);
    }; // #[end]
    // exports = module.exports = emitDevtool;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 组件类
     */
    // var bind = require('../util/bind');
    // var each = require('../util/each');
    // var guid = require('../util/guid');
    // var extend = require('../util/extend');
    // var nextTick = require('../util/next-tick');
    // var emitDevtool = require('../util/emit-devtool');
    // var ExprType = require('../parser/expr-type');
    // var parseExpr = require('../parser/parse-expr');
    // var parseTemplate = require('../parser/parse-template');
    // var createAccessor = require('../parser/create-accessor');
    // var removeEl = require('../browser/remove-el');
    // var Data = require('../runtime/data');
    // var evalExpr = require('../runtime/eval-expr');
    // var changeExprCompare = require('../runtime/change-expr-compare');
    // var DataChangeType = require('../runtime/data-change-type');
    // var insertBefore = require('../browser/insert-before');
    // var un = require('../browser/un');
    // var createNode = require('./create-node');
    // var compileComponent = require('./compile-component');
    // var preheatANode = require('./preheat-a-node');
    // var LifeCycle = require('./life-cycle');
    // var getANodeProp = require('./get-a-node-prop');
    // var isDataChangeByElement = require('./is-data-change-by-element');
    // var getEventListener = require('./get-event-listener');
    // var reverseElementChildren = require('./reverse-element-children');
    // var NodeType = require('./node-type');
    // var nodeSBindInit = require('./node-s-bind-init');
    // var nodeSBindUpdate = require('./node-s-bind-update');
    // var elementOwnAttached = require('./element-own-attached');
    // var elementOwnOnEl = require('./element-own-on-el');
    // var elementOwnDetach = require('./element-own-detach');
    // var elementOwnDispose = require('./element-own-dispose');
    // var warnEventListenMethod = require('./warn-event-listen-method');
    // var elementDisposeChildren = require('./element-dispose-children');
    // var createDataTypesChecker = require('../util/create-data-types-checker');
    // var warn = require('../util/warn');
  
    /**
     * 组件类
     *
     * @class
     * @param {Object} options 初始化参数
     */
  
  
    function Component(options) {
      // eslint-disable-line
      // #[begin] error
      for (var key in Component.prototype) {
        if (this[key] !== Component.prototype[key]) {
          /* eslint-disable max-len */
          warn('\`' + key + '\` is a reserved key of san components. Overriding this property may cause unknown exceptions.');
          /* eslint-enable max-len */
        }
      } // #[end]
  
  
      options = options || {};
      this.lifeCycle = LifeCycle.start;
      this.children = [];
      this._elFns = [];
      this.listeners = {};
      this.slotChildren = [];
      this.implicitChildren = [];
      var clazz = this.constructor;
      this.filters = this.filters || clazz.filters || {};
      this.computed = this.computed || clazz.computed || {};
      this.messages = this.messages || clazz.messages || {};
  
      if (options.transition) {
        this.transition = options.transition;
      }
  
      this.subTag = options.subTag; // compile
  
      compileComponent(clazz);
      var protoANode = clazz.prototype.aNode;
      preheatANode(protoANode);
      this.tagName = protoANode.tagName;
      this.source = typeof options.source === 'string' ? parseTemplate(options.source).children[0] : options.source;
      preheatANode(this.source);
      this.sourceSlotNameProps = [];
      this.sourceSlots = {
        named: {}
      };
      this.owner = options.owner;
      this.scope = options.scope;
      this.el = options.el;
      var parent = options.parent;
  
      if (parent) {
        this.parent = parent;
        this.parentComponent = parent.nodeType === 5 ? parent : parent && parent.parentComponent;
      } else if (this.owner) {
        this.parentComponent = this.owner;
        this.scope = this.owner.data;
      }
  
      this.id = guid++; // #[begin] reverse
      // 组件反解，读取注入的组件数据
  
      if (this.el) {
        var firstCommentNode = this.el.firstChild;
  
        if (firstCommentNode && firstCommentNode.nodeType === 3) {
          firstCommentNode = firstCommentNode.nextSibling;
        }
  
        if (firstCommentNode && firstCommentNode.nodeType === 8) {
          var stumpMatch = firstCommentNode.data.match(/^\s*s-data:([\s\S]+)?$/);
  
          if (stumpMatch) {
            var stumpText = stumpMatch[1]; // fill component data
  
            options.data = new Function('return ' + stumpText.replace(/^[\s\n]*/, '').replace(/"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z"/g, function (match, y, mon, d, h, m, s) {
              return 'new Date(' + +y + ',' + +mon + ',' + +d + ',' + +h + ',' + +m + ',' + +s + ')';
            }))();
  
            if (firstCommentNode.previousSibling) {
              removeEl(firstCommentNode.previousSibling);
            }
  
            removeEl(firstCommentNode);
          }
        }
      } // #[end]
      // native事件数组
  
  
      this.nativeEvents = [];
  
      if (this.source) {
        // 组件运行时传入的结构，做slot解析
        this._initSourceSlots(1);
  
        for (var i = 0, l = this.source.events.length; i < l; i++) {
          var eventBind = this.source.events[i]; // 保存当前实例的native事件，下面创建aNode时候做合并
  
          if (eventBind.modifier.native) {
            this.nativeEvents.push(eventBind);
          } else {
            // #[begin] error
            warnEventListenMethod(eventBind, options.owner); // #[end]
  
            this.on(eventBind.name, getEventListener(eventBind, options.owner, this.scope, 1), eventBind);
          }
        }
  
        this.tagName = this.tagName || this.source.tagName;
        this.binds = this.source.hotspot.binds; // init s-bind data
  
        this._srcSbindData = nodeSBindInit(this.source.directives.bind, this.scope, this.owner);
      }
  
      this._toPhase('compiled'); // init data
  
  
      var initData = extend(typeof this.initData === 'function' && this.initData() || {}, options.data || this._srcSbindData);
  
      if (this.binds && this.scope) {
        for (var i = 0, l = this.binds.length; i < l; i++) {
          var bindInfo = this.binds[i];
          var value = evalExpr(bindInfo.expr, this.scope, this.owner);
  
          if (typeof value !== 'undefined') {
            // See: https://github.com/ecomfe/san/issues/191
            initData[bindInfo.name] = value;
          }
        }
      }
  
      this.data = new Data(initData);
      this.tagName = this.tagName || 'div'; // #[begin] allua
      // ie8- 不支持innerHTML输出自定义标签
  
      /* istanbul ignore if */
  
      if (ieOldThan9 && this.tagName.indexOf('-') > 0) {
        this.tagName = 'div';
      } // #[end]
      // #[begin] error
      // 在初始化 + 数据绑定后，开始数据校验
      // NOTE: 只在开发版本中进行属性校验
  
  
      var dataTypes = this.dataTypes || clazz.dataTypes;
  
      if (dataTypes) {
        var dataTypeChecker = createDataTypesChecker(dataTypes, this.subTag || this.name || clazz.name);
        this.data.setTypeChecker(dataTypeChecker);
        this.data.checkDataTypes();
      } // #[end]
  
  
      this.computedDeps = {};
  
      for (var expr in this.computed) {
        if (this.computed.hasOwnProperty(expr) && !this.computedDeps[expr]) {
          this._calcComputed(expr);
        }
      }
  
      this._initDataChanger();
  
      this._sbindData = nodeSBindInit(this.aNode.directives.bind, this.data, this);
  
      this._toPhase('inited'); // #[begin] reverse
  
  
      var hasRootNode = this.aNode.hotspot.hasRootNode || (this.getComponentType ? this.getComponentType(this.aNode, this.data) : this.components[this.aNode.tagName]);
      var reverseWalker = options.reverseWalker;
  
      if (this.el || reverseWalker) {
        if (hasRootNode) {
          reverseWalker = reverseWalker || new DOMChildrenWalker(this.el);
          this._rootNode = createReverseNode(this.aNode, this, this.data, this, reverseWalker);
          this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
        } else {
          if (reverseWalker) {
            var currentNode = reverseWalker.current;
  
            if (currentNode && currentNode.nodeType === 1) {
              this.el = currentNode;
              reverseWalker.goNext();
            }
          }
  
          reverseElementChildren(this, this.data, this);
        }
  
        this._toPhase('created');
  
        this._attached();
  
        this._toPhase('attached');
      } // #[end]
  
    }
    /**
     * 初始化创建组件外部传入的插槽对象
     *
     * @protected
     * @param {boolean} isFirstTime 是否初次对sourceSlots进行计算
     */
  
  
    Component.prototype._initSourceSlots = function (isFirstTime) {
      this.sourceSlots.named = {}; // 组件运行时传入的结构，做slot解析
  
      if (this.source && this.scope) {
        var sourceChildren = this.source.children;
  
        for (var i = 0, l = sourceChildren.length; i < l; i++) {
          var child = sourceChildren[i];
          var target;
          var slotBind = !child.textExpr && getANodeProp(child, 'slot');
  
          if (slotBind) {
            isFirstTime && this.sourceSlotNameProps.push(slotBind);
            var slotName = evalExpr(slotBind.expr, this.scope, this.owner);
            target = this.sourceSlots.named[slotName];
  
            if (!target) {
              target = this.sourceSlots.named[slotName] = [];
            }
  
            target.push(child);
          } else if (isFirstTime) {
            target = this.sourceSlots.noname;
  
            if (!target) {
              target = this.sourceSlots.noname = [];
            }
  
            target.push(child);
          }
        }
      }
    };
    /**
     * 类型标识
     *
     * @type {string}
     */
  
  
    Component.prototype.nodeType = 5;
    /**
     * 在下一个更新周期运行函数
     *
     * @param {Function} fn 要运行的函数
     */
  
    Component.prototype.nextTick = nextTick;
    Component.prototype._ctx = new Date().getTime().toString(16);
    /* eslint-disable operator-linebreak */
  
    /**
     * 使节点到达相应的生命周期
     *
     * @protected
     * @param {string} name 生命周期名称
     */
  
    Component.prototype._callHook = Component.prototype._toPhase = function (name) {
      if (!this.lifeCycle[name]) {
        this.lifeCycle = LifeCycle[name] || this.lifeCycle;
  
        if (typeof this[name] === 'function') {
          this[name]();
        }
  
        this._afterLife = this.lifeCycle; // 通知devtool
        // #[begin] devtool
  
        emitDevtool('comp-' + name, this); // #[end]
      }
    };
    /* eslint-enable operator-linebreak */
  
    /**
     * 添加事件监听器
     *
     * @param {string} name 事件名
     * @param {Function} listener 监听器
     * @param {string?} declaration 声明式
     */
  
  
    Component.prototype.on = function (name, listener, declaration) {
      if (typeof listener === 'function') {
        if (!this.listeners[name]) {
          this.listeners[name] = [];
        }
  
        this.listeners[name].push({
          fn: listener,
          declaration: declaration
        });
      }
    };
    /**
     * 移除事件监听器
     *
     * @param {string} name 事件名
     * @param {Function=} listener 监听器
     */
  
  
    Component.prototype.un = function (name, listener) {
      var nameListeners = this.listeners[name];
      var len = nameListeners && nameListeners.length;
  
      while (len--) {
        if (!listener || listener === nameListeners[len].fn) {
          nameListeners.splice(len, 1);
        }
      }
    };
    /**
     * 派发事件
     *
     * @param {string} name 事件名
     * @param {Object} event 事件对象
     */
  
  
    Component.prototype.fire = function (name, event) {
      var me = this;
      each(this.listeners[name], function (listener) {
        listener.fn.call(me, event);
      });
    };
    /**
     * 计算 computed 属性的值
     *
     * @private
     * @param {string} computedExpr computed表达式串
     */
  
  
    Component.prototype._calcComputed = function (computedExpr) {
      var computedDeps = this.computedDeps[computedExpr];
  
      if (!computedDeps) {
        computedDeps = this.computedDeps[computedExpr] = {};
      }
  
      var me = this;
      this.data.set(computedExpr, this.computed[computedExpr].call({
        data: {
          get: function (expr) {
            // #[begin] error
            if (!expr) {
              throw new Error('[SAN ERROR] call get method in computed need argument');
            } // #[end]
  
  
            if (!computedDeps[expr]) {
              computedDeps[expr] = 1;
  
              if (me.computed[expr] && !me.computedDeps[expr]) {
                me._calcComputed(expr);
              }
  
              me.watch(expr, function () {
                me._calcComputed(computedExpr);
              });
            }
  
            return me.data.get(expr);
          }
        }
      }));
    };
    /**
     * 派发消息
     * 组件可以派发消息，消息将沿着组件树向上传递，直到遇上第一个处理消息的组件
     *
     * @param {string} name 消息名称
     * @param {*?} value 消息值
     */
  
  
    Component.prototype.dispatch = function (name, value) {
      var parentComponent = this.parentComponent;
  
      while (parentComponent) {
        var receiver = parentComponent.messages[name] || parentComponent.messages['*'];
  
        if (typeof receiver === 'function') {
          receiver.call(parentComponent, {
            target: this,
            value: value,
            name: name
          });
          break;
        }
  
        parentComponent = parentComponent.parentComponent;
      }
    };
    /**
     * 获取组件内部的 slot
     *
     * @param {string=} name slot名称，空为default slot
     * @return {Array}
     */
  
  
    Component.prototype.slot = function (name) {
      var result = [];
      var me = this;
  
      function childrenTraversal(children) {
        each(children, function (child) {
          if (child.nodeType === 6 && child.owner === me) {
            if (child.isNamed && child.name === name || !child.isNamed && !name) {
              result.push(child);
            }
          } else {
            childrenTraversal(child.children);
          }
        });
      }
  
      childrenTraversal(this.children);
      return result;
    };
    /**
     * 获取带有 san-ref 指令的子组件引用
     *
     * @param {string} name 子组件的引用名
     * @return {Component}
     */
  
  
    Component.prototype.ref = function (name) {
      var refTarget;
      var owner = this;
  
      function childrenTraversal(children) {
        each(children, function (child) {
          elementTraversal(child);
          return !refTarget;
        });
      }
  
      function elementTraversal(element) {
        var nodeType = element.nodeType;
  
        if (nodeType === 1) {
          return;
        }
  
        if (element.owner === owner) {
          var ref;
  
          switch (element.nodeType) {
            case 4:
              ref = element.aNode.directives.ref;
  
              if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                refTarget = element.el;
              }
  
              break;
  
            case 5:
              ref = element.source.directives.ref;
  
              if (ref && evalExpr(ref.value, element.scope, owner) === name) {
                refTarget = element;
              }
  
          }
  
          !refTarget && childrenTraversal(element.slotChildren);
        }
  
        !refTarget && childrenTraversal(element.children);
      }
  
      childrenTraversal(this.children);
      return refTarget;
    };
    /**
     * 视图更新函数
     *
     * @param {Array?} changes 数据变化信息
     */
  
  
    Component.prototype._update = function (changes) {
      if (this.lifeCycle.disposed) {
        return;
      }
  
      var me = this;
      var needReloadForSlot = false;
  
      this._notifyNeedReload = function () {
        needReloadForSlot = true;
      };
  
      if (changes) {
        if (this.source) {
          this._srcSbindData = nodeSBindUpdate(this.source.directives.bind, this._srcSbindData, this.scope, this.owner, changes, function (name, value) {
            if (name in me.source.hotspot.props) {
              return;
            }
  
            me.data.set(name, value, {
              target: {
                node: me.owner
              }
            });
          });
        }
  
        each(changes, function (change) {
          var changeExpr = change.expr;
          each(me.binds, function (bindItem) {
            var relation;
            var setExpr = bindItem.name;
            var updateExpr = bindItem.expr;
  
            if (!isDataChangeByElement(change, me, setExpr) && (relation = changeExprCompare(changeExpr, updateExpr, me.scope))) {
              if (relation > 2) {
                setExpr = createAccessor([{
                  type: 1,
                  value: setExpr
                }].concat(changeExpr.paths.slice(updateExpr.paths.length)));
                updateExpr = changeExpr;
              }
  
              if (relation >= 2 && change.type === 2) {
                me.data.splice(setExpr, [change.index, change.deleteCount].concat(change.insertions), {
                  target: {
                    node: me.owner
                  }
                });
              } else {
                me.data.set(setExpr, evalExpr(updateExpr, me.scope, me.owner), {
                  target: {
                    node: me.owner
                  }
                });
              }
            }
          });
          each(me.sourceSlotNameProps, function (bindItem) {
            needReloadForSlot = needReloadForSlot || changeExprCompare(changeExpr, bindItem.expr, me.scope);
            return !needReloadForSlot;
          });
        });
  
        if (needReloadForSlot) {
          this._initSourceSlots();
  
          this._repaintChildren();
        } else {
          var slotChildrenLen = this.slotChildren.length;
  
          while (slotChildrenLen--) {
            var slotChild = this.slotChildren[slotChildrenLen];
  
            if (slotChild.lifeCycle.disposed) {
              this.slotChildren.splice(slotChildrenLen, 1);
            } else if (slotChild.isInserted) {
              slotChild._update(changes, 1);
            }
          }
        }
      }
  
      var dataChanges = this._dataChanges;
  
      if (dataChanges) {
        this._dataChanges = null;
        this._sbindData = nodeSBindUpdate(this.aNode.directives.bind, this._sbindData, this.data, this, dataChanges, function (name, value) {
          if (me._rootNode || name in me.aNode.hotspot.props) {
            return;
          }
  
          getPropHandler(me.tagName, name)(me.el, value, name, me);
        });
  
        if (this._rootNode) {
          this._rootNode._update(dataChanges);
  
          this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
        } else {
          var dynamicProps = this.aNode.hotspot.dynamicProps;
  
          for (var i = 0; i < dynamicProps.length; i++) {
            var prop = dynamicProps[i];
  
            for (var j = 0; j < dataChanges.length; j++) {
              var change = dataChanges[j];
  
              if (changeExprCompare(change.expr, prop.expr, this.data) || prop.hintExpr && changeExprCompare(change.expr, prop.hintExpr, this.data)) {
                prop.handler(this.el, evalExpr(prop.expr, this.data, this), prop.name, this);
                break;
              }
            }
          }
  
          for (var i = 0; i < this.children.length; i++) {
            this.children[i]._update(dataChanges);
          }
        }
  
        if (needReloadForSlot) {
          this._initSourceSlots();
  
          this._repaintChildren();
        }
  
        for (var i = 0; i < this.implicitChildren.length; i++) {
          this.implicitChildren[i]._update(dataChanges);
        }
  
        this._toPhase('updated');
  
        if (this.owner && this._updateBindxOwner(dataChanges)) {
          this.owner._update();
        }
      }
  
      this._notifyNeedReload = null;
    };
  
    Component.prototype._updateBindxOwner = function (dataChanges) {
      var me = this;
      var xbindUped;
      each(dataChanges, function (change) {
        each(me.binds, function (bindItem) {
          var changeExpr = change.expr;
  
          if (bindItem.x && !isDataChangeByElement(change, me.owner) && changeExprCompare(changeExpr, parseExpr(bindItem.name), me.data)) {
            var updateScopeExpr = bindItem.expr;
  
            if (changeExpr.paths.length > 1) {
              updateScopeExpr = createAccessor(bindItem.expr.paths.concat(changeExpr.paths.slice(1)));
            }
  
            xbindUped = 1;
            me.scope.set(updateScopeExpr, evalExpr(changeExpr, me.data, me), {
              target: {
                node: me,
                prop: bindItem.name
              }
            });
          }
        });
      });
      return xbindUped;
    };
    /**
     * 重新绘制组件的内容
     * 当 dynamic slot name 发生变更或 slot 匹配发生变化时，重新绘制
     * 在组件级别重绘有点粗暴，但是能保证视图结果正确性
     */
  
  
    Component.prototype._repaintChildren = function () {
      // TODO: repaint once?
      if (this._rootNode) {
        var parentEl = this._rootNode.el.parentNode;
        var beforeEl = this._rootNode.el.nextSibling;
  
        this._rootNode.dispose(0, 1);
  
        this.slotChildren = [];
        this._rootNode = createNode(this.aNode, this, this.data, this);
  
        this._rootNode.attach(parentEl, beforeEl);
  
        this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
      } else {
        elementDisposeChildren(this.children, 0, 1);
        this.children = [];
        this.slotChildren = [];
  
        for (var i = 0, l = this.aNode.children.length; i < l; i++) {
          var child = createNode(this.aNode.children[i], this, this.data, this);
          this.children.push(child);
          child.attach(this.el);
        }
      }
    };
    /**
     * 初始化组件内部监听数据变化
     *
     * @private
     * @param {Object} change 数据变化信息
     */
  
  
    Component.prototype._initDataChanger = function (change) {
      var me = this;
  
      this._dataChanger = function (change) {
        if (me._afterLife.created) {
          if (!me._dataChanges) {
            nextTick(me._update, me);
            me._dataChanges = [];
          }
  
          me._dataChanges.push(change);
        } else if (me.lifeCycle.inited && me.owner) {
          me._updateBindxOwner([change]);
        }
      };
  
      this.data.listen(this._dataChanger);
    };
    /**
     * 监听组件的数据变化
     *
     * @param {string} dataName 变化的数据项
     * @param {Function} listener 监听函数
     */
  
  
    Component.prototype.watch = function (dataName, listener) {
      var dataExpr = parseExpr(dataName);
      this.data.listen(bind(function (change) {
        if (changeExprCompare(change.expr, dataExpr, this.data)) {
          listener.call(this, evalExpr(dataExpr, this.data, this), change);
        }
      }, this));
    };
  
    Component.prototype._getElAsRootNode = function () {
      return this.el;
    };
    /**
     * 将组件attach到页面
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
  
  
    Component.prototype.attach = function (parentEl, beforeEl) {
      if (!this.lifeCycle.attached) {
        this._attach(parentEl, beforeEl); // element 都是内部创建的，只有动态创建的 component 才会进入这个分支
  
  
        if (this.owner && !this.parent) {
          this.owner.implicitChildren.push(this);
        }
      }
    };
  
    Component.prototype._attach = function (parentEl, beforeEl) {
      var hasRootNode = this.aNode.hotspot.hasRootNode || (this.getComponentType ? this.getComponentType(this.aNode, this.data) : this.components[this.aNode.tagName]);
  
      if (hasRootNode) {
        this._rootNode = this._rootNode || createNode(this.aNode, this, this.data, this);
  
        this._rootNode.attach(parentEl, beforeEl);
  
        this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
      } else {
        if (!this.el) {
          var sourceNode = this.aNode.hotspot.sourceNode;
          var props = this.aNode.props;
  
          if (sourceNode) {
            this.el = sourceNode.cloneNode(false);
            props = this.aNode.hotspot.dynamicProps;
          } else {
            this.el = createEl(this.tagName);
          }
  
          if (this._sbindData) {
            for (var key in this._sbindData) {
              if (this._sbindData.hasOwnProperty(key)) {
                getPropHandler(this.tagName, key)(this.el, this._sbindData[key], key, this);
              }
            }
          }
  
          for (var i = 0, l = props.length; i < l; i++) {
            var prop = props[i];
            var value = evalExpr(prop.expr, this.data, this);
  
            if (value || !baseProps[prop.name]) {
              prop.handler(this.el, value, prop.name, this);
            }
          }
  
          this._toPhase('created');
        }
  
        insertBefore(this.el, parentEl, beforeEl);
  
        if (!this._contentReady) {
          for (var i = 0, l = this.aNode.children.length; i < l; i++) {
            var childANode = this.aNode.children[i];
            var child = childANode.Clazz ? new childANode.Clazz(childANode, this, this.data, this) : createNode(childANode, this, this.data, this);
            this.children.push(child);
            child.attach(this.el);
          }
  
          this._contentReady = 1;
        }
  
        this._attached();
      }
  
      this._toPhase('attached');
    };
  
    Component.prototype.detach = elementOwnDetach;
    Component.prototype.dispose = elementOwnDispose;
    Component.prototype._onEl = elementOwnOnEl;
    Component.prototype._attached = elementOwnAttached;
  
    Component.prototype._leave = function () {
      if (this.leaveDispose) {
        if (!this.lifeCycle.disposed) {
          this.data.unlisten();
          this.dataChanger = null;
          this._dataChanges = null;
          var len = this.implicitChildren.length;
  
          while (len--) {
            this.implicitChildren[len].dispose(0, 1);
          }
  
          this.implicitChildren = null;
          this.source = null;
          this.sourceSlots = null;
          this.sourceSlotNameProps = null; // 这里不用挨个调用 dispose 了，因为 children 释放链会调用的
  
          this.slotChildren = null;
  
          if (this._rootNode) {
            // 如果没有parent，说明是一个root component，一定要从dom树中remove
            this._rootNode.dispose(this.disposeNoDetach && this.parent);
          } else {
            var len = this.children.length;
  
            while (len--) {
              this.children[len].dispose(1, 1);
            }
  
            len = this._elFns.length;
  
            while (len--) {
              var fn = this._elFns[len];
              un(this.el, fn[0], fn[1], fn[2]);
            }
  
            this._elFns = null; // #[begin] allua
  
            /* istanbul ignore if */
  
            if (this._inputTimer) {
              clearInterval(this._inputTimer);
              this._inputTimer = null;
            } // #[end]
            // 如果没有parent，说明是一个root component，一定要从dom树中remove
  
  
            if (!this.disposeNoDetach || !this.parent) {
              removeEl(this.el);
            }
          }
  
          this._toPhase('detached');
  
          this._rootNode = null;
          this.el = null;
          this.owner = null;
          this.scope = null;
          this.children = null;
  
          this._toPhase('disposed');
  
          if (this._ondisposed) {
            this._ondisposed();
          }
        }
      } else if (this.lifeCycle.attached) {
        if (this._rootNode) {
          if (this._rootNode.detach) {
            this._rootNode.detach();
          } else {
            this._rootNode.dispose();
  
            this._rootNode = null;
          }
        } else {
          removeEl(this.el);
        }
  
        this._toPhase('detached');
      }
    }; // exports = module.exports = Component;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 创建组件类
     */
    // var Component = require('./component');
    // var inherits = require('../util/inherits');
  
    /**
     * 创建组件类
     *
     * @param {Object} proto 组件类的方法表
     * @param {Function=} SuperComponent 父组件类
     * @return {Function}
     */
  
  
    function defineComponent(proto, SuperComponent) {
      // 如果传入一个不是 san component 的 constructor，直接返回不是组件构造函数
      // 这种场景导致的错误 san 不予考虑
      if (typeof proto === 'function') {
        return proto;
      } // #[begin] error
  
  
      if (typeof proto !== 'object') {
        throw new Error('[SAN FATAL] defineComponent need a plain object.');
      } // #[end]
  
  
      function ComponentClass(option) {
        // eslint-disable-line
        Component.call(this, option);
      }
  
      ComponentClass.prototype = proto;
      inherits(ComponentClass, SuperComponent || Component);
      return ComponentClass;
    } // exports = module.exports = defineComponent;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 组件Loader类
     */
    // var nextTick = require('../util/next-tick');
    // var each = require('../util/each');
  
    /**
     * 组件Loader类
     *
     * @class
     *
     * @param {Function} load load方法
     * @param {Function=} placeholder loading过程中渲染的组件
     * @param {Function=} fallback load失败时渲染的组件
     */
  
  
    function ComponentLoader(load, placeholder, fallback) {
      this.load = load;
      this.placeholder = placeholder;
      this.fallback = fallback;
      this.listeners = [];
    }
    /**
     * 开始加载组件
     *
     * @param {Function} onload 组件加载完成监听函数
     */
  
  
    ComponentLoader.prototype.start = function (onload) {
      var me = this;
  
      switch (this.state) {
        case 2:
          nextTick(function () {
            onload(me.Component);
          });
          break;
  
        case 1:
          this.listeners.push(onload);
          break;
  
        default:
          this.listeners.push(onload);
          this.state = 1;
          var startLoad = this.load();
  
          var done = function (RealComponent) {
            me.done(RealComponent);
          };
  
          if (startLoad && typeof startLoad.then === 'function') {
            startLoad.then(done, done);
          }
  
      }
    };
    /**
     * 完成组件加载
     *
     * @param {Function=} ComponentClass 组件类
     */
  
  
    ComponentLoader.prototype.done = function (ComponentClass) {
      this.state = 2;
      ComponentClass = ComponentClass || this.fallback;
      this.Component = ComponentClass;
      each(this.listeners, function (listener) {
        listener(ComponentClass);
      });
    }; // exports = module.exports = ComponentLoader;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 编译组件类
     */
    // var warn = require('../util/warn');
    // var parseTemplate = require('../parser/parse-template');
    // var parseText = require('../parser/parse-text');
    // var defineComponent = require('./define-component');
    // var ComponentLoader = require('./component-loader');
  
    /**
     * 编译组件类。预解析template和components
     *
     * @param {Function} ComponentClass 组件类
     */
  
  
    function compileComponent(ComponentClass) {
      var proto = ComponentClass.prototype; // pre define components class
  
      /* istanbul ignore else  */
  
      if (!proto.hasOwnProperty('_cmptReady')) {
        proto.components = ComponentClass.components || proto.components || {};
        var components = proto.components;
  
        for (var key in components) {
          // eslint-disable-line
          var componentClass = components[key];
  
          if (typeof componentClass === 'object' && !(componentClass instanceof ComponentLoader)) {
            components[key] = defineComponent(componentClass);
          } else if (componentClass === 'self') {
            components[key] = ComponentClass;
          }
        }
  
        proto._cmptReady = 1;
      } // pre compile template
  
      /* istanbul ignore else  */
  
  
      if (!proto.hasOwnProperty('aNode')) {
        var aNode = parseTemplate(ComponentClass.template || proto.template, {
          trimWhitespace: proto.trimWhitespace || ComponentClass.trimWhitespace,
          delimiters: proto.delimiters || ComponentClass.delimiters
        });
        var firstChild = aNode.children[0];
  
        if (firstChild && firstChild.textExpr) {
          firstChild = null;
        } // #[begin] error
  
  
        if (aNode.children.length !== 1 || !firstChild) {
          warn('Component template must have a root element.');
        } // #[end]
  
  
        proto.aNode = firstChild = firstChild || {
          directives: {},
          props: [],
          events: [],
          children: []
        };
  
        if (firstChild.tagName === 'template') {
          firstChild.tagName = null;
        }
  
        if (proto.autoFillStyleAndId !== false && ComponentClass.autoFillStyleAndId !== false) {
          var toExtraProp = {
            'class': 0,
            style: 0,
            id: 0
          };
          var len = firstChild.props.length;
  
          while (len--) {
            var prop = firstChild.props[len];
  
            if (toExtraProp[prop.name] != null) {
              toExtraProp[prop.name] = prop;
              firstChild.props.splice(len, 1);
            }
          }
  
          toExtraProp.id = toExtraProp.id || {
            name: 'id',
            expr: parseExpr('id'),
            raw: 'id'
          };
  
          if (toExtraProp['class']) {
            var classExpr = parseText('{{class | _xclass}}').segs[0];
            classExpr.filters[0].args.push(toExtraProp['class'].expr);
            toExtraProp['class'].expr = classExpr;
          } else {
            toExtraProp['class'] = {
              name: 'class',
              expr: parseText('{{class | _class}}'),
              raw: '{{class | _class}}'
            };
          }
  
          if (toExtraProp.style) {
            var styleExpr = parseText('{{style | _xstyle}}').segs[0];
            styleExpr.filters[0].args.push(toExtraProp.style.expr);
            toExtraProp.style.expr = styleExpr;
          } else {
            toExtraProp.style = {
              name: 'style',
              expr: parseText('{{style | _style}}'),
              raw: '{{style | _style}}'
            };
          }
  
          firstChild.props.push(toExtraProp['class'], // eslint-disable-line dot-notation
          toExtraProp.style, toExtraProp.id);
        }
      }
    } // exports = module.exports = compileComponent;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 常用标签表，用于 element 创建优化
     */
    // var splitStr2Obj = require('../util/split-str-2-obj');
  
    /**
     * 常用标签表
     *
     * @type {Object}
     */
  
  
    var hotTags = splitStr2Obj('div,span,img,ul,ol,li,dl,dt,dd,a,b,u,hr,' + 'form,input,textarea,button,label,select,option,' + 'table,tbody,th,tr,td,thead,main,aside,header,footer,nav'); // exports = module.exports = hotTags;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 判断是否结束桩
     */
    // #[begin] reverse
  
    /**
     * 判断是否结束桩
     *
     * @param {HTMLElement|HTMLComment} target 要判断的元素
     * @param {string} type 桩类型
     * @return {boolean}
     */
  
    function isEndStump(target, type) {
      return target.nodeType === 8 && target.data === '/s-' + type;
    } // #[end]
    // exports = module.exports = isEndStump;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file text 节点类
     */
    // var isBrowser = require('../browser/is-browser');
    // var removeEl = require('../browser/remove-el');
    // var insertBefore = require('../browser/insert-before');
    // var changeExprCompare = require('../runtime/change-expr-compare');
    // var evalExpr = require('../runtime/eval-expr');
    // var NodeType = require('./node-type');
    // var warnSetHTML = require('./warn-set-html');
    // var isEndStump = require('./is-end-stump');
    // var getNodePath = require('./get-node-path');
  
    /**
     * text 节点类
     *
     * @class
     * @param {Object} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
     */
  
  
    function TextNode(aNode, parent, scope, owner, reverseWalker) {
      this.aNode = aNode;
      this.owner = owner;
      this.scope = scope;
      this.parent = parent; // #[begin] reverse
  
      if (reverseWalker) {
        var currentNode = reverseWalker.current;
  
        if (currentNode) {
          switch (currentNode.nodeType) {
            case 8:
              if (currentNode.data === 's-text') {
                this.sel = currentNode;
                currentNode.data = this.id;
                reverseWalker.goNext();
  
                while (1) {
                  // eslint-disable-line
                  currentNode = reverseWalker.current;
                  /* istanbul ignore if */
  
                  if (!currentNode) {
                    throw new Error('[SAN REVERSE ERROR] Text end flag not found. \nPaths: ' + getNodePath(this).join(' > '));
                  }
  
                  if (isEndStump(currentNode, 'text')) {
                    this.el = currentNode;
                    reverseWalker.goNext();
                    currentNode.data = this.id;
                    break;
                  }
  
                  reverseWalker.goNext();
                }
              }
  
              break;
  
            case 3:
              reverseWalker.goNext();
  
              if (!this.aNode.textExpr.original) {
                this.el = currentNode;
              }
  
              break;
          }
        } else {
          this.el = document.createTextNode('');
          insertBefore(this.el, reverseWalker.target, reverseWalker.current);
        }
      } // #[end]
  
    }
  
    TextNode.prototype.nodeType = 1;
    /**
     * 将text attach到页面
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
  
    TextNode.prototype.attach = function (parentEl, beforeEl) {
      this.content = evalExpr(this.aNode.textExpr, this.scope, this.owner);
  
      if (this.aNode.textExpr.original) {
        this.sel = document.createComment(this.id);
        insertBefore(this.sel, parentEl, beforeEl);
        this.el = document.createComment(this.id);
        insertBefore(this.el, parentEl, beforeEl);
        var tempFlag = document.createElement('script');
        parentEl.insertBefore(tempFlag, this.el);
        tempFlag.insertAdjacentHTML('beforebegin', this.content);
        parentEl.removeChild(tempFlag);
      } else {
        this.el = document.createTextNode(this.content);
        insertBefore(this.el, parentEl, beforeEl);
      }
    };
    /**
     * 销毁 text 节点
     *
     * @param {boolean=} noDetach 是否不要把节点从dom移除
     */
  
  
    TextNode.prototype.dispose = function (noDetach) {
      if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
      }
  
      this.el = null;
      this.sel = null;
    };
  
    var textUpdateProp = isBrowser && (typeof document.createTextNode('').textContent === 'string' ? 'textContent' : 'data');
    /**
     * 更新 text 节点的视图
     *
     * @param {Array} changes 数据变化信息
     */
  
    TextNode.prototype._update = function (changes) {
      if (this.aNode.textExpr.value) {
        return;
      }
  
      var len = changes.length;
  
      while (len--) {
        if (changeExprCompare(changes[len].expr, this.aNode.textExpr, this.scope)) {
          var text = evalExpr(this.aNode.textExpr, this.scope, this.owner);
  
          if (text !== this.content) {
            this.content = text;
  
            if (this.aNode.textExpr.original) {
              var startRemoveEl = this.sel.nextSibling;
              var parentEl = this.el.parentNode;
  
              while (startRemoveEl !== this.el) {
                var removeTarget = startRemoveEl;
                startRemoveEl = startRemoveEl.nextSibling;
                removeEl(removeTarget);
              } // #[begin] error
  
  
              warnSetHTML(parentEl); // #[end]
  
              var tempFlag = document.createElement('script');
              parentEl.insertBefore(tempFlag, this.el);
              tempFlag.insertAdjacentHTML('beforebegin', text);
              parentEl.removeChild(tempFlag);
            } else {
              this.el[textUpdateProp] = text;
            }
          }
  
          return;
        }
      }
    }; // exports = module.exports = TextNode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 将没有 root 只有 children 的元素 attach 到页面
     */
    // var insertBefore = require('../browser/insert-before');
    // var LifeCycle = require('./life-cycle');
    // var createNode = require('./create-node');
  
    /**
     * 将没有 root 只有 children 的元素 attach 到页面
     * 主要用于 slot 和 template
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
  
  
    function nodeOwnOnlyChildrenAttach(parentEl, beforeEl) {
      this.sel = document.createComment(this.id);
      insertBefore(this.sel, parentEl, beforeEl);
  
      for (var i = 0; i < this.aNode.children.length; i++) {
        var child = createNode(this.aNode.children[i], this, this.childScope || this.scope, this.childOwner || this.owner);
        this.children.push(child);
        child.attach(parentEl, beforeEl);
      }
  
      this.el = document.createComment(this.id);
      insertBefore(this.el, parentEl, beforeEl);
      this.lifeCycle = LifeCycle.attached;
    } // exports = module.exports = nodeOwnOnlyChildrenAttach;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file slot 节点类
     */
    // var each = require('../util/each');
    // var guid = require('../util/guid');
    // var extend = require('../util/extend');
    // var ExprType = require('../parser/expr-type');
    // var createAccessor = require('../parser/create-accessor');
    // var evalExpr = require('../runtime/eval-expr');
    // var Data = require('../runtime/data');
    // var DataChangeType = require('../runtime/data-change-type');
    // var changeExprCompare = require('../runtime/change-expr-compare');
    // var insertBefore = require('../browser/insert-before');
    // var removeEl = require('../browser/remove-el');
    // var NodeType = require('./node-type');
    // var LifeCycle = require('./life-cycle');
    // var getANodeProp = require('./get-a-node-prop');
    // var nodeSBindInit = require('./node-s-bind-init');
    // var nodeSBindUpdate = require('./node-s-bind-update');
    // var createReverseNode = require('./create-reverse-node');
    // var elementDisposeChildren = require('./element-dispose-children');
    // var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');
  
    /**
     * slot 节点类
     *
     * @class
     * @param {Object} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
     */
  
  
    function SlotNode(aNode, parent, scope, owner, reverseWalker) {
      this.owner = owner;
      this.scope = scope;
      this.parent = parent;
      this.parentComponent = parent.nodeType === 5 ? parent : parent.parentComponent;
      this.id = guid++;
      this.lifeCycle = LifeCycle.start;
      this.children = []; // calc slot name
  
      this.nameBind = getANodeProp(aNode, 'name');
  
      if (this.nameBind) {
        this.isNamed = true;
        this.name = evalExpr(this.nameBind.expr, this.scope, this.owner);
      } // calc aNode children
  
  
      var sourceSlots = owner.sourceSlots;
      var matchedSlots;
  
      if (sourceSlots) {
        matchedSlots = this.isNamed ? sourceSlots.named[this.name] : sourceSlots.noname;
      }
  
      if (matchedSlots) {
        this.isInserted = true;
      }
  
      this.aNode = {
        directives: aNode.directives,
        props: [],
        events: [],
        children: matchedSlots || aNode.children.slice(0),
        vars: aNode.vars
      };
      this._sbindData = nodeSBindInit(aNode.directives.bind, this.scope, this.owner); // calc scoped slot vars
  
      var initData;
  
      if (this._sbindData) {
        initData = extend({}, this._sbindData);
      }
  
      if (aNode.vars) {
        initData = initData || {};
        each(aNode.vars, function (varItem) {
          initData[varItem.name] = evalExpr(varItem.expr, scope, owner);
        });
      } // child owner & child scope
  
  
      if (this.isInserted) {
        this.childOwner = owner.owner;
        this.childScope = owner.scope;
      }
  
      if (initData) {
        this.isScoped = true;
        this.childScope = new Data(initData, this.childScope || this.scope);
      }
  
      owner.slotChildren.push(this); // #[begin] reverse
  
      if (reverseWalker) {
        var hasFlagComment; // start flag
  
        if (reverseWalker.current && reverseWalker.current.nodeType === 8) {
          this.sel = reverseWalker.current;
          hasFlagComment = 1;
          reverseWalker.goNext();
        } else {
          this.sel = document.createComment(this.id);
          reverseWalker.current ? reverseWalker.target.insertBefore(this.sel, reverseWalker.current) : reverseWalker.target.appendChild(this.sel);
        }
  
        var aNodeChildren = this.aNode.children;
  
        for (var i = 0, l = aNodeChildren.length; i < l; i++) {
          this.children.push(createReverseNode(aNodeChildren[i], this, this.childScope || this.scope, this.childOwner || this.owner, reverseWalker));
        } // end flag
  
  
        if (hasFlagComment) {
          this.el = reverseWalker.current;
          reverseWalker.goNext();
        } else {
          this.el = document.createComment(this.id);
          reverseWalker.current ? reverseWalker.target.insertBefore(this.el, reverseWalker.current) : reverseWalker.target.appendChild(this.el);
        }
  
        this.lifeCycle = LifeCycle.attached;
      } // #[end]
  
    }
  
    SlotNode.prototype.nodeType = 6;
    /**
     * 销毁释放 slot
     *
     * @param {boolean=} noDetach 是否不要把节点从dom移除
     * @param {boolean=} noTransition 是否不显示过渡动画效果
     */
  
    SlotNode.prototype.dispose = function (noDetach, noTransition) {
      this.childOwner = null;
      this.childScope = null;
      elementDisposeChildren(this.children, noDetach, noTransition);
  
      if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
      }
  
      this.sel = null;
      this.el = null;
      this.owner = null;
      this.scope = null;
      this.children = null;
      this.lifeCycle = LifeCycle.disposed;
  
      if (this._ondisposed) {
        this._ondisposed();
      }
    };
  
    SlotNode.prototype.attach = nodeOwnOnlyChildrenAttach;
    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     * @param {boolean=} isFromOuter 变化信息是否来源于父组件之外的组件
     * @return {boolean}
     */
  
    SlotNode.prototype._update = function (changes, isFromOuter) {
      var me = this;
  
      if (this.nameBind && evalExpr(this.nameBind.expr, this.scope, this.owner) !== this.name) {
        this.owner._notifyNeedReload();
  
        return false;
      }
  
      if (isFromOuter) {
        if (this.isInserted) {
          for (var i = 0; i < this.children.length; i++) {
            this.children[i]._update(changes);
          }
        }
      } else {
        if (this.isScoped) {
          var varKeys = {};
          each(this.aNode.vars, function (varItem) {
            varKeys[varItem.name] = 1;
            me.childScope.set(varItem.name, evalExpr(varItem.expr, me.scope, me.owner));
          });
          var scopedChanges = [];
          this._sbindData = nodeSBindUpdate(this.aNode.directives.bind, this._sbindData, this.scope, this.owner, changes, function (name, value) {
            if (varKeys[name]) {
              return;
            }
  
            me.childScope.set(name, value);
            scopedChanges.push({
              type: 1,
              expr: createAccessor([{
                type: 1,
                value: name
              }]),
              value: value,
              option: {}
            });
          });
          each(changes, function (change) {
            if (!me.isInserted) {
              scopedChanges.push(change);
            }
  
            each(me.aNode.vars, function (varItem) {
              var name = varItem.name;
              var relation = changeExprCompare(change.expr, varItem.expr, me.scope);
  
              if (relation < 1) {
                return;
              }
  
              if (change.type !== 2) {
                scopedChanges.push({
                  type: 1,
                  expr: createAccessor([{
                    type: 1,
                    value: name
                  }]),
                  value: me.childScope.get(name),
                  option: change.option
                });
              } else if (relation === 2) {
                scopedChanges.push({
                  expr: createAccessor([{
                    type: 1,
                    value: name
                  }]),
                  type: 2,
                  index: change.index,
                  deleteCount: change.deleteCount,
                  value: change.value,
                  insertions: change.insertions,
                  option: change.option
                });
              }
            });
          });
  
          for (var i = 0; i < this.children.length; i++) {
            this.children[i]._update(scopedChanges);
          }
        } else if (!this.isInserted) {
          for (var i = 0; i < this.children.length; i++) {
            this.children[i]._update(changes);
          }
        }
      }
    }; // exports = module.exports = SlotNode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file for 指令节点类
     */
    // var inherits = require('../util/inherits');
    // var each = require('../util/each');
    // var guid = require('../util/guid');
    // var ExprType = require('../parser/expr-type');
    // var parseExpr = require('../parser/parse-expr');
    // var createAccessor = require('../parser/create-accessor');
    // var Data = require('../runtime/data');
    // var DataChangeType = require('../runtime/data-change-type');
    // var changeExprCompare = require('../runtime/change-expr-compare');
    // var evalExpr = require('../runtime/eval-expr');
    // var changesIsInDataRef = require('../runtime/changes-is-in-data-ref');
    // var insertBefore = require('../browser/insert-before');
    // var NodeType = require('./node-type');
    // var createNode = require('./create-node');
    // var createReverseNode = require('./create-reverse-node');
    // var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
    // var nodeOwnCreateStump = require('./node-own-create-stump');
  
    /**
     * 循环项的数据容器类
     *
     * @inner
     * @class
     * @param {Object} forElement for元素对象
     * @param {*} item 当前项的数据
     * @param {number} index 当前项的索引
     */
  
  
    function ForItemData(forElement, item, index) {
      this.parent = forElement.scope;
      this.raw = {};
      this.listeners = [];
      this.directive = forElement.aNode.directives['for']; // eslint-disable-line dot-notation
  
      this.indexName = this.directive.index || '$index';
      this.raw[this.directive.item] = item;
      this.raw[this.indexName] = index;
    }
    /**
     * 将数据操作的表达式，转换成为对parent数据操作的表达式
     * 主要是对item和index进行处理
     *
     * @param {Object} expr 表达式
     * @return {Object}
     */
  
  
    ForItemData.prototype.exprResolve = function (expr) {
      var me = this;
      var directive = this.directive;
  
      function resolveItem(expr) {
        if (expr.type === 4 && expr.paths[0].value === directive.item) {
          return createAccessor(directive.value.paths.concat({
            type: 2,
            value: me.raw[me.indexName]
          }, expr.paths.slice(1)));
        }
  
        return expr;
      }
  
      expr = resolveItem(expr);
      var resolvedPaths = [];
      each(expr.paths, function (item) {
        resolvedPaths.push(item.type === 4 && item.paths[0].value === me.indexName ? {
          type: 2,
          value: me.raw[me.indexName]
        } : resolveItem(item));
      });
      return createAccessor(resolvedPaths);
    }; // 代理数据操作方法
  
  
    inherits(ForItemData, Data);
    each(['set', 'remove', 'unshift', 'shift', 'push', 'pop', 'splice'], function (method) {
      ForItemData.prototype['_' + method] = Data.prototype[method];
  
      ForItemData.prototype[method] = function (expr) {
        expr = this.exprResolve(parseExpr(expr));
        this.parent[method].apply(this.parent, [expr].concat(Array.prototype.slice.call(arguments, 1)));
      };
    });
    /**
     * for 指令节点类
     *
     * @class
     * @param {Object} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
     */
  
    function ForNode(aNode, parent, scope, owner, reverseWalker) {
      this.aNode = aNode;
      this.owner = owner;
      this.scope = scope;
      this.parent = parent;
      this.parentComponent = parent.nodeType === 5 ? parent : parent.parentComponent;
      this.id = guid++;
      this.children = [];
      this.param = aNode.directives['for']; // eslint-disable-line dot-notation
  
      this.itemPaths = [{
        type: 1,
        value: this.param.item
      }];
      this.itemExpr = {
        type: 4,
        paths: this.itemPaths,
        raw: this.param.item
      };
  
      if (this.param.index) {
        this.indexExpr = createAccessor([{
          type: 1,
          value: '' + this.param.index
        }]);
      } // #[begin] reverse
  
  
      if (reverseWalker) {
        this.listData = evalExpr(this.param.value, this.scope, this.owner);
  
        if (this.listData instanceof Array) {
          for (var i = 0; i < this.listData.length; i++) {
            this.children.push(createReverseNode(this.aNode.forRinsed, this, new ForItemData(this, this.listData[i], i), this.owner, reverseWalker));
          }
        } else if (this.listData && typeof this.listData === 'object') {
          for (var i in this.listData) {
            if (this.listData.hasOwnProperty(i) && this.listData[i] != null) {
              this.children.push(createReverseNode(this.aNode.forRinsed, this, new ForItemData(this, this.listData[i], i), this.owner, reverseWalker));
            }
          }
        }
  
        this._create();
  
        insertBefore(this.el, reverseWalker.target, reverseWalker.current);
      } // #[end]
  
    }
  
    ForNode.prototype.nodeType = 3;
    ForNode.prototype._create = nodeOwnCreateStump;
    ForNode.prototype.dispose = nodeOwnSimpleDispose;
    /**
     * 将元素attach到页面的行为
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
  
    ForNode.prototype.attach = function (parentEl, beforeEl) {
      this._create();
  
      insertBefore(this.el, parentEl, beforeEl);
      this.listData = evalExpr(this.param.value, this.scope, this.owner);
  
      this._createChildren();
    };
    /**
     * 创建子元素
     */
  
  
    ForNode.prototype._createChildren = function () {
      var parentEl = this.el.parentNode;
      var listData = this.listData;
  
      if (listData instanceof Array) {
        for (var i = 0; i < listData.length; i++) {
          var childANode = this.aNode.forRinsed;
          var child = childANode.Clazz ? new childANode.Clazz(childANode, this, new ForItemData(this, listData[i], i), this.owner) : createNode(childANode, this, new ForItemData(this, listData[i], i), this.owner);
          this.children.push(child);
          child.attach(parentEl, this.el);
        }
      } else if (listData && typeof listData === 'object') {
        for (var i in listData) {
          if (listData.hasOwnProperty(i) && listData[i] != null) {
            var childANode = this.aNode.forRinsed;
            var child = childANode.Clazz ? new childANode.Clazz(childANode, this, new ForItemData(this, listData[i], i), this.owner) : createNode(childANode, this, new ForItemData(this, listData[i], i), this.owner);
            this.children.push(child);
            child.attach(parentEl, this.el);
          }
        }
      }
    };
    /* eslint-disable fecs-max-statements */
  
    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
  
  
    ForNode.prototype._update = function (changes) {
      var listData = evalExpr(this.param.value, this.scope, this.owner);
      var oldIsArr = this.listData instanceof Array;
      var newIsArr = listData instanceof Array;
  
      if (this.children.length) {
        if (!listData || newIsArr && listData.length === 0) {
          this._disposeChildren();
  
          this.listData = listData;
        } else if (oldIsArr !== newIsArr || !newIsArr) {
          // 就是这么暴力
          // 不推荐使用for遍历object，用的话自己负责
          this.listData = listData;
          var isListChanged;
  
          for (var cIndex = 0; !isListChanged && cIndex < changes.length; cIndex++) {
            isListChanged = changeExprCompare(changes[cIndex].expr, this.param.value, this.scope);
          }
  
          var dataHotspot = this.aNode.hotspot.data;
  
          if (isListChanged || dataHotspot && changesIsInDataRef(changes, dataHotspot)) {
            var me = this;
  
            this._disposeChildren(null, function () {
              me._createChildren();
            });
          }
        } else {
          this._updateArray(changes, listData);
  
          this.listData = listData;
        }
      } else {
        this.listData = listData;
  
        this._createChildren();
      }
    };
    /**
     * 销毁释放子元素
     *
     * @param {Array?} children 要销毁的子元素，默认为自身的children
     * @param {Function} callback 释放完成的回调函数
     */
  
  
    ForNode.prototype._disposeChildren = function (children, callback) {
      var parentEl = this.el.parentNode;
      var parentFirstChild = parentEl.firstChild;
      var parentLastChild = parentEl.lastChild;
      var len = this.children.length;
      var violentClear = !this.aNode.directives.transition && !children // 是否 parent 的唯一 child
      && len && parentFirstChild === this.children[0].el && parentLastChild === this.el;
  
      if (!children) {
        children = this.children;
        this.children = [];
      }
  
      var disposedChildCount = 0;
      len = children.length; // 调用入口处已保证此处必有需要被删除的 child
  
      for (var i = 0; i < len; i++) {
        var disposeChild = children[i];
  
        if (violentClear) {
          disposeChild && disposeChild.dispose(violentClear, violentClear);
        } else if (disposeChild) {
          disposeChild._ondisposed = childDisposed;
          disposeChild.dispose();
        } else {
          childDisposed();
        }
      }
  
      if (violentClear) {
        // #[begin] allua
  
        /* istanbul ignore next */
        if (ie) {
          parentEl.innerHTML = '';
        } else {
          // #[end]
          parentEl.textContent = ''; // #[begin] allua
        } // #[end]
  
  
        this.el = document.createComment(this.id);
        parentEl.appendChild(this.el);
        callback && callback();
      }
  
      function childDisposed() {
        disposedChildCount++;
  
        if (disposedChildCount >= len) {
          callback && callback();
        }
      }
    };
  
    ForNode.prototype.opti = typeof navigator !== 'undefined' && /chrome\/[0-9]+/i.test(navigator.userAgent);
    /**
     * 数组类型的视图更新
     *
     * @param {Array} changes 数据变化信息
     * @param {Array} newList 新数组数据
     */
  
    ForNode.prototype._updateArray = function (changes, newList) {
      var oldChildrenLen = this.children.length;
      var childrenChanges = new Array(oldChildrenLen);
  
      function pushToChildrenChanges(change) {
        for (var i = 0, l = childrenChanges.length; i < l; i++) {
          (childrenChanges[i] = childrenChanges[i] || []).push(change);
        }
  
        childrenNeedUpdate = null;
        isOnlyDispose = false;
      }
  
      var disposeChildren = []; // 控制列表是否整体更新的变量
  
      var isChildrenRebuild; //
  
      var isOnlyDispose = true;
      var childrenNeedUpdate = {};
      var newLen = newList.length;
      var getItemKey = this.aNode.hotspot.getForKey;
      /* eslint-disable no-redeclare */
  
      for (var cIndex = 0; cIndex < changes.length; cIndex++) {
        var change = changes[cIndex];
        var relation = changeExprCompare(change.expr, this.param.value, this.scope);
  
        if (!relation) {
          // 无关时，直接传递给子元素更新，列表本身不需要动
          pushToChildrenChanges(change);
        } else {
          if (relation > 2) {
            // 变更表达式是list绑定表达式的子项
            // 只需要对相应的子项进行更新
            var changePaths = change.expr.paths;
            var forLen = this.param.value.paths.length;
            var changeIndex = +evalExpr(changePaths[forLen], this.scope, this.owner);
  
            if (isNaN(changeIndex)) {
              pushToChildrenChanges(change);
            } else if (!isChildrenRebuild) {
              isOnlyDispose = false;
              childrenNeedUpdate && (childrenNeedUpdate[changeIndex] = 1);
              childrenChanges[changeIndex] = childrenChanges[changeIndex] || [];
  
              if (this.param.index) {
                childrenChanges[changeIndex].push(change);
              }
  
              change = change.type === 1 ? {
                type: change.type,
                expr: createAccessor(this.itemPaths.concat(changePaths.slice(forLen + 1))),
                value: change.value,
                option: change.option
              } : {
                index: change.index,
                deleteCount: change.deleteCount,
                insertions: change.insertions,
                type: change.type,
                expr: createAccessor(this.itemPaths.concat(changePaths.slice(forLen + 1))),
                value: change.value,
                option: change.option
              };
              childrenChanges[changeIndex].push(change);
  
              if (change.type === 1) {
                if (this.children[changeIndex]) {
                  this.children[changeIndex].scope._set(change.expr, change.value, {
                    silent: 1
                  });
                } else {
                  // 设置数组项的索引可能超出数组长度，此时需要新增
                  // 比如当前数组只有2项，但是set list[4]
                  this.children[changeIndex] = 0;
                }
              } else if (this.children[changeIndex]) {
                this.children[changeIndex].scope._splice(change.expr, [].concat(change.index, change.deleteCount, change.insertions), {
                  silent: 1
                });
              }
            }
          } else if (isChildrenRebuild) {
            continue;
          } else if (relation === 2 && change.type === 2 && (this.owner.updateMode !== 'optimized' || !this.opti || this.aNode.directives.transition)) {
            childrenNeedUpdate = null; // 变更表达式是list绑定表达式本身数组的splice操作
            // 此时需要删除部分项，创建部分项
  
            var changeStart = change.index;
            var deleteCount = change.deleteCount;
            var insertionsLen = change.insertions.length;
            var newCount = insertionsLen - deleteCount;
  
            if (newCount) {
              var indexChange = this.param.index ? {
                type: 1,
                option: change.option,
                expr: this.indexExpr
              } : null;
  
              for (var i = changeStart + deleteCount; i < this.children.length; i++) {
                if (indexChange) {
                  isOnlyDispose = false;
                  (childrenChanges[i] = childrenChanges[i] || []).push(indexChange);
                }
  
                var child = this.children[i];
  
                if (child) {
                  child.scope.raw[child.scope.indexName] = i - deleteCount + insertionsLen;
                }
              }
            }
  
            var deleteLen = deleteCount;
  
            while (deleteLen--) {
              if (deleteLen < insertionsLen) {
                isOnlyDispose = false;
                var i = changeStart + deleteLen; // update
  
                (childrenChanges[i] = childrenChanges[i] || []).push({
                  type: 1,
                  option: change.option,
                  expr: this.itemExpr,
                  value: change.insertions[deleteLen]
                });
  
                if (this.children[i]) {
                  this.children[i].scope.raw[this.param.item] = change.insertions[deleteLen];
                }
              }
            }
  
            if (newCount < 0) {
              disposeChildren = disposeChildren.concat(this.children.splice(changeStart + insertionsLen, -newCount));
              childrenChanges.splice(changeStart + insertionsLen, -newCount);
            } else if (newCount > 0) {
              isOnlyDispose = false;
              var spliceArgs = [changeStart + deleteCount, 0].concat(new Array(newCount));
              this.children.splice.apply(this.children, spliceArgs);
              childrenChanges.splice.apply(childrenChanges, spliceArgs);
            }
          } else {
            childrenNeedUpdate = null;
            isOnlyDispose = false;
            isChildrenRebuild = 1; // 变更表达式是list绑定表达式本身或母项的重新设值
            // 此时需要更新整个列表
  
            if (getItemKey && newLen && oldChildrenLen) {
              // 如果设置了trackBy，用lis更新。开始 ====
              var newListKeys = [];
              var oldListKeys = [];
              var newListKeysMap = {};
              var oldListInNew = [];
              var oldListKeyIndex = {};
  
              for (var i = 0; i < newList.length; i++) {
                var itemKey = getItemKey(newList[i]);
                newListKeys.push(itemKey);
                newListKeysMap[itemKey] = i;
              }
  
              ;
  
              for (var i = 0; i < this.listData.length; i++) {
                var itemKey = getItemKey(this.listData[i]);
                oldListKeys.push(itemKey);
                oldListKeyIndex[itemKey] = i;
  
                if (newListKeysMap[itemKey] != null) {
                  oldListInNew[i] = newListKeysMap[itemKey];
                } else {
                  oldListInNew[i] = -1;
                  disposeChildren.push(this.children[i]);
                }
              }
  
              ;
              var newIndexStart = 0;
              var newIndexEnd = newLen;
              var oldIndexStart = 0;
              var oldIndexEnd = oldChildrenLen; // 优化：从头开始比对新旧 list 项是否相同
  
              while (newIndexStart < newLen && oldIndexStart < oldChildrenLen && newListKeys[newIndexStart] === oldListKeys[oldIndexStart]) {
                if (this.listData[oldIndexStart] !== newList[newIndexStart]) {
                  this.children[oldIndexStart].scope.raw[this.param.item] = newList[newIndexStart];
                  (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push({
                    type: 1,
                    option: change.option,
                    expr: this.itemExpr,
                    value: newList[newIndexStart]
                  });
                } // 对list更上级数据的直接设置
  
  
                if (relation < 2) {
                  (childrenChanges[oldIndexStart] = childrenChanges[oldIndexStart] || []).push(change);
                }
  
                newIndexStart++;
                oldIndexStart++;
              }
  
              var indexChange = this.param.index ? {
                type: 1,
                option: change.option,
                expr: this.indexExpr
              } : null; // 优化：从尾开始比对新旧 list 项是否相同
  
              while (newIndexEnd > newIndexStart && oldIndexEnd > oldIndexStart && newListKeys[newIndexEnd - 1] === oldListKeys[oldIndexEnd - 1]) {
                newIndexEnd--;
                oldIndexEnd--;
  
                if (this.listData[oldIndexEnd] !== newList[newIndexEnd]) {
                  // refresh item
                  this.children[oldIndexEnd].scope.raw[this.param.item] = newList[newIndexEnd];
                  (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push({
                    type: 1,
                    option: change.option,
                    expr: this.itemExpr,
                    value: newList[newIndexEnd]
                  });
                } // refresh index
  
  
                if (newIndexEnd !== oldIndexEnd) {
                  this.children[oldIndexEnd].scope.raw[this.children[oldIndexEnd].scope.indexName] = newIndexEnd;
  
                  if (indexChange) {
                    (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push(indexChange);
                  }
                } // 对list更上级数据的直接设置
  
  
                if (relation < 2) {
                  (childrenChanges[oldIndexEnd] = childrenChanges[oldIndexEnd] || []).push(change);
                }
              }
  
              var oldListLIS = [];
              var lisIdx = [];
              var lisPos = -1;
              var lisSource = oldListInNew.slice(oldIndexStart, oldIndexEnd);
              var len = oldIndexEnd - oldIndexStart;
              var preIdx = new Array(len);
  
              for (var i = 0; i < len; i++) {
                var oldItemInNew = lisSource[i];
  
                if (oldItemInNew === -1) {
                  continue;
                }
  
                var rePos = -1;
                var rePosEnd = oldListLIS.length;
  
                if (rePosEnd > 0 && oldListLIS[rePosEnd - 1] <= oldItemInNew) {
                  rePos = rePosEnd - 1;
                } else {
                  while (rePosEnd - rePos > 1) {
                    var mid = Math.floor((rePos + rePosEnd) / 2);
  
                    if (oldListLIS[mid] > oldItemInNew) {
                      rePosEnd = mid;
                    } else {
                      rePos = mid;
                    }
                  }
                }
  
                if (rePos !== -1) {
                  preIdx[i] = lisIdx[rePos];
                }
  
                if (rePos === lisPos) {
                  lisPos++;
                  oldListLIS[lisPos] = oldItemInNew;
                  lisIdx[lisPos] = i;
                } else if (oldItemInNew < oldListLIS[rePos + 1]) {
                  oldListLIS[rePos + 1] = oldItemInNew;
                  lisIdx[rePos + 1] = i;
                }
              }
  
              for (var i = lisIdx[lisPos]; lisPos >= 0; i = preIdx[i], lisPos--) {
                oldListLIS[lisPos] = i;
              }
  
              var oldListLISPos = oldListLIS.length;
              var staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1;
              var newChildren = [];
              var newChildrenChanges = [];
  
              for (var i = newLen - 1; i >= 0; i--) {
                if (i >= newIndexEnd) {
                  newChildren[i] = this.children[oldChildrenLen - newLen + i];
                  newChildrenChanges[i] = childrenChanges[oldChildrenLen - newLen + i];
                } else if (i < newIndexStart) {
                  newChildren[i] = this.children[i];
                  newChildrenChanges[i] = childrenChanges[i];
                } else {
                  var oldListIndex = oldListKeyIndex[newListKeys[i]];
  
                  if (i === staticPos) {
                    var oldScope = this.children[oldListIndex].scope; // 如果数据本身引用发生变化，设置变更
  
                    if (this.listData[oldListIndex] !== newList[i]) {
                      oldScope.raw[this.param.item] = newList[i];
                      (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push({
                        type: 1,
                        option: change.option,
                        expr: this.itemExpr,
                        value: newList[i]
                      });
                    } // refresh index
  
  
                    if (indexChange && i !== oldListIndex) {
                      oldScope.raw[oldScope.indexName] = i;
  
                      if (indexChange) {
                        (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push(indexChange);
                      }
                    } // 对list更上级数据的直接设置
  
  
                    if (relation < 2) {
                      (childrenChanges[oldListIndex] = childrenChanges[oldListIndex] || []).push(change);
                    }
  
                    newChildren[i] = this.children[oldListIndex];
                    newChildrenChanges[i] = childrenChanges[oldListIndex];
                    staticPos = oldListLISPos ? oldListInNew[oldListLIS[--oldListLISPos] + oldIndexStart] : -1;
                  } else {
                    if (oldListIndex != null) {
                      disposeChildren.push(this.children[oldListIndex]);
                    }
  
                    newChildren[i] = 0;
                    newChildrenChanges[i] = 0;
                  }
                }
              }
  
              this.children = newChildren;
              childrenChanges = newChildrenChanges; // 如果设置了trackBy，用lis更新。结束 ====
            } else {
              // 老的比新的多的部分，标记需要dispose
              if (oldChildrenLen > newLen) {
                disposeChildren = disposeChildren.concat(this.children.slice(newLen));
                childrenChanges = childrenChanges.slice(0, newLen);
                this.children = this.children.slice(0, newLen);
              } // 剩下的部分整项变更
  
  
              for (var i = 0; i < newLen; i++) {
                // 对list更上级数据的直接设置
                if (relation < 2) {
                  (childrenChanges[i] = childrenChanges[i] || []).push(change);
                }
  
                if (this.children[i]) {
                  if (this.children[i].scope.raw[this.param.item] !== newList[i]) {
                    this.children[i].scope.raw[this.param.item] = newList[i];
                    (childrenChanges[i] = childrenChanges[i] || []).push({
                      type: 1,
                      option: change.option,
                      expr: this.itemExpr,
                      value: newList[i]
                    });
                  }
                } else {
                  this.children[i] = 0;
                }
              }
            }
          }
        }
      } // 标记 length 是否发生变化
  
  
      if (newLen !== oldChildrenLen && this.param.value.paths) {
        var lengthChange = {
          type: 1,
          option: {},
          expr: createAccessor(this.param.value.paths.concat({
            type: 1,
            value: 'length'
          }))
        };
  
        if (changesIsInDataRef([lengthChange], this.aNode.hotspot.data)) {
          pushToChildrenChanges(lengthChange);
        }
      } // 执行视图更新，先删再刷新
  
  
      this._doCreateAndUpdate = doCreateAndUpdate;
      var me = this;
  
      if (disposeChildren.length === 0) {
        doCreateAndUpdate();
      } else {
        this._disposeChildren(disposeChildren, function () {
          if (doCreateAndUpdate === me._doCreateAndUpdate) {
            doCreateAndUpdate();
          }
        });
      }
  
      function doCreateAndUpdate() {
        me._doCreateAndUpdate = null;
  
        if (isOnlyDispose) {
          return;
        }
  
        var beforeEl = me.el;
        var parentEl = beforeEl.parentNode; // 对相应的项进行更新
        // 如果不attached则直接创建，如果存在则调用更新函数
  
        var j = -1;
  
        for (var i = 0; i < newLen; i++) {
          var child = me.children[i];
  
          if (child) {
            if (childrenChanges[i] && (!childrenNeedUpdate || childrenNeedUpdate[i])) {
              child._update(childrenChanges[i]);
            }
          } else {
            if (j < i) {
              j = i + 1;
              beforeEl = null;
  
              while (j < newLen) {
                var nextChild = me.children[j];
  
                if (nextChild) {
                  beforeEl = nextChild.sel || nextChild.el;
                  break;
                }
  
                j++;
              }
            }
  
            me.children[i] = createNode(me.aNode.forRinsed, me, new ForItemData(me, newList[i], i), me.owner);
            me.children[i].attach(parentEl, beforeEl || me.el);
          }
        }
      }
    }; // exports = module.exports = ForNode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file if 指令节点类
     */
    // var each = require('../util/each');
    // var guid = require('../util/guid');
    // var insertBefore = require('../browser/insert-before');
    // var evalExpr = require('../runtime/eval-expr');
    // var NodeType = require('./node-type');
    // var createNode = require('./create-node');
    // var createReverseNode = require('./create-reverse-node');
    // var nodeOwnCreateStump = require('./node-own-create-stump');
    // var nodeOwnSimpleDispose = require('./node-own-simple-dispose');
  
    /**
     * if 指令节点类
     *
     * @class
     * @param {Object} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
     */
  
  
    function IfNode(aNode, parent, scope, owner, reverseWalker) {
      this.aNode = aNode;
      this.owner = owner;
      this.scope = scope;
      this.parent = parent;
      this.parentComponent = parent.nodeType === 5 ? parent : parent.parentComponent;
      this.id = guid++;
      this.children = []; // #[begin] reverse
  
      if (reverseWalker) {
        if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) {
          // eslint-disable-line dot-notation
          this.elseIndex = -1;
          this.children[0] = createReverseNode(this.aNode.ifRinsed, this, this.scope, this.owner, reverseWalker);
        } else {
          var me = this;
          each(aNode.elses, function (elseANode, index) {
            var elif = elseANode.directives.elif;
  
            if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
              me.elseIndex = index;
              me.children[0] = createReverseNode(elseANode, me, me.scope, me.owner, reverseWalker);
              return false;
            }
          });
        }
  
        this._create();
  
        insertBefore(this.el, reverseWalker.target, reverseWalker.current);
      } // #[end]
  
    }
  
    IfNode.prototype.nodeType = 2;
    IfNode.prototype._create = nodeOwnCreateStump;
    IfNode.prototype.dispose = nodeOwnSimpleDispose;
    /**
     * attach到页面
     *
     * @param {HTMLElement} parentEl 要添加到的父元素
     * @param {HTMLElement＝} beforeEl 要添加到哪个元素之前
     */
  
    IfNode.prototype.attach = function (parentEl, beforeEl) {
      var me = this;
      var elseIndex;
      var child;
  
      if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) {
        // eslint-disable-line dot-notation
        child = createNode(this.aNode.ifRinsed, this, this.scope, this.owner);
        elseIndex = -1;
      } else {
        each(this.aNode.elses, function (elseANode, index) {
          var elif = elseANode.directives.elif;
  
          if (!elif || elif && evalExpr(elif.value, me.scope, me.owner)) {
            child = createNode(elseANode, me, me.scope, me.owner);
            elseIndex = index;
            return false;
          }
        });
      }
  
      if (child) {
        this.children[0] = child;
        child.attach(parentEl, beforeEl);
        this.elseIndex = elseIndex;
      }
  
      this._create();
  
      insertBefore(this.el, parentEl, beforeEl);
    };
    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
  
  
    IfNode.prototype._update = function (changes) {
      var me = this;
      var childANode = this.aNode.ifRinsed;
      var elseIndex;
  
      if (evalExpr(this.aNode.directives['if'].value, this.scope, this.owner)) {
        // eslint-disable-line dot-notation
        elseIndex = -1;
      } else {
        each(this.aNode.elses, function (elseANode, index) {
          var elif = elseANode.directives.elif;
  
          if (elif && evalExpr(elif.value, me.scope, me.owner) || !elif) {
            elseIndex = index;
            childANode = elseANode;
            return false;
          }
        });
      }
  
      var child = this.children[0];
  
      if (elseIndex === this.elseIndex) {
        child && child._update(changes);
      } else {
        this.children = [];
  
        if (child) {
          child._ondisposed = newChild;
          child.dispose();
        } else {
          newChild();
        }
  
        this.elseIndex = elseIndex;
      }
  
      function newChild() {
        if (typeof elseIndex !== 'undefined') {
          (me.children[0] = createNode(childANode, me, me.scope, me.owner)).attach(me.el.parentNode, me.el);
        }
      }
    };
  
    IfNode.prototype._getElAsRootNode = function () {
      var child = this.children[0];
      return child && child.el || this.el;
    }; // exports = module.exports = IfNode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file template 节点类
     */
    // var each = require('../util/each');
    // var guid = require('../util/guid');
    // var insertBefore = require('../browser/insert-before');
    // var removeEl = require('../browser/remove-el');
    // var NodeType = require('./node-type');
    // var LifeCycle = require('./life-cycle');
    // var createReverseNode = require('./create-reverse-node');
    // var elementDisposeChildren = require('./element-dispose-children');
    // var nodeOwnOnlyChildrenAttach = require('./node-own-only-children-attach');
  
    /**
     * template 节点类
     *
     * @class
     * @param {Object} aNode 抽象节点
     * @param {Node} parent 父亲节点
     * @param {Model} scope 所属数据环境
     * @param {Component} owner 所属组件环境
     * @param {DOMChildrenWalker?} reverseWalker 子元素遍历对象
     */
  
  
    function TemplateNode(aNode, parent, scope, owner, reverseWalker) {
      this.aNode = aNode;
      this.owner = owner;
      this.scope = scope;
      this.parent = parent;
      this.parentComponent = parent.nodeType === 5 ? parent : parent.parentComponent;
      this.id = guid++;
      this.lifeCycle = LifeCycle.start;
      this.children = []; // #[begin] reverse
  
      if (reverseWalker) {
        var hasFlagComment; // start flag
  
        if (reverseWalker.current && reverseWalker.current.nodeType === 8) {
          this.sel = reverseWalker.current;
          hasFlagComment = 1;
          reverseWalker.goNext();
        } else {
          this.sel = document.createComment(this.id);
          insertBefore(this.sel, reverseWalker.target, reverseWalker.current);
        } // content
  
  
        var aNodeChildren = this.aNode.children;
  
        for (var i = 0, l = aNodeChildren.length; i < l; i++) {
          this.children.push(createReverseNode(aNodeChildren[i], this, this.scope, this.owner, reverseWalker));
        } // end flag
  
  
        if (hasFlagComment) {
          this.el = reverseWalker.current;
          reverseWalker.goNext();
        } else {
          this.el = document.createComment(this.id);
          insertBefore(this.el, reverseWalker.target, reverseWalker.current);
        }
  
        this.lifeCycle = LifeCycle.attached;
      } // #[end]
  
    }
  
    TemplateNode.prototype.nodeType = 7;
    TemplateNode.prototype.attach = nodeOwnOnlyChildrenAttach;
    /**
     * 销毁释放
     *
     * @param {boolean=} noDetach 是否不要把节点从dom移除
     * @param {boolean=} noTransition 是否不显示过渡动画效果
     */
  
    TemplateNode.prototype.dispose = function (noDetach, noTransition) {
      elementDisposeChildren(this.children, noDetach, noTransition);
  
      if (!noDetach) {
        removeEl(this.el);
        removeEl(this.sel);
      }
  
      this.sel = null;
      this.el = null;
      this.owner = null;
      this.scope = null;
      this.children = null;
      this.lifeCycle = LifeCycle.disposed;
  
      if (this._ondisposed) {
        this._ondisposed();
      }
    };
    /**
     * 视图更新函数
     *
     * @param {Array} changes 数据变化信息
     */
  
  
    TemplateNode.prototype._update = function (changes) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i]._update(changes);
      }
    }; // exports = module.exports = TemplateNode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file ANode预热
     */
    // var ExprType = require('../parser/expr-type');
    // var each = require('../util/each');
    // var extend = require('../util/extend');
    // var kebab2camel = require('../util/kebab2camel');
    // var hotTags = require('../browser/hot-tags');
    // var createEl = require('../browser/create-el');
    // var getPropHandler = require('./get-prop-handler');
    // var getANodeProp = require('./get-a-node-prop');
    // var isBrowser = require('../browser/is-browser');
    // var TextNode = require('./text-node');
    // var SlotNode = require('./slot-node');
    // var ForNode = require('./for-node');
    // var IfNode = require('./if-node');
    // var TemplateNode = require('./template-node');
    // var Element = require('./element');
  
    /**
     * ANode预热，分析的数据引用等信息
     *
     * @param {Object} aNode 要预热的ANode
     */
  
  
    function preheatANode(aNode) {
      var stack = [];
  
      function recordHotspotData(expr, notContentData) {
        var refs = analyseExprDataHotspot(expr);
  
        if (refs.length) {
          for (var i = 0, len = stack.length; i < len; i++) {
            if (!notContentData || i !== len - 1) {
              var data = stack[i].hotspot.data;
  
              if (!data) {
                data = stack[i].hotspot.data = {};
              }
  
              each(refs, function (ref) {
                data[ref] = 1;
              });
            }
          }
        }
      }
  
      function analyseANodeHotspot(aNode) {
        if (!aNode.hotspot) {
          stack.push(aNode);
  
          if (aNode.textExpr) {
            aNode.hotspot = {};
            aNode.Clazz = TextNode;
            recordHotspotData(aNode.textExpr);
          } else {
            var sourceNode;
  
            if (isBrowser && aNode.tagName && aNode.tagName.indexOf('-') < 0 && !/^(template|slot|select|input|option|button|video|audio|canvas|img|embed|object|iframe)$/i.test(aNode.tagName)) {
              sourceNode = createEl(aNode.tagName);
            }
  
            aNode.hotspot = {
              dynamicProps: [],
              xProps: [],
              props: {},
              binds: [],
              sourceNode: sourceNode
            }; // === analyse hotspot data: start
  
            each(aNode.vars, function (varItem) {
              recordHotspotData(varItem.expr);
            });
            each(aNode.props, function (prop) {
              aNode.hotspot.binds.push({
                name: kebab2camel(prop.name),
                expr: prop.raw != null ? prop.expr : {
                  type: 3,
                  value: true
                },
                x: prop.x,
                raw: prop.raw
              });
              recordHotspotData(prop.expr);
            });
  
            for (var key in aNode.directives) {
              /* istanbul ignore else  */
              if (aNode.directives.hasOwnProperty(key)) {
                var directive = aNode.directives[key];
                recordHotspotData(directive.value, !/^(html|bind)$/.test(key)); // init trackBy getKey function
  
                if (key === 'for') {
                  var trackBy = directive.trackBy;
  
                  if (trackBy && trackBy.type === 4 && trackBy.paths[0].value === directive.item) {
                    aNode.hotspot.getForKey = new Function(directive.item, 'return ' + trackBy.raw);
                  }
                }
              }
            }
  
            each(aNode.elses, function (child) {
              analyseANodeHotspot(child);
            });
            each(aNode.children, function (child) {
              analyseANodeHotspot(child);
            }); // === analyse hotspot data: end
            // === analyse hotspot props: start
  
            each(aNode.props, function (prop, index) {
              aNode.hotspot.props[prop.name] = index;
              prop.handler = getPropHandler(aNode.tagName, prop.name);
  
              if (prop.name === 'id') {
                prop.id = true;
                aNode.hotspot.idProp = prop;
                aNode.hotspot.dynamicProps.push(prop);
              } else if (prop.expr.value != null) {
                if (sourceNode) {
                  prop.handler(sourceNode, prop.expr.value, prop.name, aNode);
                }
              } else {
                if (prop.x) {
                  aNode.hotspot.xProps.push(prop);
                }
  
                aNode.hotspot.dynamicProps.push(prop);
              }
            }); // ie 下，如果 option 没有 value 属性，select.value = xx 操作不会选中 option
            // 所以没有设置 value 时，默认把 option 的内容作为 value
  
            if (aNode.tagName === 'option' && !getANodeProp(aNode, 'value') && aNode.children[0]) {
              var valueProp = {
                name: 'value',
                expr: aNode.children[0].textExpr,
                handler: getPropHandler(aNode.tagName, 'value')
              };
              aNode.props.push(valueProp);
              aNode.hotspot.dynamicProps.push(valueProp);
              aNode.hotspot.props.value = aNode.props.length - 1;
            }
  
            if (aNode.directives['if']) {
              // eslint-disable-line dot-notation
              aNode.ifRinsed = {
                children: aNode.children,
                props: aNode.props,
                events: aNode.events,
                tagName: aNode.tagName,
                vars: aNode.vars,
                hotspot: aNode.hotspot,
                directives: extend({}, aNode.directives)
              };
              aNode.hotspot.hasRootNode = true;
              aNode.Clazz = IfNode;
              aNode = aNode.ifRinsed;
              aNode.directives['if'] = null; // eslint-disable-line dot-notation
            }
  
            if (aNode.directives['for']) {
              // eslint-disable-line dot-notation
              aNode.forRinsed = {
                children: aNode.children,
                props: aNode.props,
                events: aNode.events,
                tagName: aNode.tagName,
                vars: aNode.vars,
                hotspot: aNode.hotspot,
                directives: extend({}, aNode.directives)
              };
              aNode.hotspot.hasRootNode = true;
              aNode.Clazz = ForNode;
              aNode.forRinsed.directives['for'] = null; // eslint-disable-line dot-notation
  
              aNode = aNode.forRinsed;
            }
  
            if (hotTags[aNode.tagName]) {
              aNode.Clazz = Element;
            } else {
              switch (aNode.tagName) {
                case 'slot':
                  aNode.Clazz = SlotNode;
                  break;
  
                case 'template':
                case 'fragment':
                  aNode.hotspot.hasRootNode = true;
                  aNode.Clazz = TemplateNode;
              }
            } // === analyse hotspot props: end
  
          }
  
          stack.pop();
        }
      }
  
      if (aNode) {
        analyseANodeHotspot(aNode);
      }
    }
    /**
     * 分析表达式的数据引用
     *
     * @param {Object} expr 要分析的表达式
     * @return {Array}
     */
  
  
    function analyseExprDataHotspot(expr, accessorMeanDynamic) {
      var refs = [];
      var isDynamic;
  
      function analyseExprs(exprs, accessorMeanDynamic) {
        for (var i = 0, l = exprs.length; i < l; i++) {
          refs = refs.concat(analyseExprDataHotspot(exprs[i], accessorMeanDynamic));
          isDynamic = isDynamic || exprs[i].dynamic;
        }
      }
  
      switch (expr.type) {
        case 4:
          isDynamic = accessorMeanDynamic;
          var paths = expr.paths;
          refs.push(paths[0].value);
  
          if (paths.length > 1) {
            refs.push(paths[0].value + '.' + (paths[1].value || '*'));
          }
  
          analyseExprs(paths.slice(1), 1);
          break;
  
        case 9:
          refs = analyseExprDataHotspot(expr.expr, accessorMeanDynamic);
          isDynamic = expr.expr.dynamic;
          break;
  
        case 7:
        case 8:
        case 10:
          analyseExprs(expr.segs, accessorMeanDynamic);
          break;
  
        case 5:
          refs = analyseExprDataHotspot(expr.expr);
          isDynamic = expr.expr.dynamic;
          each(expr.filters, function (filter) {
            analyseExprs(filter.name.paths);
            analyseExprs(filter.args);
          });
          break;
  
        case 6:
          analyseExprs(expr.name.paths);
          analyseExprs(expr.args);
          break;
  
        case 12:
        case 11:
          for (var i = 0; i < expr.items.length; i++) {
            refs = refs.concat(analyseExprDataHotspot(expr.items[i].expr));
            isDynamic = isDynamic || expr.items[i].expr.dynamic;
          }
  
          break;
      }
  
      isDynamic && (expr.dynamic = true);
      return refs;
    } // exports = module.exports = preheatANode;
  
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file 创建组件Loader
     */
    // var ComponentLoader = require('./component-loader');
  
    /**
     * 创建组件Loader
     *
     * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
     * @param {Function} options.load load方法
     * @param {Function=} options.placeholder loading过程中渲染的占位组件
     * @param {Function=} options.fallback load失败时渲染的组件
     * @return {ComponentLoader}
     */
  
  
    function createComponentLoader(options) {
      var placeholder = options.placeholder;
      var fallback = options.fallback;
      var load = typeof options === 'function' ? options : options.load;
      return new ComponentLoader(load, placeholder, fallback);
    } // exports = module.exports = createComponentLoader;
  
    /* eslint-disable no-unused-vars */
    //     var nextTick = require('./util/next-tick');
    //     var inherits = require('./util/inherits');
    //     var parseTemplate = require('./parser/parse-template');
    //     var parseExpr = require('./parser/parse-expr');
    //     var ExprType = require('./parser/expr-type');
    //     var LifeCycle = require('./view/life-cycle');
    //     var NodeType = require('./view/node-type');
    //     var Component = require('./view/component');
    //     var compileComponent = require('./view/compile-component');
    //     var defineComponent = require('./view/define-component');
    //     var createComponentLoader = require('./view/create-component-loader');
    //     var emitDevtool = require('./util/emit-devtool');
    //     var Data = require('./runtime/data');
    //     var evalExpr = require('./runtime/eval-expr');
    //     var DataTypes = require('./util/data-types');
  
  
    var san = {
      /**
       * san版本号
       *
       * @type {string}
       */
      version: '3.8.7',
      // #[begin] devtool
  
      /**
       * 是否开启调试。开启调试时 devtool 会工作
       *
       * @type {boolean}
       */
      debug: true,
      // #[end]
  
      /**
       * 组件基类
       *
       * @type {Function}
       */
      Component: Component,
  
      /**
       * 创建组件类
       *
       * @param {Object} proto 组件类的方法表
       * @return {Function}
       */
      defineComponent: defineComponent,
  
      /**
       * 创建组件Loader
       *
       * @param {Object|Function} options 创建组件Loader的参数。为Object时参考下方描述，为Function时代表load方法。
       * @param {Function} options.load load方法
       * @param {Function=} options.placeholder loading过程中渲染的占位组件
       * @param {Function=} options.fallback load失败时渲染的组件
       * @return {ComponentLoader}
       */
      createComponentLoader: createComponentLoader,
  
      /**
       * 编译组件类。预解析template和components
       *
       * @param {Function} ComponentClass 组件类
       */
      compileComponent: compileComponent,
  
      /**
       * 解析 template
       *
       * @inner
       * @param {string} source template 源码
       * @return {ANode}
       */
      parseTemplate: parseTemplate,
  
      /**
       * 解析表达式
       *
       * @param {string} source 源码
       * @return {Object}
       */
      parseExpr: parseExpr,
  
      /**
       * 表达式类型枚举
       *
       * @const
       * @type {Object}
       */
      ExprType: ExprType,
  
      /**
       * 生命周期
       */
      LifeCycle: LifeCycle,
  
      /**
       * 节点类型
       *
       * @const
       * @type {Object}
       */
      NodeType: NodeType,
  
      /**
       * 在下一个更新周期运行函数
       *
       * @param {Function} fn 要运行的函数
       */
      nextTick: nextTick,
  
      /**
       * 数据类
       *
       * @class
       * @param {Object?} data 初始数据
       * @param {Data?} parent 父级数据对象
       */
      Data: Data,
  
      /**
       * 计算表达式的值
       *
       * @param {Object} expr 表达式对象
       * @param {Data} data 数据对象
       * @param {Component=} owner 组件对象，用于表达式中filter的执行
       * @return {*}
       */
      evalExpr: evalExpr,
  
      /**
       * 构建类之间的继承关系
       *
       * @param {Function} subClass 子类函数
       * @param {Function} superClass 父类函数
       */
      inherits: inherits,
  
      /**
       * DataTypes
       *
       * @type {Object}
       */
      DataTypes: DataTypes
    }; // export
  
    if (true) {
      // For CommonJS
      exports = module.exports = san;
    } else {} // #[begin] devtool
  
  
    emitDevtool.start(san); // #[end]
  })(this);
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))
  
  /***/ }),
  
  /***/ "./node_modules/setimmediate/setImmediate.js":
  /*!***************************************************!*\
    !*** ./node_modules/setimmediate/setImmediate.js ***!
    \***************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";
  
    if (global.setImmediate) {
      return;
    }
  
    var nextHandle = 1; // Spec says greater than zero
  
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;
  
    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      } // Copy function arguments
  
  
      var args = new Array(arguments.length - 1);
  
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i + 1];
      } // Store and register the task
  
  
      var task = {
        callback: callback,
        args: args
      };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }
  
    function clearImmediate(handle) {
      delete tasksByHandle[handle];
    }
  
    function run(task) {
      var callback = task.callback;
      var args = task.args;
  
      switch (args.length) {
        case 0:
          callback();
          break;
  
        case 1:
          callback(args[0]);
          break;
  
        case 2:
          callback(args[0], args[1]);
          break;
  
        case 3:
          callback(args[0], args[1], args[2]);
          break;
  
        default:
          callback.apply(undefined, args);
          break;
      }
    }
  
    function runIfPresent(handle) {
      // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
      // So if we're currently running a task, we'll need to delay this invocation.
      if (currentlyRunningATask) {
        // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
        // "too much recursion" error.
        setTimeout(runIfPresent, 0, handle);
      } else {
        var task = tasksByHandle[handle];
  
        if (task) {
          currentlyRunningATask = true;
  
          try {
            run(task);
          } finally {
            clearImmediate(handle);
            currentlyRunningATask = false;
          }
        }
      }
    }
  
    function installNextTickImplementation() {
      registerImmediate = function (handle) {
        process.nextTick(function () {
          runIfPresent(handle);
        });
      };
    }
  
    function canUsePostMessage() {
      // The test against `importScripts` prevents this implementation from being installed inside a web worker,
      // where `global.postMessage` means something completely different and can't be used for this purpose.
      if (global.postMessage && !global.importScripts) {
        var postMessageIsAsynchronous = true;
        var oldOnMessage = global.onmessage;
  
        global.onmessage = function () {
          postMessageIsAsynchronous = false;
        };
  
        global.postMessage("", "*");
        global.onmessage = oldOnMessage;
        return postMessageIsAsynchronous;
      }
    }
  
    function installPostMessageImplementation() {
      // Installs an event handler on `global` for the `message` event: see
      // * https://developer.mozilla.org/en/DOM/window.postMessage
      // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
      var messagePrefix = "setImmediate$" + Math.random() + "$";
  
      var onGlobalMessage = function (event) {
        if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
          runIfPresent(+event.data.slice(messagePrefix.length));
        }
      };
  
      if (global.addEventListener) {
        global.addEventListener("message", onGlobalMessage, false);
      } else {
        global.attachEvent("onmessage", onGlobalMessage);
      }
  
      registerImmediate = function (handle) {
        global.postMessage(messagePrefix + handle, "*");
      };
    }
  
    function installMessageChannelImplementation() {
      var channel = new MessageChannel();
  
      channel.port1.onmessage = function (event) {
        var handle = event.data;
        runIfPresent(handle);
      };
  
      registerImmediate = function (handle) {
        channel.port2.postMessage(handle);
      };
    }
  
    function installReadyStateChangeImplementation() {
      var html = doc.documentElement;
  
      registerImmediate = function (handle) {
        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
        var script = doc.createElement("script");
  
        script.onreadystatechange = function () {
          runIfPresent(handle);
          script.onreadystatechange = null;
          html.removeChild(script);
          script = null;
        };
  
        html.appendChild(script);
      };
    }
  
    function installSetTimeoutImplementation() {
      registerImmediate = function (handle) {
        setTimeout(runIfPresent, 0, handle);
      };
    } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
  
  
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.
  
    if ({}.toString.call(global.process) === "[object process]") {
      // For Node.js before 0.9
      installNextTickImplementation();
    } else if (canUsePostMessage()) {
      // For non-IE10 modern browsers
      installPostMessageImplementation();
    } else if (global.MessageChannel) {
      // For web workers, where supported
      installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
      // For IE 6–8
      installReadyStateChangeImplementation();
    } else {
      // For older browsers
      installSetTimeoutImplementation();
    }
  
    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
  })(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))
  
  /***/ }),
  
  /***/ "./node_modules/sockjs-client/dist/sockjs.js":
  /*!***************************************************!*\
    !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
    \***************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.5.1 | http://sockjs.org | MIT license */
  (function (f) {
    if (true) {
      module.exports = f();
    } else { var g; }
  })(function () {
    var define, module, exports;
    return function () {
      function r(e, n, t) {
        function o(i, f) {
          if (!n[i]) {
            if (!e[i]) {
              var c = "function" == typeof require && require;
              if (!f && c) return require(i, !0);
              if (u) return u(i, !0);
              var a = new Error("Cannot find module '" + i + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
  
            var p = n[i] = {
              exports: {}
            };
            e[i][0].call(p.exports, function (r) {
              var n = e[i][1][r];
              return o(n || r);
            }, p, p.exports, r, e, n, t);
          }
  
          return n[i].exports;
        }
  
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
  
        return o;
      }
  
      return r;
    }()({
      1: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          var transportList = require('./transport-list');
  
          module.exports = require('./main')(transportList); // TODO can't get rid of this until all servers do
  
          if ('_sockjs_onload' in global) {
            setTimeout(global._sockjs_onload, 1);
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./main": 14,
        "./transport-list": 16
      }],
      2: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            Event = require('./event');
  
        function CloseEvent() {
          Event.call(this);
          this.initEvent('close', false, false);
          this.wasClean = false;
          this.code = 0;
          this.reason = '';
        }
  
        inherits(CloseEvent, Event);
        module.exports = CloseEvent;
      }, {
        "./event": 4,
        "inherits": 57
      }],
      3: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            EventTarget = require('./eventtarget');
  
        function EventEmitter() {
          EventTarget.call(this);
        }
  
        inherits(EventEmitter, EventTarget);
  
        EventEmitter.prototype.removeAllListeners = function (type) {
          if (type) {
            delete this._listeners[type];
          } else {
            this._listeners = {};
          }
        };
  
        EventEmitter.prototype.once = function (type, listener) {
          var self = this,
              fired = false;
  
          function g() {
            self.removeListener(type, g);
  
            if (!fired) {
              fired = true;
              listener.apply(this, arguments);
            }
          }
  
          this.on(type, g);
        };
  
        EventEmitter.prototype.emit = function () {
          var type = arguments[0];
          var listeners = this._listeners[type];
  
          if (!listeners) {
            return;
          } // equivalent of Array.prototype.slice.call(arguments, 1);
  
  
          var l = arguments.length;
          var args = new Array(l - 1);
  
          for (var ai = 1; ai < l; ai++) {
            args[ai - 1] = arguments[ai];
          }
  
          for (var i = 0; i < listeners.length; i++) {
            listeners[i].apply(this, args);
          }
        };
  
        EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
        EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;
        module.exports.EventEmitter = EventEmitter;
      }, {
        "./eventtarget": 5,
        "inherits": 57
      }],
      4: [function (require, module, exports) {
        'use strict';
  
        function Event(eventType) {
          this.type = eventType;
        }
  
        Event.prototype.initEvent = function (eventType, canBubble, cancelable) {
          this.type = eventType;
          this.bubbles = canBubble;
          this.cancelable = cancelable;
          this.timeStamp = +new Date();
          return this;
        };
  
        Event.prototype.stopPropagation = function () {};
  
        Event.prototype.preventDefault = function () {};
  
        Event.CAPTURING_PHASE = 1;
        Event.AT_TARGET = 2;
        Event.BUBBLING_PHASE = 3;
        module.exports = Event;
      }, {}],
      5: [function (require, module, exports) {
        'use strict';
        /* Simplified implementation of DOM2 EventTarget.
         *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
         */
  
        function EventTarget() {
          this._listeners = {};
        }
  
        EventTarget.prototype.addEventListener = function (eventType, listener) {
          if (!(eventType in this._listeners)) {
            this._listeners[eventType] = [];
          }
  
          var arr = this._listeners[eventType]; // #4
  
          if (arr.indexOf(listener) === -1) {
            // Make a copy so as not to interfere with a current dispatchEvent.
            arr = arr.concat([listener]);
          }
  
          this._listeners[eventType] = arr;
        };
  
        EventTarget.prototype.removeEventListener = function (eventType, listener) {
          var arr = this._listeners[eventType];
  
          if (!arr) {
            return;
          }
  
          var idx = arr.indexOf(listener);
  
          if (idx !== -1) {
            if (arr.length > 1) {
              // Make a copy so as not to interfere with a current dispatchEvent.
              this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
            } else {
              delete this._listeners[eventType];
            }
  
            return;
          }
        };
  
        EventTarget.prototype.dispatchEvent = function () {
          var event = arguments[0];
          var t = event.type; // equivalent of Array.prototype.slice.call(arguments, 0);
  
          var args = arguments.length === 1 ? [event] : Array.apply(null, arguments); // TODO: This doesn't match the real behavior; per spec, onfoo get
          // their place in line from the /first/ time they're set from
          // non-null. Although WebKit bumps it to the end every time it's
          // set.
  
          if (this['on' + t]) {
            this['on' + t].apply(this, args);
          }
  
          if (t in this._listeners) {
            // Grab a reference to the listeners list. removeEventListener may alter the list.
            var listeners = this._listeners[t];
  
            for (var i = 0; i < listeners.length; i++) {
              listeners[i].apply(this, args);
            }
          }
        };
  
        module.exports = EventTarget;
      }, {}],
      6: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            Event = require('./event');
  
        function TransportMessageEvent(data) {
          Event.call(this);
          this.initEvent('message', false, false);
          this.data = data;
        }
  
        inherits(TransportMessageEvent, Event);
        module.exports = TransportMessageEvent;
      }, {
        "./event": 4,
        "inherits": 57
      }],
      7: [function (require, module, exports) {
        'use strict';
  
        var JSON3 = require('json3'),
            iframeUtils = require('./utils/iframe');
  
        function FacadeJS(transport) {
          this._transport = transport;
          transport.on('message', this._transportMessage.bind(this));
          transport.on('close', this._transportClose.bind(this));
        }
  
        FacadeJS.prototype._transportClose = function (code, reason) {
          iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
        };
  
        FacadeJS.prototype._transportMessage = function (frame) {
          iframeUtils.postMessage('t', frame);
        };
  
        FacadeJS.prototype._send = function (data) {
          this._transport.send(data);
        };
  
        FacadeJS.prototype._close = function () {
          this._transport.close();
  
          this._transport.removeAllListeners();
        };
  
        module.exports = FacadeJS;
      }, {
        "./utils/iframe": 47,
        "json3": 58
      }],
      8: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var urlUtils = require('./utils/url'),
              eventUtils = require('./utils/event'),
              JSON3 = require('json3'),
              FacadeJS = require('./facade'),
              InfoIframeReceiver = require('./info-iframe-receiver'),
              iframeUtils = require('./utils/iframe'),
              loc = require('./location');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:iframe-bootstrap');
          }
  
          module.exports = function (SockJS, availableTransports) {
            var transportMap = {};
            availableTransports.forEach(function (at) {
              if (at.facadeTransport) {
                transportMap[at.facadeTransport.transportName] = at.facadeTransport;
              }
            }); // hard-coded for the info iframe
            // TODO see if we can make this more dynamic
  
            transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
            var parentOrigin;
            /* eslint-disable camelcase */
  
            SockJS.bootstrap_iframe = function () {
              /* eslint-enable camelcase */
              var facade;
              iframeUtils.currentWindowId = loc.hash.slice(1);
  
              var onMessage = function (e) {
                if (e.source !== parent) {
                  return;
                }
  
                if (typeof parentOrigin === 'undefined') {
                  parentOrigin = e.origin;
                }
  
                if (e.origin !== parentOrigin) {
                  return;
                }
  
                var iframeMessage;
  
                try {
                  iframeMessage = JSON3.parse(e.data);
                } catch (ignored) {
                  debug('bad json', e.data);
                  return;
                }
  
                if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
                  return;
                }
  
                switch (iframeMessage.type) {
                  case 's':
                    var p;
  
                    try {
                      p = JSON3.parse(iframeMessage.data);
                    } catch (ignored) {
                      debug('bad json', iframeMessage.data);
                      break;
                    }
  
                    var version = p[0];
                    var transport = p[1];
                    var transUrl = p[2];
                    var baseUrl = p[3];
                    debug(version, transport, transUrl, baseUrl); // change this to semver logic
  
                    if (version !== SockJS.version) {
                      throw new Error('Incompatible SockJS! Main site uses:' + ' "' + version + '", the iframe:' + ' "' + SockJS.version + '".');
                    }
  
                    if (!urlUtils.isOriginEqual(transUrl, loc.href) || !urlUtils.isOriginEqual(baseUrl, loc.href)) {
                      throw new Error('Can\'t connect to different domain from within an ' + 'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
                    }
  
                    facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
                    break;
  
                  case 'm':
                    facade._send(iframeMessage.data);
  
                    break;
  
                  case 'c':
                    if (facade) {
                      facade._close();
                    }
  
                    facade = null;
                    break;
                }
              };
  
              eventUtils.attachEvent('message', onMessage); // Start
  
              iframeUtils.postMessage('s');
            };
          };
        }).call(this, {
          env: {}
        });
      }, {
        "./facade": 7,
        "./info-iframe-receiver": 10,
        "./location": 13,
        "./utils/event": 46,
        "./utils/iframe": 47,
        "./utils/url": 52,
        "debug": 55,
        "json3": 58
      }],
      9: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var EventEmitter = require('events').EventEmitter,
              inherits = require('inherits'),
              JSON3 = require('json3'),
              objectUtils = require('./utils/object');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:info-ajax');
          }
  
          function InfoAjax(url, AjaxObject) {
            EventEmitter.call(this);
            var self = this;
            var t0 = +new Date();
            this.xo = new AjaxObject('GET', url);
            this.xo.once('finish', function (status, text) {
              var info, rtt;
  
              if (status === 200) {
                rtt = +new Date() - t0;
  
                if (text) {
                  try {
                    info = JSON3.parse(text);
                  } catch (e) {
                    debug('bad json', text);
                  }
                }
  
                if (!objectUtils.isObject(info)) {
                  info = {};
                }
              }
  
              self.emit('finish', info, rtt);
              self.removeAllListeners();
            });
          }
  
          inherits(InfoAjax, EventEmitter);
  
          InfoAjax.prototype.close = function () {
            this.removeAllListeners();
            this.xo.close();
          };
  
          module.exports = InfoAjax;
        }).call(this, {
          env: {}
        });
      }, {
        "./utils/object": 49,
        "debug": 55,
        "events": 3,
        "inherits": 57,
        "json3": 58
      }],
      10: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            EventEmitter = require('events').EventEmitter,
            JSON3 = require('json3'),
            XHRLocalObject = require('./transport/sender/xhr-local'),
            InfoAjax = require('./info-ajax');
  
        function InfoReceiverIframe(transUrl) {
          var self = this;
          EventEmitter.call(this);
          this.ir = new InfoAjax(transUrl, XHRLocalObject);
          this.ir.once('finish', function (info, rtt) {
            self.ir = null;
            self.emit('message', JSON3.stringify([info, rtt]));
          });
        }
  
        inherits(InfoReceiverIframe, EventEmitter);
        InfoReceiverIframe.transportName = 'iframe-info-receiver';
  
        InfoReceiverIframe.prototype.close = function () {
          if (this.ir) {
            this.ir.close();
            this.ir = null;
          }
  
          this.removeAllListeners();
        };
  
        module.exports = InfoReceiverIframe;
      }, {
        "./info-ajax": 9,
        "./transport/sender/xhr-local": 37,
        "events": 3,
        "inherits": 57,
        "json3": 58
      }],
      11: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          var EventEmitter = require('events').EventEmitter,
              inherits = require('inherits'),
              JSON3 = require('json3'),
              utils = require('./utils/event'),
              IframeTransport = require('./transport/iframe'),
              InfoReceiverIframe = require('./info-iframe-receiver');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:info-iframe');
          }
  
          function InfoIframe(baseUrl, url) {
            var self = this;
            EventEmitter.call(this);
  
            var go = function () {
              var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);
              ifr.once('message', function (msg) {
                if (msg) {
                  var d;
  
                  try {
                    d = JSON3.parse(msg);
                  } catch (e) {
                    debug('bad json', msg);
                    self.emit('finish');
                    self.close();
                    return;
                  }
  
                  var info = d[0],
                      rtt = d[1];
                  self.emit('finish', info, rtt);
                }
  
                self.close();
              });
              ifr.once('close', function () {
                self.emit('finish');
                self.close();
              });
            }; // TODO this seems the same as the 'needBody' from transports
  
  
            if (!global.document.body) {
              utils.attachEvent('load', go);
            } else {
              go();
            }
          }
  
          inherits(InfoIframe, EventEmitter);
  
          InfoIframe.enabled = function () {
            return IframeTransport.enabled();
          };
  
          InfoIframe.prototype.close = function () {
            if (this.ifr) {
              this.ifr.close();
            }
  
            this.removeAllListeners();
            this.ifr = null;
          };
  
          module.exports = InfoIframe;
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./info-iframe-receiver": 10,
        "./transport/iframe": 22,
        "./utils/event": 46,
        "debug": 55,
        "events": 3,
        "inherits": 57,
        "json3": 58
      }],
      12: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var EventEmitter = require('events').EventEmitter,
              inherits = require('inherits'),
              urlUtils = require('./utils/url'),
              XDR = require('./transport/sender/xdr'),
              XHRCors = require('./transport/sender/xhr-cors'),
              XHRLocal = require('./transport/sender/xhr-local'),
              XHRFake = require('./transport/sender/xhr-fake'),
              InfoIframe = require('./info-iframe'),
              InfoAjax = require('./info-ajax');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:info-receiver');
          }
  
          function InfoReceiver(baseUrl, urlInfo) {
            debug(baseUrl);
            var self = this;
            EventEmitter.call(this);
            setTimeout(function () {
              self.doXhr(baseUrl, urlInfo);
            }, 0);
          }
  
          inherits(InfoReceiver, EventEmitter); // TODO this is currently ignoring the list of available transports and the whitelist
  
          InfoReceiver._getReceiver = function (baseUrl, url, urlInfo) {
            // determine method of CORS support (if needed)
            if (urlInfo.sameOrigin) {
              return new InfoAjax(url, XHRLocal);
            }
  
            if (XHRCors.enabled) {
              return new InfoAjax(url, XHRCors);
            }
  
            if (XDR.enabled && urlInfo.sameScheme) {
              return new InfoAjax(url, XDR);
            }
  
            if (InfoIframe.enabled()) {
              return new InfoIframe(baseUrl, url);
            }
  
            return new InfoAjax(url, XHRFake);
          };
  
          InfoReceiver.prototype.doXhr = function (baseUrl, urlInfo) {
            var self = this,
                url = urlUtils.addPath(baseUrl, '/info');
            debug('doXhr', url);
            this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);
            this.timeoutRef = setTimeout(function () {
              debug('timeout');
  
              self._cleanup(false);
  
              self.emit('finish');
            }, InfoReceiver.timeout);
            this.xo.once('finish', function (info, rtt) {
              debug('finish', info, rtt);
  
              self._cleanup(true);
  
              self.emit('finish', info, rtt);
            });
          };
  
          InfoReceiver.prototype._cleanup = function (wasClean) {
            debug('_cleanup');
            clearTimeout(this.timeoutRef);
            this.timeoutRef = null;
  
            if (!wasClean && this.xo) {
              this.xo.close();
            }
  
            this.xo = null;
          };
  
          InfoReceiver.prototype.close = function () {
            debug('close');
            this.removeAllListeners();
  
            this._cleanup(false);
          };
  
          InfoReceiver.timeout = 8000;
          module.exports = InfoReceiver;
        }).call(this, {
          env: {}
        });
      }, {
        "./info-ajax": 9,
        "./info-iframe": 11,
        "./transport/sender/xdr": 34,
        "./transport/sender/xhr-cors": 35,
        "./transport/sender/xhr-fake": 36,
        "./transport/sender/xhr-local": 37,
        "./utils/url": 52,
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      13: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          module.exports = global.location || {
            origin: 'http://localhost:80',
            protocol: 'http:',
            host: 'localhost',
            port: 80,
            href: 'http://localhost/',
            hash: ''
          };
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      14: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          require('./shims');
  
          var URL = require('url-parse'),
              inherits = require('inherits'),
              JSON3 = require('json3'),
              random = require('./utils/random'),
              escape = require('./utils/escape'),
              urlUtils = require('./utils/url'),
              eventUtils = require('./utils/event'),
              transport = require('./utils/transport'),
              objectUtils = require('./utils/object'),
              browser = require('./utils/browser'),
              log = require('./utils/log'),
              Event = require('./event/event'),
              EventTarget = require('./event/eventtarget'),
              loc = require('./location'),
              CloseEvent = require('./event/close'),
              TransportMessageEvent = require('./event/trans-message'),
              InfoReceiver = require('./info-receiver');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:main');
          }
  
          var transports; // follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
  
          function SockJS(url, protocols, options) {
            if (!(this instanceof SockJS)) {
              return new SockJS(url, protocols, options);
            }
  
            if (arguments.length < 1) {
              throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
            }
  
            EventTarget.call(this);
            this.readyState = SockJS.CONNECTING;
            this.extensions = '';
            this.protocol = ''; // non-standard extension
  
            options = options || {};
  
            if (options.protocols_whitelist) {
              log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
            }
  
            this._transportsWhitelist = options.transports;
            this._transportOptions = options.transportOptions || {};
            this._timeout = options.timeout || 0;
            var sessionId = options.sessionId || 8;
  
            if (typeof sessionId === 'function') {
              this._generateSessionId = sessionId;
            } else if (typeof sessionId === 'number') {
              this._generateSessionId = function () {
                return random.string(sessionId);
              };
            } else {
              throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
            }
  
            this._server = options.server || random.numberString(1000); // Step 1 of WS spec - parse and validate the url. Issue #8
  
            var parsedUrl = new URL(url);
  
            if (!parsedUrl.host || !parsedUrl.protocol) {
              throw new SyntaxError("The URL '" + url + "' is invalid");
            } else if (parsedUrl.hash) {
              throw new SyntaxError('The URL must not contain a fragment');
            } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
              throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
            }
  
            var secure = parsedUrl.protocol === 'https:'; // Step 2 - don't allow secure origin with an insecure protocol
  
            if (loc.protocol === 'https:' && !secure) {
              // exception is 127.0.0.0/8 and ::1 urls
              if (!urlUtils.isLoopbackAddr(parsedUrl.hostname)) {
                throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
              }
            } // Step 3 - check port access - no need here
            // Step 4 - parse protocols argument
  
  
            if (!protocols) {
              protocols = [];
            } else if (!Array.isArray(protocols)) {
              protocols = [protocols];
            } // Step 5 - check protocols argument
  
  
            var sortedProtocols = protocols.sort();
            sortedProtocols.forEach(function (proto, i) {
              if (!proto) {
                throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
              }
  
              if (i < sortedProtocols.length - 1 && proto === sortedProtocols[i + 1]) {
                throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
              }
            }); // Step 6 - convert origin
  
            var o = urlUtils.getOrigin(loc.href);
            this._origin = o ? o.toLowerCase() : null; // remove the trailing slash
  
            parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, '')); // store the sanitized url
  
            this.url = parsedUrl.href;
            debug('using url', this.url); // Step 7 - start connection in background
            // obtain server info
            // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  
            this._urlInfo = {
              nullOrigin: !browser.hasDomain(),
              sameOrigin: urlUtils.isOriginEqual(this.url, loc.href),
              sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
            };
            this._ir = new InfoReceiver(this.url, this._urlInfo);
  
            this._ir.once('finish', this._receiveInfo.bind(this));
          }
  
          inherits(SockJS, EventTarget);
  
          function userSetCode(code) {
            return code === 1000 || code >= 3000 && code <= 4999;
          }
  
          SockJS.prototype.close = function (code, reason) {
            // Step 1
            if (code && !userSetCode(code)) {
              throw new Error('InvalidAccessError: Invalid code');
            } // Step 2.4 states the max is 123 bytes, but we are just checking length
  
  
            if (reason && reason.length > 123) {
              throw new SyntaxError('reason argument has an invalid length');
            } // Step 3.1
  
  
            if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
              return;
            } // TODO look at docs to determine how to set this
  
  
            var wasClean = true;
  
            this._close(code || 1000, reason || 'Normal closure', wasClean);
          };
  
          SockJS.prototype.send = function (data) {
            // #13 - convert anything non-string to string
            // TODO this currently turns objects into [object Object]
            if (typeof data !== 'string') {
              data = '' + data;
            }
  
            if (this.readyState === SockJS.CONNECTING) {
              throw new Error('InvalidStateError: The connection has not been established yet');
            }
  
            if (this.readyState !== SockJS.OPEN) {
              return;
            }
  
            this._transport.send(escape.quote(data));
          };
  
          SockJS.version = require('./version');
          SockJS.CONNECTING = 0;
          SockJS.OPEN = 1;
          SockJS.CLOSING = 2;
          SockJS.CLOSED = 3;
  
          SockJS.prototype._receiveInfo = function (info, rtt) {
            debug('_receiveInfo', rtt);
            this._ir = null;
  
            if (!info) {
              this._close(1002, 'Cannot connect to server');
  
              return;
            } // establish a round-trip timeout (RTO) based on the
            // round-trip time (RTT)
  
  
            this._rto = this.countRTO(rtt); // allow server to override url used for the actual transport
  
            this._transUrl = info.base_url ? info.base_url : this.url;
            info = objectUtils.extend(info, this._urlInfo);
            debug('info', info); // determine list of desired and supported transports
  
            var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
            this._transports = enabledTransports.main;
            debug(this._transports.length + ' enabled transports');
  
            this._connect();
          };
  
          SockJS.prototype._connect = function () {
            for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
              debug('attempt', Transport.transportName);
  
              if (Transport.needBody) {
                if (!global.document.body || typeof global.document.readyState !== 'undefined' && global.document.readyState !== 'complete' && global.document.readyState !== 'interactive') {
                  debug('waiting for body');
  
                  this._transports.unshift(Transport);
  
                  eventUtils.attachEvent('load', this._connect.bind(this));
                  return;
                }
              } // calculate timeout based on RTO and round trips. Default to 5s
  
  
              var timeoutMs = Math.max(this._timeout, this._rto * Transport.roundTrips || 5000);
              this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
              debug('using timeout', timeoutMs);
              var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
              var options = this._transportOptions[Transport.transportName];
              debug('transport url', transportUrl);
              var transportObj = new Transport(transportUrl, this._transUrl, options);
              transportObj.on('message', this._transportMessage.bind(this));
              transportObj.once('close', this._transportClose.bind(this));
              transportObj.transportName = Transport.transportName;
              this._transport = transportObj;
              return;
            }
  
            this._close(2000, 'All transports failed', false);
          };
  
          SockJS.prototype._transportTimeout = function () {
            debug('_transportTimeout');
  
            if (this.readyState === SockJS.CONNECTING) {
              if (this._transport) {
                this._transport.close();
              }
  
              this._transportClose(2007, 'Transport timed out');
            }
          };
  
          SockJS.prototype._transportMessage = function (msg) {
            debug('_transportMessage', msg);
            var self = this,
                type = msg.slice(0, 1),
                content = msg.slice(1),
                payload; // first check for messages that don't need a payload
  
            switch (type) {
              case 'o':
                this._open();
  
                return;
  
              case 'h':
                this.dispatchEvent(new Event('heartbeat'));
                debug('heartbeat', this.transport);
                return;
            }
  
            if (content) {
              try {
                payload = JSON3.parse(content);
              } catch (e) {
                debug('bad json', content);
              }
            }
  
            if (typeof payload === 'undefined') {
              debug('empty payload', content);
              return;
            }
  
            switch (type) {
              case 'a':
                if (Array.isArray(payload)) {
                  payload.forEach(function (p) {
                    debug('message', self.transport, p);
                    self.dispatchEvent(new TransportMessageEvent(p));
                  });
                }
  
                break;
  
              case 'm':
                debug('message', this.transport, payload);
                this.dispatchEvent(new TransportMessageEvent(payload));
                break;
  
              case 'c':
                if (Array.isArray(payload) && payload.length === 2) {
                  this._close(payload[0], payload[1], true);
                }
  
                break;
            }
          };
  
          SockJS.prototype._transportClose = function (code, reason) {
            debug('_transportClose', this.transport, code, reason);
  
            if (this._transport) {
              this._transport.removeAllListeners();
  
              this._transport = null;
              this.transport = null;
            }
  
            if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
              this._connect();
  
              return;
            }
  
            this._close(code, reason);
          };
  
          SockJS.prototype._open = function () {
            debug('_open', this._transport && this._transport.transportName, this.readyState);
  
            if (this.readyState === SockJS.CONNECTING) {
              if (this._transportTimeoutId) {
                clearTimeout(this._transportTimeoutId);
                this._transportTimeoutId = null;
              }
  
              this.readyState = SockJS.OPEN;
              this.transport = this._transport.transportName;
              this.dispatchEvent(new Event('open'));
              debug('connected', this.transport);
            } else {
              // The server might have been restarted, and lost track of our
              // connection.
              this._close(1006, 'Server lost session');
            }
          };
  
          SockJS.prototype._close = function (code, reason, wasClean) {
            debug('_close', this.transport, code, reason, wasClean, this.readyState);
            var forceFail = false;
  
            if (this._ir) {
              forceFail = true;
  
              this._ir.close();
  
              this._ir = null;
            }
  
            if (this._transport) {
              this._transport.close();
  
              this._transport = null;
              this.transport = null;
            }
  
            if (this.readyState === SockJS.CLOSED) {
              throw new Error('InvalidStateError: SockJS has already been closed');
            }
  
            this.readyState = SockJS.CLOSING;
            setTimeout(function () {
              this.readyState = SockJS.CLOSED;
  
              if (forceFail) {
                this.dispatchEvent(new Event('error'));
              }
  
              var e = new CloseEvent('close');
              e.wasClean = wasClean || false;
              e.code = code || 1000;
              e.reason = reason;
              this.dispatchEvent(e);
              this.onmessage = this.onclose = this.onerror = null;
              debug('disconnected');
            }.bind(this), 0);
          }; // See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
          // and RFC 2988.
  
  
          SockJS.prototype.countRTO = function (rtt) {
            // In a local environment, when using IE8/9 and the `jsonp-polling`
            // transport the time needed to establish a connection (the time that pass
            // from the opening of the transport to the call of `_dispatchOpen`) is
            // around 200msec (the lower bound used in the article above) and this
            // causes spurious timeouts. For this reason we calculate a value slightly
            // larger than that used in the article.
            if (rtt > 100) {
              return 4 * rtt; // rto > 400msec
            }
  
            return 300 + rtt; // 300msec < rto <= 400msec
          };
  
          module.exports = function (availableTransports) {
            transports = transport(availableTransports);
  
            require('./iframe-bootstrap')(SockJS, availableTransports);
  
            return SockJS;
          };
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./event/close": 2,
        "./event/event": 4,
        "./event/eventtarget": 5,
        "./event/trans-message": 6,
        "./iframe-bootstrap": 8,
        "./info-receiver": 12,
        "./location": 13,
        "./shims": 15,
        "./utils/browser": 44,
        "./utils/escape": 45,
        "./utils/event": 46,
        "./utils/log": 48,
        "./utils/object": 49,
        "./utils/random": 50,
        "./utils/transport": 51,
        "./utils/url": 52,
        "./version": 53,
        "debug": 55,
        "inherits": 57,
        "json3": 58,
        "url-parse": 61
      }],
      15: [function (require, module, exports) {
        /* eslint-disable */
  
        /* jscs: disable */
        'use strict'; // pulled specific shims from https://github.com/es-shims/es5-shim
  
        var ArrayPrototype = Array.prototype;
        var ObjectPrototype = Object.prototype;
        var FunctionPrototype = Function.prototype;
        var StringPrototype = String.prototype;
        var array_slice = ArrayPrototype.slice;
        var _toString = ObjectPrototype.toString;
  
        var isFunction = function (val) {
          return ObjectPrototype.toString.call(val) === '[object Function]';
        };
  
        var isArray = function isArray(obj) {
          return _toString.call(obj) === '[object Array]';
        };
  
        var isString = function isString(obj) {
          return _toString.call(obj) === '[object String]';
        };
  
        var supportsDescriptors = Object.defineProperty && function () {
          try {
            Object.defineProperty({}, 'x', {});
            return true;
          } catch (e) {
            /* this is ES3 */
            return false;
          }
        }(); // Define configurable, writable and non-enumerable props
        // if they don't exist.
  
  
        var defineProperty;
  
        if (supportsDescriptors) {
          defineProperty = function (object, name, method, forceAssign) {
            if (!forceAssign && name in object) {
              return;
            }
  
            Object.defineProperty(object, name, {
              configurable: true,
              enumerable: false,
              writable: true,
              value: method
            });
          };
        } else {
          defineProperty = function (object, name, method, forceAssign) {
            if (!forceAssign && name in object) {
              return;
            }
  
            object[name] = method;
          };
        }
  
        var defineProperties = function (object, map, forceAssign) {
          for (var name in map) {
            if (ObjectPrototype.hasOwnProperty.call(map, name)) {
              defineProperty(object, name, map[name], forceAssign);
            }
          }
        };
  
        var toObject = function (o) {
          if (o == null) {
            // this matches both null and undefined
            throw new TypeError("can't convert " + o + ' to object');
          }
  
          return Object(o);
        }; //
        // Util
        // ======
        //
        // ES5 9.4
        // http://es5.github.com/#x9.4
        // http://jsperf.com/to-integer
  
  
        function toInteger(num) {
          var n = +num;
  
          if (n !== n) {
            // isNaN
            n = 0;
          } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
  
          return n;
        }
  
        function ToUint32(x) {
          return x >>> 0;
        } //
        // Function
        // ========
        //
        // ES-5 15.3.4.5
        // http://es5.github.com/#x15.3.4.5
  
  
        function Empty() {}
  
        defineProperties(FunctionPrototype, {
          bind: function bind(that) {
            // .length is 1
            // 1. Let Target be the this value.
            var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.
  
            if (!isFunction(target)) {
              throw new TypeError('Function.prototype.bind called on incompatible ' + target);
            } // 3. Let A be a new (possibly empty) internal list of all of the
            //   argument values provided after thisArg (arg1, arg2 etc), in order.
            // XXX slicedArgs will stand in for "A" if used
  
  
            var args = array_slice.call(arguments, 1); // for normal call
            // 4. Let F be a new native ECMAScript object.
            // 11. Set the [[Prototype]] internal property of F to the standard
            //   built-in Function prototype object as specified in 15.3.3.1.
            // 12. Set the [[Call]] internal property of F as described in
            //   15.3.4.5.1.
            // 13. Set the [[Construct]] internal property of F as described in
            //   15.3.4.5.2.
            // 14. Set the [[HasInstance]] internal property of F as described in
            //   15.3.4.5.3.
  
            var binder = function () {
              if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.
                var result = target.apply(this, args.concat(array_slice.call(arguments)));
  
                if (Object(result) === result) {
                  return result;
                }
  
                return this;
              } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.
                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(that, args.concat(array_slice.call(arguments)));
              }
            }; // 15. If the [[Class]] internal property of Target is "Function", then
            //     a. Let L be the length property of Target minus the length of A.
            //     b. Set the length own property of F to either 0 or L, whichever is
            //       larger.
            // 16. Else set the length own property of F to 0.
  
  
            var boundLength = Math.max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
            //   specified in 15.3.5.1.
  
            var boundArgs = [];
  
            for (var i = 0; i < boundLength; i++) {
              boundArgs.push('$' + i);
            } // XXX Build a dynamic function with desired amount of arguments is the only
            // way to set the length property of a function.
            // In environments where Content Security Policies enabled (Chrome extensions,
            // for ex.) all use of eval or Function costructor throws an exception.
            // However in all of these environments Function.prototype.bind exists
            // and so this code will never be executed.
  
  
            var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
  
            if (target.prototype) {
              Empty.prototype = target.prototype;
              bound.prototype = new Empty(); // Clean up dangling references.
  
              Empty.prototype = null;
            } // TODO
            // 18. Set the [[Extensible]] internal property of F to true.
            // TODO
            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
            // 20. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
            //   false.
            // 21. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
            //   and false.
            // TODO
            // NOTE Function objects created using Function.prototype.bind do not
            // have a prototype property or the [[Code]], [[FormalParameters]], and
            // [[Scope]] internal properties.
            // XXX can't delete prototype in pure-js.
            // 22. Return F.
  
  
            return bound;
          }
        }); //
        // Array
        // =====
        //
        // ES5 15.4.3.2
        // http://es5.github.com/#x15.4.3.2
        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
  
        defineProperties(Array, {
          isArray: isArray
        });
        var boxedString = Object('a');
        var splitString = boxedString[0] !== 'a' || !(0 in boxedString);
  
        var properlyBoxesContext = function properlyBoxed(method) {
          // Check node 0.6.21 bug where third parameter is not boxed
          var properlyBoxesNonStrict = true;
          var properlyBoxesStrict = true;
  
          if (method) {
            method.call('foo', function (_, __, context) {
              if (typeof context !== 'object') {
                properlyBoxesNonStrict = false;
              }
            });
            method.call([1], function () {
              'use strict';
  
              properlyBoxesStrict = typeof this === 'string';
            }, 'x');
          }
  
          return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
        };
  
        defineProperties(ArrayPrototype, {
          forEach: function forEach(fun
          /*, thisp*/
          ) {
            var object = toObject(this),
                self = splitString && isString(this) ? this.split('') : object,
                thisp = arguments[1],
                i = -1,
                length = self.length >>> 0; // If no callback function or if callback is not a callable function
  
            if (!isFunction(fun)) {
              throw new TypeError(); // TODO message
            }
  
            while (++i < length) {
              if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
              }
            }
          }
        }, !properlyBoxesContext(ArrayPrototype.forEach)); // ES5 15.4.4.14
        // http://es5.github.com/#x15.4.4.14
        // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
  
        var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
        defineProperties(ArrayPrototype, {
          indexOf: function indexOf(sought
          /*, fromIndex */
          ) {
            var self = splitString && isString(this) ? this.split('') : toObject(this),
                length = self.length >>> 0;
  
            if (!length) {
              return -1;
            }
  
            var i = 0;
  
            if (arguments.length > 1) {
              i = toInteger(arguments[1]);
            } // handle negative indices
  
  
            i = i >= 0 ? i : Math.max(0, length + i);
  
            for (; i < length; i++) {
              if (i in self && self[i] === sought) {
                return i;
              }
            }
  
            return -1;
          }
        }, hasFirefox2IndexOfBug); //
        // String
        // ======
        //
        // ES5 15.5.4.14
        // http://es5.github.com/#x15.5.4.14
        // [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
        // Many browsers do not split properly with regular expressions or they
        // do not perform the split correctly under obscure conditions.
        // See http://blog.stevenlevithan.com/archives/cross-browser-split
        // I've tested in many browsers and this seems to cover the deviant ones:
        //    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
        //    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
        //    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
        //       [undefined, "t", undefined, "e", ...]
        //    ''.split(/.?/) should be [], not [""]
        //    '.'.split(/()()/) should be ["."], not ["", "", "."]
  
        var string_split = StringPrototype.split;
  
        if ('ab'.split(/(?:ab)*/).length !== 2 || '.'.split(/(.?)(.?)/).length !== 4 || 'tesst'.split(/(s)*/)[1] === 't' || 'test'.split(/(?:)/, -1).length !== 4 || ''.split(/.?/).length || '.'.split(/()()/).length > 1) {
          (function () {
            var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group
  
            StringPrototype.split = function (separator, limit) {
              var string = this;
  
              if (separator === void 0 && limit === 0) {
                return [];
              } // If `separator` is not a regex, use native split
  
  
              if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
              }
  
              var output = [],
                  flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.extended ? 'x' : '') + ( // Proposed for ES6
              separator.sticky ? 'y' : ''),
                  // Firefox 3+
              lastLastIndex = 0,
                  // Make `global` and avoid `lastIndex` issues by working with a copy
              separator2,
                  match,
                  lastIndex,
                  lastLength;
              separator = new RegExp(separator.source, flags + 'g');
              string += ''; // Type-convert
  
              if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
              }
              /* Values for `limit`, per the spec:
               * If undefined: 4294967295 // Math.pow(2, 32) - 1
               * If 0, Infinity, or NaN: 0
               * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
               * If negative number: 4294967296 - Math.floor(Math.abs(limit))
               * If other: Type-convert, then use the above rules
               */
  
  
              limit = limit === void 0 ? -1 >>> 0 : // Math.pow(2, 32) - 1
              ToUint32(limit);
  
              while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
  
                if (lastIndex > lastLastIndex) {
                  output.push(string.slice(lastLastIndex, match.index)); // Fix browsers whose `exec` methods don't consistently return `undefined` for
                  // nonparticipating capturing groups
  
                  if (!compliantExecNpcg && match.length > 1) {
                    match[0].replace(separator2, function () {
                      for (var i = 1; i < arguments.length - 2; i++) {
                        if (arguments[i] === void 0) {
                          match[i] = void 0;
                        }
                      }
                    });
                  }
  
                  if (match.length > 1 && match.index < string.length) {
                    ArrayPrototype.push.apply(output, match.slice(1));
                  }
  
                  lastLength = match[0].length;
                  lastLastIndex = lastIndex;
  
                  if (output.length >= limit) {
                    break;
                  }
                }
  
                if (separator.lastIndex === match.index) {
                  separator.lastIndex++; // Avoid an infinite loop
                }
              }
  
              if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                  output.push('');
                }
              } else {
                output.push(string.slice(lastLastIndex));
              }
  
              return output.length > limit ? output.slice(0, limit) : output;
            };
          })(); // [bugfix, chrome]
          // If separator is undefined, then the result array contains just one String,
          // which is the this value (converted to a String). If limit is not undefined,
          // then the output array is truncated so that it contains no more than limit
          // elements.
          // "0".split(undefined, 0) -> []
  
        } else if ('0'.split(void 0, 0).length) {
          StringPrototype.split = function split(separator, limit) {
            if (separator === void 0 && limit === 0) {
              return [];
            }
  
            return string_split.call(this, separator, limit);
          };
        } // ECMA-262, 3rd B.2.3
        // Not an ECMAScript standard, although ECMAScript 3rd Edition has a
        // non-normative section suggesting uniform semantics and it should be
        // normalized across all browsers
        // [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
  
  
        var string_substr = StringPrototype.substr;
        var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
        defineProperties(StringPrototype, {
          substr: function substr(start, length) {
            return string_substr.call(this, start < 0 ? (start = this.length + start) < 0 ? 0 : start : start, length);
          }
        }, hasNegativeSubstrBug);
      }, {}],
      16: [function (require, module, exports) {
        'use strict';
  
        module.exports = [// streaming transports
        require('./transport/websocket'), require('./transport/xhr-streaming'), require('./transport/xdr-streaming'), require('./transport/eventsource'), require('./transport/lib/iframe-wrap')(require('./transport/eventsource')) // polling transports
        , require('./transport/htmlfile'), require('./transport/lib/iframe-wrap')(require('./transport/htmlfile')), require('./transport/xhr-polling'), require('./transport/xdr-polling'), require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling')), require('./transport/jsonp-polling')];
      }, {
        "./transport/eventsource": 20,
        "./transport/htmlfile": 21,
        "./transport/jsonp-polling": 23,
        "./transport/lib/iframe-wrap": 26,
        "./transport/websocket": 38,
        "./transport/xdr-polling": 39,
        "./transport/xdr-streaming": 40,
        "./transport/xhr-polling": 41,
        "./transport/xhr-streaming": 42
      }],
      17: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          var EventEmitter = require('events').EventEmitter,
              inherits = require('inherits'),
              utils = require('../../utils/event'),
              urlUtils = require('../../utils/url'),
              XHR = global.XMLHttpRequest;
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:browser:xhr');
          }
  
          function AbstractXHRObject(method, url, payload, opts) {
            debug(method, url);
            var self = this;
            EventEmitter.call(this);
            setTimeout(function () {
              self._start(method, url, payload, opts);
            }, 0);
          }
  
          inherits(AbstractXHRObject, EventEmitter);
  
          AbstractXHRObject.prototype._start = function (method, url, payload, opts) {
            var self = this;
  
            try {
              this.xhr = new XHR();
            } catch (x) {// intentionally empty
            }
  
            if (!this.xhr) {
              debug('no xhr');
              this.emit('finish', 0, 'no xhr support');
  
              this._cleanup();
  
              return;
            } // several browsers cache POSTs
  
  
            url = urlUtils.addQuery(url, 't=' + +new Date()); // Explorer tends to keep connection open, even after the
            // tab gets closed: http://bugs.jquery.com/ticket/5280
  
            this.unloadRef = utils.unloadAdd(function () {
              debug('unload cleanup');
  
              self._cleanup(true);
            });
  
            try {
              this.xhr.open(method, url, true);
  
              if (this.timeout && 'timeout' in this.xhr) {
                this.xhr.timeout = this.timeout;
  
                this.xhr.ontimeout = function () {
                  debug('xhr timeout');
                  self.emit('finish', 0, '');
  
                  self._cleanup(false);
                };
              }
            } catch (e) {
              debug('exception', e); // IE raises an exception on wrong port.
  
              this.emit('finish', 0, '');
  
              this._cleanup(false);
  
              return;
            }
  
            if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
              debug('withCredentials'); // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
              // "This never affects same-site requests."
  
              this.xhr.withCredentials = true;
            }
  
            if (opts && opts.headers) {
              for (var key in opts.headers) {
                this.xhr.setRequestHeader(key, opts.headers[key]);
              }
            }
  
            this.xhr.onreadystatechange = function () {
              if (self.xhr) {
                var x = self.xhr;
                var text, status;
                debug('readyState', x.readyState);
  
                switch (x.readyState) {
                  case 3:
                    // IE doesn't like peeking into responseText or status
                    // on Microsoft.XMLHTTP and readystate=3
                    try {
                      status = x.status;
                      text = x.responseText;
                    } catch (e) {// intentionally empty
                    }
  
                    debug('status', status); // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
  
                    if (status === 1223) {
                      status = 204;
                    } // IE does return readystate == 3 for 404 answers.
  
  
                    if (status === 200 && text && text.length > 0) {
                      debug('chunk');
                      self.emit('chunk', status, text);
                    }
  
                    break;
  
                  case 4:
                    status = x.status;
                    debug('status', status); // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
  
                    if (status === 1223) {
                      status = 204;
                    } // IE returns this for a bad port
                    // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
  
  
                    if (status === 12005 || status === 12029) {
                      status = 0;
                    }
  
                    debug('finish', status, x.responseText);
                    self.emit('finish', status, x.responseText);
  
                    self._cleanup(false);
  
                    break;
                }
              }
            };
  
            try {
              self.xhr.send(payload);
            } catch (e) {
              self.emit('finish', 0, '');
  
              self._cleanup(false);
            }
          };
  
          AbstractXHRObject.prototype._cleanup = function (abort) {
            debug('cleanup');
  
            if (!this.xhr) {
              return;
            }
  
            this.removeAllListeners();
            utils.unloadDel(this.unloadRef); // IE needs this field to be a function
  
            this.xhr.onreadystatechange = function () {};
  
            if (this.xhr.ontimeout) {
              this.xhr.ontimeout = null;
            }
  
            if (abort) {
              try {
                this.xhr.abort();
              } catch (x) {// intentionally empty
              }
            }
  
            this.unloadRef = this.xhr = null;
          };
  
          AbstractXHRObject.prototype.close = function () {
            debug('close');
  
            this._cleanup(true);
          };
  
          AbstractXHRObject.enabled = !!XHR; // override XMLHttpRequest for IE6/7
          // obfuscate to avoid firewalls
  
          var axo = ['Active'].concat('Object').join('X');
  
          if (!AbstractXHRObject.enabled && axo in global) {
            debug('overriding xmlhttprequest');
  
            XHR = function () {
              try {
                return new global[axo]('Microsoft.XMLHTTP');
              } catch (e) {
                return null;
              }
            };
  
            AbstractXHRObject.enabled = !!new XHR();
          }
  
          var cors = false;
  
          try {
            cors = 'withCredentials' in new XHR();
          } catch (ignored) {// intentionally empty
          }
  
          AbstractXHRObject.supportsCORS = cors;
          module.exports = AbstractXHRObject;
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "../../utils/event": 46,
        "../../utils/url": 52,
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      18: [function (require, module, exports) {
        (function (global) {
          module.exports = global.EventSource;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      19: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          var Driver = global.WebSocket || global.MozWebSocket;
  
          if (Driver) {
            module.exports = function WebSocketBrowserDriver(url) {
              return new Driver(url);
            };
          } else {
            module.exports = undefined;
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      20: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            AjaxBasedTransport = require('./lib/ajax-based'),
            EventSourceReceiver = require('./receiver/eventsource'),
            XHRCorsObject = require('./sender/xhr-cors'),
            EventSourceDriver = require('eventsource');
  
        function EventSourceTransport(transUrl) {
          if (!EventSourceTransport.enabled()) {
            throw new Error('Transport created when disabled');
          }
  
          AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
        }
  
        inherits(EventSourceTransport, AjaxBasedTransport);
  
        EventSourceTransport.enabled = function () {
          return !!EventSourceDriver;
        };
  
        EventSourceTransport.transportName = 'eventsource';
        EventSourceTransport.roundTrips = 2;
        module.exports = EventSourceTransport;
      }, {
        "./lib/ajax-based": 24,
        "./receiver/eventsource": 29,
        "./sender/xhr-cors": 35,
        "eventsource": 18,
        "inherits": 57
      }],
      21: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            HtmlfileReceiver = require('./receiver/htmlfile'),
            XHRLocalObject = require('./sender/xhr-local'),
            AjaxBasedTransport = require('./lib/ajax-based');
  
        function HtmlFileTransport(transUrl) {
          if (!HtmlfileReceiver.enabled) {
            throw new Error('Transport created when disabled');
          }
  
          AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
        }
  
        inherits(HtmlFileTransport, AjaxBasedTransport);
  
        HtmlFileTransport.enabled = function (info) {
          return HtmlfileReceiver.enabled && info.sameOrigin;
        };
  
        HtmlFileTransport.transportName = 'htmlfile';
        HtmlFileTransport.roundTrips = 2;
        module.exports = HtmlFileTransport;
      }, {
        "./lib/ajax-based": 24,
        "./receiver/htmlfile": 30,
        "./sender/xhr-local": 37,
        "inherits": 57
      }],
      22: [function (require, module, exports) {
        (function (process) {
          'use strict'; // Few cool transports do work only for same-origin. In order to make
          // them work cross-domain we shall use iframe, served from the
          // remote domain. New browsers have capabilities to communicate with
          // cross domain iframe using postMessage(). In IE it was implemented
          // from IE 8+, but of course, IE got some details wrong:
          //    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
          //    http://stevesouders.com/misc/test-postmessage.php
  
          var inherits = require('inherits'),
              JSON3 = require('json3'),
              EventEmitter = require('events').EventEmitter,
              version = require('../version'),
              urlUtils = require('../utils/url'),
              iframeUtils = require('../utils/iframe'),
              eventUtils = require('../utils/event'),
              random = require('../utils/random');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:transport:iframe');
          }
  
          function IframeTransport(transport, transUrl, baseUrl) {
            if (!IframeTransport.enabled()) {
              throw new Error('Transport created when disabled');
            }
  
            EventEmitter.call(this);
            var self = this;
            this.origin = urlUtils.getOrigin(baseUrl);
            this.baseUrl = baseUrl;
            this.transUrl = transUrl;
            this.transport = transport;
            this.windowId = random.string(8);
            var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
            debug(transport, transUrl, iframeUrl);
            this.iframeObj = iframeUtils.createIframe(iframeUrl, function (r) {
              debug('err callback');
              self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
              self.close();
            });
            this.onmessageCallback = this._message.bind(this);
            eventUtils.attachEvent('message', this.onmessageCallback);
          }
  
          inherits(IframeTransport, EventEmitter);
  
          IframeTransport.prototype.close = function () {
            debug('close');
            this.removeAllListeners();
  
            if (this.iframeObj) {
              eventUtils.detachEvent('message', this.onmessageCallback);
  
              try {
                // When the iframe is not loaded, IE raises an exception
                // on 'contentWindow'.
                this.postMessage('c');
              } catch (x) {// intentionally empty
              }
  
              this.iframeObj.cleanup();
              this.iframeObj = null;
              this.onmessageCallback = this.iframeObj = null;
            }
          };
  
          IframeTransport.prototype._message = function (e) {
            debug('message', e.data);
  
            if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
              debug('not same origin', e.origin, this.origin);
              return;
            }
  
            var iframeMessage;
  
            try {
              iframeMessage = JSON3.parse(e.data);
            } catch (ignored) {
              debug('bad json', e.data);
              return;
            }
  
            if (iframeMessage.windowId !== this.windowId) {
              debug('mismatched window id', iframeMessage.windowId, this.windowId);
              return;
            }
  
            switch (iframeMessage.type) {
              case 's':
                this.iframeObj.loaded(); // window global dependency
  
                this.postMessage('s', JSON3.stringify([version, this.transport, this.transUrl, this.baseUrl]));
                break;
  
              case 't':
                this.emit('message', iframeMessage.data);
                break;
  
              case 'c':
                var cdata;
  
                try {
                  cdata = JSON3.parse(iframeMessage.data);
                } catch (ignored) {
                  debug('bad json', iframeMessage.data);
                  return;
                }
  
                this.emit('close', cdata[0], cdata[1]);
                this.close();
                break;
            }
          };
  
          IframeTransport.prototype.postMessage = function (type, data) {
            debug('postMessage', type, data);
            this.iframeObj.post(JSON3.stringify({
              windowId: this.windowId,
              type: type,
              data: data || ''
            }), this.origin);
          };
  
          IframeTransport.prototype.send = function (message) {
            debug('send', message);
            this.postMessage('m', message);
          };
  
          IframeTransport.enabled = function () {
            return iframeUtils.iframeEnabled;
          };
  
          IframeTransport.transportName = 'iframe';
          IframeTransport.roundTrips = 2;
          module.exports = IframeTransport;
        }).call(this, {
          env: {}
        });
      }, {
        "../utils/event": 46,
        "../utils/iframe": 47,
        "../utils/random": 50,
        "../utils/url": 52,
        "../version": 53,
        "debug": 55,
        "events": 3,
        "inherits": 57,
        "json3": 58
      }],
      23: [function (require, module, exports) {
        (function (global) {
          'use strict'; // The simplest and most robust transport, using the well-know cross
          // domain hack - JSONP. This transport is quite inefficient - one
          // message could use up to one http request. But at least it works almost
          // everywhere.
          // Known limitations:
          //   o you will get a spinning cursor
          //   o for Konqueror a dumb timer is needed to detect errors
  
          var inherits = require('inherits'),
              SenderReceiver = require('./lib/sender-receiver'),
              JsonpReceiver = require('./receiver/jsonp'),
              jsonpSender = require('./sender/jsonp');
  
          function JsonPTransport(transUrl) {
            if (!JsonPTransport.enabled()) {
              throw new Error('Transport created when disabled');
            }
  
            SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
          }
  
          inherits(JsonPTransport, SenderReceiver);
  
          JsonPTransport.enabled = function () {
            return !!global.document;
          };
  
          JsonPTransport.transportName = 'jsonp-polling';
          JsonPTransport.roundTrips = 1;
          JsonPTransport.needBody = true;
          module.exports = JsonPTransport;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./lib/sender-receiver": 28,
        "./receiver/jsonp": 31,
        "./sender/jsonp": 33,
        "inherits": 57
      }],
      24: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var inherits = require('inherits'),
              urlUtils = require('../../utils/url'),
              SenderReceiver = require('./sender-receiver');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:ajax-based');
          }
  
          function createAjaxSender(AjaxObject) {
            return function (url, payload, callback) {
              debug('create ajax sender', url, payload);
              var opt = {};
  
              if (typeof payload === 'string') {
                opt.headers = {
                  'Content-type': 'text/plain'
                };
              }
  
              var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
              var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
              xo.once('finish', function (status) {
                debug('finish', status);
                xo = null;
  
                if (status !== 200 && status !== 204) {
                  return callback(new Error('http status ' + status));
                }
  
                callback();
              });
              return function () {
                debug('abort');
                xo.close();
                xo = null;
                var err = new Error('Aborted');
                err.code = 1000;
                callback(err);
              };
            };
          }
  
          function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
            SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
          }
  
          inherits(AjaxBasedTransport, SenderReceiver);
          module.exports = AjaxBasedTransport;
        }).call(this, {
          env: {}
        });
      }, {
        "../../utils/url": 52,
        "./sender-receiver": 28,
        "debug": 55,
        "inherits": 57
      }],
      25: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var inherits = require('inherits'),
              EventEmitter = require('events').EventEmitter;
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:buffered-sender');
          }
  
          function BufferedSender(url, sender) {
            debug(url);
            EventEmitter.call(this);
            this.sendBuffer = [];
            this.sender = sender;
            this.url = url;
          }
  
          inherits(BufferedSender, EventEmitter);
  
          BufferedSender.prototype.send = function (message) {
            debug('send', message);
            this.sendBuffer.push(message);
  
            if (!this.sendStop) {
              this.sendSchedule();
            }
          }; // For polling transports in a situation when in the message callback,
          // new message is being send. If the sending connection was started
          // before receiving one, it is possible to saturate the network and
          // timeout due to the lack of receiving socket. To avoid that we delay
          // sending messages by some small time, in order to let receiving
          // connection be started beforehand. This is only a halfmeasure and
          // does not fix the big problem, but it does make the tests go more
          // stable on slow networks.
  
  
          BufferedSender.prototype.sendScheduleWait = function () {
            debug('sendScheduleWait');
            var self = this;
            var tref;
  
            this.sendStop = function () {
              debug('sendStop');
              self.sendStop = null;
              clearTimeout(tref);
            };
  
            tref = setTimeout(function () {
              debug('timeout');
              self.sendStop = null;
              self.sendSchedule();
            }, 25);
          };
  
          BufferedSender.prototype.sendSchedule = function () {
            debug('sendSchedule', this.sendBuffer.length);
            var self = this;
  
            if (this.sendBuffer.length > 0) {
              var payload = '[' + this.sendBuffer.join(',') + ']';
              this.sendStop = this.sender(this.url, payload, function (err) {
                self.sendStop = null;
  
                if (err) {
                  debug('error', err);
                  self.emit('close', err.code || 1006, 'Sending error: ' + err);
                  self.close();
                } else {
                  self.sendScheduleWait();
                }
              });
              this.sendBuffer = [];
            }
          };
  
          BufferedSender.prototype._cleanup = function () {
            debug('_cleanup');
            this.removeAllListeners();
          };
  
          BufferedSender.prototype.close = function () {
            debug('close');
  
            this._cleanup();
  
            if (this.sendStop) {
              this.sendStop();
              this.sendStop = null;
            }
          };
  
          module.exports = BufferedSender;
        }).call(this, {
          env: {}
        });
      }, {
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      26: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          var inherits = require('inherits'),
              IframeTransport = require('../iframe'),
              objectUtils = require('../../utils/object');
  
          module.exports = function (transport) {
            function IframeWrapTransport(transUrl, baseUrl) {
              IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
            }
  
            inherits(IframeWrapTransport, IframeTransport);
  
            IframeWrapTransport.enabled = function (url, info) {
              if (!global.document) {
                return false;
              }
  
              var iframeInfo = objectUtils.extend({}, info);
              iframeInfo.sameOrigin = true;
              return transport.enabled(iframeInfo) && IframeTransport.enabled();
            };
  
            IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
            IframeWrapTransport.needBody = true;
            IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)
  
            IframeWrapTransport.facadeTransport = transport;
            return IframeWrapTransport;
          };
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "../../utils/object": 49,
        "../iframe": 22,
        "inherits": 57
      }],
      27: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var inherits = require('inherits'),
              EventEmitter = require('events').EventEmitter;
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:polling');
          }
  
          function Polling(Receiver, receiveUrl, AjaxObject) {
            debug(receiveUrl);
            EventEmitter.call(this);
            this.Receiver = Receiver;
            this.receiveUrl = receiveUrl;
            this.AjaxObject = AjaxObject;
  
            this._scheduleReceiver();
          }
  
          inherits(Polling, EventEmitter);
  
          Polling.prototype._scheduleReceiver = function () {
            debug('_scheduleReceiver');
            var self = this;
            var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
            poll.on('message', function (msg) {
              debug('message', msg);
              self.emit('message', msg);
            });
            poll.once('close', function (code, reason) {
              debug('close', code, reason, self.pollIsClosing);
              self.poll = poll = null;
  
              if (!self.pollIsClosing) {
                if (reason === 'network') {
                  self._scheduleReceiver();
                } else {
                  self.emit('close', code || 1006, reason);
                  self.removeAllListeners();
                }
              }
            });
          };
  
          Polling.prototype.abort = function () {
            debug('abort');
            this.removeAllListeners();
            this.pollIsClosing = true;
  
            if (this.poll) {
              this.poll.abort();
            }
          };
  
          module.exports = Polling;
        }).call(this, {
          env: {}
        });
      }, {
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      28: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var inherits = require('inherits'),
              urlUtils = require('../../utils/url'),
              BufferedSender = require('./buffered-sender'),
              Polling = require('./polling');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:sender-receiver');
          }
  
          function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
            var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
            debug(pollUrl);
            var self = this;
            BufferedSender.call(this, transUrl, senderFunc);
            this.poll = new Polling(Receiver, pollUrl, AjaxObject);
            this.poll.on('message', function (msg) {
              debug('poll message', msg);
              self.emit('message', msg);
            });
            this.poll.once('close', function (code, reason) {
              debug('poll close', code, reason);
              self.poll = null;
              self.emit('close', code, reason);
              self.close();
            });
          }
  
          inherits(SenderReceiver, BufferedSender);
  
          SenderReceiver.prototype.close = function () {
            BufferedSender.prototype.close.call(this);
            debug('close');
            this.removeAllListeners();
  
            if (this.poll) {
              this.poll.abort();
              this.poll = null;
            }
          };
  
          module.exports = SenderReceiver;
        }).call(this, {
          env: {}
        });
      }, {
        "../../utils/url": 52,
        "./buffered-sender": 25,
        "./polling": 27,
        "debug": 55,
        "inherits": 57
      }],
      29: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var inherits = require('inherits'),
              EventEmitter = require('events').EventEmitter,
              EventSourceDriver = require('eventsource');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:receiver:eventsource');
          }
  
          function EventSourceReceiver(url) {
            debug(url);
            EventEmitter.call(this);
            var self = this;
            var es = this.es = new EventSourceDriver(url);
  
            es.onmessage = function (e) {
              debug('message', e.data);
              self.emit('message', decodeURI(e.data));
            };
  
            es.onerror = function (e) {
              debug('error', es.readyState, e); // ES on reconnection has readyState = 0 or 1.
              // on network error it's CLOSED = 2
  
              var reason = es.readyState !== 2 ? 'network' : 'permanent';
  
              self._cleanup();
  
              self._close(reason);
            };
          }
  
          inherits(EventSourceReceiver, EventEmitter);
  
          EventSourceReceiver.prototype.abort = function () {
            debug('abort');
  
            this._cleanup();
  
            this._close('user');
          };
  
          EventSourceReceiver.prototype._cleanup = function () {
            debug('cleanup');
            var es = this.es;
  
            if (es) {
              es.onmessage = es.onerror = null;
              es.close();
              this.es = null;
            }
          };
  
          EventSourceReceiver.prototype._close = function (reason) {
            debug('close', reason);
            var self = this; // Safari and chrome < 15 crash if we close window before
            // waiting for ES cleanup. See:
            // https://code.google.com/p/chromium/issues/detail?id=89155
  
            setTimeout(function () {
              self.emit('close', null, reason);
              self.removeAllListeners();
            }, 200);
          };
  
          module.exports = EventSourceReceiver;
        }).call(this, {
          env: {}
        });
      }, {
        "debug": 55,
        "events": 3,
        "eventsource": 18,
        "inherits": 57
      }],
      30: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          var inherits = require('inherits'),
              iframeUtils = require('../../utils/iframe'),
              urlUtils = require('../../utils/url'),
              EventEmitter = require('events').EventEmitter,
              random = require('../../utils/random');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:receiver:htmlfile');
          }
  
          function HtmlfileReceiver(url) {
            debug(url);
            EventEmitter.call(this);
            var self = this;
            iframeUtils.polluteGlobalNamespace();
            this.id = 'a' + random.string(6);
            url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));
            debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
            var constructFunc = HtmlfileReceiver.htmlfileEnabled ? iframeUtils.createHtmlfile : iframeUtils.createIframe;
            global[iframeUtils.WPrefix][this.id] = {
              start: function () {
                debug('start');
                self.iframeObj.loaded();
              },
              message: function (data) {
                debug('message', data);
                self.emit('message', data);
              },
              stop: function () {
                debug('stop');
  
                self._cleanup();
  
                self._close('network');
              }
            };
            this.iframeObj = constructFunc(url, function () {
              debug('callback');
  
              self._cleanup();
  
              self._close('permanent');
            });
          }
  
          inherits(HtmlfileReceiver, EventEmitter);
  
          HtmlfileReceiver.prototype.abort = function () {
            debug('abort');
  
            this._cleanup();
  
            this._close('user');
          };
  
          HtmlfileReceiver.prototype._cleanup = function () {
            debug('_cleanup');
  
            if (this.iframeObj) {
              this.iframeObj.cleanup();
              this.iframeObj = null;
            }
  
            delete global[iframeUtils.WPrefix][this.id];
          };
  
          HtmlfileReceiver.prototype._close = function (reason) {
            debug('_close', reason);
            this.emit('close', null, reason);
            this.removeAllListeners();
          };
  
          HtmlfileReceiver.htmlfileEnabled = false; // obfuscate to avoid firewalls
  
          var axo = ['Active'].concat('Object').join('X');
  
          if (axo in global) {
            try {
              HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
            } catch (x) {// intentionally empty
            }
          }
  
          HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
          module.exports = HtmlfileReceiver;
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "../../utils/iframe": 47,
        "../../utils/random": 50,
        "../../utils/url": 52,
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      31: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          var utils = require('../../utils/iframe'),
              random = require('../../utils/random'),
              browser = require('../../utils/browser'),
              urlUtils = require('../../utils/url'),
              inherits = require('inherits'),
              EventEmitter = require('events').EventEmitter;
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:receiver:jsonp');
          }
  
          function JsonpReceiver(url) {
            debug(url);
            var self = this;
            EventEmitter.call(this);
            utils.polluteGlobalNamespace();
            this.id = 'a' + random.string(6);
            var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));
            global[utils.WPrefix][this.id] = this._callback.bind(this);
  
            this._createScript(urlWithId); // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  
  
            this.timeoutId = setTimeout(function () {
              debug('timeout');
  
              self._abort(new Error('JSONP script loaded abnormally (timeout)'));
            }, JsonpReceiver.timeout);
          }
  
          inherits(JsonpReceiver, EventEmitter);
  
          JsonpReceiver.prototype.abort = function () {
            debug('abort');
  
            if (global[utils.WPrefix][this.id]) {
              var err = new Error('JSONP user aborted read');
              err.code = 1000;
  
              this._abort(err);
            }
          };
  
          JsonpReceiver.timeout = 35000;
          JsonpReceiver.scriptErrorTimeout = 1000;
  
          JsonpReceiver.prototype._callback = function (data) {
            debug('_callback', data);
  
            this._cleanup();
  
            if (this.aborting) {
              return;
            }
  
            if (data) {
              debug('message', data);
              this.emit('message', data);
            }
  
            this.emit('close', null, 'network');
            this.removeAllListeners();
          };
  
          JsonpReceiver.prototype._abort = function (err) {
            debug('_abort', err);
  
            this._cleanup();
  
            this.aborting = true;
            this.emit('close', err.code, err.message);
            this.removeAllListeners();
          };
  
          JsonpReceiver.prototype._cleanup = function () {
            debug('_cleanup');
            clearTimeout(this.timeoutId);
  
            if (this.script2) {
              this.script2.parentNode.removeChild(this.script2);
              this.script2 = null;
            }
  
            if (this.script) {
              var script = this.script; // Unfortunately, you can't really abort script loading of
              // the script.
  
              script.parentNode.removeChild(script);
              script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
              this.script = null;
            }
  
            delete global[utils.WPrefix][this.id];
          };
  
          JsonpReceiver.prototype._scriptError = function () {
            debug('_scriptError');
            var self = this;
  
            if (this.errorTimer) {
              return;
            }
  
            this.errorTimer = setTimeout(function () {
              if (!self.loadedOkay) {
                self._abort(new Error('JSONP script loaded abnormally (onerror)'));
              }
            }, JsonpReceiver.scriptErrorTimeout);
          };
  
          JsonpReceiver.prototype._createScript = function (url) {
            debug('_createScript', url);
            var self = this;
            var script = this.script = global.document.createElement('script');
            var script2; // Opera synchronous load trick.
  
            script.id = 'a' + random.string(8);
            script.src = url;
            script.type = 'text/javascript';
            script.charset = 'UTF-8';
            script.onerror = this._scriptError.bind(this);
  
            script.onload = function () {
              debug('onload');
  
              self._abort(new Error('JSONP script loaded abnormally (onload)'));
            }; // IE9 fires 'error' event after onreadystatechange or before, in random order.
            // Use loadedOkay to determine if actually errored
  
  
            script.onreadystatechange = function () {
              debug('onreadystatechange', script.readyState);
  
              if (/loaded|closed/.test(script.readyState)) {
                if (script && script.htmlFor && script.onclick) {
                  self.loadedOkay = true;
  
                  try {
                    // In IE, actually execute the script.
                    script.onclick();
                  } catch (x) {// intentionally empty
                  }
                }
  
                if (script) {
                  self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
                }
              }
            }; // IE: event/htmlFor/onclick trick.
            // One can't rely on proper order for onreadystatechange. In order to
            // make sure, set a 'htmlFor' and 'event' properties, so that
            // script code will be installed as 'onclick' handler for the
            // script object. Later, onreadystatechange, manually execute this
            // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
            // set. For reference see:
            //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
            // Also, read on that about script ordering:
            //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  
  
            if (typeof script.async === 'undefined' && global.document.attachEvent) {
              // According to mozilla docs, in recent browsers script.async defaults
              // to 'true', so we may use it to detect a good browser:
              // https://developer.mozilla.org/en/HTML/Element/script
              if (!browser.isOpera()) {
                // Naively assume we're in IE
                try {
                  script.htmlFor = script.id;
                  script.event = 'onclick';
                } catch (x) {// intentionally empty
                }
  
                script.async = true;
              } else {
                // Opera, second sync script hack
                script2 = this.script2 = global.document.createElement('script');
                script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
                script.async = script2.async = false;
              }
            }
  
            if (typeof script.async !== 'undefined') {
              script.async = true;
            }
  
            var head = global.document.getElementsByTagName('head')[0];
            head.insertBefore(script, head.firstChild);
  
            if (script2) {
              head.insertBefore(script2, head.firstChild);
            }
          };
  
          module.exports = JsonpReceiver;
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "../../utils/browser": 44,
        "../../utils/iframe": 47,
        "../../utils/random": 50,
        "../../utils/url": 52,
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      32: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var inherits = require('inherits'),
              EventEmitter = require('events').EventEmitter;
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:receiver:xhr');
          }
  
          function XhrReceiver(url, AjaxObject) {
            debug(url);
            EventEmitter.call(this);
            var self = this;
            this.bufferPosition = 0;
            this.xo = new AjaxObject('POST', url, null);
            this.xo.on('chunk', this._chunkHandler.bind(this));
            this.xo.once('finish', function (status, text) {
              debug('finish', status, text);
  
              self._chunkHandler(status, text);
  
              self.xo = null;
              var reason = status === 200 ? 'network' : 'permanent';
              debug('close', reason);
              self.emit('close', null, reason);
  
              self._cleanup();
            });
          }
  
          inherits(XhrReceiver, EventEmitter);
  
          XhrReceiver.prototype._chunkHandler = function (status, text) {
            debug('_chunkHandler', status);
  
            if (status !== 200 || !text) {
              return;
            }
  
            for (var idx = -1;; this.bufferPosition += idx + 1) {
              var buf = text.slice(this.bufferPosition);
              idx = buf.indexOf('\n');
  
              if (idx === -1) {
                break;
              }
  
              var msg = buf.slice(0, idx);
  
              if (msg) {
                debug('message', msg);
                this.emit('message', msg);
              }
            }
          };
  
          XhrReceiver.prototype._cleanup = function () {
            debug('_cleanup');
            this.removeAllListeners();
          };
  
          XhrReceiver.prototype.abort = function () {
            debug('abort');
  
            if (this.xo) {
              this.xo.close();
              debug('close');
              this.emit('close', null, 'user');
              this.xo = null;
            }
  
            this._cleanup();
          };
  
          module.exports = XhrReceiver;
        }).call(this, {
          env: {}
        });
      }, {
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      33: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          var random = require('../../utils/random'),
              urlUtils = require('../../utils/url');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:sender:jsonp');
          }
  
          var form, area;
  
          function createIframe(id) {
            debug('createIframe', id);
  
            try {
              // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
              return global.document.createElement('<iframe name="' + id + '">');
            } catch (x) {
              var iframe = global.document.createElement('iframe');
              iframe.name = id;
              return iframe;
            }
          }
  
          function createForm() {
            debug('createForm');
            form = global.document.createElement('form');
            form.style.display = 'none';
            form.style.position = 'absolute';
            form.method = 'POST';
            form.enctype = 'application/x-www-form-urlencoded';
            form.acceptCharset = 'UTF-8';
            area = global.document.createElement('textarea');
            area.name = 'd';
            form.appendChild(area);
            global.document.body.appendChild(form);
          }
  
          module.exports = function (url, payload, callback) {
            debug(url, payload);
  
            if (!form) {
              createForm();
            }
  
            var id = 'a' + random.string(8);
            form.target = id;
            form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);
            var iframe = createIframe(id);
            iframe.id = id;
            iframe.style.display = 'none';
            form.appendChild(iframe);
  
            try {
              area.value = payload;
            } catch (e) {// seriously broken browsers get here
            }
  
            form.submit();
  
            var completed = function (err) {
              debug('completed', id, err);
  
              if (!iframe.onerror) {
                return;
              }
  
              iframe.onreadystatechange = iframe.onerror = iframe.onload = null; // Opera mini doesn't like if we GC iframe
              // immediately, thus this timeout.
  
              setTimeout(function () {
                debug('cleaning up', id);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
              }, 500);
              area.value = ''; // It is not possible to detect if the iframe succeeded or
              // failed to submit our form.
  
              callback(err);
            };
  
            iframe.onerror = function () {
              debug('onerror', id);
              completed();
            };
  
            iframe.onload = function () {
              debug('onload', id);
              completed();
            };
  
            iframe.onreadystatechange = function (e) {
              debug('onreadystatechange', id, iframe.readyState, e);
  
              if (iframe.readyState === 'complete') {
                completed();
              }
            };
  
            return function () {
              debug('aborted', id);
              completed(new Error('Aborted'));
            };
          };
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "../../utils/random": 50,
        "../../utils/url": 52,
        "debug": 55
      }],
      34: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          var EventEmitter = require('events').EventEmitter,
              inherits = require('inherits'),
              eventUtils = require('../../utils/event'),
              browser = require('../../utils/browser'),
              urlUtils = require('../../utils/url');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:sender:xdr');
          } // References:
          //   http://ajaxian.com/archives/100-line-ajax-wrapper
          //   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
  
  
          function XDRObject(method, url, payload) {
            debug(method, url);
            var self = this;
            EventEmitter.call(this);
            setTimeout(function () {
              self._start(method, url, payload);
            }, 0);
          }
  
          inherits(XDRObject, EventEmitter);
  
          XDRObject.prototype._start = function (method, url, payload) {
            debug('_start');
            var self = this;
            var xdr = new global.XDomainRequest(); // IE caches even POSTs
  
            url = urlUtils.addQuery(url, 't=' + +new Date());
  
            xdr.onerror = function () {
              debug('onerror');
  
              self._error();
            };
  
            xdr.ontimeout = function () {
              debug('ontimeout');
  
              self._error();
            };
  
            xdr.onprogress = function () {
              debug('progress', xdr.responseText);
              self.emit('chunk', 200, xdr.responseText);
            };
  
            xdr.onload = function () {
              debug('load');
              self.emit('finish', 200, xdr.responseText);
  
              self._cleanup(false);
            };
  
            this.xdr = xdr;
            this.unloadRef = eventUtils.unloadAdd(function () {
              self._cleanup(true);
            });
  
            try {
              // Fails with AccessDenied if port number is bogus
              this.xdr.open(method, url);
  
              if (this.timeout) {
                this.xdr.timeout = this.timeout;
              }
  
              this.xdr.send(payload);
            } catch (x) {
              this._error();
            }
          };
  
          XDRObject.prototype._error = function () {
            this.emit('finish', 0, '');
  
            this._cleanup(false);
          };
  
          XDRObject.prototype._cleanup = function (abort) {
            debug('cleanup', abort);
  
            if (!this.xdr) {
              return;
            }
  
            this.removeAllListeners();
            eventUtils.unloadDel(this.unloadRef);
            this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  
            if (abort) {
              try {
                this.xdr.abort();
              } catch (x) {// intentionally empty
              }
            }
  
            this.unloadRef = this.xdr = null;
          };
  
          XDRObject.prototype.close = function () {
            debug('close');
  
            this._cleanup(true);
          }; // IE 8/9 if the request target uses the same scheme - #79
  
  
          XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());
          module.exports = XDRObject;
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "../../utils/browser": 44,
        "../../utils/event": 46,
        "../../utils/url": 52,
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      35: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            XhrDriver = require('../driver/xhr');
  
        function XHRCorsObject(method, url, payload, opts) {
          XhrDriver.call(this, method, url, payload, opts);
        }
  
        inherits(XHRCorsObject, XhrDriver);
        XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
        module.exports = XHRCorsObject;
      }, {
        "../driver/xhr": 17,
        "inherits": 57
      }],
      36: [function (require, module, exports) {
        'use strict';
  
        var EventEmitter = require('events').EventEmitter,
            inherits = require('inherits');
  
        function XHRFake()
        /* method, url, payload, opts */
        {
          var self = this;
          EventEmitter.call(this);
          this.to = setTimeout(function () {
            self.emit('finish', 200, '{}');
          }, XHRFake.timeout);
        }
  
        inherits(XHRFake, EventEmitter);
  
        XHRFake.prototype.close = function () {
          clearTimeout(this.to);
        };
  
        XHRFake.timeout = 2000;
        module.exports = XHRFake;
      }, {
        "events": 3,
        "inherits": 57
      }],
      37: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            XhrDriver = require('../driver/xhr');
  
        function XHRLocalObject(method, url, payload
        /*, opts */
        ) {
          XhrDriver.call(this, method, url, payload, {
            noCredentials: true
          });
        }
  
        inherits(XHRLocalObject, XhrDriver);
        XHRLocalObject.enabled = XhrDriver.enabled;
        module.exports = XHRLocalObject;
      }, {
        "../driver/xhr": 17,
        "inherits": 57
      }],
      38: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var utils = require('../utils/event'),
              urlUtils = require('../utils/url'),
              inherits = require('inherits'),
              EventEmitter = require('events').EventEmitter,
              WebsocketDriver = require('./driver/websocket');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:websocket');
          }
  
          function WebSocketTransport(transUrl, ignore, options) {
            if (!WebSocketTransport.enabled()) {
              throw new Error('Transport created when disabled');
            }
  
            EventEmitter.call(this);
            debug('constructor', transUrl);
            var self = this;
            var url = urlUtils.addPath(transUrl, '/websocket');
  
            if (url.slice(0, 5) === 'https') {
              url = 'wss' + url.slice(5);
            } else {
              url = 'ws' + url.slice(4);
            }
  
            this.url = url;
            this.ws = new WebsocketDriver(this.url, [], options);
  
            this.ws.onmessage = function (e) {
              debug('message event', e.data);
              self.emit('message', e.data);
            }; // Firefox has an interesting bug. If a websocket connection is
            // created after onunload, it stays alive even when user
            // navigates away from the page. In such situation let's lie -
            // let's not open the ws connection at all. See:
            // https://github.com/sockjs/sockjs-client/issues/28
            // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  
  
            this.unloadRef = utils.unloadAdd(function () {
              debug('unload');
              self.ws.close();
            });
  
            this.ws.onclose = function (e) {
              debug('close event', e.code, e.reason);
              self.emit('close', e.code, e.reason);
  
              self._cleanup();
            };
  
            this.ws.onerror = function (e) {
              debug('error event', e);
              self.emit('close', 1006, 'WebSocket connection broken');
  
              self._cleanup();
            };
          }
  
          inherits(WebSocketTransport, EventEmitter);
  
          WebSocketTransport.prototype.send = function (data) {
            var msg = '[' + data + ']';
            debug('send', msg);
            this.ws.send(msg);
          };
  
          WebSocketTransport.prototype.close = function () {
            debug('close');
            var ws = this.ws;
  
            this._cleanup();
  
            if (ws) {
              ws.close();
            }
          };
  
          WebSocketTransport.prototype._cleanup = function () {
            debug('_cleanup');
            var ws = this.ws;
  
            if (ws) {
              ws.onmessage = ws.onclose = ws.onerror = null;
            }
  
            utils.unloadDel(this.unloadRef);
            this.unloadRef = this.ws = null;
            this.removeAllListeners();
          };
  
          WebSocketTransport.enabled = function () {
            debug('enabled');
            return !!WebsocketDriver;
          };
  
          WebSocketTransport.transportName = 'websocket'; // In theory, ws should require 1 round trip. But in chrome, this is
          // not very stable over SSL. Most likely a ws connection requires a
          // separate SSL connection, in which case 2 round trips are an
          // absolute minumum.
  
          WebSocketTransport.roundTrips = 2;
          module.exports = WebSocketTransport;
        }).call(this, {
          env: {}
        });
      }, {
        "../utils/event": 46,
        "../utils/url": 52,
        "./driver/websocket": 19,
        "debug": 55,
        "events": 3,
        "inherits": 57
      }],
      39: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            AjaxBasedTransport = require('./lib/ajax-based'),
            XdrStreamingTransport = require('./xdr-streaming'),
            XhrReceiver = require('./receiver/xhr'),
            XDRObject = require('./sender/xdr');
  
        function XdrPollingTransport(transUrl) {
          if (!XDRObject.enabled) {
            throw new Error('Transport created when disabled');
          }
  
          AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
        }
  
        inherits(XdrPollingTransport, AjaxBasedTransport);
        XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
        XdrPollingTransport.transportName = 'xdr-polling';
        XdrPollingTransport.roundTrips = 2; // preflight, ajax
  
        module.exports = XdrPollingTransport;
      }, {
        "./lib/ajax-based": 24,
        "./receiver/xhr": 32,
        "./sender/xdr": 34,
        "./xdr-streaming": 40,
        "inherits": 57
      }],
      40: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            AjaxBasedTransport = require('./lib/ajax-based'),
            XhrReceiver = require('./receiver/xhr'),
            XDRObject = require('./sender/xdr'); // According to:
        //   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
        //   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
  
  
        function XdrStreamingTransport(transUrl) {
          if (!XDRObject.enabled) {
            throw new Error('Transport created when disabled');
          }
  
          AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
        }
  
        inherits(XdrStreamingTransport, AjaxBasedTransport);
  
        XdrStreamingTransport.enabled = function (info) {
          if (info.cookie_needed || info.nullOrigin) {
            return false;
          }
  
          return XDRObject.enabled && info.sameScheme;
        };
  
        XdrStreamingTransport.transportName = 'xdr-streaming';
        XdrStreamingTransport.roundTrips = 2; // preflight, ajax
  
        module.exports = XdrStreamingTransport;
      }, {
        "./lib/ajax-based": 24,
        "./receiver/xhr": 32,
        "./sender/xdr": 34,
        "inherits": 57
      }],
      41: [function (require, module, exports) {
        'use strict';
  
        var inherits = require('inherits'),
            AjaxBasedTransport = require('./lib/ajax-based'),
            XhrReceiver = require('./receiver/xhr'),
            XHRCorsObject = require('./sender/xhr-cors'),
            XHRLocalObject = require('./sender/xhr-local');
  
        function XhrPollingTransport(transUrl) {
          if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
            throw new Error('Transport created when disabled');
          }
  
          AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
        }
  
        inherits(XhrPollingTransport, AjaxBasedTransport);
  
        XhrPollingTransport.enabled = function (info) {
          if (info.nullOrigin) {
            return false;
          }
  
          if (XHRLocalObject.enabled && info.sameOrigin) {
            return true;
          }
  
          return XHRCorsObject.enabled;
        };
  
        XhrPollingTransport.transportName = 'xhr-polling';
        XhrPollingTransport.roundTrips = 2; // preflight, ajax
  
        module.exports = XhrPollingTransport;
      }, {
        "./lib/ajax-based": 24,
        "./receiver/xhr": 32,
        "./sender/xhr-cors": 35,
        "./sender/xhr-local": 37,
        "inherits": 57
      }],
      42: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          var inherits = require('inherits'),
              AjaxBasedTransport = require('./lib/ajax-based'),
              XhrReceiver = require('./receiver/xhr'),
              XHRCorsObject = require('./sender/xhr-cors'),
              XHRLocalObject = require('./sender/xhr-local'),
              browser = require('../utils/browser');
  
          function XhrStreamingTransport(transUrl) {
            if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
              throw new Error('Transport created when disabled');
            }
  
            AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
          }
  
          inherits(XhrStreamingTransport, AjaxBasedTransport);
  
          XhrStreamingTransport.enabled = function (info) {
            if (info.nullOrigin) {
              return false;
            } // Opera doesn't support xhr-streaming #60
            // But it might be able to #92
  
  
            if (browser.isOpera()) {
              return false;
            }
  
            return XHRCorsObject.enabled;
          };
  
          XhrStreamingTransport.transportName = 'xhr-streaming';
          XhrStreamingTransport.roundTrips = 2; // preflight, ajax
          // Safari gets confused when a streaming ajax request is started
          // before onload. This causes the load indicator to spin indefinetely.
          // Only require body when used in a browser
  
          XhrStreamingTransport.needBody = !!global.document;
          module.exports = XhrStreamingTransport;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "../utils/browser": 44,
        "./lib/ajax-based": 24,
        "./receiver/xhr": 32,
        "./sender/xhr-cors": 35,
        "./sender/xhr-local": 37,
        "inherits": 57
      }],
      43: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          if (global.crypto && global.crypto.getRandomValues) {
            module.exports.randomBytes = function (length) {
              var bytes = new Uint8Array(length);
              global.crypto.getRandomValues(bytes);
              return bytes;
            };
          } else {
            module.exports.randomBytes = function (length) {
              var bytes = new Array(length);
  
              for (var i = 0; i < length; i++) {
                bytes[i] = Math.floor(Math.random() * 256);
              }
  
              return bytes;
            };
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      44: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          module.exports = {
            isOpera: function () {
              return global.navigator && /opera/i.test(global.navigator.userAgent);
            },
            isKonqueror: function () {
              return global.navigator && /konqueror/i.test(global.navigator.userAgent);
            } // #187 wrap document.domain in try/catch because of WP8 from file:///
            ,
            hasDomain: function () {
              // non-browser client always has a domain
              if (!global.document) {
                return true;
              }
  
              try {
                return !!global.document.domain;
              } catch (e) {
                return false;
              }
            }
          };
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      45: [function (require, module, exports) {
        'use strict';
  
        var JSON3 = require('json3'); // Some extra characters that Chrome gets wrong, and substitutes with
        // something else on the wire.
        // eslint-disable-next-line no-control-regex, no-misleading-character-class
  
  
        var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
            extraLookup; // This may be quite slow, so let's delay until user actually uses bad
        // characters.
  
        var unrollLookup = function (escapable) {
          var i;
          var unrolled = {};
          var c = [];
  
          for (i = 0; i < 65536; i++) {
            c.push(String.fromCharCode(i));
          }
  
          escapable.lastIndex = 0;
          c.join('').replace(escapable, function (a) {
            unrolled[a] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            return '';
          });
          escapable.lastIndex = 0;
          return unrolled;
        }; // Quote string, also taking care of unicode characters that browsers
        // often break. Especially, take care of unicode surrogates:
        // http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
  
  
        module.exports = {
          quote: function (string) {
            var quoted = JSON3.stringify(string); // In most cases this should be very fast and good enough.
  
            extraEscapable.lastIndex = 0;
  
            if (!extraEscapable.test(quoted)) {
              return quoted;
            }
  
            if (!extraLookup) {
              extraLookup = unrollLookup(extraEscapable);
            }
  
            return quoted.replace(extraEscapable, function (a) {
              return extraLookup[a];
            });
          }
        };
      }, {
        "json3": 58
      }],
      46: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          var random = require('./random');
  
          var onUnload = {},
              afterUnload = false // detect google chrome packaged apps because they don't allow the 'unload' event
          ,
              isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime;
          module.exports = {
            attachEvent: function (event, listener) {
              if (typeof global.addEventListener !== 'undefined') {
                global.addEventListener(event, listener, false);
              } else if (global.document && global.attachEvent) {
                // IE quirks.
                // According to: http://stevesouders.com/misc/test-postmessage.php
                // the message gets delivered only to 'document', not 'window'.
                global.document.attachEvent('on' + event, listener); // I get 'window' for ie8.
  
                global.attachEvent('on' + event, listener);
              }
            },
            detachEvent: function (event, listener) {
              if (typeof global.addEventListener !== 'undefined') {
                global.removeEventListener(event, listener, false);
              } else if (global.document && global.detachEvent) {
                global.document.detachEvent('on' + event, listener);
                global.detachEvent('on' + event, listener);
              }
            },
            unloadAdd: function (listener) {
              if (isChromePackagedApp) {
                return null;
              }
  
              var ref = random.string(8);
              onUnload[ref] = listener;
  
              if (afterUnload) {
                setTimeout(this.triggerUnloadCallbacks, 0);
              }
  
              return ref;
            },
            unloadDel: function (ref) {
              if (ref in onUnload) {
                delete onUnload[ref];
              }
            },
            triggerUnloadCallbacks: function () {
              for (var ref in onUnload) {
                onUnload[ref]();
                delete onUnload[ref];
              }
            }
          };
  
          var unloadTriggered = function () {
            if (afterUnload) {
              return;
            }
  
            afterUnload = true;
            module.exports.triggerUnloadCallbacks();
          }; // 'unload' alone is not reliable in opera within an iframe, but we
          // can't use `beforeunload` as IE fires it on javascript: links.
  
  
          if (!isChromePackagedApp) {
            module.exports.attachEvent('unload', unloadTriggered);
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./random": 50
      }],
      47: [function (require, module, exports) {
        (function (process, global) {
          'use strict';
  
          var eventUtils = require('./event'),
              JSON3 = require('json3'),
              browser = require('./browser');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:utils:iframe');
          }
  
          module.exports = {
            WPrefix: '_jp',
            currentWindowId: null,
            polluteGlobalNamespace: function () {
              if (!(module.exports.WPrefix in global)) {
                global[module.exports.WPrefix] = {};
              }
            },
            postMessage: function (type, data) {
              if (global.parent !== global) {
                global.parent.postMessage(JSON3.stringify({
                  windowId: module.exports.currentWindowId,
                  type: type,
                  data: data || ''
                }), '*');
              } else {
                debug('Cannot postMessage, no parent window.', type, data);
              }
            },
            createIframe: function (iframeUrl, errorCallback) {
              var iframe = global.document.createElement('iframe');
              var tref, unloadRef;
  
              var unattach = function () {
                debug('unattach');
                clearTimeout(tref); // Explorer had problems with that.
  
                try {
                  iframe.onload = null;
                } catch (x) {// intentionally empty
                }
  
                iframe.onerror = null;
              };
  
              var cleanup = function () {
                debug('cleanup');
  
                if (iframe) {
                  unattach(); // This timeout makes chrome fire onbeforeunload event
                  // within iframe. Without the timeout it goes straight to
                  // onunload.
  
                  setTimeout(function () {
                    if (iframe) {
                      iframe.parentNode.removeChild(iframe);
                    }
  
                    iframe = null;
                  }, 0);
                  eventUtils.unloadDel(unloadRef);
                }
              };
  
              var onerror = function (err) {
                debug('onerror', err);
  
                if (iframe) {
                  cleanup();
                  errorCallback(err);
                }
              };
  
              var post = function (msg, origin) {
                debug('post', msg, origin);
                setTimeout(function () {
                  try {
                    // When the iframe is not loaded, IE raises an exception
                    // on 'contentWindow'.
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.postMessage(msg, origin);
                    }
                  } catch (x) {// intentionally empty
                  }
                }, 0);
              };
  
              iframe.src = iframeUrl;
              iframe.style.display = 'none';
              iframe.style.position = 'absolute';
  
              iframe.onerror = function () {
                onerror('onerror');
              };
  
              iframe.onload = function () {
                debug('onload'); // `onload` is triggered before scripts on the iframe are
                // executed. Give it few seconds to actually load stuff.
  
                clearTimeout(tref);
                tref = setTimeout(function () {
                  onerror('onload timeout');
                }, 2000);
              };
  
              global.document.body.appendChild(iframe);
              tref = setTimeout(function () {
                onerror('timeout');
              }, 15000);
              unloadRef = eventUtils.unloadAdd(cleanup);
              return {
                post: post,
                cleanup: cleanup,
                loaded: unattach
              };
            }
            /* eslint no-undef: "off", new-cap: "off" */
            ,
            createHtmlfile: function (iframeUrl, errorCallback) {
              var axo = ['Active'].concat('Object').join('X');
              var doc = new global[axo]('htmlfile');
              var tref, unloadRef;
              var iframe;
  
              var unattach = function () {
                clearTimeout(tref);
                iframe.onerror = null;
              };
  
              var cleanup = function () {
                if (doc) {
                  unattach();
                  eventUtils.unloadDel(unloadRef);
                  iframe.parentNode.removeChild(iframe);
                  iframe = doc = null;
                  CollectGarbage();
                }
              };
  
              var onerror = function (r) {
                debug('onerror', r);
  
                if (doc) {
                  cleanup();
                  errorCallback(r);
                }
              };
  
              var post = function (msg, origin) {
                try {
                  // When the iframe is not loaded, IE raises an exception
                  // on 'contentWindow'.
                  setTimeout(function () {
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.postMessage(msg, origin);
                    }
                  }, 0);
                } catch (x) {// intentionally empty
                }
              };
  
              doc.open();
              doc.write('<html><s' + 'cript>' + 'document.domain="' + global.document.domain + '";' + '</s' + 'cript></html>');
              doc.close();
              doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
              var c = doc.createElement('div');
              doc.body.appendChild(c);
              iframe = doc.createElement('iframe');
              c.appendChild(iframe);
              iframe.src = iframeUrl;
  
              iframe.onerror = function () {
                onerror('onerror');
              };
  
              tref = setTimeout(function () {
                onerror('timeout');
              }, 15000);
              unloadRef = eventUtils.unloadAdd(cleanup);
              return {
                post: post,
                cleanup: cleanup,
                loaded: unattach
              };
            }
          };
          module.exports.iframeEnabled = false;
  
          if (global.document) {
            // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
            // huge delay, or not at all.
            module.exports.iframeEnabled = (typeof global.postMessage === 'function' || typeof global.postMessage === 'object') && !browser.isKonqueror();
          }
        }).call(this, {
          env: {}
        }, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "./browser": 44,
        "./event": 46,
        "debug": 55,
        "json3": 58
      }],
      48: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          var logObject = {};
          ['log', 'debug', 'warn'].forEach(function (level) {
            var levelExists;
  
            try {
              levelExists = global.console && global.console[level] && global.console[level].apply;
            } catch (e) {// do nothing
            }
  
            logObject[level] = levelExists ? function () {
              return global.console[level].apply(global.console, arguments);
            } : level === 'log' ? function () {} : logObject.log;
          });
          module.exports = logObject;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      49: [function (require, module, exports) {
        'use strict';
  
        module.exports = {
          isObject: function (obj) {
            var type = typeof obj;
            return type === 'function' || type === 'object' && !!obj;
          },
          extend: function (obj) {
            if (!this.isObject(obj)) {
              return obj;
            }
  
            var source, prop;
  
            for (var i = 1, length = arguments.length; i < length; i++) {
              source = arguments[i];
  
              for (prop in source) {
                if (Object.prototype.hasOwnProperty.call(source, prop)) {
                  obj[prop] = source[prop];
                }
              }
            }
  
            return obj;
          }
        };
      }, {}],
      50: [function (require, module, exports) {
        'use strict';
  
        var crypto = require('crypto'); // This string has length 32, a power of 2, so the modulus doesn't introduce a
        // bias.
  
  
        var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
        module.exports = {
          string: function (length) {
            var max = _randomStringChars.length;
            var bytes = crypto.randomBytes(length);
            var ret = [];
  
            for (var i = 0; i < length; i++) {
              ret.push(_randomStringChars.substr(bytes[i] % max, 1));
            }
  
            return ret.join('');
          },
          number: function (max) {
            return Math.floor(Math.random() * max);
          },
          numberString: function (max) {
            var t = ('' + (max - 1)).length;
            var p = new Array(t + 1).join('0');
            return (p + this.number(max)).slice(-t);
          }
        };
      }, {
        "crypto": 43
      }],
      51: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:utils:transport');
          }
  
          module.exports = function (availableTransports) {
            return {
              filterToEnabled: function (transportsWhitelist, info) {
                var transports = {
                  main: [],
                  facade: []
                };
  
                if (!transportsWhitelist) {
                  transportsWhitelist = [];
                } else if (typeof transportsWhitelist === 'string') {
                  transportsWhitelist = [transportsWhitelist];
                }
  
                availableTransports.forEach(function (trans) {
                  if (!trans) {
                    return;
                  }
  
                  if (trans.transportName === 'websocket' && info.websocket === false) {
                    debug('disabled from server', 'websocket');
                    return;
                  }
  
                  if (transportsWhitelist.length && transportsWhitelist.indexOf(trans.transportName) === -1) {
                    debug('not in whitelist', trans.transportName);
                    return;
                  }
  
                  if (trans.enabled(info)) {
                    debug('enabled', trans.transportName);
                    transports.main.push(trans);
  
                    if (trans.facadeTransport) {
                      transports.facade.push(trans.facadeTransport);
                    }
                  } else {
                    debug('disabled', trans.transportName);
                  }
                });
                return transports;
              }
            };
          };
        }).call(this, {
          env: {}
        });
      }, {
        "debug": 55
      }],
      52: [function (require, module, exports) {
        (function (process) {
          'use strict';
  
          var URL = require('url-parse');
  
          var debug = function () {};
  
          if (process.env.NODE_ENV !== 'production') {
            debug = require('debug')('sockjs-client:utils:url');
          }
  
          module.exports = {
            getOrigin: function (url) {
              if (!url) {
                return null;
              }
  
              var p = new URL(url);
  
              if (p.protocol === 'file:') {
                return null;
              }
  
              var port = p.port;
  
              if (!port) {
                port = p.protocol === 'https:' ? '443' : '80';
              }
  
              return p.protocol + '//' + p.hostname + ':' + port;
            },
            isOriginEqual: function (a, b) {
              var res = this.getOrigin(a) === this.getOrigin(b);
              debug('same', a, b, res);
              return res;
            },
            isSchemeEqual: function (a, b) {
              return a.split(':')[0] === b.split(':')[0];
            },
            addPath: function (url, path) {
              var qs = url.split('?');
              return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
            },
            addQuery: function (url, q) {
              return url + (url.indexOf('?') === -1 ? '?' + q : '&' + q);
            },
            isLoopbackAddr: function (addr) {
              return /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^\[::1\]$/.test(addr);
            }
          };
        }).call(this, {
          env: {}
        });
      }, {
        "debug": 55,
        "url-parse": 61
      }],
      53: [function (require, module, exports) {
        module.exports = '1.5.1';
      }, {}],
      54: [function (require, module, exports) {
        /**
         * Helpers.
         */
        var s = 1000;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var w = d * 7;
        var y = d * 365.25;
        /**
         * Parse or format the given `val`.
         *
         * Options:
         *
         *  - `long` verbose formatting [false]
         *
         * @param {String|Number} val
         * @param {Object} [options]
         * @throws {Error} throw an error if val is not a non-empty string or a number
         * @return {String|Number}
         * @api public
         */
  
        module.exports = function (val, options) {
          options = options || {};
          var type = typeof val;
  
          if (type === 'string' && val.length > 0) {
            return parse(val);
          } else if (type === 'number' && isFinite(val)) {
            return options.long ? fmtLong(val) : fmtShort(val);
          }
  
          throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
        };
        /**
         * Parse the given `str` and return milliseconds.
         *
         * @param {String} str
         * @return {Number}
         * @api private
         */
  
  
        function parse(str) {
          str = String(str);
  
          if (str.length > 100) {
            return;
          }
  
          var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
  
          if (!match) {
            return;
          }
  
          var n = parseFloat(match[1]);
          var type = (match[2] || 'ms').toLowerCase();
  
          switch (type) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
              return n * y;
  
            case 'weeks':
            case 'week':
            case 'w':
              return n * w;
  
            case 'days':
            case 'day':
            case 'd':
              return n * d;
  
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
              return n * h;
  
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
              return n * m;
  
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
              return n * s;
  
            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
              return n;
  
            default:
              return undefined;
          }
        }
        /**
         * Short format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */
  
  
        function fmtShort(ms) {
          var msAbs = Math.abs(ms);
  
          if (msAbs >= d) {
            return Math.round(ms / d) + 'd';
          }
  
          if (msAbs >= h) {
            return Math.round(ms / h) + 'h';
          }
  
          if (msAbs >= m) {
            return Math.round(ms / m) + 'm';
          }
  
          if (msAbs >= s) {
            return Math.round(ms / s) + 's';
          }
  
          return ms + 'ms';
        }
        /**
         * Long format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */
  
  
        function fmtLong(ms) {
          var msAbs = Math.abs(ms);
  
          if (msAbs >= d) {
            return plural(ms, msAbs, d, 'day');
          }
  
          if (msAbs >= h) {
            return plural(ms, msAbs, h, 'hour');
          }
  
          if (msAbs >= m) {
            return plural(ms, msAbs, m, 'minute');
          }
  
          if (msAbs >= s) {
            return plural(ms, msAbs, s, 'second');
          }
  
          return ms + ' ms';
        }
        /**
         * Pluralization helper.
         */
  
  
        function plural(ms, msAbs, n, name) {
          var isPlural = msAbs >= n * 1.5;
          return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
        }
      }, {}],
      55: [function (require, module, exports) {
        (function (process) {
          "use strict";
  
          function _typeof(obj) {
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof(obj) {
                return typeof obj;
              };
            } else {
              _typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
              };
            }
  
            return _typeof(obj);
          }
          /* eslint-env browser */
  
          /**
           * This is the web browser implementation of `debug()`.
           */
  
  
          exports.log = log;
          exports.formatArgs = formatArgs;
          exports.save = save;
          exports.load = load;
          exports.useColors = useColors;
          exports.storage = localstorage();
          /**
           * Colors.
           */
  
          exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
          /**
           * Currently only WebKit-based Web Inspectors, Firefox >= v31,
           * and the Firebug extension (any Firefox version) are known
           * to support "%c" CSS customizations.
           *
           * TODO: add a `localStorage` variable to explicitly enable/disable colors
           */
          // eslint-disable-next-line complexity
  
          function useColors() {
            // NB: In an Electron preload script, document will be defined but not fully
            // initialized. Since we know we're in Chrome, we'll just detect this case
            // explicitly
            if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
              return true;
            } // Internet Explorer and Edge do not support colors.
  
  
            if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
              return false;
            } // Is webkit? http://stackoverflow.com/a/16459606/376773
            // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  
  
            return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
            typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
            // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
            typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
            typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
          }
          /**
           * Colorize log arguments if enabled.
           *
           * @api public
           */
  
  
          function formatArgs(args) {
            args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
  
            if (!this.useColors) {
              return;
            }
  
            var c = 'color: ' + this.color;
            args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
            // arguments passed either before or after the %c, so we need to
            // figure out the correct index to insert the CSS into
  
            var index = 0;
            var lastC = 0;
            args[0].replace(/%[a-zA-Z%]/g, function (match) {
              if (match === '%%') {
                return;
              }
  
              index++;
  
              if (match === '%c') {
                // We only are interested in the *last* %c
                // (the user may have provided their own)
                lastC = index;
              }
            });
            args.splice(lastC, 0, c);
          }
          /**
           * Invokes `console.log()` when available.
           * No-op when `console.log` is not a "function".
           *
           * @api public
           */
  
  
          function log() {
            var _console; // This hackery is required for IE8/9, where
            // the `console.log` function doesn't have 'apply'
  
  
            return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
          }
          /**
           * Save `namespaces`.
           *
           * @param {String} namespaces
           * @api private
           */
  
  
          function save(namespaces) {
            try {
              if (namespaces) {
                exports.storage.setItem('debug', namespaces);
              } else {
                exports.storage.removeItem('debug');
              }
            } catch (error) {// Swallow
              // XXX (@Qix-) should we be logging these?
            }
          }
          /**
           * Load `namespaces`.
           *
           * @return {String} returns the previously persisted debug modes
           * @api private
           */
  
  
          function load() {
            var r;
  
            try {
              r = exports.storage.getItem('debug');
            } catch (error) {} // Swallow
            // XXX (@Qix-) should we be logging these?
            // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  
  
            if (!r && typeof process !== 'undefined' && 'env' in process) {
              r = process.env.DEBUG;
            }
  
            return r;
          }
          /**
           * Localstorage attempts to return the localstorage.
           *
           * This is necessary because safari throws
           * when a user disables cookies/localstorage
           * and you attempt to access it.
           *
           * @return {LocalStorage}
           * @api private
           */
  
  
          function localstorage() {
            try {
              // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
              // The Browser also has localStorage in the global context.
              return localStorage;
            } catch (error) {// Swallow
              // XXX (@Qix-) should we be logging these?
            }
          }
  
          module.exports = require('./common')(exports);
          var formatters = module.exports.formatters;
          /**
           * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
           */
  
          formatters.j = function (v) {
            try {
              return JSON.stringify(v);
            } catch (error) {
              return '[UnexpectedJSONParseError]: ' + error.message;
            }
          };
        }).call(this, {
          env: {}
        });
      }, {
        "./common": 56
      }],
      56: [function (require, module, exports) {
        "use strict";
        /**
         * This is the common logic for both the Node.js and web browser
         * implementations of `debug()`.
         */
  
        function setup(env) {
          createDebug.debug = createDebug;
          createDebug.default = createDebug;
          createDebug.coerce = coerce;
          createDebug.disable = disable;
          createDebug.enable = enable;
          createDebug.enabled = enabled;
          createDebug.humanize = require('ms');
          Object.keys(env).forEach(function (key) {
            createDebug[key] = env[key];
          });
          /**
          * Active `debug` instances.
          */
  
          createDebug.instances = [];
          /**
          * The currently active debug mode names, and names to skip.
          */
  
          createDebug.names = [];
          createDebug.skips = [];
          /**
          * Map of special "%n" handling functions, for the debug "format" argument.
          *
          * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
          */
  
          createDebug.formatters = {};
          /**
          * Selects a color for a debug namespace
          * @param {String} namespace The namespace string for the for the debug instance to be colored
          * @return {Number|String} An ANSI color code for the given namespace
          * @api private
          */
  
          function selectColor(namespace) {
            var hash = 0;
  
            for (var i = 0; i < namespace.length; i++) {
              hash = (hash << 5) - hash + namespace.charCodeAt(i);
              hash |= 0; // Convert to 32bit integer
            }
  
            return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
          }
  
          createDebug.selectColor = selectColor;
          /**
          * Create a debugger with the given `namespace`.
          *
          * @param {String} namespace
          * @return {Function}
          * @api public
          */
  
          function createDebug(namespace) {
            var prevTime;
  
            function debug() {
              // Disabled?
              if (!debug.enabled) {
                return;
              }
  
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
  
              var self = debug; // Set `diff` timestamp
  
              var curr = Number(new Date());
              var ms = curr - (prevTime || curr);
              self.diff = ms;
              self.prev = prevTime;
              self.curr = curr;
              prevTime = curr;
              args[0] = createDebug.coerce(args[0]);
  
              if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
              } // Apply any `formatters` transformations
  
  
              var index = 0;
              args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                  return match;
                }
  
                index++;
                var formatter = createDebug.formatters[format];
  
                if (typeof formatter === 'function') {
                  var val = args[index];
                  match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`
  
                  args.splice(index, 1);
                  index--;
                }
  
                return match;
              }); // Apply env-specific formatting (colors, etc.)
  
              createDebug.formatArgs.call(self, args);
              var logFn = self.log || createDebug.log;
              logFn.apply(self, args);
            }
  
            debug.namespace = namespace;
            debug.enabled = createDebug.enabled(namespace);
            debug.useColors = createDebug.useColors();
            debug.color = selectColor(namespace);
            debug.destroy = destroy;
            debug.extend = extend; // Debug.formatArgs = formatArgs;
            // debug.rawLog = rawLog;
            // env-specific initialization logic for debug instances
  
            if (typeof createDebug.init === 'function') {
              createDebug.init(debug);
            }
  
            createDebug.instances.push(debug);
            return debug;
          }
  
          function destroy() {
            var index = createDebug.instances.indexOf(this);
  
            if (index !== -1) {
              createDebug.instances.splice(index, 1);
              return true;
            }
  
            return false;
          }
  
          function extend(namespace, delimiter) {
            return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
          }
          /**
          * Enables a debug mode by namespaces. This can include modes
          * separated by a colon and wildcards.
          *
          * @param {String} namespaces
          * @api public
          */
  
  
          function enable(namespaces) {
            createDebug.save(namespaces);
            createDebug.names = [];
            createDebug.skips = [];
            var i;
            var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
            var len = split.length;
  
            for (i = 0; i < len; i++) {
              if (!split[i]) {
                // ignore empty strings
                continue;
              }
  
              namespaces = split[i].replace(/\*/g, '.*?');
  
              if (namespaces[0] === '-') {
                createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
              } else {
                createDebug.names.push(new RegExp('^' + namespaces + '$'));
              }
            }
  
            for (i = 0; i < createDebug.instances.length; i++) {
              var instance = createDebug.instances[i];
              instance.enabled = createDebug.enabled(instance.namespace);
            }
          }
          /**
          * Disable debug output.
          *
          * @api public
          */
  
  
          function disable() {
            createDebug.enable('');
          }
          /**
          * Returns true if the given mode name is enabled, false otherwise.
          *
          * @param {String} name
          * @return {Boolean}
          * @api public
          */
  
  
          function enabled(name) {
            if (name[name.length - 1] === '*') {
              return true;
            }
  
            var i;
            var len;
  
            for (i = 0, len = createDebug.skips.length; i < len; i++) {
              if (createDebug.skips[i].test(name)) {
                return false;
              }
            }
  
            for (i = 0, len = createDebug.names.length; i < len; i++) {
              if (createDebug.names[i].test(name)) {
                return true;
              }
            }
  
            return false;
          }
          /**
          * Coerce `val`.
          *
          * @param {Mixed} val
          * @return {Mixed}
          * @api private
          */
  
  
          function coerce(val) {
            if (val instanceof Error) {
              return val.stack || val.message;
            }
  
            return val;
          }
  
          createDebug.enable(createDebug.load());
          return createDebug;
        }
  
        module.exports = setup;
      }, {
        "ms": 54
      }],
      57: [function (require, module, exports) {
        if (typeof Object.create === 'function') {
          // implementation from standard node.js 'util' module
          module.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
              ctor.super_ = superCtor;
              ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                  value: ctor,
                  enumerable: false,
                  writable: true,
                  configurable: true
                }
              });
            }
          };
        } else {
          // old school shim for old browsers
          module.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
              ctor.super_ = superCtor;
  
              var TempCtor = function () {};
  
              TempCtor.prototype = superCtor.prototype;
              ctor.prototype = new TempCtor();
              ctor.prototype.constructor = ctor;
            }
          };
        }
      }, {}],
      58: [function (require, module, exports) {
        (function (global) {
          /*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
          ;
          (function () {
            // Detect the `define` function exposed by asynchronous module loaders. The
            // strict `define` check is necessary for compatibility with `r.js`.
            var isLoader = typeof define === "function" && define.amd; // A set of types used to distinguish objects from primitives.
  
            var objectTypes = {
              "function": true,
              "object": true
            }; // Detect the `exports` object exposed by CommonJS implementations.
  
            var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports; // Use the `global` object exposed by Node (including Browserify via
            // `insert-module-globals`), Narwhal, and Ringo as the default context,
            // and the `window` object in browsers. Rhino exports a `global` function
            // instead.
  
            var root = objectTypes[typeof window] && window || this,
                freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
  
            if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
              root = freeGlobal;
            } // Public: Initializes JSON 3 using the given `context` object, attaching the
            // `stringify` and `parse` functions to the specified `exports` object.
  
  
            function runInContext(context, exports) {
              context || (context = root.Object());
              exports || (exports = root.Object()); // Native constructor aliases.
  
              var Number = context.Number || root.Number,
                  String = context.String || root.String,
                  Object = context.Object || root.Object,
                  Date = context.Date || root.Date,
                  SyntaxError = context.SyntaxError || root.SyntaxError,
                  TypeError = context.TypeError || root.TypeError,
                  Math = context.Math || root.Math,
                  nativeJSON = context.JSON || root.JSON; // Delegate to the native `stringify` and `parse` implementations.
  
              if (typeof nativeJSON == "object" && nativeJSON) {
                exports.stringify = nativeJSON.stringify;
                exports.parse = nativeJSON.parse;
              } // Convenience aliases.
  
  
              var objectProto = Object.prototype,
                  getClass = objectProto.toString,
                  isProperty = objectProto.hasOwnProperty,
                  undefined; // Internal: Contains `try...catch` logic used by other functions.
              // This prevents other functions from being deoptimized.
  
              function attempt(func, errorFunc) {
                try {
                  func();
                } catch (exception) {
                  if (errorFunc) {
                    errorFunc();
                  }
                }
              } // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
  
  
              var isExtended = new Date(-3509827334573292);
              attempt(function () {
                // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
                // results for certain dates in Opera >= 10.53.
                isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
              }); // Internal: Determines whether the native `JSON.stringify` and `parse`
              // implementations are spec-compliant. Based on work by Ken Snyder.
  
              function has(name) {
                if (has[name] != null) {
                  // Return cached feature test result.
                  return has[name];
                }
  
                var isSupported;
  
                if (name == "bug-string-char-index") {
                  // IE <= 7 doesn't support accessing string characters using square
                  // bracket notation. IE 8 only supports this for primitives.
                  isSupported = "a"[0] != "a";
                } else if (name == "json") {
                  // Indicates whether both `JSON.stringify` and `JSON.parse` are
                  // supported.
                  isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
                } else if (name == "date-serialization") {
                  // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
                  isSupported = has("json-stringify") && isExtended;
  
                  if (isSupported) {
                    var stringify = exports.stringify;
                    attempt(function () {
                      isSupported = // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                      // serialize extended years.
                      stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' && // The milliseconds are optional in ES 5, but required in 5.1.
                      stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' && // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                      // four-digit years instead of six-digit years. Credits: @Yaffle.
                      stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                      // values less than 1000. Credits: @Yaffle.
                      stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                    });
                  }
                } else {
                  var value,
                      serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'; // Test `JSON.stringify`.
  
                  if (name == "json-stringify") {
                    var stringify = exports.stringify,
                        stringifySupported = typeof stringify == "function";
  
                    if (stringifySupported) {
                      // A test function object with a custom `toJSON` method.
                      (value = function () {
                        return 1;
                      }).toJSON = value;
                      attempt(function () {
                        stringifySupported = // Firefox 3.1b1 and b2 serialize string, number, and boolean
                        // primitives as object literals.
                        stringify(0) === "0" && // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                        // literals.
                        stringify(new Number()) === "0" && stringify(new String()) == '""' && // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                        // does not define a canonical JSON representation (this applies to
                        // objects with `toJSON` properties as well, *unless* they are nested
                        // within an object or array).
                        stringify(getClass) === undefined && // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                        // FF 3.1b3 pass this test.
                        stringify(undefined) === undefined && // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                        // respectively, if the value is omitted entirely.
                        stringify() === undefined && // FF 3.1b1, 2 throw an error if the given value is not a number,
                        // string, array, object, Boolean, or `null` literal. This applies to
                        // objects with custom `toJSON` methods as well, unless they are nested
                        // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                        // methods entirely.
                        stringify(value) === "1" && stringify([value]) == "[1]" && // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                        // `"[null]"`.
                        stringify([undefined]) == "[null]" && // YUI 3.0.0b1 fails to serialize `null` literals.
                        stringify(null) == "null" && // FF 3.1b1, 2 halts serialization if an array contains a function:
                        // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                        // elides non-JSON values from objects and arrays, unless they
                        // define custom `toJSON` methods.
                        stringify([undefined, getClass, null]) == "[null,null,null]" && // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                        // where character escape codes are expected (e.g., `\b` => `\u0008`).
                        stringify({
                          "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                        }) == serialized && // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                        stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
                      }, function () {
                        stringifySupported = false;
                      });
                    }
  
                    isSupported = stringifySupported;
                  } // Test `JSON.parse`.
  
  
                  if (name == "json-parse") {
                    var parse = exports.parse,
                        parseSupported;
  
                    if (typeof parse == "function") {
                      attempt(function () {
                        // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                        // Conforming implementations should also coerce the initial argument to
                        // a string prior to parsing.
                        if (parse("0") === 0 && !parse(false)) {
                          // Simple parsing test.
                          value = parse(serialized);
                          parseSupported = value["a"].length == 5 && value["a"][0] === 1;
  
                          if (parseSupported) {
                            attempt(function () {
                              // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                              parseSupported = !parse('"\t"');
                            });
  
                            if (parseSupported) {
                              attempt(function () {
                                // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                                // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                                // certain octal literals.
                                parseSupported = parse("01") !== 1;
                              });
                            }
  
                            if (parseSupported) {
                              attempt(function () {
                                // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                                // points. These environments, along with FF 3.1b1 and 2,
                                // also allow trailing commas in JSON objects and arrays.
                                parseSupported = parse("1.") !== 1;
                              });
                            }
                          }
                        }
                      }, function () {
                        parseSupported = false;
                      });
                    }
  
                    isSupported = parseSupported;
                  }
                }
  
                return has[name] = !!isSupported;
              }
  
              has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;
  
              if (!has("json")) {
                // Common `[[Class]]` name aliases.
                var functionClass = "[object Function]",
                    dateClass = "[object Date]",
                    numberClass = "[object Number]",
                    stringClass = "[object String]",
                    arrayClass = "[object Array]",
                    booleanClass = "[object Boolean]"; // Detect incomplete support for accessing string characters by index.
  
                var charIndexBuggy = has("bug-string-char-index"); // Internal: Normalizes the `for...in` iteration algorithm across
                // environments. Each enumerated key is yielded to a `callback` function.
  
                var forOwn = function (object, callback) {
                  var size = 0,
                      Properties,
                      dontEnums,
                      property; // Tests for bugs in the current environment's `for...in` algorithm. The
                  // `valueOf` property inherits the non-enumerable flag from
                  // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
  
                  (Properties = function () {
                    this.valueOf = 0;
                  }).prototype.valueOf = 0; // Iterate over a new instance of the `Properties` class.
  
                  dontEnums = new Properties();
  
                  for (property in dontEnums) {
                    // Ignore all properties inherited from `Object.prototype`.
                    if (isProperty.call(dontEnums, property)) {
                      size++;
                    }
                  }
  
                  Properties = dontEnums = null; // Normalize the iteration algorithm.
  
                  if (!size) {
                    // A list of non-enumerable properties inherited from `Object.prototype`.
                    dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"]; // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                    // properties.
  
                    forOwn = function (object, callback) {
                      var isFunction = getClass.call(object) == functionClass,
                          property,
                          length;
                      var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
  
                      for (property in object) {
                        // Gecko <= 1.0 enumerates the `prototype` property of functions under
                        // certain conditions; IE does not.
                        if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                          callback(property);
                        }
                      } // Manually invoke the callback for each non-enumerable property.
  
  
                      for (length = dontEnums.length; property = dontEnums[--length];) {
                        if (hasProperty.call(object, property)) {
                          callback(property);
                        }
                      }
                    };
                  } else {
                    // No bugs detected; use the standard `for...in` algorithm.
                    forOwn = function (object, callback) {
                      var isFunction = getClass.call(object) == functionClass,
                          property,
                          isConstructor;
  
                      for (property in object) {
                        if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                          callback(property);
                        }
                      } // Manually invoke the callback for the `constructor` property due to
                      // cross-environment inconsistencies.
  
  
                      if (isConstructor || isProperty.call(object, property = "constructor")) {
                        callback(property);
                      }
                    };
                  }
  
                  return forOwn(object, callback);
                }; // Public: Serializes a JavaScript `value` as a JSON string. The optional
                // `filter` argument may specify either a function that alters how object and
                // array members are serialized, or an array of strings and numbers that
                // indicates which properties should be serialized. The optional `width`
                // argument may be either a string or number that specifies the indentation
                // level of the output.
  
  
                if (!has("json-stringify") && !has("date-serialization")) {
                  // Internal: A map of control characters and their escaped equivalents.
                  var Escapes = {
                    92: "\\\\",
                    34: '\\"',
                    8: "\\b",
                    12: "\\f",
                    10: "\\n",
                    13: "\\r",
                    9: "\\t"
                  }; // Internal: Converts `value` into a zero-padded string such that its
                  // length is at least equal to `width`. The `width` must be <= 6.
  
                  var leadingZeroes = "000000";
  
                  var toPaddedString = function (width, value) {
                    // The `|| 0` expression is necessary to work around a bug in
                    // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                    return (leadingZeroes + (value || 0)).slice(-width);
                  }; // Internal: Serializes a date object.
  
  
                  var serializeDate = function (value) {
                    var getData, year, month, date, time, hours, minutes, seconds, milliseconds; // Define additional utility methods if the `Date` methods are buggy.
  
                    if (!isExtended) {
                      var floor = Math.floor; // A mapping between the months of the year and the number of days between
                      // January 1st and the first of the respective month.
  
                      var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]; // Internal: Calculates the number of days between the Unix epoch and the
                      // first day of the given month.
  
                      var getDay = function (year, month) {
                        return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                      };
  
                      getData = function (value) {
                        // Manually compute the year, month, date, hours, minutes,
                        // seconds, and milliseconds if the `getUTC*` methods are
                        // buggy. Adapted from @Yaffle's `date-shim` project.
                        date = floor(value / 864e5);
  
                        for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
  
                        for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
  
                        date = 1 + date - getDay(year, month); // The `time` value specifies the time within the day (see ES
                        // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                        // to compute `A modulo B`, as the `%` operator does not
                        // correspond to the `modulo` operation for negative numbers.
  
                        time = (value % 864e5 + 864e5) % 864e5; // The hours, minutes, seconds, and milliseconds are obtained by
                        // decomposing the time within the day. See section 15.9.1.10.
  
                        hours = floor(time / 36e5) % 24;
                        minutes = floor(time / 6e4) % 60;
                        seconds = floor(time / 1e3) % 60;
                        milliseconds = time % 1e3;
                      };
                    } else {
                      getData = function (value) {
                        year = value.getUTCFullYear();
                        month = value.getUTCMonth();
                        date = value.getUTCDate();
                        hours = value.getUTCHours();
                        minutes = value.getUTCMinutes();
                        seconds = value.getUTCSeconds();
                        milliseconds = value.getUTCMilliseconds();
                      };
                    }
  
                    serializeDate = function (value) {
                      if (value > -1 / 0 && value < 1 / 0) {
                        // Dates are serialized according to the `Date#toJSON` method
                        // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                        // for the ISO 8601 date time string format.
                        getData(value); // Serialize extended years correctly.
  
                        value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + // Months, dates, hours, minutes, and seconds should have two
                        // digits; milliseconds should have three.
                        "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + // Milliseconds are optional in ES 5.0, but required in 5.1.
                        "." + toPaddedString(3, milliseconds) + "Z";
                        year = month = date = hours = minutes = seconds = milliseconds = null;
                      } else {
                        value = null;
                      }
  
                      return value;
                    };
  
                    return serializeDate(value);
                  }; // For environments with `JSON.stringify` but buggy date serialization,
                  // we override the native `Date#toJSON` implementation with a
                  // spec-compliant one.
  
  
                  if (has("json-stringify") && !has("date-serialization")) {
                    // Internal: the `Date#toJSON` implementation used to override the native one.
                    function dateToJSON(key) {
                      return serializeDate(this);
                    } // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
  
  
                    var nativeStringify = exports.stringify;
  
                    exports.stringify = function (source, filter, width) {
                      var nativeToJSON = Date.prototype.toJSON;
                      Date.prototype.toJSON = dateToJSON;
                      var result = nativeStringify(source, filter, width);
                      Date.prototype.toJSON = nativeToJSON;
                      return result;
                    };
                  } else {
                    // Internal: Double-quotes a string `value`, replacing all ASCII control
                    // characters (characters with code unit values between 0 and 31) with
                    // their escaped equivalents. This is an implementation of the
                    // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
                    var unicodePrefix = "\\u00";
  
                    var escapeChar = function (character) {
                      var charCode = character.charCodeAt(0),
                          escaped = Escapes[charCode];
  
                      if (escaped) {
                        return escaped;
                      }
  
                      return unicodePrefix + toPaddedString(2, charCode.toString(16));
                    };
  
                    var reEscape = /[\x00-\x1f\x22\x5c]/g;
  
                    var quote = function (value) {
                      reEscape.lastIndex = 0;
                      return '"' + (reEscape.test(value) ? value.replace(reEscape, escapeChar) : value) + '"';
                    }; // Internal: Recursively serializes an object. Implements the
                    // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
  
  
                    var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
                      var value, type, className, results, element, index, length, prefix, result;
                      attempt(function () {
                        // Necessary for host object support.
                        value = object[property];
                      });
  
                      if (typeof value == "object" && value) {
                        if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                          value = serializeDate(value);
                        } else if (typeof value.toJSON == "function") {
                          value = value.toJSON(property);
                        }
                      }
  
                      if (callback) {
                        // If a replacement function was provided, call it to obtain the value
                        // for serialization.
                        value = callback.call(object, property, value);
                      } // Exit early if value is `undefined` or `null`.
  
  
                      if (value == undefined) {
                        return value === undefined ? value : "null";
                      }
  
                      type = typeof value; // Only call `getClass` if the value is an object.
  
                      if (type == "object") {
                        className = getClass.call(value);
                      }
  
                      switch (className || type) {
                        case "boolean":
                        case booleanClass:
                          // Booleans are represented literally.
                          return "" + value;
  
                        case "number":
                        case numberClass:
                          // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                          // `"null"`.
                          return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
  
                        case "string":
                        case stringClass:
                          // Strings are double-quoted and escaped.
                          return quote("" + value);
                      } // Recursively serialize objects and arrays.
  
  
                      if (typeof value == "object") {
                        // Check for cyclic structures. This is a linear search; performance
                        // is inversely proportional to the number of unique nested objects.
                        for (length = stack.length; length--;) {
                          if (stack[length] === value) {
                            // Cyclic structures cannot be serialized by `JSON.stringify`.
                            throw TypeError();
                          }
                        } // Add the object to the stack of traversed objects.
  
  
                        stack.push(value);
                        results = []; // Save the current indentation level and indent one additional level.
  
                        prefix = indentation;
                        indentation += whitespace;
  
                        if (className == arrayClass) {
                          // Recursively serialize array elements.
                          for (index = 0, length = value.length; index < length; index++) {
                            element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                            results.push(element === undefined ? "null" : element);
                          }
  
                          result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                        } else {
                          // Recursively serialize object members. Members are selected from
                          // either a user-specified list of property names, or the object
                          // itself.
                          forOwn(properties || value, function (property) {
                            var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
  
                            if (element !== undefined) {
                              // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                              // is not the empty string, let `member` {quote(property) + ":"}
                              // be the concatenation of `member` and the `space` character."
                              // The "`space` character" refers to the literal space
                              // character, not the `space` {width} argument provided to
                              // `JSON.stringify`.
                              results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                            }
                          });
                          result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                        } // Remove the object from the traversed object stack.
  
  
                        stack.pop();
                        return result;
                      }
                    }; // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
  
  
                    exports.stringify = function (source, filter, width) {
                      var whitespace, callback, properties, className;
  
                      if (objectTypes[typeof filter] && filter) {
                        className = getClass.call(filter);
  
                        if (className == functionClass) {
                          callback = filter;
                        } else if (className == arrayClass) {
                          // Convert the property names array into a makeshift set.
                          properties = {};
  
                          for (var index = 0, length = filter.length, value; index < length;) {
                            value = filter[index++];
                            className = getClass.call(value);
  
                            if (className == "[object String]" || className == "[object Number]") {
                              properties[value] = 1;
                            }
                          }
                        }
                      }
  
                      if (width) {
                        className = getClass.call(width);
  
                        if (className == numberClass) {
                          // Convert the `width` to an integer and create a string containing
                          // `width` number of space characters.
                          if ((width -= width % 1) > 0) {
                            if (width > 10) {
                              width = 10;
                            }
  
                            for (whitespace = ""; whitespace.length < width;) {
                              whitespace += " ";
                            }
                          }
                        } else if (className == stringClass) {
                          whitespace = width.length <= 10 ? width : width.slice(0, 10);
                        }
                      } // Opera <= 7.54u2 discards the values associated with empty string keys
                      // (`""`) only if they are used directly within an object member list
                      // (e.g., `!("" in { "": 1})`).
  
  
                      return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                    };
                  }
                } // Public: Parses a JSON source string.
  
  
                if (!has("json-parse")) {
                  var fromCharCode = String.fromCharCode; // Internal: A map of escaped control characters and their unescaped
                  // equivalents.
  
                  var Unescapes = {
                    92: "\\",
                    34: '"',
                    47: "/",
                    98: "\b",
                    116: "\t",
                    110: "\n",
                    102: "\f",
                    114: "\r"
                  }; // Internal: Stores the parser state.
  
                  var Index, Source; // Internal: Resets the parser state and throws a `SyntaxError`.
  
                  var abort = function () {
                    Index = Source = null;
                    throw SyntaxError();
                  }; // Internal: Returns the next token, or `"$"` if the parser has reached
                  // the end of the source string. A token may be a string, number, `null`
                  // literal, or Boolean literal.
  
  
                  var lex = function () {
                    var source = Source,
                        length = source.length,
                        value,
                        begin,
                        position,
                        isSigned,
                        charCode;
  
                    while (Index < length) {
                      charCode = source.charCodeAt(Index);
  
                      switch (charCode) {
                        case 9:
                        case 10:
                        case 13:
                        case 32:
                          // Skip whitespace tokens, including tabs, carriage returns, line
                          // feeds, and space characters.
                          Index++;
                          break;
  
                        case 123:
                        case 125:
                        case 91:
                        case 93:
                        case 58:
                        case 44:
                          // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                          // the current position.
                          value = charIndexBuggy ? source.charAt(Index) : source[Index];
                          Index++;
                          return value;
  
                        case 34:
                          // `"` delimits a JSON string; advance to the next character and
                          // begin parsing the string. String tokens are prefixed with the
                          // sentinel `@` character to distinguish them from punctuators and
                          // end-of-string tokens.
                          for (value = "@", Index++; Index < length;) {
                            charCode = source.charCodeAt(Index);
  
                            if (charCode < 32) {
                              // Unescaped ASCII control characters (those with a code unit
                              // less than the space character) are not permitted.
                              abort();
                            } else if (charCode == 92) {
                              // A reverse solidus (`\`) marks the beginning of an escaped
                              // control character (including `"`, `\`, and `/`) or Unicode
                              // escape sequence.
                              charCode = source.charCodeAt(++Index);
  
                              switch (charCode) {
                                case 92:
                                case 34:
                                case 47:
                                case 98:
                                case 116:
                                case 110:
                                case 102:
                                case 114:
                                  // Revive escaped control characters.
                                  value += Unescapes[charCode];
                                  Index++;
                                  break;
  
                                case 117:
                                  // `\u` marks the beginning of a Unicode escape sequence.
                                  // Advance to the first character and validate the
                                  // four-digit code point.
                                  begin = ++Index;
  
                                  for (position = Index + 4; Index < position; Index++) {
                                    charCode = source.charCodeAt(Index); // A valid sequence comprises four hexdigits (case-
                                    // insensitive) that form a single hexadecimal value.
  
                                    if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                      // Invalid Unicode escape sequence.
                                      abort();
                                    }
                                  } // Revive the escaped character.
  
  
                                  value += fromCharCode("0x" + source.slice(begin, Index));
                                  break;
  
                                default:
                                  // Invalid escape sequence.
                                  abort();
                              }
                            } else {
                              if (charCode == 34) {
                                // An unescaped double-quote character marks the end of the
                                // string.
                                break;
                              }
  
                              charCode = source.charCodeAt(Index);
                              begin = Index; // Optimize for the common case where a string is valid.
  
                              while (charCode >= 32 && charCode != 92 && charCode != 34) {
                                charCode = source.charCodeAt(++Index);
                              } // Append the string as-is.
  
  
                              value += source.slice(begin, Index);
                            }
                          }
  
                          if (source.charCodeAt(Index) == 34) {
                            // Advance to the next character and return the revived string.
                            Index++;
                            return value;
                          } // Unterminated string.
  
  
                          abort();
  
                        default:
                          // Parse numbers and literals.
                          begin = Index; // Advance past the negative sign, if one is specified.
  
                          if (charCode == 45) {
                            isSigned = true;
                            charCode = source.charCodeAt(++Index);
                          } // Parse an integer or floating-point value.
  
  
                          if (charCode >= 48 && charCode <= 57) {
                            // Leading zeroes are interpreted as octal literals.
                            if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                              // Illegal octal literal.
                              abort();
                            }
  
                            isSigned = false; // Parse the integer component.
  
                            for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++); // Floats cannot contain a leading decimal point; however, this
                            // case is already accounted for by the parser.
  
  
                            if (source.charCodeAt(Index) == 46) {
                              position = ++Index; // Parse the decimal component.
  
                              for (; position < length; position++) {
                                charCode = source.charCodeAt(position);
  
                                if (charCode < 48 || charCode > 57) {
                                  break;
                                }
                              }
  
                              if (position == Index) {
                                // Illegal trailing decimal.
                                abort();
                              }
  
                              Index = position;
                            } // Parse exponents. The `e` denoting the exponent is
                            // case-insensitive.
  
  
                            charCode = source.charCodeAt(Index);
  
                            if (charCode == 101 || charCode == 69) {
                              charCode = source.charCodeAt(++Index); // Skip past the sign following the exponent, if one is
                              // specified.
  
                              if (charCode == 43 || charCode == 45) {
                                Index++;
                              } // Parse the exponential component.
  
  
                              for (position = Index; position < length; position++) {
                                charCode = source.charCodeAt(position);
  
                                if (charCode < 48 || charCode > 57) {
                                  break;
                                }
                              }
  
                              if (position == Index) {
                                // Illegal empty exponent.
                                abort();
                              }
  
                              Index = position;
                            } // Coerce the parsed value to a JavaScript number.
  
  
                            return +source.slice(begin, Index);
                          } // A negative sign may only precede numbers.
  
  
                          if (isSigned) {
                            abort();
                          } // `true`, `false`, and `null` literals.
  
  
                          var temp = source.slice(Index, Index + 4);
  
                          if (temp == "true") {
                            Index += 4;
                            return true;
                          } else if (temp == "fals" && source.charCodeAt(Index + 4) == 101) {
                            Index += 5;
                            return false;
                          } else if (temp == "null") {
                            Index += 4;
                            return null;
                          } // Unrecognized token.
  
  
                          abort();
                      }
                    } // Return the sentinel `$` character if the parser has reached the end
                    // of the source string.
  
  
                    return "$";
                  }; // Internal: Parses a JSON `value` token.
  
  
                  var get = function (value) {
                    var results, hasMembers;
  
                    if (value == "$") {
                      // Unexpected end of input.
                      abort();
                    }
  
                    if (typeof value == "string") {
                      if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                        // Remove the sentinel `@` character.
                        return value.slice(1);
                      } // Parse object and array literals.
  
  
                      if (value == "[") {
                        // Parses a JSON array, returning a new JavaScript array.
                        results = [];
  
                        for (;;) {
                          value = lex(); // A closing square bracket marks the end of the array literal.
  
                          if (value == "]") {
                            break;
                          } // If the array literal contains elements, the current token
                          // should be a comma separating the previous element from the
                          // next.
  
  
                          if (hasMembers) {
                            if (value == ",") {
                              value = lex();
  
                              if (value == "]") {
                                // Unexpected trailing `,` in array literal.
                                abort();
                              }
                            } else {
                              // A `,` must separate each array element.
                              abort();
                            }
                          } else {
                            hasMembers = true;
                          } // Elisions and leading commas are not permitted.
  
  
                          if (value == ",") {
                            abort();
                          }
  
                          results.push(get(value));
                        }
  
                        return results;
                      } else if (value == "{") {
                        // Parses a JSON object, returning a new JavaScript object.
                        results = {};
  
                        for (;;) {
                          value = lex(); // A closing curly brace marks the end of the object literal.
  
                          if (value == "}") {
                            break;
                          } // If the object literal contains members, the current token
                          // should be a comma separator.
  
  
                          if (hasMembers) {
                            if (value == ",") {
                              value = lex();
  
                              if (value == "}") {
                                // Unexpected trailing `,` in object literal.
                                abort();
                              }
                            } else {
                              // A `,` must separate each object member.
                              abort();
                            }
                          } else {
                            hasMembers = true;
                          } // Leading commas are not permitted, object property names must be
                          // double-quoted strings, and a `:` must separate each property
                          // name and value.
  
  
                          if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                            abort();
                          }
  
                          results[value.slice(1)] = get(lex());
                        }
  
                        return results;
                      } // Unexpected token encountered.
  
  
                      abort();
                    }
  
                    return value;
                  }; // Internal: Updates a traversed object member.
  
  
                  var update = function (source, property, callback) {
                    var element = walk(source, property, callback);
  
                    if (element === undefined) {
                      delete source[property];
                    } else {
                      source[property] = element;
                    }
                  }; // Internal: Recursively traverses a parsed JSON object, invoking the
                  // `callback` function for each value. This is an implementation of the
                  // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
  
  
                  var walk = function (source, property, callback) {
                    var value = source[property],
                        length;
  
                    if (typeof value == "object" && value) {
                      // `forOwn` can't be used to traverse an array in Opera <= 8.54
                      // because its `Object#hasOwnProperty` implementation returns `false`
                      // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                      if (getClass.call(value) == arrayClass) {
                        for (length = value.length; length--;) {
                          update(getClass, forOwn, value, length, callback);
                        }
                      } else {
                        forOwn(value, function (property) {
                          update(value, property, callback);
                        });
                      }
                    }
  
                    return callback.call(source, property, value);
                  }; // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
  
  
                  exports.parse = function (source, callback) {
                    var result, value;
                    Index = 0;
                    Source = "" + source;
                    result = get(lex()); // If a JSON string contains multiple tokens, it is invalid.
  
                    if (lex() != "$") {
                      abort();
                    } // Reset the parser state.
  
  
                    Index = Source = null;
                    return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
                  };
                }
              }
  
              exports.runInContext = runInContext;
              return exports;
            }
  
            if (freeExports && !isLoader) {
              // Export for CommonJS environments.
              runInContext(root, freeExports);
            } else {
              // Export for web browsers and JavaScript engines.
              var nativeJSON = root.JSON,
                  previousJSON = root.JSON3,
                  isRestored = false;
              var JSON3 = runInContext(root, root.JSON3 = {
                // Public: Restores the original value of the global `JSON` object and
                // returns a reference to the `JSON3` object.
                "noConflict": function () {
                  if (!isRestored) {
                    isRestored = true;
                    root.JSON = nativeJSON;
                    root.JSON3 = previousJSON;
                    nativeJSON = previousJSON = null;
                  }
  
                  return JSON3;
                }
              });
              root.JSON = {
                "parse": JSON3.parse,
                "stringify": JSON3.stringify
              };
            } // Export for asynchronous module loaders.
  
  
            if (isLoader) {
              define(function () {
                return JSON3;
              });
            }
          }).call(this);
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      59: [function (require, module, exports) {
        'use strict';
  
        var has = Object.prototype.hasOwnProperty,
            undef;
        /**
         * Decode a URI encoded string.
         *
         * @param {String} input The URI encoded string.
         * @returns {String|Null} The decoded string.
         * @api private
         */
  
        function decode(input) {
          try {
            return decodeURIComponent(input.replace(/\+/g, ' '));
          } catch (e) {
            return null;
          }
        }
        /**
         * Attempts to encode a given input.
         *
         * @param {String} input The string that needs to be encoded.
         * @returns {String|Null} The encoded string.
         * @api private
         */
  
  
        function encode(input) {
          try {
            return encodeURIComponent(input);
          } catch (e) {
            return null;
          }
        }
        /**
         * Simple query string parser.
         *
         * @param {String} query The query string that needs to be parsed.
         * @returns {Object}
         * @api public
         */
  
  
        function querystring(query) {
          var parser = /([^=?&]+)=?([^&]*)/g,
              result = {},
              part;
  
          while (part = parser.exec(query)) {
            var key = decode(part[1]),
                value = decode(part[2]); //
            // Prevent overriding of existing properties. This ensures that build-in
            // methods like `toString` or __proto__ are not overriden by malicious
            // querystrings.
            //
            // In the case if failed decoding, we want to omit the key/value pairs
            // from the result.
            //
  
            if (key === null || value === null || key in result) continue;
            result[key] = value;
          }
  
          return result;
        }
        /**
         * Transform a query string to an object.
         *
         * @param {Object} obj Object that should be transformed.
         * @param {String} prefix Optional prefix.
         * @returns {String}
         * @api public
         */
  
  
        function querystringify(obj, prefix) {
          prefix = prefix || '';
          var pairs = [],
              value,
              key; //
          // Optionally prefix with a '?' if needed
          //
  
          if ('string' !== typeof prefix) prefix = '?';
  
          for (key in obj) {
            if (has.call(obj, key)) {
              value = obj[key]; //
              // Edge cases where we actually want to encode the value to an empty
              // string instead of the stringified value.
              //
  
              if (!value && (value === null || value === undef || isNaN(value))) {
                value = '';
              }
  
              key = encodeURIComponent(key);
              value = encodeURIComponent(value); //
              // If we failed to encode the strings, we should bail out as we don't
              // want to add invalid strings to the query.
              //
  
              if (key === null || value === null) continue;
              pairs.push(key + '=' + value);
            }
          }
  
          return pairs.length ? prefix + pairs.join('&') : '';
        } //
        // Expose the module.
        //
  
  
        exports.stringify = querystringify;
        exports.parse = querystring;
      }, {}],
      60: [function (require, module, exports) {
        'use strict';
        /**
         * Check if we're required to add a port number.
         *
         * @see https://url.spec.whatwg.org/#default-port
         * @param {Number|String} port Port number we need to check
         * @param {String} protocol Protocol we need to check against.
         * @returns {Boolean} Is it a default port for the given protocol
         * @api private
         */
  
        module.exports = function required(port, protocol) {
          protocol = protocol.split(':')[0];
          port = +port;
          if (!port) return false;
  
          switch (protocol) {
            case 'http':
            case 'ws':
              return port !== 80;
  
            case 'https':
            case 'wss':
              return port !== 443;
  
            case 'ftp':
              return port !== 21;
  
            case 'gopher':
              return port !== 70;
  
            case 'file':
              return false;
          }
  
          return port !== 0;
        };
      }, {}],
      61: [function (require, module, exports) {
        (function (global) {
          'use strict';
  
          var required = require('requires-port'),
              qs = require('querystringify'),
              slashes = /^[A-Za-z][A-Za-z0-9+-.]*:[\\/]+/,
              protocolre = /^([a-z][a-z0-9.+-]*:)?([\\/]{1,})?([\S\s]*)/i,
              whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]',
              left = new RegExp('^' + whitespace + '+');
          /**
           * Trim a given string.
           *
           * @param {String} str String to trim.
           * @public
           */
  
  
          function trimLeft(str) {
            return (str ? str : '').toString().replace(left, '');
          }
          /**
           * These are the parse rules for the URL parser, it informs the parser
           * about:
           *
           * 0. The char it Needs to parse, if it's a string it should be done using
           *    indexOf, RegExp using exec and NaN means set as current value.
           * 1. The property we should set when parsing this value.
           * 2. Indication if it's backwards or forward parsing, when set as number it's
           *    the value of extra chars that should be split off.
           * 3. Inherit from location if non existing in the parser.
           * 4. `toLowerCase` the resulting value.
           */
  
  
          var rules = [['#', 'hash'], // Extract from the back.
          ['?', 'query'], // Extract from the back.
          function sanitize(address) {
            // Sanitize what is left of the address
            return address.replace('\\', '/');
          }, ['/', 'pathname'], // Extract from the back.
          ['@', 'auth', 1], // Extract from the front.
          [NaN, 'host', undefined, 1, 1], // Set left over value.
          [/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
          [NaN, 'hostname', undefined, 1, 1] // Set left over.
          ];
          /**
           * These properties should not be copied or inherited from. This is only needed
           * for all non blob URL's as a blob URL does not include a hash, only the
           * origin.
           *
           * @type {Object}
           * @private
           */
  
          var ignore = {
            hash: 1,
            query: 1
          };
          /**
           * The location object differs when your code is loaded through a normal page,
           * Worker or through a worker using a blob. And with the blobble begins the
           * trouble as the location object will contain the URL of the blob, not the
           * location of the page where our code is loaded in. The actual origin is
           * encoded in the `pathname` so we can thankfully generate a good "default"
           * location from it so we can generate proper relative URL's again.
           *
           * @param {Object|String} loc Optional default location object.
           * @returns {Object} lolcation object.
           * @public
           */
  
          function lolcation(loc) {
            var globalVar;
            if (typeof window !== 'undefined') globalVar = window;else if (typeof global !== 'undefined') globalVar = global;else if (typeof self !== 'undefined') globalVar = self;else globalVar = {};
            var location = globalVar.location || {};
            loc = loc || location;
            var finaldestination = {},
                type = typeof loc,
                key;
  
            if ('blob:' === loc.protocol) {
              finaldestination = new Url(unescape(loc.pathname), {});
            } else if ('string' === type) {
              finaldestination = new Url(loc, {});
  
              for (key in ignore) delete finaldestination[key];
            } else if ('object' === type) {
              for (key in loc) {
                if (key in ignore) continue;
                finaldestination[key] = loc[key];
              }
  
              if (finaldestination.slashes === undefined) {
                finaldestination.slashes = slashes.test(loc.href);
              }
            }
  
            return finaldestination;
          }
          /**
           * @typedef ProtocolExtract
           * @type Object
           * @property {String} protocol Protocol matched in the URL, in lowercase.
           * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
           * @property {String} rest Rest of the URL that is not part of the protocol.
           */
  
          /**
           * Extract protocol information from a URL with/without double slash ("//").
           *
           * @param {String} address URL we want to extract from.
           * @return {ProtocolExtract} Extracted information.
           * @private
           */
  
  
          function extractProtocol(address) {
            address = trimLeft(address);
            var match = protocolre.exec(address),
                protocol = match[1] ? match[1].toLowerCase() : '',
                slashes = !!(match[2] && match[2].length >= 2),
                rest = match[2] && match[2].length === 1 ? '/' + match[3] : match[3];
            return {
              protocol: protocol,
              slashes: slashes,
              rest: rest
            };
          }
          /**
           * Resolve a relative URL pathname against a base URL pathname.
           *
           * @param {String} relative Pathname of the relative URL.
           * @param {String} base Pathname of the base URL.
           * @return {String} Resolved pathname.
           * @private
           */
  
  
          function resolve(relative, base) {
            if (relative === '') return base;
            var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
                i = path.length,
                last = path[i - 1],
                unshift = false,
                up = 0;
  
            while (i--) {
              if (path[i] === '.') {
                path.splice(i, 1);
              } else if (path[i] === '..') {
                path.splice(i, 1);
                up++;
              } else if (up) {
                if (i === 0) unshift = true;
                path.splice(i, 1);
                up--;
              }
            }
  
            if (unshift) path.unshift('');
            if (last === '.' || last === '..') path.push('');
            return path.join('/');
          }
          /**
           * The actual URL instance. Instead of returning an object we've opted-in to
           * create an actual constructor as it's much more memory efficient and
           * faster and it pleases my OCD.
           *
           * It is worth noting that we should not use `URL` as class name to prevent
           * clashes with the global URL instance that got introduced in browsers.
           *
           * @constructor
           * @param {String} address URL we want to parse.
           * @param {Object|String} [location] Location defaults for relative paths.
           * @param {Boolean|Function} [parser] Parser for the query string.
           * @private
           */
  
  
          function Url(address, location, parser) {
            address = trimLeft(address);
  
            if (!(this instanceof Url)) {
              return new Url(address, location, parser);
            }
  
            var relative,
                extracted,
                parse,
                instruction,
                index,
                key,
                instructions = rules.slice(),
                type = typeof location,
                url = this,
                i = 0; //
            // The following if statements allows this module two have compatibility with
            // 2 different API:
            //
            // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
            //    where the boolean indicates that the query string should also be parsed.
            //
            // 2. The `URL` interface of the browser which accepts a URL, object as
            //    arguments. The supplied object will be used as default values / fall-back
            //    for relative paths.
            //
  
            if ('object' !== type && 'string' !== type) {
              parser = location;
              location = null;
            }
  
            if (parser && 'function' !== typeof parser) parser = qs.parse;
            location = lolcation(location); //
            // Extract protocol information before running the instructions.
            //
  
            extracted = extractProtocol(address || '');
            relative = !extracted.protocol && !extracted.slashes;
            url.slashes = extracted.slashes || relative && location.slashes;
            url.protocol = extracted.protocol || location.protocol || '';
            address = extracted.rest; //
            // When the authority component is absent the URL starts with a path
            // component.
            //
  
            if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];
  
            for (; i < instructions.length; i++) {
              instruction = instructions[i];
  
              if (typeof instruction === 'function') {
                address = instruction(address);
                continue;
              }
  
              parse = instruction[0];
              key = instruction[1];
  
              if (parse !== parse) {
                url[key] = address;
              } else if ('string' === typeof parse) {
                if (~(index = address.indexOf(parse))) {
                  if ('number' === typeof instruction[2]) {
                    url[key] = address.slice(0, index);
                    address = address.slice(index + instruction[2]);
                  } else {
                    url[key] = address.slice(index);
                    address = address.slice(0, index);
                  }
                }
              } else if (index = parse.exec(address)) {
                url[key] = index[1];
                address = address.slice(0, index.index);
              }
  
              url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : ''); //
              // Hostname, host and protocol should be lowercased so they can be used to
              // create a proper `origin`.
              //
  
              if (instruction[4]) url[key] = url[key].toLowerCase();
            } //
            // Also parse the supplied query string in to an object. If we're supplied
            // with a custom parser as function use that instead of the default build-in
            // parser.
            //
  
  
            if (parser) url.query = parser(url.query); //
            // If the URL is relative, resolve the pathname against the base URL.
            //
  
            if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
              url.pathname = resolve(url.pathname, location.pathname);
            } //
            // Default to a / for pathname if none exists. This normalizes the URL
            // to always have a /
            //
  
  
            if (url.pathname.charAt(0) !== '/' && url.hostname) {
              url.pathname = '/' + url.pathname;
            } //
            // We should not add port numbers if they are already the default port number
            // for a given protocol. As the host also contains the port number we're going
            // override it with the hostname which contains no port number.
            //
  
  
            if (!required(url.port, url.protocol)) {
              url.host = url.hostname;
              url.port = '';
            } //
            // Parse down the `auth` for the username and password.
            //
  
  
            url.username = url.password = '';
  
            if (url.auth) {
              instruction = url.auth.split(':');
              url.username = instruction[0] || '';
              url.password = instruction[1] || '';
            }
  
            url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null'; //
            // The href is just the compiled result.
            //
  
            url.href = url.toString();
          }
          /**
           * This is convenience method for changing properties in the URL instance to
           * insure that they all propagate correctly.
           *
           * @param {String} part          Property we need to adjust.
           * @param {Mixed} value          The newly assigned value.
           * @param {Boolean|Function} fn  When setting the query, it will be the function
           *                               used to parse the query.
           *                               When setting the protocol, double slash will be
           *                               removed from the final url if it is true.
           * @returns {URL} URL instance for chaining.
           * @public
           */
  
  
          function set(part, value, fn) {
            var url = this;
  
            switch (part) {
              case 'query':
                if ('string' === typeof value && value.length) {
                  value = (fn || qs.parse)(value);
                }
  
                url[part] = value;
                break;
  
              case 'port':
                url[part] = value;
  
                if (!required(value, url.protocol)) {
                  url.host = url.hostname;
                  url[part] = '';
                } else if (value) {
                  url.host = url.hostname + ':' + value;
                }
  
                break;
  
              case 'hostname':
                url[part] = value;
                if (url.port) value += ':' + url.port;
                url.host = value;
                break;
  
              case 'host':
                url[part] = value;
  
                if (/:\d+$/.test(value)) {
                  value = value.split(':');
                  url.port = value.pop();
                  url.hostname = value.join(':');
                } else {
                  url.hostname = value;
                  url.port = '';
                }
  
                break;
  
              case 'protocol':
                url.protocol = value.toLowerCase();
                url.slashes = !fn;
                break;
  
              case 'pathname':
              case 'hash':
                if (value) {
                  var char = part === 'pathname' ? '/' : '#';
                  url[part] = value.charAt(0) !== char ? char + value : value;
                } else {
                  url[part] = value;
                }
  
                break;
  
              default:
                url[part] = value;
            }
  
            for (var i = 0; i < rules.length; i++) {
              var ins = rules[i];
              if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
            }
  
            url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';
            url.href = url.toString();
            return url;
          }
          /**
           * Transform the properties back in to a valid and full URL string.
           *
           * @param {Function} stringify Optional query stringify function.
           * @returns {String} Compiled version of the URL.
           * @public
           */
  
  
          function toString(stringify) {
            if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;
            var query,
                url = this,
                protocol = url.protocol;
            if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
            var result = protocol + (url.slashes ? '//' : '');
  
            if (url.username) {
              result += url.username;
              if (url.password) result += ':' + url.password;
              result += '@';
            }
  
            result += url.host + url.pathname;
            query = 'object' === typeof url.query ? stringify(url.query) : url.query;
            if (query) result += '?' !== query.charAt(0) ? '?' + query : query;
            if (url.hash) result += url.hash;
            return result;
          }
  
          Url.prototype = {
            set: set,
            toString: toString
          }; //
          // Expose the URL parser and some additional properties that might be useful for
          // others or testing.
          //
  
          Url.extractProtocol = extractProtocol;
          Url.location = lolcation;
          Url.trimLeft = trimLeft;
          Url.qs = qs;
          module.exports = Url;
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "querystringify": 59,
        "requires-port": 60
      }]
    }, {}, [1])(1);
  });
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))
  
  /***/ }),
  
  /***/ "./node_modules/strip-ansi/index.js":
  /*!******************************************!*\
    !*** ./node_modules/strip-ansi/index.js ***!
    \******************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();
  
  module.exports = function (str) {
    return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
  };
  
  /***/ }),
  
  /***/ "./node_modules/timers-browserify/main.js":
  /*!************************************************!*\
    !*** ./node_modules/timers-browserify/main.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
  var apply = Function.prototype.apply; // DOM APIs, for completeness
  
  exports.setTimeout = function () {
    return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
  };
  
  exports.setInterval = function () {
    return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
  };
  
  exports.clearTimeout = exports.clearInterval = function (timeout) {
    if (timeout) {
      timeout.close();
    }
  };
  
  function Timeout(id, clearFn) {
    this._id = id;
    this._clearFn = clearFn;
  }
  
  Timeout.prototype.unref = Timeout.prototype.ref = function () {};
  
  Timeout.prototype.close = function () {
    this._clearFn.call(scope, this._id);
  }; // Does not start the time, just sets up the members needed.
  
  
  exports.enroll = function (item, msecs) {
    clearTimeout(item._idleTimeoutId);
    item._idleTimeout = msecs;
  };
  
  exports.unenroll = function (item) {
    clearTimeout(item._idleTimeoutId);
    item._idleTimeout = -1;
  };
  
  exports._unrefActive = exports.active = function (item) {
    clearTimeout(item._idleTimeoutId);
    var msecs = item._idleTimeout;
  
    if (msecs >= 0) {
      item._idleTimeoutId = setTimeout(function onTimeout() {
        if (item._onTimeout) item._onTimeout();
      }, msecs);
    }
  }; // setimmediate attaches itself to the global object
  
  
  __webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js"); // On some exotic environments, it's not clear which object `setimmediate` was
  // able to install onto.  Search each possibility in the same order as the
  // `setimmediate` library.
  
  
  exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
  exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))
  
  /***/ }),
  
  /***/ "./node_modules/url/url.js":
  /*!*********************************!*\
    !*** ./node_modules/url/url.js ***!
    \*********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  
  var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
  
  var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");
  
  exports.parse = urlParse;
  exports.resolve = urlResolve;
  exports.resolveObject = urlResolveObject;
  exports.format = urlFormat;
  exports.Url = Url;
  
  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  } // Reference: RFC 3986, RFC 1808, RFC 2396
  // define these here so at least they only have to be
  // compiled once on the first module load.
  
  
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,
      // Special case for a simple path URL
  simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
      // RFC 2396: characters reserved for delimiting URLs.
  // We actually just auto-escape these.
  delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
      // RFC 2396: characters not allowed for various reasons.
  unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
  autoEscape = ['\''].concat(unwise),
      // Characters that are never ever allowed in a hostname.
  // Note that any invalid chars are also handled, but these
  // are the ones that are *expected* to be seen, so we fast-path
  // them.
  nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
      hostEndingChars = ['/', '?', '#'],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      // protocols that can allow "unsafe" and "unwise" chars.
  unsafeProtocol = {
    'javascript': true,
    'javascript:': true
  },
      // protocols that never have a hostname.
  hostlessProtocol = {
    'javascript': true,
    'javascript:': true
  },
      // protocols that always contain a // bit.
  slashedProtocol = {
    'http': true,
    'https': true,
    'ftp': true,
    'gopher': true,
    'file': true,
    'http:': true,
    'https:': true,
    'ftp:': true,
    'gopher:': true,
    'file:': true
  },
      querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
  
  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) return url;
    var u = new Url();
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }
  
  Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
    } // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
  
  
    var queryIndex = url.indexOf('?'),
        splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
        uSplit = url.split(splitter),
        slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);
    var rest = url; // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
  
    rest = rest.trim();
  
    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
  
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
  
        if (simplePath[2]) {
          this.search = simplePath[2];
  
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = '';
          this.query = {};
        }
  
        return this;
      }
    }
  
    var proto = protocolPattern.exec(rest);
  
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    } // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
  
  
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
  
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }
  
    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c
      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.
      // find the first instance of any hostEndingChars
      var hostEnd = -1;
  
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      } // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
  
  
      var auth, atSign;
  
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      } // Now we have a portion which is definitely the auth.
      // Pull that off.
  
  
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      } // the host is the remaining to the left of the first non-host char
  
  
      hostEnd = -1;
  
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
      } // if we still have not hit it, then the entire thing is a host.
  
  
      if (hostEnd === -1) hostEnd = rest.length;
      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd); // pull out port.
  
      this.parseHost(); // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
  
      this.hostname = this.hostname || ''; // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
  
      var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'; // validate a little.
  
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
  
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
  
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
  
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            } // we test again with ASCII char only
  
  
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
  
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
  
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
  
              this.hostname = validParts.join('.');
              break;
            }
          }
        }
      }
  
      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = '';
      } else {
        // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
      }
  
      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname);
      }
  
      var p = this.port ? ':' + this.port : '';
      var h = this.hostname || '';
      this.host = h + p;
      this.href += this.host; // strip [ and ] from the hostname
      // the host field still retains them, though
  
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
  
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    } // now rest is set to the post-host stuff.
    // chop off any delim chars.
  
  
    if (!unsafeProtocol[lowerProto]) {
      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1) continue;
        var esc = encodeURIComponent(ae);
  
        if (esc === ae) {
          esc = escape(ae);
        }
  
        rest = rest.split(ae).join(esc);
      }
    } // chop off from the tail first.
  
  
    var hash = rest.indexOf('#');
  
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
  
    var qm = rest.indexOf('?');
  
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
  
      if (parseQueryString) {
        this.query = querystring.parse(this.query);
      }
  
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      this.search = '';
      this.query = {};
    }
  
    if (rest) this.pathname = rest;
  
    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
      this.pathname = '/';
    } //to support http.request
  
  
    if (this.pathname || this.search) {
      var p = this.pathname || '';
      var s = this.search || '';
      this.path = p + s;
    } // finally, reconstruct the href based on what has been validated.
  
  
    this.href = this.format();
    return this;
  }; // format a parsed object into a url string
  
  
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (util.isString(obj)) obj = urlParse(obj);
    if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
    return obj.format();
  }
  
  Url.prototype.format = function () {
    var auth = this.auth || '';
  
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }
  
    var protocol = this.protocol || '',
        pathname = this.pathname || '',
        hash = this.hash || '',
        host = false,
        query = '';
  
    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
  
      if (this.port) {
        host += ':' + this.port;
      }
    }
  
    if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
      query = querystring.stringify(this.query);
    }
  
    var search = this.search || query && '?' + query || '';
    if (protocol && protocol.substr(-1) !== ':') protocol += ':'; // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
  
    if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }
  
    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, function (match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');
    return protocol + host + pathname + search + hash;
  };
  
  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }
  
  Url.prototype.resolve = function (relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };
  
  function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }
  
  Url.prototype.resolveObject = function (relative) {
    if (util.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }
  
    var result = new Url();
    var tkeys = Object.keys(this);
  
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    } // hash is always overridden, no matter what.
    // even href="" will remove it.
  
  
    result.hash = relative.hash; // if the relative url is empty, then there's nothing left to do here.
  
    if (relative.href === '') {
      result.href = result.format();
      return result;
    } // hrefs like //foo/bar always cut to the protocol.
  
  
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
  
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol') result[rkey] = relative[rkey];
      } //urlParse appends trailing / to urls like http://www.example.com
  
  
      if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }
  
      result.href = result.format();
      return result;
    }
  
    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
  
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
  
        result.href = result.format();
        return result;
      }
  
      result.protocol = relative.protocol;
  
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || '').split('/');
  
        while (relPath.length && !(relative.host = relPath.shift()));
  
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
  
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port; // to support http.request
  
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
  
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }
  
    var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
        isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
        mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
        removeAllDots = mustEndAbs,
        srcPath = result.pathname && result.pathname.split('/') || [],
        relPath = relative.pathname && relative.pathname.split('/') || [],
        psychotic = result.protocol && !slashedProtocol[result.protocol]; // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
  
    if (psychotic) {
      result.hostname = '';
      result.port = null;
  
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
      }
  
      result.host = '';
  
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
  
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
        }
  
        relative.host = null;
      }
  
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }
  
    if (isRelAbs) {
      // it's absolute.
      result.host = relative.host || relative.host === '' ? relative.host : result.host;
      result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath; // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!util.isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift(); //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
  
        var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
  
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
  
      result.search = relative.search;
      result.query = relative.query; //to support http.request
  
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
      }
  
      result.href = result.format();
      return result;
    }
  
    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null; //to support http.request
  
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
  
      result.href = result.format();
      return result;
    } // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
  
  
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === ''; // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
  
    var up = 0;
  
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
  
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    } // if the path is allowed to go above the root, restore leading ..s
  
  
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }
  
    if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }
  
    if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
      srcPath.push('');
    }
  
    var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/'; // put the host back
  
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : ''; //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
  
      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
  
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
  
    mustEndAbs = mustEndAbs || result.host && srcPath.length;
  
    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }
  
    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    } //to support request.http
  
  
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }
  
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };
  
  Url.prototype.parseHost = function () {
    var host = this.host;
    var port = portPattern.exec(host);
  
    if (port) {
      port = port[0];
  
      if (port !== ':') {
        this.port = port.substr(1);
      }
  
      host = host.substr(0, host.length - port.length);
    }
  
    if (host) this.hostname = host;
  };
  
  /***/ }),
  
  /***/ "./node_modules/url/util.js":
  /*!**********************************!*\
    !*** ./node_modules/url/util.js ***!
    \**********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  module.exports = {
    isString: function (arg) {
      return typeof arg === 'string';
    },
    isObject: function (arg) {
      return typeof arg === 'object' && arg !== null;
    },
    isNull: function (arg) {
      return arg === null;
    },
    isNullOrUndefined: function (arg) {
      return arg == null;
    }
  };
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/clients/BaseClient.js":
  /*!*********************************************************!*\
    !*** (webpack)-dev-server/client/clients/BaseClient.js ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  /* eslint-disable
    no-unused-vars
  */
  
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  
  module.exports = /*#__PURE__*/function () {
    function BaseClient() {
      _classCallCheck(this, BaseClient);
    }
  
    _createClass(BaseClient, null, [{
      key: "getClientPath",
      value: function getClientPath(options) {
        throw new Error('Client needs implementation');
      }
    }]);
  
    return BaseClient;
  }();
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js":
  /*!***********************************************************!*\
    !*** (webpack)-dev-server/client/clients/SockJSClient.js ***!
    \***********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  /* eslint-disable
    no-unused-vars
  */
  
  function _typeof(obj) {
    "@babel/helpers - typeof";
  
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
  
    return _typeof(obj);
  }
  
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
  
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  
    return _setPrototypeOf(o, p);
  }
  
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
  
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;
  
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
  
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
  
      return _possibleConstructorReturn(this, result);
    };
  }
  
  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }
  
    return _assertThisInitialized(self);
  }
  
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
  
    return self;
  }
  
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
  
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  
  var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");
  
  var BaseClient = __webpack_require__(/*! ./BaseClient */ "./node_modules/webpack-dev-server/client/clients/BaseClient.js");
  
  module.exports = /*#__PURE__*/function (_BaseClient) {
    _inherits(SockJSClient, _BaseClient);
  
    var _super = _createSuper(SockJSClient);
  
    function SockJSClient(url) {
      var _this;
  
      _classCallCheck(this, SockJSClient);
  
      _this = _super.call(this);
      _this.sock = new SockJS(url);
  
      _this.sock.onerror = function (err) {// TODO: use logger to log the error event once client and client-src
        // are reorganized to have the same directory structure
      };
  
      return _this;
    }
  
    _createClass(SockJSClient, [{
      key: "onOpen",
      value: function onOpen(f) {
        this.sock.onopen = f;
      }
    }, {
      key: "onClose",
      value: function onClose(f) {
        this.sock.onclose = f;
      } // call f with the message string as the first argument
  
    }, {
      key: "onMessage",
      value: function onMessage(f) {
        this.sock.onmessage = function (e) {
          f(e.data);
        };
      }
    }], [{
      key: "getClientPath",
      value: function getClientPath(options) {
        return /*require.resolve*/(/*! ./SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
      }
    }]);
  
    return SockJSClient;
  }(BaseClient);
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost:8082":
  /*!*********************************************************!*\
    !*** (webpack)-dev-server/client?http://localhost:8082 ***!
    \*********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  /* WEBPACK VAR INJECTION */(function(__resourceQuery) {
  /* global __resourceQuery WorkerGlobalScope self */
  
  /* eslint prefer-destructuring: off */
  
  var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");
  
  var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");
  
  var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");
  
  var _require = __webpack_require__(/*! ./utils/log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
      log = _require.log,
      setLogLevel = _require.setLogLevel;
  
  var sendMessage = __webpack_require__(/*! ./utils/sendMessage */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
  
  var reloadApp = __webpack_require__(/*! ./utils/reloadApp */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
  
  var createSocketUrl = __webpack_require__(/*! ./utils/createSocketUrl */ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js");
  
  var status = {
    isUnloading: false,
    currentHash: ''
  };
  var options = {
    hot: false,
    hotReload: true,
    liveReload: false,
    initial: true,
    useWarningOverlay: false,
    useErrorOverlay: false,
    useProgress: false
  };
  var socketUrl = createSocketUrl(__resourceQuery);
  self.addEventListener('beforeunload', function () {
    status.isUnloading = true;
  });
  
  if (typeof window !== 'undefined') {
    var qs = window.location.search.toLowerCase();
    options.hotReload = qs.indexOf('hotreload=false') === -1;
  }
  
  var onSocketMessage = {
    hot: function hot() {
      options.hot = true;
      log.info('[WDS] Hot Module Replacement enabled.');
    },
    liveReload: function liveReload() {
      options.liveReload = true;
      log.info('[WDS] Live Reloading enabled.');
    },
    invalid: function invalid() {
      log.info('[WDS] App updated. Recompiling...'); // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
  
      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }
  
      sendMessage('Invalid');
    },
    hash: function hash(_hash) {
      status.currentHash = _hash;
    },
    'still-ok': function stillOk() {
      log.info('[WDS] Nothing changed.');
  
      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }
  
      sendMessage('StillOk');
    },
    'log-level': function logLevel(level) {
      var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");
  
      if (hotCtx.keys().indexOf('./log') !== -1) {
        hotCtx('./log').setLogLevel(level);
      }
  
      setLogLevel(level);
    },
    overlay: function overlay(value) {
      if (typeof document !== 'undefined') {
        if (typeof value === 'boolean') {
          options.useWarningOverlay = false;
          options.useErrorOverlay = value;
        } else if (value) {
          options.useWarningOverlay = value.warnings;
          options.useErrorOverlay = value.errors;
        }
      }
    },
    progress: function progress(_progress) {
      if (typeof document !== 'undefined') {
        options.useProgress = _progress;
      }
    },
    'progress-update': function progressUpdate(data) {
      if (options.useProgress) {
        log.info("[WDS] ".concat(data.percent, "% - ").concat(data.msg, "."));
      }
  
      sendMessage('Progress', data);
    },
    ok: function ok() {
      sendMessage('Ok');
  
      if (options.useWarningOverlay || options.useErrorOverlay) {
        overlay.clear();
      }
  
      if (options.initial) {
        return options.initial = false;
      } // eslint-disable-line no-return-assign
  
  
      reloadApp(options, status);
    },
    'content-changed': function contentChanged() {
      log.info('[WDS] Content base changed. Reloading...');
      self.location.reload();
    },
    warnings: function warnings(_warnings) {
      log.warn('[WDS] Warnings while compiling.');
  
      var strippedWarnings = _warnings.map(function (warning) {
        return stripAnsi(warning);
      });
  
      sendMessage('Warnings', strippedWarnings);
  
      for (var i = 0; i < strippedWarnings.length; i++) {
        log.warn(strippedWarnings[i]);
      }
  
      if (options.useWarningOverlay) {
        overlay.showMessage(_warnings);
      }
  
      if (options.initial) {
        return options.initial = false;
      } // eslint-disable-line no-return-assign
  
  
      reloadApp(options, status);
    },
    errors: function errors(_errors) {
      log.error('[WDS] Errors while compiling. Reload prevented.');
  
      var strippedErrors = _errors.map(function (error) {
        return stripAnsi(error);
      });
  
      sendMessage('Errors', strippedErrors);
  
      for (var i = 0; i < strippedErrors.length; i++) {
        log.error(strippedErrors[i]);
      }
  
      if (options.useErrorOverlay) {
        overlay.showMessage(_errors);
      }
  
      options.initial = false;
    },
    error: function error(_error) {
      log.error(_error);
    },
    close: function close() {
      log.error('[WDS] Disconnected!');
      sendMessage('Close');
    }
  };
  socket(socketUrl, onSocketMessage);
  /* WEBPACK VAR INJECTION */}.call(this, "?http://localhost:8082"))
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/overlay.js":
  /*!**********************************************!*\
    !*** (webpack)-dev-server/client/overlay.js ***!
    \**********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
   // The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
  // They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).
  
  var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");
  
  var _require = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js"),
      AllHtmlEntities = _require.AllHtmlEntities;
  
  var entities = new AllHtmlEntities();
  var colors = {
    reset: ['transparent', 'transparent'],
    black: '181818',
    red: 'E36049',
    green: 'B3CB74',
    yellow: 'FFD080',
    blue: '7CAFC2',
    magenta: '7FACCA',
    cyan: 'C3C2EF',
    lightgrey: 'EBE7E3',
    darkgrey: '6D7891'
  };
  var overlayIframe = null;
  var overlayDiv = null;
  var lastOnOverlayDivReady = null;
  ansiHTML.setColors(colors);
  
  function createOverlayIframe(onIframeLoad) {
    var iframe = document.createElement('iframe');
    iframe.id = 'webpack-dev-server-client-overlay';
    iframe.src = 'about:blank';
    iframe.style.position = 'fixed';
    iframe.style.left = 0;
    iframe.style.top = 0;
    iframe.style.right = 0;
    iframe.style.bottom = 0;
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.zIndex = 9999999999;
    iframe.onload = onIframeLoad;
    return iframe;
  }
  
  function addOverlayDivTo(iframe) {
    var div = iframe.contentDocument.createElement('div');
    div.id = 'webpack-dev-server-client-overlay-div';
    div.style.position = 'fixed';
    div.style.boxSizing = 'border-box';
    div.style.left = 0;
    div.style.top = 0;
    div.style.right = 0;
    div.style.bottom = 0;
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    div.style.color = '#E8E8E8';
    div.style.fontFamily = 'Menlo, Consolas, monospace';
    div.style.fontSize = 'large';
    div.style.padding = '2rem';
    div.style.lineHeight = '1.2';
    div.style.whiteSpace = 'pre-wrap';
    div.style.overflow = 'auto';
    iframe.contentDocument.body.appendChild(div);
    return div;
  }
  
  function ensureOverlayDivExists(onOverlayDivReady) {
    if (overlayDiv) {
      // Everything is ready, call the callback right away.
      onOverlayDivReady(overlayDiv);
      return;
    } // Creating an iframe may be asynchronous so we'll schedule the callback.
    // In case of multiple calls, last callback wins.
  
  
    lastOnOverlayDivReady = onOverlayDivReady;
  
    if (overlayIframe) {
      // We've already created it.
      return;
    } // Create iframe and, when it is ready, a div inside it.
  
  
    overlayIframe = createOverlayIframe(function () {
      overlayDiv = addOverlayDivTo(overlayIframe); // Now we can talk!
  
      lastOnOverlayDivReady(overlayDiv);
    }); // Zalgo alert: onIframeLoad() will be called either synchronously
    // or asynchronously depending on the browser.
    // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.
  
    document.body.appendChild(overlayIframe);
  } // Successful compilation.
  
  
  function clear() {
    if (!overlayDiv) {
      // It is not there in the first place.
      return;
    } // Clean up and reset internal state.
  
  
    document.body.removeChild(overlayIframe);
    overlayDiv = null;
    overlayIframe = null;
    lastOnOverlayDivReady = null;
  } // Compilation with errors (e.g. syntax error or missing modules).
  
  
  function showMessage(messages) {
    ensureOverlayDivExists(function (div) {
      // Make it look similar to our terminal.
      div.innerHTML = "<span style=\"color: #".concat(colors.red, "\">Failed to compile.</span><br><br>").concat(ansiHTML(entities.encode(messages[0])));
    });
  }
  
  module.exports = {
    clear: clear,
    showMessage: showMessage
  };
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/socket.js":
  /*!*********************************************!*\
    !*** (webpack)-dev-server/client/socket.js ***!
    \*********************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  /* WEBPACK VAR INJECTION */(function(__webpack_dev_server_client__) {
  /* global __webpack_dev_server_client__ */
  
  /* eslint-disable
    camelcase
  */
  // this SockJSClient is here as a default fallback, in case inline mode
  // is off or the client is not injected. This will be switched to
  // WebsocketClient when it becomes the default
  // important: the path to SockJSClient here is made to work in the 'client'
  // directory, but is updated via the webpack compilation when compiled from
  // the 'client-src' directory
  
  var Client = typeof __webpack_dev_server_client__ !== 'undefined' ? __webpack_dev_server_client__ : // eslint-disable-next-line import/no-unresolved
  __webpack_require__(/*! ./clients/SockJSClient */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js");
  var retries = 0;
  var client = null;
  
  var socket = function initSocket(url, handlers) {
    client = new Client(url);
    client.onOpen(function () {
      retries = 0;
    });
    client.onClose(function () {
      if (retries === 0) {
        handlers.close();
      } // Try to reconnect.
  
  
      client = null; // After 10 retries stop trying, to prevent logspam.
  
      if (retries <= 10) {
        // Exponentially increase timeout to reconnect.
        // Respectfully copied from the package `got`.
        // eslint-disable-next-line no-mixed-operators, no-restricted-properties
        var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
        retries += 1;
        setTimeout(function () {
          socket(url, handlers);
        }, retryInMs);
      }
    });
    client.onMessage(function (data) {
      var msg = JSON.parse(data);
  
      if (handlers[msg.type]) {
        handlers[msg.type](msg.data);
      }
    });
  };
  
  module.exports = socket;
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)-dev-server/client/clients/SockJSClient.js */ "./node_modules/webpack-dev-server/client/clients/SockJSClient.js")))
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/utils/createSocketUrl.js":
  /*!************************************************************!*\
    !*** (webpack)-dev-server/client/utils/createSocketUrl.js ***!
    \************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  /* global self */
  
  var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");
  
  var getCurrentScriptSource = __webpack_require__(/*! ./getCurrentScriptSource */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");
  
  function createSocketUrl(resourceQuery, currentLocation) {
    var urlParts;
  
    if (typeof resourceQuery === 'string' && resourceQuery !== '') {
      // If this bundle is inlined, use the resource query to get the correct url.
      // format is like `?http://0.0.0.0:8096&sockPort=8097&sockHost=localhost`
      urlParts = url.parse(resourceQuery // strip leading `?` from query string to get a valid URL
      .substr(1) // replace first `&` with `?` to have a valid query string
      .replace('&', '?'), true);
    } else {
      // Else, get the url from the <script> this file was called with.
      var scriptHost = getCurrentScriptSource();
      urlParts = url.parse(scriptHost || '/', true, true);
    } // Use parameter to allow passing location in unit tests
  
  
    if (typeof currentLocation === 'string' && currentLocation !== '') {
      currentLocation = url.parse(currentLocation);
    } else {
      currentLocation = self.location;
    }
  
    return getSocketUrl(urlParts, currentLocation);
  }
  /*
   * Gets socket URL based on Script Source/Location
   * (scriptSrc: URL, location: URL) -> URL
   */
  
  
  function getSocketUrl(urlParts, loc) {
    var auth = urlParts.auth,
        query = urlParts.query;
    var hostname = urlParts.hostname,
        protocol = urlParts.protocol,
        port = urlParts.port;
  
    if (!port || port === '0') {
      port = loc.port;
    } // check ipv4 and ipv6 `all hostname`
    // why do we need this check?
    // hostname n/a for file protocol (example, when using electron, ionic)
    // see: https://github.com/webpack/webpack-dev-server/pull/384
  
  
    if ((hostname === '0.0.0.0' || hostname === '::') && loc.hostname && loc.protocol.indexOf('http') === 0) {
      hostname = loc.hostname;
    } // `hostname` can be empty when the script path is relative. In that case, specifying
    // a protocol would result in an invalid URL.
    // When https is used in the app, secure websockets are always necessary
    // because the browser doesn't accept non-secure websockets.
  
  
    if (hostname && hostname !== '127.0.0.1' && (loc.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
      protocol = loc.protocol;
    } // all of these sock url params are optionally passed in through
    // resourceQuery, so we need to fall back to the default if
    // they are not provided
  
  
    var sockHost = query.sockHost || hostname;
    var sockPath = query.sockPath || '/sockjs-node';
    var sockPort = query.sockPort || port;
  
    if (sockPort === 'location') {
      sockPort = loc.port;
    }
  
    return url.format({
      protocol: protocol,
      auth: auth,
      hostname: sockHost,
      port: sockPort,
      // If sockPath is provided it'll be passed in via the resourceQuery as a
      // query param so it has to be parsed out of the querystring in order for the
      // client to open the socket to the correct location.
      pathname: sockPath
    });
  }
  
  module.exports = createSocketUrl;
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
  /*!*******************************************************************!*\
    !*** (webpack)-dev-server/client/utils/getCurrentScriptSource.js ***!
    \*******************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  function getCurrentScriptSource() {
    // `document.currentScript` is the most accurate way to find the current script,
    // but is not supported in all browsers.
    if (document.currentScript) {
      return document.currentScript.getAttribute('src');
    } // Fall back to getting all scripts in the document.
  
  
    var scriptElements = document.scripts || [];
    var currentScript = scriptElements[scriptElements.length - 1];
  
    if (currentScript) {
      return currentScript.getAttribute('src');
    } // Fail as there was no script to use.
  
  
    throw new Error('[WDS] Failed to get current script source.');
  }
  
  module.exports = getCurrentScriptSource;
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/utils/log.js":
  /*!************************************************!*\
    !*** (webpack)-dev-server/client/utils/log.js ***!
    \************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  
  var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');
  
  var INFO = 'info';
  var WARN = 'warn';
  var ERROR = 'error';
  var DEBUG = 'debug';
  var TRACE = 'trace';
  var SILENT = 'silent'; // deprecated
  // TODO: remove these at major released
  // https://github.com/webpack/webpack-dev-server/pull/1825
  
  var WARNING = 'warning';
  var NONE = 'none'; // Set the default log level
  
  log.setDefaultLevel(INFO);
  
  function setLogLevel(level) {
    switch (level) {
      case INFO:
      case WARN:
      case ERROR:
      case DEBUG:
      case TRACE:
        log.setLevel(level);
        break;
      // deprecated
  
      case WARNING:
        // loglevel's warning name is different from webpack's
        log.setLevel('warn');
        break;
      // deprecated
  
      case NONE:
      case SILENT:
        log.disableAll();
        break;
  
      default:
        log.error("[WDS] Unknown clientLogLevel '".concat(level, "'"));
    }
  }
  
  module.exports = {
    log: log,
    setLogLevel: setLogLevel
  };
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
  /*!******************************************************!*\
    !*** (webpack)-dev-server/client/utils/reloadApp.js ***!
    \******************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  /* global WorkerGlobalScope self */
  
  var _require = __webpack_require__(/*! ./log */ "./node_modules/webpack-dev-server/client/utils/log.js"),
      log = _require.log;
  
  function reloadApp(_ref, _ref2) {
    var hotReload = _ref.hotReload,
        hot = _ref.hot,
        liveReload = _ref.liveReload;
    var isUnloading = _ref2.isUnloading,
        currentHash = _ref2.currentHash;
  
    if (isUnloading || !hotReload) {
      return;
    }
  
    if (hot) {
      log.info('[WDS] App hot update...');
  
      var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");
  
      hotEmitter.emit('webpackHotUpdate', currentHash);
  
      if (typeof self !== 'undefined' && self.window) {
        // broadcast update to window
        self.postMessage("webpackHotUpdate".concat(currentHash), '*');
      }
    } // allow refreshing the page only if liveReload isn't disabled
    else if (liveReload) {
        var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)
  
        var intervalId = self.setInterval(function () {
          if (rootWindow.location.protocol !== 'about:') {
            // reload immediately if protocol is valid
            applyReload(rootWindow, intervalId);
          } else {
            rootWindow = rootWindow.parent;
  
            if (rootWindow.parent === rootWindow) {
              // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
              applyReload(rootWindow, intervalId);
            }
          }
        });
      }
  
    function applyReload(rootWindow, intervalId) {
      clearInterval(intervalId);
      log.info('[WDS] App updated. Reloading...');
      rootWindow.location.reload();
    }
  }
  
  module.exports = reloadApp;
  
  /***/ }),
  
  /***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
  /*!********************************************************!*\
    !*** (webpack)-dev-server/client/utils/sendMessage.js ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  "use strict";
  
  /* global __resourceQuery WorkerGlobalScope self */
  // Send messages to the outside, so plugins can consume it.
  
  function sendMsg(type, data) {
    if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
      self.postMessage({
        type: "webpack".concat(type),
        data: data
      }, '*');
    }
  }
  
  module.exports = sendMsg;
  
  /***/ }),
  
  /***/ "./node_modules/webpack/buildin/global.js":
  /*!***********************************!*\
    !*** (webpack)/buildin/global.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  var g; // This works in non-strict mode
  
  g = function () {
    return this;
  }();
  
  try {
    // This works if eval is allowed (see CSP)
    g = g || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") g = window;
  } // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}
  
  
  module.exports = g;
  
  /***/ }),
  
  /***/ "./node_modules/webpack/buildin/harmony-module.js":
  /*!*******************************************!*\
    !*** (webpack)/buildin/harmony-module.js ***!
    \*******************************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  module.exports = function (originalModule) {
    if (!originalModule.webpackPolyfill) {
      var module = Object.create(originalModule); // module.parent = undefined by default
  
      if (!module.children) module.children = [];
      Object.defineProperty(module, "loaded", {
        enumerable: true,
        get: function () {
          return module.l;
        }
      });
      Object.defineProperty(module, "id", {
        enumerable: true,
        get: function () {
          return module.i;
        }
      });
      Object.defineProperty(module, "exports", {
        enumerable: true
      });
      module.webpackPolyfill = 1;
    }
  
    return module;
  };
  
  /***/ }),
  
  /***/ "./node_modules/webpack/buildin/module.js":
  /*!***********************************!*\
    !*** (webpack)/buildin/module.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  module.exports = function (module) {
    if (!module.webpackPolyfill) {
      module.deprecate = function () {};
  
      module.paths = []; // module.parent = undefined by default
  
      if (!module.children) module.children = [];
      Object.defineProperty(module, "loaded", {
        enumerable: true,
        get: function () {
          return module.l;
        }
      });
      Object.defineProperty(module, "id", {
        enumerable: true,
        get: function () {
          return module.i;
        }
      });
      module.webpackPolyfill = 1;
    }
  
    return module;
  };
  
  /***/ }),
  
  /***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
  /*!*************************************************!*\
    !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
    \*************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  var map = {
    "./log": "./node_modules/webpack/hot/log.js"
  };
  
  
  function webpackContext(req) {
    var id = webpackContextResolve(req);
    return __webpack_require__(id);
  }
  function webpackContextResolve(req) {
    if(!__webpack_require__.o(map, req)) {
      var e = new Error("Cannot find module '" + req + "'");
      e.code = 'MODULE_NOT_FOUND';
      throw e;
    }
    return map[req];
  }
  webpackContext.keys = function webpackContextKeys() {
    return Object.keys(map);
  };
  webpackContext.resolve = webpackContextResolve;
  module.exports = webpackContext;
  webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";
  
  /***/ }),
  
  /***/ "./node_modules/webpack/hot/dev-server.js":
  /*!***********************************!*\
    !*** (webpack)/hot/dev-server.js ***!
    \***********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  
  /*globals window __webpack_hash__ */
  if (true) {
    var lastHash;
  
    var upToDate = function upToDate() {
      return lastHash.indexOf(__webpack_require__.h()) >= 0;
    };
  
    var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  
    var check = function check() {
      module.hot.check(true).then(function (updatedModules) {
        if (!updatedModules) {
          log("warning", "[HMR] Cannot find update. Need to do a full reload!");
          log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
          window.location.reload();
          return;
        }
  
        if (!upToDate()) {
          check();
        }
  
        __webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
  
        if (upToDate()) {
          log("info", "[HMR] App is up to date.");
        }
      }).catch(function (err) {
        var status = module.hot.status();
  
        if (["abort", "fail"].indexOf(status) >= 0) {
          log("warning", "[HMR] Cannot apply update. Need to do a full reload!");
          log("warning", "[HMR] " + log.formatError(err));
          window.location.reload();
        } else {
          log("warning", "[HMR] Update failed: " + log.formatError(err));
        }
      });
    };
  
    var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
  
    hotEmitter.on("webpackHotUpdate", function (currentHash) {
      lastHash = currentHash;
  
      if (!upToDate() && module.hot.status() === "idle") {
        log("info", "[HMR] Checking for updates on the server...");
        check();
      }
    });
    log("info", "[HMR] Waiting for update signal from WDS...");
  } else {}
  
  /***/ }),
  
  /***/ "./node_modules/webpack/hot/emitter.js":
  /*!********************************!*\
    !*** (webpack)/hot/emitter.js ***!
    \********************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
  
  module.exports = new EventEmitter();
  
  /***/ }),
  
  /***/ "./node_modules/webpack/hot/log-apply-result.js":
  /*!*****************************************!*\
    !*** (webpack)/hot/log-apply-result.js ***!
    \*****************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  /*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tobias Koppers @sokra
  */
  module.exports = function (updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function (moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });
  
    var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
  
    if (unacceptedModules.length > 0) {
      log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
      unacceptedModules.forEach(function (moduleId) {
        log("warning", "[HMR]  - " + moduleId);
      });
    }
  
    if (!renewedModules || renewedModules.length === 0) {
      log("info", "[HMR] Nothing hot updated.");
    } else {
      log("info", "[HMR] Updated modules:");
      renewedModules.forEach(function (moduleId) {
        if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
          var parts = moduleId.split("!");
          log.groupCollapsed("info", "[HMR]  - " + parts.pop());
          log("info", "[HMR]  - " + moduleId);
          log.groupEnd("info");
        } else {
          log("info", "[HMR]  - " + moduleId);
        }
      });
      var numberIds = renewedModules.every(function (moduleId) {
        return typeof moduleId === "number";
      });
      if (numberIds) log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
    }
  };
  
  /***/ }),
  
  /***/ "./node_modules/webpack/hot/log.js":
  /*!****************************!*\
    !*** (webpack)/hot/log.js ***!
    \****************************/
  /*! no static exports found */
  /***/ (function(module, exports) {
  
  var logLevel = "info";
  
  function dummy() {}
  
  function shouldLog(level) {
    var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
    return shouldLog;
  }
  
  function logGroup(logFn) {
    return function (level, msg) {
      if (shouldLog(level)) {
        logFn(msg);
      }
    };
  }
  
  module.exports = function (level, msg) {
    if (shouldLog(level)) {
      if (level === "info") {
        console.log(msg);
      } else if (level === "warning") {
        console.warn(msg);
      } else if (level === "error") {
        console.error(msg);
      }
    }
  };
  /* eslint-disable node/no-unsupported-features/node-builtins */
  
  
  var group = console.group || dummy;
  var groupCollapsed = console.groupCollapsed || dummy;
  var groupEnd = console.groupEnd || dummy;
  /* eslint-enable node/no-unsupported-features/node-builtins */
  
  module.exports.group = logGroup(group);
  module.exports.groupCollapsed = logGroup(groupCollapsed);
  module.exports.groupEnd = logGroup(groupEnd);
  
  module.exports.setLogLevel = function (level) {
    logLevel = level;
  };
  
  module.exports.formatError = function (err) {
    var message = err.message;
    var stack = err.stack;
  
    if (!stack) {
      return message;
    } else if (stack.indexOf(message) < 0) {
      return message + "\n" + stack;
    } else {
      return stack;
    }
  };
  
  /***/ }),
  
  /***/ 0:
  /*!**************************************************************************************************************************!*\
    !*** multi (webpack)-dev-server/client?http://localhost:8082 (webpack)/hot/dev-server.js ./examples/loader/src/index.js ***!
    \**************************************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {
  
  __webpack_require__(/*! /Users/jinzhan/github/san-hot-loader/node_modules/webpack-dev-server/client/index.js?http://localhost:8082 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:8082");
  __webpack_require__(/*! /Users/jinzhan/github/san-hot-loader/node_modules/webpack/hot/dev-server.js */"./node_modules/webpack/hot/dev-server.js");
  module.exports = __webpack_require__(/*! /Users/jinzhan/github/san-hot-loader/examples/loader/src/index.js */"./examples/loader/src/index.js");
  
  
  /***/ })
  
  /******/ });
