import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { BiLike, BiCommentDots, BiBullseye } from "react-icons/bi";
import { Link } from "react-router-dom";

const BlogCard = ({ data }) => {
  const {
    author,
    image,
    title,
    content,
    published_date,
    view_count,
    like_count,
    comment_count,
    id,
  } = data;
  return (
    <Card>
      <CardImg alt="Card image cap" src={image} top width="100%" />
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <div className="d-flex justify-content-between">
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Author: {author}
          </CardSubtitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {new Date(published_date).toLocaleString()}
          </CardSubtitle>
        </div>
        <CardText>{content}</CardText>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/post/details/${id}`}>
            <Button>See More</Button>
          </Link>
          <div className="d-flex gap-2">
            <span className="d-flex align-items-center justify-content-center">
              {like_count}
              <BiLike className="fs-4" />
            </span>
            <span>
              {comment_count}
              <BiCommentDots className="fs-4" />
            </span>
            <span>
              {view_count}
              <BiBullseye className="fs-4" />
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
