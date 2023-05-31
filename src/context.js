import { bindActionCreators } from '@reduxjs/toolkit';
import { createContext, useMemo, useReducer } from 'react';
import { postActions, postsReducer } from './features/posts';
import { userActions, usersReducer } from './features/users';

import postData from './api/posts.json';
import userData from './api/users.json';

export const PostsContext = createContext({});
export const UsersContext = createContext({});
export const ActionsContext = createContext({});

export const Provider = ({ children }) => {
  const [posts, postDispatch] = useReducer(postsReducer, postData);
  const [users, userDispatch] = useReducer(usersReducer, userData);

  const actions = useMemo(
    () => ({
      ...bindActionCreators(postActions, postDispatch),
      ...bindActionCreators(userActions, userDispatch),
    }),
    [postDispatch, userDispatch],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <PostsContext.Provider value={posts}>
        <UsersContext.Provider value={users}>
        {children}
        </UsersContext.Provider>
      </PostsContext.Provider>
    </ActionsContext.Provider>
  );
};
