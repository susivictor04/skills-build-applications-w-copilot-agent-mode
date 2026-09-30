import mongoose, { Schema } from 'mongoose';

const baseFields = {
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
};

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    ...baseFields,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    value: { type: Number, required: true, min: 0 },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    ...baseFields,
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);