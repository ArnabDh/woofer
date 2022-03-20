const { DATA_KEYS } = require("../../../config/constants")
const logger = require("../../../config/logger")
const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
const verifyEndpointResponse = require("../../utils/verifyEndpointResponse")
const fetchUserDocument = require("../controllerHelpers/user/fetchUserDocument")

const randomUserFromZipPool = require("./randomUserFromZipPool")

const documentUserSwipeAccept = require("./documentUserSwipeAccept")
const documentUserSwipeReject = require("./documentUserSwipeReject")

const idKey = DATA_KEYS["USER_ID"]

module.exports = {
  fetchPossibleMatch: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["MATCHES", "GENERATE"],
      method: "GET",
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      const userId = req.body[DATA_KEYS["USER_ID"]]

      // Extract details about this user
      fetchUserDocument(res, { [idKey]: userId })
        .then((userProfile) => {
          const {
            [DATA_KEYS["USER_ZIPCODES"]]: userZipcodes,
            [DATA_KEYS["USER_PREFERENCE"]]: genderPreference,
          } = userProfile

          return randomUserFromZipPool(res, userId, userZipcodes, genderPreference)
        })
        .then((result) => {
          const { [DATA_KEYS["USER_PROFILE"]]: possibleMatch } = result

          if (possibleMatch) {
            const responseObj = {
              [DATA_KEYS["USER_PROFILE"]]: possibleMatch,
            }

            verifyEndpointResponse(responseObj, res, endpointObj, () => {
              res.status(200).json(responseObj)
            })
          } else {
            res.status(422).json("Unable to find a user in this zipcode")
          }
        })
        .catch((err) => logger.error(err))
    })
  },
  saveUserSwipeChoice: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["MATCHES", "SWIPE"],
      method: "POST",
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      const {
        [DATA_KEYS["THIS_USER_ID"]]: thisUserID,
        [DATA_KEYS["THAT_USER_ID"]]: thatUserID,
        [DATA_KEYS["MATCH_STATUS"]]: matchStatus,
      } = req.body

      if (matchStatus === "accept") {
        documentUserSwipeAccept(res, endpointObj, thisUserID, thatUserID)
      } else if (matchStatus === "reject") {
        documentUserSwipeReject(res, endpointObj, thisUserID, thatUserID)
      }
    })
  },
}
