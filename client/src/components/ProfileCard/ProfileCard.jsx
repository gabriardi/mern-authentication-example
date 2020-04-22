import React from 'react';

import svgSprite from '../../assets/svg/sprite.svg';
import styles from './ProfileCard.module.scss';

const ProfileCard = React.forwardRef(({ profile }, ref) => {
  const fullName = `${profile.name.first} ${profile.name.last}`;
  const { city, country } = profile.location;
  const img = profile.picture.large;

  return (
    <div ref={ref} className={styles.ProfileCard}>
      <img className={styles.ProfileCardImg} src={img} alt={`${fullName}`} />
      <div className={styles.ProfileCardName}>
        <svg className={styles.ProfileCardIcon}>
          <use xlinkHref={`${svgSprite}#icon-v-card`} />
        </svg>
        <h5>{fullName}</h5>
      </div>
      <div className={styles.ProfileCardLocation}>
        <svg className={styles.ProfileCardIcon}>
          <use xlinkHref={`${svgSprite}#icon-location-pin`} />
        </svg>
        <p>{`${city}, ${country}`}</p>
      </div>
    </div>
  );
});

export default ProfileCard;
