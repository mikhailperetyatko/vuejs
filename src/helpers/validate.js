export default (value, pattern = []) => {
  const currentPattern = typeof pattern === 'string' ? pattern.split('|') : pattern;
  return currentPattern.reduce((errors, rule) => {
    const typeOfValue = typeof value;
    if (rule === 'required' && (
      (typeOfValue === 'object' && !Object.keys(value).length)
      || !value
    )) {
      errors.push('обязательное поле');
    }
    if (rule === 'string' && typeof value !== 'string') {
      errors.push('должно быть текстовым значением');
    }
    if (rule === 'integer' && (typeof value !== 'number' || value % 1 > 0)) {
      errors.push('только целочисленное значение');
    }
    const valueLength = typeOfValue === 'number' ? value : value.length;
    if (rule.search('min') > -1) {
      const min = +rule.split(':')[1];
      if (valueLength < min) errors.push(`не менее ${min}`);
    }
    if (rule.search('max') > -1) {
      const max = +rule.split(':')[1];
      if (valueLength > max) errors.push(`не более ${max}`);
    }
    if (rule.search('regex') > -1 && value) {
      const result = value.match(new RegExp(rule.split(':')[1], 'g'));
      if (result === null || result[0] !== value) errors.push('ошибочный формат поля');
    }
    return errors;
  }, []);
};
