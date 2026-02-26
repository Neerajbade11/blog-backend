import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
export declare class BlogsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateBlogDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        isPublished: boolean;
        slug: string;
        summary: string | null;
        updatedAt: Date;
        userId: string;
    }>;
    findMyBlogs(userId: string): Promise<({
        _count: {
            likes: number;
            comments: number;
        };
    } & {
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        isPublished: boolean;
        slug: string;
        summary: string | null;
        updatedAt: Date;
        userId: string;
    })[]>;
    update(userId: string, blogId: string, dto: UpdateBlogDto): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        isPublished: boolean;
        slug: string;
        summary: string | null;
        updatedAt: Date;
        userId: string;
    }>;
    remove(userId: string, blogId: string): Promise<{
        message: string;
    }>;
    likeBlog(userId: string, blogId: string): Promise<{
        likeCount: number;
    }>;
    unlikeBlog(userId: string, blogId: string): Promise<{
        likeCount: number;
    }>;
    addComment(userId: string, blogId: string, content: string): Promise<{
        user: {
            email: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        userId: string;
        blogId: string;
    }>;
    getComments(blogId: string): Promise<({
        user: {
            email: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        userId: string;
        blogId: string;
    })[]>;
}
