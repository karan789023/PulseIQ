import axios from "axios";
import * as cheerio from "cheerio";

const createError = (message, code) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

export const analyzeWebsiteService = async (url) => {
  // Validate URL
  try {
    new URL(url);
  } catch {
    throw createError(
      "Invalid URL. Please enter a valid http:// or https:// URL.",
      "INVALID_URL"
    );
  }

  try {
    const startTime = Date.now();

    const response = await axios.get(url, {
      timeout: 10000,
      maxRedirects: 5,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36",
        Accept: "text/html",
      },
      validateStatus: () => true,
    });

    const responseTime = Date.now() - startTime;

    // HTTP Errors
    if (response.status >= 400) {
      throw createError(
        `Website returned HTTP ${response.status}.`,
        "HTTP_ERROR"
      );
    }

    // Content Type
    const contentType = response.headers["content-type"] || "";

    if (!contentType.includes("text/html")) {
      throw createError(
        "The provided URL does not return an HTML page.",
        "NON_HTML"
      );
    }

    // Empty Response
    if (!response.data || response.data.trim() === "") {
      throw createError(
        "The website returned an empty response.",
        "EMPTY_RESPONSE"
      );
    }

    const $ = cheerio.load(response.data);

    if ($("body").length === 0) {
      throw createError("No HTML body found.", "INVALID_HTML");
    }

    // Extract Data
    const title = $("title").text().trim();

    const metaDescription =
      $('meta[name="description"]').attr("content")?.trim() || "";

    const h1Count = $("h1").length;

    const missingAltImages = $("img").filter((_, img) => {
      const alt = $(img).attr("alt");
      return !alt || alt.trim() === "";
    }).length;

    const wordCount = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean).length;

    // SEO Score
    let seoScore = 100;

    if (!title) seoScore -= 20;
    if (!metaDescription) seoScore -= 20;
    if (h1Count === 0) seoScore -= 20;
    if (missingAltImages > 0)
      seoScore -= Math.min(20, missingAltImages * 2);
    if (wordCount < 300) seoScore -= 10;
    if (responseTime > 3000) seoScore -= 10;

    seoScore = Math.max(0, seoScore);

    // Insights
    const insights = [];

    insights.push({
      type: "success",
      text: `Website responded with HTTP ${response.status}.`,
    });

    if (title) {
      insights.push({
        type: "success",
        text: "Page title found.",
      });
    } else {
      insights.push({
        type: "warning",
        text: "Page title is missing.",
      });
    }

    if (metaDescription) {
      insights.push({
        type: "success",
        text: "Meta description found.",
      });
    } else {
      insights.push({
        type: "warning",
        text: "Meta description is missing.",
      });
    }

    if (h1Count > 0) {
      insights.push({
        type: "success",
        text: `${h1Count} H1 heading(s) found.`,
      });
    } else {
      insights.push({
        type: "warning",
        text: "No H1 heading found.",
      });
    }

    if (missingAltImages === 0) {
      insights.push({
        type: "success",
        text: "All images have ALT text.",
      });
    } else {
      insights.push({
        type: "warning",
        text: `${missingAltImages} image(s) missing ALT text.`,
      });
    }

    if (responseTime < 1000) {
      insights.push({
        type: "success",
        text: "Fast server response.",
      });
    } else {
      insights.push({
        type: "warning",
        text: "Website response is relatively slow.",
      });
    }

    if (wordCount >= 300) {
      insights.push({
        type: "success",
        text: "Content length looks good.",
      });
    } else {
      insights.push({
        type: "warning",
        text: "Content appears short for SEO.",
      });
    }

    return {
      status: response.status,
      responseTime,
      title,
      metaDescription,
      h1Count,
      missingAltImages,
      wordCount,
      seoScore,
      insights,
    };
  } catch (error) {
    switch (error.code) {
      case "ECONNABORTED":
        throw createError(
          "Request timed out after 10 seconds.",
          "TIMEOUT"
        );

      case "ENOTFOUND":
      case "EAI_AGAIN":
        throw createError(
          "Unable to reach the website. Please check the URL.",
          "DNS_ERROR"
        );

      case "ECONNREFUSED":
        throw createError(
          "Connection refused by the target server.",
          "CONNECTION_REFUSED"
        );

      case "ERR_NETWORK":
        throw createError(
          "Network error occurred while connecting.",
          "NETWORK_ERROR"
        );

      case "ERR_FR_TOO_MANY_REDIRECTS":
        throw createError(
          "Too many redirects.",
          "REDIRECT_LOOP"
        );

      case "DEPTH_ZERO_SELF_SIGNED_CERT":
        throw createError(
          "The website has an invalid SSL certificate.",
          "SSL_ERROR"
        );

      default:
        throw error;
    }
  }
};