export const checkType = o => Object.prototype.toString.call(o).replace(/\[|object\s|\]/g, '').toLowerCase();
export const isObject = o => checkType(o) === 'object';
export const checkElementExist = e => !!$(e) && !!$(e).length;
export const getElement = e => checkElementExist( $(e) ) ? $(e) : null;