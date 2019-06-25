import React from "react";
import { DiscussType } from "types/types";
import { HeaderWrapped as Header } from "components/Header";
import { Discussion } from "./modules/Discussion";

export class DiscussDisplayContainer extends React.Component<DiscussType> {
  render() {
    const {
      resetIndex,
      isLoading,
      comments,
      article,
      getUrl,
      toDiscussPage,
    } = this.props;
    return (
      <div>
        <Header resetIndex={resetIndex} />
        {!isLoading ? (
          <Discussion
            comments={comments}
            article={article}
            getUrl={getUrl}
            toDiscussPage={toDiscussPage}
          />
        ) : (
          <div className="loading">
            <img
              alt=""
              src="https://cdn.friendbuy.com/widget/images/shared/spinner.svg"
            />
          </div>
        )}
      </div>
    );
  }
}
