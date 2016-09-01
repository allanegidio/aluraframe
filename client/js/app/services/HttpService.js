class HttpService {
    get(url) {
        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();
            ajax.open('GET', url);
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        resolve(JSON.parse(ajax.responseText));
                    } else {
                        reject(ajax.responseText);
                    }
                }
            }

            ajax.send();
        });
    }
}
