import { Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { postShape } from './model';

export default function PostsGridListItem(props) {
  const { postInfo } = props;
  return (
    <Link to={`/${postInfo.path}`}>
      <div key={postInfo.id} className="post">
        {postInfo.hero_image === null ? (
          <img
            alt={postInfo.title}
            src="https://dummyimage.com/400x300/000/fff&text=Thumbnail+image"
          />
        ) : (
          <img alt={postInfo.title} src={postInfo.hero_image} />
        )}
        <p>
          {postInfo.tags === null ? (
            <span>Article</span>
          ) : (
            <span>{postInfo.tags[0].name}</span>
          )}
          <span>{new Date(postInfo.date).toLocaleDateString()}</span>
        </p>
        <h3 dangerouslySetInnerHTML={{ __html: postInfo.title }} />
        <p dangerouslySetInnerHTML={{ __html: postInfo.intro }} />
      </div>
    </Link>
  );
}

PostsGridListItem.propTypes = {
  postInfo: PropTypes.shape(postShape).isRequired,
};
