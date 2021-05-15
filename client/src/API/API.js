import deleteTrail from "./Trails/deleteTrail";
import postNewTrail from "./Trails/postNewTrail";
import editTrail from "./Trails/editTrail";
import getTrail from "./Trails/getTrail";

import postNewReview from "./Reviews/postNewReview";
import getReviewByUserTrail from "./Reviews/getReviewByUserTrail";
import editReview from "./Reviews/editReview";
import getReviewById from "./Reviews/getReviewById";

import editPark from "./Parks/editPark";
import getPark from "./Parks/getPark";
import postNewPark from "./Parks/postNewPark";
import deletePark from "./Parks/deletePark";

import logout from "./Auth/logout";

export {
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
};
