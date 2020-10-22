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
 * Функция смены окончаний
 * @param  {Number} num
 * @param  {Array} cases
 * @return {String}
 *
 * {'nom': 'слово', 'gen':'слова', 'plu':'слов'}
 */
export const getDeclentionWord = (num, cases) => {
    num = Math.abs(num);
    let word = '';
    if (num.toString().indexOf('.') > -1) {
        word = cases.gen;
    } else {
        word = (
            num % 10 == 1 && num % 100 != 11
                ? cases.nom
                : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
                ? cases.gen
                : cases.plu
        );
    }
    return word;
};
/**
 * Получаем значение ключа объекта по строке
 * Похожий метод _.get есть в lodash
 * @param  {String} k  Ключ
 * @param  {Object} o Объект
 * @return {Any}
 */
export const get = (k, o) => k.split('.').reduce((a, c) => a && a[c] || null, o);
export const getElement = e => checkElementExist( $(e) ) ? $(e) : null;