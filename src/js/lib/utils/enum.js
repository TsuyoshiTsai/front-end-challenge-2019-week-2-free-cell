export const Enum = (...args) => Object.freeze(Object.assign({}, ...args.map(key => ({ [key]: Symbol(key) }))))
