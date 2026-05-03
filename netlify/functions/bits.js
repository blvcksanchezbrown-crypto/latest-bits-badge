exports.handler = async function () {
  const GOOGLE_BITS_URL =
    "https://script.google.com/macros/s/AKfycbwyPAuDaGTFy95swLecbPF2HFRCqTQvIM1TGY6AXJJeKFFkbd68BvfehnarJl7l5fg/exec?mode=publicData";

  try {
    const response = await fetch(GOOGLE_BITS_URL);

    if (!response.ok) {
      throw new Error("Google Apps Script returned status " + response.status);
    }

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify({
        error: "Could not load bits data",
        details: error.message
      })
    };
  }
};