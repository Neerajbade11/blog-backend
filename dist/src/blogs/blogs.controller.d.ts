import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
declare class CommentDto {
    content: string;
}
export declare class BlogsController {
    private blogsService;
    constructor(blogsService: BlogsService);
    create(req: any, dto: CreateBlogDto): Promise<{
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
    findMyBlogs(req: any): Promise<({
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
    update(req: any, id: string, dto: UpdateBlogDto): Promise<{
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
    remove(req: any, id: string): Promise<{
        message: string;
    }>;
    like(req: any, id: string): Promise<{
        likeCount: number;
    }>;
    unlike(req: any, id: string): Promise<{
        likeCount: number;
    }>;
    addComment(req: any, id: string, dto: CommentDto): Promise<{
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
    getComments(id: string): Promise<({
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
export {};
