const { index, store, show, update, deleteFeed } = require('./query');

/** 전체 피드 보기 */
exports.index = async (ctx, next) => {
    let items = await index();

    if(items == null){
        ctx.body = {result: "fail"};
        return;
    }
    ctx.body = items;
}

/** 새 피드 작성 처리 */
exports.store = async (ctx, next) => {
    let { userId, imageId, content } = ctx.request.body;

    let { affectedRows, insertId } = await store(userId, imageId, content);

    if(affectedRows > 0){
        ctx.body = {result: "ok", id: insertId}
    } else{
        ctx.body = {result: "fail"};
    } 
}

/** 피드 상세 보기 */
exports.show = async (ctx, next) => {
    let { id } = ctx.params;
    let item = await show(id);

    if(item == null){
        ctx.body = {result: "fail"};
    } else {
        ctx.body = item;
    }
}

/** 피드 수정 */
exports.update = async (ctx, next) => {
    let { id } = ctx.params;
    let { imageId, content } = ctx.request.body;

    let { affectedRows } = await update(id, imageId, content);

    if(affectedRows > 0){
        ctx.body = {result: "update ok"}
    } else{
        ctx.body = {result: "fail"};
    } 
}

/** 피드 삭제 */
exports.delete = async (ctx, next) => {
    let { id } = ctx.params;

    let { affectedRows } = await deleteFeed(id);

    if(affectedRows > 0){
        ctx.body = {result: "delete ok"}
    } else{
        ctx.body = {result: "fail"};
    } 
}