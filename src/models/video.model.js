import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; //use for pagination in aggregation pipelines

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)
videoSchema.plugin(mongooseAggregatePaginate)//adding pagination plugin to videoSchema /.plugin() is a method provided by Mongoose to add plugins to a schema.(mongooseAggregatePaginate is a plugin that adds pagination capabilities to Mongoose aggregation queries.)

export const Video = mongoose.model("Video", videoSchema);//We are creating a model named Video using the videoSchema defined above.