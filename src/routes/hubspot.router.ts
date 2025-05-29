import express from "express";
import {
  getAuthHubspot,
  getCallbackAuthMethod,
  getHubspotCompanies,
  getHubspotContacts,
  createCompanyHandler,
} from "../controllers/hupspot.controller";
const router = express.Router();

router.get("/auth/hubspot", getAuthHubspot);

router.get("/auth/hubspot/callback", getCallbackAuthMethod);
router.get("/hubspotcompanies", getHubspotCompanies);
router.get("/hubspotcontacts", getHubspotContacts);
router.post("/hubspot/companies", createCompanyHandler);
// router.post ('/hubspotcpmainies',createCompanyHandler)

export default router;
