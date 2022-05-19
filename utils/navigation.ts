// @ts-ignore
// eslint-disable-next-line import/prefer-default-export
export const isSelected = (selectedPath: string, currentPath) => {
  const currentPathSubstr = currentPath.substring(1);
  const selectedPathSubstr = selectedPath.substring(1);

  return (
    currentPath === selectedPath ||
    (selectedPathSubstr && currentPathSubstr.startsWith(selectedPathSubstr))
  );
};
