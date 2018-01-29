export function get(url) {
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", url);
        //xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = (data) => {
           resolve(JSON.parse(xmlhttp.responseText));
        };
        xmlhttp.send();
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("post", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = () => {
            resolve(JSON.parse(xmlhttp.responseText));
        };
        xmlhttp.send(JSON.stringify(data));
    });
}