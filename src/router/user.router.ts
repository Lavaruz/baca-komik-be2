// import express from "express";
// import { AddNewEducation, AddNewExperience, AddNewLocation, AddNewSkill, AddSkillToUser, AddViewsUser, adminLogin, ChangeImageRouter, CreateAttachmentUserDontHave, CreateSocialUserDontHave, DeleteEducationById, DeleteExperienceById, GetAllLocations, GetAllProfilePicture, GetAllSavedPost, GetAllSkills, GetAllUserDomicile, GetAllUserEducations, GetAllUsers, GetAllUserWhereActiveSearch, GetEducationsByUserToken, GetExperienceById, GetExperiencesByUserToken, GetTotalUser, GetUserById, GetUserByToken, GoogleLoginHandler, HandleAllSavedPost, UpdateActiveSearch, UpdateAttachment, UpdateEducationById, UpdateExperienceById, UpdateSocials, UpdateUserByToken, UserLogout, VerifyJWT } from "../controllers/user.controller";
// import { decrypt } from "../config/crypto";    

// const userRouter = express.Router();

// userRouter.post("/admin/login",decodeMiddleware, adminLogin)



// userRouter.post("/add-social-user", CreateSocialUserDontHave)
// userRouter.post("/add-attachment-user", CreateAttachmentUserDontHave)
// userRouter.post("/change-img-route", ChangeImageRouter)

// userRouter.get("/", GetAllUsers)
// userRouter.get("/active", GetAllUserWhereActiveSearch)
// userRouter.get("/info", GetUserByToken)
// userRouter.get("/info/domicile", GetAllUserDomicile)
// userRouter.get("/info/educations", GetAllUserEducations)

// userRouter.get("/info/saved-post", GetAllSavedPost)
// userRouter.post("/info/saved-post", decodeMiddleware, HandleAllSavedPost)

// userRouter.put("/info/skills",decodeMiddleware, AddSkillToUser)
// userRouter.put("/info/config", decodeMiddleware, UpdateActiveSearch)

// userRouter.get("/info/educations", GetEducationsByUserToken)
// userRouter.post("/info/educations", decodeMiddleware, AddNewEducation)
// userRouter.put("/info/educations/:id", decodeMiddleware, UpdateEducationById)
// userRouter.delete("/info/educations/:id", DeleteEducationById)

// userRouter.get("/info/experience/:id", GetExperienceById)
// userRouter.get("/info/experiences", GetExperiencesByUserToken)
// userRouter.post("/info/experiences", decodeMiddleware, AddNewExperience)
// userRouter.put("/info/experiences/:id", decodeMiddleware, UpdateExperienceById)
// userRouter.delete("/info/experiences/:id", DeleteExperienceById)


// userRouter.get("/skills", GetAllSkills)
// userRouter.get("/locations", GetAllLocations)
// userRouter.post("/skills", decodeMiddleware, AddNewSkill)
// userRouter.post("/locations", decodeMiddleware, AddNewLocation)

// userRouter.put("/info/attachments", decodeMiddleware, UpdateAttachment)
// userRouter.put("/info/socials", decodeMiddleware, UpdateSocials)


// userRouter.get("/verify-token", VerifyJWT)
// userRouter.get("/total-user", GetTotalUser)
// userRouter.get("/pictures", GetAllProfilePicture)
// userRouter.post("/logout", UserLogout)
// userRouter.post("/auth/google", decodeMiddleware, GoogleLoginHandler)
// userRouter.put("/", decodeMiddleware, UpdateUserByToken)

// userRouter.get("/:id", GetUserById)
// userRouter.put("/:id/views", AddViewsUser)


// function decodeMiddleware(req, res, next){
//     req.body = decrypt(req.body.d)
//     if(req.body[0] == "{" || req.body[0] == "["){
//         req.body = JSON.parse(req.body)
//     }
//     next()
// }
    
// export default userRouter;
    