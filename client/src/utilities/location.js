export const getPath = location => {
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  const afterResource = splitLocation.slice(1).join('/');
  return afterResource;
};
