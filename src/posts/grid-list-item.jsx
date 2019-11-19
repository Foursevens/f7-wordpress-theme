import classNames from 'classnames';
import { FormattedDate, Link } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';

import { Image, Tag } from '../components';
import { postShape } from './model';

export default function PostsGridListItem({ accentColor, post }) {
  return (
    <div
      className={classNames(
        'min-h-full',
        'rounded shadow-md hover:shadow-xl',
        `border-b-4 ${accentColor.border}`,
      )}
    >
      <Link to={`/blog/${post.slug}`}>
        <header className={classNames(accentColor.background, 'h-40')}>
          {post.fields.remoteThumbnailImage && (
            <Image
              alt={post.thumbnailImage.alt}
              className="h-full"
              file={post.fields.remoteThumbnailImage}
            />
          )}
        </header>
        <div className="px-6 py-4">
          <Tag>{post.tags ? post.tags[0].name : 'Article'}</Tag>
          <span className="text-sm ">
            {' '}
            -{' '}
            <FormattedDate
              value={post.date}
              day="numeric"
              month="short"
              year="numeric"
            />
          </span>
          <div
            className="font-title font-700 text-xl mb-2 uppercase"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <p
            className="font-300 leading-normal mb-12"
            dangerouslySetInnerHTML={{ __html: post.intro }}
          />
        </div>
      </Link>
    </div>
  );
}

PostsGridListItem.propTypes = {
  accentColor: PropTypes.shape({
    background: PropTypes.string.isRequired,
    border: PropTypes.string.isRequired,
  }).isRequired,
  post: PropTypes.shape(postShape).isRequired,
};
