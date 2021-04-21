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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_plugin_1 = __importDefault(require("fastify-plugin"));
var BlogRoute = function (server, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        server.get('/blogs', {}, function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var Blog, blogs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        Blog = server.db.models.Blog;
                        return [4 /*yield*/, Blog.find({})];
                    case 1:
                        blogs = _a.sent();
                        return [2 /*return*/, reply.code(200).send(blogs)];
                    case 2:
                        error_1 = _a.sent();
                        request.log.error(error_1);
                        return [2 /*return*/, reply.send(500)];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        server.post('/blogs', {}, function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var Blog, blog, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        Blog = server.db.models.Blog;
                        return [4 /*yield*/, Blog.addOne(request.body)];
                    case 1:
                        blog = _a.sent();
                        return [4 /*yield*/, blog.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, reply.code(201).send(blog)];
                    case 3:
                        error_2 = _a.sent();
                        request.log.error(error_2);
                        return [2 /*return*/, reply.send(500)];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        // Read: https://www.fastify.io/docs/latest/TypeScript/#using-generics
        server.get('/blogs/:id', {}, function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var ID, Blog, blog, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        ID = request.params.id;
                        Blog = server.db.models.Blog;
                        return [4 /*yield*/, Blog.findById(ID)];
                    case 1:
                        blog = _a.sent();
                        if (!blog) {
                            return [2 /*return*/, reply.send(404)];
                        }
                        return [2 /*return*/, reply.code(200).send(blog)];
                    case 2:
                        error_3 = _a.sent();
                        request.log.error(error_3);
                        return [2 /*return*/, reply.send(400)];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.default = fastify_plugin_1.default(BlogRoute);
