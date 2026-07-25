import { validateUrl } from "../utils/validateurl.js";
import { analyzeWebsiteService } from "../services/analyzeService.js";

export const analyzeWebsite = async (req, res) => {
  try {
    const { url } = req.body || {};

    if (!url) {
      return res.status(400).json({
        success: false,
        error: {
          code: "URL_REQUIRED",
          message: "URL is required.",
        },
      });
    }

    if (!validateUrl(url)) {
      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_URL",
          message:
            "Please enter a valid URL starting with http:// or https://",
        },
      });
    }

    const report = await analyzeWebsiteService(url);

    return res.status(200).json({
      success: true,
      data: report,
    });

  } catch (error) {

    let status = 500;

    switch (error.code) {

      case "INVALID_URL":
        status = 400;
        break;

      case "TIMEOUT":
        status = 408;
        break;

      case "DNS_ERROR":
      case "CONNECTION_REFUSED":
      case "NETWORK_ERROR":
        status = 502;
        break;

      case "NON_HTML":
      case "EMPTY_RESPONSE":
      case "INVALID_HTML":
        status = 422;
        break;

      case "HTTP_ERROR":
        status = 400;
        break;

      case "SSL_ERROR":
        status = 495;
        break;

      case "REDIRECT_LOOP":
        status = 508;
        break;

      default:
        status = 500;
    }

    return res.status(status).json({
      success: false,
      error: {
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "Something went wrong.",
      },
    });
  }
};