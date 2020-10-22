function def(obj, key) {
        Object.defineProperty(obj, key, {
        writable: true,
        enumerable: true,
        configurable: true,
        value: function(...args) {
            console.log('key', key);
            console.log('args', args); 
        }
    });
}
