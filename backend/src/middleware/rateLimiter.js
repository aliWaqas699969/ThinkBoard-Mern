import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) return res.status(429).json({ message: "too many requests" });
    next();
  } catch (error) {
    console.log("Error in rate limiter middleware");
    res.status(500).json({ message: "server error" });
  }
};
export default ratelimiter;
