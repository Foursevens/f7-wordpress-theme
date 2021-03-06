import classNames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import { FormattedMessage, useIntl, Link } from 'gatsby-plugin-intl';
import React from 'react';

import { Image } from '../components';
import styles from './card.module.css';

export function MemberCardApply() {
  const intl = useIntl();
  const data = useStaticQuery(graphql`
    query MemberCardApplyQuery {
      newMember: file(base: { eq: "new-member.png" }) {
        childImageSharp {
          fluid(maxWidth: 257) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Link to="/jobs">
      <div
        className={classNames(
          styles.cardItem,
          'bg-white text-center rounded shadow-md',
        )}
      >
        <div className="relative border-b-4 border-f7700 ">
          <Image
            alt={intl.formatMessage({ id: 'new-member.portrait-alt' })}
            className={styles.img__img}
            file={data.newMember}
            loading="eager"
          />
          <div
            className={classNames(
              styles.img__description_layer,
              'absolute inset-0 text-white invisible opacity-0 flex justify-center items-center',
            )}
          >
            <FormattedMessage
              className={classNames(
                styles.img__description,
                'font-300 leading-loose text-lg',
              )}
              id="new-member.ask-work-with-us"
            />
          </div>
        </div>
        <div className="p-5">
          <span className="font-title font-800 text-xl uppercase">
            <FormattedMessage id="new-member.your-name-here" />
          </span>
          <h6 className="font-300">
            {' '}
            <FormattedMessage id="new-member.cta-apply" />
          </h6>
        </div>
      </div>
    </Link>
  );
}
