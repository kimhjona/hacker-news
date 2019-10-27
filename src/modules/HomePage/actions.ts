import { ArticleType } from "types/types";
import { getUrl } from "config/proxy";

export const GetList = "HOMEPAGE::GET_LIST";
export const ReceiveList = "HOMEPAGE::RECEIVE_LIST";
export const GetArticles = "HOMEPAGE::GET_ARTICLES";
export const ReceiveArticles = "HOMEPAGE::RECEIVE_ARTICLES";
export const PreviousPage = "HOMEPAGE::PREVIOUS_PAGE";
export const NextPage = "HOMEPAGE::NEXT_PAGE";
export const ToggleCounter = "HOMEPAGE::TOGGLE_COUNTER";
export const ResetIndex = "HOMEPAGE::RESET_INDEX";

export type ArticlesParam = {
  type: string;
  sortBy?: string;
  json?: [];
  data?: any[];
  currentIndex?: number;
  counter?: number;
};

export type SwitchPageType = {
  direction: "previous" | "next";
  sortBy: string;
};

export const requestList = (): ArticlesParam => ({
  type: GetList,
});

export const receiveList = ({ json }): ArticlesParam => ({
  type: ReceiveList,
  json,
});

export const failureList = (): ArticlesParam => ({
  type: "FAILURE_LIST",
});

export const requestArticles = (): ArticlesParam => ({
  type: GetArticles,
});

export const receiveArticles = (json): ArticlesParam => ({
  type: ReceiveArticles,
  json,
});

export const fetchArticlesData = () => (dispatch, getState) => {
  const { list, currentIndex, counter } = getState().homePage;

  const articles: ArticleType[] = [];
  dispatch(requestArticles());
  list.slice(currentIndex, currentIndex + counter).map(number =>
    fetch(getUrl(`https://hacker-news.firebaseio.com/v0/item/${number}.json`))
      .then(res => res.json())
      .then(result => {
        articles.push(result);
        if (articles.length === counter) {
          dispatch(receiveArticles(articles));
        }
      })
  );
};

export const fetchArticles = (sortBy: string) => dispatch => {
  dispatch(requestList());
  return fetch(getUrl(`https://hacker-news.firebaseio.com/v0/${sortBy}.json`))
    .then(res => res.json())
    .then(result => {
      dispatch(receiveList({ json: result }));
      dispatch(fetchArticlesData());
    });
};

export const previousPage = () => ({
  type: PreviousPage,
});

export const nextPage = () => ({
  type: NextPage,
});

export const switchPage = ({
  direction,
  sortBy,
}: SwitchPageType) => dispatch => {
  if (direction === "previous") {
    dispatch(previousPage());
  }

  if (direction === "next") {
    dispatch(nextPage());
  }

  dispatch(fetchArticles(sortBy));
};

export const toggleCounter = () => ({
  type: ToggleCounter,
});

export const toggleArticlesCount = (sortBy: string) => dispatch => {
  dispatch(toggleCounter());
  dispatch(fetchArticles(sortBy));
};

export const resetIndex = () => ({
  type: ResetIndex,
});

export type HomePageActions = ArticlesParam;
