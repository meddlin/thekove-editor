export const editorService = {
    createPost,
    updatePostBody
};

const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001'
};

function createPost(postDocument) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postDocument)
    };

    return fetch(`${config.apiUrl}/api/Posts/Insert`, requestOptions).then(handleResponse);
};

function updatePostBody(docId, postBody) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    };

    return fetch(`${config.apiUrl}/api/Posts/UpdateBody/${docId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                Location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}