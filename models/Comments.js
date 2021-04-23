const {DataTypes} = require('sequelize')
const {Op} = require('sequelize');

const buildCommentTree = (comments, LoggedInUser) => {
    // used to count actual length of comment section for front-end. (a reply will have a higher key than a sibling)
    let key = 0
    const recursiveBuild = (parent) => {
        return comments.filter(comment => comment.parentId === parent)
        .map(({text, user, commentId, updatedAt}) => {
            return {
                text,
                user,
                commentId,
                updatedAt,
                key: key++,
                isEditable:  LoggedInUser && LoggedInUser.userId === user.userId,
                childComments: recursiveBuild(commentId)
            }
        })
    }
    return recursiveBuild(null)
}

const countComments = (comments) => {
    return comments.reduce((prev, cur) => {
        return prev + 1 + countComments(cur.childComments)
    }, 0)
};

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reviewId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },  )

    Comment.findByReviewId = (reviewId, user) => {
        return Comment.findAll({where: {reviewId},
            include: [{association: Comment.associations.user, attributes: ["username", "userId"]}],
            attributes: { include:['text', 'commentId', 'parentId', 'updatedAt']}})
            .then(comments => {
                return {comments: buildCommentTree(comments, user), total: comments.length}
            })
    }
    Comment.findByMultipleReviewIds = (reviewIds, user) => {
        return Comment.findAll({where: {reviewId: {[Op.or]: reviewIds}},
            include: [{association: Comment.associations.user, attributes: ["username", "userId"]}],
            attributes: ["text", "commentId", "parentId", "reviewId", "updatedAt"]})
            .then(comments => {
                return reviewIds.map(revId => ({
                    reviewId: revId,
                    comments: buildCommentTree(comments.filter(comment => revId === comment.reviewId), user)
                }))
            })
    }
    Comment.addComment = ({reviewId, parentId, userId, text}) => {
       return Comment.create({userId, parentId, reviewId, text})
            .then(comment => {
                return {success: true};
            })
    }

    Comment.updateComment = (commentId, text, userId) => {
        return Comment.update({text}, {where: {commentId, userId}}) // This should stop unauthorized access to other users' comments.
            .then(comment => {
                return {success: true}
        })
    }

    Comment.deleteComment = (commentId, userId) => {
        return Comment.delete({where: commentId, userId})
            .then(comment => {
                return {success: true}
            })
    }
    return Comment
}