export default (value, pattern) => (
  pattern.split('|').reduce((errors, rule) => {
    if (rule === 'required' && !value) {
      errors.push('обязательное поле');
    }
    if (rule === 'string' && typeof value !== 'string') {
      errors.push('должно быть текстовым значением');
    }
    if (rule === 'integer' && (typeof value !== 'number' || value % 1 > 0)) {
      errors.push('только целочисленное значение');
    }
    if (rule.search('min') > -1) {
      const min = +rule.split(':')[1];
      if (value < min) errors.push(`не менее ${min}`);
    }
    if (rule.search('max') > -1) {
      const max = +rule.split(':')[1];
      if (value > max) errors.push(`не более ${max}`);
    }
    return errors;
  }, [])
);
