export const addItemtoCart = (item, next) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.push({ ...item })
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
}

export const remItemfromCart = (item) => {
    let cart = [];
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }

        cart.map((product,i) => {
            if(product.id === item.id){
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
}

export const loadCart = () => {
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const cartEmpty = (next) => {
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        let cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
}

export const numCart = () => {
    if(typeof window !== undefined){
        let cart = []
        cart = JSON.parse(localStorage.getItem("cart"))
        let num = cart.length;
        return num;
    }
}

