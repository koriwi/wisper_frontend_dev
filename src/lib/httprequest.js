export function get(url) {
    return new Promise((resolve, reject) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", url);
        //xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.onload = (data) => {
            resolve({ data: JSON.parse(xmlhttp.responseText), xmlhttp });
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
            resolve({ data: JSON.parse(xmlhttp.responseText), xmlhttp  });
        };
        xmlhttp.send(JSON.stringify(data));
    });
}   