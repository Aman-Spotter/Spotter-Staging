import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUrlParams } from 'hooks';

const FromExtension = () => {
  const query = useUrlParams();
  const history = useHistory();

  useEffect(() => {
    const token = query.get('accessToken');
    const redirectTo = query.get('redirectTo');

    Cookies.set('extension_access_token', token);
    history.replace(redirectTo);
  }, []);
  return <></>;
};

export default FromExtension;
