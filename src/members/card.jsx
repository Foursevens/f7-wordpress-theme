import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Image } from '../components';
import styles from './card.module.css';
import { memberShape } from './model';

export default function MemberCard({ member, shadow }) {
  return (
    <div
      className={classNames(
        styles.cardItem,
        'min-h-full mx-3 text-center rounded',
        { 'shadow-md': shadow },
      )}
      tabIndex="0"
    >
      <div className="relative border-b-4 border-f7700">
        <Image
          alt={member.title}
          file={member.fields.remote_portret}
          className={styles.img__img}
        />
        <div
          className={classNames(
            styles.img__description_layer,
            'absolute inset-0 text-white invisible opacity-0 flex justify-center items-center',
          )}
        >
          <p
            className={classNames(
              styles.img__description,
              'font-300 leading-loose text-lg',
            )}
            dangerouslySetInnerHTML={{ __html: member.skills }}
          />
        </div>
      </div>
      <div className="p-5">
        <span className="font-title font-800 text-xl uppercase">
          {member.title}
        </span>
        <h6 className="font-300">{member.function}</h6>
      </div>
    </div>
  );
}

MemberCard.defaultProps = {
  shadow: true,
};

MemberCard.propTypes = {
  member: PropTypes.shape(memberShape).isRequired,
  shadow: PropTypes.bool,
};