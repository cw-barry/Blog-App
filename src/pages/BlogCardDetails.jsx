import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";
import { Layout } from "../components/";
import { AiOutlineSend } from "react-icons/ai";
import { BiLike, BiCommentDots, BiBullseye } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const BlogCardDetails = () => {
  const { id } = useParams();
  const { getSingleBlog, currentBlog, addComment, deleteBlog, addLike } =
    useContext(BlogContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) getSingleBlog(id);
  }, [id]);

  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    addComment(id, comment);
  };

  return (
    <Layout>
      <Card
        className="container d-flex flex-column justify-content-center align-items-center mt-3"
        style={{
          padding: "0",
        }}
      >
        <CardImg
          src={currentBlog?.image}
          alt="post_image"
          style={{
            height: "20rem",
            objectFit: "cover",
          }}
          width="100%"
        />
        <div
          style={{
            width: "100%",
          }}
        >
          <CardBody
            style={{
              width: "100%",
            }}
          >
            <CardTitle tag="h3" className="text-center">
              {currentBlog?.title}
            </CardTitle>
            <div className="d-flex justify-content-between">
              <CardSubtitle className="text-muted">
                Author: {currentBlog?.author}
              </CardSubtitle>
              <CardSubtitle className="text-muted">
                {new Date(currentBlog?.published_date).toLocaleString()}
              </CardSubtitle>
            </div>
            <CardText className="mt-4">{currentBlog?.content}</CardText>
          </CardBody>
        </div>
        <div className="d-flex gap-2">
          <span className="d-flex align-items-center justify-content-center">
            {currentBlog?.like_count}
            <BiLike
              onClick={() => addLike(currentBlog?.slug, id)}
              className="fs-4"
              style={{ color: currentBlog?.has_liked ? "blue" : "" }}
            />
          </span>
          <span>
            {currentBlog?.comment_count}
            <BiCommentDots className="fs-4" />
          </span>
          <span>
            {currentBlog?.view_count}
            <BiBullseye className="fs-4" />
          </span>
        </div>
      </Card>

      {/* Comment Section */}

      <div className="container mt-3">
        <p className="fs-4 text-center">Comments</p>
        {currentBlog?.comments.map((item) => (
          <div key={item.id} className="m-2">
            <p className="fw-normal">{item.content}</p>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">{item.user}</span>
              <span className="fw-normal">
                {new Date(item.time_stamp).toLocaleString()}
              </span>
            </div>
            <hr />
          </div>
        ))}

        <form onSubmit={handleAddComment}>
          <div className="d-flex align-items-center gap-2">
            <Input
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <AiOutlineSend className="fs-2" />
          </div>
        </form>
      </div>

      {currentBlog?.isowner && (
        <div className="d-flex justify-content-center m-2">
          <Button
            onClick={() =>
              navigate("/post/create", { state: { isUpdate: true } })
            }
            className="m-1"
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteBlog(id, navigate)}
            className="m-1"
            color="danger"
          >
            Delete
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default BlogCardDetails;
