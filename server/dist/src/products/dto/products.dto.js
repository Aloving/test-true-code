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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationDto = exports.ProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ProductDto {
}
exports.ProductDto = ProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Men's sneakers",
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'New sneakers, autumn brand #321',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'New sneakers, autumn brand #321',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductDto.prototype, "banner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3100,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductDto.prototype, "discount", void 0);
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Номер пагинации',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Размер страницы',
        example: 10,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Строка поиска',
        example: '',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['title', 'description', 'price', 'discount'],
        example: 'title',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "sortField", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "sortOrder", void 0);
//# sourceMappingURL=products.dto.js.map