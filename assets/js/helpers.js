export const checkType = o => Object.prototype.toString.call(o).replace(/\[|object\s|\]/g, '').toLowerCase();
export const isObject = o => checkType(o) === 'object';
export const isArray = o => checkType(o) === 'array';
export const isDate = o => checkType(o) === 'date';
export const isString = o => checkType(o) === 'string';
export const isNumber = o => checkType(o) === 'number';
export const isFunction = o => checkType(o) === 'function';
export const checkElementExist = e => !!$(e) && !!$(e).length;
export const removeSpaces = s => String(s).replace(/\s/g, '');
/**
 * Получаем значение ключа объекта по строке
 * Похожий метод _.get есть в lodash
 * @param  {String} k  Ключ
 * @param  {Object} o Объект
 * @return {Any}
 */
export const get = (k, o) => k.split('.').reduce((a, c) => a && a[c] || null, o);
export const getElement = e => checkElementExist( $(e) ) ? $(e) : null;