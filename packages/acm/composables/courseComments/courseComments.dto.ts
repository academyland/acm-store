import { Expose } from "class-transformer";

export class CommentChildDto {
    @Expose()
    id: number;
    @Expose()
    comment: string;
    private first_name: string;
    private last_name: string;
    private status: number;
    private created_at: number;
}

export class CourseCommentDto {
    @Expose()
    id: number;
    @Expose()
    comment: string;
    @Expose({ toClassOnly: true })
    private first_name: string;
    @Expose({ toClassOnly: true })
    private last_name: string;
    @Expose()
    get fullName() {
        return `${this.first_name} ${this.last_name}`
    }
    private status: number;
    private created_at: number;
    @Expose()
    children: CommentChildDto[];
    @Expose()
    createdDate: string;
}

