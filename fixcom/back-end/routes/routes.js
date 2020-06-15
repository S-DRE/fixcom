// routes.js
// DEBUG
 

// Modules
const express = require("express");
const router = express.Router();
const web_controller = require("../controllers/controllers");
const middleware = require("../middlewares/middlewares");

// Public routes' definition

router.use(middleware.redirect);

// Start
router.get("/", web_controller.web_index);

// Login
router.get("/login", web_controller.web_index);
router.post("/login", web_controller.web_loginPOST);

// ForgotPassword
router.get("/forgotPassword", web_controller.web_index);

// Register
router.get("/register", web_controller.web_index);
router.post("/register", web_controller.web_register);

// Meteo
router.get("/meteo", web_controller.web_index);
router.post("/meteo", web_controller.web_meteo);

// recuperatePassword
router.post("/recuperatePassword", web_controller.web_recuperatePassword);

// newPassword
router.get("/newPassword", web_controller.web_index);
router.post("/newPassword", web_controller.web_newPassword);

// IntroduceCode
router.get("/introduceCode", web_controller.web_index);
router.post("/introduceCode", web_controller.web_introduceCode);

// Acting Map
router.get("/actingMap", web_controller.web_index);
router.post("/getCityInfo", web_controller.web_getCityInfo);

// Legal Advice
router.get("/legalAdvice", web_controller.web_index);

// Middlewares
router.use(middleware.loguedUser);

// UserOptions
router.get("/userOptions", web_controller.web_index);

// UserConfig
router.get("/userConfig", web_controller.web_index);

// CreateRequest
router.get("/createRequest", web_controller.web_index);
router.post("/createRequest", web_controller.web_createRequest);

// SearchRequests
router.get("/searchRequests", web_controller.web_index);
router.post("/searchRequests", web_controller.web_searchRequests);

// ClaimRequest
router.post("/claimRequest", web_controller.web_claimRequest);

// ManageRequests
router.get("/manageRequests", web_controller.web_index);
router.post("/manageRequests", web_controller.web_manageRequests);

// EditRequest
router.get("/editRequest", web_controller.web_index);
router.post("/editRequest", web_controller.web_editRequest);

// DeleteRequest
router.post("/deleteRequest", web_controller.web_deleteRequest);

// SearchRequestInfo
router.post("/searchRequestInfo", web_controller.web_searchRequestInfo);

// CreateClaimsTable
router.post("/createClaimsTable", web_controller.web_createClaimsTable);

// CreatePendingClaimsTable
router.post("/createPendingClaimsTable", web_controller.web_createPendingClaimsTable);

// GrantRequest
router.post("/grantRequest", web_controller.web_grantRequest);

// FinishRequest
router.post("/finishRequest", web_controller.web_finishRequest);

// ---------------------

// Private routes
module.exports = router