export const postService = {
    getMostRecent,
    getPostsList,
    getSinglePost
};

const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001'
};

function getMostRecent() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/api/Posts/GetMostRecent`, requestOptions).then(handleResponse);
};

function getPostsList(pageRequest) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageRequest)
    };

    return fetch(`${config.apiUrl}/api/Posts/Page`, requestOptions).then(handleResponse);
};

function getSinglePost(postId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postId)
    };

    return fetch(`${config.apiUrl}/api/Posts/Single`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) Location.reload(true);

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}