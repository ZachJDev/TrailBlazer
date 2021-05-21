module.exports = {
    userCols: {
        USER_ID: 'userId',
        USERNAME: 'username',
        PASSWORD: 'password',
        IS_ADMIN: 'isAdmin',
        LENGTH_MEASURE: 'lengthMeasurement',
        EMAIL: 'email',
        BIO: 'bio',
    },
    trailCols: {
        TRAIL_ID: 'trailId',
        NAME: 'name',
        DESCRIPTION: 'description',
        LENGTH: 'length',
    },
    reviewCols: {
        REVIEW_ID: 'reviewId',
        TEXT: 'text',
        TITLE: 'title',
    },
    parkCols:{
        PARK_ID: 'parkId',
        NAME: 'name',
        ADDRESS: 'address',
        ZIP_CODE: 'zipCode',
        CITY: 'city',
        STATE: 'state',
        DESCRIPTION: 'description',
        LOCATION: 'location',
    },
    commentCols: {
        COMMENT_ID: 'commentId',
        PARENT_ID: 'parentId',
        TEXT: 'text',
    },
    trailUserPairCols: {
        TRAIL_USER_PAIR_ID: 'trailUserPairId'
    },
    TrailRatingCols: {
        STAR_RATING: 'starRating',
        PET_FRIENDLY: 'petFriendly',
        PARKING: 'parking',
        WHEELCHAIR_ACC: 'wheelchairAcc',
        DIFFICULTY: 'difficulty',
        GROUPS: 'goodForGroups'
    },
    miscCols: {
        PIC_URL: 'picUrl',
    },

};