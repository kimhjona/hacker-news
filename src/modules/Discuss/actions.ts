import { ArticleType } from "types/types";
import { getUrl } from "config/proxy";

export const FetchArticleStart = "DISCUSS::FETCH_ARTICLE_START";
export const ReceiveArticle = "DISCUSS::RECEIVE_ARTICLE";
export const ReceiveComments = "DISCUSS::RECEIVE_COMMENTS";
export const RequestComments = "DISCUSS::REQUEST_COMMENTS";

export const fetchArticleStart = () => ({
  type: FetchArticleStart,
});

export const receiveArticle = json => ({
  type: ReceiveArticle,
  json,
});

export const receiveComments = json => ({
  type: ReceiveComments,
  json,
});

export const requestComments = () => ({
  type: RequestComments,
});

export const getComments = (
  kids: number[],
  commentsObject: any,
  descendants
) => dispatch => {
  if (!kids.length) {
    return;
  }

  kids.forEach((id: number) => {
    return fetch(
      getUrl(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    ).then(res =>
        res.json().then(result => {
          commentsObject[id] = result;
          if (result && result.kids) {
            dispatch(getComments(result.kids, commentsObject, descendants));
          }
          if (Object.keys(commentsObject).length === descendants) {
            dispatch(receiveComments(commentsObject));
          }
        })
    );
  });
};

export const fetchArticleForDiscussPage = (id: number) => dispatch => {
  dispatch(fetchArticleStart());
  return fetch(getUrl(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    .then(res => res.json())
    .then((result: ArticleType) => {
      if (result && result.kids) {
        dispatch(getComments(result.kids, {}, result.descendants));
      }
      dispatch(receiveArticle(result));
    });
};
