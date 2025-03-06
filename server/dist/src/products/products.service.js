"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("./entities/products.entity");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async findAll({ page, offset, sortField, sortOrder, search }) {
        const fields = search
            ? Object.fromEntries(new Map(['title', 'description', 'banner', 'price', 'discount'].map((field) => [field, search])))
            : null;
        const take = offset || 0;
        const skip = take ? take * (page - 1) : take;
        const [result, total] = await this.productsRepository.findAndCount({
            take,
            skip,
            order: {
                [sortField]: sortOrder,
            },
            where: fields || {},
        });
        return {
            total: Math.ceil(total / offset) - 1,
            page: +page,
            data: result,
            search,
        };
    }
    async findById(id) {
        return await this.productsRepository.findOne({
            where: { id },
            relations: ['pictures', 'sizes'],
        });
    }
    async createProduct(data) {
        const productObj = this.productsRepository.create(data);
        console.log('productObj, ', productObj);
        const product = await this.productsRepository.save(productObj);
        return await this.productsRepository.save(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map