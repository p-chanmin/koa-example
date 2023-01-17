const { pool } = require('../../data');

/**
 * 전체 피드를 불러오는 함수
 * @returns 
 */
exports.index = async () => {
    const query = `SELECT * FROM feed`;
    let result = await pool(query, []);
    return (result.length < 0) ? null : result;
}
/**
 * 피드 작성하는 함수
 * @param {number} userId   유저 아이디
 * @param {number} imageId  이미지 아이디
 * @param {string} content  컨텐츠 내용
 * @returns 
 */
exports.store = async (userId, imageId, content) => {
    const query = `INSERT INTO feed
    (user_id, image_id, content)
    VALUES (?,?,?)`;
    return await pool(query, [userId, imageId, content]);
}
/**
 * 해당 id의 피드를 반환하는 함수
 * @param {number} id 피드 id
 * @returns 
 */
exports.show = async (id) => {
    const query = `SELECT * FROM feed WHERE id = ?`;
    let result = await pool(query, [id]);
    return (result.length < 0) ? null : result[0]
}

/**
 * 해당 id의 피드를 수정하는 함수
 * @param {number} id  피드 id
 * @param {number} imageId 이미지 파일 id
 * @param {string} content 컨텐츠 내용
 * @returns 
 */
exports.update = async (id, imageId, content) => {
    const query = `UPDATE feed
    SET image_id = ?, content = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`;
    return await pool(query, [imageId, content, id]);
}

/**
 * 해당 id의 피드를 삭제하는 함수
 * @param {number} id 피드 id
 * @returns 
 */
exports.deleteFeed = async (id) => {
    const query = `delete from feed where id = ?`;
    return await pool(query, [id]);
}