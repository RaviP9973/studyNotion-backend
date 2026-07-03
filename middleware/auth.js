const jwt = require("jsonwebtoken");
require("dotenv").config();

// Cache JWT secret to avoid repeated env access (optimization)
const JWT_SECRET = process.env.JWT_SECRET;

// auth - Optimized middleware
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || req.header("authorization");
    const tokenFromHeader = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;

    const token = req.cookies?.token || req.body?.token || tokenFromHeader;

    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify token with cached secret
    try {
      const decode = jwt.verify(token, JWT_SECRET);
      req.user = decode;
      // console.log("verified successfully");
    } catch (error) {
      // Don't expose detailed JWT error messages in production
      // console.log("error in auth.js",error);
      const message = process.env.NODE_ENV === "development" 
        ? error.message 
        : "Invalid or expired token";
      return res.status(401).json({
        success: false,
        message,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// isStudent - Check if user is a student (removed async - no await needed)
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// isInstructor - Check if user is an instructor (removed async - no await needed)
exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// isAdmin - Check if user is an admin (removed async - no await needed)
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};
