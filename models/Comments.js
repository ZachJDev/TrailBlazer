const {DataTypes} = require('sequelize');
const {Op} = require('sequelize');
const {commentCols, reviewCols, userCols} = require('./ColumnNameConfig');

const {COMMENT_ID, TEXT, PARENT_ID} = commentCols;
const {REVIEW_ID} = reviewCols;
const {USER_ID, USERNAME} = userCols;

// Helper Functions

const buildCommentTree = (comments, LoggedInUser) => {
    // used to count actual length of commentCols section for front-end. (a reply will have a higher key than a sibling)
    let key = 0;
    const recursiveBuild = (parent) => {
        return comments
            .filter((comment) => comment.parentId === parent)
            .map(({text, user, commentId, updatedAt}) => {
                return {
                    [TEXT]: text,
                    [COMMENT_ID]: commentId,
                    user,
                    updatedAt,
                    key: key++,
                    isEditable: LoggedInUser && LoggedInUser.userId === user.userId,
                    childComments: recursiveBuild(commentId),
                };
            });
    };
    return recursiveBuild(null);
};

const countComments = (comments) => {
    return comments.reduce((prev, cur) => {
        return prev + 1 + countComments(cur.childComments);
    }, 0);
};

// Model Export

module.exports = (sequelize) => {
    // noinspection JSUnresolvedVariable
    const Comment = sequelize.define('comment', {
        [USER_ID]: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        [TEXT]: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        [COMMENT_ID]: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        [PARENT_ID]: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        [REVIEW_ID]: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Comment.findByReviewId = async (reviewId, user) => {
        const foundComments = await Comment.findAll({
            where: {reviewId},
            include: [{association: Comment.associations.user, attributes: [USERNAME, USER_ID]},
            ],
            attributes: {include: [TEXT, COMMENT_ID, PARENT_ID, REVIEW_ID, 'updatedAt']},
        });
        return {
            comments: buildCommentTree(foundComments, user),
            total: foundComments.length,
        };
    };
    Comment.findByMultipleReviewIds = async (reviewIds, user) => {
        const comments = await Comment.findAll({
            where: {reviewId: {[Op.or]: reviewIds}},
            include: [{association: Comment.associations.user, attributes: [USER_ID, USERNAME]}],
            attributes: [TEXT, COMMENT_ID, PARENT_ID, REVIEW_ID, 'updatedAt'],
        });
        return reviewIds.map((revId) => ({
            reviewId: revId,
            comments: buildCommentTree(
                comments.filter((comment) => revId === comment[REVIEW_ID]),
                user,
            ),
        }));
    };

    Comment.addComment = async ({reviewId, parentId, userId, text}) => {
        const comment = await Comment.create({userId, parentId, reviewId, text});
        return {success: true, comment: {[COMMENT_ID]: comment[COMMENT_ID]}};
    };

    Comment.updateComment = async (commentId, text, userId) => {
        const comment = await Comment.update(
            {[TEXT]: text},
            {where: {[COMMENT_ID]: commentId, [USER_ID]: userId}},
        ); // This should stop unauthorized access to other users' comments.
        return {success: true, comment: {[COMMENT_ID]: comment[COMMENT_ID]}};
    };

    Comment.deleteComment = async (commentId, userId) => {
        // Deletes all children as well.
        const comment = await Comment.update({[TEXT]: 'Deleted', [USER_ID]: null}, {
            where: {commentId, userId},
        });
        return {success: true, [COMMENT_ID]: comment[COMMENT_ID]};
    };
    return Comment;
}
;
