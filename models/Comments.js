const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");
const {commentCols, reviewCols, userCols} = require('./ColumnNameConfig');

const {COMMENT_ID, TEXT, PARENT_ID} = commentCols;
const {REVIEW_ID} = reviewCols;
const {USER_ID} = userCols;

// Helper Functions

const buildCommentTree = (comments, LoggedInUser) => {
  // used to count actual length of commentCols section for front-end. (a reply will have a higher key than a sibling)
  let key = 0;
  const recursiveBuild = (parent) => {
    return comments
      .filter((comment) => comment.parentId === parent)
      .map(({ text, user, commentId, updatedAt }) => {
        return {
          text,
          user,
          commentId,
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
  const Comment = sequelize.define("comment", {
    [USER_ID]: {
      type: DataTypes.UUID,
      allowNull: false,
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

  Comment.afterDestroy(async (instance) => {
    const { commentId } = instance;
    await Comment.destroy({
      where: { parentId: commentId },
      individualHooks: true,
    });
    console.log("destroying child comments...");
  });

  Comment.findByReviewId = (reviewId, user) => {
    return Comment.findAll({
      where: { reviewId },
      include: [
        {
          association: Comment.associations.user,
          attributes: ["username", "userId"],
        },
      ],
      attributes: { include: ["text", "commentId", "parentId", "updatedAt"] },
    }).then((comments) => {
      return {
        comments: buildCommentTree(comments, user),
        total: comments.length,
      };
    });
  };
  Comment.findByMultipleReviewIds = (reviewIds, user) => {
    return Comment.findAll({
      where: { reviewId: { [Op.or]: reviewIds } },
      include: [
        {
          association: Comment.associations.user,
          attributes: ["username", "userId"],
        },
      ],
      attributes: ["text", "commentId", "parentId", "reviewId", "updatedAt"],
    }).then((comments) => {
      // noinspection JSUnresolvedVariable
      return reviewIds.map((revId) => ({
        reviewId: revId,
        comments: buildCommentTree(
          comments.filter((comment) => revId === comment.reviewId),
          user
        ),
      }));
    });
  };
  Comment.addComment = ({ reviewId, parentId, userId, text }) => {
    console.log("Adding Comment");
    return Comment.create({ userId, parentId, reviewId, text }).then(
      (comment) => {
        return { success: true, comment };
      }
    );
  };

  Comment.updateComment = (commentId, text, userId) => {
    // noinspection JSUnusedLocalSymbols
    return Comment.update(
      { text },
      {
        where: {
          commentId,
          userId,
        },
      }
    ) // This should stop unauthorized access to other users' comments.
      .then((comment) => {
        return { success: true };
      });
  };

  Comment.deleteComment = (commentId, userId) => {
    // Deletes all children as well.
    console.log("DELETING Comment");
    // noinspection JSUnusedLocalSymbols
    return Comment.destroy({
      where: { commentId, userId },
      individualHooks: true,
    }).then((comment) => {
      return { success: true };
    });
  };
  return Comment;
};
