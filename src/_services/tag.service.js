export const tagService = {
    getTags,
    getSingleTag,
    createTag,
    updateTag,
    createSection,
    removeSection,
    deleteTag
};

const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:5001'
};

function getTags() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/api/Tags/Get`, requestOptions).then(handleResponse);
};

function getSingleTag(tagId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagId)
    };

    return fetch(`${config.apiUrl}/api/Tags/Single`, requestOptions).then(handleResponse);
};

function createTag(tagDoc) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagDoc)
    };

    return fetch(`${config.apiUrl}/api/Tags/Insert`, requestOptions).then(handleResponse);
};

function updateTag(tagId, tagDoc) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagDoc)
    };

    return fetch(`${config.apiUrl}/api/Tags/Update/${tagId}`, requestOptions).then(handleResponse);
};

function createSection(tagId) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagId)
    };

    return fetch(`${config.apiUrl}/api/Tags/CreateSection`, requestOptions).then(handleResponse);
};

function removeSection(tagId) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tagId)
    };

    return fetch(`${config.apiUrl}/api/Tags/RemoveSection`, requestOptions).then(handleResponse);
};

function deleteTag(tagId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${config.apiUrl}/api/Tags/Delete/${tagId}`, requestOptions).then(handleResponse);
};


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