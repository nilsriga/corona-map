import React from 'react';

export const LocaleContext = React.createContext();

export const LocaleContextProvider = props => {
  const [locale, setLocale] = React.useState(navigator.language.split(/[-_]/)[0]);

  return <LocaleContext.Provider value={[locale, setLocale]}>{props.children}</LocaleContext.Provider>;
};
