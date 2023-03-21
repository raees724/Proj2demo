import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
// import TimeAgo from 'timeago.js';
import axios from '../../utils/axios';
import { setPost } from '../../state/index';

// const Post = ({ post }) => {
//   const [commentOpen, setCommentOpen] = useState(false);

//   //TEMPORARY
  const liked = false;

const Post = ({
  postId,
  content,
  author,
  image,
  likes,
  comments,
  createdAt
}) => {
  const dispatch = useDispatch();
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const likeCount = Object.keys(likes).length;
  // const timeago = new TimeAgo()
  const liked = false;

  const patchLike = async (e) => {
      setIsLiked(e.target.cheked);
      const response = await axios.patch(`api/posts/${postId}/like`, {loggedInUserId}, {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
      });
      const updatedPost = response.data;
      dispatch(setPost({post: updatedPost}))
  }

  const handleCommentSubmit = async () => {
      try {
          
          const response = await axios.patch(
              `api/posts/${postId}/comment`,
              { loggedInUserId, comment }, {
              headers: { Authorization: `Bearer ${token}` },
              "Content-Type": "application/json",
          });
          const updatedPost = response.data;
          dispatch(setPost({ post: updatedPost }));
          setComment("");
      } catch (error) {
          console.error(error);
      }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={user.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${user.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{author.username}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{content}</p>
          <img src={image} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {likeCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;


