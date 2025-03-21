import Post from "../model/Post.js"
import User from "../model/User.js"

/* CREATE*/

export const createPost = async (req,res) => {
    try {
    const {userId,description,picturePath} = req.body;
    const user =await User.findById(userId);
    const newPost = new Post({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        userPicturePath:user.picturePath,
        picturePath,
        likes:{},
        comments:[]
    })
    console.log(user.picturePath)
    await newPost.save();
    const post = await Post.find();
    res.status(200).json(post);
    } catch (err) {
        res.statue(409).send({message:err.message})
    }
}

/*READ*/

export const  getFeedPosts = async (req,res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).send({message:err.message})
    }
}

export const getUserPosts = async (req,res) => {
    try {
        const {userId} = req.params

        // const user = await findById(userId);
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (err) {
        res.status(404).send({message:err.message})
    }
}

/*UPDATE*/ 
export const likePost = async(req,res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id)
        const isLiked =post.likes.get(userId);

    if(isLiked) {
        post.likes.delete(userId);
    }else {
        post.likes.set(userId,true);
    }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        );  
    res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).send({message:err.message})
    }
}