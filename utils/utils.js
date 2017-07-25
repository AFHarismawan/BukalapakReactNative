import React from 'react';

export class utils {

    static sendHttpRequest(url, method, headers) {
        fetch(url, {
            method: method,
            headers: headers,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}