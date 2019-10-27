import React from "react";
import { ArticleItemType } from "types/types";
import { withRouter } from "react-router";

class ArticleItem extends React.Component<ArticleItemType> {
  getUrl = (url: string) => {
    const regex = /(http(s)?:\/\/)|(\/.*){1}/g;
    return url.replace(regex, "");
  };

  toDiscussPage = id => {
    const {
      history,
      location: { pathname },
    } = this.props;

    history.push(`${pathname}/${id}`);
  };

  keyDownToDiscussPage = (event: React.KeyboardEvent, id: number) => {
    if (event.key !== "Enter") {
      return;
    }
    this.toDiscussPage(id);
  };

  render() {
    const { article } = this.props;

    if (!article) {
      console.log({ article });
    }

    return (
      <>
        <div className="header">
          <span className="title">
            {article && article.url ? (
              <a href={article.url}>{article.title}</a>
            ) : (
              <span onClick={() => this.toDiscussPage(article.id)}>
                {article.title}
              </span>
            )}
          </span>
          <span className="url">
            {article && article.url && this.getUrl(article.url)}
          </span>
        </div>
        <div className="more-info">
          <span>
            {article.score === 1
              ? `${article.score} point`
              : `${article.score} points`}
          </span>
          <span>by</span>
          <span>{article.by}</span>
          <span
            className="cursor"
            tabIndex={0}
            onClick={() => this.toDiscussPage(article.id)}
            onKeyDown={event => this.keyDownToDiscussPage(event, article.id)}
          >
            {article.descendants
              ? `${article.descendants} comments`
              : "0 comments"}
          </span>
        </div>
      </>
    );
  }
}

export const ArticleItemWrapped = withRouter(ArticleItem);
