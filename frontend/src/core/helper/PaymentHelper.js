import {API} from '../../backend';

export const getToken = (userId, token) => {
    return fetch(`${API}payment/gettoken/${userId}/${token}/`,{method: "GET"})
            .then((response) => {
                return response.json()})
            .catch(e=>console.log(e))
}

export const processPayment = (userId,token,paymentInfo) => {
    const formdata = new FormData();

    for(const name in paymentInfo){
        formdata.append(name, paymentInfo[name])
    }

    return fetch(`${API}payment/${userId}/${token}`, {
        method: "POST",
        body: formdata
    })
    .then(response => response.json())
    .catch(e=>console.log(e))

}