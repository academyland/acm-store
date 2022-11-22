import { Expose } from "class-transformer"
export class BaseCourseDto {
    @Expose()
    id: number
    @Expose()
    amount: number
    @Expose()
    amountOff: number
    @Expose()
    slug: string
    @Expose()
    title: string
}
export class CourseDto extends BaseCourseDto {
    @Expose()
    percent: number
    @Expose()
    statusText: string
    @Expose()
    isRecording: boolean
    @Expose()
    src: string
    @Expose()
    short_description: string
    @Expose()
    get showAmount() {
        return this.amount > this.amountOff
    }
}