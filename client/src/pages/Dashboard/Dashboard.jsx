/* eslint-disable no-shadow */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

import styles from './Dashboard.module.scss';

import { getProfilesFromServer } from '../../redux/profiles/profiles.actions';

import ProfileCard from '../../components/ProfileCard';
import Loader from '../../components/Loader';

const Dashboard = ({
  getProfilesFromServer,
  profiles,
  isLoading,
  userName,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastProfileRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (hasMore) {
      getProfilesFromServer(pageNumber);
    }
    // Max 5000 results divided by 12 per query => circa 416 pages
    if (pageNumber >= 416) {
      setHasMore(false);
    }
  }, [getProfilesFromServer, pageNumber, hasMore]);

  return (
    <div className={styles.container}>
      {profiles !== '' && (
        <h2 className={styles.heading}>Welcome {userName}</h2>
      )}
      {profiles !== '' &&
        profiles.map((profile, index) => {
          if (profiles.length === index + 1) {
            // attach ref to the last element of the array
            return (
              <ProfileCard
                ref={lastProfileRef}
                key={uuidv4()}
                profile={profile}
              />
            );
          }
          return <ProfileCard key={uuidv4()} profile={profile} />;
        })}
      {isLoading && <Loader />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userName: state.auth.user.name,
  profiles: state.profiles.data,
  isLoading: state.profiles.isLoading,
});

export default connect(mapStateToProps, { getProfilesFromServer })(Dashboard);
