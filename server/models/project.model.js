import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const fiveYears = new Date(new Date().setFullYear(new Date().getFullYear() + 5))

const projectSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minLength: [2, 'Project name must be at least two characters.'],
      maxLength: [45, 'Project name must be less than 45 characters.']
    },
    dueDate: {
      type: Date,
      min: [new Date(), 'Date must be in the future.'],
      max: [fiveYears, 'Date must be less than 5 years from now.'],
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