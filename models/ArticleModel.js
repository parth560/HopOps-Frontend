"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var nanoid_1 = require("nanoid");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongooseObj];
            case 1:
                mongooseConnection = _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
var ArticleModel = /** @class */ (function () {
    function ArticleModel() {
        var _this = this;
        // Due to a quirk of typescript, the schema has to be manually defined both here and in IArticleModel.ts
        this.createSchema = function () {
            _this.schema = new Mongoose.Schema({
                articleID: {
                    type: String,
                    default: function () { return (0, nanoid_1.nanoid)(); }
                },
                title: String,
                ownerID: String,
                date: Date,
                body: String,
                parentArticle: String
            }, { collection: 'article' });
        };
        this.createModel = function () {
            _this.model = mongooseConnection.model("article", _this.schema);
        };
        this.createSchema();
        this.createModel();
    }
    /*
    Custom methods below
    */
    ArticleModel.prototype.createArticle = function (response, articleDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = (0, nanoid_1.nanoid)();
                articleDetails.articleID = id;
                Object.assign(articleDetails, { "articleID": id });
                this.model.create([articleDetails]);
                return [2 /*return*/];
            });
        });
    };
    ArticleModel.prototype.getNumArticles = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.count();
                        return [4 /*yield*/, query.exec()];
                    case 1:
                        queryResult = _a.sent();
                        console.log("Count is ", queryResult);
                        response.json(queryResult);
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleModel.prototype.retrieveAllArticles = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = this.model.find();
                query.then(function (res) {
                    response.json(res);
                }).catch(function (err) {
                    console.log("Error in retrieveAllArticles: " + err);
                    response.json(err);
                });
                return [2 /*return*/];
            });
        });
    };
    ArticleModel.prototype.retrieveUserArticles = function (response, userID) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ ownerID: userID });
                        return [4 /*yield*/, query.exec()];
                    case 1:
                        queryResult = _a.sent();
                        if (queryResult) {
                            console.log("Data has been collected ->");
                            console.log(queryResult);
                            response.json(queryResult);
                        }
                        else {
                            response.send('Article model not initialized');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleModel.prototype.retrieveArticle = function (response, postID) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ articleID: postID });
                        return [4 /*yield*/, query.exec()];
                    case 1:
                        queryResult = _a.sent();
                        if (queryResult) {
                            console.log("Data has been collected ->");
                            console.log(queryResult);
                            response.json(queryResult);
                        }
                        else {
                            response.send('Article model not initialized');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleModel.prototype.retrieveReplies = function (response, postID) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.find({ 'parentArticle': postID });
                        return [4 /*yield*/, query.exec()];
                    case 1:
                        queryResult = _a.sent();
                        if (queryResult) {
                            console.log("Data has been collected ->");
                            console.log(queryResult);
                            response.json(queryResult);
                        }
                        else {
                            response.send('Article model not initialized');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ArticleModel.prototype.deleteArticle = function (response, postID) {
        return __awaiter(this, void 0, void 0, function () {
            var query, queryResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.model.deleteOne({ 'articleID': postID });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, query.exec()];
                    case 2:
                        queryResult = _a.sent();
                        if (queryResult) {
                            response.json(queryResult);
                        }
                        else {
                            response.send("No data found");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("Error in deleteArticle: " + error_1);
                        response.json(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ArticleModel;
}());
exports.ArticleModel = ArticleModel;
console.log('ArticleModel module loaded');
