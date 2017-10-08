import { CALL_API } from 'redux-api-middleware';

export function writeSubmit(values) {
    return {
        [CALL_API]: {
            endpoint: '/api/noticewrite',
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            types: ['NOTICE_WRITE_SUBMIT', 'NOTICE_WRITE_SUCCESS', 'NOTICE_WRITE_FAILURE']
        }
    }
}

export function deleteSubmit(values) {
    return {
        [CALL_API]: {
            endpoint: '/api/noticedelete',
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            types: ['NOTICE_DELETE_SUBMIT', 'NOTICE_DELETE_SUCCESS', 'NOTICE_DELETE_FAILURE']
        }
    }
}