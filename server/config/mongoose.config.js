import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      console.log(
        chalk.yellow(
          `DB CONNECTION ESTABLISHED`
        )
      )
    );
};

export default connectDb;