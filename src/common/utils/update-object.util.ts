export function updateObject(source, target) {
  Object.keys(source).forEach((key) => {
    if (key in target && source[key] !== undefined) {
      target[key] = source[key];
    }
  });
  return target;
}
