import React from "react";
import { DiscussionType } from "types/types";
import { Topic } from "../components/Topic";
import { CommentContainer } from "../components/CommentContainer";

export class Discussion extends React.Component<DiscussionType> {
  render() {
    const {
      article,
      article: { kids },
      comments,
      childrenCommentsArray,
    } = this.props;

    return (
      <div className="content">
        <Topic article={article} />
        {article.id &&
          kids &&
          childrenCommentsArray &&
          Object.values(comments).map(comment => {
            return (
              <CommentContainer
                comments={comments}
                comment={comment}
                childrenCommentsArray={childrenCommentsArray}
                key={comment.id}
                isFirstRender={true}
              />
            );
          })}
      </div>
    );
  }
}
