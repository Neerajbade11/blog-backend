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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Date.now();
}
let BlogsService = class BlogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const slug = generateSlug(dto.title);
        return this.prisma.blog.create({
            data: {
                userId,
                title: dto.title,
                content: dto.content,
                slug,
                isPublished: dto.isPublished || false,
            },
        });
    }
    async findMyBlogs(userId) {
        return this.prisma.blog.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: { select: { likes: true, comments: true } },
            },
        });
    }
    async update(userId, blogId, dto) {
        const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (blog.userId !== userId)
            throw new common_1.ForbiddenException('Not your blog');
        return this.prisma.blog.update({
            where: { id: blogId },
            data: dto,
        });
    }
    async remove(userId, blogId) {
        const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        if (blog.userId !== userId)
            throw new common_1.ForbiddenException('Not your blog');
        await this.prisma.blog.delete({ where: { id: blogId } });
        return { message: 'Blog deleted successfully' };
    }
    async likeBlog(userId, blogId) {
        const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        await this.prisma.like.upsert({
            where: { userId_blogId: { userId, blogId } },
            create: { userId, blogId },
            update: {},
        });
        const likeCount = await this.prisma.like.count({ where: { blogId } });
        return { likeCount };
    }
    async unlikeBlog(userId, blogId) {
        await this.prisma.like.deleteMany({ where: { userId, blogId } });
        const likeCount = await this.prisma.like.count({ where: { blogId } });
        return { likeCount };
    }
    async addComment(userId, blogId, content) {
        const blog = await this.prisma.blog.findUnique({ where: { id: blogId } });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return this.prisma.comment.create({
            data: { userId, blogId, content },
            include: { user: { select: { id: true, email: true } } },
        });
    }
    async getComments(blogId) {
        return this.prisma.comment.findMany({
            where: { blogId },
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { id: true, email: true } } },
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map