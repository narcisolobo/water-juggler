import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
    },
    dueDate: {
      type: Date,
      required: [true, 'Date is required.'],
      max: nextYear,
    },
    status: {
      type: String,
      default: 'backlog',
    },
    manager: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

projectSchema.plugin(uniqueValidator, {
  message: 'A project with that name already exists.',
});

const Project = model('Project', projectSchema);
export default Project;