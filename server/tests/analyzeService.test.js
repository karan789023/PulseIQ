import axios from "axios";
import { analyzeWebsiteService } from "../services/analyzeService.js";

jest.mock("axios");

describe("Page Pulse Parsing Tests", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Happy Path - parses HTML correctly", async () => {

    axios.get.mockResolvedValue({
      status: 200,
      headers: {
        "content-type": "text/html",
      },
      data: `
      <html>
        <head>
          <title>Example</title>
          <meta name="description" content="Demo description"/>
        </head>

        <body>

          <h1>Hello</h1>

          <img src="a.jpg" alt="image"/>

          <p>
            This is a simple test page with enough words
            to validate parsing.
          </p>

        </body>

      </html>
      `,
    });

    const result = await analyzeWebsiteService(
      "https://example.com"
    );

    expect(result.status).toBe(200);

    expect(result.title).toBe("Example");

    expect(result.metaDescription).toBe(
      "Demo description"
    );

    expect(result.h1Count).toBe(1);

    expect(result.missingAltImages).toBe(0);

    expect(result.wordCount).toBeGreaterThan(0);
  });

  test("Failure - Non HTML Response", async () => {

    axios.get.mockResolvedValue({
      status: 200,
      headers: {
        "content-type": "application/pdf",
      },
      data: "PDF",
    });

    await expect(
      analyzeWebsiteService("https://example.com/file.pdf")
    ).rejects.toMatchObject({
      code: "NON_HTML",
    });
  });

  test("Failure - HTTP 404", async () => {

    axios.get.mockResolvedValue({
      status: 404,
      headers: {
        "content-type": "text/html",
      },
      data: "<html></html>",
    });

    await expect(
      analyzeWebsiteService("https://example.com")
    ).rejects.toMatchObject({
      code: "HTTP_ERROR",
    });
  });

  test("Failure - Invalid URL", async () => {

    await expect(
      analyzeWebsiteService("abc123")
    ).rejects.toMatchObject({
      code: "INVALID_URL",
    });
  });

  test("Failure - Timeout", async () => {

    axios.get.mockRejectedValue({
      code: "ECONNABORTED",
    });

    await expect(
      analyzeWebsiteService("https://example.com")
    ).rejects.toMatchObject({
      code: "TIMEOUT",
    });
  });

});