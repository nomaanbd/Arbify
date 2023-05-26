// TODO: Change subdirectory (ex: /subdir)
const subdir = "";

const messageData = projectId =>
    subdir + `/projects/${projectId}/messages/data`;
const storeMessage = projectId => subdir + `/projects/${projectId}/messages`;
const updateMessage = (projectId, messageId) =>
    subdir + `/projects/${projectId}/messages/${messageId}`;
const deleteMessage = (projectId, messageId) =>
    subdir + `/projects/${projectId}/messages/${messageId}`;
const putMessageValue = (projectId, messageId, languageId, form) =>
    subdir +
    `/projects/${projectId}/messages/${messageId}/${languageId}/${
        form ? form : ""
    }`;
const messageValueHistory = (projectId, messageId, languageId, form) =>
    subdir +
    `/projects/${projectId}/messages/${messageId}/${languageId}/${
        form ? form : ""
    }`;

export {
    messageData,
    storeMessage,
    updateMessage,
    deleteMessage,
    putMessageValue,
    messageValueHistory
};
