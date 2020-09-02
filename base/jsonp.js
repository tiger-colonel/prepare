const jsonp = ({url, params, callback}) => {
    const generateUrl = () => {
        let str = Object.entries(params).reduce((t, v) => {
            t = `${v[0]}=${v[1]}&`
            return t;
        }, '');
        url = `${str}${Object.keys(params).length ? '?' : ''}`.replace(/&$/, '');
    }
    return new Promise((resolve, reject) => {
        callback = callback || Math.random().toString.replace(',', '');
        let scriptEle = document.createElement('script');
        scriptEle.src = generateUrl();
        document.body.appendChild(scriptEle);
        window[callback] = (data) => {
            resolve(data);
            document.body.removeChold(scriptEle)
        }
    })
}

class Stete {
    constructor(state) {
        this.state = state;
    }
    async test() {
        try {
            let sss = await this.test2();
            console.log('-----sss-----', sss);
        } catch (error) {
            
        }

    }
    test2 () {
        setTimeout(() => {
            console.log('-----123-----', 123);
        }, 1000);
    }
}

let a = new Stete();
a.test();
console.log('-----a-----', a);
