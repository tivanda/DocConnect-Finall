import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { getTimelinePosts } from "../../api/PostRequest";

const Comment = ({ postId, name }) => {
  const [data, setData] = useState([]);

  const makeComment = async (text, postId) => {
    fetch(`/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization ": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {data.map((record) => {
        return (
          <h6 key={record._id}>
            <span style={{ fontWeight: "500" }}>{record.postedBy}</span>
            {record.text}
          </h6>
        );
      })}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          makeComment(e.target[0].value);
        }}
      >
        <input type="text" placeholder="add a comment" />
      </form>
    </div>
  );
};

export default Comment;
