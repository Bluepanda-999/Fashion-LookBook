// External API controller(for post inspiration) 
exports.getUnsplashPhotos = async (req, res) => {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      return res.status(500).json({
        success: false,
        message: "Missing UNSPLASH_ACCESS_KEY in .env",
      });
    }

    const query = String(req.query.query || "street style fashion").trim();
    const perPage = Math.min(parseInt(req.query.per_page || "6", 10), 12);
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);

    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", query);
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("orientation", "portrait");

    const apiRes = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Accept-Version": "v1",
      },
    });

    const data = await apiRes.json().catch(() => null);

    if (!apiRes.ok) {
      return res.status(apiRes.status).json({
        success: false,
        message: "Unsplash API error",
        status: apiRes.status,
        data,
      });
    }

    const items = (data?.results || []).map((p) => ({
      id: p.id,
      title: p.description || p.alt_description || "Fashion inspiration",
      image: p?.urls?.regular || p?.urls?.small || "",
      link: p?.links?.html || "",
      author: p?.user?.name || "",
    }));

    return res.json({
      success: true,
      query,
      items,
    });
  } catch (err) {
    console.error("Unsplash controller error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while loading Unsplash",
    });
  }
};
