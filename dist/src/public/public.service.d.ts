import { PrismaService } from '../prisma/prisma.service';
export declare class PublicService {
    private prisma;
    constructor(prisma: PrismaService);
    getFeed(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                email: string;
                id: string;
            };
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBlogBySlug(slug: string): Promise<{
        user: {
            email: string;
            id: string;
        };
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
    }>;
}
