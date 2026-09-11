import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    courseSlug: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    orderId: {
      type: String,
      default: null,
      index: true,
    },

    paymentId: {
      type: String,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "pending",
      index: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "active",
        "completed",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    completedLessons: {
      type: Number,
      default: 0,
      min: 0,
    },

    completedLessonIds: {
      type: [String],
      default: [],
    },

    enrolledAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

EnrollmentSchema.index(
  { studentId: 1, courseSlug: 1 },
  { unique: true }
);

const Enrollment =
  mongoose.models.Enrollment ||
  mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;
