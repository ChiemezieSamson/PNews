import { json } from "react-router-dom";
import { Posts } from "../../data"

export const lodingData =  ({request, params}) => {
 const Post =  Posts ;
 return  json(Post, {stats: 200});
}

export const action = async () => {
 const Post = await Posts()
 return { Post }
}
