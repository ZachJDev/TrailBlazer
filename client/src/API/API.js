import deleteTrail from "./Trails/deleteTrail";
import postNewTrail from "./Trails/postNewTrail";
import editTrail from "./Trails/editTrail";
import getTrail from "./Trails/getTrail";

import postNewReview from "./Reviews/postNewReview";
import getReviewByUserTrail from "./Reviews/getReviewByUserTrail";
import editReview from "./Reviews/editReview";
import getReviewById from "./Reviews/getReviewById";
import getReviewsByUserId from "./Reviews/getReviewsByUserId";

import editPark from "./Parks/editPark";
import getPark from "./Parks/getPark";
import postNewPark from "./Parks/postNewPark";
import deletePark from "./Parks/deletePark";

import postNewComment from "./Comments/postNewComment";
import deleteComment from "./Comments/deleteComment";
import editComment from "./Comments/editComment";
import getAllCommentsForReview from "./Comments/getAllCommentsForReview";

import logout from "./Auth/logout";
import signUp from "./Auth/signUp";

import getUserData from "./Users/getUserData";
import deleteUser from "./Users/deleteUser";

import searchReq from "./Search/searchReq";

export {
  postNewComment,
  deleteComment,
  editComment,
  getAllCommentsForReview,
  postNewTrail,
  deleteTrail,
  editTrail,
  getTrail,
  postNewReview,
  logout,
  getPark,
  editPark,
  postNewPark,
  deletePark,
  getReviewByUserTrail,
  getReviewById,
  editReview,
  searchReq,
  signUp,
  getUserData,
  deleteUser,
  getReviewsByUserId,
};
