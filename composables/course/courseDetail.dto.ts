import { Expose, Transform } from "class-transformer"
import { BaseCourseDto } from "./course.dto"

export class CourseDetailDto extends BaseCourseDto {
    @Expose()
    description: string;
    @Expose()
    short_description: string;
    @Expose()
    meta_description: string;
    @Expose()
    requirements: string;
    @Expose()
    @Transform(({ value }) => {
        const { hours, minutes, seconds } = value || {};
        return (hours || minutes) ? `${hours} : ${minutes} : ${seconds}` : ""
    }, { toClassOnly: true })
    courseDuration: string;
    @Expose()
    @Transform(({ value }) => {
        const { hours } = value || {}
        return hours > 0 ? `${hours} ساعت` : ''
    }, { toClassOnly: true })
    computedEstimateDuration: string;
    @Expose()
    @Transform(({ value, obj }) => {
        let i = 0;
        const courseChapters = value.map((chapter) => {
            return {
                ...chapter,
                courseVideos: chapter.courseVideos.map((video) => {
                    i++;
                    return {
                        ...video,
                        rowNumber: i
                    }
                })
            }

        })
        obj.totalVideoCount = i;
        return courseChapters;
    }, { toClassOnly: true })
    courseChapters: CourseChapter[];
    @Expose()
    totalVideoCount: number
    @Expose()
    courseQuestions: CourseQuestion[];
    @Expose()
    src: string;
    @Expose()
    statusText: string;
    @Expose()
    userCounter: number;
}


export class CourseDuration {
    @Expose()
    hours: number;
    @Expose()
    minutes: number;
    @Expose()
    seconds: number;
}

export class CourseVideo {
    @Expose()
    id: number;
    @Expose()
    course_id: number;
    @Expose()
    videoTitle: string;
    @Expose()
    videoDescription?: any;
    @Expose()
    isDemo: number;
    @Expose()
    hasFile: boolean;
    @Expose()
    duration: any;
    @Expose()
    rowNumber: number;
}

export class CourseChapter {
    @Expose()
    id: number;
    @Expose()
    chapterName: string;
    @Expose()
    courseVideos: CourseVideo[];
}

export class CourseQuestion {
    @Expose()
    id: number;
    @Expose()
    question: string;
    @Expose()
    answer: string;
}