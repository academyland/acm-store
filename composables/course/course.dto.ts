import { Expose } from "class-transformer"
class BaseCourseDto {
    @Expose()
    id: number
    @Expose()
    amount: number
    @Expose()
    amountOff: number
    // @Expose()
    // description: string
    // @Expose()
    // meta_description: string
    @Expose()
    slug: string
    // @Expose()
    // statusText: string
    @Expose()
    title: string
    // @Expose()
    // percent: number
    // @Expose()
    // requirements: string
    // @Expose()
    // isRecording: boolean
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