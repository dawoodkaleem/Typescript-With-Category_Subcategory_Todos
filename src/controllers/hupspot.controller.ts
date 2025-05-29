import axios, { AxiosError } from "axios";

import {
  generateHubspotAuthUrl,
  handleHubspotOAuthCallback,
  getAllContactsHubspot,
  getAllCompaniesHubspot,
  createHubspotCompany,
} from "../services/hubspot.services";
import { Response, Request } from "express";

const getAccessToken = (accessToken: string): string => {
  const auth: string = accessToken;

  if (typeof auth !== "string" || !auth.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Bearer token");
  }

  return auth.split(" ")[1];
};

export const getAuthHubspot = (req: Request, res: Response) => {
  const authUrl: string = generateHubspotAuthUrl();
  res.redirect(authUrl);
};

export const getCallbackAuthMethod = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const response = await handleHubspotOAuthCallback(code);
    res.json({
      message: "Oauth success",
      user: response,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("OAuth callback error:", error.message || error);
      res.status(500).send("OAuth failed");
    }
  }
};

export const getHubspotContacts = async (req: Request, res: Response) => {
  const accessToken: string = getAccessToken(
    req.headers.authorization as string
  );

  try {
    const response = await getAllContactsHubspot(accessToken);

    res.status(200).json(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching contacts from HubSpot:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      // Handle unknown error type
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Failed to fetch contacts from HubSpot" });
    }
  }
};

export const getHubspotCompanies = async (req: Request, res: Response) => {
  const accessToken: string = getAccessToken(
    req.headers.authorization as string
  );
  const authHeader = { Authorization: `Bearer ${accessToken}` };
  try {
    const response = await getAllCompaniesHubspot(accessToken);

    res.status(200).json({ response, "Header auth": authHeader });
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      "Error fetching companies from HubSpot:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Failed to fetch companies from HubSpot" });
  }
};

export const createCompanyHandler = async (req: Request, res: Response) => {
  try {
    const accessToken: string = getAccessToken(
      req.headers.authorization as string
    );

    const companyProperties = req.body;

    if (!companyProperties?.name) {
      res.status(400).json({ error: "Company name is required" });
      return;
    }

    const createdCompany = await createHubspotCompany(
      accessToken,
      companyProperties
    );
    res.status(201).json(createdCompany);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Failed to create company" });
    }
  }
};
