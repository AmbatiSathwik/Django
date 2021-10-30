import { API } from '../../backend';

export const createOrder = ( userId,token, orderDetails ) => {
    const formdata = new FormData();
    for(const name in orderDetails){
        formdata.append(name,orderDetails[name])
    }

    return (
        fetch(`${API}order/add/${userId}/${token}/` , {
            method: "POST",
            body: formdata
        })
        .then(response => response.json())
        .catch(err=>console.log(err))
    )

}