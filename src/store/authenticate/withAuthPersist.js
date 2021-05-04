import { useState, useLayoutEffect } from 'react';

import { AuthenticationContainer, AuthenticationStoreKey, initialState as initialStoreState } from './store';

const withAuthPersist = (Component) => ({ ...props }) => {
  const [storePersisted, setStorePersisted] = useState(initialStoreState);
  useLayoutEffect(() => {
    (async function getPersistData() {
      const data = window.localStorage.getItem(AuthenticationStoreKey);
      if (data) {
        setStorePersisted({
          ...JSON.parse(data),
          initiated: true,
        });
      } else {
        setStorePersisted({
          ...initialStoreState,
          initiated: true,
        });
      }
    })();
  }, []);
  if (storePersisted && !storePersisted.initiated) return null;
  return (
    <AuthenticationContainer isGlobal={true} initialState={storePersisted}>
      <Component />
    </AuthenticationContainer>
  );
};
export default withAuthPersist;