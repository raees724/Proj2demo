import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

const Comments = () => {
  const { currentUser } = useContext(AuthContext);
  //Temporary
  const comments = [
    {
      id: 1,
      desc: "Kollam",
      name: "davidbeckham",
      userId: 1,
      profilePicture:
        "https://icdn.strettynews.com/wp-content/uploads/2022/11/fbl-wc-2022-match03-eng-iri-2.jpg",
    },
    {
      id: 2,
      desc: "Pwoli",
      name: "dqsalman",
      userId: 2,
      profilePicture:
        "https://images.hindustantimes.com/img/2022/04/09/1600x900/05e867d8-b82b-11ec-a4f3-fc37f02059fa_1649532004301.jpg",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
