const { LeetCode } = require("leetcode-query");

const fetchLastSubmissionTimestamp = async (username) => {
  if (!username) {
    console.error("No username provided");
    return null;
  }

  const leetcode = new LeetCode();

  try {
    // First verify the user exists
    const userProfile = await leetcode.user(username);
    if (userProfile) {
      const recentSubmissions = await leetcode.recent_submissions(username, 1);
      if (!recentSubmissions || recentSubmissions.length === 0) {
        console.log(`No recent submission found for ${username}`);
        return null;
      }
      const recentSubmission = recentSubmissions[0];
      const recentTimeStamp = recentSubmission.timestamp;
      if (!recentTimeStamp) {
        console.log(`No timestamp found in recent submission for ${username}`);
        return null;
      }

      // Convert timestamp to readable date
      const submissionDate = new Date(parseInt(recentTimeStamp) * 1000);
      return submissionDate.toLocaleString();
    }
  } catch (error) {
    console.error("Detailed error in fetchLastSubmissionTimestamp:", {
      username,
      errorMessage: error.message,
      errorStack: error.stack,
      errorResponse: error.response?.data,
    });
    return null;
  }
};

module.exports = { fetchLastSubmissionTimestamp };
