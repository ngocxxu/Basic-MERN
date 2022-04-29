import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
  try {
    // tạo thử 1 bài post bất kì trên database mongo
    // const post = new PostModel({
    //   title: 'test',
    //   content: 'test',
    //   author: 'test',
    // })
    // post.save();

    // find() lay het toàn bộ bài post từ ng dùng, giống hàm get();
    // lay du lieu từ database mongo
    // posts la 1 collection
    const posts = await PostModel.find();
    console.log("posts", posts);
    // trả status 200 vê cho client nếu thành công và trả các bài posts đó ở dạng json
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = async (req, res) => {
  try {
    // Nhận data {} từ client gửi lên bên phía Frontend
    const newPost = req.body;

    const post = new PostModel(newPost);
    // save() giống method post
    await post.save().json(post);

    // gui res thành công lại cho client
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    // Nhận data {} từ client gửi lên bên phía Frontend
    const updatePost = req.body;

    // new = true, luôn trả về data mới sau khi update
    // findOneAndUpdate() tra ve 1 obj khi chưa update (nếu new = true thì luôn trả về data mới sau khi update)
    const post = await PostModel.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      { new: true }
    );

    // gui res thành công lại cho client
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
