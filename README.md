# LeetKeeper: LeetCode Streak Tracker Discord Bot

## Overview
The **LeetKeeper** is designed to help students prepare for technical interviews by fostering a culture of consistent coding practice. Through a gamified approach, the bot tracks daily LeetCode streaks, unique accepted solutions, and user progress, encouraging engagement and collaboration within the community.

## Features
- **Streak Tracking**: Monitors users' daily LeetCode streaks and provides motivation to maintain consistency.
- **Problem-Solving Metrics**: Tracks the total number of unique accepted problems solved.
- **Gamified Challenges**: Encourages coding through leaderboards and streak-based rewards.
- **Real-Time Insights**: Provides instant updates using LeetCode API integrations.

## Tech Stack
- **Node.js**: Backend logic and Discord bot development.
- **Discord.js**: Integration with Discord for seamless server interactions.
- **MongoDB**: Database for tracking user streaks, submissions, and other metrics.
- **LeetCode API**: Fetches user stats and submissions data.

## How It Works
1. Users link their LeetCode accounts to the bot via Discord.
2. The bot fetches daily problem-solving data, including unique accepted submissions and streaks.
3. Leaderboards and streak stats are updated in real-time, encouraging friendly competition.
4. You will be assigned to specific discord channel based on consistency.

## Impact
- **Improved Preparation Habits**: Freshmen now actively engage in coding challenges, a significant shift from previous trends where preparation began late in junior year.
- **Collaborative Learning**: Encourages peer-to-peer support and fosters a sense of community through shared goals.
- **Fun and Effective**: Transforms technical preparation into a game-themed experience that combines learning with entertainment.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     DISCORD_BOT_TOKEN=<your-discord-bot-token>
     MONGODB_URI=<your-mongodb-connection-string>
     ```
4. Start the bot:
   ```bash
   node server.js
   ```

## Usage
- Invite the bot to your Discord server.
- Use commands to link your LeetCode profile and view streaks, unique solutions, and leaderboards.
- Stay consistent and climb the leaderboard to earn rewards!

## Commands (Examples)
- `/link-profile <LeetCodeUsername>`: Link your LeetCode account to the bot.
- `/check-streak`: View your current streak.

## Contributing
Contributions are welcome! Feel free to fork the repository, submit issues, or create pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Thanks to the LeetCode community for inspiring this project.
- Special thanks to my peers and juniors for their active participation and feedback.
